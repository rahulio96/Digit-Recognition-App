<p align="center">
   <img src="./readme-assets/banner.png"/>
</p>

# Digit Recognition Web Application
### Click here to try it out yourself: [Deployed Project Link](https://drawdigits.netlify.app/)

React.js (frontend) and Flask (backend) web application that incorporates a neural network to identify user-drawn digits.

I am incorporating the trained PyTorch neural network model from my [MNIST Neural Network](https://github.com/rahulio96/MNIST-Neural-Network) project for identification as a part of the Flask backend.

## Description

- The user draws the digit and hits submit, which sends the image's URL to the Flask backend using a POST request
- The Flask server then preprocesses the image and converts it into a tensor
- Afterward, the tensor is given to the pre-trained neural network model for identification, which results in a predicted digit
- The digit is then sent back to the React.js frontend where it will be displayed on the table
- The Flask API backend is hosted on an AWS EC2 Instance and the React.js frontend is hosted on Netlify
   - The AWS server uses Cloudfront to redirect HTTPS requests to the HTTP Flask server, since requests from Netlify are HTTPS

## Demo

![Demo](./readme-assets/demo.gif)
