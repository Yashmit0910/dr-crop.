import React from "react";

// Disease details mapping
type DiseaseDetail = {
  name: string;
  symptoms: string;
  causes: string;
  prevention: string;
  treatment: string;
  image?: string;
};

const DISEASE_DETAILS: Record<string, DiseaseDetail> = {
  "Tomato___Bacterial_spot": {
    name: "Bacterial Spot",
    symptoms: "Small, water-soaked spots on leaves that enlarge and turn dark brown with yellow halos. Spots may also appear on stems and fruits.",
    causes: "Caused by Xanthomonas bacteria, which can survive on plant debris and seeds. Spreads through water splashing, tools, and handling.",
    prevention: "Use disease-free seeds and transplants, practice crop rotation, avoid overhead irrigation, and maintain good air circulation.",
    treatment: "Apply copper-based fungicides early in the season. Remove and destroy infected plants. There is no cure once plants are infected.",
    image: "/images/bacterial_spot.jpg"
  },
  "Tomato___Early_blight": {
    name: "Early Blight",
    symptoms: "Dark, concentric rings forming a 'bull's-eye' pattern on lower leaves. Leaves turn yellow, then brown, and eventually fall off.",
    causes: "Caused by the fungus Alternaria solani. Favored by warm, humid conditions and prolonged leaf wetness.",
    prevention: "Practice crop rotation, remove infected plant debris, and avoid overhead watering.",
    treatment: "Apply fungicides containing chlorothalonil or copper. Remove and destroy affected leaves.",
    image: "/images/early_blight.jpg"
  },
  "Tomato___Late_blight": {
    name: "Late Blight",
    symptoms: "Large, irregularly shaped, water-soaked lesions on leaves and stems that quickly turn brown and dry. White mold may appear under leaves.",
    causes: "Caused by the oomycete Phytophthora infestans. Spreads rapidly in cool, wet weather.",
    prevention: "Use resistant varieties, avoid overhead irrigation, and remove infected plants promptly.",
    treatment: "Apply fungicides containing mancozeb or chlorothalonil. Destroy infected plants.",
    image: "/images/late_blight.jpg"
  },
  "Tomato___Leaf_Mold": {
    name: "Leaf Mold",
    symptoms: "Yellow spots on upper leaf surfaces with olive-green to grayish-purple mold on the undersides.",
    causes: "Caused by the fungus Passalora fulva. Thrives in humid, poorly ventilated environments.",
    prevention: "Increase air circulation, avoid wetting leaves, and use resistant varieties.",
    treatment: "Apply fungicides and remove affected leaves.",
    image: "/images/leaf_mold.jpg"
  },
  "Tomato___Septoria_leaf_spot": {
    name: "Septoria Leaf Spot",
    symptoms: "Small, circular spots with dark borders and grayish centers on lower leaves.",
    causes: "Caused by the fungus Septoria lycopersici. Spreads in wet, humid conditions.",
    prevention: "Remove plant debris, avoid overhead watering, and rotate crops.",
    treatment: "Apply fungicides and remove infected leaves.",
    image: "/images/septoria_leaf_spot.jpg"
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    name: "Spider Mites (Two Spotted Spider Mite)",
    symptoms: "Yellow stippling on leaves, fine webbing, and leaf drop.",
    causes: "Infestation by Tetranychus urticae mites.",
    prevention: "Maintain adequate humidity, avoid plant stress, and use resistant varieties.",
    treatment: "Use miticides or insecticidal soap. Remove heavily infested leaves.",
    image: "/images/spider_mites.jpg"
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    name: "Yellow Leaf Curl Virus",
    symptoms: "Upward curling of leaves, yellowing, stunted growth, and reduced fruit set.",
    causes: "Transmitted by whiteflies.",
    prevention: "Control whiteflies, use resistant varieties, and remove infected plants.",
    treatment: "No cure. Remove and destroy infected plants.",
    image: "/images/yellow_leaf_curl_virus.jpg"
  },
  "Tomato___Tomato_mosaic_virus": {
    name: "Mosaic Virus",
    symptoms: "Mottled light and dark green patterns on leaves, leaf curling, and stunted growth.",
    causes: "Caused by various mosaic viruses, often spread by insects or contaminated tools.",
    prevention: "Control insect vectors, use virus-free seeds, and disinfect tools.",
    treatment: "No cure. Remove and destroy infected plants.",
    image: "/images/mosaic_virus.jpg"
  },
  "Tomato___healthy": {
    name: "Healthy",
    symptoms: "No symptoms of disease or pest damage. Leaves are vibrant green without spots, yellowing, or abnormal growth patterns.",
    causes: "N/A - Plant is healthy",
    prevention: "Continue good gardening practices: proper watering, fertilization, and monitoring for early signs of problems.",
    treatment: "No treatment needed. Maintain current care practices.",
    image: "/images/healthy.jpg"
  }
};

export default function ResultDetails({ disease }: { disease: string }) {
  // Use the disease key directly
  const details = DISEASE_DETAILS[disease] || DISEASE_DETAILS["Tomato___healthy"];

  return (
    <div>
      <img src={details.image} alt={details.name} />
      <h3>Symptoms</h3>
      <p>{details.symptoms}</p>
      <h3>Causes</h3>
      <p>{details.causes}</p>
      <h3>Prevention</h3>
      <p>{details.prevention}</p>
      <h3>Treatment</h3>
      <p>{details.treatment}</p>
    </div>
  );
}
