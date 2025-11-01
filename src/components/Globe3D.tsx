import { useEffect, useRef } from "react";

const Globe3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Globe parameters
    let rotation = 0;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw globe
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0.3)');
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw globe sphere
      const globeGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      globeGradient.addColorStop(0, '#1e3a8a');
      globeGradient.addColorStop(0.5, '#0c4a6e');
      globeGradient.addColorStop(1, '#020617');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = globeGradient;
      ctx.fill();

      // Draw latitude lines
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.3)';
      ctx.lineWidth = 1;
      for (let lat = -90; lat <= 90; lat += 30) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const radLat = (lat * Math.PI) / 180;
          const radLon = ((lon + rotation) * Math.PI) / 180;
          
          const x = radius * Math.cos(radLat) * Math.sin(radLon);
          const y = radius * Math.sin(radLat);
          const z = radius * Math.cos(radLat) * Math.cos(radLon);
          
          if (z > 0) {
            const screenX = centerX + x;
            const screenY = centerY - y;
            
            if (lon === -180) {
              ctx.moveTo(screenX, screenY);
            } else {
              ctx.lineTo(screenX, screenY);
            }
          }
        }
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const radLat = (lat * Math.PI) / 180;
          const radLon = ((lon + rotation) * Math.PI) / 180;
          
          const x = radius * Math.cos(radLat) * Math.sin(radLon);
          const y = radius * Math.sin(radLat);
          const z = radius * Math.cos(radLat) * Math.cos(radLon);
          
          if (z > 0) {
            const screenX = centerX + x;
            const screenY = centerY - y;
            
            if (lat === -90) {
              ctx.moveTo(screenX, screenY);
            } else {
              ctx.lineTo(screenX, screenY);
            }
          }
        }
        ctx.stroke();
      }

      // Draw data points
      ctx.fillStyle = '#0ea5e9';
      ctx.shadowColor = '#0ea5e9';
      ctx.shadowBlur = 15;
      
      const dataPoints = [
        { lat: 40, lon: -74 },  // New York
        { lat: 51, lon: 0 },     // London
        { lat: 35, lon: 139 },   // Tokyo
        { lat: -33, lon: 151 },  // Sydney
        { lat: -23, lon: -46 },  // São Paulo
        { lat: 19, lon: 72 },    // Mumbai
      ];

      dataPoints.forEach(point => {
        const radLat = (point.lat * Math.PI) / 180;
        const radLon = ((point.lon + rotation) * Math.PI) / 180;
        
        const x = radius * Math.cos(radLat) * Math.sin(radLon);
        const y = radius * Math.sin(radLat);
        const z = radius * Math.cos(radLat) * Math.cos(radLon);
        
        if (z > 0) {
          const screenX = centerX + x;
          const screenY = centerY - y;
          
          ctx.beginPath();
          ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      rotation += 0.2;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default Globe3D;
