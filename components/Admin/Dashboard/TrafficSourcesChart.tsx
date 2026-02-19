"use client";

import { useEffect, useState } from "react";

// TrafficSourcesChart renders three circular bubbles with concentric progress rings.
// The visible arc length of each ring corresponds to its percentage (e.g., 85% shows 85% of the circle).
// The stroke width also scales with the percentage but is kept generally thinner as requested.

type Source = {
  title: string; // e.g., "Direct Traffic"
  percent: number; // 0 - 100
  value: number; // actual session count
  color: string; // background color for bubble and ring color
  size: number; // bubble diameter in px
  position: Partial<Record<"top" | "left" | "right" | "bottom", string>>; // absolute positioning
};

// Stroke width will be mapped from percent but kept generally on the thinner side
const MIN_STROKE = 0.4; // px
const MAX_STROKE = 2.2; // px
// Gap between bubble edge and the ring's inner edge
const RING_GAP = 2; // px

function strokeFromPercent(percent: number) {
  const clamped = Math.max(0, Math.min(100, percent));
  // Slightly sublinear mapping so it "decreases a bit more" (thinner overall) while still depending on %
  const factor = Math.pow(clamped / 100, 0.7);
  return Math.max(MIN_STROKE, MIN_STROKE + (MAX_STROKE - MIN_STROKE) * factor);
}

interface TrafficData {
  source: string;
  sessions: number;
  percentage: string;
}

export default function TrafficSourcesChart() {
  const [loading, setLoading] = useState(true);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);

  useEffect(() => {
    const fetchTrafficSources = async () => {
      try {
        const response = await fetch('/api/analytics/traffic-sources?days=7');
        const data = await response.json();

        // Check if the response has the expected data structure
        if (data && data.data && Array.isArray(data.data)) {
          setTrafficData(data.data);
        } else {
          // Set empty data if API returns an error or unexpected structure
          console.error('Invalid traffic sources data:', data);
          setTrafficData([]);
        }
      } catch (error) {
        console.error('Error fetching traffic sources:', error);
        setTrafficData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrafficSources();

    // Refresh every 5 minutes
    const interval = setInterval(fetchTrafficSources, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Map API data to visual sources
  const getSourceData = (label: string): { value: number; percent: number } => {
    if (loading) return { value: 0, percent: 0 };

    let totalSessions = 0;
    let sessions = 0;

    // Calculate total sessions
    trafficData.forEach(item => {
      totalSessions += item.sessions;
    });

    // Map sources to categories
    if (label === "Direct Traffic") {
      const directSources = trafficData.filter(item =>
        item.source.toLowerCase() === "(direct)" ||
        item.source.toLowerCase() === "direct"
      );
      sessions = directSources.reduce((sum, item) => sum + item.sessions, 0);
    } else if (label === "Social Media") {
      const socialSources = trafficData.filter(item =>
        ["facebook", "instagram", "twitter", "linkedin", "youtube", "tiktok", "pinterest", "reddit", "snapchat"].some(
          social => item.source.toLowerCase().includes(social)
        )
      );
      sessions = socialSources.reduce((sum, item) => sum + item.sessions, 0);
    } else if (label === "Organic Search") {
      const organicSources = trafficData.filter(item =>
        ["google", "bing", "yahoo", "duckduckgo", "baidu", "yandex"].some(
          engine => item.source.toLowerCase().includes(engine)
        ) && !item.source.toLowerCase().includes("ads")
      );
      sessions = organicSources.reduce((sum, item) => sum + item.sessions, 0);
    }

    const percent = totalSessions > 0 ? (sessions / totalSessions) * 100 : 0;
    return { value: sessions, percent: Math.round(percent) };
  };

  const sources: Source[] = [
    {
      title: "Direct\nTraffic",
      ...getSourceData("Direct Traffic"),
      color: "#7C7CFF",
      size: 103,
      position: { top: "6%", left: "27%" },
    },
    {
      title: "Social\nMedia",
      ...getSourceData("Social Media"),
      color: "#F5A548",
      size: 168,
      position: { top: "25%", right: "1%" },
    },
    {
      title: "Organic\nSearch",
      ...getSourceData("Organic Search"),
      color: "#5BC4E8",
      size: 122,
      position: { bottom: "16%", left: "0%" },
    },
  ];

  if (loading) {
    return (
      <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        <div className="h-full flex items-center justify-center gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-full bg-gray-200" style={{ width: `${80 + i * 20}px`, height: `${80 + i * 20}px` }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] relative overflow-hidden">
      <h2 className="mb-6 text-lg font-semibold text-[#000000B2]">Top Traffic Sources</h2>

      <div className="relative h-full w-full">
        {sources.map((src, idx) => {
          const stroke = strokeFromPercent(src.percent);
          const bubble = src.size;

          // For an SVG progress ring, the viewbox will be the final ring box.
          // We maintain a constant inner gap regardless of stroke thickness.
          const ringBox = bubble + 2 * RING_GAP + 2 * stroke;
          const center = ringBox / 2;
          const r = center - stroke / 2; // stroke is centered on the circle path
          const circumference = 2 * Math.PI * r;
          const dash = (circumference * Math.max(0, Math.min(100, src.percent))) / 100;
          const dashArray = `${dash} ${circumference}`;

          const ringColor = src.color;

          return (
            <div
              key={idx}
              className="absolute"
              style={{ ...src.position, zIndex: [12, 10, 11][idx] }} // Direct: 12, Social: 10, Organic: 11
            >
              {/* Wrapper sized to bubble for easier centering */}
              <div className="relative" style={{ width: bubble, height: bubble }}>
                {/* SVG progress ring perfectly centered around bubble */}
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  width={ringBox}
                  height={ringBox}
                  viewBox={`0 0 ${ringBox} ${ringBox}`}
                >
                  {/* Progress arc starting at 12 o'clock */}
                  <circle
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={0}
                    transform={`rotate(-90 ${center} ${center})`}
                  />
                </svg>

                {/* Bubble */}
                <div
                  className="relative z-10 flex items-center justify-center rounded-full text-white shadow-lg border border-white/30"
                  style={{ width: bubble, height: bubble, backgroundColor: src.color, opacity: 0.8 }}
                >
                  <div className="flex flex-col items-center justify-center leading-tight text-center">
                    <span className={`font-bold`} style={{ fontSize: "20.75px" }}>
                      {src.percent}%
                    </span>
                    <span className={`whitespace-pre-line`} style={{ fontSize: "16px" }}>
                      {src.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
