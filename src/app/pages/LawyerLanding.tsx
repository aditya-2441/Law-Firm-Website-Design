import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Scale,
  ArrowRight,
  Star,
  Phone,
  MessageCircle,
  ClipboardList,
  Shield,
  Clock,
  Award,
  Users,
  CheckCircle,
  Send,
  Upload,
  AlertCircle,
  Briefcase
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ChatbotWidget } from "../components/ChatbotWidget";

type VerificationStatus = "unverified" | "pending" | "verified";

export function LawyerLanding() {
  const navigate = useNavigate();
  
  // Verification States
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("verified");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states for file uploads
  const [barCouncilId, setBarCouncilId] = useState("");
  const [certPhoto, setCertPhoto] = useState<File | null>(null);
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [govIdPhoto, setGovIdPhoto] = useState<File | null>(null);

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barCouncilId || !certPhoto || !idPhoto || !govIdPhoto) {
      alert("Please upload all required documents.");
      return;
    }

    setIsSubmitting(true);
    // TODO: Phase 2 - Send to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationStatus("pending");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar isAuthenticated={true} userType="lawyer" />
      <ChatbotWidget />
      {/* Hero Section with Background Image */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          // Professional image of signing a legal contract
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1920&auto=format&fit=crop')`,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-amber-500 mb-4 uppercase tracking-wide text-sm">
              NYAYMITRA FOR LAWYERS - वकीलों के लिए न्यायमित्र
            </p>
            <h1 className="text-6xl font-bold text-white mb-4">
              Your Practice,
            </h1>
            <h1 className="text-6xl font-bold text-amber-500 mb-6">
              Our Platform
            </h1>
            <p className="text-slate-300 text-lg mb-8">आपकी प्रैक्टिस, हमारा मंच</p>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Join India's fastest-growing legal network. Connect with high-intent clients, manage your cases digitally, and guarantee your payments.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              {verificationStatus === "verified" ? (
                 <button
                  onClick={() => navigate("/lawyer/dashboard")}
                  className="bg-amber-500 text-slate-900 px-8 py-3 rounded font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2"
                >
                  Enter Dashboard - डैशबोर्ड दर्ज करें
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    document.getElementById('verification-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-amber-500 text-slate-900 px-8 py-3 rounded font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2"
                >
                  Verify Credentials Now
                  <Shield className="w-5 h-5" />
                </button>
              )}
              <button className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-slate-900 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Attorney Support
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">5,000+</div>
                <div className="text-slate-400 text-sm">Verified Lawyers</div>
                <div className="text-slate-500 text-xs">सत्यापित वकील</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">₹50Cr+</div>
                <div className="text-slate-400 text-sm">Payouts Disbursed</div>
                <div className="text-slate-500 text-xs">भुगतान किया गया</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">2M+</div>
                <div className="text-slate-400 text-sm">Client Requests</div>
                <div className="text-slate-500 text-xs">ग्राहक अनुरोध</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-slate-400 text-sm">Payment Security</div>
                <div className="text-slate-500 text-xs">भुगतान सुरक्षा</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="bg-amber-500 py-3 overflow-x-auto">
        <div className="container mx-auto px-6">
          <div className="flex gap-6 text-sm font-medium text-slate-900 whitespace-nowrap justify-center">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Endless Clients</span>
            <span className="text-slate-900/50">•</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Guaranteed Upfront Payments</span>
            <span className="text-slate-900/50">•</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Smart Case Management</span>
            <span className="text-slate-900/50">•</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Encrypted Client Chat</span>
          </div>
        </div>
      </section>

      {/* VERIFICATION SECTION (Mirrors the Consultation Form Layout) */}
      <section id="verification-section" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          
          {/* Unverified State */}
          {verificationStatus === "unverified" && (
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
                  ATTORNEY VERIFICATION - वकील सत्यापन
                </p>
                <h2 className="text-5xl font-bold text-white mb-4">
                  Verify Your <span className="text-amber-500">Credentials</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  To ensure platform integrity and client safety, all lawyers must undergo a Bar Council credential check before accepting cases.
                </p>
                <p className="text-slate-500 mb-8">
                  मंच की अखंडता सुनिश्चित करने के लिए, सभी वकीलों को मामले स्वीकार करने से पहले बार काउंसिल क्रेडेंशियल जांच से गुजरना होगा।
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-slate-300">
                    <Shield className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <span>
                      100% Encrypted Uploads -{" "}
                      <span className="text-slate-500">100% एन्क्रिप्टेड अपलोड</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <Clock className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <span>
                      48-Hour Approval Window -{" "}
                      <span className="text-slate-500">48-घंटे की स्वीकृति विंडो</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <Briefcase className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <span>
                      Instant Access to Clients Post-Verification -{" "}
                      <span className="text-slate-500">सत्यापन के बाद ग्राहकों तक तत्काल पहुंच</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-2">Upload Legal Documents</h3>
                <p className="text-slate-400 mb-6">अपने कानूनी दस्तावेज़ अपलोड करें</p>
                <form onSubmit={handleVerificationSubmit} className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      BAR COUNCIL ENROLLMENT NO. - बार काउंसिल नामांकन संख्या <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={barCouncilId}
                      onChange={(e) => setBarCouncilId(e.target.value)}
                      placeholder="e.g. D/1234/2010"
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      BAR COUNCIL CERTIFICATE - बार काउंसिल प्रमाणपत्र <span className="text-red-500">*</span>
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded cursor-pointer bg-slate-800 hover:bg-slate-700/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-5 h-5 mb-1 text-slate-400" />
                        <p className="text-xs text-slate-400">{certPhoto ? certPhoto.name : "Click to upload (Photo/PDF)"}</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => setCertPhoto(e.target.files?.[0] || null)} required />
                    </label>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      BAR COUNCIL ID CARD - बार काउंसिल पहचान पत्र <span className="text-red-500">*</span>
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded cursor-pointer bg-slate-800 hover:bg-slate-700/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-5 h-5 mb-1 text-slate-400" />
                        <p className="text-xs text-slate-400">{idPhoto ? idPhoto.name : "Click to upload Front & Back"}</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => setIdPhoto(e.target.files?.[0] || null)} required />
                    </label>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2 text-sm font-medium">
                      GOVERNMENT ID - सरकारी पहचान पत्र <span className="text-red-500">*</span>
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-slate-700 border-dashed rounded cursor-pointer bg-slate-800 hover:bg-slate-700/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-5 h-5 mb-1 text-slate-400" />
                        <p className="text-xs text-slate-400">{govIdPhoto ? govIdPhoto.name : "Click to upload Aadhar/Passport"}</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => setGovIdPhoto(e.target.files?.[0] || null)} required />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-500 text-slate-900 py-4 rounded font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Uploading..." : "Submit for Verification - सत्यापन के लिए भेजें"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Pending State */}
          {verificationStatus === "pending" && (
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-lg text-center max-w-4xl mx-auto">
              <Clock className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl font-bold text-white mb-4">Verification in Progress</h2>
              <p className="text-slate-400 text-lg mb-2">सत्यापन प्रगति पर है</p>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Thank you for submitting your credentials. Our compliance team is currently reviewing your Bar Council documents. This process typically takes 48-72 hours.
              </p>
              <div className="flex justify-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500"/> Docs Received</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500"/> Under Review</span>
              </div>
            </div>
          )}

          {/* Verified State */}
          {verificationStatus === "verified" && (
            <div className="bg-slate-900 border border-emerald-500/30 p-12 rounded-lg text-center max-w-4xl mx-auto relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">Account Verified</h2>
              <p className="text-slate-400 text-lg mb-2">खाता सत्यापित</p>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                Your credentials have been authenticated. You are now visible to clients and can start accepting cases nationwide.
              </p>
              <button
                onClick={() => navigate("/lawyer/dashboard")}
                className="bg-emerald-500 text-slate-900 px-8 py-4 rounded font-semibold hover:bg-emerald-600 transition-colors inline-flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Platform Tools / Services (Mirrors "Legal Help You Can Trust") */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
              LAWYER TOOLS / वकील उपकरण
            </p>
            <h2 className="text-5xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              We provide the finest digital infrastructure for lawyers to manage cases, communicate with clients, and ensure seamless billing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-amber-500 bg-opacity-20 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Client Acquisition</h3>
                <p className="text-slate-300 mb-4">
                  Stop marketing. We match high-intent clients directly to your dashboard based on your legal specialization.
                </p>
              </div>
            </div>

            <div
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-amber-500 bg-opacity-20 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Guaranteed Payments</h3>
                <p className="text-slate-300 mb-4">
                  Clients pay upfront into our secure escrow. Funds are automatically transferred to you upon case milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Mirrors Home page format) */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
                WHY JOIN NYAYMITRA / हमसे क्यों जुड़ें
              </p>
              <h2 className="text-5xl font-bold text-white mb-6">
                Practice Law, <span className="text-amber-500">We Handle the Rest</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                At NyayMitra, we believe lawyers should focus on the law, not administrative tasks or chasing payments. Our platform handles the business so you can handle the justice.
              </p>
              <p className="text-slate-500 mb-8">
                हमारा मानना है कि वकीलों को न्याय पर ध्यान देना चाहिए, प्रशासनिक कार्यों या भुगतान का पीछा करने पर नहीं।
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Zero Marketing Costs</h3>
                <p className="text-slate-400 text-sm">
                  We spend millions on marketing so you don't have to.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Flexible Hours</h3>
                <p className="text-slate-400 text-sm">
                  Accept cases only when you have the bandwidth.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Encrypted Chat</h3>
                <p className="text-slate-400 text-sm">
                  Communicate with clients securely through our built-in portal.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Dedicated Support</h3>
                <p className="text-slate-400 text-sm">
                  24/7 technical and compliance support for all attorneys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Exact match to Home.tsx) */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-500 p-2 rounded">
                  <Scale className="w-6 h-6 text-slate-900" />
                </div>
                <span className="text-xl font-bold text-white">NyayMitra</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">न्याय मित्र</p>
              <p className="text-slate-500 text-sm">
                Affordable, trusted legal services for every Indian. Your justice is our mission.
              </p>
              <p className="text-slate-600 text-xs mt-2">
                हर भारतीय के लिए किफायती, विश्वसनीय कानूनी सेवाएं। आपकी न्याय हमारा मिशन है।
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">OUR SERVICES</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Divorce & Family Law - विवाह विधि</li>
                <li>Family Dispute Resolution - पारिवारिक विवाद</li>
                <li>Traffic Violation / Challan - यातायात उल्लंघन</li>
                <li>Property Disputes - संपत्ति विवाद</li>
                <li>Consumer Rights - उपभोक्ता अधिकार</li>
                <li>Criminal Defense - आपराधिक रक्षा</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>About Us - हमारे बारे में</li>
                <li>Services - सेवाएं</li>
                <li>How It Works - कैसे काम करता है</li>
                <li>Testimonials - प्रशंसापत्र</li>
                <li>Free Consultation - मुफ्त परामर्श</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">CONTACT - संपर्क</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <Phone className="w-4 h-4 inline mr-2" />
                  1800-123-456 (Toll Free)
                </li>
                <li>help@nyaymitra.in</li>
                <li>New Delhi, India</li>
                <li className="pt-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} NyayMitra. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button className="hover:text-amber-500">Privacy Policy</button>
              <button className="hover:text-amber-500">Terms of Service</button>
              <button className="hover:text-amber-500">Disclaimer</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}