import "./DrawingCanvas.css";
import { useRef, useEffect, useState } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * 28;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * 28;

    contextRef.current.beginPath();
    contextRef.current.moveTo(scaledOffsetX, scaledOffsetY);
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * 28;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * 28;

    contextRef.current.lineTo(scaledOffsetX, scaledOffsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={28}
        height={28}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}

      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
