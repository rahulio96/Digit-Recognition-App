import canvasCSS from "./DrawingCanvas.module.css";
import "../../App.css";
import { useRef, useEffect, useState } from "react";

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

  // Start Drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * width;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * height;

    setLastPos({ x: scaledOffsetX, y: scaledOffsetY });

    contextRef.current.beginPath();
    contextRef.current.moveTo(scaledOffsetX, scaledOffsetY);
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  // Draw
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * width;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * height;

    // Draw line from last position to current position
    contextRef.current.beginPath();
    contextRef.current.moveTo(lastPos.x, lastPos.y);
    contextRef.current.lineTo(scaledOffsetX, scaledOffsetY);
    contextRef.current.stroke();

    setLastPos({ x: scaledOffsetX, y: scaledOffsetY });

    nativeEvent.preventDefault();
  };

  // Stop drawing
  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  // Clear the canvas
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
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:3000",
      },
      body: JSON.stringify({image: dataURL}),
    })

    // Get the prediction from image from Flask
    const responseData = await response.json()
    updatePrediction(parseInt(responseData))

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
        onMouseLeave={stopDrawing}>

        </canvas>

    <div className="buttons">
        <button className="submit" onClick={handleSubmit}>SUBMIT</button>
        <button className="clear" onClick={clear}>CLEAR</button>
    </div>

    </div>
  );
};

export default DrawingCanvas;
