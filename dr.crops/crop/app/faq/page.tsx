import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "How accurate is the disease detection system?",
      answer:
        "Our AI model has been trained on thousands of images and can identify common tomato diseases with approximately 90-95% accuracy. However, the accuracy depends on the quality of the uploaded images and the distinctiveness of the symptoms.",
    },
    {
      question: "Can I use Dr. Crop for plants other than tomatoes?",
      answer:
        "Currently, Dr. Crop is optimized specifically for tomato plants. We are working on expanding our system to include other crops in the future.",
    },
    {
      question: "How many images can I upload for free?",
      answer:
        "You can upload and analyze up to 3 images without signing in. After that, you'll need to create a free account using your phone number to continue using the service.",
    },
    {
      question: "How does the City-wise Disease Detector work?",
      answer:
        "The City-wise Disease Detector uses real-time weather data (temperature and humidity) from your selected city to predict potential disease risks. Many plant diseases are influenced by environmental conditions, so this feature helps you stay ahead of potential problems.",
    },
    {
      question: "Where does the price data come from in the Tomato Price Tracker?",
      answer:
        "Our price data is sourced from the Agmarknet API, which provides daily updates on agricultural commodity prices from various markets across India. This helps farmers make informed decisions about when and where to sell their produce.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take data security seriously. The images you upload are stored securely and used only for disease detection and improving our AI models. We do not sell your personal data to third parties. Please refer to our Terms & Conditions for more details on our data privacy practices.",
    },
    {
      question: "Can I use Dr. Crop offline?",
      answer:
        "Currently, Dr. Crop requires an internet connection to function as the disease detection processing happens on our servers. We are exploring options for a limited offline mode in future updates.",
    },
    {
      question: "How do I provide feedback or report issues?",
      answer:
        "You can provide feedback or report issues through the Feedback form accessible from the footer of our website. We value your input and use it to improve our services.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Frequently Asked Questions</h1>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-green-700">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 p-4 bg-green-100 rounded-lg">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Still have questions?</h2>
            <p className="text-gray-700">
              If you couldn't find the answer to your question, feel free to contact our support team at
              support@drcrop.com or use the chatbot in the bottom-right corner of the screen.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}
