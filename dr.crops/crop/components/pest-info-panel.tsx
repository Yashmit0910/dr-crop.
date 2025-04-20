"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const PESTS = [
  {
    id: "spider-mites",
    name: "Spider Mites",
    identification:
      "Tiny, spider-like pests (0.5mm) that are difficult to see with the naked eye. May appear as moving dots on leaves.",
    signs: "Fine webbing on leaves and stems, yellow or white speckled appearance on leaves, and bronzing of foliage.",
    habitat: "Prefer hot, dry conditions. Often found on the undersides of leaves.",
    damage: "Suck plant juices, causing stippling, discoloration, leaf drop, and reduced vigor.",
    prevention: "Maintain humidity, regularly mist plants, introduce predatory mites, and keep plants well-watered.",
    treatment:
      "Spray plants with strong jets of water, apply insecticidal soap, neem oil, or introduce predatory insects.",
    image: "/Spider-Mites.jpg",
  },
  {
    id: "whiteflies",
    name: "Whiteflies",
    identification: "Small (1-2mm), moth-like insects with white wings. Fly up in clouds when disturbed.",
    signs: "Clusters of tiny white insects on leaf undersides, sticky honeydew, and sooty mold growth.",
    habitat: "Prefer warm environments. Typically found on the undersides of leaves.",
    damage: "Suck plant sap, causing yellowing, wilting, stunted growth, and reduced yield.",
    prevention: "Use reflective mulches, yellow sticky traps, and introduce natural predators like ladybugs.",
    treatment: "Apply insecticidal soap, neem oil, or horticultural oil. Remove heavily infested leaves.",
    image: "/whiteflies.jpg",
  },
  {
    id: "aphids",
    name: "Aphids",
    identification: "Small (1-3mm), pear-shaped, soft-bodied insects that may be green, black, brown, red, or yellow.",
    signs: "Clusters of small insects on new growth, curled or distorted leaves, and sticky honeydew.",
    habitat: "Often found on new growth, stems, and the undersides of leaves.",
    damage: "Suck plant sap, causing distorted growth, yellowing, and transmitting viral diseases.",
    prevention: "Encourage beneficial insects, use reflective mulches, and maintain plant health.",
    treatment:
      "Spray with strong jets of water, apply insecticidal soap, neem oil, or introduce ladybugs and lacewings.",
    image: "/aphids.jpg",
  },
  {
    id: "thrips",
    name: "Thrips",
    identification: "Tiny (0.5-2mm), slender insects with fringed wings. May appear as small dark or pale slivers.",
    signs: "Silvery, stippled appearance on leaves, black fecal spots, and distorted growth.",
    habitat: "Found in flowers, buds, and on leaf undersides. Prefer warm, dry conditions.",
    damage: "Rasp plant tissue and suck sap, causing silvering, scarring, distorted growth, and spread of viruses.",
    prevention: "Use reflective mulches, blue or yellow sticky traps, and remove weeds that may harbor thrips.",
    treatment: "Apply insecticidal soap, neem oil, or spinosad. Introduce predatory mites or bugs.",
    image: "/thrips.jpg",
  },
  {
    id: "cutworms",
    name: "Cutworms",
    identification: "Plump, smooth caterpillars (2-5cm) that curl into a C-shape when disturbed. Active at night.",
    signs: "Young plants cut off at soil level, holes in leaves or fruits, and presence of caterpillars in soil.",
    habitat: "Hide in soil during the day, emerging at night to feed. Often found near the base of plants.",
    damage: "Cut young seedlings at the soil line, chew holes in leaves, stems, and fruits.",
    prevention: "Use protective collars around seedlings, till soil before planting, and encourage natural predators.",
    treatment: "Handpick at night, apply diatomaceous earth around plants, or use Bacillus thuringiensis (Bt).",
    image: "/Cutworms.jpg",
  },
]

export default function PestInfoPanel() {
  const [expandedPest, setExpandedPest] = useState<string | null>(null)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-green-800 mb-4">Tomato Insect Pests</h2>

      <Accordion type="single" collapsible className="w-full">
        {PESTS.map((pest) => (
          <AccordionItem key={pest.id} value={pest.id}>
            <AccordionTrigger className="text-left font-medium">{pest.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <img
                  src={pest.image || "/placeholder.svg"}
                  alt={`${pest.name}`}
                  className="w-full h-40 object-cover rounded-md"
                />

                <div>
                  <h4 className="font-semibold text-green-700">Identification</h4>
                  <p className="text-sm text-gray-700">{pest.identification}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Signs of Infestation</h4>
                  <p className="text-sm text-gray-700">{pest.signs}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Habitat</h4>
                  <p className="text-sm text-gray-700">{pest.habitat}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Damage</h4>
                  <p className="text-sm text-gray-700">{pest.damage}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Prevention</h4>
                  <p className="text-sm text-gray-700">{pest.prevention}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-700">Treatment</h4>
                  <p className="text-sm text-gray-700">{pest.treatment}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
