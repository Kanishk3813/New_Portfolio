/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, r as renderHead, e as renderComponent, f as renderTemplate, g as renderSlot, h as renderScript, i as addAttribute, u as unescapeHTML } from '../chunks/astro/server_C6QhqB1r.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import 'clsx';
export { renderers } from '../renderers.mjs';

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    let resizeTimeout;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(parent);
    resizeCanvas();
    return () => {
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);
  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case "linear":
          return t;
        case "ease-in":
          return t * t;
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId;
    const draw = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }
        const progress = elapsed / duration;
        const eased = easeFunc(progress);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      animationId = requestAnimationFrame(draw);
    };
    animationId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale]);
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: 2 * Math.PI * i / sparkCount,
      startTime: now
    }));
    sparksRef.current.push(...newSparks);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        position: "relative"
      },
      onClick: handleClick,
      children: [
        /* @__PURE__ */ jsx(
          "canvas",
          {
            ref: canvasRef,
            style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none"
            }
          }
        ),
        children
      ]
    }
  );
};

const ClickSparkWrapper = ({ children }) => {
  return /* @__PURE__ */ jsx(
    ClickSpark,
    {
      sparkColor: "#a476ff",
      sparkSize: 8,
      sparkRadius: 20,
      sparkCount: 12,
      duration: 500,
      easing: "ease-out",
      extraScale: 1.2,
      children
    }
  );
};

const Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222"
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - gridOffset.current.x % squareSize;
          const squareY = y - gridOffset.current.y % squareSize;
          const currentSquareX = Math.floor((x - startX) / squareSize);
          const currentSquareY = Math.floor((y - startY) / squareSize);
          if (hoveredSquareRef.current && currentSquareX === hoveredSquareRef.current.x && currentSquareY === hoveredSquareRef.current.y) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "#060606");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;
      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);
      hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
    };
    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "squares-canvas" });
};

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Software Developer"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/favicon-192x192.png"><meta property="og:title" content="Kanishk Reddy"><meta property="og:description" content="Software Developer"><meta property="og:image" content="./banner.png"><meta property="og:type" content="website"><meta property="og:site_name" content="Kanishk Reddy Portfolio"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" media="print" onload="this.media='all'">${maybeRenderHead()}<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"></noscript><title>${title}</title>${renderHead()}</head> <body class="bg-[--background] md:px-48 lg:px-20 px-9 relative min-h-screen"> <div class="fixed inset-0 -z-10 w-full h-full"> ${renderComponent($$result, "Squares", Squares, { "client:load": true, "speed": 0.5, "squareSize": 40, "direction": "diagonal", "borderColor": "#222222", "hoverFillColor": "#ffffff", "client:component-hydration": "load", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/Squares", "client:component-export": "default" })} </div> <div class="relative z-10"> ${renderComponent($$result, "ClickSparkWrapper", ClickSparkWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/ClickSparkWrapper", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </div> </body></html>`;
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/layouts/Layout.astro", void 0);

const Resume = ({ onClose }) => {
  return /* @__PURE__ */ jsxs("div", { className: "resume-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "resume-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "resume-header", children: [
        /* @__PURE__ */ jsx("h1", { children: "Kanishk Reddy" }),
        /* @__PURE__ */ jsx("p", { className: "location", children: "Hyderabad, Telangana, India" }),
        /* @__PURE__ */ jsxs("div", { className: "contact-info", children: [
          /* @__PURE__ */ jsx("a", { href: "mailto:kanishkreddy3813@gmail.com", children: "kanishkreddy3813@gmail.com" }),
          /* @__PURE__ */ jsx("span", { children: "|" }),
          /* @__PURE__ */ jsx("a", { href: "tel:7286971004", children: "(+91) 7286971004" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "social-links", children: [
          /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/kanishk-reddy-8161a122a/", target: "_blank", rel: "noopener noreferrer", children: "LinkedIn" }),
          /* @__PURE__ */ jsx("span", { children: "|" }),
          /* @__PURE__ */ jsx("a", { href: "https://github.com/Kanishk3813", target: "_blank", rel: "noopener noreferrer", children: "GitHub" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Education" }),
        /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "SRM Institute of Science and Technology" }),
              /* @__PURE__ */ jsx("p", { children: "Bachelor of Engineering in Computer Science (CGPA: 8.6/10)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
              /* @__PURE__ */ jsx("p", { children: "2022 – 2026" }),
              /* @__PURE__ */ jsx("p", { children: "Chennai, India" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "Sri Chaitanya Jr. College" }),
              /* @__PURE__ */ jsx("p", { children: "XII Board Percentage - 79.0 %" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
              /* @__PURE__ */ jsx("p", { children: "2020 – 2022" }),
              /* @__PURE__ */ jsx("p", { children: "Hyderabad, India" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Professional Experience" }),
        /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "Full Stack Developer Intern" }),
              /* @__PURE__ */ jsx("p", { children: "TaskLabs" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
              /* @__PURE__ */ jsx("p", { children: "Jun 2024 – Dec 2024" }),
              /* @__PURE__ */ jsx("p", { children: "Remote" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Contributed to the development of core functionalities for TaskLabs, enhancing user experience and platform stability." }),
            /* @__PURE__ */ jsx("li", { children: "Implemented key features and optimizations, leading to a 30% improvement in system performance." }),
            /* @__PURE__ */ jsx("li", { children: "Collaborated with the founding team to develop and execute product development roadmaps, resulting in a 25% faster time-to-market and a 15% increase in user acquisition." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "subheading", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: "Full Stack Developer" }),
              /* @__PURE__ */ jsx("p", { children: "Service to Mankind (STM)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "date-location", children: [
              /* @__PURE__ */ jsx("p", { children: "Apr 2024 – Jun 2024" }),
              /* @__PURE__ */ jsx("p", { children: "Remote" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Engineered and launched a donation feature on the website, resulting in a 50% increase in donations." }),
            /* @__PURE__ */ jsx("li", { children: "Administered and modernized the tech stack, enhancing system security and operational efficiency." }),
            /* @__PURE__ */ jsx("li", { children: "Collaborated with cross-functional teams to deliver high-quality open-source software solutions." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Notable Projects" }),
        /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "project", children: [
            /* @__PURE__ */ jsxs("h3", { children: [
              /* @__PURE__ */ jsx("a", { href: "https://www.npteloverflow.in/", children: "NptelOverflow" }),
              " | ",
              /* @__PURE__ */ jsx("em", { children: "NextJs, Typescript, Javascript, Firebase, Python" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Developed a Q&A platform focused on NPTEL courses, providing a centralized space for users to access, answer, and vote on course-related questions, increasing user engagement by 40%." }),
              /* @__PURE__ */ jsx("li", { children: "Implemented a forum for open discussions and customizable user profiles, resulting in a 30% increase in user retention through enhanced community interaction and personalized experiences." }),
              /* @__PURE__ */ jsx("li", { children: "Boosted user contributions by 35% through a leaderboard system, encouraging competitive participation." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "project", children: [
            /* @__PURE__ */ jsxs("h3", { children: [
              /* @__PURE__ */ jsx("a", { href: "https://github.com/Kanishk3813/Intel_Sentiment_Analysis", children: "Review Analyzer" }),
              " | ",
              /* @__PURE__ */ jsx("em", { children: "React, Python, Flask, Axios, Matplotlib" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Developed and trained a deep learning model (BERT) for sentiment analysis of reviews, classifying them into positive, neutral, or negative categories." }),
              /* @__PURE__ */ jsx("li", { children: "Implemented features like word cloud generation and past trends visualization to help businesses identify common themes and track changes in customer perception." }),
              /* @__PURE__ */ jsx("li", { children: "Enabled CSV upload for batch processing and provided downloadable reports in JSON format for detailed analysis." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "project", children: [
            /* @__PURE__ */ jsxs("h3", { children: [
              /* @__PURE__ */ jsx("a", { href: "https://github.com/", children: "Dark Pattern Buster" }),
              " | ",
              /* @__PURE__ */ jsx("em", { children: "HTML, CSS, JavaScript, Python" })
            ] }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "The Dark Pattern Buster Chrome extension is a powerful tool designed to combat deceptive design tactics." }),
              /* @__PURE__ */ jsx("li", { children: "Integrated dark pattern keyword highlighting and informative tooltips, boosting user reporting and site blacklisting accuracy to 97%." }),
              /* @__PURE__ */ jsx("li", { children: "Implemented website safety score display function utilizing APIs for enhanced user security." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Technical Skills" }),
        /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsxs("ul", { className: "skills-list", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Languages:" }),
            " C/C++, Python, JavaScript, HTML, CSS, TypeScript"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Frameworks & Libraries:" }),
            " Tailwind CSS, NextJs, Bootstrap, Flask, Numpy, Pandas, Matplotlib, ReactJs, Tkinter, Streamlit"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Tools:" }),
            " Jupyter Notebook, VScode, Github, Git, Google Colab, AWS"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Databases:" }),
            " MySQL, PostgreSQL"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Machine Learning/Deep Learning:" }),
            " TensorFlow, PyTorch, scikit-learn, Keras, Librosa, Computer Vision"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Certifications" }),
        /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Introduction to Salesforce Lightning Web Component" }),
          /* @__PURE__ */ jsx("li", { children: "Supervised Machine Learning - Coursera" }),
          /* @__PURE__ */ jsx("li", { children: "Java, Computer Architecture, DAA - NPTEL" }),
          /* @__PURE__ */ jsx("li", { children: "Cloud Foundations & Architecting – AWS Academy" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "resume-section", children: [
        /* @__PURE__ */ jsx("h2", { children: "Extra-Curricular Activities" }),
        /* @__PURE__ */ jsx("div", { className: "section-content", children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Engaged as an active member across multiple technical clubs, organizing various events and hackathons." }),
          /* @__PURE__ */ jsx("li", { children: "Cricket enthusiast with a passion for gaming and anime during downtime." })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "close-button", onClick: onClose, children: "x" })
  ] });
};

const ResumeModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: handleOpen, children }),
    isOpen && createPortal(
      /* @__PURE__ */ jsx(Resume, { onClose: handleClose }),
      document.body
    )
  ] });
};

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const navItems = [
    {
      label: "Home",
      href: "#home",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path></svg>`
    },
    {
      label: "Projects",
      href: "#projects",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4 5V19H20V7H11.5858L9.58579 5H4ZM12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5Z"></path></svg>`
    },
    {
      label: "Resume",
      href: "#",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM19 19H5V5H19V19ZM7 10H9V12H7V10ZM7 14H17V16H7V14ZM11 10H17V12H11V10Z"></path></svg>`,
      isResume: true
    },
    {
      label: "Contact",
      href: "#contact",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>`
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-center w-full" data-astro-cid-d6vcou2g> <nav id="main-nav" class="fixed left-1/2 -translate-x-1/2 z-[100] bg-[var(--background)] border border-1 border-transparent backdrop-blur-xl transition-all duration-500 ease-in-out md:top-6 md:bottom-auto bottom-0 w-[80%]" data-astro-cid-d6vcou2g> <div class="container mx-auto flex justify-center items-center px-2 mt-5" data-astro-cid-d6vcou2g> <ul class="flex w-full justify-between md:space-x-6 md:justify-center md:gap-12 gap-6" data-astro-cid-d6vcou2g> ${navItems.map((item) => renderTemplate`<li class="flex-1 md:flex-none" data-astro-cid-d6vcou2g> ${item.isResume ? renderTemplate`${renderComponent($$result, "ResumeModal", ResumeModal, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/ResumeModal", "client:component-export": "default", "data-astro-cid-d6vcou2g": true }, { "default": ($$result2) => renderTemplate` <a href="#" class="flex flex-col items-center text-[var(--white-icon)] transition-colors text-xs md:text-base relative group cursor-pointer" data-astro-cid-d6vcou2g> <div class="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 scale-0 opacity-0 bg-[#A9FF5B] nav-indicator hidden md:block" data-astro-cid-d6vcou2g></div> <span class="md:hidden flex items-center justify-center w-6 h-6" data-astro-cid-d6vcou2g> <fragment data-astro-cid-d6vcou2g>${unescapeHTML(item.icon)}</fragment> </span> <span class="hidden md:inline-block" data-astro-cid-d6vcou2g>${item.label}</span> <span class="md:hidden" data-astro-cid-d6vcou2g>${item.label}</span> </a> ` })}` : renderTemplate`<a${addAttribute(item.href, "href")} class="flex flex-col items-center text-[var(--white-icon)] transition-colors text-xs md:text-base relative group" data-astro-cid-d6vcou2g> <div class="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 scale-0 opacity-0 bg-[#A9FF5B] nav-indicator hidden md:block" data-astro-cid-d6vcou2g></div> <span class="md:hidden flex items-center justify-center w-6 h-6" data-astro-cid-d6vcou2g> <fragment data-astro-cid-d6vcou2g>${unescapeHTML(item.icon)}</fragment> </span> <span class="hidden md:inline-block" data-astro-cid-d6vcou2g>${item.label}</span> <span class="md:hidden" data-astro-cid-d6vcou2g>${item.label}</span> </a>`} </li>`)} </ul> </div> </nav> </div>  ${renderScript($$result, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/nav.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/nav.astro", void 0);

const LetterGlitch = ({
  glitchColors = ["#5e4491", "#A476FF", "#241a38"],
  glitchSpeed = 33,
  centerVignette = false,
  outerVignette = false,
  smooth = true
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef(null);
  const lastGlitchTime = useRef(Date.now());
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;
  const lettersAndSymbols = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "!",
    "@",
    "#",
    "$",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "/",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "<",
    ">",
    ",",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };
  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };
  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };
  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }));
  };
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };
  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";
    letters.current.forEach((letter, index) => {
      const x = index % grid.current.columns * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };
  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;
    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));
    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;
      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();
      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };
  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;
        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress
          );
          needsRedraw = true;
        }
      }
    });
    if (needsRedraw) {
      drawLetters();
    }
  };
  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }
    if (smooth) {
      handleSmoothTransitions();
    }
    animationRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        animate();
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [glitchSpeed, smooth]);
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full bg-[#101010] overflow-hidden", children: [
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "block w-full h-full" }),
    outerVignette && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(16,16,16,0)_60%,_rgba(16,16,16,1)_100%)]" }),
    centerVignette && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]" })
  ] });
};

const $$LogoWall = createComponent(($$result, $$props, $$slots) => {
  const technologies = [
    "react",
    "astro",
    "vercel",
    "typeScript",
    "tailwindcss",
    "python",
    "flask",
    "next",
    "nodejs",
    "HTML5",
    "CSS3",
    "javaScript",
    "python",
    "firebase",
    "bootstrap",
    "git",
    "mysql",
    "postgresql",
    "tensorflow",
    "pytorch",
    "aws"
  ];
  return renderTemplate`${maybeRenderHead()}<div class="relative overflow-x-hidden py-8"> <div class="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20"></div> <div class="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20"></div> <div class="flex animate-scroll hover:animate-paused gap-12 md:gap-20 w-max"> ${[...technologies, ...technologies, ...technologies].map((tech) => renderTemplate`<div class="flex items-center gap-2 group transition-all duration-300"> <img${addAttribute(`/svg/${tech}.svg`, "src")}${addAttribute(tech, "alt")} class="h-7 w-auto object-contain transition-transform group-hover:scale-110 opacity-60" width="30" height="30" loading="lazy"> <span class="text-lg font-medium text-[var(--white-icon)]"> ${tech.charAt(0).toUpperCase() + tech.slice(1)} </span> </div>`)} </div> </div> `;
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/logoWall.astro", void 0);

const CategoryIcons = {
  "Full Stack Development": /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-[var(--sec)] opacity-70", children: /* @__PURE__ */ jsx("path", { d: "M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z" }) }),
  "Machine Learning & AI": /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-[var(--sec)] opacity-70", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM11 16v-2h2v2h-2zm0-4V8h2v4h-2z" }) }),
  "Database & Backend": /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-[var(--sec)] opacity-70", children: /* @__PURE__ */ jsx("path", { d: "M5 9V7h14v2H5zm0 4v-2h14v2H5zm0 4v-2h14v2H5z" }) }),
  "Cloud & Tools": /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-6 h-6 text-[var(--sec)] opacity-70", children: /* @__PURE__ */ jsx("path", { d: "M12 4C8.134 4 5 7.134 5 11c0 .833.167 1.667.5 2.5H6c1.378 0 2.5 1.122 2.5 2.5S7.378 18.5 6 18.5H5.5c-.333.833-.5 1.667-.5 2.5 0 3.866 3.134 7 7 7s7-3.134 7-7c0-.833-.167-1.667-.5-2.5H18c-1.378 0-2.5-1.122-2.5-2.5S16.622 11 18 11h.5c.333-.833.5-1.667.5-2.5 0-3.866-3.134-7-7-7z" }) })
};
const SkillsList = () => {
  const [openItem, setOpenItem] = useState(null);
  const skills = {
    "Full Stack Development": [
      "React, Next.js, Tailwind CSS",
      "JavaScript, TypeScript, HTML, CSS",
      "Web application & UI development"
    ],
    "Machine Learning & AI": [
      "TensorFlow, PyTorch, scikit-learn",
      "Computer Vision & Deep Learning",
      "Data analysis with Numpy & Pandas"
    ],
    "Database & Backend": [
      "MySQL, PostgreSQL database management",
      "Flask & Node.js backends",
      "API development & integration"
    ],
    "Cloud & Tools": [
      "AWS Cloud Services",
      "Git version control & GitHub",
      "Jupyter Notebook & Google Colab"
    ]
  };
  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };
  return /* @__PURE__ */ jsxs("div", { className: "text-left pt-3 md:pt-9", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6", children: "What I do?" }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-4 mt-4 text-lg", children: Object.entries(skills).map(([category, items]) => /* @__PURE__ */ jsx("li", { className: "w-full", children: /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => toggleItem(category),
        className: "md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4", children: [
            CategoryIcons[category],
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-grow justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "min-w-0 max-w-[200px] md:max-w-none overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "block truncate text-[var(--white)] text-lg", children: category }) }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  className: `w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${openItem === category ? "rotate-180" : ""}`,
                  children: /* @__PURE__ */ jsx("path", { d: "M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transition-all duration-300 px-4 ${openItem === category ? "max-h-[500px] pb-4 opacity-100" : "max-h-0 opacity-0"}`,
              children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-[var(--white-icon)] text-sm", children: items.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx("span", { className: "pl-1", children: "•" }),
                /* @__PURE__ */ jsx("li", { className: "pl-3", children: item })
              ] }, index)) })
            }
          )
        ]
      }
    ) }, category)) })
  ] });
};

const $$Home = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="text-[var(--white)] mt-[7rem] md:mt-0" id="home"> <div class="max-w-5xl mx-auto space-y-8 md:py-36 pb-14"> <div class="text-left space-y-4"> <p class="text-md md:text-lg text-[var(--white-icon)] shiny-white">
Hi, I'm${" "} <span class="inline-block"> ${renderComponent($$result, "TrueFocus", null, { "client:only": "react", "sentence": "Kanishk Reddy", "manualMode": false, "blurAmount": 4, "borderColor": "var(--sec)", "animationDuration": 2, "pauseBetweenAnimations": 1, "fontSize": "1.2em", "fontWeight": "600", "fontFamily": "inherit", "color": "#ffffff", "client:component-hydration": "only", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/TrueFocus", "client:component-export": "default" })} </span> </p> <div class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 md:gap-4"> <h1 class="text-[var(--white)] text-5xl md:text-6xl font-medium text-pretty leading-none">
Software <br> Developer
</h1> <p class="text-md md:text-2xl text-[var(--white-icon)]">
Transforming ideas into interactive and seamless digital experiences
          with cutting-edge <span class="text-[var(--sec)] shiny-sec">Full-Stack</span> development.
</p> </div> <div class="flex justify-start gap-2 pt-3 md:pt-6"> <a target="_blank" href="https://github.com/Kanishk3813" aria-label="GitHub" class="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"> <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path> </svg> </a> <a target="_blank" href="https://www.linkedin.com/in/kanishk-reddy-8161a122a/" aria-label="LinkedIn" class="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"> <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path> </svg> </a> <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=kanishkreddy3813@gmail.com&su=Hey%20Oscar!" aria-label="Email" class="text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-1 border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <svg xmlns="http://www.w3.org/2000/svg" width="2.1em" height="2.1em" viewBox="0 0 24 24"> <path fill="currentColor" d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"></path> </svg> </a> </div> </div> ${renderComponent($$result, "LogoWall", $$LogoWall, {})} <div class="flex flex-col lg:flex-row items-center gap-8"> ${renderComponent($$result, "SkillsList", SkillsList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/SkillsList.tsx", "client:component-export": "default" })} <div class="flex justify-center md:w-full md:h-[292px] size-[290px] pt-3 md:pt-9 md:ml-16"> ${renderComponent($$result, "LetterGlitch", LetterGlitch, { "client:load": true, "glitchColors": ["#5e4491", "#A476FF", "#241a38"], "glitchSpeed": 33, "centerVignette": false, "outerVignette": true, "smooth": true, "client:component-hydration": "load", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/LetterGlitch.tsx", "client:component-export": "default" })} </div> </div> </div> </section> `;
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/home.astro", void 0);

const Intel = new Proxy({"src":"/_astro/intel.DEna_HIX.png","width":1918,"height":910,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/kanis/Desktop/my_portfolio/Portfolio/public/intel.png";
							}
							
							return target[name];
						}
					});

const Parse = new Proxy({"src":"/_astro/parseflow.B5yYsC0y.png","width":1901,"height":885,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/kanis/Desktop/my_portfolio/Portfolio/public/parseflow.png";
							}
							
							return target[name];
						}
					});

const Capital = new Proxy({"src":"/_astro/intel1.PuN_DjC3.png","width":1907,"height":927,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/kanis/Desktop/my_portfolio/Portfolio/public/intel1.png";
							}
							
							return target[name];
						}
					});

const Nptel = new Proxy({"src":"/_astro/nptel.hkNn9QQk.png","width":1905,"height":928,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/kanis/Desktop/my_portfolio/Portfolio/public/nptel.png";
							}
							
							return target[name];
						}
					});

const TaskX = new Proxy({"src":"/_astro/taskx.IUe2kDuy.png","width":1897,"height":890,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/kanis/Desktop/my_portfolio/Portfolio/public/taskx.png";
							}
							
							return target[name];
						}
					});

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  const hoverIntensity = 0.5;
  const enableHover = true;
  const projects = [
    {
      title: "NptelOverflow",
      image: Nptel,
      link: "https://github.com/aaayushh7/Mealy-",
      preview: "https://www.npteloverflow.in/",
      status: "Developed"
    },
    {
      title: "TaskX",
      image: TaskX,
      link: "https://github.com/Kanishk3813/TaskX",
      preview: "https://task-x-rouge.vercel.app/",
      status: "Under Development"
    },
    {
      title: "CapitalCue - AI Branch Manager",
      image: Capital,
      link: "https://github.com/Kanishk3813/ai-manager",
      preview: "capitalcue-drab.vercel.app",
      status: "On Development"
    },
    {
      title: "Intel Review Analyzer",
      image: Intel,
      link: "https://github.com/Kanishk3813/Intel_Sentiment_Analysis",
      preview: "https://reviewanalyzer.vercel.app/",
      status: "Developed"
    },
    {
      title: "ParseFlow",
      image: Parse,
      link: "https://github.com/Kanishk3813/ParseFlow",
      preview: "https://project-sonch-5buctavxw-aaayushh7s-projects.vercel.app/",
      status: "Developed"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="projects" class="py-12 border-t border-[#ffffff10] text-[var(--white)]"> <div class="max-w-5xl mx-auto"> <h2 class="text-lg text-[var(--sec)] mb-2 shiny-sec">My work</h2> <div class="mb-8"> ${renderComponent($$result, "FuzzyText", null, { "client:only": "react", "baseIntensity": 0.2, "hoverIntensity": hoverIntensity, "enableHover": enableHover, "fontSize": "2.5rem", "color": "#ffffff", "text": "Projects", "client:component-hydration": "only", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/FuzzyText", "client:component-export": "default" })} </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> ${projects.map((project) => renderTemplate`${renderComponent($$result, "ProjectCard", null, { "client:only": true, ...project, "client:component-hydration": "only", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/ProjectCard", "client:component-export": "default" })}`)} </div> <a target="_blank" href="https://github.com/aaayushh7?tab=repositories" aria-label="GitHub" class="w-full flex items-center justify-center gap-2 mt-9 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-full bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"> <span class="md:text-lg text-md">More projects on</span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"> <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path> </svg> </a> </div> </section>`;
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/projects.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const hoverIntensity = 0.5;
  const enableHover = true;
  return renderTemplate(_a || (_a = __template(["", `<section id="contact" class="w-full py-12 border-t border-[#ffffff10]"> <div class="max-w-5xl mx-auto"> <h2 class="text-lg text-[var(--sec)] mb-2 shiny-sec">Let's talk</h2> <div class="mb-6"> `, ' </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <div class="text-[var(--white-icon)]"> <p class="mb-4">\nHave a question or a project in mind? Feel free to reach out.\n</p> <div class="flex items-center gap-2"> <span>Location:</span> <span class="text-[var(--white)]">Chennai, Tamil Nadu, India</span> </div> </div> <div> <form id="contact-form" action="https://formspree.io/f/xdkelzgk" method="POST" class="flex flex-col gap-4"> <input type="text" name="from_name" placeholder="Name" required class="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)]"> <input type="email" name="reply_to" placeholder="Email" required class="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)]"> <textarea name="message" placeholder="Message" rows="6" required class="px-4 py-2 bg-[#1414149c] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sec)] resize-none"></textarea> <button type="submit" class="px-4 py-2 bg-[var(--white-icon-tr)] text-[var(--white)] rounded-lg opacity-60 transition-opacity border border-[var(--white-icon-tr)] hover:opacity-100 hover:bg-[var(--white-icon-tr)]">\nSubmit\n</button> </form> <div id="form-message" class="hidden justify-center items-center mt-4 text-[var(--white)] text-lg">\n\u2705 Thank you for your message!\n</div> </div> </div> </div> </section> <script type="module">\n  const form = document.getElementById("contact-form");\n  const formMessage = document.getElementById("form-message");\n\n  form.addEventListener("submit", async (e) => {\n    e.preventDefault();\n    const formData = new FormData(form);\n\n    try {\n      const response = await fetch(form.action, {\n        method: "POST",\n        body: formData,\n        headers: { Accept: "application/json" },\n      });\n      if (response.ok) {\n        form.reset();\n        form.style.display = "none";\n        formMessage.classList.remove("hidden");\n      } else {\n        const data = await response.json();\n        console.error("Error response:", data);\n        alert("There was a problem sending your message.");\n      }\n    } catch (error) {\n      console.error("Error:", error);\n      alert("There was a problem sending your message.");\n    }\n  });\n<\/script>'])), maybeRenderHead(), renderComponent($$result, "FuzzyText", null, { "client:only": "react", "baseIntensity": 0.2, "hoverIntensity": hoverIntensity, "enableHover": enableHover, "fontSize": "2.5rem", "color": "#ffffff", "text": "Contact", "client:component-hydration": "only", "client:component-path": "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/React/FuzzyText", "client:component-export": "default" }));
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/contact.astro", void 0);

const $$Astro = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="w-full py-12 border-t border-[#ffffff10]"> <div class="max-w-5xl mx-auto"> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10"> <div class="flex flex-col lg:items-start items-center space-y-6 gap-9"> <div class="flex space-x-6 sm:space-x-8"> ${[
    {
      href: "https://github.com/Kanishk3813",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>',
      label: "GitHub"
    },
    {
      href: "https://www.linkedin.com/in/kanishk-reddy-8161a122a/",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8"><path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path></svg>',
      label: "LinkedIn"
    },
    {
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=kanishkreddy3813@gmail.com&su=Hey%20Kanishk!",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2.1em" height="2.1em" viewBox="0 0 24 24"><path fill="currentColor" d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"/></svg>',
      label: "Email"
    }
  ].map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" class="flex flex-col items-center group"${addAttribute(link.label, "aria-label")}> <div class="text-[var(--white-icon)] hover:text-[var(--white)] transition duration-300 ease-in-out"> <div>${unescapeHTML(link.icon)}</div> </div> </a>`)} </div> </div> <div class="flex flex-col items-center md:items-start space-y-6"> <div class="grid grid-cols-1 gap-3 w-full max-w-xs"> ${[
    {
      desc: "Built with",
      name: "Astro",
      icon: "/svg/astro.svg",
      alt: "Astro Logo"
    },
    {
      desc: "Styled with",
      name: "TailwindCSS",
      icon: "/svg/tailwindcss.svg",
      alt: "TailwindCSS Logo"
    },
    {
      desc: "Deployed on",
      name: "Vercel",
      icon: "/svg/vercel.svg",
      alt: "Vercel Logo"
    }
  ].map((tech) => renderTemplate`<div class="flex items-center space-x-3"> <span class="text-[var(--white-icon)] text-sm"> ${tech.desc} </span> <img${addAttribute(tech.icon, "src")}${addAttribute(tech.alt, "alt")} class="h-5 w-5 object-contain filter brightness-0 invert opacity-50" loading="lazy"> <span class="text-[var(--white-icon)] text-sm"> ${tech.name} </span> </div>`)} </div> </div> <div class="flex flex-col items-center lg:items-start space-y-4"> <h3 class="text-lg font-medium text-[var(--white)]">Featured Projects</h3> <div class="w-full max-w-xs"> <ul class="space-y-3"> ${[
    {
      name: "NptelOverflow",
      desc: "Q&A platform for NPTEL courses",
      link: "#"
    },
    {
      name: "Review Analyzer",
      desc: "Sentiment analysis for customer reviews",
      link: "#"
    },
    {
      name: "Dark Pattern Buster",
      desc: "Chrome extension for detecting deceptive UI",
      link: "#"
    }
  ].map((project) => renderTemplate`<li> <a${addAttribute(project.link, "href")} class="block hover:bg-[#ffffff10] p-2 rounded-md transition-all duration-300"> <div class="text-[var(--white)] font-medium">${project.name}</div> <div class="text-[var(--white-icon)] text-sm">${project.desc}</div> </a> </li>`)} </ul> </div> </div> </div> <div class="mt-12 pt-8 border-t border-[#ffffff10]"> <p class="text-center text-sm text-[var(--white-icon)] space-y-2"> <span class="block sm:inline">Copyright © 2025 <a href="https://github.com/Kanishk3813">Kanishk Reddy</a>. All rights reserved.</span> </p> </div> </div> </footer>`;
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/components/footer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Kanishk Reddy" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, {})} ${renderComponent($$result2, "Home", $$Home, {})} ${renderComponent($$result2, "Projects", $$Projects, {})} ${renderComponent($$result2, "Contact", $$Contact, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/pages/index.astro", void 0);

const $$file = "C:/Users/kanis/Desktop/my_portfolio/Portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
