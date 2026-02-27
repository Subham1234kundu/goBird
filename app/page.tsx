"use client";

import PaperBird3D from "@/components/PaperBird3D";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InsightsSection from "@/app/components/service/InsightsSection";
import FooterSimple from "./components/FooterSimple";
import { useRouter } from "next/navigation";
// import logo from "../public/Images/Group 70.png";
// import logo2 from "../public/Images/Group 71.png";
// import logo3 from "../public/Images/Group 72.png";
import box_img1 from "../public/Images/List → Listitem → Link.png";
import box_img from "../public/Images/Image.png";
import box_img2 from "../public/Images/g-img1.png";
import box_img3 from "../public/Images/g-img.png";
import img_mobile from "../public/Images/insights2.png";
import workimg from "../public/Images/insights2.png";
import workmanimg from "../public/Images/workman.png";
import p1 from "../public/Images/p-1.png";
import p2 from "../public/Images/p-2.png";
import p3 from "../public/Images/p-3.png";
import b1 from "../public/Images/b-1.png";
import b2 from "../public/Images/b-2.png";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const router = useRouter();
  // Refs for all animated sections
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroContentWrapperRef = useRef<HTMLDivElement>(null);
  const startupsHeadingRef = useRef<HTMLHeadingElement>(null);
  const startupLogosRef = useRef<HTMLDivElement>(null);
  const servicesHeadingRef = useRef<HTMLDivElement>(null);
  const itConsultingRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const developIdeaRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const statsCardsRef = useRef<HTMLDivElement>(null);
  const boldMovesHeadingRef = useRef<HTMLDivElement>(null);
  const boldMovesRef = useRef<(HTMLDivElement | null)[]>([]);
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
  const stat1Ref = useRef<HTMLHeadingElement>(null);
  const stat2Ref = useRef<HTMLHeadingElement>(null);
  const stat3Ref = useRef<HTMLHeadingElement>(null);
  const stat4Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Kill existing ScrollTrigger animations only
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Reset all animated elements to initial visible state
    const resetElements = [
      heroHeadingRef.current,
      heroDescRef.current,
      startupsHeadingRef.current,
      developIdeaRef.current,
      successHeadingRef.current,
      statsCardsRef.current,
      boldMovesHeadingRef.current,
      testimonialsHeadingRef.current,
      testimonialImageRef.current,
      insightsHeadingRef.current,
    ];

    // Reset testimonial elements specifically
    if (testimonialImageRef.current) {
      const footerQuote =
        testimonialImageRef.current.querySelector(".footer-quote");
      const footerAuthor =
        testimonialImageRef.current.querySelector(".footer-author");
      const footerPlay =
        testimonialImageRef.current.querySelector(".footer-play");
      if (footerQuote) gsap.set(footerQuote, { clearProps: "all" });
      if (footerAuthor) gsap.set(footerAuthor, { clearProps: "all" });
      if (footerPlay) gsap.set(footerPlay, { clearProps: "all" });
    }

    resetElements.forEach((el) => {
      if (el) gsap.set(el, { clearProps: "all" });
    });

    // Reset arrays of elements
    serviceItemsRef.current.forEach((el) => {
      if (el) gsap.set(el, { clearProps: "all" });
    });

    boldMovesRef.current.forEach((el) => {
      if (el) gsap.set(el, { clearProps: "all" });
    });

    faqItemsRef.current.forEach((el) => {
      if (el) gsap.set(el, { clearProps: "all" });
    });

    if (heroButtonsRef.current)
      gsap.set(heroButtonsRef.current.children, { clearProps: "all" });
    if (heroContentWrapperRef.current)
      gsap.set(heroContentWrapperRef.current, { clearProps: "all" });
    if (startupLogosRef.current)
      gsap.set(startupLogosRef.current.children, { clearProps: "all" });

    // Ensure CTA section elements are always visible - set inline styles
    if (ctaBirdRef.current) {
      ctaBirdRef.current.style.opacity = "1";
      ctaBirdRef.current.style.visibility = "visible";
    }
    if (ctaContentRef.current) {
      ctaContentRef.current.style.opacity = "1";
      ctaContentRef.current.style.visibility = "visible";
      const children = ctaContentRef.current.querySelectorAll("*");
      children.forEach((child: Element) => {
        if (child instanceof HTMLElement) {
          child.style.opacity = "1";
          child.style.visibility = "visible";
        }
      });
    }
    if (ctaCloudLeftRef.current) {
      ctaCloudLeftRef.current.style.opacity = "1";
      ctaCloudLeftRef.current.style.visibility = "visible";
    }
    if (ctaCloudRightRef.current) {
      ctaCloudRightRef.current.style.opacity = "1";
      ctaCloudRightRef.current.style.visibility = "visible";
    }
    if (ctaCloudBottomRef.current) {
      ctaCloudBottomRef.current.style.opacity = "1";
      ctaCloudBottomRef.current.style.visibility = "visible";
    }

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
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
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

    // Hero Section - Text shrinks in center position and stays pinned (graphic design style)
    if (heroContentWrapperRef.current && heroSectionRef.current) {
      // Pin the text first - keeps it in center position only during hero section
      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom center", // Unpin when hero section is halfway scrolled
        pin: heroContentWrapperRef.current,
        pinSpacing: false,
      });

      // Then shrink it in place (no y movement, stays centered)
      gsap.to(heroContentWrapperRef.current, {
        scale: 0.6, // Shrink to 60%
        opacity: 0, // Fade out as it shrinks
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom center", // Complete fade by halfway point
          scrub: 1,
          onUpdate: (self) => {
            // Dispatch custom event with scroll progress for birds
            const event = new CustomEvent("heroTextFade", {
              detail: { progress: self.progress },
            });
            window.dispatchEvent(event);
          },
        },
      });
    }

    // Startups Section
    if (startupsHeadingRef.current) {
      gsap.from(startupsHeadingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: startupsHeadingRef.current,
          start: "top 80%",
          end: "top 50%",
          once: true,
        },
      });
    }

    if (startupLogosRef.current) {
      gsap.from(startupLogosRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: startupLogosRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }

    // Services Section - keep visible without animation
    if (servicesHeadingRef.current) {
      gsap.set(servicesHeadingRef.current, { opacity: 1, x: 0 });
    }

    // IT Consulting section - keep visible without animation
    if (itConsultingRef.current) {
      gsap.set(itConsultingRef.current, { opacity: 1, y: 0 });
    }

    // Service Items Stagger
    serviceItemsRef.current.forEach((item) => {
      if (item) {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      }
    });

    // Develop Idea Image
    if (developIdeaRef.current) {
      gsap.from(developIdeaRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: developIdeaRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }

    // Success/Stats Section
    if (successHeadingRef.current) {
      gsap.from(successHeadingRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: successHeadingRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }

    if (statsCardsRef.current) {
      gsap.from(statsCardsRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statsCardsRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Animate stat numbers with counter effect
      const statNumbers = statsCardsRef.current.querySelectorAll("h1");
      statNumbers.forEach((stat) => {
        const text = stat.textContent || "";
        const numberMatch = text.match(/\d+/);

        if (numberMatch) {
          const targetNumber = parseInt(numberMatch[0]);
          const suffix = text.match(/[+%x]/i)?.[0] || "";

          // Create a counter object
          const counter = { value: 0 };

          gsap.to(counter, {
            value: targetNumber,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              const current = Math.ceil(counter.value);
              // Preserve the HTML structure with the colored span
              stat.innerHTML = `${current}<span class="text-[#FF662A]">${suffix}</span>`;
            },
          });
        }
      });
    }

    // Bold Moves Section
    if (boldMovesHeadingRef.current) {
      gsap.set(boldMovesHeadingRef.current.children, { opacity: 1, y: 0 });
      gsap.from(boldMovesHeadingRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: boldMovesHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // Bold Moves Cards Stagger
    boldMovesRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });
      }
    });

    // Testimonials Section
    if (testimonialsHeadingRef.current) {
      gsap.set(testimonialsHeadingRef.current.children, { opacity: 1, y: 0 });
      gsap.from(testimonialsHeadingRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: testimonialsHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // Testimonial Image - No animations

    // Insights Section
    if (insightsHeadingRef.current) {
      gsap.set(insightsHeadingRef.current.children, { opacity: 1, y: 0 });
      gsap.from(insightsHeadingRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: insightsHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }

    // FAQ Section - keep visible without animation
    if (faqHeadingRef.current) {
      gsap.set(faqHeadingRef.current, { opacity: 1, y: 0 });
    }

    // FAQ Items animation removed - keeping FAQ heading always visible

    faqItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
        });
      }
    });

    // CTA Section - Bird with floating animation
    if (ctaBirdRef.current) {
      const birdImg = ctaBirdRef.current.querySelector("img");
      if (birdImg instanceof HTMLElement) {
        birdImg.style.opacity = "1";
        birdImg.style.visibility = "visible";
      }

      // Continuous floating animation only
      gsap.to(birdImg, {
        y: -30,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Subtle rotation animation
      gsap.to(birdImg, {
        rotation: 5,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // CTA Content
    if (ctaContentRef.current) {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaContentRef.current,
          start: "top 75%",
          once: true,
        },
      });

      ctaTl
        .from(ctaContentRef.current.querySelector("h2"), {
          y: 50,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ctaContentRef.current.querySelector("p"),
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ctaContentRef.current.querySelectorAll("button"),
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
          },
          "-=0.3"
        );
    }

    // Cloud Animations - Smooth continuous loop without reset
    if (ctaCloudLeftRef.current) {
      // Left cloud - slide in from left
      gsap.from(ctaCloudLeftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Smooth continuous loop - goes to 90% and back seamlessly
      gsap.to(ctaCloudLeftRef.current, {
        y: -10.8,
        x: 18,
        duration: 7.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play pause resume pause",
        },
      });
    }

    if (ctaCloudRightRef.current) {
      // Right cloud - slide in from right
      gsap.from(ctaCloudRightRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Smooth continuous loop - goes to 90% and back seamlessly
      gsap.to(ctaCloudRightRef.current, {
        y: -7.2,
        x: -13.5,
        duration: 9.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play pause resume pause",
        },
      });
    }

    if (ctaCloudBottomRef.current) {
      // Bottom cloud - slide up from bottom
      gsap.from(ctaCloudBottomRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Smooth continuous loop - goes to 90% and back seamlessly
      gsap.to(ctaCloudBottomRef.current, {
        x: 18,
        duration: 11.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.8,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 70%",
          toggleActions: "play pause resume pause",
        },
      });
    }

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Kill all GSAP tweens
      gsap.killTweensOf("*");
    };
  }, []);

  // Counter animation effect
  useEffect(() => {
    const counters = [
      { ref: stat1Ref, target: 200, suffix: "+" },
      { ref: stat2Ref, target: 10, suffix: "x" },
      { ref: stat3Ref, target: 97, suffix: "%" },
      { ref: stat4Ref, target: 5, suffix: "+" },
    ];

    counters.forEach(({ ref, target, suffix }) => {
      if (ref.current && statsCardsRef.current) {
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsCardsRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerHTML = `${Math.round(
                counter.value
              )}<span class="text-[#FF662A]">${suffix}</span>`;
            }
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const [activeCard, setActiveCard] = useState(0); // First card open by default

  const cards = [
    {
      title: "SaaS Platform Development",
      description:
        "Shape human-centered experiences that seamlessly blend beauty and functionality, turning complex ideas into intuitive products.",
      leftTitle: "Cyber Security Ecosystem",
      leftSubtitle: "For E7 Cyber",
      leftText: "We create impactful brand identities that differentiate.",
    },
    {
      title: "Product Engineering",
      description:
        "Shape human-centered experiences that seamlessly blend beauty and functionality, turning complex ideas into intuitive products.",
      leftTitle: "Product Design & Development",
      leftSubtitle: "For Innovators",
      leftText: "Building scalable products with cutting-edge technology.",
    },
    {
      title: "MVP Development",
      description:
        "Shape human-centered experiences that seamlessly blend beauty and functionality, turning complex ideas into intuitive products.",
      leftTitle: "Rapid Prototyping",
      leftSubtitle: "For Startups",
      leftText: "Quickly validate ideas with minimum viable products.",
    },
    {
      title: "Cloud & Infrastructure",
      description:
        "Shape human-centered experiences that seamlessly blend beauty and functionality, turning complex ideas into intuitive products.",
      leftTitle: "Cloud Solutions",
      leftSubtitle: "For Enterprises",
      leftText: "Scalable and secure cloud infrastructure solutions.",
    },
  ];

  return (
    <>
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
          <div className="absolute top-[120px] left-0 w-full h-[50vh] z-0">
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
              className="text-white text-4xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-[82px] font-light leading-tight sm:leading-snug mb-4 sm:mb-1 px-4 sm:px-2 text-center w-full max-sm:text-[45px] max-sm:font-normal max-sm:px-0"
            >
              Transforming Ideas into <br className="hidden xs:block" />{" "}
              Scalable Digital Solutions
            </h1>

            {/* Description - Centered and larger on mobile */}

            <p
              ref={heroDescRef}
              className="text-white font-light mt-4 sm:mt-2 text-base sm:text-sm md:text-lg lg:text-xl xl:text-3xl leading-relaxed max-w-[90%] sm:max-w-full 2xl:max-w-6xl mb-8 sm:mb-7 xl:mb-8 2xl:mb-10 px-4 sm:px-4 text-center max-sm:px-0 max-sm:text-base max-sm:font-light max-sm:leading-5 max-sm:tracking-[-0.01em]"
            >
              Grobird accelerates innovation through IT consulting, software{" "}
              <br className="hidden sm:block" /> development, and cloud
              solutions.
            </p>

            {/* Buttons - Stacked vertically on mobile, horizontal on desktop */}
            <div
              ref={heroButtonsRef}
              className="flex flex-col sm:flex-row gap-4 sm:gap-4 items-center justify-center w-full sm:w-auto max-sm:flex-row max-sm:justify-center max-sm:gap-8"
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
              <h1>97%</h1>
              <p>Client satisfaction based on surveys</p>
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
              A Proven, Data-Backed Process That{" "}
              <br className="hidden sm:block" />
              <span>Converts Strategy Into Results</span>
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
                    <span className="sm:hidden">Deep Dive & Discovery</span>

                    {/* Shown only on larger screens (sm and above) */}
                    <span className="hidden sm:inline">
                      Launch & <br /> Execute
                    </span>
                  </h1>
                  <span style={{ color: "#fff" }}> ( 02 )</span>
                </div>
                <br />

                <p>
                  With strategy locked, we roll out high-impact campaigns,
                  creative content, and across key channels.
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
                    <span className="sm:hidden">Deep Dive & Discovery</span>

                    {/* Shown only on larger screens (sm and above) */}
                    <span className="hidden sm:inline">
                      Optimize & <br /> Scale
                    </span>
                  </h1>
                  <span> ( 03 )</span>
                </div>
                <br />

                <p>
                  We continuously test, analyze, and refine. From A/B testing
                  to, our team fine-tunes your campaigns.
                </p>
              </div>
            </div>
          </div>

          <div className="grid-wrapper">
            <div className="grid-container">
              {/* Left Tall */}
              <div className="grid-item tall">
                <Image
                  src={box_img1}
                  alt="Business insights"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Middle Column */}
              <div className="grid-col">
                <div className="grid-item">
                  <Image
                    src={box_img}
                    alt="Business insights image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Content Box */}
                <div className="grid-item content-box">
                  <h1>
                    Smart concepts, seamless delivery. Performance you can rely
                    on.
                  </h1>

                  <button>Create Experience with Us</button>
                </div>
              </div>

              {/* Right Column */}
              <div className="grid-col right-col">
                <div className="grid-item">
                  <Image
                    src={box_img2}
                    alt="Business insights"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="grid-item">
                  <Image
                    src={box_img3}
                    alt="Business insights image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* our services  */}

        <section className="our_servives">
          <div className="our_servives_hed">
            <span>Our Services</span>
            <h1>
              Performance-Driven Solutions <br /> That Turn Traffic Into Revenue
            </h1>
          </div>
          <div className="services_card">
            <div className="services_card_left">
              <Image
                src={img_mobile}
                alt="Service demonstration"
                style={{ width: "100%", height: "auto" }}
              />
              <br />
              <h3>
                {cards[activeCard].leftTitle} <br />{" "}
                {cards[activeCard].leftSubtitle}
              </h3>
              <p>{cards[activeCard].leftText}</p>
            </div>

            <div className="services_card_right">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`services_card_right_card ${
                    activeCard === index ? "active" : ""
                  }`}
                  onMouseEnter={() => setActiveCard(index)}
                >
                  <h1>{card.title}</h1>

                  <div className="card_content">
                    <p>{card.description}</p>
                    <button>Explore Now!</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bottom_button">
            <button>See all services</button>
          </div>
        </section>

        {/* our work */}

        <section className="our_work">
          <div className="our_work_hed">
            <span>Our Work</span>
            <h1>
              A Proven, Data-Backed Process That <br />{" "}
              <span>Converts Strategy Into Results</span>
            </h1>
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
                  <img src={workmanimg.src} alt="iamge" />
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
                  <img src={p1.src} alt="" />
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
                  <img src={p2.src} alt="" />
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
                  <img src={p3.src} alt="" />
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
                  <img src={b1.src} alt="iamge" />
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
                  <img src={b2.src} alt="iamge" />
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
                  IT Consulting
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
                    IT Consulting
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
                    Custom Software Development
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
                      Custom Software Development
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
                    Cloud & Infrastructure
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
                      Cloud & Infrastructure
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
                    Product Engineering
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
                      Product Engineering
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
            <p className="text-[#2D2C2C] text-[21px] font-medium sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-tight order-1 sm:order-2">
              Testimonials
            </p>

            {/* Satisfaction block */}
            <div className="flex items-start flex-col gap-[0.3rem] sm:gap-2 leading-tight order-2 sm:order-1">
              <p className="text-[28px] font-medium sm:text-2xl md:text-3xl">
                98% client
              </p>

              <p className="text-[28px] font-medium sm:text-2xl md:text-3xl text-[#3B3B3D73]">
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
              <p className="text-[26px] sm:text-2xl md:text-3xl">
                Insights from Grobird
              </p>

              <p className="text-[24px] sm:text-2xl md:text-3xl text-[#3B3B3D73]">
                Experts
              </p>
            </div>

            {/* Blogs title */}
            <p className="text-[#2D2C2C] text-[18px] sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-relaxed order-1 sm:order-2">
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
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-20 mx-[4%] mb-12 md:mb-16 lg:mb-20">
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
            <div
              ref={(el) => {
                if (el) faqItemsRef.current[0] = el;
              }}
              className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border w-full flex items-center justify-between gap-4"
            >
              <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                What kind of teams use Relay?
              </p>
              <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={22}
                height={22}
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
              />
            </div>

            <div
              ref={(el) => {
                if (el) faqItemsRef.current[1] = el;
              }}
              className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border w-full flex items-center justify-between gap-4"
            >
              <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Does Relay work with Slack and Microsoft Teams?
              </p>
              <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={22}
                height={22}
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
              />
            </div>

            <div
              ref={(el) => {
                if (el) faqItemsRef.current[2] = el;
              }}
              className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border w-full flex items-center justify-between gap-4"
            >
              <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Is there a free trial?
              </p>
              <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={22}
                height={22}
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
              />
            </div>

            <div
              ref={(el) => {
                if (el) faqItemsRef.current[3] = el;
              }}
              className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border w-full flex items-center justify-between gap-4"
            >
              <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Is my data secure?
              </p>
              <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={22}
                height={22}
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
              />
            </div>

            <div
              ref={(el) => {
                if (el) faqItemsRef.current[4] = el;
              }}
              className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border w-full flex items-center justify-between gap-4"
            >
              <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Can I collaborate with my engineering team inside Relay?
              </p>
              <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={22}
                height={22}
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
              />
            </div>

            <div
              ref={(el) => {
                if (el) faqItemsRef.current[5] = el;
              }}
              className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border w-full flex items-center justify-between gap-4"
            >
              <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Does Relay support multi-channel communication?
              </p>
              <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={22}
                height={22}
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
              />
            </div>

            <div
              ref={(el) => {
                if (el) faqItemsRef.current[6] = el;
              }}
              className="border-[#68636352] rounded-md p-2 px-4 md:p-3 md:px-7 border w-full flex items-center justify-between gap-4"
            >
              <p className="text-[#111111] text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[24px]">
                Can I customize how Relay works for my team?
              </p>
              <Image
                src="/Images/serviseImages/plus.png"
                alt="plus"
                width={22}
                height={22}
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] flex-shrink-0"
              />
            </div>
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
              className="w-full sm:w-[90%] md:w-[85%] h-[500px] sm:h-[650px] md:h-[850px] lg:h-[1050px] xl:h-[1250px] object-contain"
              priority
            />
          </div>

          {/* Content Section */}

          <div
            ref={ctaContentRef}
            className="absolute top-[480px] sm:top-[620px] md:top-[820px] lg:top-[1000px] xl:top-[1050px] left-1/2 md:left-3/5 -translate-x-1/2 flex flex-col items-start text-start pl-[3rem] sm:px-6 md:px-6 gap-5 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-7xl"
          >
            {/* Heading */}
            <h2 className="text-black text-[30px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[100px] font-light leading-tight">
              Ideas take <br className="sm:hidden" /> flight here
            </h2>

            {/* Description */}
            <p className="text-black font-light text-[16px] sm:text-base md:text-lg lg:text-xl xl:text-[32px] leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl">
              From concept to code, we transform bold visions into living
              digital experiences that soar.
            </p>

            {/* Desktop buttons */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center mt-2 md:mt-4 w-full sm:w-auto">
              <button
                onClick={() => router.push("/contact")}
                className="bg-[#FF672C] text-white px-4 sm:px-6 lg:px-18 font-medium py-1.5 sm:py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-[17px] hover:bg-[#e55a24] transition-colors w-full sm:w-auto"
              >
                Talk to Us
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
              Get In Touch
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
