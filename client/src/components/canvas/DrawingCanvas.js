import "./DrawingCanvas.css";
import "../../App.css";
import { useRef, useEffect, useState } from "react";

const DrawingCanvas = ({updatePrediction}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "white";
    context.lineWidth = 0.5;
    contextRef.current = context;

    context.fillStyle = "black"; // Set canvas background color
    context.fillRect(0, 0, canvas.width, canvas.height); // Draw background
  }, []);

  // Start Drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * 28;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * 28;

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

    const scaledOffsetX = (offsetX / canvasRef.current.clientWidth) * 28;
    const scaledOffsetY = (offsetY / canvasRef.current.clientHeight) * 28;

    contextRef.current.lineTo(scaledOffsetX, scaledOffsetY);
    contextRef.current.stroke();
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
    <div className="canvas-container" id="canvas-image">
      <canvas
        ref={canvasRef}
        width={28}
        height={28}
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