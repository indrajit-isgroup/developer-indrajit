// ==========================================
// 1. THREE.JS 3D BACKGROUND SETUP
// ==========================================
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3500; 

const posArray = new Float32Array(particlesCount * 3);

for(let i=0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 8; 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.008,
    color: '#6633ff', 
    transparent: true,
    opacity: 0.85,
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

    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = -scrollY * 0.0004; 

    particlesMesh.rotation.y += mouseX * 0.25;
    particlesMesh.rotation.x += -mouseY * 0.25;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();


// ==========================================
// 2. GSAP LOADING & TEXT/IMAGE ANIMATION
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Header animation
    tl.to(".anim-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        startAt: { y: -20 }
    });

    // Hero Text animation
    tl.from(".anim-text", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2 
    }, "-=0.6"); 

    // Hero Photo animation (01.png)
    tl.from(".anim-img-1", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)"
    }, "-=1");

    // About Photo animation (321.jpg)
    gsap.from(".anim-img-2", {
        scrollTrigger: {
            trigger: ".anim-img-2",
            start: "top 80%",
        },
        opacity: 0,
        x: 50,
        duration: 1
    });
});