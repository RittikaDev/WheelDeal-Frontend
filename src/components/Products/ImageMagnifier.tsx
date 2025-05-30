import { useState } from "react";

interface IProps {
  src: string;
  className: string;
  width: number;
  height: number;
  alt: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
  onClick?: () => void; // Add the onClick prop
}

const ImageMagnifier: React.FC<IProps> = ({
  src,
  className,
  width,
  height,
  alt,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 3,
  onClick, // Destructure the onClick prop
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const mouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    el.style.cursor = "none";

    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const mouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setXY([x, y]);
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        className={className}
        width={width}
        height={height}
        alt={alt}
        onMouseEnter={(e) => mouseEnter(e)}
        onMouseLeave={(e) => mouseLeave(e)}
        onMouseMove={(e) => mouseMove(e)}
        onClick={onClick} // Attach the onClick handler
      />
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          opacity: "1",
          border: "1px solid lightgrey",
          backgroundColor: "white",
          borderRadius: "5px",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      />
    </div>
  );
};

export default ImageMagnifier;
