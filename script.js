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
const particlesCount = 4000; // Increased density for premium fidelity

const posArray = new Float32Array(particlesCount * 3);

for(let i=0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10; 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.006,
    color: '#6366f1', // Upgraded to premium indigo hue
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

let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.03;
    particlesMesh.rotation.x = -scrollY * 0.0003; 

    // Smooth physics damping interpolation
    particlesMesh.rotation.y += (mouseX * 0.3 - particlesMesh.rotation.y) * 0.05;
    particlesMesh.rotation.x += (-mouseY * 0.3 - particlesMesh.rotation.x) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();


// ==========================================================
// 2. TIMELINE: GSAP PRODUCTION TIMING PIPELINE
// ==========================================================
window.addEventListener('DOMContentLoaded', () => {
    // Advanced Custom Timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animate Premium Glass Header Top-down reveal
    tl.to(".anim-header", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        startAt: { y: -30 }
    });

    // Cascade animate Typography Layouts
    tl.from(".anim-text", {
        y: 40,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15
    }, "-=0.8"); 

    // Fluid launch for Hero Profile Photo
    tl.from(".anim-img-1", {
        scale: 0.95,
        opacity: 0,
        duration: 1.6,
        ease: "power3.out"
    }, "-=1.2");

    // Dynamic reveal of About image upon scroll activation
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from(".anim-img-2", {
            scrollTrigger: {
                trigger: ".anim-grid",
                start: "top 80%",
            },
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: "power3.out"
        });
    }
});