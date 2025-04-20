from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import sys
from tensorflow.keras.models import load_model
from PIL import Image
import io

sys.path.append("d:/dr.crops")
import importlib
city_module = importlib.import_module("import requests")
# REMOVE the following line:
# from import requests import (
#     get_weather_by_city,
#     check_disease_risks,
#     check_stress_conditions,
#     get_general_plant_health
# )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model("tomato_disease_model_finetuned.h5")

CLASS_NAMES = [
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]
DISEASE_DETAILS = {
    "Tomato___Bacterial_spot": {
        "name": "Bacterial Spot",
        "symptoms": "Small, water-soaked spots on leaves that enlarge and turn dark brown with yellow halos. Spots may also appear on stems and fruits.",
        "causes": "Caused by Xanthomonas bacteria, which can survive on plant debris and seeds. Spreads through water splashing, tools, and handling.",
        "prevention": "Use disease-free seeds and transplants, practice crop rotation, avoid overhead irrigation, and maintain good air circulation.",
        "treatment": "Apply copper-based fungicides early in the season. Remove and destroy infected plants. There is no cure once plants are infected.",
        "image": "\1af87bdf-0bd0-4146-93e5-cc5f97d98b05___UF.GRC_YLCV_Lab 01968.JPG"
    },
    "Tomato___Early_blight": {
        "name": "Early Blight",
        "symptoms": "Dark, concentric rings forming a 'bull's-eye' pattern on lower leaves. Leaves turn yellow, then brown, and eventually fall off.",
        "causes": "Caused by the fungus Alternaria solani. Favored by warm, humid conditions and prolonged leaf wetness.",
        "prevention": "Practice crop rotation, remove infected plant debris, and avoid overhead watering.",
        "treatment": "Apply fungicides containing chlorothalonil or copper. Remove and destroy affected leaves.",
        "image": "/images/early_blight.jpg"
    },
     "Tomato___Late_blight": {
        "name": "Late Blight",
        "symptoms": "Large, irregularly shaped, water-soaked lesions on leaves and stems that quickly turn brown and dry. White, fuzzy growth may appear under leaves in humid conditions. Fruit may develop brown, firm spots.",
        "causes": "Caused by the oomycete Phytophthora infestans. Spreads rapidly in cool, wet weather and can devastate crops.",
        "prevention": "Use resistant varieties, avoid overhead irrigation, space plants for good air circulation, and remove infected plants promptly.",
        "treatment": "Apply fungicides containing mancozeb or chlorothalonil at the first sign of disease. Destroy infected plants to prevent spread.",
        "image": "/images/late_blight.jpg"
    },
     "Tomato___Leaf_Mold": {
        "name": "Leaf Mold",
        "symptoms": "Yellow spots on upper leaf surfaces with olive-green to grayish-purple mold on the undersides. Leaves may curl, wither, and drop prematurely.",
        "causes": "Caused by the fungus Passalora fulva. Thrives in humid, poorly ventilated environments.",
        "prevention": "Increase air circulation, avoid wetting leaves, use resistant varieties, and remove plant debris.",
        "treatment": "Apply fungicides and remove affected leaves. Reduce humidity in greenhouses.",
        "image": "/images/leaf_mold.jpg"
    },
     "Tomato___Septoria_leaf_spot": {
        "name": "Septoria Leaf Spot",
        "symptoms": "Small, circular spots with dark borders and grayish centers on lower leaves. Spots may merge, causing leaves to yellow and drop.",
        "causes": "Caused by the fungus Septoria lycopersici. Spreads in wet, humid conditions, especially on old plant debris.",
        "prevention": "Remove plant debris, avoid overhead watering, rotate crops, and provide good air circulation.",
        "treatment": "Apply fungicides and remove infected leaves. Avoid working with wet plants.",
        "image": "/images/septoria_leaf_spot.jpg"
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "name": "Spider Mites (Two Spotted Spider Mite)",
        "symptoms": "Yellow stippling on leaves, fine webbing, and leaf drop.",
        "causes": "Infestation by Tetranychus urticae mites.",
        "prevention": "Maintain adequate humidity, avoid plant stress, and use resistant varieties.",
        "treatment": "Use miticides or insecticidal soap. Remove heavily infested leaves.",
        "image": "/images/spider_mites.jpg"
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "name": "Yellow Leaf Curl Virus",
        "symptoms": "Upward curling of leaves, yellowing, stunted growth, and reduced fruit set.",
        "causes": "Transmitted by whiteflies.",
        "prevention": "Control whiteflies, use resistant varieties, and remove infected plants.",
        "treatment": "No cure. Remove and destroy infected plants.",
        "image": "/images/yellow_leaf_curl_virus.jpg"
    },
    "Tomato___Tomato_mosaic_virus": {
        "name": "Tomato Mosaic Virus",
        "symptoms": "Mottled light and dark green patterns on leaves, leaf curling, distortion, and stunted growth. Fruit may be malformed or show yellow spots.",
        "causes": "Caused by Tomato mosaic virus (ToMV), often spread by contaminated tools, hands, or infected seeds.",
        "prevention": "Use virus-free seeds, disinfect tools and hands, and remove infected plants promptly.",
        "treatment": "No cure. Remove and destroy infected plants. Practice strict sanitation.",
        "image": "/images/tomato_mosaic_virus.jpg"
    },
      "Tomato___healthy": {
        "name": "Healthy",
        "symptoms": "No visible symptoms. Leaves are green and firm, fruits are unblemished.",
        "causes": "No disease present.",
        "prevention": "Continue good agricultural practices.",
        "treatment": "No treatment necessary.",
        "image": "/images/healthy.jpg"
    },
}
    

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # Use your model's input size
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

### 2. **Check Your Backend Response**

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    img = preprocess_image(image_bytes)
    preds = model.predict(img)
    print("Model prediction shape:", preds.shape)  # Ensure this is inside the function
    pred_class = CLASS_NAMES[np.argmax(preds)]
    confidence = float(np.max(preds))
    details = DISEASE_DETAILS.get(pred_class)
    if not details:
        # fallback to healthy if not found
        details = DISEASE_DETAILS["Tomato___healthy"]
    return {
        "class": pred_class,
        "confidence": confidence,
        "details": details
    }


@app.post("/city-predict")
async def city_predict(request: Request):
    data = await request.json()
    city_name = data.get("city")
    if not city_name:
        return {"error": "City name is required."}

    # Get weather data
    weather_data, location, country, state = city_module.get_weather_by_city(city_name)
    temp = weather_data["temp"]
    humidity = weather_data["humidity"]

    # Scale environmental data
    env_input = np.array([[temp, humidity]])
    env_input_scaled = scaler.transform(env_input)

    # Use a sample image feature (replace with real image feature if available)
    img_input = image_features[0].reshape(1, -1)

    # Predict using the multi-modal model
    pred = model.predict([img_input, env_input_scaled])
    predicted_class = int(np.argmax(pred, axis=1)[0])
    probabilities = pred[0].tolist()

    # City disease detector's risk analysis
    disease_risks = city_module.check_disease_risks(weather_data)

    return {
        "city": location,
        "country": country,
        "state": state,
        "temperature": temp,
        "humidity": humidity,
        "model_prediction": {
            "class_index": predicted_class,
            "probabilities": probabilities
        },
        "city_disease_risks": disease_risks
    }


@app.post("/city-disease")
@app.post("/api/disease-tracker")
async def disease_tracker(request: Request):
    data = await request.json()
    city = data.get("city")
    if not city:
        return {"error": "City name is required."}
    try:
        weather_data, location, country, state = city_module.get_weather_by_city(city)
        disease_risks = city_module.check_disease_risks(weather_data)
        stress_conditions = city_module.check_stress_conditions(weather_data)
        health_status, health_message = city_module.get_general_plant_health(weather_data["temp"], weather_data["humidity"])

        # Attach full disease details from DISEASES to each risk
        for risk in disease_risks:
            for disease in city_module.DISEASES:
                if risk["disease"].lower() == disease["name"].lower():
                    risk["full_details"] = disease
                    break

        # Attach full stress details from STRESS_CONDITIONS to each stress
        for stress in stress_conditions:
            for cond in city_module.STRESS_CONDITIONS:
                if stress["name"].lower() == cond["name"].lower():
                    stress["full_details"] = cond
                    break

        return {
            "location": location,
            "state": state,
            "country": country,
            "temperature": weather_data["temp"],
            "humidity": weather_data["humidity"],
            "plant_health": {
                "status": health_status,
                "message": health_message
            },
            "stress_conditions": stress_conditions,
            "disease_risks": disease_risks
        }
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/markets")
def get_markets():
    # Return all states, districts, and markets for dropdowns
    return STATE_MARKET_DATA# Add this import:
from agmarknet_api import app as agmarknet_app
from agmarknet_api import STATE_MARKET_DATA
