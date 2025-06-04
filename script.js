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
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);

let targetZoom = 1;
let scrollProgress = 0;

const renderer = new THREE.WebGLRenderer({ 
  alpha: true,
  antialias: true,
  premultipliedAlpha: false
});
renderer.setClearColor(0x000000, 0);  // black color, 0 opacity = transparent
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(0, 1, 4);
scene.add(directionalLight);

//* Loading System *//
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');

// Loading manager
const loadingManager = new THREE.LoadingManager(
  () => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => loadingScreen.remove(), 1000);
  },
  (url, loaded, total) => {
    const percent = (loaded / total) * 100;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${Math.round(percent)}%`;
  }
);

// Initialize loader with loading manager
const loader = new THREE.GLTFLoader(loadingManager);

// Draco loader setup
try {
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);
} catch (e) {
  console.log('DRACOLoader not available, loading uncompressed model');
}

// Shader material for the computer screen
const screenMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    tex: {
      value: new THREE.TextureLoader().load(
        'models/sci-fi_computer/textures/screen_emissive.png'
      )
    },
    intensity: { value: 0.03 }
  },
  vertexShader: ` 
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform sampler2D tex;
    varying vec2 vUv;

    // Simple pseudo-random function
    float rand(vec2 co) {
      return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      // Subtle flicker
      float flicker = 0.98 + 0.02 * sin(time * 15.0);

      // Vertical moving scanlines
      float scanline = sin((vUv.y + time * 0.1) * 100.0) * 0.02;

      // Barrel distortion (CRT curve)
      vec2 uv = vUv - 0.5;
      uv += uv * dot(uv, uv) * 0.1;
      uv += 0.5;

      // Texture lookup
      vec4 base = texture2D(tex, uv);

      // Random noise
      float noise = rand(vUv + time) * 0.2;

      // Final color with flicker, scanlines, noise
      vec3 boosted = pow(base.rgb, vec3(1.2)); // gamma boost
      vec3 color = boosted * flicker + vec3(scanline) + vec3(noise);

      gl_FragColor = vec4(color, 1.0);
    }
  `
});

// Load 3D model with progress tracking
loader.load(
  'models/sci-fi_computer/scene.gltf',
  (gltf) => {
    const computer = gltf.scene;
    scene.add(computer);

    const bbox = new THREE.Box3().setFromObject(computer);
    const center = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());

    computer.position.x -= center.x;
    computer.position.y -= center.y-0.55;
    computer.position.z -= center.z-1.39;

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.0 / maxDim;
    computer.scale.set(scale, scale, scale);

    camera.position.set(0, 0, 0.01); // Close-up after load
    camera.lookAt(0, 0, 0);

    

    // Position camera based on model size

    computer.traverse((child) => {
      if (child.isMesh && child.name.toLowerCase().includes('screen')) {
        child.material = screenMaterial;
      }
    });
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
    progressText.textContent = 'Error! See console';
  }
);

// Post-processing setup
const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  stencilBuffer: false,
  alpha: true
});
const composer = new THREE.EffectComposer(renderer, renderTarget);
const renderPass = new THREE.RenderPass(scene, camera);
renderPass.clearColor = new THREE.Color(0x000000);
renderPass.clearAlpha = 0;
composer.addPass(renderPass);

const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.5,  // strength
  0.05,  // radius
  0.6  // threshold
);


composer.addPass(bloomPass);

// Camera position
camera.position.z = 5;

// Animate loop
function animate() {
  requestAnimationFrame(animate);

  renderer.clear();
  screenMaterial.uniforms.time.value = performance.now() / 1000;

  const zoomOutZ = 1.8;
  const zoom = 1 + (zoomOutZ - 1) * scrollProgress;
  camera.position.z = zoom;
  // Render with post-processing
  renderer.render(scene, camera);
}
animate();

// Responsive resizing
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  
  // For post-processing
  if(composer) {
    composer.setSize(width, height);
  }
});

// Scroll listener
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = window.innerHeight;
  scrollProgress = Math.min(scrollTop / maxScroll, 1); // Clamp 0 to 1
});
