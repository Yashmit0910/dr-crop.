from tensorflow.keras.layers import Input, Dense, Concatenate
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import load_model

# Step 1: Load your pre-trained CNN model for feature extraction (MobileNetV2 without the softmax layer)
base_model = load_model("tomato_disease_model.h5")  # Replace with your model path

# Remove the final softmax layer to use as a feature extractor
feature_extractor = Model(inputs=base_model.input, outputs=base_model.layers[-2].output)

# Step 2: Function to extract image features
def extract_image_feature(img_path):
    img = image.load_img(img_path, target_size=(224, 224))  # Resize to match model input
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize image
    features = feature_extractor.predict(img_array)
    return features[0]  # Return the 256-dimensional feature vector

import pandas as pd

df = pd.read_csv(".csv")  # Must contain: image_name, temperature, humidity, disease
all_features = []
all_labels = []

for i, row in df.iterrows():
    img_feat = extract_image_feature(f"images_folder/{row['image_name']}")  # path to your images
    climate_feat = [row['temperature'], row['humidity']]
    combined = np.concatenate([img_feat, climate_feat])
    all_features.append(combined)
    all_labels.append(row['disease'])

# Encode labels
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.utils import to_categorical

le = LabelEncoder()
y_encoded = le.fit_transform(all_labels)
y_categorical = to_categorical(y_encoded)
