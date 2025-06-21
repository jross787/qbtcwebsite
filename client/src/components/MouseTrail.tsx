import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export function MouseTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Create new particle
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 0.8,
        size: Math.random() * 8 + 4,
      };

      setParticles(prev => [...prev.slice(-20), newParticle]);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.03,
            size: particle.size * 0.98,
          }))
          .filter(particle => particle.opacity > 0.1)
      );
    }, 16);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor glow */}
      <div
        className="absolute w-6 h-6 rounded-full transition-all duration-100 ease-out"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
          background: 'radial-gradient(circle, rgba(255, 153, 0, 0.3) 0%, rgba(255, 153, 0, 0.1) 50%, transparent 100%)',
          transform: 'scale(1)',
        }}
      />
      
      {/* Particle trail */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            background: `radial-gradient(circle, rgba(255, 153, 0, ${particle.opacity * 0.6}) 0%, rgba(255, 107, 0, ${particle.opacity * 0.3}) 60%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />
      ))}
      
      {/* Quantum rings effect */}
      <div
        className="absolute transition-all duration-200 ease-out"
        style={{
          left: mousePos.x - 20,
          top: mousePos.y - 20,
          width: 40,
          height: 40,
        }}
      >
        <div className="w-full h-full rounded-full border border-orange-400/20 animate-ping" />
        <div 
          className="absolute inset-2 rounded-full border border-orange-300/30"
          style={{ animationDelay: '0.2s' }}
        />
      </div>
    </div>
  );
}