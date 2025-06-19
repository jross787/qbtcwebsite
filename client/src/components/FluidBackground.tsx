import { useEffect, useRef } from 'react';

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();

    // Load external scripts dynamically
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initFluid = async () => {
      try {
        // Load required libraries
        await loadScript('https://cdn.jsdelivr.net/npm/webgl-fluid@0.0.4/dist/webgl-fluid.js');
        await loadScript('https://cdn.jsdelivr.net/npm/pixi.js@7/dist/pixi.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/pixi-filters/dist/pixi-filters.js');

        // Initialize fluid simulation
        const sim = (window as any).WebGLFluid.init({
          canvas: canvas,
          DENSITY_DISSIPATION: 0.97,
          VELOCITY_DISSIPATION: 0.98,
          SPLAT_RADIUS: 0.003,
          CURL: 15
        });

        // Handle pointer movement
        const splat = (e: PointerEvent) => {
          const dx = (e.movementX || 0) * 3;
          const dy = (e.movementY || 0) * 3;
          // Use orange color for the fluid
          sim.splat(e.clientX, e.clientY, dx, dy, [1, 0.6, 0]);
        };

        const handlePointerMove = (e: PointerEvent) => splat(e);
        const handlePointerDown = (e: PointerEvent) => splat(e);

        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerdown', handlePointerDown);

        // Handle resize
        const handleResize = () => {
          updateSize();
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
          container.removeEventListener('pointermove', handlePointerMove);
          container.removeEventListener('pointerdown', handlePointerDown);
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.warn('Fluid simulation failed to load:', error);
      }
    };

    initFluid();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-30">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          mixBlendMode: 'screen',
          filter: 'contrast(1.2) brightness(0.8)'
        }}
      />
    </div>
  );
}