//* Main site - Text encoding/decoding effect *//
const navLinks = document.querySelectorAll('nav a:not(.active)');

navLinks.forEach(link => {
  const originalText = link.dataset.text;
  const span = link.querySelector('span');
  let interval;

  link.addEventListener('mouseenter', () => {
    let iterations = 0;
    const letters = "01!@#$%^&*()_+-=[]{}|;:,.<>?";

    clearInterval(interval);
    interval = setInterval(() => {
      span.textContent = originalText
        .split("")
        .map((letter, index) => {
          if (index < iterations) return originalText[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 90);
  });

  link.addEventListener('mouseleave', () => {
    clearInterval(interval);
    span.textContent = originalText;
  });
});

//* Three.js Setup *//
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Lights
const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);
scene.add(new THREE.DirectionalLightHelper(directionalLight, 5));

//* Loading System *//
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');

// Create loading manager FIRST
const loadingManager = new THREE.LoadingManager(
  () => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => loadingScreen.remove(), 100000);
  },
  (url, loaded, total) => {
    const percent = (loaded / total) * 100;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${Math.round(percent)}%`;
  }
);

// Initialize loader WITH the manager
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

const loader = new THREE.GLTFLoader(loadingManager);
loader.setDRACOLoader(dracoLoader);

// Load model ONCE with progress tracking
loader.load(
  'models/sci-fi_computer/scene.gltf',
  (gltf) => {
    const computer = gltf.scene;
    computer.scale.set(0.5, 0.5, 0.5);
    scene.add(computer);
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
    progressText.textContent = 'Error! See console';
  }
);

// Camera and animation
camera.position.z = 5;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();