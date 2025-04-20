"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const router = useRouter()

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)

    // In a real app, you would store this in localStorage or cookies
    localStorage.setItem("preferredLanguage", language)

    // Redirect to dashboard after selection
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-green-800">Select Language / भाषा चुनें</h2>

      <div className="grid grid-cols-2 gap-4">
        <Card
          className={`p-4 cursor-pointer transition-all ${
            selectedLanguage === "english" ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-gray-50"
          }`}
          onClick={() => handleLanguageSelect("english")}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
              <span className="text-3xl">🇬🇧</span>
            </div>
            <h3 className="font-medium">English</h3>
          </div>
        </Card>

        <Card
          className={`p-4 cursor-pointer transition-all ${
            selectedLanguage === "hindi" ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-gray-50"
          }`}
          onClick={() => handleLanguageSelect("hindi")}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
              <span className="text-3xl">🇮🇳</span>
            </div>
            <h3 className="font-medium">हिंदी</h3>
          </div>
        </Card>
      </div>

      <div className="pt-4">
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!selectedLanguage}
          onClick={() => router.push("/dashboard")}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
