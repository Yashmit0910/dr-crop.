"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const DISEASES = [
  {
    id: "bacterial-spot",
    name: "Bacterial Spot",
    symptoms:
      "Small, water-soaked spots on leaves that enlarge and turn dark brown with yellow halos. Spots may also appear on stems and fruits.",
    causes:
      "Caused by Xanthomonas bacteria, which can survive on plant debris and seeds. Spreads through water splashing, tools, and handling.",
    prevention:
      "Use disease-free seeds and transplants, practice crop rotation, avoid overhead irrigation, and maintain good air circulation.",
    treatment:
      "Apply copper-based fungicides early in the season. Remove and destroy infected plants. There is no cure once plants are infected.",
    image: "/0b13b997-9957-4029-b2a4-ef4a046eb088___UF.GRC_BS_Lab Leaf 0595.JPG",
  },
  {
    id: "early-blight",
    name: "Early Blight",
    symptoms:
      "Dark, concentric rings forming a 'bull's-eye' pattern on lower leaves. Leaves turn yellow, then brown, and eventually fall off.",
    causes: "Caused by the fungus Alternaria solani. Favored by warm, humid conditions and prolonged leaf wetness.",
    prevention:
      "Rotate crops, provide adequate spacing, stake plants, and mulch around the base to prevent soil splash.",
    treatment:
      "Apply fungicides at first sign of disease. Remove and destroy infected leaves. Ensure good air circulation.",
    image: "/0cd17aff-13d8-439a-ac08-dae1aea55edb___RS_Erly.B 7828.JPG",
  },
  {
    id: "late-blight",
    name: "Late Blight",
    symptoms:
      "Water-soaked, gray-green spots on leaves that quickly enlarge to form brown, oily blotches. White fungal growth may appear on leaf undersides in humid conditions.",
    causes: "Caused by the oomycete Phytophthora infestans. Thrives in cool, wet weather and can spread rapidly.",
    prevention:
      "Plant resistant varieties, improve drainage, avoid overhead irrigation, and space plants for good air circulation.",
    treatment: "Apply fungicides preventatively. Remove and destroy infected plants immediately to prevent spread.",
    image: "/0a4b3cde-c83a-4c83-b037-010369738152___RS_Late.B 6985.JPG",
  },
  {
    id: "leaf-mold",
    name: "Leaf Mold",
    symptoms:
      "Yellow patches on the upper leaf surfaces and olive-green to grayish-purple fuzzy mold on the undersides of leaves.",
    causes: "Caused by the fungus Passalora fulva. Thrives in high humidity and moderate temperatures.",
    prevention: "Improve air circulation, reduce humidity, avoid overhead watering, and space plants adequately.",
    treatment: "Apply fungicides at first signs. Remove and destroy infected leaves. Reduce humidity in greenhouses.",
    image: "/0ac36661-a47d-47ff-8948-42edec033b87___Crnl_L.Mold 9127.JPG",
  },
  {
    id: "septoria-leaf-spot",
    name: "Septoria Leaf Spot",
    symptoms:
      "Small, circular spots with dark borders and light gray centers. Tiny black dots (pycnidia) may be visible in the center of spots.",
    causes:
      "Caused by the fungus Septoria lycopersici. Favored by warm, wet conditions and spreads through splashing water.",
    prevention:
      "Practice crop rotation, remove plant debris, avoid overhead irrigation, and space plants for good air circulation.",
    treatment: "Apply fungicides preventatively. Remove and destroy infected leaves. Mulch to prevent soil splash.",
    image: "/0a68a294-30d1-4422-ab7e-a1909ec277f7___JR_Sept.L.S 8443.JPG",
  },
  {
    id: "mosaic-virus",
    name: "Mosaic Virus",
    symptoms:
      "Mottled light and dark green pattern on leaves, leaf distortion, stunted growth, and reduced fruit production.",
    causes:
      "Caused by several viruses, most commonly Tobacco Mosaic Virus (TMV) or Tomato Mosaic Virus (ToMV). Spread through handling, tools, and insects.",
    prevention:
      "Use resistant varieties, wash hands before handling plants, disinfect tools, and control insect vectors.",
    treatment:
      "No cure exists. Remove and destroy infected plants to prevent spread. Control weeds that may harbor the virus.",
    image: "/0a91f50b-1263-4b2c-a8c1-f2a6025b82f3___PSU_CG 2136.JPG",
  },
]

export default function DiseaseInfoPanel() {
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-green-800 mb-4">Tomato Diseases</h2>

      <Accordion type="single" collapsible className="w-full">
        {DISEASES.map((disease) => (
          <AccordionItem key={disease.id} value={disease.id}>
            <AccordionTrigger className="text-left font-medium">{disease.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <img
                  src={disease.image || "/placeholder.svg"}
                  alt={`${disease.name} symptoms`}
                  className="w-full h-40 object-cover rounded-md"
                />

                <div>
                  <h4 className="font-semibold text-green-700">Symptoms</h4>
                  <p className="text-sm text-gray-700">{disease.symptoms}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Causes</h4>
                  <p className="text-sm text-gray-700">{disease.causes}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Prevention</h4>
                  <p className="text-sm text-gray-700">{disease.prevention}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Treatment</h4>
                  <p className="text-sm text-gray-700">{disease.treatment}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
