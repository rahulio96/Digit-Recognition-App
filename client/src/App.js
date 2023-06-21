//import { useState, useEffect } from "react";
import "./App.css";

function App() {

  return (
    <div className="container">
      <div className = "title">Digit Recognition</div>
      <div className = "sub-title">Draw · Submit · Predict</div>

      <div className = "box-container">
        <div className = "draw-box">Draw Here</div>
        <div className = "space"></div>
        <div className = "draw-box">Predictions Here</div>
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