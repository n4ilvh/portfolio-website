// Main site
document.querySelectorAll('nav a:not(.logo)').forEach(link => {
  link.addEventListener('mousemove', (e) => {
    const span = link.querySelector('span');
    const { left, width } = span.getBoundingClientRect();
    const posX = e.clientX - left;
    const percent = posX / width;
    
    span.style.setProperty('--cursor-pos', `${percent * 100}%`);
    span.style.setProperty('--underline-width', `${(1 - Math.abs(percent - 0.5) * 2) * 100}%`);
  });
  
  link.addEventListener('mouseleave', () => {
    const span = link.querySelector('span');
    span.style.setProperty('--cursor-pos', '0%');
    span.style.setProperty('--underline-width', '0%');
  });
});


// Three.js 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const container = document.getElementById('three-container');

const renderer = new THREE.WebGLRenderer({
  alpha: true, // Enable transparency
  antialias: true
});
renderer.setClearColor(0x000000, 0); // Transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2; // Reduced from 5

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();