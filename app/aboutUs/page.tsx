"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InsightsSection from "@/app/components/service/InsightsSection";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import FooterSimple from "../components/FooterSimple";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const router = useRouter();
  const textRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const boxesRef = useRef<HTMLImageElement>(null);
  const birdRef = useRef<HTMLImageElement>(null);
  const missionSectionRef = useRef<HTMLDivElement>(null);
  const missionBoxRef = useRef<HTMLDivElement>(null);
  const visionBoxRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<HTMLDivElement[]>([]);
  const storyHeadingRef = useRef<HTMLHeadingElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);
  const storyImagesRef = useRef<HTMLDivElement[]>([]);
  const moreThanServiceRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<HTMLDivElement[]>([]);
  const servicesHeadingRef = useRef<HTMLDivElement>(null);
  const servicesItemsRef = useRef<HTMLDivElement[]>([]);
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const teamHeadingRef = useRef<HTMLHeadingElement>(null);
  const teamMembersRef = useRef<HTMLDivElement[]>([]);
  const aboutStatCounter1Ref = useRef<HTMLHeadingElement>(null);
  const aboutStatCounter2Ref = useRef<HTMLHeadingElement>(null);
  const aboutStatCounter3Ref = useRef<HTMLHeadingElement>(null);
  const aboutStatCounter4Ref = useRef<HTMLHeadingElement>(null);

  // Header initial animation
  useEffect(() => {
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 0, y: 60 });
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      });
    }

    if (subheadingRef.current) {
      gsap.set(subheadingRef.current, { opacity: 0, y: 40 });
      gsap.to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      });
    }

    if (boxesRef.current) {
      gsap.set(boxesRef.current, { opacity: 0, y: 80, scale: 0.9 });
      gsap.to(boxesRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        delay: 0.9,
        ease: "power3.out",
      });
    }

    if (birdRef.current) {
      gsap.set(birdRef.current, { opacity: 0, scale: 0.8, rotation: -10 });
      gsap.to(birdRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        delay: 1.2,
        ease: "power3.out",
      });
    }
  }, []);

  // Mission/Vision section scroll animation
  useEffect(() => {
    if (missionBoxRef.current && missionSectionRef.current) {
      gsap.set(missionBoxRef.current, { opacity: 0, x: -100, rotationY: -20 });
      gsap.to(missionBoxRef.current, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionSectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }

    if (visionBoxRef.current && missionSectionRef.current) {
      gsap.set(visionBoxRef.current, { opacity: 0, x: 100, scale: 0.9 });
      gsap.to(visionBoxRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionSectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Testimonials staggered animation
  useEffect(() => {
    const testimonials = testimonialRefs.current.filter(Boolean);

    if (testimonials.length > 0) {
      testimonials.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 80, scale: 0.9 });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.15 * index,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonials[0],
            start: "top 75%",
            once: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Our Story section animation
  useEffect(() => {
    if (storyHeadingRef.current) {
      gsap.set(storyHeadingRef.current, { opacity: 0, x: -80 });
      gsap.to(storyHeadingRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyHeadingRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }

    if (storyContentRef.current) {
      const paragraphs = storyContentRef.current.querySelectorAll("p");
      paragraphs.forEach((p, index) => {
        gsap.set(p, { opacity: 0, y: 40 });
        gsap.to(p, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3 + index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyContentRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    }

    const storyImages = storyImagesRef.current.filter(Boolean);
    if (storyImages.length > 0) {
      storyImages.forEach((img, index) => {
        gsap.set(img, { opacity: 0, scale: 0.85, y: 60 });
        gsap.to(img, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: 0.2 * index,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyImages[0],
            start: "top 80%",
            once: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // More than service section and stats animation
  useEffect(() => {
    if (moreThanServiceRef.current) {
      gsap.set(moreThanServiceRef.current, { opacity: 0, y: 50 });
      gsap.to(moreThanServiceRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: moreThanServiceRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }

    const stats = statsRefs.current.filter(Boolean);
    if (stats.length > 0) {
      stats.forEach((stat, index) => {
        gsap.set(stat, { opacity: 0, scale: 0.8, y: 50 });
        gsap.to(stat, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1 * index,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: stats[0],
            start: "top 75%",
            once: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Services section animation
  useEffect(() => {
    if (servicesHeadingRef.current) {
      gsap.set(servicesHeadingRef.current, { opacity: 0, y: 50 });
      gsap.to(servicesHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: servicesHeadingRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }

    const serviceItems = servicesItemsRef.current.filter(Boolean);
    if (serviceItems.length > 0) {
      serviceItems.forEach((item, index) => {
        gsap.set(item, { opacity: 0, x: -60 });
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.1 * index,
          ease: "power2.out",
          scrollTrigger: {
            trigger: serviceItems[0],
            start: "top 80%",
            once: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Team section animation
  useEffect(() => {
    if (teamHeadingRef.current) {
      gsap.set(teamHeadingRef.current, { opacity: 0, y: 60, scale: 0.95 });
      gsap.to(teamHeadingRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }

    const teamMembers = teamMembersRef.current.filter(Boolean);
    if (teamMembers.length > 0) {
      teamMembers.forEach((member, index) => {
        gsap.set(member, { opacity: 0, y: 80, scale: 0.9 });
        gsap.to(member, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.15 * index,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: "top 65%",
            once: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Scrolling text animation
  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: "-100%",
        duration: 10,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  // Counter animation effect
  useEffect(() => {
    const counters = [
      { ref: aboutStatCounter1Ref, target: 10, suffix: "x" },
      { ref: aboutStatCounter2Ref, target: 200, suffix: "+" },
      { ref: aboutStatCounter3Ref, target: 97, suffix: "%" },
      { ref: aboutStatCounter4Ref, target: 5, suffix: "+" },
    ];

    counters.forEach(({ ref, target, suffix }) => {
      if (ref.current && statsRefs.current[1]) {
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRefs.current[1],
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerHTML = `${Math.round(
                counter.value
              )}<span class="text-[#F95524]">${suffix}</span>`;
            }
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <div>
        {/* heading */}
        <div className="bg-custom-bg w-full h-full pt-6 sm:pt-8 md:pt-12 lg:pt-24 relative pl-4 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-18">
          <div className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-2 sm:gap-6 md:gap-8 lg:gap-12">
              <h1
                ref={headingRef}
                className="text-white text-[42px] pt-8 sm:text-3xl md:text-3xl lg:text-4xl xl:text-[82px] font-light w-full lg:w-[70%] leading-tight max-sm:font-extralight max-sm:leading-[55px]"
              >
                We build
                <br />
                technology that
                <br />
                builds businesses
              </h1>

              <h3
                ref={subheadingRef}
                className="text-white font-light text-[14px] sm:text-base md:text-md lg:text-md xl:text-[30px] 2xl:text-2xl w-full lg:w-[35%] leading-6 sm:leading-10 mt-2 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 max-sm:font-normal max-sm:leading-[17px]"
              >
                Whether you&apos;re rethinking IT infrastructure, building
                custom software, or scaling digital products we help you move
                with speed and confidence.
              </h3>
            </div>

            <div className="w-full relative pt-4 sm:pt-0 sm:aspect-[2.5/1] md:aspect-[3/1] -ml-4 sm:ml-0">
              <Image
                ref={boxesRef}
                src="/Images/boxes.png"
                alt="Boxes"
                width={800}
                height={300}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[120%] sm:w-[110%] md:w-full lg:w-full xl:w-full h-auto object-contain"
              />

              {/* Desktop: Orange Bird */}
              <Image
                ref={birdRef}
                src="/Images/orangeBird.png"
                alt="Orange Bird"
                width={900}
                height={500}
                className="hidden sm:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-auto z-20"
              />

              {/* Mobile: Vector.png - Full width to left edge, 0.6rem right padding, 1rem top padding */}
              <Image
                src="/Images/Vector.png"
                alt="Mobile Bird"
                width={900}
                height={500}
                className="sm:hidden w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* descp */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-10 py-6 sm:py-8 md:py-12 lg:py-16 mx-auto">
          {/* H3 first on mobile */}
          <h3 className="text-[#000A1B] text-[24px] font-normal pt-8 md:pt-0 md:text-3xl lg:text-4xl lg:w-[30%] text-start lg:text-end order-1 lg:order-2 max-sm:leading-[29px]">
            Our Mission/Vision
          </h3>

          {/* H2 second on mobile */}
          <h2 className="text-[#000A1B] text-[32px] font-medium md:text-4xl lg:text-5xl xl:text-6xl leading-tight w-full lg:w-[70%] order-2 lg:order-1">
            <span className="text-[#3B3B3D73]">Turning Bold Ideas</span> <br />
            into Impactful <br />
            Products
          </h2>
        </div>

        {/* vision boxes */}
        <div
          ref={missionSectionRef}
          className="flex flex-col lg:flex-row gap-2 lg:gap-1 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-2 mx-auto"
        >
          {/* Mission Box */}
          <div
            ref={missionBoxRef}
            className="w-full lg:w-[37%] bg-gradient-to-br from-[#020B18] to-[#023362] rounded-[20px] px-8 sm:p-6 py-6 sm:py-7 text-white font-inter mt-4 lg:mt-0 h-auto lg:h-[480px] max-sm:py-12"
          >
            {/* Mission */}
            <div className="mb-10 sm:mb-8">
              <h3 className="text-[20px] leading-[28.6px] font-medium sm:text-2xl xl:text-[32px] mb-3 max-sm:leading-[29px]">
                Our Mission
              </h3>
              <p className="text-[16px] font-normal sm:text-lg xl:text-[24px] mb-6 sm:mb-6 leading-6 sm:leading-9 max-sm:leading-[19px] max-sm:text-white/80">
                To empower businesses with technology that delivers measurable
                impact and long-term value.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h3 className="text-[20px] leading-[28.6px] font-medium sm:text-2xl xl:text-[32px] mb-3 max-sm:leading-[29px]">
                Our Vision
              </h3>
              <p className="text-[16px] font-normal sm:text-lg xl:text-[24px] mb-6 sm:mb-6 leading-6 sm:leading-9 max-sm:leading-[19px] max-sm:text-white/80">
                To be the catalyst for innovation, helping businesses thrive in
                a digital-first world.
              </p>
            </div>
          </div>

          {/* Vision box hidden only on mobile */}
          <div
            ref={visionBoxRef}
            className="hidden lg:block w-full lg:w-[63%] relative rounded-lg overflow-hidden h-64 sm:h-80 lg:h-[480px]"
          >
            <Image
              src="/Images/visonbackgroundblack.png"
              alt="Vision Background"
              width={600}
              height={200}
              className="w-full h-full object-cover"
            />
            <Image
              src="/Images/minibird.png"
              alt="Mini Bird"
              width={100}
              height={100}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <p className="absolute bottom-4 sm:bottom-6 right-2 sm:right-4 text-white text-sm sm:text-xl xl:text-[32px] font-inter font-medium text-end opacity-42 leading-10">
              From vision to velocity that&apos;s <br /> the Grobird way
            </p>
          </div>
        </div>

        {/* three boxes review */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-1 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-16 mx-auto">
          <div
            ref={(el) => {
              if (el) testimonialRefs.current[2] = el;
            }}
            className="w-full md:w-1/3 h-auto md:h-[326px] bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between max-sm:pl-8 max-sm:pt-12 max-sm:pb-12 max-sm:hidden"
          >
            <div>
              <div className="flex gap-1 mb-8 md:mb-7">
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
              </div>
              <p className="text-[#0B0B0B] text-[16px] font-normal leading-[25.8px] md:text-base md:font-medium md:leading-relaxed xl:text-[18px]">
                Partnering with Grobird gave us the confidence to dream bigger.
                Their expertise in product engineering and cloud solutions
                helped us grow faster than we imagined.
              </p>
            </div>
            <div className="mt-8 md:mt-4">
              <p className="text-[#0B0B0B] text-[18px] font-medium leading-[20.8px] md:text-base md:font-semibold xl:text-[18px]">
                Ankit Sharma
              </p>
              <p className="text-[#666666] text-[13.88px] font-medium leading-[22.4px] md:text-xs xl:text-[13px]">
                Founder, EdTech Startup
              </p>
            </div>
          </div>

          <div
            ref={(el) => {
              if (el) testimonialRefs.current[1] = el;
            }}
            className="w-full md:w-1/3 h-auto md:h-[326px] bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-8 md:mb-7">
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
              </div>
              <p className="text-[#0B0B0B] text-[16px] font-normal leading-[25.8px] md:text-base md:font-medium md:leading-relaxed xl:text-[18px]">
                What impressed us most was Grobird&apos;s ability to balance
                speed with quality. They helped us scale our platform without
                downtime, and their support didn&apos;t stop after launch.
              </p>
            </div>
            <div className="mt-8 md:mt-4">
              <p className="text-[#0B0B0B] text-[18px] font-medium leading-[20.8px] md:text-base md:font-semibold xl:text-[18px]">
                Ankit Sharma
              </p>
              <p className="text-[#666666] text-[13.88px] font-medium leading-[22.4px] md:text-xs xl:text-[13px]">
                Founder, EdTech Startup
              </p>
            </div>
          </div>
          <div
            ref={(el) => {
              if (el) testimonialRefs.current[2] = el;
            }}
            className="w-full md:w-1/3 h-auto md:h-[326px] bg-[#D3D3D347] rounded-lg p-4 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1 mb-8 md:mb-7">
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
                <Image
                  src="/Images/starblue.png"
                  alt="Star"
                  width={18}
                  height={16.7}
                  className="w-[18px] h-[16.7px] md:w-4 md:h-4"
                />
              </div>
              <p className="text-[#0B0B0B] text-[16px] font-normal leading-[25.8px] md:text-base md:font-medium md:leading-relaxed xl:text-[18px]">
                Partnering with Grobird gave us the confidence to dream bigger.
                Their expertise in product engineering and cloud solutions
                helped us grow faster than we imagined.
              </p>
            </div>
            <div className="mt-8 md:mt-4">
              <p className="text-[#0B0B0B] text-[18px] font-medium leading-[20.8px] md:text-base md:font-semibold xl:text-[18px]">
                Ankit Sharma
              </p>
              <p className="text-[#666666] text-[13.88px] font-medium leading-[22.4px] md:text-xs xl:text-[13px]">
                Founder, EdTech Startup
              </p>
            </div>
          </div>
        </div>

        {/* OUR STORY */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 px-4 sm:px-4 md:px-8 lg:px-12 xl:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-2 mx-auto xl:py-10">
          <h2
            ref={storyHeadingRef}
            className="text-[#000A1B] flex text-[32px] font-medium leading-tight pt-8 sm:text-3xl sm:pt-0 md:text-4xl xl:text-[64px] 2xl:text-6xl w-full lg:w-[30%]"
          >
            <span className="text-[#3B3B3D73] mr-3">Our</span>{" "}
            <span className="text-[#000000]">Story</span>
          </h2>
          <div
            ref={storyContentRef}
            className="flex flex-col sm:gap-8 w-full lg:w-[65%]"
          >
            <p className="text-[16px] font-normal leading-[36px] text-black md:text-base md:leading-10 lg:text-lg xl:text-[32px] xl:mt-20 md:mt-16px">
              GroBird began with a simple belief &mdash; technology should not
              just solve problems, it should inspire growth. What started as a
              small team of passionate engineers and designers has now evolved
              into a full-scale digital partner trusted by businesses worldwide.
            </p>

            <p className="text-[#3D3D3DDB] text-[16px] font-normal leading-[36px] md:text-base md:leading-10 lg:text-lg xl:text-[32px]">
              Over the years, we&apos;ve delivered 100+ transformative projects,
              empowered 50+ global clients, and expanded our expertise across
              consulting, development, hosting, and design. But at the heart of
              every milestone lies one constant &mdash; our commitment to
              crafting human-centered solutions that create lasting impact.
            </p>
            <p className="text-[#3D3D3DDB] text-[16px] font-normal leading-[36px] md:text-base md:leading-10 lg:text-lg xl:text-[32px]">
              From our very first line of code to the innovative platforms we
              build today, GroBird has always been about more than technology.
              We are about people, ideas, and the journeys that shape them.
            </p>
          </div>
        </div>

        {/* our story boxes - FIXED: Replaced backgroundImage with Next.js Image */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 px-4 sm:px-3 md:px-4 lg:px-5 xl:px-8 pb-6 sm:py-6 md:py-9 lg:py-14 mx-auto items-center justify-center">
          <div
            ref={(el) => {
              if (el) storyImagesRef.current[0] = el;
            }}
            className="w-full sm:w-1/3 h-[452px] sm:h-[452px] relative rounded-lg overflow-hidden"
          >
            <Image
              src="/Images/ourStory1.png"
              alt="Our Story 1"
              fill
              className="object-cover"
            />
          </div>
          <div
            ref={(el) => {
              if (el) storyImagesRef.current[1] = el;
            }}
            className="w-full sm:w-1/3 h-[452px] sm:h-[452px] relative rounded-lg overflow-hidden"
          >
            <Image
              src="/Images/ourStory2.png"
              alt="Our Story 2"
              fill
              className="object-cover"
            />
          </div>
          <div
            ref={(el) => {
              if (el) storyImagesRef.current[2] = el;
            }}
            className="w-full sm:w-1/3 h-[452px] sm:h-[452px] relative rounded-lg overflow-hidden"
          >
            <Image
              src="/Images/ourStory3.png"
              alt="Our Story 3"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between pl-6 pt-4 pb-8">
              <h2 className="text-white font-medium text-[20px] leading-[33.6px] sm:text-[28px] sm:leading-[33.6px]">
                &quot;We expected performance improvements, but the strategic
                implementation delivered unprecedented operational
                excellence.&quot;
              </h2>
              <div className="text-white text-[14px] leading-[19.6px] font-normal mb-4 sm:mb-6">
                <div>Paula Bennett</div>
                <div>VP of Product Development, Morance</div>
              </div>
            </div>
          </div>
        </div>

        {/* more than a service */}
        <div
          ref={moreThanServiceRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-2 sm:pb-3 md:pb-10 lg:pb-18 mx-auto items-start sm:items-center justify-between pt-5 lg:pt-16"
        >
          <div className="order-2 sm:order-1 w-full">
            <h2 className="text-[#000A1B] flex flex-col text-[32px] font-medium sm:text-3xl md:text-4xl xl:text-[64px] 2xl:text-6xl sm:font-medium leading-tight w-full lg:w-[80%]">
              <span className="text-[#3B3B3D73]">More than a service</span>
              <span className="text-[#0B0B0B]">A strategic design </span>
              <span className="text-[#0B0B0B]">partner.</span>
            </h2>
          </div>
          <h3 className="text-[#000A1B] text-[24px] font-normal order-1 sm:order-2 sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] lg:w-[25%] text-start sm:text-end mt-1">
            Why Grobird?
          </h3>
        </div>

        {/* more than a servis boxes */}

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 px-6 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-2 sm:pb-3 md:pb-4 lg:pb-6 mx-auto pt-2">
          <Image
            ref={(el) => {
              if (el) statsRefs.current[0] = el;
            }}
            src="/Images/morethanService.png"
            alt="More than Service"
            width={416}
            height={672}
            className="w-full md:row-span-2 h-auto object-contain mb-4 md:mb-0"
          />

          <div className="grid grid-cols-2 gap-4 md:contents">
            <div
              ref={(el) => {
                if (el) statsRefs.current[1] = el;
              }}
              className="bg-[#D3D3D347] rounded-[20px] md:rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start w-full md:w-auto md:h-auto md:min-h-[120px] h-[198px]"
            >
              <h3
                ref={aboutStatCounter1Ref}
                className="flex text-[42px] font-semibold mb-5 md:mb-8 md:text-3xl sm:text-4xl md:text-5xl lg:text-7xl md:mb-0"
              >
                0<span className="text-[#F95524]">x</span>
              </h3>
              <p className="text-[#5A5A5A] text-[14px] sm:text-sm xl:text-[18px]">
                Higher Client Retention
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) statsRefs.current[2] = el;
              }}
              className="bg-[#D3D3D347] rounded-[20px] md:rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start w-full md:w-auto md:h-auto md:min-h-[120px] h-[198px]"
            >
              <h3
                ref={aboutStatCounter2Ref}
                className="flex text-[42px] font-semibold mb-5 md:mb-8 md:text-3xl sm:text-4xl md:text-5xl lg:text-7xl md:mb-0"
              >
                0<span className="text-[#F95524]">+</span>
              </h3>
              <p className="text-[#5A5A5A] text-[14px] sm:text-sm xl:text-[18px]">
                Successfully delivered high-quality projects
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) statsRefs.current[3] = el;
              }}
              className="bg-[#D3D3D347] rounded-[20px] md:rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start w-full md:w-auto md:h-auto md:min-h-[120px] h-[198px]"
            >
              <h3
                ref={aboutStatCounter3Ref}
                className="flex text-[42px] font-semibold mb-5 md:mb-8 md:text-3xl sm:text-4xl md:text-5xl lg:text-7xl md:mb-0"
              >
                0<span className="text-[#F95524]">%</span>
              </h3>
              <p className="text-[#5A5A5A] text-[14px] sm:text-sm xl:text-[18px]">
                Client satisfaction based on surveys
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) statsRefs.current[4] = el;
              }}
              className="bg-[#D3D3D347] rounded-[20px] md:rounded-lg flex flex-col justify-between p-6 sm:p-8 lg:p-10 items-start w-full md:w-auto md:h-auto md:min-h-[120px] h-[198px]"
            >
              <h3
                ref={aboutStatCounter4Ref}
                className="flex text-[42px] font-semibold mb-5 md:mb-8 md:text-3xl sm:text-4xl md:text-5xl lg:text-7xl md:mb-0"
              >
                0<span className="text-[#F95524]">+</span>
              </h3>
              <p className="text-[#5A5A5A] text-[14px] font-normal sm:text-sm sm:font-inherit xl:text-[18px]">
                Continents Served
              </p>
            </div>
          </div>
        </div>

        {/* new */}
      </div>

      {/* Services Section - UNCOMMENTED AND FIXED with mobile responsive */}
      <div
        ref={servicesHeadingRef}
        className="flex flex-col sm:flex-row gap-4 sm:gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-2 sm:pb-3 md:pb-10 lg:pb-24 mx-auto items-start sm:items-center justify-between pt-5 lg:pt-32"
      >
        <h2 className="text-[#000A1B] flex flex-col text-[32px] font-medium sm:text-3xl md:text-4xl xl:text-[64px] 2xl:text-6xl sm:font-medium leading-tight w-full lg:w-[80%] order-2 sm:order-1">
          <span className="text-[#3B3B3D73]">How We Help</span>
          <span className="text-[#0B0B0B]">Businesses Grow</span>
        </h2>
        <h3 className="text-[#000A1B] text-[14px] font-normal order-1 sm:order-2 sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] lg:w-[25%] text-start sm:text-end mt-1 max-sm:text-[24px] max-sm:leading-[29px]">
          Services
        </h3>
      </div>

      {/* help points - FIXED: Mobile responsive with 2rem padding, h3 24px, h4 20px, p 16px */}
      <div className="w-full gap-1 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 pb-3 sm:pb-5 md:pb-8 lg:pb-12 mx-auto flex flex-col pt-2 max-w-full overflow-hidden">
        {/* Item 1 */}
        <div
          ref={(el) => {
            if (el) servicesItemsRef.current[0] = el;
          }}
          className="flex flex-col lg:flex-row pb-4 sm:py-0 w-full"
        >
          <div className="border-t-1 border-t-[#dbdbdb] flex flex-col sm:flex-row items-start sm:items-center w-full lg:w-[60%] pt-5 sm:pt-10 xl:pt-12 pb-3 sm:pb-10 xl:pb-12">
            <div className="flex items-center w-full sm:w-auto">
              <h4 className="text-[#C3C3C3] text-2xl font-medium sm:text-2xl lg:text-3xl xl:text-[48px] sm:font-normal w-[50px] flex-shrink-0 leading-none">
                01.
              </h4>

              <h3 className="text-[16px] sm:text-base lg:text-lg xl:text-[32px] xl:font-medium ml-4 sm:ml-8 leading-none sm:leading-tight whitespace-normal sm:whitespace-normal break-words pr-4 sm:pr-0 max-w-[calc(100vw-120px)]">
                Custom Software Development
              </h3>
            </div>
          </div>
          <p className="text-[16px] sm:text-sm sm:mt-2 lg:mt-3 xl:text-[24px] text-[#737373] w-full lg:w-[40%] ml-[calc(50px+1rem)] sm:ml-0 leading-relaxed break-words pr-4 sm:pr-0 max-w-[calc(100vw-100px)]">
            We design and build tailor-made software solutions that solve
            complex business challenges, improve efficiency
          </p>
        </div>

        {/* Item 2 */}
        <div
          ref={(el) => {
            if (el) servicesItemsRef.current[1] = el;
          }}
          className="flex flex-col lg:flex-row pb-4 sm:py-0 w-full"
        >
          <div className="border-t-1 border-t-[#dbdbdb] flex flex-col sm:flex-row items-start sm:items-center w-full lg:w-[60%] pt-5 sm:pt-10 xl:pt-12 pb-3 sm:pb-10 xl:pb-12">
            <div className="flex items-center w-full sm:w-auto">
              <h4 className="text-[#C3C3C3] text-2xl font-medium sm:text-2xl lg:text-3xl xl:text-[48px] sm:font-normal w-[50px] flex-shrink-0 leading-none">
                02.
              </h4>
              <h3 className="text-[17px] sm:text-base lg:text-lg xl:text-[32px] xl:font-medium ml-4 sm:ml-8 leading-none sm:leading-tight whitespace-normal sm:whitespace-normal break-words pr-4 sm:pr-0 max-w-[calc(100vw-120px)]">
                IT Consulting
              </h3>
            </div>
          </div>
          <p className="text-[16px] sm:text-sm sm:mt-2 lg:mt-3 xl:text-[24px] text-[#737373] w-full lg:w-[40%] ml-[calc(50px+1rem)] sm:ml-0 leading-relaxed break-words pr-4 sm:pr-0 max-w-[calc(100vw-100px)]">
            Our experts guide you through technology strategy, digital
            transformation, and process optimization
          </p>
        </div>

        {/* Item 3 */}
        <div
          ref={(el) => {
            if (el) servicesItemsRef.current[2] = el;
          }}
          className="flex flex-col lg:flex-row pb-4 sm:py-0 w-full"
        >
          <div className="border-t-1 border-t-[#dbdbdb] flex flex-col sm:flex-row items-start sm:items-center w-full lg:w-[60%] pt-5 sm:pt-10 xl:pt-12 pb-3 sm:pb-10 xl:pb-12">
            <div className="flex items-center w-full sm:w-auto">
              <h4 className="text-[#C3C3C3] text-2xl font-medium sm:text-2xl lg:text-3xl xl:text-[48px] sm:font-normal w-[50px] flex-shrink-0 leading-none">
                03.
              </h4>
              <h3 className="text-[17px] sm:text-base lg:text-lg xl:text-[32px] xl:font-medium ml-4 sm:ml-8 leading-none sm:leading-tight whitespace-normal sm:whitespace-normal break-words pr-4 sm:pr-0 max-w-[calc(100vw-120px)]">
                Cloud & Infrastructure Services
              </h3>
            </div>
          </div>
          <p className="text-[16px] sm:text-sm sm:mt-2 lg:mt-3 xl:text-[24px] text-[#737373] w-full lg:w-[40%] ml-[calc(50px+1rem)] sm:ml-0 leading-relaxed break-words pr-4 sm:pr-0 max-w-[calc(100vw-100px)]">
            From migration to management, we deliver scalable, secure, and
            cost-effective cloud infrastructure
          </p>
        </div>

        {/* Item 4 */}
        <div
          ref={(el) => {
            if (el) servicesItemsRef.current[3] = el;
          }}
          className="flex flex-col lg:flex-row pb-4 sm:py-0 w-full"
        >
          <div className="border-t-1 border-t-[#dbdbdb] flex flex-col sm:flex-row items-start sm:items-center w-full lg:w-[60%] pt-5 sm:pt-10 xl:pt-12 pb-3 sm:pb-10 xl:pb-12">
            <div className="flex items-center w-full sm:w-auto">
              <h4 className="text-[#C3C3C3] text-2xl font-medium sm:text-2xl lg:text-3xl xl:text-[48px] sm:font-normal w-[50px] flex-shrink-0 leading-none">
                04.
              </h4>
              <h3 className="text-[17px] sm:text-base lg:text-lg xl:text-[32px] xl:font-medium ml-4 sm:ml-8 leading-none sm:leading-tight whitespace-normal sm:whitespace-normal break-words pr-4 sm:pr-0 max-w-[calc(100vw-120px)]">
                Product Engineering
              </h3>
            </div>
          </div>
          <p className="text-[16px] sm:text-sm sm:mt-2 lg:mt-3 xl:text-[24px] text-[#737373] w-full lg:w-[40%] ml-[calc(50px+1rem)] sm:ml-0 leading-relaxed break-words pr-4 sm:pr-0 max-w-[calc(100vw-100px)]">
            End-to-end product design, development, and scaling from concept to
            launch so you can bring innovative ideas to market faster
          </p>
        </div>
      </div>

      {/* Meet people - UNCOMMENTED AND FIXED  */}
      {/* <div ref={teamSectionRef} className="flex flex-col gap-8 px-4 sm:px-5 md:px-7 lg:px-9 xl:px-12 py-3 sm:py-5 md:py-8 lg:py-12 mx-auto item-center justify-center pt-2">
        <h2 ref={teamHeadingRef} className="text-[#000A1B] mb-5 text-center flex flex-col text-2xl sm:text-3xl md:text-4xl xl:text-[64px] 2xl:text-6xl font-medium ">
          <span className="text-[#3B3B3D73]">Meet the People</span>
          <span className="text-[#0B0B0B]">Behind Grobird</span>
        </h2>
        <div className="relative">
          <div className="block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 sm:-translate-y-12 md:-translate-y-15 text-[#E0E0E094] text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[180px] font-semibold uppercase tracking-wider z-0 overflow-hidden w-screen">
            <div ref={textRef} className="whitespace-nowrap">
              OUR TEAM OUR STORY OUR VISION OUR MISSION OUR TEAM OUR STORY OUR VISION OUR MISSION
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center relative z-10">
            <div ref={el => { if (el) teamMembersRef.current[0] = el }} className="flex flex-col items-center relative">
              <Image src="/Images/people1.png" alt="Person 1" width={300} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />
              <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                <div>
                  <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                  <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                </div>
                <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div ref={el => { if (el) teamMembersRef.current[1] = el }} className="flex flex-col items-center">
              <Image src="/Images/people2.png" alt="Person 2" width={200} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />
              <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                <div>
                  <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                  <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                </div>
                <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
            <div ref={el => { if (el) teamMembersRef.current[2] = el }} className="flex flex-col items-center">
              <Image src="/Images/people3.png" alt="Person 3" width={200} height={200} className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg" />
              <div className="flex justify-between items-center w-60 sm:w-72 lg:w-80 mt-4">
                <div>
                  <p className="text-[#0B0B0B] font-medium text-sm sm:text-base">Vaibhav Srivastava</p>
                  <p className="text-[#666666] text-xs sm:text-sm">Director</p>
                </div>
                <Image src="/Images/linkedin.png" alt="LinkedIn" width={12} height={12} className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Insights */}
      <InsightsSection
        title="All"
        titleHighlight="Insights"
        buttonText="More articles"
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
      <Footer />
      <div className="block sm:hidden">
        <FooterSimple />
      </div>
    </div>
  );
};

export default AboutUs;
