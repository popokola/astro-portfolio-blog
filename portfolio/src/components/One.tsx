import { useState, useEffect } from "react";

const One = () => {
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCursorOnIcon, setIsCursorOnIcon] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const updateCursorPosition = (event: MouseEvent) => {
      const svgElement = document.getElementById("Flame");
      if (!svgElement) return;

      const svgRect = svgElement.getBoundingClientRect();

      const offsetX = event.clientX - svgRect.left;
      const offsetY = event.clientY - svgRect.top;

      const percentageX = (offsetX / svgRect.width) * 100;
      const percentageY = (offsetY / svgRect.height) * 100;

      setCursor({ x: percentageX, y: percentageY });
    };

    const svgElement = document.getElementById("Flame");
    if (!svgElement) return;

    const handleMouseEnter = () => {
      setIsCursorOnIcon(true);
    };

    const handleMouseLeave = () => {
      setIsCursorOnIcon(false);
    };


    svgElement.addEventListener("mouseenter", handleMouseEnter);
    svgElement.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", updateCursorPosition);


    return () => {
      svgElement.removeEventListener("mouseenter", handleMouseEnter);
      svgElement.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <svg 
        id="Flame"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-12 h-12 duration-200 transition-all"
    >

    <defs>
        <radialGradient
          id="emeraldGradient"
          gradientUnits="userSpaceOnUse"
          r="35%"
          cx={`${cursor.x}%`}
          cy={`${cursor.y}%`}
        >
          <stop stopColor={isCursorOnIcon ? "#10b981" : "#10b981"} />
          {isDarkMode ? <stop offset={1} stopColor="white" /> : <stop offset={1} stopColor="#404040" /> }
          
        </radialGradient>
    </defs>

    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="url(#emeraldGradient)"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18">
    </path>
    
    </svg>

  );
};

export default One;