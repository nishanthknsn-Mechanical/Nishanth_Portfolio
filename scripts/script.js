/* ============================================
   NISHANTH KASANI — PORTFOLIO
   script.js — Interactions & Animations
   WITH ANIMATION OPTIONS
============================================ */

(function () {
  "use strict";

  /* ==================
     CHOOSE ANIMATION STYLE
     Options: 'orbital', 'pulse', 'float', 'bounce', 'shimmer',
              'grid-slide', 'tech-pulse', 'blueprint-scan', 'gear-spin', 'glow-orbit'
  ================== */
  const ANIMATION_STYLE = 'grid-slide'; // Change this to try different animations

  /* ==================
     NAV SCROLL EFFECT
  ================== */
  const nav = document.getElementById("nav");

  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load

  /* ==================
     HAMBURGER MENU
  ================== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);

    // Animate hamburger spans
    const spans = hamburger.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close menu on nav link click
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    });
  });

  /* ==================
     REVEAL ON SCROLL
  ================== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Trigger hero reveals immediately
  const heroReveals = document.querySelectorAll(".hero .reveal");
  setTimeout(() => {
    heroReveals.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 120);
    });
  }, 200);

  /* ==================
     SECTION CARD REVEALS
  ================== */
  function addRevealToElements(selector, delay = 0) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.transitionDelay = `${delay + i * 0.12}s`;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
    });
  }

  addRevealToElements(".about-card", 0);
  addRevealToElements(".timeline-item", 0);
  addRevealToElements(".edu-card", 0);
  addRevealToElements(".project-card", 0);
  addRevealToElements(".skill-group", 0);
  addRevealToElements(".contact-link", 0.1);

  /* ==================
     SKILL BAR ANIMATION
  ================== */
  const skillBars = document.querySelectorAll(".sb-fill");

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute("data-width");
          entry.target.style.width = targetWidth + "%";
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => {
    bar.style.width = "0";
    barObserver.observe(bar);
  });

  /* ==================
     SMOOTH SCROLL
  ================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  });

  /* ==================
     ACTIVE NAV HIGHLIGHT
  ================== */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove("active"));
          const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ==================
     PROJECT CARD TILT
  ================== */
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 4;
      const tiltY = ((cx - x) / cx) * 4;
      card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ==================
     FLOATING LABEL ANIMATIONS
     Choose your style!
  ================== */
  const floatLabels = document.querySelectorAll(".label-float");

  // OPTION 1: ORBITAL (Original - circular movement)
  function animateOrbital() {
    const floatAngles = [0, 90, 180, 270];
    floatLabels.forEach((label, i) => {
      let angle = floatAngles[i];
      const radius = 160;
      const cx = 200;
      const cy = 200;
      const speed = 0.003;

      function updatePosition(timestamp) {
        angle = (floatAngles[i] * Math.PI) / 180 + timestamp * speed;
        const x = cx + radius * Math.cos(angle) - 20;
        const y = cy + radius * Math.sin(angle) - 10;
        label.style.left = x + "px";
        label.style.top = y + "px";
        requestAnimationFrame(updatePosition);
      }

      requestAnimationFrame(updatePosition);
    });
  }

  // OPTION 2: PULSE (Scale + fade in and out)
  function animatePulse() {
    const positions = [
      { left: "20%", top: "15%" },
      { right: "10%", top: "50%" },
      { left: "50%", bottom: "15%" },
      { left: "10%", top: "50%" }
    ];

    floatLabels.forEach((label, i) => {
      // Set initial positions
      Object.assign(label.style, positions[i]);
      
      // Add pulsing animation
      label.style.animation = `pulse-label 3s ease-in-out infinite`;
      label.style.animationDelay = `${i * 0.4}s`;
    });

    // Add keyframe animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse-label {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.3); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 3: FLOATING (Smooth vertical bob motion)
  function animateFloating() {
    const positions = [
      { left: "20%", top: "15%" },
      { right: "10%", top: "50%" },
      { left: "50%", bottom: "15%" },
      { left: "10%", top: "50%" }
    ];

    floatLabels.forEach((label, i) => {
      // Set initial positions
      Object.assign(label.style, positions[i]);
      
      // Add floating animation
      label.style.animation = `float-label 6s ease-in-out infinite`;
      label.style.animationDelay = `${i * 0.8}s`;
    });

    // Add keyframe animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float-label {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-15px) rotate(-2deg); }
        50% { transform: translateY(0px) rotate(0deg); }
        75% { transform: translateY(-15px) rotate(2deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 4: BOUNCE (Elastic movement with spring effect)
  function animateBounce() {
    const positions = [
      { left: "20%", top: "15%" },
      { right: "10%", top: "50%" },
      { left: "50%", bottom: "15%" },
      { left: "10%", top: "50%" }
    ];

    floatLabels.forEach((label, i) => {
      // Set initial positions
      Object.assign(label.style, positions[i]);
      
      // Add bouncing animation with rotation
      label.style.animation = `bounce-label 2.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite`;
      label.style.animationDelay = `${i * 0.5}s`;
    });

    // Add keyframe animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes bounce-label {
        0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
        25% { transform: translateY(-20px) translateX(8px) rotate(-5deg); }
        50% { transform: translateY(0) translateX(0) rotate(0deg); }
        75% { transform: translateY(-20px) translateX(-8px) rotate(5deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 5: SHIMMER (Light sweep across labels)
  function animateShimmer() {
    const positions = [
      { left: "20%", top: "15%" },
      { right: "10%", top: "50%" },
      { left: "50%", bottom: "15%" },
      { left: "10%", top: "50%" }
    ];

    floatLabels.forEach((label, i) => {
      Object.assign(label.style, positions[i]);
      label.style.animation = `shimmer-label 3.5s ease-in-out infinite`;
      label.style.animationDelay = `${i * 0.45}s`;
    });

    const style = document.createElement("style");
    style.textContent = `
      @keyframes shimmer-label {
        0%, 100% { opacity: 0.5; box-shadow: none; }
        50% { opacity: 1; box-shadow: 0 0 12px rgba(232, 164, 74, 0.6), inset 0 0 8px rgba(232, 164, 74, 0.15); }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 6: GRID SLIDE (Technical blueprint effect)
  function animateGridSlide() {
    const positions = [
      { left: "20%", top: "15%" },
      { right: "10%", top: "50%" },
      { left: "50%", bottom: "15%" },
      { left: "10%", top: "50%" }
    ];

    floatLabels.forEach((label, i) => {
      Object.assign(label.style, positions[i]);
      label.style.animation = `grid-slide ${4 + i * 0.5}s ease-in-out infinite`;
      label.style.animationDelay = `${i * 0.5}s`;
    });

    const style = document.createElement("style");
    style.textContent = `
      @keyframes grid-slide {
        0%, 100% { transform: translateX(0) translateY(0) skewX(0deg); opacity: 0.6; }
        50% { transform: translateX(15px) translateY(15px) skewX(2deg); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 7: TECH PULSE (Engineering heartbeat effect)
  function animateTechPulse() {
    const positions = [
      { left: "20%", top: "15%" },
      { right: "10%", top: "50%" },
      { left: "50%", bottom: "15%" },
      { left: "10%", top: "50%" }
    ];

    floatLabels.forEach((label, i) => {
      Object.assign(label.style, positions[i]);
      label.style.animation = `tech-pulse 2.5s cubic-bezier(0.6, 0, 0.4, 1) infinite`;
      label.style.animationDelay = `${i * 0.3}s`;
    });

    const style = document.createElement("style");
    style.textContent = `
      @keyframes tech-pulse {
        0%, 100% { transform: scale(1) rotate(0deg); border-color: rgba(232, 164, 74, 0.3); box-shadow: 0 0 0 0 rgba(232, 164, 74, 0.4); }
        50% { transform: scale(1.15) rotate(1deg); border-color: rgba(232, 164, 74, 0.8); box-shadow: 0 0 15px 5px rgba(232, 164, 74, 0.2); }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 8: BLUEPRINT SCAN (Scanning line effect)
  function animateBlueprintScan() {
    const positions = [
      { left: "20%", top: "15%" },
      { right: "10%", top: "50%" },
      { left: "50%", bottom: "15%" },
      { left: "10%", top: "50%" }
    ];

    floatLabels.forEach((label, i) => {
      Object.assign(label.style, positions[i]);
      label.style.animation = `blueprint-scan 3s ease-in-out infinite`;
      label.style.animationDelay = `${i * 0.4}s`;
    });

    const style = document.createElement("style");
    style.textContent = `
      @keyframes blueprint-scan {
        0%, 100% { opacity: 0.5; transform: scaleX(1) scaleY(0.8); filter: brightness(0.8); }
        50% { opacity: 1; transform: scaleX(1.1) scaleY(1); filter: brightness(1.2) drop-shadow(0 0 8px rgba(232, 164, 74, 0.6)); }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 9: GEAR SPIN (Rotating mechanical gears)
  function animateGearSpin() {
    const radius = 140;
    const cx = 200;
    const cy = 200;
    const angles = [0, 90, 180, 270];

    floatLabels.forEach((label, i) => {
      label.style.animation = `gear-spin 4s linear infinite`;
      label.style.animationDelay = `${i * 0.8}s`;
      
      const angle = (angles[i] * Math.PI) / 180;
      const x = cx + radius * Math.cos(angle) - 20;
      const y = cy + radius * Math.sin(angle) - 10;
      
      label.style.left = x + "px";
      label.style.top = y + "px";
    });

    const style = document.createElement("style");
    style.textContent = `
      @keyframes gear-spin {
        0% { transform: rotate(0deg) scale(1); opacity: 0.7; }
        50% { transform: rotate(180deg) scale(1.1); opacity: 1; }
        100% { transform: rotate(360deg) scale(1); opacity: 0.7; }
      }
    `;
    document.head.appendChild(style);
  }

  // OPTION 10: GLOW ORBIT (Glowing path with orbital motion)
  function animateGlowOrbit() {
    const radius = 160;
    const cx = 200;
    const cy = 200;
    const angles = [0, 90, 180, 270];

    floatLabels.forEach((label, i) => {
      let startAngle = angles[i];
      const speed = 0.002;

      function updatePosition(timestamp) {
        const angle = (startAngle * Math.PI) / 180 + timestamp * speed;
        const x = cx + radius * Math.cos(angle) - 20;
        const y = cy + radius * Math.sin(angle) - 10;
        
        // Calculate brightness based on Y position for lighting effect
        const brightness = 0.7 + (Math.sin(angle) + 1) * 0.3;
        const glowSize = brightness * 15;
        
        label.style.left = x + "px";
        label.style.top = y + "px";
        label.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(232, 164, 74, ${brightness * 0.6}))`;
        label.style.opacity = String(0.6 + brightness * 0.4);
        
        requestAnimationFrame(updatePosition);
      }

      requestAnimationFrame(updatePosition);
    });
  }

  // Execute the selected animation
  switch (ANIMATION_STYLE) {
    case 'orbital':
      animateOrbital();
      break;
    case 'pulse':
      animatePulse();
      break;
    case 'float':
      animateFloating();
      break;
    case 'bounce':
      animateBounce();
      break;
    case 'shimmer':
      animateShimmer();
      break;
    case 'grid-slide':
      animateGridSlide();
      break;
    case 'tech-pulse':
      animateTechPulse();
      break;
    case 'blueprint-scan':
      animateBlueprintScan();
      break;
    case 'gear-spin':
      animateGearSpin();
      break;
    case 'glow-orbit':
      animateGlowOrbit();
      break;
    default:
      animateGearSpin();
  }

  /* ==================
     SCROLL PROGRESS INDICATOR
  ================== */
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #c4863a, #e8a44a);
    width: 0%;
    z-index: 200;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + "%";
    },
    { passive: true }
  );

  /* ==================
     ACTIVE NAV STYLE
  ================== */
  const navActiveStyle = document.createElement("style");
  navActiveStyle.textContent = `
    .nav-links a.active { color: var(--amber) !important; }
  `;
  document.head.appendChild(navActiveStyle);

  /* ==================
     MAKE PS-TEXT EDITABLE
  ================== */
  document.querySelectorAll(".ps-text").forEach((el) => {
    el.setAttribute("contenteditable", "true");
  });

  /* ==================
     LIGHTBOX — images + videos
  ================== */
  const lightbox      = document.getElementById("lightbox");
  const lightboxImg   = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightboxImage(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightboxImg.style.display = "block";
    lightboxVideo.style.display = "none";
    lightboxVideo.pause();
    lightboxVideo.src = "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function openLightboxVideo(src) {
    lightboxVideo.src = src;
    lightboxVideo.style.display = "block";
    lightboxImg.style.display = "none";
    lightboxImg.src = "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lightboxVideo.play().catch(() => {});
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lightboxImg.src = "";
    lightboxImg.style.display = "none";
    lightboxVideo.pause();
    lightboxVideo.src = "";
    lightboxVideo.style.display = "none";
  }

  // Clickable images
  document.querySelectorAll(".proj-img").forEach((img) => {
    img.addEventListener("click", () => openLightboxImage(img.src, img.alt));
  });

  // Clickable videos — grab src from <source> tag if needed
  document.querySelectorAll(".proj-video").forEach((vid) => {
    vid.addEventListener("click", () => {
      const src = vid.src || (vid.querySelector("source") ? vid.querySelector("source").src : "");
      if (src) openLightboxVideo(src);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ==================
     LAZY VIDEO AUTOPLAY
  ================== */
  document.querySelectorAll(".proj-video").forEach((v) => {
    v.muted = true;
    v.playsInline = true;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(v);
  });

})();