"use client";

// TrafficSourcesChart renders three circular bubbles with concentric progress rings.
// The visible arc length of each ring corresponds to its percentage (e.g., 85% shows 85% of the circle).
// The stroke width also scales with the percentage but is kept generally thinner as requested.

type Source = {
  title: string; // e.g., "Direct Traffic"
  percent: number; // 0 - 100
  color: string; // background color for bubble and ring color
  size: number; // bubble diameter in px
  position: Partial<Record<"top" | "left" | "right" | "bottom", string>>; // absolute positioning
  textSize?: {
    percent: string; // tailwind text size class for percent
    label: string; // tailwind text size class for label
  };
};

// Stroke width will be mapped from percent but kept generally on the thinner side
const MIN_STROKE = 0.6; // px
const MAX_STROKE = 3.2; // px
// Gap between bubble edge and the ring's inner edge
const RING_GAP = 6; // px

function strokeFromPercent(percent: number) {
  const clamped = Math.max(0, Math.min(100, percent));
  // Slightly sublinear mapping so it "decreases a bit more" (thinner overall) while still depending on %
  const factor = Math.pow(clamped / 100, 0.7);
  return Math.max(MIN_STROKE, MIN_STROKE + (MAX_STROKE - MIN_STROKE) * factor);
}


export default function TrafficSourcesChart() {
  const sources: Source[] = [
    {
      title: "Direct\nTraffic",
      percent: 85,
      color: "#7C7CFF",
      size: 103,
      position: { top: "6%", left: "27%" },
    },
    {
      title: "Social\nMedia",
      percent: 85,
      color: "#F5A548",
      size: 168,
      position: { top: "25%", right: "1%" },
    },
    {
      title: "Organic\nSearch",
      percent: 92,
      color: "#5BC4E8",
      size: 122,
      position: { bottom: "16%", left: "0%" },
    },
  ];

  return (
    <div className="rounded-lg border border-[#E4E4E4] bg-white p-5 h-[400px] relative overflow-hidden">
      <h2 className="mb-6 text-lg font-semibold text-[#000000B2]">Top Traffic Sources</h2>

      <div className="relative h-full w-full">
        {sources.map((src, idx) => {
          const stroke = strokeFromPercent(src.percent);
          const bubble = src.size;

          // For an SVG progress ring, the viewbox will be the final ring box.
          // We maintain a constant inner gap regardless of stroke thickness.
          const ringBox = bubble + 1 * RING_GAP + 2 * stroke;
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
              style={{ ...src.position, zIndex: 10 + idx }}
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
                  className="relative z-10 flex items-center justify-center rounded-full text-white shadow-lg border border-white/70"
                  style={{ width: bubble, height: bubble, backgroundColor: src.color }}
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
