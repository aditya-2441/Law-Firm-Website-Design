import { useState } from "react";
import { useNavigate } from "react-router";
import {
  FileText,
  MessageSquare,
  Shield,
  Clock,
  CheckCircle,
  X,
  Phone,
  Users,
  Scale,
  Award,
} from "lucide-react";
import { Navbar } from "../components/Navbar";

export function ClientLanding() {
  const navigate = useNavigate();
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleWhatsAppConnect = () => {
    if (phoneNumber) {
      window.open(`https://wa.me/${phoneNumber.replace(/\D/g, "")}`, "_blank");
      setShowWhatsAppPopup(false);
      setPhoneNumber("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar isAuthenticated={true} userType="client" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 border-b border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Expert Legal Help When You Need It</h1>
          <p className="text-xl mb-8 text-slate-300">
            We connect you with experienced lawyers to resolve your legal troubles
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/conversations")}
              className="bg-amber-500 text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Get Started Today
            </button>
            <button
              onClick={() => setShowWhatsAppPopup(true)}
              className="border-2 border-amber-500 text-amber-500 px-8 py-4 rounded-lg font-semibold hover:bg-amber-500 hover:text-slate-900 transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Connect on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 hover:border-amber-500 transition-all">
              <div className="bg-amber-500 bg-opacity-10 w-16 h-16 rounded flex items-center justify-center mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Legal Consultation</h3>
              <p className="text-slate-400">
                Get expert advice on your legal matters. Our experienced lawyers provide
                comprehensive consultations to understand and address your concerns.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 hover:border-amber-500 transition-all">
              <div className="bg-amber-500 bg-opacity-10 w-16 h-16 rounded flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Direct Communication</h3>
              <p className="text-slate-400">
                Stay connected with your lawyer through our platform. Real-time messaging
                and WhatsApp integration ensure you're always in the loop.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 hover:border-amber-500 transition-all">
              <div className="bg-amber-500 bg-opacity-10 w-16 h-16 rounded flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Case Management</h3>
              <p className="text-slate-400">
                Track your case progress with ease. Our platform keeps all your legal
                documents and communications organized in one secure place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            How We Help With Your Legal Troubles
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-start gap-4">
              <div className="bg-amber-500 bg-opacity-10 p-3 rounded flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Instant Lawyer Matching</h3>
                <p className="text-slate-400">
                  We connect you with the right lawyer based on your specific legal needs.
                  Our AI-powered matching ensures you get expert help in your area of concern.
                </p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-start gap-4">
              <div className="bg-amber-500 bg-opacity-10 p-3 rounded flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">24/7 Support</h3>
                <p className="text-slate-400">
                  Legal issues don't wait for business hours. Our platform provides round-the-clock
                  access to legal professionals who can address your urgent concerns.
                </p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-start gap-4">
              <div className="bg-amber-500 bg-opacity-10 p-3 rounded flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Confidential & Secure</h3>
                <p className="text-slate-400">
                  Your privacy is our priority. All communications are encrypted and protected
                  under attorney-client privilege. Your information is always safe with us.
                </p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-start gap-4">
              <div className="bg-amber-500 bg-opacity-10 p-3 rounded flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Complete Documentation</h3>
                <p className="text-slate-400">
                  From initial consultation to case resolution, we help you maintain proper
                  documentation. All case files, contracts, and communications are stored securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Ready to Get Legal Help?</h2>
          <p className="text-xl mb-8 text-slate-800">
            Connect with a lawyer today and take the first step toward resolving your legal issues
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowWhatsAppPopup(true)}
              className="bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Connect on WhatsApp
            </button>
            <button
              onClick={() => navigate("/conversations")}
              className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-900 hover:text-white transition-colors"
            >
              Start Conversation
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp Popup */}
      {showWhatsAppPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowWhatsAppPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-500 bg-opacity-20 p-4 rounded-full">
                <Phone className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-white">
              Connect on WhatsApp
            </h2>
            <p className="text-slate-400 text-center mb-6">
              Enter your WhatsApp number to connect with our legal team instantly
            </p>
            <input
              type="tel"
              placeholder="+91 98765-43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg mb-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={handleWhatsAppConnect}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Connect Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
