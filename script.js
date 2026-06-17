document.addEventListener("DOMContentLoaded", () => {

    // 1. Double Element Custom Kinetic Pointer Engine
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');

    document.addEventListener('mousemove', (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    });

    // Hover Scaling Animations for Node Elements
    const interactables = document.querySelectorAll('.magnetic-target, .interactive-card, .image-reveal-wrapper, .cred-item');
    
    interactables.forEach(node => {
        node.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, borderColor: "#ffffff", backgroundColor: "rgba(255,255,255,0.02)", duration: 0.3 });
            gsap.to(dot, { scale: 1.5, backgroundColor: "#ffffff" });
        });
        node.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, borderColor: "rgba(0, 255, 170, 0.3)", backgroundColor: "transparent", duration: 0.3 });
            gsap.to(dot, { scale: 1, backgroundColor: "#00ffaa" });
        });
    });

    // 2. Synchronized Hero Interface Entrance Timeline
    const introTl = gsap.timeline();

    introTl.fromTo("nav", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" })
           .fromTo(".reveal-text", { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.4")
           .fromTo(".fade-in-sub, .hero-badge, .hero-actions", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "-=0.6");

    // 3. Cinematic ScrollTrigger Frame Engine for Image Reveal Overlays
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.image-reveal-wrapper').forEach((wrapper) => {
        const img = wrapper.querySelector('.parallax-img');
        const overlay = wrapper.querySelector('.reveal-overlay');

        const imageTl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        imageTl.fromTo(overlay, { x: "-100%" }, { x: "100%", duration: 0.8, ease: "power3.inOut" });
        
        // Apply scaling animation ONLY if it's not the custom-cropped home portrait
        if (!wrapper.classList.contains('grid-portrait')) {
            imageTl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.2, ease: "power2.out" }, "-=0.5");
        }
    });

   // 4. ScrollTrigger Interface Reveals for Executive Profile Data (Supports Index & About Page)
    const targetSelectors = ".about-text-block > *, .cred-item, .bio-text-wrapper > *";
    if(document.querySelectorAll(targetSelectors).length > 0) {
        gsap.fromTo(targetSelectors, 
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
                scrollTrigger: {
                    trigger: document.querySelector(".about-text-block") || document.querySelector(".bio-text-wrapper"),
                    start: "top 75%"
                }
            }
        );
    }
    
    // About Hero Entry Animation
    if(document.querySelector(".about-page-hero")) {
        gsap.fromTo(".about-page-hero h1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.2 });
        gsap.fromTo(".about-page-hero p, .about-page-hero .hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.4 });
    }

    // 5. Micro-glow Coordinate Tracking Engine for Interactive Cards
    document.querySelectorAll('.interactive-card').forEach((card) => {
        const glow = card.querySelector('.card-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(glow, { x: x, y: y, duration: 0.2 });
        });

        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%"
            }
        });
    });

    // 6. Enterprise Anti-Intellectual Theft Protocol (Blocks Right-Click & Source Hotkeys)
    document.addEventListener('contextmenu', event => event.preventDefault()); 

    document.addEventListener('keydown', (e) => {
        // Blocks F12 Developer Tools Menu
        if (e.key === "F12") {
            e.preventDefault();
        }
        // Blocks Inspect Element Key Commands (Ctrl+Shift+I / J)
        if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "i" || e.key === "j")) {
            e.preventDefault();
        }
        // Blocks View Source & Save Hotkeys (Ctrl+U / Ctrl+S / Ctrl+C)
        if (e.ctrlKey && (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s" || e.key === "C" || e.key === "c")) {
            e.preventDefault();
        }
    });
});
// 8. Ventures Page Specific Sequence Blueprint
    if(document.querySelector(".ventures-hero")) {
        gsap.fromTo(".ventures-hero h1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.2 });
        gsap.fromTo(".ventures-hero p, .ventures-hero .hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.4 });
    }

    // ScrollTrigger Grid Reveals for Venture Descriptions
    const ventureTargets = ".venture-text h2, .venture-desc, .spec-tags, .venture-card-box";
    if(document.querySelectorAll(ventureTargets).length > 0) {
        document.querySelectorAll(".venture-block").forEach((block) => {
            gsap.fromTo(block.querySelectorAll(ventureTargets), 
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 75%"
                    }
                }
            );
        });
    }