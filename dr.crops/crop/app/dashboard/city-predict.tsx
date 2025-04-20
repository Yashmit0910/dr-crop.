import { useState } from "react";

// List of all Indian state/UT capitals and some major cities
const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Bhopal", "Patna", "Chandigarh", "Bhubaneswar", "Thiruvananthapuram", "Dehradun", "Guwahati", "Raipur", "Ranchi",
  "Shimla", "Imphal", "Shillong", "Aizawl", "Kohima", "Agartala", "Itanagar", "Dispur", "Panaji", "Gandhinagar",
  "Srinagar", "Jammu", "Leh", "Gangtok", "Puducherry", "Port Blair", "Daman", "Kavaratti", "Silvassa", "Amaravati",
  "Faridabad"
];

export default function CityDiseasePredictor() {
  const [city, setCity] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch disease data from backend
  const fetchCityDisease = async (cityName: string) => {
    setResult(null);
    if (cityName) {
      setLoading(true);
      try {
        console.log("Sending city to backend:", cityName);
        const res = await fetch("http://localhost:8000/city-disease", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: cityName }),
        });
        const data = await res.json();
        console.log("Received data from backend:", data); // <-- Add this
        setResult(data);
      } catch (err) {
        setResult({ error: "Failed to fetch data from backend." });
      }
      setLoading(false);
    }
  };

  // Dropdown change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setCustomCity("");
    if (e.target.value) fetchCityDisease(e.target.value);
  };

  // Custom input change
  const handleCustomCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCity(e.target.value);
    setCity("");
  };

  // On blur or Enter in custom input, fetch
  const handleCustomCityBlur = () => {
    if (customCity.trim()) fetchCityDisease(customCity.trim());
  };

  const handleCustomCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customCity.trim()) fetchCityDisease(customCity.trim());
  };

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">City-wise Disease Detector</h2>
      <label className="block text-sm font-medium mb-2">Select Your City</label>
      <select
        value={city}
        onChange={handleCityChange}
        className="border p-2 rounded w-full mb-2"
      >
        <option value="">Choose a city</option>
        {CITIES.map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </select>
      <div className="mb-4">
        <input
          type="text"
          value={customCity}
          onChange={handleCustomCityChange}
          onBlur={handleCustomCityBlur}
          onKeyDown={handleCustomCityKeyDown}
          placeholder="Or enter a city name"
          className="border p-2 rounded w-full"
        />
      </div>
      {loading && <div className="text-gray-500">Loading...</div>}
      {result && !result.error && (
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-2">
            City: {result.city}
          </h3>
          <div className="flex gap-8 mb-4">
            <div>
              <div className="font-semibold">Temperature</div>
              <div className="text-2xl">{result.temperature}°C</div>
            </div>
            <div>
              <div className="font-semibold">Humidity</div>
              <div className="text-2xl">{result.humidity}%</div>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-1">Potential Disease Risks</div>
            {result.disease_risks.length === 0 && (
              <div className="text-green-600">No high-risk diseases based on current conditions.</div>
            )}
            <ul>
              {result.disease_risks.map((risk: any, idx: number) => (
                <li key={idx} className="flex items-center gap-2 mb-1">
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background:
                        risk.risk === "HIGH"
                          ? "#ef4444"
                          : risk.risk === "MODERATE"
                          ? "#f59e42"
                          : "#eab308",
                    }}
                  ></span>
                  <span>
                    {risk.risk === "HIGH" && "High risk"}
                    {risk.risk === "MODERATE" && "Moderate risk"}
                    {risk.risk === "LOW" && "Low risk"}
                    {risk.risk === "POTENTIAL" && "Potential risk"}
                    {" of "}
                    {risk.disease}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-800">
            For detailed analysis, please upload the image for accurate results.
          </div>
        </div>
      )}
      {result && result.error && (
        <div className="mt-4 text-red-600">{result.error}</div>
      )}
    </div>
  );
}