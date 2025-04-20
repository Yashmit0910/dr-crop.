import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import { User } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Kartikeya Singh",
      role: "Data Analyst",
      bio: "Helps in Gathering Datasets.API(for weather data) and Preprocessing the Data.Helps in integrating the models to GUI",
      image: "/WhatsApp Image 2025-04-20 at 16.36.48_7402a215.jpg",
    },
    {
      name: "Tanishq ",
      role: "AI & ML Engineer",
      bio: "Created Deep learning Model & ML Algorithms to Predict Disease and helps in making the blueprint of our frontend.",
      image: "/WhatsApp Image 2025-04-20 at 05.00.33_2011ea80.jpg",
    },
    {
      name: "Yashmit Rathee",
      role: "Backend Engineer",
      bio: "Integrated APIs and connected the main application to the frontend in the Dr. Crop project, ensuring smooth data flow and user interaction",
      image: "/WhatsApp Image 2025-04-20 at 16.35.57_bda72937.jpg",
    },
    {
      name: "Riyanshi Tomar",
      role: "Frontend Developer",
      bio: "Helps in creating Frontend and project report.",
      image: "/WhatsApp Image 2025-04-20 at 16.35.58_d0982278.jpg",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-800 mb-6">About Dr. Crop</h1>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
            The main objective of this project is two-fold:

Tomato Leaf Disease Detection:
To accurately detect and classify diseases in tomato leaves using advanced machine learning and deep learning models. This aims to assist farmers and agricultural experts in identifying plant diseases at an early stage, reducing crop loss, and improving yield quality.

Climate Data Analysis:
To analyze historical weather data — specifically temperature and humidity over the past three years — in order to identify patterns and correlations between climatic conditions and the occurrence of tomato plant diseases. This helps in understanding environmental triggers and forecasting potential disease outbreaks."
            </p>
            <p className="text-gray-700">
              Our platform is designed to be user-friendly and accessible to farmers of all technical backgrounds,
              providing valuable insights without requiring extensive technical knowledge.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                    {member.image ? (
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={64} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-green-800">{member.name}</h3>
                  <p className="text-sm font-medium text-green-600 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Technology</h2>
            <p className="text-gray-700 mb-4">
This project was developed using Python as the core programming language due to its extensive support for machine learning and data analysis. For building and training deep learning models, TensorFlow and Keras were utilized—Keras provided a high-level, user-friendly interface, while TensorFlow ensured performance and scalability. To implement and compare traditional machine learning algorithms like Random Forest and XGBoost, the scikit-learn and XGBoost libraries were used. Image preprocessing tasks such as resizing, normalization, and augmentation were handled using OpenCV, which played a vital role in preparing the dataset for training. Additionally, the OpenWeather API was integrated to collect historical climate data, specifically temperature and humidity, for the past three years to explore the relationship between weather patterns and disease outbreaks. For visualizations, Matplotlib and Seaborn were used to plot training metrics, model comparisons, and weather trends, helping to derive insights in a clear and interpretable manner.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
