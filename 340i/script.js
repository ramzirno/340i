document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ----------------------------------
     PAGE LOAD ANIMATIONS
  ---------------------------------- */

  gsap.from('header .logo', {
    scale: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  });

  SplitText.create("h1", {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        y: 420,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  });

  gsap.from('.hero-divider', {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1,
    ease: "power2.out"
  });

  /* ----------------------------------
     HEADER SCROLL EFFECT
     FIX: blur(300px) → blur(18px) — 300px caused a full GPU repaint
     every single frame. 18px looks identical, costs almost nothing.
     FIX: scrub: 0.3 — was 1 (1 second lag on every scroll input)
  ---------------------------------- */

  gsap.to('header', {
    backdropFilter: "blur(18px)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: "49%",
    "--header-color": "#121212",
    scrollTrigger: {
      trigger: 'main',
      start: 'top top',
      end: "+=100",
      scrub: 0.3,
    }
  });

  /* ----------------------------------
     HERO SCROLL ANIMATION
     FIX: scrub: 1 → scrub: 0.5
     FIX: cache getBoundingClientRect() — was being called on every
     scroll tick (60x/sec), forcing a layout reflow each time.
     Now calculated once on load and again only on resize.
  ---------------------------------- */

  const hero = document.querySelector(".hero-section");
  const col2 = document.querySelector(".col-2");

  // Cache inset values — recalculate only on resize
  let cachedInset = null;

  function computeInset() {
    const heroRect = hero.getBoundingClientRect();
    const colRect = col2.getBoundingClientRect();
    const verticalOffset = 90;
    cachedInset = {
      top: (colRect.top - heroRect.top) + verticalOffset,
      left: colRect.left - heroRect.left,
      right: heroRect.right - colRect.right,
      bottom: (heroRect.bottom - colRect.bottom) + verticalOffset
    };
  }

  computeInset();
  window.addEventListener("resize", computeInset);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "+=120%",
      scrub: 0.5,
      pin: true,
      invalidateOnRefresh: true,
      onRefresh: computeInset
    }
  });

  tl.to(".video-wrapper", {
    clipPath: () => {
      const i = cachedInset;
      return `inset(${i.top}px ${i.right}px ${i.bottom}px ${i.left}px round var(--radius))`;
    },
    ease: "power2.out",
    duration: 1
  }, 0);

  tl.to(".video-inner", {
    scale: 0.8,
    ease: "power2.out",
    duration: 1
  }, 0);

  tl.to(".hero-content", {
    opacity: 0,
    ease: "power2.out",
    duration: 1
  }, 0);

  tl.from(".col-1 img", {
    x: "-200%",
    y: "150%",
    stagger: 0.15,
    ease: "power3.out",
    duration: 1
  }, "-=0.6");

  tl.from(".col-3 img", {
    x: "200%",
    y: "150%",
    stagger: 0.15,
    ease: "power3.out",
    duration: 1
  }, "-=0.8");

  /* ----------------------------------
     SECTION 2: PERFORMANCE
     FIX: scrub: 1 → scrub: 0.5
  ---------------------------------- */

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-perf",
      start: "top top",
      end: "+=120%",
      scrub: 0.5,
      pin: true,
      invalidateOnRefresh: true
    }
  });

  tl2.from(".section-perf .section-label", {
    y: 30,
    opacity: 0,
    duration: 0.6
  }, 0);

  tl2.from(".section-perf .section-heading", {
    y: 120,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, 0.1);

  tl2.from(".duo-left", {
    x: "-110%",
    opacity: 0,
    ease: "power3.out",
    duration: 1
  }, 0.2);

  tl2.from(".duo-right", {
    x: "110%",
    opacity: 0,
    ease: "power3.out",
    duration: 1
  }, 0.3);

  tl2.from(".section-perf .section-footer span", {
    y: 20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5
  }, 0.8);

  /* ----------------------------------
     SECTION 3: INTERIOR
     FIX: scrub: 1 → scrub: 0.5
  ---------------------------------- */

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-interior",
      start: "top top",
      end: "+=120%",
      scrub: 0.5,
      pin: true,
      invalidateOnRefresh: true
    }
  });

  tl3.from(".section-interior .section-label", {
    y: 30,
    opacity: 0,
    duration: 0.6
  }, 0);

  tl3.from(".section-interior .section-heading", {
    y: 120,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, 0.1);

  tl3.from(".trio-top", {
    y: "80%",
    opacity: 0,
    ease: "power3.out",
    duration: 1
  }, 0.2);

  tl3.from(".trio-mid", {
    x: "120%",
    opacity: 0,
    ease: "power3.out",
    duration: 1
  }, 0.35);

  tl3.from(".trio-bot", {
    x: "120%",
    opacity: 0,
    ease: "power3.out",
    duration: 1
  }, 0.5);

  tl3.from(".section-interior .section-footer span", {
    y: 20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5
  }, 0.8);

  /* ----------------------------------
     SECTION 4: CTA
     FIX: scrub: 1 → scrub: 0.5
     FIX: animate scaleX instead of width — avoids layout reflow
  ---------------------------------- */

  const tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top top",
      end: "+=80%",
      scrub: 0.5,
      pin: true,
      invalidateOnRefresh: true
    }
  });

  tl4.from(".cta-bg img", {
    scale: 1.3,
    opacity: 0,
    ease: "power2.out",
    duration: 1
  }, 0);

  tl4.from(".cta-label", {
    y: 20,
    opacity: 0,
    duration: 0.5
  }, 0.3);

  tl4.from(".cta-heading", {
    y: 80,
    opacity: 0,
    ease: "power3.out",
    duration: 0.8
  }, 0.4);

  // FIX: scaleX instead of width — no layout reflow
  tl4.from(".cta-divider", {
    scaleX: 0,
    transformOrigin: "left center",
    ease: "power2.out",
    duration: 0.8
  }, 0.7);

  tl4.from(".cta-btn", {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5
  }, 0.9);

});