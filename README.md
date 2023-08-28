![Screenshot 2023-08-28 093412](https://github.com/rahulio96/Digit-Recognition-App/assets/122141535/87494435-ca34-4a49-b931-08851044020f)

# Digit Recognition Web Application
React.js and Flask web application that incorporates a neural network to identify user-drawn digits.

I'm incorporating parts of my last project: [MNIST Neural Network](https://github.com/rahulio96/MNIST-Neural-Network) for identification.

## Description

- The user draws the digit and hits submit, which sends the image's URL to Flask. 
- The Flask server then processes the image and converts it into a vector. 
- Afterward, the vector is given to the neural network for identification, which results in a predicted digit.
- The digit is then sent back to React where it will be displayed on the table.

## Demo

![Demo](https://github.com/rahulio96/Digit-Recognition-App/assets/122141535/634edba7-37a9-4e94-b7be-e9b3d90a842b)
