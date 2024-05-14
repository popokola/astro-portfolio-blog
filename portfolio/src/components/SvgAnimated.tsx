import { useState, useEffect } from "react";

const SvgAnimated = ({ svgContent }: { svgContent: string }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isCursorOnIcon, setIsCursorOnIcon] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (event: any) => {
      const svgElement = document.getElementById("SvgAnimated");
      if (!svgElement) return;

      const svgRect = svgElement.getBoundingClientRect();

      const offsetX = event.clientX - svgRect.left;
      const offsetY = event.clientY - svgRect.top;

      const percentageX = (offsetX / svgRect.width) * 100;
      const percentageY = (offsetY / svgRect.height) * 100;

      setCursor({ x: percentageX, y: percentageY });
    };

    const svgElement = document.getElementById("SvgAnimated");
    if (!svgElement) return;

    const handleMouseEnter = () => {
      setIsCursorOnIcon(true);
    };

    const handleMouseLeave = () => {
      setIsCursorOnIcon(false);
    };

    svgElement.addEventListener("mouseenter", handleMouseEnter);
    svgElement.addEventListener("mouseleave", handleMouseLeave);
    svgElement.addEventListener("mousemove", updateCursorPosition);

    return () => {
      svgElement.removeEventListener("mouseenter", handleMouseEnter);
      svgElement.removeEventListener("mouseleave", handleMouseLeave);
      svgElement.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div className="inline-block">
      <svg
        id="SvgAnimated"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-10 h-10 duration-200 transition-all"
      >
        <defs>
          {/* Define the mask */}
          <mask id="emeraldMask" x="0" y="0" width="100%" height="100%" fill="currentColor">
            <g dangerouslySetInnerHTML={{ __html: svgContent }} />
          </mask>
          {/* Define the gradient */}
          <radialGradient id="emeraldGradient" gradientUnits="userSpaceOnUse" r="35%" cx={`${cursor.x}%`} cy={`${cursor.y}%`}>
            <stop offset="0%" stopColor={isCursorOnIcon ? "#10b981" : "#10b981"} />
            <stop offset="100%" stopColor="#404040" />
          </radialGradient>
        </defs>
        {/* Apply the mask and gradient */}
        <g style={{ fill: `url(#emeraldGradient)` }}>
          <rect x="0" y="0" width="100%" height="100%" mask="url(#emeraldMask)"/>
        </g>
      </svg>
    </div>
  );
};

export default SvgAnimated;
