// Main site
// Text encoding/decoding effect
const navLinks = document.querySelectorAll('nav a:not(.active)');

navLinks.forEach(link => {
  const originalText = link.dataset.text;
  const span = link.querySelector('span');
  let interval;

  link.addEventListener('mouseenter', () => {
    let iterations = 0;
    const letters = "01!@#$%^&*()_+-=[]{}|;:,.<>?"; // Characters for glitch effect

    clearInterval(interval);
    interval = setInterval(() => {
      span.textContent = originalText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iterations >= originalText.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3; // Speed of decoding
    }, 90); // Glitch speed (lower = faster)
  });

  link.addEventListener('mouseleave', () => {
    clearInterval(interval);
    span.textContent = originalText;
  });
});


// Three.js 



// Set up scene, camera, renderer (as you already have)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Add lights (essential for 3D models)
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

// Load your GLTF model
const loader = new THREE.GLTFLoader(); // Now available globally



// Load model
loader.load(
  'models/sci-fi_computer/scene.gltf',
  (gltf) => {
    const computer = gltf.scene;
    scene.add(computer);
    computer.scale.set(0.5, 0.5, 0.5); // Adjust scale
  },
  undefined,
  (error) => console.error('Error loading model:', error)
);

// Position camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
