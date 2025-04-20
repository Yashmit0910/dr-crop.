import LanguageSelector from "@/components/language-selector"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">Dr. Crop</h1>
          <p className="mt-2 text-gray-600">Disease Detection System</p>
        </div>

        <LanguageSelector />

        <div className="pt-4 text-center text-sm text-gray-500">
          <p>Select your preferred language to continue</p>
        </div>
      </div>
    </div>
  )
}
