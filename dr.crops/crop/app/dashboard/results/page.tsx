"use client"

import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import ResultDetails from "@/components/result-details"

export default function Results() {
  const searchParams = useSearchParams();
  const disease = searchParams.get("disease");

  if (!disease) {
    return <div>No disease detected.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Analysis Results</h1>
          <div className="p-4 mb-6 bg-green-100 border-l-4 border-green-600 rounded">
            <h2 className="text-xl font-semibold">
              Detected: {disease}
            </h2>
          </div>
          <ResultDetails disease={disease} />

          <div className="mt-8 flex justify-between">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={() => window.history.back()}
            >
              Back to Upload
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Download Report</button>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
