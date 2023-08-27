# .\venv\Scripts\activate <-- activate virtual environment
# python server.py <-- activate server

from flask import Flask, jsonify, request
from flask_cors import CORS
from functions import *
import numpy as np
import pandas as pd
from PIL import Image
import base64
import io

app = Flask(__name__)
CORS(app)

@app.route('/a', methods=['GET', 'POST'])
def receive_image():
    if (request.method == 'POST'):
        data = request.get_json()

        data = data.get('image')

        # Decode base64 image data
        image_data = base64.b64decode(data.split(',')[1])
        
        image = Image.open(io.BytesIO(image_data))

        # Greyscale image
        image = image.convert("L")

        # Convert the image to a NumPy array
        image_array = np.array(image)

        # Flatten the image array to a 1D array
        flattened_array = image_array.reshape(-1)  # shape: (784,)

        # Normalize pixel values to [0, 1]
        normalized_array = flattened_array / 255

        #new_img = image_array.reshape((image_array.shape[0]*image_array.shape[1]), 1)
        arr = normalized_array.reshape(1, -1).T

        # Convert the data to numpy arrays
        w1 = np.array(pd.read_csv('./weights-biases/trained_weights/w1.csv'))
        w2 = np.array(pd.read_csv('./weights-biases/trained_weights/w2.csv'))
        b1 = np.array(pd.read_csv('./weights-biases/trained_biases/b1.csv'))
        b2 = np.array(pd.read_csv('./weights-biases/trained_biases/b2.csv'))

        # Test neural network
        x_test = arr

        # Perform forward propagation on the test data
        weight_sum1, weight_sum2, active_output1, active_output2 = forward_propagation(w1, w2, b1, b2, x_test)

        # Make predictions
        predictions = np.argmax(active_output2)  # Get the index of the maximum probability for each test sample

        # Print the predictions
        print( np.argmax(active_output2, axis=0) )
        return jsonify({'message': str(predictions)})

    return jsonify({'message': 'POST request not given'})
    
if __name__ == "__main__":
    app.run(host="localhost", debug=True)
