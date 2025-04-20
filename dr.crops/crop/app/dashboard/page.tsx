"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import ImageUploader from "@/components/image-uploader"
import DiseaseInfoPanel from "@/components/disease-info-panel"
import PestInfoPanel from "@/components/pest-info-panel"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function Dashboard() {
  const [uploadCount, setUploadCount] = useState(0)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const router = useRouter()

  const handleImageUpload = async (files: File[]) => {
    if (uploadCount >= 3 && !isSignedIn) {
      document.getElementById("sign-in-modal")?.classList.remove("hidden")
    } else {
      setUploadCount((prev) => prev + 1)
      // Send image to backend for prediction
      const formData = new FormData()
      formData.append("file", files[0]) // handle multiple files as needed

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      // Redirect to results page with disease name as query parameter
      router.push(`/dashboard/results?disease=${encodeURIComponent(data.class)}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Tomato Disease Detection</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ImageUploader onUpload={handleImageUpload} />

            <div className="mt-4 text-sm text-gray-600">
              <p>Upload up to 3 images of tomato plants for free analysis. Sign in required after 3 uploads.</p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <DiseaseInfoPanel />
          <PestInfoPanel />
        </section>
      </main>

      <Footer />
      <Chatbot />

      {/* Sign-in Modal */}
      <div
        id="sign-in-modal"
        className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
          <p className="mb-4">You've used your 3 free uploads. Please sign in with your phone number to continue.</p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input type="tel" className="w-full p-2 border rounded" placeholder="+91 1234567890" />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              onClick={() => document.getElementById("sign-in-modal")?.classList.add("hidden")}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                setIsSignedIn(true)
                document.getElementById("sign-in-modal")?.classList.add("hidden")
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
