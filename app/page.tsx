"use client";

import PaperBird3D from "@/components/PaperBird3D";
import CrazyLoader from "@/components/CrazyLoader";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InsightsSection from "@/app/components/service/InsightsSection";
import FooterSimple from "./components/FooterSimple";
import { useRouter } from "next/navigation";
import workimg from "../public/Images/insights2.png";
import workmanimg from "../public/Images/workman.png";
import p1 from "../public/Images/p-1.png";
import p2 from "../public/Images/p-2.png";
import p3 from "../public/Images/p-3.png";
import b1 from "../public/Images/b-1.png";
import b2 from "../public/Images/b-2.png";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface CardData {
  title: string;
  description: string;
  route: string;
}

interface FAQData {
  question: string;
  answer: string;
}

const faqData: FAQData[] = [
  {
    question:
      "How does Grobird handle AI and data compliance (DPDP, GDPR, EU AI Act)?",
    answer:
      "Grobird designs governance‑first architectures with in‑country processing, selective encryption, robust access controls, and detailed audit trails mapped to DPDP, GDPR, and emerging AI regulations.",
  },
  {
    question: "What types of organizations does Grobird typically work with?",
    answer:
      "Mid‑size and large enterprises in fintech, banking, healthcare, logistics, retail, education, manufacturing, and enterprise SaaS, as well as high‑growth founders building B2B platforms.",
  },
  {
    question: "Who owns the IP and source code for projects?",
    answer:
      "For client projects, the client owns the IP and source code once commercial terms are met. For venture studio engagements, IP is shared according to the agreed equity‑plus‑fee model.",
  },
  {
    question: "How does Grobird work with in‑house teams?",
    answer:
      "Grobird integrates with internal product, compliance, and IT teams, providing architecture, development, and managed services while respecting existing tools and processes.",
  },
  {
    question: "What services does Grobird offer?",
    answer:
      "Grobird provides AI governance, cloud infrastructure, platform engineering, and venture studio services to help businesses scale securely and efficiently.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope. A typical initial engagement lasts 4–8 weeks, with ongoing support and maintenance available.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We work across multiple industries including finance, healthcare, e‑commerce, and technology, with a focus on compliance and security.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes, we provide managed services and support packages to ensure your systems run smoothly and stay up‑to‑date.",
  },

  {
    question: "What does a typical first engagement look like?",
    answer:
      "Most clients start with a 2–4 week discovery and architecture phase to clarify goals, risks, and roadmap before committing to a build or managed program.",
  },
  {
    question:
      "Can Grobird work with our in‑house engineering and compliance teams?",
    answer:
      "Yes. Engagements are designed to complement in‑house teams, with clear ownership, documentation, and knowledge transfer.",
  },
  {
    question: "How do venture studio engagements work?",
    answer:
      "For selected founders, Grobird combines development fees with long‑term equity participation, acting as a technical co‑founder and scaling partner.",
  },
];

const Home = () => {
  const router = useRouter();
  // Refs for all animated sections
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroContentWrapperRef = useRef<HTMLDivElement>(null);
  const testimonialsHeadingRef = useRef<HTMLDivElement>(null);
  const testimonialImageRef = useRef<HTMLDivElement>(null);
  const insightsHeadingRef = useRef<HTMLDivElement>(null);
  const faqHeadingRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaBirdRef = useRef<HTMLDivElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);
  const ctaCloudLeftRef = useRef<HTMLDivElement>(null);
  const ctaCloudRightRef = useRef<HTMLDivElement>(null);
  const ctaCloudBottomRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const faqAnswerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const toggleFaq = (index: number) => {
    const isOpening = openFaqIndex !== index;

    // Close others
    faqData.forEach((_, i) => {
      if (i !== index) {
        const otherAnswer = faqAnswerRefs.current[i];
        if (otherAnswer) {
          gsap.to(otherAnswer, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
            force3D: true,
          });
        }
      }
    });

    setOpenFaqIndex(isOpening ? index : null);

    const answer = faqAnswerRefs.current[index];
    if (answer) {
      gsap.to(answer, {
        height: isOpening ? "auto" : 0,
        opacity: isOpening ? 1 : 0,
        duration: 0.5,
        ease: "power3.inOut",
        force3D: true,
      });
    }
  };

  useEffect(() => {
    // Lock scroll during loading
    if (isPageLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleLoadingUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const progress = customEvent.detail.progress;
      setLoadingProgress(progress);
      
      // If loading is done, allow a moment for the loader's exit animation
      if (progress >= 100) {
        setTimeout(() => {
          setIsPageLoading(false);
          document.body.style.overflow = "auto";
          // Refresh ScrollTrigger after loader is gone
          setTimeout(() => ScrollTrigger.refresh(), 500);
        }, 1500); // Wait for CrazyLoader's transition
      }
    };

    window.addEventListener('assetLoadingProgress', handleLoadingUpdate as EventListener);

    // Safety timeout to hide loader if something stalls
    const timer = setTimeout(() => {
      setIsPageLoading(false);
      document.body.style.overflow = "auto";
    }, 20000); // 20s safety

    return () => {
      window.removeEventListener('assetLoadingProgress', handleLoadingUpdate as EventListener);
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isPageLoading]);

  useEffect(() => {
    // Enable GSAP performance features
    gsap.config({ autoSleep: 60, force3D: true, nullTargetWarn: false });
    gsap.ticker.lagSmoothing(1000, 16);

    // Kill existing ScrollTrigger animations only
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Batch animations for better performance
    const sections = document.querySelectorAll("section, .wors_cards, .businesses_cards");
    sections.forEach((section) => {
      if (section instanceof HTMLElement) {
        section.style.willChange = "transform, opacity";
      }
    });

    // Hero Section Animations
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (heroHeadingRef.current) {
      heroTl.from(heroHeadingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
      });
    }

    if (heroDescRef.current) {
      heroTl.from(
        heroDescRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1,
        },
        "-=0.9"
      );
    }

    if (heroButtonsRef.current) {
      heroTl.from(
        heroButtonsRef.current.children,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
        },
        "-=0.4"
      );
    }

    // Hero Scroll Animation
    if (heroContentWrapperRef.current && heroSectionRef.current) {
      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom center",
        pin: heroContentWrapperRef.current,
        pinSpacing: false,
      });

      gsap.to(heroContentWrapperRef.current, {
        scale: 0.5,
        opacity: 0,
        filter: "blur(12px)",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 1.2,
          onUpdate: (self) => {
            const event = new CustomEvent("heroTextFade", {
              detail: { progress: self.progress },
            });
            window.dispatchEvent(event);
          },
        },
      });
    }

    // Impact Section (Businesses)
    const impactCards = document.querySelectorAll(".businesses_card");
    if (impactCards.length > 0) {
      gsap.from(impactCards, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        rotateX: 10,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".businesses",
          start: "top 80%",
          once: true,
        },
      });

      const statElements = [
        { el: impactCards[0]?.querySelector("h1"), target: 10, suffix: "x" },
        { el: impactCards[1]?.querySelector("h1"), target: 200, suffix: "+" },
        { el: impactCards[2]?.querySelector("h1"), target: 95, suffix: "%" },
        { el: impactCards[3]?.querySelector("h1"), target: 5, suffix: "+" },
      ];

      statElements.forEach(({ el, target, suffix }) => {
        if (el) {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 3,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              el.innerHTML = `${Math.ceil(counter.value)}<span class="text-[#FF662A]">${suffix}</span>`;
            },
          });
        }
      });
    }

    // Our Process Section
    const processItems = document.querySelectorAll(".our_box");
    if (processItems.length > 0) {
      gsap.from(processItems, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".our_process_box",
          start: "top 85%",
          once: true,
        },
      });

      processItems.forEach((item) => {
        const img = item.querySelector(".process_image");
        if (img) {
          gsap.to(img, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        
        // Hover effect using GSAP for smooth performance
        item.addEventListener("mouseenter", () => {
          gsap.to(item, { y: -10, scale: 1.02, duration: 0.4, ease: "power2.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, { y: 0, scale: 1, duration: 0.4, ease: "power2.inOut" });
        });
      });
    }

    // Grid Wrapper Parallax
    const gridCards = document.querySelectorAll(".grid_card");
    gridCards.forEach((card) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true,
        },
      });
    });

    // Services Section
    const serviceCards = document.querySelectorAll(".cards_right_card");
    if (serviceCards.length > 0) {
      gsap.from(serviceCards, {
        x: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services_cards",
          start: "top 75%",
          once: true,
        },
      });
    }

    // Our Work Cards - Mask Scale Reveal
    const workCards = document.querySelectorAll(".wors_cards .card, .wors_cards .center_card");
    workCards.forEach((card) => {
      const cardImg = card.querySelector("img");
      if (cardImg) {
        gsap.set(cardImg, { scale: 1.3 });
        gsap.to(cardImg, {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      }
      
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true,
        },
      });
    });

    // FAQ Section Stagger
    const faqItems = document.querySelectorAll(".faq-item-container"); // Assuming we add this class
    if (faqItems.length > 0) {
      gsap.from(faqItems, {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
          once: true,
        },
      });
    }

    // CTA Section Animation
    if (ctaBirdRef.current) {
      gsap.fromTo(ctaBirdRef.current, 
        { y: 200, opacity: 0, scale: 0.7 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
      
      const birdImg = ctaBirdRef.current.querySelector("img");
      if (birdImg) {
        gsap.to(birdImg, {
          y: -30,
          rotate: 4,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }

    // Background Parallax - Subtle
    if (heroBgRef.current) {
      gsap.to(heroBgRef.current, {
        y: -100, // Reduced from -150
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  const [expandedIndex, setExpandedIndex] = useState<number>(0); // first card expanded by default

  const rightCards: CardData[] = [
    {
      title: "Enterprise Platforms & Custom Software",
      description:
        "Building high-performance, bespoke software ecosystems that transform complex enterprise requirements into seamless, pixel-perfect digital reality.",
      route: "/services/servisPages/customSoftwareDevelopment",
    },
    {
      title: "Venture Studio & Product Engineering",
      description:
        "Translating ambitious visions into robust, market-ready products with a focus on scalable architecture, resilient code, and frictionless user journeys.",
      route: "/services/servisPages/productEngineering",
    },
    {
      title: "AI Governance & Compliance Platforms",
      description:
        "Strategizing regulation-aligned roadmaps that de-risk digital transformation while optimizing your tech stack for governance-first growth and efficiency.",
      route: "/services/servisPages/itConsulting",
    },
    {
      title: "Cloud, Data Residency & FinOps",
      description:
        "Engineering secure, automated cloud foundations with deep observability and regulatory guardrails, ensuring your infrastructure stays agile and compliant.",
      route: "/services/servisPages/Cloud&Infrastructure",
    },
  ];

  const handleMouseEnter = (index: number) => {
    setExpandedIndex(index);
  };

  const handleMouseLeave = (index: number) => {
    // Only revert to first card when leaving a non‑first card
    if (index !== 0) {
      setExpandedIndex(0);
    }
  };

  return (
    <>
      {isPageLoading && <CrazyLoader progress={loadingProgress} />}
      <style jsx>{`
        .service-hover-item {
          will-change: height;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .service-text-content,
        .service-expanded-content {
          will-change: opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .service-expanded-content {
          pointer-events: none;
        }
        .service-hover-item:hover .service-expanded-content {
          pointer-events: auto;
        }
      `}</style>

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          fontFamily:
            "Montserrat, -apple-system, BlinkMacSystemFont, sans-serif",
          overflowX: "hidden",
        }}
      >
        {/* header */}
        <div
          ref={heroSectionRef}
          className="w-full flex relative px-4 justify-center h-[700px] sm:h-[800px] md:h-[900px] lg:h-[1000px]"
          style={{
            background:
              "linear-gradient(to bottom, #010917 1%, #006BCB 85%, #ffffff 100%)",
          }}
        >
          {/* Image at the very top */}
          <div ref={heroBgRef} className="absolute top-[120px] left-0 w-full h-[50vh] z-0">
            <Image
              src="/Images/boxes.png"
              alt="Boxes"
              width={3000}
              height={1000}
              className="w-[90%] h-[120%] object-cover opacity-20"
            />
          </div>

          <div
            ref={heroContentWrapperRef}
            className="flex flex-col items-center justify-center sm:justify-start sm:mt-16 sm:mt-18 md:mt-16 lg:mt-18 2xl:mt-28 text-center w-full max-w-7xl 2xl:max-w-8xl relative z-10"
          >
            {/* Heading - Centered and larger on mobile */}
            <h1
              ref={heroHeadingRef}
              className="text-white text-4xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-[82px] font-light leading-[1.1] mb-4 sm:mb-1 px-4 sm:px-2 text-center w-full max-sm:text-[45px] max-sm:font-normal max-sm:px-0 max-sm:-mt-20"
            >
              Governance-First AI Infrastructure{" "}
              <br className="hidden xs:block" /> for Ambitious Enterprises
            </h1>

            {/* Description - Centered and larger on mobile */}

            <p
              ref={heroDescRef}
              className="text-white font-light mt-4 sm:mt-2 text-sm sm:text-xs md:text-base lg:text-lg xl:text-2xl leading-relaxed max-w-[90%] sm:max-w-full 2xl:max-w-6xl mb-8 sm:mb-7 xl:mb-8 2xl:mb-10 px-4 sm:px-4 text-center max-sm:px-0 max-sm:text-sm max-sm:font-light max-sm:leading-5 max-sm:tracking-[-0.01em]"
            >
              Grobird builds secure, regulation-aligned AI platforms for
              enterprises moving faster
            </p>

            {/* Buttons - Stacked vertically on mobile, horizontal on desktop */}
            <div
              ref={heroButtonsRef}
              className="flex flex-col sm:flex-row gap-4 sm:gap-4 items-center justify-center w-full sm:w-auto max-sm:flex-row max-sm:justify-center"
            >
              <button
                onClick={() => router.push("/contact")}
                className="bg-[#FF672C] text-white px-8 sm:px-6 lg:px-18 font-medium py-3 sm:py-2 md:py-3 rounded-full text-base sm:text-sm md:text-[17px] hover:bg-[#e55a24] transition-colors w-full sm:w-auto max-w-[280px] sm:max-w-none max-sm:w-[152px] max-sm:h-[50px] max-sm:p-[10px] max-sm:flex max-sm:justify-center max-sm:items-center max-sm:text-[14px]"
              >
                Talk to Us
              </button>

              <button
                onClick={() => router.push("/services")}
                className="bg-white text-black px-8 sm:px-6 lg:px-14 py-3 sm:py-2 md:py-3 rounded-full text-base sm:text-sm hover:bg-gray-100 transition-colors md:text-[17px] font-medium w-full sm:w-auto max-w-[280px] sm:max-w-none max-sm:w-[152px] max-sm:h-[50px] max-sm:p-[10px] max-sm:flex max-sm:flex-row max-sm:justify-center max-sm:items-center max-sm:text-[14px]"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* 3D Paper Birds with Scroll Animation and 3D Clouds */}
          <PaperBird3D />
        </div>

        {/* Startups Section */}
        {/* <div className="w-full py-16 px-4 sm:px-6 md:px-10 lg:px-16"> */}
        {/* <div className="max-w-[1400px] mx-auto">/ */}
        {/* <h2 ref={startupsHeadingRef} className="text-black text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[28.75px] font-medium text-center mb-6 sm:mb-8 mt-14"> */}
        {/* The startups shaping tomorrow trust Grobird */}
        {/* </h2> */}

        {/* Startup Company Images Row */}
        {/* <div ref={startupLogosRef} className="flex justify-center items-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-16 2xl:gap-14">
              <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
                <Image
                  src="/Images/startups/company1.png"
                  alt="Startup Company 1"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
                <Image
                  src="/Images/startups/company2.png"
                  alt="Startup Company 2"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
                <Image
                  src="/Images/startups/company3.png"
                  alt="Startup Company 3"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-[#E9EBF1]">
                <Image
                  src="/Images/startups/company4.png"
                  alt="Startup Company 4"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
              <div className="relative w-14 h-7 sm:w-24 sm:h-12 md:w-32 md:h-16 lg:w-36 lg:h-18 xl:w-40 xl:h-20 2xl:w-44 2xl:h-22 flex-shrink-0 border-l border-r border-[#E9EBF1]">
                <Image
                  src="/Images/startups/company5.png"
                  alt="Startup Company 5"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 56px, (max-width: 768px) 96px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
                />
              </div>
            </div>
          </div>
        </div> */}

        {/* businesses  cards */}
        <section className="businesses">
          {/* hedline  */}

          <div className="businesses_hed">
            <h1>The impact we’ve created</h1>
            <h1 style={{ color: "#A7A7A7" }}>for businesses</h1>
          </div>

          <div className="businesses_cards">
            <div className="businesses_card">
              <h1>10x</h1>
              <p>Higher Client Retention</p>
            </div>
            <div className="businesses_card">
              <h1>200+</h1>
              <p>Successfully delivered high- quality projects</p>
            </div>
            <div className="businesses_card">
              <h1>95%</h1>
              <p>platform uptime for managed clients</p>
            </div>
            <div className="businesses_card">
              <h1>5+</h1>
              <p>Continents Served</p>
            </div>
          </div>

          {/* images sidee */}

          {/* <div className="businesses_section">
            <div className="businesses_images">
              <div className="logo_row">
                <div className="logo_item">
                  <Image
                    alt="Boxes"
                    width={300}
                    height={100}
                    src="/Images/clogo.png"
                  />
                </div>
                <div className="logo_item">
                  <Image
                    alt="Boxes"
                    width={300}
                    height={100}
                    src="/Images/clogo1.png"
                  />
                </div>
                <div className="logo_item">
                  <Image
                    alt="Boxes"
                    width={300}
                    height={100}
                    src="/Images/clogo2.png"
                  />
                </div>
                <div className="logo_item">
                  <Image
                    alt="Boxes"
                    width={300}
                    height={100}
                    src="/Images/clogo3.png"
                  />
                </div>
                <div className="logo_item">
                  <Image
                    alt="Boxes"
                    width={300}
                    height={100}
                    src="/Images/clogo4.png"
                  />
                </div>
              </div>
            </div>
          </div> */}
        </section>

        {/* our prosecces  */}
        <section className="our_prosess">
          <div className="our_prosess_hed">
            <span>Our Process</span>
            <h1>
              How Grobird De‑Risks AI and <br className="hidden sm:block" />
              <span>Digital Transformation</span>
            </h1>
          </div>

          <div className="our_process_box">
            {/* Box 1 */}
            <div className="our_box">
              <div className="our_box_logo">
                <Image
                  alt="Discovery Icon"
                  src="/Images/Group 70.png"
                  className="process_image"
                  width={100}
                  height={10}
                />
              </div>
              <div className="our_box_content">
                <div className="our_box_content_num">
                  <h1>
                    {/* Shown only on small screens (below sm) */}
                    <span className="sm:hidden">Deep Dive & Discovery</span>

                    {/* Shown only on larger screens (sm and above) */}
                    <span className="hidden sm:inline">
                      Deep Dive & <br /> Discovery
                    </span>
                  </h1>
                  <span> ( 01 )</span>
                </div>

                <br />

                <p>
                  Through strategy calls and audits, we uncover what&apos;s
                  working, missing, and the biggest opportunities lie.
                </p>
              </div>
            </div>

            {/* Box 2 - Orange Background */}
            <div className="our_box our_box_orange">
              <div className="our_box_logo">
                <Image
                  alt="Execute Icon"
                  src="/Images/Group 71.png"
                  className="process_image"
                  width={100}
                  height={10}
                />
              </div>
              <div className="our_box_content">
                <div className="our_box_content_num">
                  <h1>
                    {/* Shown only on small screens (below sm) */}
                    <span className="sm:hidden">Build & Integrate</span>

                    {/* Shown only on larger screens (sm and above) */}
                    <span className="hidden sm:inline">
                      Build & <br /> Integrate
                    </span>
                  </h1>
                  <span style={{ color: "#fff" }}> ( 02 )</span>
                </div>
                <br />

                <p>
                  Design and develop modular, API‑first platforms, workflows,
                  and AI agents that plug into your existing stack securely.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="our_box">
              <div className="our_box_logo">
                <Image
                  alt="Scale Icon"
                  src="/Images/Group 72.png"
                  className="process_image"
                  width={100}
                  height={10}
                />
              </div>
              <div className="our_box_content">
                <div className="our_box_content_num">
                  <h1>
                    {/* Shown only on small screens (below sm) */}
                    <span className="sm:hidden">Optimize & Scale</span>

                    {/* Shown only on larger screens (sm and above) */}
                    <span className="hidden sm:inline">
                      Optimize & <br /> Scale
                    </span>
                  </h1>
                  <span> ( 03 )</span>
                </div>
                <br />

                <p>
                  Run, monitor, and continuously optimize your platforms with
                  observability, FinOps, and automated compliance controls.
                </p>
              </div>
            </div>
          </div>

          <div className="grid-wrapper">
            <div className="grid_card">
              <div className="broder">
                <h1>150%</h1>
                <p>Solutions for Modern Problems</p>
              </div>
              <button>See Project</button>
            </div>

            <div className="grid_card">
              <div className="c_card"></div>
              <div className="c_card">
                <p>
                  “Smart concepts, seamless delivery. Performance you can rely
                  on.”
                </p>
                <button>Create Experience with Us</button>
              </div>
            </div>

            <div className="grid_card">
              <div className="card_l">
                <p>
                  “Clear strategy, beautiful execution. Designed to deliver.”
                </p>
              </div>
              <div className="card_l"></div>
            </div>

            {/*   for mobile responsive */}

            <div className="mobile_grid">
              <div className="mobile_grid_cards">
                <div className="mobile_grid_card"></div>
                <div className="mobile_grid_card">
                  <p>
                    “Smart concepts, seamless delivery. Performance you can rely
                    on.”
                  </p>
                  <button>
                    Create Experience <br /> with Us
                  </button>
                </div>
              </div>

              <div className="mobile_grid_cards">
                <div className="mobile_grid_card">
                  <p>
                    “Clear strategy, beautiful execution. Designed to deliver.”
                  </p>
                </div>
                <div className="mobile_grid_card"></div>
              </div>
            </div>
          </div>
        </section>

        {/* our services  */}
        <section className="services">
          <div className="services_hed">
            <span>Our Services</span>
            {/* Desktop heading – visible on sm and above */}
            <h1 className="hidden sm:block text-white text-4xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-[82px] font-light leading-tight sm:leading-snug mb-4 sm:mb-1 px-4 sm:px-2 text-center w-full">
              Performance-Driven Solutions
              <br />
              for Regulated & High‑Growth Teams
            </h1>

            {/* Mobile heading – visible below sm */}
            <h1 className="block sm:hidden ">
              How Grobird De‑Risks AI and <br />
              <span>Digital Transformation</span>
            </h1>
          </div>

          {/* open cards */}
          <div className="services_cards">
            <div className="cards">
              <div className="cards_left">
                <div className="cards_left_img">
                  <Image
                    alt="Discovery Icon"
                    src="/Images/insights2.png"
                    className="process_image"
                    width={100}
                    height={10}
                  />
                </div>
                <div className="cards_left_text">
                  <h3>Cyber Security Ecosystem For E7 Cyber</h3>
                  <p>
                    We create impactful brand identities that differentiate.
                  </p>
                </div>
              </div>

              {/* Right side cards with interactive hover */}
              <div className="cards_right">
                {rightCards.map((card, index) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <div
                      key={index}
                      className={`cards_right_card ${
                        isExpanded ? "expanded" : ""
                      }`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      onClick={() => router.push(card.route)}
                    >
                      <h1>{card.title}</h1>
                      <div className="extra-content">
                        <p>{card.description}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(card.route);
                          }}
                        >
                          Explore Now!
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="btn">
                  <button>See all services</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* our work */}

        <section className="our_work">
          <div className="our_work_hed">
            <span>Our Work</span>
            <h1>Enterprise & Venture Results</h1>
          </div>

          <div className="wors_cards">
            <div className="top_cards">
              <div className="card">
                <div className="card_img">
                  <Image
                    src={workimg}
                    alt="E7 Cyber project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card_text">
                  <div className="card_text_left">
                    <h1>E7 Cyber</h1>
                  </div>
                  <div className="card_text_right">
                    <ul>
                      <li>• Branding</li>
                      <li>• Website</li>
                      <li>• Devlopment</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card_img">
                  <Image
                    src={workmanimg}
                    alt="E7 Cyber project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card_text">
                  <div className="card_text_left">
                    <h1>M Snell </h1>
                  </div>
                  <div className="card_text_right">
                    <ul>
                      <li>• Website Design</li>
                      <li>• Development</li>
                      <li>• Marketing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="center_cards">
              <div className="center_card">
                <div className="center_card_img">
                  <Image
                    src={p1}
                    alt="E7 Cyber project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="center_card_text">
                  <div className="center_card_text_left">
                    <h1>Project-1</h1>
                  </div>
                  <div className="center_card_text_right">
                    <ul>
                      <li>Branding</li>
                      <li>Marketing</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="center_card">
                <div className="center_card_img">
                  <Image
                    src={p2}
                    alt="E7 Cyber project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="center_card_text">
                  <div className="center_card_text_left">
                    <h1>Project-2</h1>
                  </div>
                  <div className="center_card_text_right">
                    <ul>
                      <li>Website</li>
                      <li>Development</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="center_card">
                <div className="center_card_img">
                  <Image
                    src={p3}
                    alt="E7 Cyber project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="center_card_text">
                  <div className="center_card_text_left">
                    <h1>Project-3</h1>
                  </div>
                  <div className="center_card_text_right">
                    <ul>
                      <li>Branding</li>
                      <li>Marketing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="top_cards">
              <div className="card">
                <div className="card_img">
                  <Image
                    src={b1}
                    alt="E7 Cyber project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card_text">
                  <div className="card_text_left">
                    <h1>Align Chiro Care</h1>
                  </div>
                  <div className="card_text_right">
                    <ul>
                      <li>• Website </li>
                      {/* <li>• Development</li> */}
                      <li>• Marketing</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card_img">
                  <Image
                    src={b2}
                    alt="E7 Cyber project"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card_text">
                  <div className="card_text_left">
                    <h1>A2Y Consultant</h1>
                  </div>
                  <div className="card_text_right">
                    <ul>
                      <li>• Branding</li>
                      <li>• Website</li>
                      <li>• Development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10x drive */}
        {/* <div>
          <div className="flex flex-col mx-[4%] mt-8   md:mt-16 lg:mt-20 xl:mt-28">
            <div
              ref={servicesHeadingRef}
              className="flex flex-col md:flex-row justify-between items-start mb-4 md:mb-6 lg:mb-8 xl:mb-12 gap-4"
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium text-[#000A1B] w-full md:w-[80%] leading-tight">
                Driving <span className="text-[#FE4C00]">10x</span> client{" "}
                <br /> engagement and{" "}
                <span className="text-[#FE4C00]">40%</span> faster <br />{" "}
                time-to-market{" "}
              </h1>

              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] text-[#000A1B] mt-0 md:mt-3">
                Services
              </h3>
            </div>

            <div
              ref={itConsultingRef}
              onClick={() => router.push("/services/servisPages/itConsulting")}
              onMouseEnter={(e) => handleServiceHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleServiceHover(e.currentTarget, false)}
              className="service-hover-item w-full h-[200px] sm:h-[220px] lg:h-[250px] cursor-pointer relative overflow-hidden"
            >
              <div className="service-text-content w-full h-full flex justify-between items-end p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 absolute inset-0">
                <p className="text-[#000000] text-xl md:text-2xl lg:text-3xl xl:text-[42px] font-light">
                  AI Governance & Compliance Platforms
                </p>
                <Image
                  src="/Images/arrowBlack.png"
                  alt="Arrow"
                  width={60}
                  height={60}
                  className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                />
              </div>
              <div
                className="service-expanded-content w-full h-full p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 flex flex-col justify-between opacity-0 absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, #020A18, #023362)",
                }}
              >
                <div className="flex flex-col gap-3 md:gap-4 lg:gap-2">
                  <div className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-light">
                    01
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl lg:text-[42px] font-medium mt-3">
                    AI Governance & Compliance Platforms
                  </h3>
                  <div className="flex justify-between items-end gap-4">
                    <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed">
                      From complex enterprise systems to innovative consumer{" "}
                      <br /> apps, our solutions solve real-world challenges
                      while ensuring <br /> smooth performance, maintainability,
                      and long-term growth.
                    </p>
                    <Image
                      src="/Images/arrow.png"
                      alt="Arrow"
                      width={60}
                      height={60}
                      className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-center mb-6 md:mb-10 lg:mb-12 xl:mb-14">
              <div
                ref={(el) => {
                  if (el) serviceItemsRef.current[0] = el;
                }}
                onClick={() =>
                  router.push("/services/servisPages/customSoftwareDevelopment")
                }
                onMouseEnter={(e) => handleServiceHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleServiceHover(e.currentTarget, false)}
                className="service-hover-item w-full h-[200px] sm:h-[220px] lg:h-[250px] cursor-pointer relative overflow-hidden"
              >
                <div className="service-text-content w-full h-full flex justify-between items-end p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 absolute inset-0">
                  <p className="text-[#000000] text-xl md:text-2xl lg:text-3xl xl:text-[42px] font-light">
                    Enterprise Platforms & Custom Software
                  </p>
                  <Image
                    src="/Images/arrowBlack.png"
                    alt="Arrow"
                    width={60}
                    height={60}
                    className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                  />
                </div>
                <div
                  className="service-expanded-content w-full h-full p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 flex flex-col justify-between opacity-0 absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, #020A18, #023362)",
                  }}
                >
                  <div className="flex flex-col gap-3 md:gap-4 lg:gap-2">
                    <div className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-light">
                      02
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl lg:text-[42px] font-medium mt-3">
                      Enterprise Platforms & Custom Software
                    </h3>
                    <div className="flex justify-between items-end gap-4">
                      <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed">
                        We build scalable, secure, and user-focused <br />{" "}
                        applications tailored to your specific business needs.
                      </p>
                      <Image
                        src="/Images/arrow.png"
                        alt="Arrow"
                        width={60}
                        height={60}
                        className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  if (el) serviceItemsRef.current[1] = el;
                }}
                onClick={() =>
                  router.push("/services/servisPages/Cloud&Infrastructure")
                }
                onMouseEnter={(e) => handleServiceHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleServiceHover(e.currentTarget, false)}
                className="service-hover-item w-full h-[200px] sm:h-[220px] lg:h-[250px] cursor-pointer relative overflow-hidden"
              >
                <div className="service-text-content w-full h-full flex justify-between items-end p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 absolute inset-0">
                  <p className="text-[#000000] text-xl md:text-2xl lg:text-3xl xl:text-[42px] font-light">
                    Cloud, Data Residency & FinOps
                  </p>
                  <Image
                    src="/Images/arrowBlack.png"
                    alt="Arrow"
                    width={60}
                    height={60}
                    className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                  />
                </div>
                <div
                  className="service-expanded-content w-full h-full p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 flex flex-col justify-between opacity-0 absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, #020A18, #023362)",
                  }}
                >
                  <div className="flex flex-col gap-3 md:gap-4 lg:gap-2">
                    <div className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-light">
                      03
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl lg:text-[42px] font-medium mt-3">
                      Cloud, Data Residency & FinOps
                    </h3>
                    <div className="flex justify-between items-end gap-4">
                      <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed">
                        Our solutions ensure seamless scalability, reliable{" "}
                        <br /> performance, and robust security, enabling your
                        business to <br /> operate efficiently and adapt quickly
                        to changing demands.
                      </p>
                      <Image
                        src="/Images/arrow.png"
                        alt="Arrow"
                        width={60}
                        height={60}
                        className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  if (el) serviceItemsRef.current[2] = el;
                }}
                onClick={() =>
                  router.push("/services/servisPages/productEngineering")
                }
                onMouseEnter={(e) => handleServiceHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleServiceHover(e.currentTarget, false)}
                className="service-hover-item w-full h-[200px] sm:h-[220px] lg:h-[250px] cursor-pointer relative overflow-hidden"
              >
                <div className="service-text-content w-full h-full flex justify-between items-end p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 absolute inset-0">
                  <p className="text-[#000000] text-xl md:text-2xl lg:text-3xl xl:text-[42px] font-light">
                    Venture Studio & Product Engineering
                  </p>
                  <Image
                    src="/Images/arrowBlack.png"
                    alt="Arrow"
                    width={60}
                    height={60}
                    className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                  />
                </div>
                <div
                  className="service-expanded-content w-full h-full p-4 px-6 md:p-6 md:px-10 lg:pr-24 lg:p-6 lg:pb-10 lg:px-14 flex flex-col justify-between opacity-0 absolute inset-0"
                  style={{
                    background: "linear-gradient(to bottom, #020A18, #023362)",
                  }}
                >
                  <div className="flex flex-col gap-3 md:gap-4 lg:gap-2">
                    <div className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-light">
                      04
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl lg:text-[42px] font-medium mt-3">
                      Venture Studio & Product Engineering
                    </h3>
                    <div className="flex justify-between items-end gap-4">
                      <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-2xl leading-relaxed">
                        Our team designs, develops, and maintains software that{" "}
                        <br /> delights users, drives engagement, and supports
                        your <br /> business growth through innovation and
                        technical excellence.
                      </p>
                      <Image
                        src="/Images/arrow.png"
                        alt="Arrow"
                        width={60}
                        height={60}
                        className="object-contain w-10 h-10 md:w-12 md:h-12 lg:w-[60px] lg:h-[60px] flex-shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/services")}
                className="text-white bg-[#FF662A] px-6 py-3 mt-8 md:mt-12 lg:mt-16 text-sm md:text-base rounded-sm hover:bg-[#e55a24] transition-colors mb-10"
              >
                View all services
              </button>
            </div> */}

        {/* Vision Background Image */}
        {/* <div
              ref={developIdeaRef}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[559px] mb-8 md:mb-12 relative"
            >
              <Image
                src="/Images/visonbackgroundblack.png"
                alt="Vision Background"
                width={1920}
                height={1080}
                className="w-full rounded-xl h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/Images/miniBird.png"
                  alt="Bird"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
              <div className="bg-white w-[200px] sm:w-[250px] md:w-[300px] lg:w-[335px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[230px] absolute bottom-0 right-0 flex items-end justify-end">
                <div
                  onClick={() => router.push("/contact")}
                  className="w-[180px] sm:w-[220px] md:w-[280px] lg:w-[310px] h-[130px] sm:h-[160px] md:h-[180px] lg:h-[200px] bg-[#FE4C00] rounded-xl flex items-center justify-between p-3 sm:p-4 md:p-5 lg:p-6 cursor-pointer hover:bg-[#e55a24] transition-colors"
                >
                  <div className="flex flex-col">
                    <p className="text-white text-sm sm:text-lg md:text-xl lg:text-[28px] font-normal">
                      Develop <br /> Your Idea
                    </p>
                    <p className="text-white text-lg sm:text-2xl md:text-3xl lg:text-[42px] font-bold">
                      Now
                    </p>
                  </div>
                  <Image
                    src="/Images/roundedArrow.png"
                    alt="Rounded Arrow"
                    width={110}
                    height={110}
                    className="object-contain w-12 sm:w-16 md:w-20 lg:w-[110px] h-12 sm:h-16 md:h-20 lg:h-[110px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* our success */}
        {/* <div> */}
        {/* <div className="mx-[4%]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              <h1
                ref={successHeadingRef}
                className="text-[#0F1011] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium w-full lg:w-[65%] leading-tight"
              >
                <span className="text-[#3B3B3D73]">
                  Our Success, Quantified:
                </span>
                <br />
                Driving Growth, Innovation, and Scale
              </h1>

              <div
                ref={statsCardsRef}
                className="w-full lg:w-[50%] h-full bg-[#D3D3D347] flex flex-col gap-6 md:gap-8 lg:gap-12 p-4 md:p-5 lg:px-5"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8">
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1
                      ref={stat1Ref}
                      className="text-[#060B13] text-2xl sm:text-3xl md:text-4xl xl:text-[43.5px] font-semibold"
                    >
                      0<span className="text-[#FF662A]">+</span>
                    </h1>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] font-semibold text-center">
                      On-time delivery rate
                    </p>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] text-center">
                      Projects delivered on schedule, every time
                    </p>
                  </div>
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1
                      ref={stat2Ref}
                      className="text-[#060B13] text-2xl sm:text-3xl md:text-4xl xl:text-[43.5px] font-semibold"
                    >
                      0<span className="text-[#FF662A]">x</span>
                    </h1>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] font-semibold text-center">
                      Higher Client Retention
                    </p>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] text-center">
                      Clients keep coming back for more
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8">
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1
                      ref={stat3Ref}
                      className="text-[#060B13] text-2xl sm:text-3xl md:text-4xl xl:text-[43.5px] font-semibold"
                    >
                      0<span className="text-[#FF662A]">%</span>
                    </h1>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] font-semibold text-center">
                      Client Satisfaction Rate
                    </p>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] text-center">
                      Ensuring every client is delighted
                    </p>
                  </div>
                  <div className="flex-col flex items-center justify-center gap-2 md:gap-3 w-full sm:w-[200px] md:w-[240px] lg:w-[280px] h-[140px] md:h-[160px] lg:h-[180px]">
                    <h1
                      ref={stat4Ref}
                      className="text-[#060B13] text-2xl sm:text-3xl md:text-4xl xl:text-[43.5px] font-semibold"
                    >
                      0<span className="text-[#FF662A]">+</span>
                    </h1>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] font-semibold text-center">
                      Continents Served
                    </p>
                    <p className="text-[#363D4F] text-xs sm:text-sm md:text-base xl:text-[16px] text-center">
                      Delivering solutions across multiple
                      <br />
                      continents
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div> */}

        {/* bold moves */}
        {/* <div
          style={{
            background: "linear-gradient(to bottom, #FFFFFF, #F4F4F45C)",
          }}
        >
          <div className="mx-[4%] pb-1">
            <div className="w-full items-center flex flex-col mt-8 md:mt-12 lg:mt-16 xl:mt-20 mb-6 md:mb-8 lg:mb-10 xl:mb-12">
              <div
                ref={boldMovesHeadingRef}
                className="flex flex-col sm:flex-row justify-between items-start w-full my-6 sm:my-8 md:my-12 lg:my-16 xl:my-20 gap-4 sm:gap-6 md:gap-8"
              >
                <div className="flex items-start text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium text-[#3B3B3D73] flex-col gap-2 leading-tight">
                  <p>Big Steps, Bold Moves</p>
                  <p className="text-black">Our Latest Releases</p>
                </div>
                <p className="text-[#2D2C2C] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-relaxed">
                  Press Releases
                </p>
              </div>

              <div
                className="flex gap-3 md:gap-4 lg:gap-5 items-center justify-start md:justify-center w-full md:w-[95%] lg:w-[90%] h-auto md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 px-4 md:px-0"
                style={{ scrollbarWidth: "thin" }}
              >
                <div className="flex h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={(el) => {
                      if (el) boldMovesRef.current[0] = el;
                    }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[300px] md:h-[350px] lg:h-[380px] xl:h-[477px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/1bm.jpg"
                      alt="Bold Move 1"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">
                        A2Y Consultants Website
                      </p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={(el) => {
                      if (el) boldMovesRef.current[1] = el;
                    }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[220px] md:h-[250px] lg:h-[280px] xl:h-[318px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/2bm.jpg"
                      alt="Bold Move 2"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">
                        A2Y Consultants Website
                      </p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      if (el) boldMovesRef.current[2] = el;
                    }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[180px] md:h-[200px] lg:h-[230px] xl:h-[275px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/3bm.png"
                      alt="Bold Move 3"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute top-3 md:top-4 lg:top-5 left-2 md:left-3 right-2 md:right-3">
                      <p className="text-white text-3xl md:text-4xl lg:text-5xl">
                        92%
                      </p>
                    </div>
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3">
                      <p className="text-white text-xs md:text-sm lg:text-md uppercase">
                        Product Adoption Rate
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={(el) => {
                      if (el) boldMovesRef.current[3] = el;
                    }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[300px] md:h-[350px] lg:h-[380px] xl:h-[477px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/4bm.jpg"
                      alt="Bold Move 4"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">
                        AHMADYAR Website
                      </p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 h-[350px] md:h-full items-center justify-center flex-shrink-0">
                  <div
                    ref={(el) => {
                      if (el) boldMovesRef.current[4] = el;
                    }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[180px] md:h-[200px] lg:h-[230px] xl:h-[275px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/5bm.png"
                      alt="Bold Move 5"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute top-3 md:top-4 lg:top-5 left-2 md:left-3 right-2 md:right-3">
                      <p className="text-white text-3xl md:text-4xl lg:text-5xl">
                        3X
                      </p>
                    </div>
                    <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-2 md:left-3 right-2">
                      <p className="text-white text-xs md:text-sm lg:text-md uppercase">
                        Faster Go-to-Market
                      </p>
                    </div>
                  </div>

                  <div
                    ref={(el) => {
                      if (el) boldMovesRef.current[5] = el;
                    }}
                    className="relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[220px] md:h-[250px] lg:h-[280px] xl:h-[318px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                    onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                  >
                    <Image
                      src="/Images/serviseImages/boldmoves/6bm.jpg"
                      alt="Bold Move 6"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2">
                      <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">
                        A2Y Consultants Website
                      </p>
                      <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                        Read Release
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Testimonials Section */}

        <div className="mx-[4%]">
          <div
            ref={testimonialsHeadingRef}
            className="flex flex-col sm:flex-row justify-between items-start w-full my-8 sm:my-10 md:my-16 xl:my-30 gap-[0.3rem] sm:gap-6 md:gap-8"
          >
            {/* Testimonials */}
            <p className="text-[#2D2C2C] text-[21px] font-medium sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-tight order-1 sm:order-2 max-sm:text-[16px] max-sm:font-normal">
              Testimonials
            </p>

            {/* Satisfaction block */}
            <div className="flex items-start flex-col gap-[0.3rem] sm:gap-2 leading-tight order-2 sm:order-1">
              <p className="text-[28px] font-medium sm:text-2xl md:text-3xl max-sm:text-[32px] max-sm:font-medium max-sm:text-[#000A1B]">
                98% client
              </p>

              <p className="text-[28px] font-medium sm:text-2xl md:text-3xl text-[#3B3B3D73] max-sm:text-[32px] max-sm:font-medium">
                satisfaction rate
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section with Testimonial */}

        <div
          ref={testimonialImageRef}
          className="w-full relative mt-8 md:mt-12 lg:mt-16 xl:mt-20 mb-8 md:mb-12 lg:mb-16 xl:mb-24"
        >
          <Image
            src="/Images/serviseImages/footer.jpg"
            alt="Roadmap Image"
            width={1920}
            height={200}
            className="object-cover w-full h-[450px] sm:h-[450px] md:h-[600px] lg:h-[700px] xl:h-[800px]"
          />

          {/* Quote */}

          <div className="absolute inset-0 flex items-center w-full md:w-[60%] lg:w-[50%] pl-[1rem] sm:ml-[4%] md:ml-[2%] pb-[4rem] sm:pb-0 justify-start">
            <p className="text-[22px] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white text-start px-0 md:px-4 font-extralight leading-relaxed">
              &ldquo;Looking for process improvements,{" "}
              <br className="hidden sm:block" /> we found a solution that{" "}
              <br className="hidden sm:block" /> transformed our entire data{" "}
              <br className="hidden sm:block" /> strategy. The depth of insights
              was <br className="hidden sm:block" /> remarkable.&rdquo;
            </p>
          </div>

          {/* Bottom section */}
          <div className="absolute inset-0 flex items-end mx-[4%] md:mx-[3%] my-[3%] sm:my-[2%] md:my-[1%] justify-between">
            {/* Author */}
            <p className="footer-author text-white text-[17px] sm:text-xs md:text-sm pb-[4rem] sm:pb-0">
              Maya Singh <br /> Product Strategy Lead
            </p>

            {/* Video button */}
            <div className="flex items-center gap-1 md:gap-2">
              <Image
                src="/Images/serviseImages/play.png"
                width={40}
                height={40}
                alt="video play"
                className="hidden sm:block w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />

              <p className="hidden sm:block text-white sm:text-xs md:text-sm lg:text-md">
                Watch video
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mx-[4%]">
          <div
            ref={insightsHeadingRef}
            className="flex flex-col sm:flex-row justify-between items-start w-full gap-4 sm:gap-6 md:gap-8 mt-8 mb-14"
          >
            {/* Left heading */}
            <div className="flex items-start text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium text-black flex-col gap-1 leading-tight order-2 sm:order-1">
              <p className="text-[26px] sm:text-2xl md:text-3xl max-sm:text-[32px] max-sm:font-medium max-sm:text-black">
                Insights from Grobird
              </p>

              <p className="text-[24px] sm:text-2xl md:text-3xl text-[#3B3B3D73] max-sm:text-[32px] max-sm:font-medium">
                Experts
              </p>
            </div>

            {/* Blogs title */}
            <p className="text-[#2D2C2C] text-[18px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-relaxed order-1 sm:order-2 max-sm:text-[16px] max-sm:font-normal max-sm:text-[#000A1B]">
              Blogs
            </p>
          </div>
        </div>

        {/* Insights Section Wrapper */}
        <div>
          <InsightsSection
            title=""
            titleHighlight=""
            buttonText=""
            insights={[
              {
                imageSrc: "/Images/insights1.png",
                title: "The art of storytelling in branding and advertising",
                category: "Branding",
                date: "Mar 1, 2025",
                readTime: "8min read",
              },
              {
                imageSrc: "/Images/insights2.png",
                title: "The art of storytelling in branding and advertising",
                category: "Technology",
                date: "Feb 28, 2025",
                readTime: "10min read",
              },
              {
                imageSrc: "/Images/insights3.png",
                title: "Product engineering best practices for startups",
                category: "Development",
                date: "Feb 25, 2025",
                readTime: "12min read",
              },
            ]}
          />

          {/* Button hidden on mobile */}
          <div className="hidden sm:flex justify-center items-center mx-[4%] pt-5 mb-8 md:mb-16 lg:mb-20">
            <button
              onClick={() => router.push("/insights")}
              className="bg-[#FF662A] text-white px-6 py-3 text-sm flex items-center gap-2 hover:bg-[#e55a24] transition-colors rounded-sm"
            >
              More articles
              <Image
                src="/Images/arrow.png"
                alt="Arrow"
                width={20}
                height={20}
                className="object-contain"
              />
            </button>
          </div>
        </div>

        {/* question */}
        <div className="faq-section flex flex-col gap-12 md:gap-16 lg:gap-20 mx-[4%] mb-12 md:mb-16 lg:mb-20">
          <div
            ref={faqHeadingRef}
            className="flex flex-col lg:flex-row justify-between items-start w-full mt-12 md:mt-16 lg:mt-20 mb-5 gap-6 md:gap-8"
          >
            <div className="flex w-full lg:w-[60%] items-start text-4xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium text-black flex-col gap-2 leading-tight">
              <p>Frequently Asked</p>
              <p className="text-[#3B3B3D73]">Questions</p>
            </div>

            <p className="text-[#2D2C2C] text-sm sm:text-sm md:text-base lg:text-lg w-full lg:w-[40%] xl:text-3xl leading-relaxed">
              From setup to security, here&apos;s everything you need to know
              before getting started.
            </p>
          </div>

          <div className="flex flex-col w-full px-0 md:px-6 lg:px-10 items-center gap-3 md:gap-5">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="faq-item-container w-full flex flex-col border border-[#68636352] rounded-md overflow-hidden"
              >
                <div
                  ref={(el) => {
                    if (el) faqItemsRef.current[index] = el;
                  }}
                  onClick={() => toggleFaq(index)}
                  className="p-2 px-4 md:p-3 md:px-7 w-full flex items-center justify-between gap-4 cursor-pointer hover:bg-black/5 transition-colors"
                >
                  <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                    {item.question}
                  </p>
                  <Image
                    src="/Images/serviseImages/plus.png"
                    alt="toggle"
                    width={22}
                    height={22}
                    className={`w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0 transition-transform duration-300 ${
                      openFaqIndex === index ? "rotate-45" : ""
                    }`}
                  />
                </div>
                <div
                  ref={(el) => {
                    faqAnswerRefs.current[index] = el;
                  }}
                  className="px-4 md:px-7 overflow-hidden h-0 opacity-0"
                >
                  <p className="text-[#5A5A5A] text-sm sm:text-base md:text-lg lg:text-xl pb-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Box */}
        <div
          ref={ctaSectionRef}
          className="w-full h-[900px] sm:h-[1100px] md:h-[1400px] lg:h-[1700px] xl:h-[2180px] relative overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 2%, #FE4B00A1 92%, #FFFFFF 100%)",
          }}
        >
          {/* Bird Image Container */}
          <div
            ref={ctaBirdRef}
            className="absolute top-0 left-[5%] sm:left-[8%] md:left-[12%] lg:left-40 w-[90%] sm:w-[85%] md:w-full h-full flex items-start justify-center md:justify-start"
          >
            <Image
              src="/Images/takeFlight.png"
              alt="Take Flight"
              width={1000}
              height={1200}
              className="w-full sm:w-[90%] md:w-[85%] h-[650px] sm:h-[650px] md:h-[850px] lg:h-[1050px] xl:h-[1250px] object-contain"
              priority
            />
          </div>

          {/* Content Section */}

          <div
            ref={ctaContentRef}
            className="absolute top-[430px] sm:top-[620px] md:top-[820px] lg:top-[1000px] xl:top-[1050px] left-1/2 md:left-3/5 -translate-x-1/2 flex flex-col items-start text-start pl-[3rem] sm:px-6 md:px-6 gap-5 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-7xl"
          >
            {/* Heading */}
            <h2 className="text-black text-[30px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[80px] font-light leading-tight">
              Ready to Build Governance‑Ready AI{" "}
              <br className="hidden md:block" /> and Digital Infrastructure?
            </h2>

            {/* Description */}
            <p className="text-black font-light text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[32px] leading-relaxed max-w-xs sm:max-w-md md:max-w-4xl lg:max-w-5xl">
              Book a 45‑minute roadmap session with Grobird’s{" "}
              <br className="hidden md:block" /> architecture and compliance
              leaders.
            </p>

            {/* Desktop buttons */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center mt-2 md:mt-4 w-full sm:w-auto">
              <button
                onClick={() => router.push("/contact")}
                className="bg-[#FF672C] text-white px-4 sm:px-6 lg:px-18 font-medium py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-[17px] hover:bg-[#e55a24] transition-colors w-full sm:w-auto"
              >
                Book Strategy Session
              </button>

              <button
                onClick={() => router.push("/services")}
                className="bg-white text-black px-4 sm:px-6 lg:px-14 py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm hover:bg-gray-100 transition-colors md:text-[17px] font-medium w-full sm:w-auto border border-gray-200"
              >
                Explore Services
              </button>
            </div>

            {/* Mobile-only button */}
            <button
              onClick={() => router.push("/contact")}
              className="sm:hidden bg-white text-black px-8 py-4 rounded-[30px] font-medium mt-2"
            >
              Book Strategy Session
            </button>
          </div>

          {/* Cloud Image at Bottom */}

          <div
            ref={ctaCloudLeftRef}
            className="absolute -bottom-24 sm:-bottom-32 md:-bottom-48 lg:-bottom-70 xl:-bottom-90 -left-8 md:-left-16 lg:-left-24 w-[110%] md:w-[108%] lg:w-[106%] z-10"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/Images/clouds/c2.png"
              alt="Cloud"
              width={1200}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>

          <div
            ref={ctaCloudBottomRef}
            className="absolute -bottom-8 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 -right-12 sm:-right-16 md:-right-24 lg:-right-50 z-10 opacity-30 sm:opacity-40 w-[65%] sm:w-[55%] md:w-auto"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/Images/clouds/c4.png"
              alt="Cloud"
              width={1000}
              height={200}
              className="w-full h-auto object-cover"
            />
          </div>

          <div
            ref={ctaCloudRightRef}
            className="absolute -bottom-24 sm:-bottom-32 md:-bottom-48 lg:-bottom-70 xl:-bottom-90 -right-8 md:-right-16 lg:-right-24 w-[110%] md:w-[108%] lg:w-[106%] z-10"
            style={{ willChange: "transform" }}
          >
            <Image
              src="/Images/clouds/c2.png"
              alt="Cloud"
              width={1000}
              height={300}
              className="w-full h-auto object-cover scale-x-[-1]"
            />
          </div>
        </div>

        {/* Footer */}
        <div>
          <FooterSimple />
        </div>
      </div>
    </>
  );
};

export default Home;
