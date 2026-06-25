// ==========================================================
// 1. ENGINE: THREE.JS INTERACTIVE ENVIRONMENT
// ==========================================================
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 4000; 

const posArray = new Float32Array(particlesCount * 3);

for(let i=0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10; 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.006,
    color: '#6366f1', 
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending 
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.025; 
    particlesMesh.rotation.x = -window.scrollY * 0.0002;

    particlesMesh.rotation.y += (mouseX * 0.25 - particlesMesh.rotation.y) * 0.04;
    particlesMesh.rotation.x += (-mouseY * 0.25 - particlesMesh.rotation.x) * 0.04;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================================
// 2. TIMELINE: GSAP ADVANCED CASCADE ANIMATION PIPELINE
// ==========================================================
window.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // 1. Smoothly Reveal Header Menu
        tl.to(".anim-header, header", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            startAt: { y: -50 }
        });

        // 2. Cascade Entrance for Hero Text & Typo Modules
        tl.from(".anim-text", {
            y: 50,
            opacity: 0,
            duration: 1.4,
            stagger: 0.15
        }, "-=0.8"); 

        // 3. Scale Reveal for Hero Profile Ring Photo
        tl.to(".anim-img-1", {
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: "power3.out"
        }, "-=1.2");

        // 4. Stagger Cascading Reveal for Projects Grid Cards
        tl.to(".card-anim", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5");

        // 5. Inbound Fly-in for Contact Form Dashboard
        tl.to(".form-anim", {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power4.out"
        }, "-=0.8");

        // ==========================================================
        // 3. SCROLLTRIGGER: DYNAMIC SCROLL ACTIVATED TRIGGERS
        // ==========================================================
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.utils.toArray(".scroll-anim").forEach(element => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 1.2,
                    ease: "power3.out"
                });
            });
        }
    }
});