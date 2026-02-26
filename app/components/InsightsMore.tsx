"use client";
import Image from "next/image";
import InsightsSection from "@/app/components/service/InsightsSection";
import FooterSimple from "@/app/components/FooterSimple";
import { useRouter } from "next/navigation";

const InsightsMore = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div
        className="w-full flex items-start px-4 sm:px-6 md:px-10 xl:px-16 pt-8 sm:pt-12 xl:pt-44 pb-8 sm:pb-12 xl:pb-20 max-sm:px-0 max-sm:pt-[200px]"
        style={{ backgroundColor: "#000A1B" }}
      >
        <div className="max-w-7xl">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[82px] font-light mb-4 xl:mb-14 w-full sm:w-[80%] lg:w-[100%] max-sm:ml-[15px] max-sm:text-[42px] max-sm:leading-[55px] max-sm:font-extralight max-sm:max-w-[394px] max-sm:-mt-[6rem]">
            The art of storytelling in <br /> branding and advertising
          </h1>
          <p className="text-white font-light text-sm sm:text-base lg:text-lg mt-4 sm:mt-10 mb-5 max-sm:ml-[15px] max-sm:text-[14px] max-sm:font-normal flex items-center gap-1">
            <span>Mar 1, 2025</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-block sm:hidden w-[6px] h-[6px] bg-current rounded-full" />
            <span>8 min read</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12 xl:py-18">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left Sidebar - Follow Box (desktop only) */}
          <div
            className="w-full lg:w-[312px] h-auto lg:h-[378px] xl:mt-34 rounded-sm p-4 sm:p-6 flex-shrink-0 hidden lg:block"
            style={{ backgroundColor: "#006BCB" }}
          >
            <h3 className="text-white text-xl xl:text-[24px] font-medium mb-6">
              Follow us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Image
                  src="/Images/footer/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6 brightness-0 invert"
                />
                <span className="text-white text-sm xl:text-[20px]">
                  @grobird
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Image
                  src="/Images/footer/x.png"
                  alt="X"
                  width={24}
                  height={24}
                  className="w-6 h-6 brightness-0 invert"
                />
                <span className="text-white text-sm xl:text-[20px]">
                  @grobird_official
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Image
                  src="/Images/footer/insta.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6 brightness-0 invert"
                />
                <span className="text-white text-sm xl:text-[20px]">
                  @grobird.tech
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Image
                  src="/Images/footer/fb.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6 brightness-0 invert"
                />
                <span className="text-white text-sm xl:text-[20px]">
                  @grobirdhq
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Image
                  src="/Images/footer/threds.png"
                  alt="Threads"
                  width={24}
                  height={24}
                  className="w-6 h-6 brightness-0 invert"
                />
                <span className="text-white text-sm xl:text-[20px]">
                  @grobird_official
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-[#000000] space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-extralight mb-3 sm:mb-4 py-4 max-sm:mt-4 max-sm:text-[20px] max-sm:font-extralight max-sm:text-black">
                Introduction
              </h2>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                Artificial Intelligence (AI) has become the most overused
                buzzword in the consulting and software industry. Everywhere you
                turn, there&apos;s a new &quot;AI-powered&quot; solution
                promising to transform businesses overnight. But what&apos;s
                real and what&apos;s just hype? For companies looking to adopt
                AI, cutting through the noise is critical.
              </p>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                In this article, we&apos;ll explore where AI genuinely creates
                impact in consulting and technology services, and where
                it&apos;s simply marketing jargon.
              </p>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-extralight mb-3 sm:mb-4 py-4 max-sm:mt-4 max-sm:text-[20px] max-sm:font-extralight max-sm:text-black">
                The Hype
              </h2>
              <h3 className="font-bold text-base sm:text-lg xl:text-[24px] max-sm:text-[16px] max-sm:leading-[20px] max-sm:text-black">
                AI will replace human consultants
              </h3>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                Many headlines suggest that consultants are being
                &quot;replaced&quot; by AI. In reality, AI is powerful at
                crunching data and surfacing patterns, but it lacks the context,
                empathy, and decision-making abilities that clients expect from
                trusted advisors.
              </p>
            </div>

            <div className="xl:mb-20">
              <h3 className="font-bold text-base sm:text-lg xl:text-[24px] max-sm:text-[16px] max-sm:leading-[20px] max-sm:text-black">
                One-size-fits-all AI solutions
              </h3>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                Vendors often promote plug-and-play AI tools that promise
                results across industries. But AI requires customization,
                training on domain-specific data, and integration into existing
                workflows — something generic solutions rarely deliver.
              </p>
            </div>

            <Image
              src="/Images/insightsmore1.jpg"
              alt="Insights More 1"
              width={800}
              height={400}
              className="w-full h-auto object-cover my-4 sm:my-6"
            />

            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal mb-3 sm:mb-4 py-4 max-sm:mt-4 max-sm:text-[20px] max-sm:font-extralight max-sm:text-black">
                The Reality
              </h2>
              <h3 className="font-bold text-base sm:text-lg xl:text-[24px] max-sm:text-[16px] max-sm:leading-[20px] max-sm:text-black">
                Enhanced decision-making
              </h3>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                AI-driven analytics helps consultants move faster from raw data
                to actionable insights. For example, predicting customer churn
                with 85% accuracy enables proactive retention strategies.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base sm:text-lg xl:text-[24px] max-sm:text-[16px] max-sm:leading-[20px] max-sm:text-black">
                Process automation
              </h3>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                Repetitive tasks like report generation, document
                classification, or code reviews can be automated, saving 20–30%
                of project hours. This frees up consultants to focus on
                higher-value strategic work.
              </p>
            </div>

            <div className="xl:mb-20">
              <h3 className="font-bold text-base sm:text-lg xl:text-[24px] max-sm:text-[16px] max-sm:leading-[20px] max-sm:text-black">
                Smarter customer experiences
              </h3>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                AI-powered chatbots and virtual assistants are already improving
                client engagement, handling up to 70% of common queries and
                reducing response times drastically.
              </p>
            </div>

            <Image
              src="/Images/insightsmore2.jpg"
              alt="Insights More 2"
              width={800}
              height={400}
              className="w-full h-auto object-cover my-4 sm:my-6"
            />

            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal mb-3 sm:mb-4 py-4 max-sm:mt-4 max-sm:text-[20px] max-sm:font-extralight max-sm:text-black">
                The Balanced Approach
              </h2>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                The truth is that AI isn&apos;t magic. Success comes from a
                hybrid model: human expertise + AI efficiency. Consultants who
                embrace AI as a partner, rather than a replacement, are
                delivering measurable value to clients.
              </p>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-normal mb-3 sm:mb-4 py-4 max-sm:mt-4 max-sm:text-[20px] max-sm:font-extralight max-sm:text-black">
                Final Takeaway
              </h2>
              <p className="leading-relaxed xl:text-[24px] max-sm:text-[16px] max-sm:font-normal max-sm:leading-[20px] max-sm:text-black">
                AI is neither a silver bullet nor a passing fad. It&apos;s a
                powerful enabler when applied thoughtfully. For businesses, the
                key is to work with partners who separate hype from reality, and
                who can design AI solutions that are scalable, ethical, and
                aligned with long-term goals.
              </p>
            </div>

            {/* Mobile Follow us box - appears after Final Takeaway */}
            <div
              className="w-full rounded-sm p-4 sm:p-6 lg:hidden max-sm:mt-16"
              style={{ backgroundColor: "#006BCB" }}
            >
              <h3 className="text-white text-xl xl:text-[24px] font-medium mb-6">
                Follow us
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Image
                    src="/Images/footer/linkedin.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                  />
                  <span className="text-white text-sm xl:text-[20px]">
                    @grobird
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Image
                    src="/Images/footer/x.png"
                    alt="X"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                  />
                  <span className="text-white text-sm xl:text-[20px]">
                    @grobird_official
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Image
                    src="/Images/footer/insta.png"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                  />
                  <span className="text-white text-sm xl:text-[20px]">
                    @grobird.tech
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Image
                    src="/Images/footer/fb.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                  />
                  <span className="text-white text-sm xl:text-[20px]">
                    @grobirdhq
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Image
                    src="/Images/footer/threds.png"
                    alt="Threads"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                  />
                  <span className="text-white text-sm xl:text-[20px]">
                    @grobird_official
                  </span>
                </div>
              </div>
            </div>

            {/* Sales Section - hidden on mobile */}
            <div className="mt-4 sm:mt-6 xl:mb-20 hidden sm:block">
              <h3 className="text-base sm:text-lg mb-3 sm:mb-4">Sales</h3>
              <div className="flex gap-4 items-center">
                <Image
                  src="/Images/footer/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <Image
                  src="/Images/whatsapp.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <Image
                  src="/Images/footer/x.png"
                  alt="X"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <Image
                  src="/Images/footer/insta.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <Image
                  src="/Images/footer/fb.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Insights Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-6 sm:py-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-extralight max-sm:w-[398px] max-sm:h-[14px] max-sm:font-['Montserrat'] max-sm:font-normal max-sm:text-[20px] max-sm:leading-[24px] max-sm:tracking-[-0.01em] max-sm:text-[#000A1B]">
          All Insights
        </h2>
        <button
          onClick={() => router.push("/insights")}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-xs text-sm xl:text-[16px] font-medium transition-colors h-10 px-4 py-2 text-white hover:opacity-90 max-sm:hidden sm:inline-flex"
          style={{ backgroundColor: "#FF662A" }}
        >
          More articles
        </button>
      </div>

      {/* Insights Section */}
      <InsightsSection
        title=""
        titleHighlight=""
        buttonText=""
        onButtonClick={() => router.push("/insights")}
        insights={[
          {
            imageSrc: "/Images/insights1.png",
            title: "The art of storytelling in branding and advertising",
            category: "Branding",
            date: "Mar 1, 2025",
            readTime: "8min read",
            imageAlt: "The art of storytelling in branding and advertising",
          },
          {
            imageSrc: "/Images/insights2.png",
            title: "The art of storytelling in branding and advertising",
            category: "Branding",
            date: "Mar 1, 2025",
            readTime: "8min read",
            imageAlt: "The art of storytelling in branding and advertising",
          },
          {
            imageSrc: "/Images/insights1.png",
            title: "The art of storytelling in branding and advertising",
            category: "Branding",
            date: "Mar 1, 2025",
            readTime: "8min read",
            imageAlt: "The art of storytelling in branding and advertising",
          },
        ]}
      />

      {/* Footer */}
      <FooterSimple />
    </div>
  );
};

export default InsightsMore;
