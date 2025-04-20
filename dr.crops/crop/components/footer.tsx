import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-green-700 mb-4">Dr. Crop</h3>
            <p className="text-sm text-gray-600">
              Empowering farmers with smart, accessible tools for managing crop health.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-green-700">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-green-700">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-gray-600 hover:text-green-700">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-700 mb-4">Did You Know?</h3>
            <p className="text-sm text-gray-600">
              Tomatoes are actually fruits, not vegetables! They belong to the nightshade family, along with potatoes
              and eggplants.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-700 mb-4">Contact Us</h3>
            <p className="text-sm text-gray-600">
              Have questions or suggestions? Reach out to our team at support@drcrop.com
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Dr. Crop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
