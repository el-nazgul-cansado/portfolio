import { useEffect, useRef, useState } from 'react';
import './Magnetic_profile_image.css';

const RADIUS = 180; // Ajustado para ser consistente con el tamaño
const POINTS = 100; // Número de puntos en el círculo

export const Magnetic_profile_image = () => {

  const [pathData, setPathData] = useState('');
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const pointsRef = useRef([]);

  useEffect(() => {
    const rect = containerRef.current.getBoundingClientRect();
    setCenter({ x: rect.width / 2, y: rect.height / 2 });
  }, []);

  useEffect(() => {
    if (center.x === 0 && center.y === 0) return;

    const angleStep = (Math.PI * 2) / POINTS;
    const points = [];

    for (let i = 0; i < POINTS; i++) {
      const angle = i * angleStep;
      const x = center.x + RADIUS * Math.cos(angle);
      const y = center.y + RADIUS * Math.sin(angle);
      points.push({ x, y, originalX: x, originalY: y });
    }

    pointsRef.current = points;
    updatePath(points);
  }, [center]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dx = mouseX - center.x;
      const dy = mouseY - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const isOutside = distance > RADIUS;

      const newPoints = pointsRef.current.map((point) => {
        const { originalX: px, originalY: py } = point;

        if (isOutside) {
          const deltaX = mouseX - px;
          const deltaY = mouseY - py;
          const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const pullStrength = Math.min(30, 1000 / dist);

          return {
            ...point,
            x: px + (deltaX / dist) * pullStrength,
            y: py + (deltaY / dist) * pullStrength,
          };
        } else {
          return { ...point, x: px, y: py };
        }
      });

      updatePath(newPoints);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [center]);

  const updatePath = (points) => {
    const d = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(' ') + ' Z';

    setPathData(d);
  };

  return (
    <div className="circle-container" ref={containerRef}>
      <svg viewBox="0 0 400 400" className="circle-svg">
        <defs>
          <pattern id="imagePattern" patternUnits="userSpaceOnUse" width="400" height="400">
            <image href={`${import.meta.env.BASE_URL}/assets/images/profile/juri_profile.jpg`} x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
        <path d={pathData} fill="url(#imagePattern)" />
      </svg>
    </div>
  );
};
