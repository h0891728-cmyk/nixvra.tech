import React, { useEffect, useRef } from 'react';

const NixvraLogo: React.FC<{ className?: string, animated?: boolean, iconOnly?: boolean }> = ({ className = '', animated = true, iconOnly = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animated) {
       // Just statically render it.
       const svg = svgRef.current;
       if (svg) {
         const paths = svg.querySelectorAll('path');
         paths.forEach((p) => {
             p.style.strokeDasharray = 'none';
             p.style.filter = 'none';
         });
       }
       return;
    }

    let active = true;

    const animateLogo = () => {
      if (!active) return;
      
      const svg = svgRef.current;
      const container = containerRef.current;
      if (!svg || !container) return;

      const fullPathOrder = [
        { id: 'path1', name: 'Green Symbol', duration: 900, originalFill: 'url(#paint0_linear_56_274)', originalWidth: '2.5', strokeColor: '#00B077' },
        { id: 'path2', name: 'Gray Accent', duration: 800, originalFill: '#9ca3af', originalWidth: '2.5', strokeColor: '#9ca3af' },
        { id: 'path3', name: 'Dot', duration: 600, originalFill: '#111111', originalWidth: '2.5', strokeColor: '#111111' },
        { id: 'path4', name: 'Bar', duration: 700, originalFill: '#111111', originalWidth: '2.5', strokeColor: '#111111' },
        { id: 'path5', name: 'X shape', duration: 850, originalFill: '#111111', originalWidth: '2.5', strokeColor: '#111111' },
        { id: 'path6', name: 'A shape', duration: 800, originalFill: '#111111', originalWidth: '2.5', strokeColor: '#111111' },
        { id: 'path7', name: 'First I', duration: 650, originalFill: '#111111', originalWidth: '2.5', strokeColor: '#111111' },
        { id: 'path8', name: 'Second I', duration: 750, originalFill: '#111111', originalWidth: '2.5', strokeColor: '#111111' }
      ];
      
      const pathOrder = iconOnly ? fullPathOrder.slice(0, 3) : fullPathOrder;

      // Reset setup
      pathOrder.forEach((item) => {
        const path = svg.querySelector(`#${item.id}`) as SVGPathElement;
        if (!path) return;
        
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', item.strokeColor);
        path.setAttribute('stroke-width', '9');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.filter = 'none';
        
        // Remove existing animations
        const activeAnimations = path.getAnimations();
        activeAnimations.forEach(anim => anim.cancel());
      });

      container.style.animation = 'none';
      void container.offsetWidth; // trigger reflow

      let delay = 0;
      
      pathOrder.forEach((item, index) => {
        const path = svg.querySelector(`#${item.id}`) as SVGPathElement;
        if (!path) return;
        
        const length = path.getTotalLength();

        setTimeout(() => {
          if (!active) return;
          
          const animation = path.animate([
            { strokeDashoffset: length },
            { strokeDashoffset: 0 }
          ], {
            duration: item.duration,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            fill: 'forwards'
          });
          
          animation.onfinish = () => {
             if (!active) return;
             path.setAttribute('fill', item.originalFill);
             path.setAttribute('stroke-width', item.originalWidth);
             
             if (item.id === 'path1') {
                path.style.filter = 'brightness(1.15)';
                setTimeout(() => {
                    if (active) path.style.filter = 'brightness(1)';
                }, 300);
             }
             
             // Check if it's the last path
             if (index === pathOrder.length - 1) {
                 setTimeout(() => {
                     if (!active) return;
                     container.style.animation = 'nixvraFinalPop 800ms cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
                     
                     const greenPath = svg.querySelector('#path1') as SVGPathElement;
                     if (greenPath) {
                         let shineCount = 0;
                         const shineInterval = setInterval(() => {
                             if (!active || shineCount >= 3) {
                                 clearInterval(shineInterval);
                                 return;
                             }
                             greenPath.style.filter = 'brightness(1.3) saturate(1.2)';
                             setTimeout(() => {
                                 if (active) greenPath.style.filter = 'none';
                             }, 180);
                             shineCount++;
                         }, 1400);

                         // Loop entire SVG again after some time
                         setTimeout(() => {
                             if(active) animateLogo();
                         }, 6000);
                     }
                 }, 300);
             }
          };
        }, delay);
        
        delay += (index < 3 ? 220 : 180);
      });
    };

    animateLogo();

    return () => {
      active = false;
    };
  }, [animated]);

  // Removed drop-shadow glow since it's light mode now
  return (
    <div className={`transition-all duration-300 w-full ${animated && !iconOnly ? 'hover:scale-105 hover:rotate-1' : ''} ${className}`} ref={containerRef}>
      <svg 
        ref={svgRef}
        className="w-full h-auto"
        viewBox={iconOnly ? "0 0 500 300" : "0 0 1652 276"} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path id="path1" d="M206.11 264.418L145.404 102.105C141.634 92.0128 127.314 92.0128 123.544 102.105L60.0201 271.997H0L93.8766 30.2028C99.5892 15.5405 113.68 5.86719 129.409 5.86719H139.539C155.268 5.86719 169.397 15.5405 175.071 30.2028L268.948 271.959H217.002C212.127 271.959 207.785 268.95 206.072 264.38L206.11 264.418Z" fill="url(#paint0_linear_56_274)"/>
        <path id="path2" d="M244.954 9.67449L309.125 181.28C311.943 188.859 322.645 188.859 325.501 181.28L391.729 4H451.749L357.453 246.861C352.007 260.875 338.526 270.13 323.482 270.13H311.029C295.986 270.13 282.504 260.914 277.058 246.861L182.801 4H236.766C240.422 4 243.659 6.24695 244.954 9.67449Z" fill="#9ca3af"/>
        <path id="path3" d="M32 28C32 13.5327 42.8369 4 56 4C69.1631 4 80 13.5327 80 28C80 42.4673 69.1631 52 56 52C42.8369 52 32 41.8505 32 28Z" fill="#111111"/>
        {!iconOnly && (
          <>
            <path id="path4" d="M472.266 3.625H534.735V272.001H472.266V3.625Z" fill="#111111"/>
            <path id="path5" d="M788.688 272L719.399 179.197L649.619 272H579.84L684.999 136.006L584.348 4H654.618L720.869 91.8417L787.12 4H855.332L754.191 134.936L859.84 271.903H788.59L788.688 272Z" fill="#111111"/>
            <path id="path6" d="M1143.84 4L1028.39 272H963.288L847.84 4H913.433L997.111 202.738L1083.33 4H1143.84Z" fill="#111111"/>
            <path id="path7" d="M1335.84 0V59.9454C1330.26 58.9691 1325.77 58.481 1321.17 58.481C1273.24 58.481 1242.92 86.6963 1242.92 141.565V272H1179.84V3.02656H1239.89V42.2742C1258.08 14.0589 1290.85 0 1335.74 0H1335.84Z" fill="#111111"/>
            <path id="path8" d="M1651.84 3.03189V272.479H1591.28V237.661C1569.88 263.383 1538.32 276 1501.23 276C1421.83 276 1363.84 221.524 1363.84 137.707C1363.84 53.8894 1421.83 0 1501.23 0C1535.85 0 1566.33 11.6386 1588.22 35.7959V3.03189H1651.84ZM1589.21 137.707C1589.21 86.2622 1554.59 53.4004 1508.33 53.4004C1462.08 53.4004 1427.95 86.1644 1427.95 137.707C1427.95 189.249 1462.57 222.013 1508.33 222.013C1554.1 222.013 1589.21 189.249 1589.21 137.707Z" fill="#111111"/>
          </>
        )}
        <defs>
          <linearGradient id="paint0_linear_56_274" x1="89.497" y1="4.00019" x2="249.449" y2="293.437" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B077"/>
            <stop offset="1" stopColor="#008E60"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default NixvraLogo;
