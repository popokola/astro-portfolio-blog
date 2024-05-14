import { useState, useEffect } from "react";

const Flame = () => {
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCursorOnIcon, setIsCursorOnIcon] = useState<boolean>(false);

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
      className="w-96 h-96 duration-200 transition-all"
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
          <stop offset={1} stopColor="#404040" />
        </radialGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-neutral-950/50"
        stroke="url(#emeraldGradient)"
        d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-neutral-800/50"
        stroke="url(#emeraldGradient)"
        d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
      />
    </svg>
  );
};

export default Flame;
