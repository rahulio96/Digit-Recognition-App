//import { useState, useEffect } from "react";
import "./App.css";
import DrawingCanvas from "./components/DrawingCanvas";

function App() {

  return (
    <div className="container">
      <div className = "title">Digit Recognition</div>
      <div className = "sub-title">Draw · Submit · Predict</div>

      <div className="content">
        
        <div className= "sub-container"> Draw Here (28x28 Image)
          <DrawingCanvas/>

          <div className="buttons">
            <button className="submit">SUBMIT</button>
            <button className="clear">CLEAR</button>
          </div>

        </div>  
          
        <div className= "sub-container">
          Neural Network Predictions
          <div className = "predict-box"></div>
        </div>

      </div>
      
    </div>
  );

}

export default App;
  
/*
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the received data in the console
        setMessage(data.message);
      })
      .catch(error => console.error(error));

  }, []);

  console.log(message); // Check the value of message in the console

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
  */