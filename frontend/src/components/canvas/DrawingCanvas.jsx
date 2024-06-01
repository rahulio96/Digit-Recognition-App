import canvasCSS from "./DrawingCanvas.module.css";
import "../../App.css";
import { useRef, useEffect, useState } from "react";

const URL = import.meta.env.VITE_SERVER;

const DrawingCanvas = ({updatePrediction}) => {
  const width = 300;
  const height = 300;

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 20;
    contextRef.current = context;

    context.fillStyle = "black"; // Set canvas background color
    context.fillRect(0, 0, canvas.width, canvas.height); // Draw background
  }, []);

  // Get position based on if user is using a touch screen or mouse
  const getEventPosition = (e) => {
    if (e.nativeEvent instanceof MouseEvent) {
      return { offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY };

    } else if (e.nativeEvent instanceof TouchEvent) {
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.nativeEvent.touches[0];
      
      // Get coordinates relative to canvas
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }

    return { offsetX: 0, offsetY: 0 };
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = getEventPosition(e);

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * width;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * height;

    setLastPos({ x: scaledOffsetX, y: scaledOffsetY });

    contextRef.current.beginPath();
    contextRef.current.moveTo(scaledOffsetX, scaledOffsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = getEventPosition(e);

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * width;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * height;

    // Draw line from last position to current position
    contextRef.current.beginPath();
    contextRef.current.moveTo(lastPos.x, lastPos.y);
    contextRef.current.lineTo(scaledOffsetX, scaledOffsetY);
    contextRef.current.stroke();

    setLastPos({ x: scaledOffsetX, y: scaledOffsetY });
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black"; // Set canvas background color
    context.fillRect(0, 0, canvas.width, canvas.height); // Draw background

    // Set prediction at -1 when cleared
    updatePrediction(-1)
  };

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");

    // Send the image to Flask
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({image: dataURL}),
    })

    // Get the prediction from image from Flask
    const responseData = await response.json();
    updatePrediction(parseInt(responseData));
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  };

  const handleGitHub = () => {
    window.open('https://github.com/rahulio96/Digit-Recognition-App', '_blank');
  };

  return (
    <div className={canvasCSS.container} id="canvas-image">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}

        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

    <div className={canvasCSS.buttons}>
        <button className={`${canvasCSS.button} + ${canvasCSS.submit}`} onClick={handleSubmit}>SUBMIT</button>
        <button className={`${canvasCSS.button} + ${canvasCSS.clear}`} onClick={clear}>CLEAR</button>
        <button className={`${canvasCSS.button} + ${canvasCSS.github}`} onClick={handleGitHub}>GITHUB</button>
    </div>

    </div>
  );
};

export default DrawingCanvas;
