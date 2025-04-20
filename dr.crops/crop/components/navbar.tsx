"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sun, Moon, Map, BarChart2 } from "lucide-react"

const THEMES = {
  GREEN: "green",
  WHITE: "white",
  BLACK: "black",
}

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
]

export default function Navbar() {
  const [theme, setTheme] = useState(THEMES.GREEN)
  const router = useRouter()

  // Add state for city/state input and result
  const [placeInput, setPlaceInput] = useState<string>("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    document.documentElement.classList.remove("theme-green", "theme-white", "theme-black")
    document.documentElement.classList.add(`theme-${newTheme}`)
  }

  // Fetch city disease data from backend
  const fetchCityDisease = async (cityName: string) => {
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/city-disease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityName }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ error: "Failed to fetch data from backend." })
    }
    setLoading(false)
  }

  // Fetch disease data from backend for any place (city or state)
  const fetchPlaceDisease = async (placeName: string) => {
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/city-disease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: placeName }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ error: "Failed to fetch data from backend." })
    }
    setLoading(false)
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-green-700">Dr. Crop</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* City/State Disease Detector */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Map size={16} />
                  <span className="hidden sm:inline">City/State Disease Detector</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>City/State Disease Detector</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <label className="block text-sm font-medium mb-2">Enter City or State Name</label>
                  <input
                    type="text"
                    value={placeInput}
                    onChange={e => setPlaceInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && placeInput.trim()) {
                        fetchPlaceDisease(placeInput.trim())
                      }
                    }}
                    placeholder="e.g. Mumbai, Karnataka"
                    className="border p-2 rounded w-full mb-2"
                  />
                  <Button
                    className="w-full"
                    onClick={() => placeInput.trim() && fetchPlaceDisease(placeInput.trim())}
                    disabled={loading || !placeInput.trim()}
                  >
                    {loading ? "Loading..." : "Check Disease Risk"}
                  </Button>

                  {loading && (
                    <div className="mt-6 text-gray-500">Loading...</div>
                  )}

                  {result && !result.error && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                      <h3 className="font-medium mb-2">Current Weather Conditions</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Temperature</p>
                          <p className="font-medium">{result.temperature}°C</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Humidity</p>
                          <p className="font-medium">{result.humidity}%</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Potential Disease Risks</h3>
                        <ul className="text-sm space-y-1">
                          {Array.isArray(result.disease_risks) && result.disease_risks.length > 0 ? (
                            result.disease_risks.map((risk: any, idx: number) => (
                              <li key={idx} className="flex items-center">
                                <span
                                  className={`w-2 h-2 rounded-full mr-2 ${
                                    risk.risk === "HIGH"
                                      ? "bg-red-500"
                                      : risk.risk === "MODERATE"
                                      ? "bg-yellow-500"
                                      : risk.risk === "POTENTIAL"
                                      ? "bg-blue-400"
                                      : "bg-green-500"
                                  }`}
                                ></span>
                                <span>
                                  {risk.risk === "HIGH" && "High risk"}
                                  {risk.risk === "MODERATE" && "Moderate risk"}
                                  {risk.risk === "LOW" && "Low risk"}
                                  {risk.risk === "POTENTIAL" && "Potential risk"}
                                  {" of "}
                                  {risk.disease}
                                  {typeof risk.probability === "number" && (
                                    <span className="ml-2 text-xs text-gray-500">
                                      ({risk.probability}%)
                                    </span>
                                  )}
                                </span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 italic">No significant disease risks detected.</li>
                          )}
                        </ul>
                      </div>
                      {/* Add this prompt below the results */}
                      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-blue-800">
                        For a detailed analysis, please upload an image of your plant on our website.
                      </div>
                    </div>
                  )}

                  {result && result.error && (
                    <div className="mt-6 text-red-600">{result.error}</div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            {/* Tomato Price Tracker */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <BarChart2 size={16} />
                  <span className="hidden sm:inline">Price Tracker</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Tomato Price Tracker</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <label className="block text-sm font-medium mb-2">Select Cities (up to 10)</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose cities to compare" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="mt-6">
                    <h3 className="font-medium mb-4">Current Market Prices</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              City
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Min Price (₹/kg)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Max Price (₹/kg)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Modal Price (₹/kg)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Mumbai</td>
                            <td className="px-6 py-4 whitespace-nowrap">40</td>
                            <td className="px-6 py-4 whitespace-nowrap">60</td>
                            <td className="px-6 py-4 whitespace-nowrap">50</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Delhi</td>
                            <td className="px-6 py-4 whitespace-nowrap">35</td>
                            <td className="px-6 py-4 whitespace-nowrap">55</td>
                            <td className="px-6 py-4 whitespace-nowrap">45</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Bangalore</td>
                            <td className="px-6 py-4 whitespace-nowrap">30</td>
                            <td className="px-6 py-4 whitespace-nowrap">50</td>
                            <td className="px-6 py-4 whitespace-nowrap">40</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Auth Buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="flex items-center gap-2">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="ghost" className="flex items-center gap-2">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Theme Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === THEMES.BLACK ? <Moon size={20} /> : <Sun size={20} />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange(THEMES.GREEN)}>Green Theme</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange(THEMES.WHITE)}>White Theme</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange(THEMES.BLACK)}>Black Theme</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
