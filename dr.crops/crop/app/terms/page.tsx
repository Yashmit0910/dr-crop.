import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Terms & Conditions</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-2">
              By accessing or using the Dr. Crop Disease Detection System, you agree to be bound by these Terms and
              Conditions. If you do not agree to all the terms and conditions, you must not access or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">2. User Responsibilities</h2>
            <p className="text-gray-700 mb-2">
              Users are responsible for ensuring that the images they upload are clear and properly focused on the plant
              areas of concern. The accuracy of our disease detection system depends on the quality of the images
              provided.
            </p>
            <p className="text-gray-700 mb-2">
              Users must not upload content that infringes on intellectual property rights, contains malware, or
              violates any applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">3. Data Privacy</h2>
            <p className="text-gray-700 mb-2">
              We collect and process user data, including uploaded images and location information, to provide our
              services. This data is used to improve our disease detection algorithms and provide personalized
              recommendations.
            </p>
            <p className="text-gray-700 mb-2">
              We do not sell user data to third parties. However, anonymized data may be used for research purposes or
              shared with agricultural research institutions to improve disease detection and prevention methods.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">4. Limitations of AI-Based Results</h2>
            <p className="text-gray-700 mb-2">
              While our AI system is designed to provide accurate disease detection, it is not infallible. The results
              should be used as a guide and not as a definitive diagnosis. We recommend consulting with agricultural
              experts for confirmation, especially in cases of severe infestation or unusual symptoms.
            </p>
            <p className="text-gray-700 mb-2">
              Dr. Crop is not responsible for crop losses or damages resulting from actions taken based on our disease
              detection results.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">5. Image Usage and Storage</h2>
            <p className="text-gray-700 mb-2">
              Images uploaded to our platform are stored securely and used for disease detection and to improve our AI
              models. By uploading images, you grant us a non-exclusive license to use these images for these purposes.
            </p>
            <p className="text-gray-700 mb-2">
              We retain uploaded images for a period of 90 days, after which they are automatically deleted from our
              active systems. Anonymized versions may be retained in our training dataset.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">6. Service Availability</h2>
            <p className="text-gray-700 mb-2">
              We strive to maintain continuous availability of our services, but we do not guarantee uninterrupted
              access. The service may be temporarily unavailable due to maintenance, updates, or factors beyond our
              control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-700 mb-3">7. Contact Information</h2>
            <p className="text-gray-700 mb-2">
              For questions, concerns, or support related to these Terms and Conditions, please contact us at:
            </p>
            <p className="text-gray-700 font-medium">
              Email: support@drcrop.com
              <br />
              Phone: +91 1234567890
            </p>
          </section>

          <section>
            <p className="text-gray-700 italic">Last updated: April 19, 2023</p>
          </section>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
