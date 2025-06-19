import { useEffect, useRef } from "react";
import * as THREE from "three";

export function OrbitingBitcoin() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Check WebGL support
    if (!window.WebGLRenderingContext) {
      return;
    }

    // Basic Three.js setup
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 4;

    // Store references
    sceneRef.current = { renderer, scene, camera };

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffa040, 0.8);
    dirLight.position.set(2, 2, 2);
    scene.add(dirLight);

    // Create Bitcoin symbol geometry (using text geometry as substitute)
    const coinGeometry = new THREE.CircleGeometry(1, 32);
    const coinMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf7931a, 
      transparent: true,
      opacity: 0.9
    });
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    scene.add(coin);

    // Add Bitcoin symbol using shapes
    const symbolGroup = new THREE.Group();
    
    // Create Bitcoin 'B' shape using basic geometry
    const symbolMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    
    // Create simplified Bitcoin symbol
    const symbolGeometry = new THREE.PlaneGeometry(0.8, 1.2);
    const symbolTexture = new THREE.CanvasTexture(createBitcoinSymbol());
    const symbolMesh = new THREE.Mesh(
      symbolGeometry,
      new THREE.MeshStandardMaterial({ 
        map: symbolTexture, 
        transparent: true,
        alphaTest: 0.1
      })
    );
    symbolGroup.add(symbolMesh);
    symbolGroup.position.z = 0.01;
    scene.add(symbolGroup);

    // Orbit ring
    const ringMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf7931a, 
      emissive: 0x000000,
      transparent: true,
      opacity: 0.7
    });
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.06, 16, 100),
      ringMaterial
    );
    ring.rotation.x = Math.PI / 3.5;
    scene.add(ring);

    // Animation variables
    let t = 0;
    let isDown = false;
    let lastX = 0;
    let lastY = 0;

    // Animation loop
    const animate = () => {
      t += 0.01;
      ring.rotation.z += 0.005;
      coin.rotation.y = 0.15 * Math.sin(t);
      symbolGroup.rotation.y = 0.15 * Math.sin(t);

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    // Interaction handlers
    const onPointerDown = (e: PointerEvent) => {
      isDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onPointerUp = () => {
      isDown = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = (e.clientX - lastX) * 0.01;
      const dy = (e.clientY - lastY) * 0.01;
      ring.rotation.y += dx;
      ring.rotation.x += dy;
      coin.rotation.y += dx;
      symbolGroup.rotation.y += dx;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    // Resize handler
    const onResize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    // Event listeners
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('resize', onResize);

    // Initial resize and start animation
    onResize();
    animate();

    // Cleanup
    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="w-64 h-64 md:w-80 md:h-80">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}

// Helper function to create Bitcoin symbol canvas texture
function createBitcoinSymbol(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  
  // Clear canvas
  ctx.clearRect(0, 0, 256, 256);
  
  // Draw Bitcoin symbol
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 200px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('₿', 128, 128);
  
  return canvas;
}