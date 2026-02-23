"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import FooterSimple from "@/app/components/FooterSimple";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const router = useRouter();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const mediumImagesRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement[]>([]);
  const boldMovesRef = useRef<HTMLDivElement[]>([]);
  const boldMovesSectionRef = useRef<HTMLDivElement>(null);
  const boldMovesHeadingRef = useRef<HTMLDivElement>(null);
  const serveHeadingRef = useRef<HTMLDivElement>(null);
  const serveImagesRef = useRef<HTMLDivElement[]>([]);
  const serveSectionRef = useRef<HTMLDivElement>(null);
  const roadmapSectionRef = useRef<HTMLDivElement>(null);
  const footerSectionRef = useRef<HTMLDivElement>(null);
  const headerBoxesRef = useRef<HTMLDivElement[]>([]);
  const headerBirdRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const askedItemsRef = useRef<HTMLDivElement[]>([]);
  const faqHeadingRef = useRef<HTMLDivElement>(null);
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialImageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = [
    "IT Consulting",
    "Custom Software Development",
    "Cloud & Infrastructure",
    "Product Engineering",
  ];

  const routes = [
    "/services/servisPages/itConsulting",
    "/services/servisPages/customSoftwareDevelopment",
    "/services/servisPages/Cloud&Infrastructure",
    "/services/servisPages/productEngineering",
  ];

  const mobileSlides = [
    {
      image: "/Images/serviseImages/mediumImage/m1.png",
      backgroundImage: "/Images/serviseImages/BigImage/b1.png",
      category: "IT Consulting",
      title: "Strategic guidance for a digital-first world",
      description:
        "We help businesses define IT strategies, assess systems, and create roadmaps for transformation.",
      list: [
        "IT Roadmaps & Strategy",
        "System Audits & Optimization",
        "Digital Transformation Guidance",
      ],
      buttonText: "Book a Strategy Session",
      route: routes[0],
    },
    {
      image: "/Images/serviseImages/mediumImage/m2.png",
      backgroundImage: "/Images/serviseImages/BigImage/b2.png",
      category: "Custom Software",
      title: "Tailored solutions for your unique needs",
      description:
        "From enterprise applications to consumer-facing apps, we build software that drives growth.",
      list: [
        "Web Application Development",
        "Mobile App Creation",
        "Enterprise Software Solutions",
      ],
      buttonText: "Request a Proposal",
      route: routes[1],
    },
    {
      image: "/Images/serviseImages/mediumImage/m3.png",
      backgroundImage: "/Images/serviseImages/BigImage/b3.png",
      category: "Cloud Services",
      title: "Scalable infrastructure for modern business",
      description:
        "Secure, reliable, and scalable cloud solutions to power your digital operations.",
      list: [
        "Cloud Migration Strategy",
        "DevOps & Automation",
        "Cloud Security & Compliance",
      ],
      buttonText: "See Cloud Services",
      route: routes[2],
    },
    {
      image: "/Images/serviseImages/mediumImage/m4.png",
      backgroundImage: "/Images/serviseImages/BigImage/b4.png",
      category: "Product Engineering",
      title: "Innovation from concept to launch",
      description:
        "End-to-end product engineering services to bring your innovative ideas to life.",
      list: [
        "MVP Development",
        "Full-Cycle Engineering",
        "Product Modernization",
      ],
      buttonText: "Explore Engineering",
      route: routes[3],
    },
  ];

  const handleImageClick = (index: number) => {
    router.push(routes[index]);
  };

  // Header section initial animation
  useEffect(() => {
    const boxes = headerBoxesRef.current.filter(Boolean);
    const bird = headerBirdRef.current;
    const content = headerContentRef.current;

    // Animate boxes from right with stagger
    if (boxes.length > 0) {
      boxes.forEach((box, index) => {
        gsap.set(box, { opacity: 0, x: 100 });
        gsap.to(box, {
          opacity:
            index === 0
              ? 0.05
              : index === 1
              ? 0.25
              : index === 2
              ? 0.4
              : index === 3
              ? 0.62
              : index === 4
              ? 0.7
              : index === 5
              ? 0.58
              : index === 6
              ? 0.4
              : index === 7
              ? 0.3
              : 0.2,
          x: 0,
          duration: 1,
          delay: 0.1 * index,
          ease: "power3.out",
        });
      });
    }

    // Animate bird with rotation and fade
    if (bird) {
      gsap.set(bird, { opacity: 0, scale: 0.8, rotation: -20 });
      gsap.to(bird, {
        opacity: 0.2,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power3.out",
      });
    }

    // Animate content
    if (content) {
      const heading = content.querySelector("h1");
      const subheading = content.querySelector("h3");
      const button = content.querySelector("button");

      if (heading) {
        gsap.set(heading, { opacity: 0, y: 60, scale: 0.95 });
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.8,
          ease: "power3.out",
        });
      }

      if (subheading) {
        gsap.set(subheading, { opacity: 0, y: 40 });
        gsap.to(subheading, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.2,
          ease: "power2.out",
        });
      }

      if (button) {
        gsap.set(button, { opacity: 0, scale: 0.8, y: 20 });
        gsap.to(button, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 1.6,
          ease: "back.out(1.7)",
        });
      }
    }
  }, []);

  // Asked/FAQ section scroll-triggered animation
  useEffect(() => {
    const items = askedItemsRef.current.filter(Boolean);

    if (items.length > 0) {
      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 30, scale: 0.95 });
        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.08 * index,
          ease: "power2.out",
          scrollTrigger: {
            trigger: items[0],
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

  useEffect(() => {
    const images = imagesRef.current.filter(Boolean);
    const mediumImages = mediumImagesRef.current.filter(Boolean);
    const texts = textRef.current.filter(Boolean);
    if (images.length === 0) return;

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf([...images, ...mediumImages, ...texts]);

    // Set initial state - all big images absolute positioned
    images.forEach((img, index) => {
      gsap.set(img, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 1.05,
        force3D: true,
        transformOrigin: "center center",
        backfaceVisibility: "hidden",
        perspective: 1000,
      });
    });

    // Set initial state - all medium images absolute positioned (hidden initially)
    mediumImages.forEach((img, index) => {
      gsap.set(img, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: index === 0 ? 0 : 0,
        scale: 0.92,
        y: 30,
        force3D: true,
        transformOrigin: "center center",
        backfaceVisibility: "hidden",
        perspective: 1000,
      });
    });

    // Set initial state - all text elements
    texts.forEach((text) => {
      gsap.set(text, {
        position: "absolute",
        opacity: 0,
        x: 50,
        force3D: true,
        backfaceVisibility: "hidden",
      });
    });

    // Show first medium image after delay with entrance animation
    if (mediumImages[0]) {
      gsap.to(mediumImages[0], {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.4,
        delay: 0.6,
        ease: "power4.out",
        force3D: true,
      });
    }

    // Show first text after delay
    if (texts[0]) {
      gsap.to(texts[0], {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
        force3D: true,
      });
    }

    // Store active animations to prevent overlaps
    let isAnimating = false;

    // Auto-change images every 3.5 seconds with smooth professional transition
    const interval = setInterval(() => {
      if (isAnimating) return; // Skip if animation is still running

      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        isAnimating = true;

        // Create a timeline for coordinated animations
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false;
          },
        });

        // Smooth crossfade with subtle zoom for big images
        tl.to(
          images[prevIndex],
          {
            opacity: 0,
            scale: 1.05,
            duration: 1.2,
            ease: "power3.inOut",
            force3D: true,
          },
          0
        );

        tl.to(
          images[nextIndex],
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
            force3D: true,
          },
          0
        );

        // Smooth fade, scale and slide transition for medium images
        if (mediumImages[prevIndex]) {
          tl.to(
            mediumImages[prevIndex],
            {
              opacity: 0,
              scale: 0.92,
              y: -30,
              duration: 1,
              ease: "power3.inOut",
              force3D: true,
            },
            0.1
          );
        }

        if (mediumImages[nextIndex]) {
          tl.to(
            mediumImages[nextIndex],
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
              force3D: true,
            },
            0.5
          );
        }

        // Smooth slide transition for text
        if (texts[prevIndex]) {
          tl.to(
            texts[prevIndex],
            {
              opacity: 0,
              x: -50,
              duration: 0.7,
              ease: "power2.inOut",
              force3D: true,
            },
            0.1
          );
        }

        if (texts[nextIndex]) {
          tl.to(
            texts[nextIndex],
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power2.out",
              force3D: true,
            },
            0.6
          );
        }

        return nextIndex;
      });
    }, 3500);

    return () => {
      clearInterval(interval);
      isAnimating = false;
      // Kill all animations before cleanup
      gsap.killTweensOf([...images, ...mediumImages, ...texts]);
      images.forEach((img) => {
        gsap.set(img, { clearProps: "all" });
      });
      mediumImages.forEach((img) => {
        gsap.set(img, { clearProps: "all" });
      });
      texts.forEach((text) => {
        gsap.set(text, { clearProps: "all" });
      });
    };
  }, []);

  // Bold Moves scroll-triggered animation
  useEffect(() => {
    const boldMoves = boldMovesRef.current.filter(Boolean);
    const section = boldMovesSectionRef.current;
    const heading = boldMovesHeadingRef.current;

    if (boldMoves.length === 0 || !section) return;

    // Set initial state - hidden and slightly offset
    boldMoves.forEach((box) => {
      const image = box.querySelector("img");
      const textElements = box.querySelectorAll("p");
      const button = box.querySelector("button");

      gsap.set(box, {
        opacity: 0,
        y: 80,
        scale: 0.85,
        rotationY: -15,
      });

      if (image) gsap.set(image, { scale: 1.3, opacity: 0 });
      textElements.forEach((text) =>
        gsap.set(text, { opacity: 0, y: 30, x: -20 })
      );
      if (button) gsap.set(button, { opacity: 0, scale: 0.5, y: 20 });
    });

    // Animate heading first
    if (heading) {
      gsap.set(heading, { opacity: 0, y: 50 });
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });
    }

    // Create scroll-triggered staggered entrance animation
    boldMoves.forEach((box, index) => {
      const image = box.querySelector("img");
      const textElements = box.querySelectorAll("p");
      const button = box.querySelector("button");

      // Timeline for coordinated animation with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          once: true,
        },
        delay: 0.2 + index * 0.12,
      });

      // Container animation - slide up with rotation
      tl.to(box, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Image zoom in with fade
      if (image) {
        tl.to(
          image,
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      // Text elements slide and fade in with stagger
      if (textElements.length > 0) {
        tl.to(
          textElements,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      // Button pop in with elastic bounce
      if (button) {
        tl.to(
          button,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(2)",
          },
          "-=0.4"
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(boldMoves);
    };
  }, []);

  // Serve section, Roadmap, and Footer scroll-triggered animations
  useEffect(() => {
    // Use a small delay to ensure DOM is ready
    const initAnimations = () => {
      const serveHeading = serveHeadingRef.current;
      const serveImages = serveImagesRef.current.filter(Boolean);
      const serveSection = serveSectionRef.current;
      const roadmapSection = roadmapSectionRef.current;
      const footerSection = footerSectionRef.current;

      // Serve heading animation
      if (serveHeading && serveSection) {
        gsap.set(serveHeading, { opacity: 0, y: 50 });
        gsap.to(serveHeading, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: serveSection,
            start: "top 70%",
            once: true,
          },
        });
      }

      // Serve images staggered animation
      if (serveImages.length > 0 && serveSection) {
        serveImages.forEach((img) => {
          gsap.set(img, { opacity: 0, x: -100, scale: 0.9 });
        });

        serveImages.forEach((img, index) => {
          gsap.to(img, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: 0.15 * index,
            ease: "power3.out",
            scrollTrigger: {
              trigger: serveSection,
              start: "top 60%",
              once: true,
            },
          });
        });
      }

      // Roadmap section animation
      if (roadmapSection) {
        const heading = roadmapSection.querySelector(".roadmap-heading");
        const button = roadmapSection.querySelector("button");

        if (heading) {
          gsap.set(heading, { opacity: 0, y: 60, scale: 0.9 });
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: roadmapSection,
              start: "top 70%",
              once: true,
            },
          });
        }

        if (button) {
          gsap.set(button, { opacity: 0, scale: 0.8, y: 20 });
          gsap.to(button, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: roadmapSection,
              start: "top 70%",
              once: true,
            },
          });
        }
      }

      // Footer section animation
      if (footerSection) {
        const quote = footerSection.querySelector(".footer-quote");
        const author = footerSection.querySelector(".footer-author");
        const playButton = footerSection.querySelector(".footer-play");

        if (quote) {
          gsap.set(quote, { opacity: 0, x: -80 });
          gsap.to(quote, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerSection,
              start: "top 70%",
              once: true,
            },
          });
        }

        if (author) {
          gsap.set(author, { opacity: 0, y: 30 });
          gsap.to(author, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerSection,
              start: "top 70%",
              once: true,
            },
          });
        }

        if (playButton) {
          gsap.set(playButton, { opacity: 0, scale: 0.8 });
          gsap.to(playButton, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: footerSection,
              start: "top 70%",
              once: true,
            },
          });
        }
      }
    };

    // Wait for DOM to be ready before initializing animations
    const timer = setTimeout(() => {
      initAnimations();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Mouse hover handlers for bold moves with text and button effects
  const handleMouseEnter = (element: HTMLDivElement) => {
    const image = element.querySelector("img");
    const textElements = element.querySelectorAll("p");
    const button = element.querySelector("button");

    // Container lift and scale with shadow
    gsap.to(element, {
      y: -12,
      scale: 1.03,
      boxShadow: "0 20px 60px #F4F4F45C",
      duration: 0.5,
      ease: "power2.out",
    });

    // Image subtle zoom
    if (image) {
      gsap.to(image, {
        scale: 1.08,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Text subtle movement
    textElements.forEach((text, index) => {
      gsap.to(text, {
        y: -3,
        duration: 0.4,
        delay: index * 0.05,
        ease: "power2.out",
      });
    });

    // Button scale and brightness
    if (button) {
      gsap.to(button, {
        scale: 1.08,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseLeave = (element: HTMLDivElement) => {
    const image = element.querySelector("img");
    const textElements = element.querySelectorAll("p");
    const button = element.querySelector("button");

    // Return container to original state
    gsap.to(element, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.5,
      ease: "power2.out",
    });

    // Image return to normal
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Text return
    textElements.forEach((text) => {
      gsap.to(text, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    // Button return
    if (button) {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div>
        {/* heading */}
        <div className="bg-custom-bg w-full h-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-18 pt-14 md:pt-18 lg:pt-30 relative">
          {/* 9 boxes on the right side */}
          <div className="flex absolute right-0 top-0 h-full">
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[0] = el;
              }}
              className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 40%, #000A1B 30%)",
                opacity: 0.05,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[1] = el;
              }}
              className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 25%, #000A1B 65%)",
                opacity: 0.2,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[2] = el;
              }}
              className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 37%, #000A1B 70%)",
                opacity: 0.4,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[3] = el;
              }}
              className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 40%, #000A1B 75%)",
                opacity: 0.52,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[4] = el;
              }}
              className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 38%, #000A1B 73%)",
                opacity: 0.67,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[5] = el;
              }}
              className="h-full w-[12vw] sm:w-[10vw] md:w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 35%, #000A1B 71%)",
                opacity: 0.72,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[6] = el;
              }}
              className="hidden sm:block h-full w-[10vw] md:w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 30%, #000A1B 69%)",
                opacity: 0.49,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[7] = el;
              }}
              className="hidden md:block h-full w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 25%, #000A1B 65%)",
                opacity: 0.3,
              }}
            ></div>
            <div
              ref={(el) => {
                if (el) headerBoxesRef.current[8] = el;
              }}
              className="hidden md:block h-full w-[8vw] lg:w-[7vw]"
              style={{
                background:
                  "linear-gradient(to bottom, #FF662A 10%, #000A1B 50%)",
                opacity: 0.2,
              }}
            ></div>
          </div>

          {/* Service Bird Image - Right Top */}
          <div
            ref={headerBirdRef}
            className="absolute right-0 top-0 z-20"
            style={{ opacity: 0.2 }}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem]">
              <Image
                src="/Images/serviseImages/seviseBird.png"
                alt="Service Bird"
                fill
                className="object-cover object-top-right"
              />
            </div>
          </div>

          <div
            ref={headerContentRef}
            className="flex flex-col w-full max-w-[1400px] mx-auto relative z-10 pb-16"
          >
            <h1
              className="text-white text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-[82px] 2xl:text-7xl font-light leading-tight mb-8 w-full sm:w-[90%]"
              style={{ fontWeight: 300 }}
            >
              <span className="hidden sm:inline">
                From strategy to <br /> execution, Grobird covers <br /> the
                full lifecycle of digital <br /> solutions.
              </span>
              <span
                className="sm:hidden block"
                style={{
                  fontFamily: "Geist, var(--font-inter), sans-serif",
                  fontSize: "42px",
                  fontWeight: 200,
                  marginTop: "3rem",
                  lineHeight: "55px",
                  letterSpacing: "0px",
                }}
              >
                From strategy to execution, Grobird covers the full lifecycle of
                digital solutions.
              </span>
            </h1>
            <h3 className="text-white font-light text-base sm:text-base md:text-md lg:text-md xl:text-[30px] 2xl:text-2xl w-full sm:w-[90%] md:w-[85%] lg:w-[75%] leading-10">
              <span className="hidden sm:inline">
                Whether you&apos;re rethinking IT infrastructure, building
                custom software, or scaling digital products — we help you move
                with speed and confidence.
              </span>
              <span
                className="sm:hidden block"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "17px",
                  marginTop: "1rem",
                  opacity: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                Whether you&apos;re rethinking IT infrastructure, building
                custom software, or scaling digital products — we help you move
                with speed and confidence.
              </span>
            </h3>
            <button className="hidden sm:block mt-8 sm:mt-16 md:mt-20 bg-white border border-white rounded-full text-black text-xs sm:text-sm xl:text-[18px] px-8 sm:px-12 py-3 w-fit">
              View Products
            </button>
          </div>
        </div>

        {/* Startups Section */}
        <div className="w-full py-16 pb-16 pt-[1.3rem] sm:pt-16 px-0 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            {/* h2 – mobile full width, mb-8 gives 2rem gap to images */}
            <h2 className="text-black max-sm:text-[22px] sm:text-lg md:text-xl lg:text-2xl xl:text-[28.75px] font-medium text-center sm:mb-12 sm:mt-6 mb-8 mx-auto w-[95%] sm:w-full">
              {/* Desktop version – unchanged */}
              <span className="hidden sm:inline">
                The startups shaping tomorrow trust Grobird
              </span>
              {/* Mobile version – exactly as shown */}
              <span className="sm:hidden block mt-6 text-center">
                The startups shaping tomorrow <br />
                trust <span style={{ color: "#FF662A" }}>Grobird</span>
              </span>
            </h2>

            {/* DESKTOP IMAGE ROW – static, wrapping (unchanged) */}
            <div className="hidden sm:flex justify-center items-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-16 2xl:gap-14 flex-wrap">
              {/* Company 1 */}
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
              {/* Company 2 */}
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
              {/* Company 3 */}
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
              {/* Company 4 */}
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
              {/* Company 5 – with right border */}
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

            {/* MOBILE IMAGE ROW – horizontally scrolling, infinite loop */}
            <div className="flex sm:hidden overflow-hidden">
              <div className="flex gap-2 animate-marquee">
                {/* First set of 5 images */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={`mobile-${num}`}
                    className="relative w-[180px] h-[80px] flex-shrink-0 border-l border-[#E9EBF1] rounded-lg"
                  >
                    <Image
                      src={`/Images/startups/company${num}.png`}
                      alt={`Startup Company ${num}`}
                      fill
                      className="object-contain"
                      priority
                      sizes="180px"
                    />
                  </div>
                ))}
                {/* Duplicate set – creates seamless loop */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={`mobile-duplicate-${num}`}
                    className="relative w-[180px] h-[80px] flex-shrink-0 border-l border-[#E9EBF1] rounded-lg"
                  >
                    <Image
                      src={`/Images/startups/company${num}.png`}
                      alt={`Startup Company ${num}`}
                      fill
                      className="object-contain"
                      priority
                      sizes="180px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Animation keyframes – added via style tag */}
            <style jsx>{`
              @keyframes marquee {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-180px * 5 - 0.5rem * 4));
                }
              }
              .animate-marquee {
                animation: marquee 20s linear infinite;
              }
              /* Add right border to the last visible item on mobile for consistency */
              @media (max-width: 640px) {
                .border-l:last-child {
                  border-right: 1px solid #e9ebf1;
                }
              }
            `}</style>
          </div>
        </div>

        {/* Full-width auto-changing images section with absolute positioned medium images - DESKTOP ONLY */}
        <div
          ref={imageContainerRef}
          className="hidden sm:block relative w-full h-[600px] sm:h-[800px] md:h-[1000px] lg:h-[1200px] xl:h-[1400px] overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(currentIndex)}
        >
          {/* Background images – unchanged */}
          <div
            ref={(el) => {
              if (el) imagesRef.current[0] = el;
            }}
            className="w-full h-full"
          >
            <Image
              src="/Images/serviseImages/BigImage/b1.png"
              alt="Startup Image 1"
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
          <div
            ref={(el) => {
              if (el) imagesRef.current[1] = el;
            }}
            className="w-full h-full"
          >
            <Image
              src="/Images/serviseImages/BigImage/b2.png"
              alt="Startup Image 2"
              fill
              className="object-cover"
              quality={90}
            />
          </div>
          <div
            ref={(el) => {
              if (el) imagesRef.current[2] = el;
            }}
            className="w-full h-full"
          >
            <Image
              src="/Images/serviseImages/BigImage/b3.png"
              alt="Startup Image 3"
              fill
              className="object-cover"
              quality={90}
            />
          </div>
          <div
            ref={(el) => {
              if (el) imagesRef.current[3] = el;
            }}
            className="w-full h-full"
          >
            <Image
              src="/Images/serviseImages/BigImage/b4.png"
              alt="Startup Image 4"
              fill
              className="object-cover"
              quality={90}
            />
          </div>

          {/* Medium images container – unchanged */}
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[94%] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[520px]">
            {/* M1 Image */}
            <div
              ref={(el) => {
                if (el) mediumImagesRef.current[0] = el;
              }}
              className="w-full h-full relative"
            >
              <Image
                src="/Images/serviseImages/mediumImage/m1.png"
                alt="Service Image M1"
                fill
                className="object-cover"
                quality={90}
              />
              {/* Text overlay on M1 image – unchanged */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 lg:top-8 lg:left-8 z-10 flex flex-col lg:flex-row text-white justify-between w-[94%] h-[93%] gap-4 lg:gap-0">
                <div className="mb-4 lg:mb-8 w-full lg:w-[65%]">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light mb-3 sm:mb-4 md:mb-5 lg:mb-7"
                    style={{ fontWeight: 300 }}
                  >
                    Strategic guidance for
                    <br className="hidden sm:block" /> a digital-first world
                  </h3>
                  <p
                    className="text-xs sm:text-sm md:text-base font-light"
                    style={{ fontWeight: 300 }}
                  >
                    We help businesses define IT strategies, assess systems, and
                    create roadmaps for transformation.
                  </p>
                </div>
                <div className="flex justify-start mb-10 lg:justify-end align-bottom flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 bg-white rounded-full flex-shrink-0"></div>
                    <p
                      className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                      style={{ fontWeight: 300 }}
                    >
                      IT Roadmaps & Strategy
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 bg-white rounded-full flex-shrink-0"></div>
                    <p
                      className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                      style={{ fontWeight: 300 }}
                    >
                      System Audits & Optimization
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1 bg-white rounded-full flex-shrink-0"></div>
                    <p
                      className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                      style={{ fontWeight: 300 }}
                    >
                      Digital Transformation Guidance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* M2, M3, M4 images – unchanged */}
            <div
              ref={(el) => {
                if (el) mediumImagesRef.current[1] = el;
              }}
              className="w-full h-full"
            >
              <Image
                src="/Images/serviseImages/mediumImage/m2.png"
                alt="Service Image M2"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
            <div
              ref={(el) => {
                if (el) mediumImagesRef.current[2] = el;
              }}
              className="w-full h-full"
            >
              <Image
                src="/Images/serviseImages/mediumImage/m3.png"
                alt="Service Image M3"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
            <div
              ref={(el) => {
                if (el) mediumImagesRef.current[3] = el;
              }}
              className="w-full h-full"
            >
              <Image
                src="/Images/serviseImages/mediumImage/m4.png"
                alt="Service Image M4"
                fill
                className="object-cover"
                quality={90}
              />
            </div>
          </div>

          {/* Text Labels - Absolutely positioned at top right */}
          <div className="absolute top-6 right-0 sm:top-8 md:top-12 lg:top-16 xl:top-20 z-20 w-[60%] sm:w-[55%] md:w-[50%] lg:w-[45%] pr-3 sm:pr-4 md:pr-6 lg:pr-8 xl:pr-10 flex flex-col items-end">
            {/* IT Consulting - 1st image */}
            <div
              ref={(el) => {
                if (el) textRef.current[0] = el;
              }}
              className="text-white flex flex-col items-end absolute mobile-text-item"
              style={{ opacity: 0 }}
            >
              <h2
                className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5 text-black"
                style={{ fontWeight: 300 }}
              >
                {titles[0]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(0);
                }}
              >
                Book a Strategy Session
              </button>
            </div>

            {/* Custom Software Development - 2nd image */}
            <div
              ref={(el) => {
                if (el) textRef.current[1] = el;
              }}
              className="text-white flex flex-col items-end absolute mobile-text-item"
              style={{ opacity: 0 }}
            >
              <h2
                className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5"
                style={{ fontWeight: 300 }}
              >
                {titles[1]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(1);
                }}
              >
                Request a Proposal
              </button>
            </div>

            {/* Cloud & Infrastructure - 3rd image */}
            <div
              ref={(el) => {
                if (el) textRef.current[2] = el;
              }}
              className="text-white flex flex-col items-end absolute mobile-text-item"
              style={{ opacity: 0 }}
            >
              <h2
                className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5"
                style={{ fontWeight: 300 }}
              >
                {titles[2]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(2);
                }}
              >
                See Cloud Services
              </button>
            </div>

            {/* Product Engineering - 4th image */}
            <div
              ref={(el) => {
                if (el) textRef.current[3] = el;
              }}
              className="text-white flex flex-col items-end absolute mobile-text-item"
              style={{ opacity: 0 }}
            >
              <h2
                className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-light text-right mb-3 sm:mb-4 md:mb-5"
                style={{ fontWeight: 300 }}
              >
                {titles[3]}
              </h2>
              <button
                className="bg-white text-black text-[10px] sm:text-xs px-4 sm:px-5 md:px-7 py-1.5 sm:py-2 rounded-full whitespace-nowrap hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(3);
                }}
              >
                Explore Product Engineering
              </button>
            </div>
          </div>

          {/* Mobile-only style overrides */}
          <style jsx>{`
            @media (max-width: 640px) {
              .mobile-text-item h2 {
                font-size: 32px !important;
                font-weight: 400 !important;
              }
              .mobile-text-item button {
                font-size: 18px !important;
                font-weight: 500 !important;
              }
            }
          `}</style>
        </div>

        {/* MOBILE CAROUSEL SECTION (Vertical Layout + BG Images) */}
        <div className="sm:hidden w-full h-[850px] relative overflow-hidden bg-black">
          {/* Loop through mobileSlides to render each service slide */}
          {mobileSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full flex flex-col items-center py-12 px-4 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.backgroundImage}
                  alt={`${slide.category} Background`}
                  fill
                  className="object-cover"
                  quality={90}
                  priority={index === 0}
                />
                {/* Dark Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              {/* Content Container */}
              <div className="relative z-20 w-full flex flex-col items-center h-full">
                {/* 1. Header & Button Area - Right Aligned */}
                <div className="flex flex-col items-end text-right mb-8 w-full mt-8 px-6">
                  <h3
                    className="text-4xl font-light mb-6 text-white"
                    style={{ fontFamily: "Montserrat", fontWeight: 400 }}
                  >
                    {slide.category}
                  </h3>
                  <button
                    className="px-8 py-3 rounded-full text-sm font-medium transition-colors bg-white text-black hover:bg-gray-100"
                    onClick={() => router.push(slide.route)}
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {slide.buttonText}
                  </button>
                </div>

                {/* 2. Image/Card Area - Fixed Size 310x481, Squared */}
                <div className="relative w-[310px] h-[481px] overflow-hidden shadow-2xl mt-40 bg-black/20 backdrop-blur-sm">
                  <Image
                    src={slide.image}
                    alt={slide.category}
                    fill
                    className="object-cover"
                    quality={90}
                  />

                  {/* Card Overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

                  {/* Card Content (Title & List) - Larger Text */}
                  <div className="absolute bottom-10 left-6 right-6 z-20">
                    <h4
                      className="text-3xl font-light mb-6 text-white leading-tight"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      {slide.title}
                    </h4>
                    <div className="flex flex-col gap-4 mt-4">
                      {slide.list.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-white rounded-full mt-2 shrink-0"></div>
                          <p
                            className="text-lg font-light text-white/95 leading-snug"
                            style={{ fontFamily: "Inter" }}
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* we serve */}
        <div
          ref={serveSectionRef}
          className="w-full items-center flex flex-col px-3 sm:px-4 md:px-8 lg:px-10"
        >
          <div
            ref={serveHeadingRef}
            className="flex flex-col sm:flex-row justify-between items-start w-full my-12 sm:my-16 md:my-20 gap-4 sm:gap-8"
          >
            {/* Title part – "Industries We" and "Serve" stacked */}
            <div className="industries-title flex items-start text-2xl sm:text-3xl md:text-4xl xl:text-[64px] 2xl:text-6xl font-medium text-black flex-col leading-18">
              <p>Industries We</p>
              <p className="text-[#3B3B3D73]">Serve</p>
            </div>

            {/* Description paragraph */}
            <p className="industries-description text-[#2D2C2C] text-md sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] leading-relaxed lg:w-[25%]">
              Every industry has its own challenges, and at Grobird we tailor
              software to meet those unique needs
            </p>

            {/* Mobile style overrides (only screens ≤640px) */}
            <style jsx>{`
              @media (max-width: 640px) {
                /* Title container: no gap, line‑height 1.2 */
                .industries-title {
                  gap: 0;
                  line-height: 1.2;
                }
                /* Remove default paragraph margins, set font size/weight, inherit line‑height */
                .industries-title p {
                  margin: 0;
                  font-size: 32px !important;
                  font-weight: 500 !important;
                  line-height: inherit;
                }
                /* Description paragraph: 16px/400 */
                .industries-description {
                  font-size: 16px !important;
                  font-weight: 400 !important;
                }
              }
            `}</style>
          </div>
        </div>

        {/* Horizontally scrollable images section - hidden scrollbar */}
        <div className="serve-images-container mb-12 sm:mb-16 md:mb-20 pl-3 sm:pl-4 md:pl-8 lg:pl-10">
          <div
            className="serve-scroll-container flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Image 1 - Logistics (no break needed) */}
            <div
              ref={(el) => {
                if (el) serveImagesRef.current[0] = el;
              }}
              className="serve-image-item relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]"
            >
              <Image
                src="/Images/serviseImages/serve/s1.jpg"
                alt="Logistics"
                fill
                className="object-cover"
                quality={90}
              />
              <p
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px] text-right"
                style={{ fontWeight: 400 }}
              >
                Logistics
              </p>
            </div>

            {/* Image 2 - Travel & Hospitality (with line break on mobile) */}
            <div
              ref={(el) => {
                if (el) serveImagesRef.current[1] = el;
              }}
              className="serve-image-item relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]"
            >
              <Image
                src="/Images/serviseImages/serve/s2.jpg"
                alt="Travel & Hospitality"
                fill
                className="object-cover"
                quality={90}
              />
              <p
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px] text-right"
                style={{ fontWeight: 400 }}
              >
                <span className="hidden sm:inline">Travel & Hospitality</span>
                <span className="sm:hidden">
                  Travel &<br />
                  Hospitality
                </span>
              </p>
            </div>

            {/* Image 3 - E-Commerce & Retail (with line break on mobile) */}
            <div
              ref={(el) => {
                if (el) serveImagesRef.current[2] = el;
              }}
              className="serve-image-item relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]"
            >
              <Image
                src="/Images/serviseImages/serve/s3.jpg"
                alt="E-Commerce & Retail"
                fill
                className="object-cover"
                quality={90}
              />
              <p
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px] text-right"
                style={{ fontWeight: 400 }}
              >
                <span className="hidden sm:inline">E-Commerce & Retail</span>
                <span className="sm:hidden">
                  E-Commerce &<br />
                  Retail
                </span>
              </p>
            </div>

            {/* Image 4 - Service (no break needed) */}
            <div
              ref={(el) => {
                if (el) serveImagesRef.current[3] = el;
              }}
              className="serve-image-item relative flex-shrink-0 w-[280px] h-[600px] sm:w-[320px] sm:h-[700px] md:w-[350px] md:h-[800px] lg:w-[380px] lg:h-[850px]"
            >
              <Image
                src="/Images/serviseImages/serve/s4.jpg"
                alt="Service"
                fill
                className="object-cover"
                quality={90}
              />
              <p
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-[32px] text-right"
                style={{ fontWeight: 400 }}
              >
                Service
              </p>
            </div>
          </div>

          {/* Single styled-jsx block for all custom styles */}
          <style jsx>{`
            /* Hide scrollbar for the scrolling container */
            .serve-scroll-container::-webkit-scrollbar {
              display: none;
            }

            /* Mobile overrides (max-width: 640px) */
            @media (max-width: 640px) {
              /* Remove left padding from main container */
              .serve-images-container {
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
              /* Change inner container to column, centered, with gap 1rem, no scroll */
              .serve-scroll-container {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 1.5rem !important;
                overflow-x: visible !important;
              }
              /* Each image item: fixed size */
              .serve-image-item {
                width: 397px !important;
                height: 443px !important;
                flex-shrink: 0;
                border-radius: 0px !important; /* Figma shows square 0px radius based on 0px in rectangle code? No, main container has 32px radius but individual items... Frame 114 background has rectangle 85 with 0px radius, but main component might have 16px? Sticking to design provided: Rectangle 85 has 0px radius linear gradient */
                overflow: hidden !important;
              }
              .serve-image-item img {
                border-radius: 0px !important;
              }
              /* Gradient overlay on bottom of card */
              .serve-image-item::after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 63.73%;
                background: linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0) 0%,
                  #010917 100%
                );
                pointer-events: none;
              }

              /* Industry label (p) inside each image: 32px, 400 weight */
              .serve-image-item p {
                font-family: "Montserrat", sans-serif !important;
                font-size: 32px !important;
                font-weight: 400 !important;
                line-height: 39px !important;
                bottom: 9.26% !important; /* Approx 41px */
                right: 4.53% !important;
                text-align: right !important;
                z-index: 10 !important;
              }
              .serve-image-item p {
                font-size: 32px !important;
                font-weight: 400 !important;
              }
            }
          `}</style>
        </div>

        {/* bold moves */}
        <div
          ref={boldMovesSectionRef}
          className="w-full items-center flex flex-col px-3 sm:px-4 md:px-8 lg:px-10"
        >
          <div
            ref={boldMovesHeadingRef}
            className="flex flex-col sm:flex-row justify-between items-center w-full my-12 sm:my-16 md:my-20 gap-6 sm:gap-8 "
          >
            {/* Heading lines */}
            <div className="bold-moves-heading flex items-start text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium text-[#3B3B3D73] flex-col gap-2 leading-tight">
              <p>Big Steps, Bold Moves</p>
              <p className="text-black">Our Latest Releases</p>
            </div>

            {/* Press Release – hidden on mobile */}
            <p className="text-[#2D2C2C] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[42px] leading-relaxed hidden sm:block">
              Press Release
            </p>

            {/* Mobile style overrides */}
            <style jsx>{`
              @media (max-width: 640px) {
                /* Remove any inherited spacing from the outer container */
                .bold-moves-heading {
                  margin-left: 0 !important;
                  padding-left: 0 !important;
                  width: 100% !important;
                }
                .bold-moves-heading p {
                  margin-left: 0 !important;
                  padding-left: 0 !important;
                  font-size: 32px !important;
                  font-weight: 500 !important;
                }
                /* Also ensure the outer div (with red background) has no left padding/margin */
                div[ref="boldMovesHeadingRef"] {
                  margin-left: 0 !important;
                  padding-left: 0 !important;
                }
              }
            `}</style>
          </div>

          <div
            className="bold-moves-gallery flex gap-3 md:gap-4 lg:gap-5 items-center justify-start md:justify-center w-full md:w-[95%] lg:w-[90%] h-auto md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 px-4 md:px-0"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Left single image – hidden on mobile */}
            <div className="flex h-[350px] md:h-full items-center justify-center flex-shrink-0">
              <div
                ref={(el) => {
                  if (el) boldMovesRef.current[0] = el;
                }}
                data-index="0"
                className="bold-move-item relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[300px] md:h-[350px] lg:h-[380px] xl:h-[477px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/1bm.jpg"
                  alt="Bold Move 1"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2 z-10">
                  <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl">
                    A2Y Consultants Website
                  </p>
                  <button className="bg-white border border-gray-300 rounded-full text-black text-xs px-3 md:px-4 py-1 md:py-1.5 w-fit hover:bg-gray-100 transition-colors">
                    Read Release
                  </button>
                </div>
              </div>
            </div>

            {/* Middle column with two stacked images (indices 1 & 2) */}
            <div className="flex flex-col gap-3 md:gap-4 h-[350px] md:h-full items-center justify-center flex-shrink-0">
              <div
                ref={(el) => {
                  if (el) boldMovesRef.current[1] = el;
                }}
                data-index="1"
                className="bold-move-item relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[220px] md:h-[250px] lg:h-[280px] xl:h-[318px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/2bm.jpg"
                  alt="Bold Move 2"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                <div className="absolute bottom-6 md:bottom-4 left-2 md:left-3 right-2 md:right-3 flex flex-col gap-1 md:gap-2 z-10">
                  <p className="text-white text-xs md:text-[32px] lg:text-lg xl:text-xl">
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
                data-index="2"
                className="bold-move-item relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[180px] md:h-[200px] lg:h-[230px] xl:h-[275px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Image
                  src="/Images/serviseImages/boldmoves/3bm.png"
                  alt="Bold Move 3"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                <div className="absolute top-6 left-6 md:top-4 lg:top-5 md:left-3 right-2 md:right-3 z-10">
                  <p className="text-white text-3xl md:text-4xl lg:text-5xl percentage-number">
                    92%
                  </p>
                </div>
                <div className="absolute bottom-6 md:bottom-3 left-6 md:left-3 right-2 md:right-3 z-10">
                  <p className="text-white text-xs md:text-sm lg:text-md uppercase percentage-label">
                    Product Adoption Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Right single image (index 3) */}
            <div className="flex h-[350px] md:h-full items-center justify-center flex-shrink-0">
              <div
                ref={(el) => {
                  if (el) boldMovesRef.current[3] = el;
                }}
                data-index="3"
                className="bold-move-item relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[300px] md:h-[350px] lg:h-[380px] xl:h-[477px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
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

            {/* Second middle column with two stacked images (indices 4 & 5) */}
            <div className="flex flex-col gap-3 md:gap-4 h-[350px] md:h-full items-center justify-center flex-shrink-0">
              <div
                ref={(el) => {
                  if (el) boldMovesRef.current[4] = el;
                }}
                data-index="4"
                className="bold-move-item relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[180px] md:h-[200px] lg:h-[230px] xl:h-[275px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
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
                data-index="5"
                className="bold-move-item relative w-[160px] md:w-[180px] lg:w-[200px] xl:w-[279px] h-[220px] md:h-[250px] lg:h-[280px] xl:h-[318px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
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

            {/* Mobile style overrides */}
            <style jsx>{`
              @media (max-width: 640px) {
                /* Mobile Vertical Stack for Bold Moves */
                .bold-moves-gallery {
                  flex-direction: column !important;
                  gap: 24px !important;
                  padding-bottom: 2rem !important;
                  align-items: center !important;
                }

                /* Reset flex container items */
                .bold-moves-gallery > div {
                  display: flex !important;
                  flex-direction: column !important;
                  width: 100% !important;
                  height: auto !important;
                  gap: 24px !important;
                  align-items: center !important;
                }

                /* Base Mobile Item Style */
                .bold-move-item {
                  width: 290px !important;
                  border-radius: 16px !important;
                  overflow: hidden !important;
                  flex-shrink: 0 !important;
                }

                /* Hide indices 0 and 5 on mobile */
                [data-index="0"],
                [data-index="5"] {
                  display: none !important;
                }

                /* --- Card 1: A2Y (Index 1) --- */
                [data-index="1"] {
                  height: 322px !important;
                  display: block !important;
                }
                /* Title inside A2Y */
                [data-index="1"] p:first-of-type {
                  font-family: "Inter", sans-serif !important;
                  font-weight: 300 !important;
                  font-size: 32px !important;
                  line-height: 36px !important;
                  letter-spacing: 0.2px !important;
                  margin-bottom: 12px !important;
                }
                /* Button inside A2Y */
                [data-index="1"] button {
                  width: 131px !important;
                  height: 38px !important;
                  font-size: 16px !important;
                  font-weight: 400 !important;
                  border-radius: 100px !important;
                  padding: 0 !important; /* Reset padding to center text */
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                }

                /* --- Card 2: 92% (Index 2) --- */
                [data-index="2"] {
                  height: 288px !important;
                  display: block !important;
                  background: linear-gradient(
                    157.32deg,
                    #010917 14.74%,
                    #006bcb 113.84%
                  ) !important;
                }
                /* Number 92% */
                [data-index="2"] .percentage-number {
                  font-family: "Inter", sans-serif !important;
                  font-size: 70.2px !important;
                  font-weight: 400 !important;
                  line-height: 72px !important;
                  letter-spacing: 0.2px !important;
                  position: absolute !important;
                  top: 24px !important;
                  left: 24px !important;
                  transform: none !important; /* Reset any centering transforms */
                }
                /* Label Product Adoption */
                [data-index="2"] .percentage-label {
                  font-family: "Inter", sans-serif !important;
                  font-size: 20.2px !important;
                  font-weight: 400 !important;
                  line-height: 27px !important;
                  letter-spacing: 0.2px !important;
                  text-transform: uppercase !important;
                  position: absolute !important;
                  bottom: 24px !important;
                  left: 24px !important;
                  width: 220px !important;
                  text-align: left !important;
                }

                /* --- Card 3: Ahmadyar (Index 3) --- */
                [data-index="3"] {
                  height: 450px !important;
                  display: block !important;
                }
                /* Title inside Ahmadyar */
                [data-index="3"] p:first-of-type {
                  font-family: "Inter", sans-serif !important;
                  font-weight: 300 !important;
                  font-size: 32px !important;
                  line-height: 36px !important;
                  letter-spacing: 0.2px !important;
                  margin-bottom: 12px !important;
                }
                /* Button inside Ahmadyar */
                [data-index="3"] button {
                  width: 131px !important;
                  height: 38px !important;
                  font-size: 16px !important;
                  font-weight: 400 !important;
                  border-radius: 100px !important;
                  padding: 0 !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                }
                /* Positioning for Ahmadyar content (bottom) */
                [data-index="3"] > div:last-child {
                  bottom: 32px !important; /* 70px from bottom in design? Code says padding bottom 83px in wrapper? Using visual approx 32px */
                  left: 18px !important;
                  right: auto !important;
                }

                /* --- Card 4: 3X (Index 4) --- */
                [data-index="4"] {
                  height: 288px !important;
                  display: block !important;
                  background: linear-gradient(
                    134.37deg,
                    #f95524 -5.97%,
                    #010917 72.73%
                  ) !important;
                }
                /* Number 3X */
                [data-index="4"] p:first-of-type {
                  font-family: "Inter", sans-serif !important;
                  font-size: 70.2px !important;
                  font-weight: 400 !important;
                  line-height: 72px !important;
                  letter-spacing: 0.2px !important;
                  position: absolute !important;
                  top: 24px !important;
                  left: 24px !important;
                }
                /* Label Faster Go-To-Market */
                [data-index="4"] div:last-child {
                  font-family: "Inter", sans-serif !important;
                  font-size: 20.6px !important;
                  font-weight: 400 !important;
                  line-height: 27px !important;
                  letter-spacing: 0.2px !important;
                  text-transform: uppercase !important;
                  position: absolute !important;
                  bottom: 90px !important; /* Increased from 24px to prevent clipping */
                  left: 24px !important;
                  width: 247px !important;
                  height: auto !important;
                  z-index: 20 !important; /* Ensure it's on top */
                  color: #faf9f7 !important; /* Context: Figma color */
                }
                [data-index="4"] div:last-child p {
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  letter-spacing: inherit !important;
                  text-transform: inherit !important;
                  color: inherit !important;
                }
              }
            `}</style>
          </div>
        </div>

        {/* Asked */}
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

        {/* roadmap */}
        <div
          ref={roadmapSectionRef}
          className="w-full py-20 gap-8 items-start flex flex-col px-3 sm:px-4 md:px-8 lg:px-10"
        >
          {/* Heading – one line, colors preserved */}
          <div className="roadmap-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[64px] font-medium leading-tight">
            <span className="text-[#3B3B3D73]">
              Let&apos;s design the right technology{" "}
            </span>
            <span className="text-black">roadmap for your business.</span>
          </div>

          <button
            onClick={() => router.push("/contact")}
            className="bg-[#FF662A] p-2 px-4 rounded-sm flex gap-2 items-center hover:bg-[#e55a24] transition-colors"
          >
            <p className="text-white text-sm sm:text-sm md:text-base xl:text-[16px]">
              Start a Conversation
            </p>
            <Image
              src="/Images/arrow.png"
              alt="Arrow"
              width={20}
              height={20}
              className="object-contain"
            />
          </button>

          {/* Mobile style overrides – only font size/weight, colors untouched */}
          <style jsx>{`
            @media (max-width: 640px) {
              .roadmap-heading span {
                font-size: 24px !important;
                font-weight: 500 !important;
              }
            }
          `}</style>
        </div>

        {/* footer image */}

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

        {/* add */}

        {/* Footer */}
        <FooterSimple />
      </div>
    </div>
  );
};

export default Services;
