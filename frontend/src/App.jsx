import { useState } from "react";
import "./App.css";
import DrawingCanvas from "./components/canvas/DrawingCanvas";
import Table from "./components/table/PredictTable";

function App() {

  const [prediction, setPrediction] = useState(-1);

  const updatePrediction = (newPredict) => {
    setPrediction(newPredict)
  }

  return (
    <div className="container">
      <div className = "title">Digit Recognition</div>
      <div className = "sub-title">Draw · Submit · Predict</div>

      <div className="content">
        
        <div className= "sub-container draw"> Draw Digit Here
          <DrawingCanvas updatePrediction={updatePrediction}/>
        </div>  
          
        <div className= "sub-container table">
          Neural Network Predictions
          <Table prediction={prediction}/>
        </div>

      </div>
      
    </div>
  );

}

export default App;