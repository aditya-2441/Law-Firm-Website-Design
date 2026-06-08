import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ChatbotWidget } from "../components/ChatbotWidget";

// Mapping of primary services to their specific sub-services
const subServicesMap: Record<string, { value: string; label: string }[]> = {
  divorce: [
    { value: "mutual", label: "Mutual Consent Divorce" },
    { value: "contested", label: "Contested Divorce" },
    { value: "custody", label: "Child Custody & Visitation" },
    { value: "alimony", label: "Alimony & Maintenance" },
  ],
  family: [
    { value: "prenup", label: "Prenuptial / Postnuptial Agreements" },
    { value: "dv", label: "Domestic Violence (DV) Act" },
    { value: "restitution", label: "Restitution of Conjugal Rights" },
    { value: "succession", label: "Succession, Wills & Inheritance" },
  ],
  traffic: [
    { value: "challan", label: "E-Challan Settlement" },
    { value: "dui", label: "Drunk Driving (DUI / DWI)" },
    { value: "license", label: "License Suspension / Revocation" },
    { value: "mact", label: "Motor Accident Claims (MACT)" },
  ],
  property: [
    { value: "rera", label: "RERA (Real Estate Regulatory Authority)" },
    { value: "title", label: "Title & Ownership Disputes" },
    { value: "tenant", label: "Landlord-Tenant Disputes" },
    { value: "possession", label: "Illegal Possession / Eviction" },
  ],
  consumer: [
    { value: "defective", label: "Defective Products / Services" },
    { value: "fraud", label: "E-commerce Fraud" },
    { value: "medical", label: "Medical Negligence" },
    { value: "insurance", label: "Insurance Claim Rejection" },
  ],
  arbitration: [
    { value: "commercial", label: "Commercial Arbitration" },
    { value: "mediation", label: "Mediation Services" },
    { value: "conciliation", label: "Conciliation" },
    { value: "corporate", label: "Corporate Dispute Resolution" },
  ],
  other: [
    { value: "general", label: "General Legal Consultation" },
    { value: "criminal", label: "Criminal Defense" },
    { value: "civil", label: "Civil Suit" },
    { value: "startup", label: "Startup & Corporate Law" },
  ],
};

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check local storage on initial load to see if they are logged in
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  
  const [userType, setUserType] = useState<"client" | "lawyer" | "admin" | null>(() => {
    return localStorage.getItem("userType") as "client" | "lawyer" | "admin" | null;
  });

  // Added subService to formData
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: "",
    subService: "",
    description: "",
  });

  // Handle auto-scrolling when navigating from other pages via the Navbar
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Consultation request submitted!");
    setFormData({ fullName: "", phone: "", service: "", subService: "", description: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "service") {
      // If the primary service changes, clear out the previously selected sub-service
      setFormData({ ...formData, service: value, subService: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        userType={userType} 
        onLogout={() => {
          setIsAuthenticated(false);
          setUserType(null);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userType");
        }} 
      />
      <ChatbotWidget />

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1483600516620-7254872369ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')`,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-amber-500 mb-4 uppercase tracking-wide text-sm">
              NYAYMITRA - MAKING JUSTICE ACCESSIBLE
            </p>
            <h1 className="text-6xl font-bold text-white mb-4">
              Your Justice,
            </h1>
            <h1 className="text-6xl font-bold text-amber-500 mb-6">
              Our Mission
            </h1>
            <p className="text-slate-300 text-lg mb-8">न्यायमित्र-न्याय सुलभ बनाएं</p>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Expert legal services for divorce, family disputes, and traffic violations. Affordable,
              trustworthy, and available in both Hindi and English.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => navigate("/signup")}
                className="bg-amber-500 text-slate-900 px-8 py-3 rounded font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-slate-900 transition-colors flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-slate-900 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">1,000+</div>
                <div className="text-slate-400 text-sm">Cases Resolved</div>
                <div className="text-slate-500 text-xs">मामलों का समाधान</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-slate-400 text-sm">Years of Service</div>
                <div className="text-slate-500 text-xs">सेवा के वर्ष</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-slate-400 text-sm">Success Rate</div>
                <div className="text-slate-500 text-xs">सफलता दर</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-slate-400 text-sm">Expert Lawyers</div>
                <div className="text-slate-500 text-xs">विशेषज्ञ वकील</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Bar */}
      <section className="bg-amber-500 py-3 overflow-x-auto">
        <div className="container mx-auto px-6">
          <div className="flex gap-6 text-sm font-medium text-slate-900 whitespace-nowrap">
            <button className="hover:underline">Divorce Law - विवाह विधि</button>
            <button className="hover:underline">Family Disputes - पारिवारिक विवाद</button>
            <button className="hover:underline">Traffic Violation - यातायात उल्लंघन</button>
            <button className="hover:underline">Property Disputes - संपत्ति विवाद</button>
            <button className="hover:underline">Consumer Rights - उपभोक्ता अधिकार</button>
            <button className="hover:underline">Criminal Defense - आपराधिक रक्षा</button>
            <button className="hover:underline">Court Representation - न्यायालय प्रतिनिधित्व</button>
          </div>
        </div>
      </section>

      {/* Legal Help You Can Trust */}
      <section id="services" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
              OUR SERVICES / हमारी सेवाएं
            </p>
            <h2 className="text-5xl font-bold text-white mb-4">Legal Help You Can Trust</h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              We match the finest legal talent with individuals for property battles, family disputes,
              and beyond. Justice that's always within reach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1713942590288-1468a2d88ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-amber-500 bg-opacity-20 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Divorce & Family Law</h3>
                <p className="text-slate-300 mb-4">
                  Compassionate legal support for divorce proceedings, custody, property settlements,
                  and child custody.
                </p>
                <button className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-2 w-fit">
                  Get Help
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1575987446487-56eba08666cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-amber-500 bg-opacity-20 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Traffic Violation & Challan</h3>
                <p className="text-slate-300 mb-4">
                  Challenge unjust traffic tickets, license suspensions, and all road-related legal
                  matters with expert guidance.
                </p>
                <button className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-2 w-fit">
                  Get Help
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1626447269096-f8665509589c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-amber-500 bg-opacity-20 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Family Disputes Resolution</h3>
                <p className="text-slate-300 mb-4">
                  We specialize in resolving sensitive family matters through mediation, negotiation,
                  and legal representation.
                </p>
                <button className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-2 w-fit">
                  Get Help
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-amber-500 bg-opacity-20 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">General Legal Help</h3>
                <p className="text-slate-300 mb-4">
                  Comprehensive legal assistance for contracts, property disputes, consumer rights,
                  and every legal issue.
                </p>
                <button className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-2 w-fit">
                  Get Help
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
                WHY NYAYMITRA / क्यों हम
              </p>
              <h2 className="text-5xl font-bold text-white mb-6">
                Justice Should Be <span className="text-amber-500">Accessible to All</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                At NyayMitra, we believe every Indian deserves world-class legal representation,
                regardless of background or budget. Our mission is to democratize access to justice.
              </p>
              <p className="text-slate-500 mb-8">
                हमारा मानना है कि न्याय हर किसी का अधिकार है और इसके लिए आर्थिक स्थिति या पृष्ठभूमि
                बाधा नहीं होनी चाहिए।
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="bg-amber-500 text-slate-900 px-8 py-3 rounded font-semibold hover:bg-amber-600 transition-colors"
              >
                Get Consultation
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Proven Track Record</h3>
                <p className="text-slate-400 text-sm">
                  Thousands of cases won with a 98% success rate in family law matters.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Affordable Legal Help</h3>
                <p className="text-slate-400 text-sm">
                  Transparent pricing and payment plans to ensure legal help is within reach.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Bilingual Support</h3>
                <p className="text-slate-400 text-sm">
                  Legal services available in Hindi & English for better understanding.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">Quick Response Time</h3>
                <p className="text-slate-400 text-sm">
                  Get an expert response within 2 hours. Legal help when you need it most.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">24/7 Support</h3>
                <p className="text-slate-400 text-sm">
                  Round-the-clock support for urgent legal matters and emergencies.
                </p>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
                <div className="bg-amber-500 bg-opacity-10 w-12 h-12 rounded flex items-center justify-center mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold mb-2">15+ Years of Excellence</h3>
                <p className="text-slate-400 text-sm">
                  Over a decade of experience in Indian legal system and case law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps */}
      <section id="how-it-works" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
              HOW IT WORKS - कैसे काम करता है
            </p>
            <h2 className="text-5xl font-bold text-white mb-4">Three Simple Steps to Justice</h2>
            <p className="text-slate-400 text-lg">न्याय की ओर की सरल प्रक्रिया</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg relative">
              <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-900 w-16 h-16 rounded flex items-center justify-center font-bold text-3xl">
                01
              </div>
              <div className="bg-amber-500 bg-opacity-10 w-14 h-14 rounded flex items-center justify-center mb-6">
                <ClipboardList className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Book Free Consultation</h3>
              <p className="text-slate-400 mb-2">मुफ्त परामर्श बुक करें</p>
              <p className="text-slate-500">
                Fill out our simple form or call us. Tell us your legal issue — we listen without
                judgment.
              </p>
              <p className="text-slate-600 text-sm mt-2">
                हमारा सरल फॉर्म भरें या हमें कॉल करें। हमें अपनी कानूनी समस्या बताएं — हम बिना किसी
                निर्णय के सुनेंगे।
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg relative">
              <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-900 w-16 h-16 rounded flex items-center justify-center font-bold text-3xl">
                02
              </div>
              <div className="bg-amber-500 bg-opacity-10 w-14 h-14 rounded flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Speak with an Expert</h3>
              <p className="text-slate-400 mb-2">विशेषज्ञ से बात करें</p>
              <p className="text-slate-500">
                Our experienced lawyer assesses your case, explores options, and guides you on the
                best approach.
              </p>
              <p className="text-slate-600 text-sm mt-2">
                हमारे अनुभवी वकील आपके मामले का आकलन करेंगे और आपको सर्वोत्तम समाधान पर मार्गदर्शन
                देंगे।
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg relative">
              <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-900 w-16 h-16 rounded flex items-center justify-center font-bold text-3xl">
                03
              </div>
              <div className="bg-amber-500 bg-opacity-10 w-14 h-14 rounded flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Get Legal Resolution</h3>
              <p className="text-slate-400 mb-2">कानूनी समाधान प्राप्त करें</p>
              <p className="text-slate-500">
                We represent you in court or mediation and work tirelessly until your matter is fully
                resolved.
              </p>
              <p className="text-slate-600 text-sm mt-2">
                हम अदालत में या मध्यस्थता में आपका प्रतिनिधित्व करेंगे और जब तक आपकी समस्या का
                समाधान नहीं हो जाता।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
                CLIENT STORIES - ग्राहक की कहानियां
              </p>
              <h2 className="text-5xl font-bold text-white mb-4">Real People, Real Results</h2>
              <p className="text-slate-400 text-lg">असली लोग, असली परिणाम</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 px-6 py-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-3xl font-bold text-white">4.9</span>
              </div>
              <p className="text-slate-400 text-sm">Based on 500+ reviews</p>
              <p className="text-slate-500 text-xs">Excellent</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg">
              <div className="text-amber-500 text-6xl mb-4">"</div>
              <p className="text-white mb-6">
                "I received a wrongful challan of ₹10,000. NyayMitra team challenged it in court and got
                it completely dismissed within 3 weeks. Highly recommend!"
              </p>
              <p className="text-slate-500 text-sm mb-6">
                मुझे ₹10,000 का गलत चालान मिला था। न्यायमित्र टीम ने अदालत में इसे चुनौती दी और 3
                सप्ताह में पूरी तरह से खारिज करवा दिया।
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">Rajesh Kumar</p>
                  <p className="text-slate-400 text-sm">Delhi NCR - Traffic Case</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg">
              <div className="text-amber-500 text-6xl mb-4">"</div>
              <p className="text-white mb-6">
                "Going through a divorce was emotionally draining. NyayMitra made the legal process smooth
                and stress-free. They truly understood my situation and fought for my rights."
              </p>
              <p className="text-slate-500 text-sm mb-6">
                तलाक की प्रक्रिया भावनात्मक रूप से कठिन थी, लेकिन न्यायमित्र ने कानूनी प्रक्रिया को
                आसान और तनाव मुक्त बनाया।
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">Priya Sharma</p>
                  <p className="text-slate-400 text-sm">Mumbai - Divorce Case</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 p-8 rounded-lg">
              <div className="text-amber-500 text-6xl mb-4">"</div>
              <p className="text-white mb-6">
                "A property dispute with my siblings had been going on for 5 years. NyayMitra resolved it
                through mediation in just 3 months. Saved us time and court fees."
              </p>
              <p className="text-slate-500 text-sm mb-6">
                मेरे भाई-बहनों के साथ संपत्ति विवाद 5 साल से चल रहा था। न्यायमित्र ने केवल 3 महीने में
                मध्यस्थता के माध्यम से इसे हल कर दिया।
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">Amit Verma</p>
                  <p className="text-slate-400 text-sm">Bangalore - Property Dispute</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="contact" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-amber-500 mb-2 uppercase tracking-wide text-sm">
                FREE CONSULTATION - मुफ्त परामर्श
              </p>
              <h2 className="text-5xl font-bold text-white mb-4">
                Talk to a Lawyer <span className="text-amber-500">For Free</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Share your legal issue and get an expert response within 2 hours. No commitment required.
              </p>
              <p className="text-slate-500 mb-8">
                अपनी कानूनी समस्या साझा करें और 2 घंटे के भीतर विशेषज्ञ प्रतिक्रिया प्राप्त करें। कोई
                प्रतिबद्धता आवश्यक नहीं।
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <span>
                    Free initial consultation -{" "}
                    <span className="text-slate-500">मुफ्त प्रारंभिक परामर्श</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <span>
                    Response within 2 hours -{" "}
                    <span className="text-slate-500">2 घंटे के भीतर जवाब</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <span>
                    Available in Hindi & English -{" "}
                    <span className="text-slate-500">हिंदी और अंग्रेजी में उपलब्ध</span>
                  </span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                  <span>
                    Confidential & secure -{" "}
                    <span className="text-slate-500">गोपनीय और सुरक्षित</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Book Your Free Consultation</h3>
              <p className="text-slate-400 mb-6">अपनी मुफ्त परामर्श बुक करें</p>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-300 mb-2">
                    FULL NAME - पूरा नाम <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Rajesh Sharma"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">
                    PHONE NUMBER - फोन नंबर <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765-43210"
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                {/* Primary Service Type Dropdown */}
                <div>
                  <label className="block text-slate-300 mb-2">
                    SERVICE TYPE - सेवा प्रकार <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select a service - सेवा चुनें</option>
                    <option value="divorce">Divorce & Family Law</option>
                    <option value="family">Family Disputes</option>
                    <option value="property">Property Disputes</option>
                    <option value="traffic">Traffic Violation</option>
                    <option value="consumer">Consumer Rights</option>
                    <option value="arbitration">Arbitration & Mediation</option>
                    <option value="other">Other Legal Help</option>
                  </select>
                </div>

                {/* Conditional Sub-Service Dropdown */}
                {formData.service && subServicesMap[formData.service] && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-slate-300 mb-2">
                      SPECIFIC REQUIREMENT - विशिष्ट आवश्यकता <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subService"
                      value={formData.subService}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-amber-500/50 rounded text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select specific issue - विशिष्ट समस्या चुनें</option>
                      {subServicesMap[formData.service].map((sub) => (
                        <option key={sub.value} value={sub.value}>
                          {sub.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 mb-2">
                    BRIEF DESCRIPTION - संक्षिप्त विवरण
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your legal issue - अपनी कानूनी समस्या संक्षेप में बताएं..."
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-slate-900 py-4 rounded font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Book Free Consultation - मुफ्त परामर्श बुक करें
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
            <p>© 2026 NyayMitra. All rights reserved.</p>
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