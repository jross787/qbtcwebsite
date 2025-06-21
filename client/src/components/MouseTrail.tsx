import { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export function MouseTrail() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let rippleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Create ripple on every 5th mouse movement for better responsiveness
      if (rippleId % 5 === 0) {
        const newRipple: Ripple = {
          id: rippleId++,
          x: e.clientX,
          y: e.clientY,
          size: 0,
          opacity: 0.6,
        };

        setRipples(prev => [...prev.slice(-6), newRipple]);
      } else {
        rippleId++;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animate ripples with smooth expansion
    const interval = setInterval(() => {
      setRipples(prev => 
        prev
          .map(ripple => ({
            ...ripple,
            size: ripple.size + 4,
            opacity: ripple.opacity * 0.92,
          }))
          .filter(ripple => ripple.opacity > 0.01 && ripple.size < 300)
      );
    }, 16);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Background ripple wave effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full transition-all ease-out"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            opacity: ripple.opacity,
            border: `2px solid rgba(255, 153, 0, ${ripple.opacity * 0.4})`,
            background: `radial-gradient(circle, 
              rgba(255, 153, 0, ${ripple.opacity * 0.08}) 0%, 
              rgba(255, 107, 0, ${ripple.opacity * 0.04}) 40%, 
              transparent 80%)`,
            boxShadow: `0 0 ${ripple.size * 0.2}px rgba(255, 153, 0, ${ripple.opacity * 0.3})`,
          }}
        />
      ))}
    </div>
  );
}