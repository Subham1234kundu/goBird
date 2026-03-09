"use client";
import Image from "next/image";
import InsightsSection from "@/app/components/service/InsightsSection";
import FooterSimple from "@/app/components/FooterSimple";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getInsightById, getAllInsights } from "@/lib/services/insightService";
import type { Insight } from "@/lib/types/insight";
import { formatDate } from "@/lib/utils/dateFormatter";

interface InsightsMoreProps {
  insightId?: string;
}

const InsightsMore = ({ insightId }: InsightsMoreProps) => {
  const router = useRouter();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedInsights, setRelatedInsights] = useState<Insight[]>([]);

  useEffect(() => {
    if (!insightId) {
      setLoading(false);
      return;
    }

    const fetchInsightData = async () => {
      setLoading(true);
      const { data, error } = await getInsightById(insightId);
      
      if (error || !data) {
        console.error("Error fetching insight:", error);
        router.push("/insights");
        return;
      }

      setInsight(data);

      const { data: all } = await getAllInsights(1, 10);
      if (all) {
        setRelatedInsights(
          all.filter(i => i.category === data.category && i.id !== insightId).slice(0, 3)
        );
      }
      
      setLoading(false);
    };

    fetchInsightData();
  }, [insightId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000A1B]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#FE4B00]"></div>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {/* Header */}
      <div
        className="w-full flex items-start px-4 sm:px-6 md:px-10 xl:px-16 pt-8 sm:pt-12 xl:pt-44 pb-8 sm:pb-12 xl:pb-20 max-sm:px-0 max-sm:pt-[200px]"
        style={{ backgroundColor: "#000A1B" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[82px] font-light mb-4 xl:mb-14 w-full sm:w-[80%] lg:w-[100%] max-sm:ml-[15px] max-sm:text-[42px] max-sm:leading-[55px] max-sm:font-extralight max-sm:max-w-[394px] max-sm:-mt-[6rem]">
            {insight.title}
          </h1>
          <p className="text-white font-light text-sm sm:text-base lg:text-lg mt-4 sm:mt-10 mb-5 max-sm:ml-[15px] max-sm:text-[14px] max-sm:font-normal flex items-center gap-1">
            <span>{formatDate(insight.published_date)}</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-block sm:hidden w-[6px] h-[6px] bg-current rounded-full" />
            <span>{insight.read_time || "5 min read"}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 xl:px-16 py-8 sm:py-12 xl:py-18">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
          {/* Left Sidebar - Follow Box (desktop only) */}
          <div
            className="w-full lg:w-[350px] h-auto lg:h-[420px] xl:mt-34 rounded-sm p-6 sm:p-8 flex-shrink-0 hidden lg:block"
            style={{ backgroundColor: "#006BCB" }}
          >
            <h3 className="text-white text-xl xl:text-[24px] font-medium mb-8">
              Follow us
            </h3>
            <div className="flex flex-col gap-6">
              {[
                { name: 'linkedin', label: '@grobird' },
                { name: 'x', label: '@grobird_official' },
                { name: 'insta', label: '@grobird.tech' },
                { name: 'fb', label: '@grobirdhq' },
                { name: 'threds', label: '@grobird_official' }
              ].map((social) => (
                <div key={social.name} className="flex items-center gap-4">
                  <Image
                    src={`/Images/footer/${social.name}.png`}
                    alt={social.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert flex-shrink-0"
                  />
                  <span className="text-white text-sm xl:text-[20px]">
                    {social.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-[#000000] min-w-0">
            {insight.cover_image_url && (
              <div className="relative w-full h-[200px] sm:h-[400px] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={insight.cover_image_url}
                  alt={insight.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <article 
              className="prose prose-lg max-w-full text-black leading-relaxed xl:text-[22px] break-words prose-h1:text-3xl sm:prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:font-light prose-h2:text-2xl sm:prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:font-light prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-normal prose-h4:text-lg sm:prose-h4:text-xl prose-h4:font-medium"
              dangerouslySetInnerHTML={{ __html: insight.content }}
            />

            {/* Mobile Follow us box */}
            <div
              className="w-full rounded-sm p-4 sm:p-6 lg:hidden max-sm:mt-16"
              style={{ backgroundColor: "#006BCB" }}
            >
              <h3 className="text-white text-xl font-medium mb-6">Follow us</h3>
              <div className="flex flex-col gap-4 text-white">
                {/* Simplified social list for mobile */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">LinkedIn</span>
                  <span className="text-sm">@grobird</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Instagram</span>
                  <span className="text-sm">@grobird.tech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Insights Section */}
      {relatedInsights.length > 0 && (
        <div className="w-full bg-[#fafafa] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="flex flex-row justify-between items-center mb-10">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light">
                More Insights
              </h2>
              <button
                onClick={() => router.push("/insights")}
                className="hidden sm:inline-block px-6 py-2.5 rounded-full text-white text-sm bg-[#FF662A]"
              >
                View all
              </button>
            </div>

            <InsightsSection
              title=""
              titleHighlight=""
              buttonText=""
              isGrid={true}
              onButtonClick={() => router.push("/insights")}
              insights={relatedInsights.map(i => ({
                imageSrc: i.cover_image_url || "/Images/insights1.png",
                title: i.title,
                category: i.category,
                date: formatDate(i.published_date),
                readTime: i.read_time || "5 min read",
                imageAlt: i.title,
                onClick: () => router.push(`/insights?id=${i.id}`)
              }))}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <FooterSimple />
    </div>
  );
};

export default InsightsMore;
