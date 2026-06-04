import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  MessageSquare, 
  User, 
  Briefcase, 
  Calendar, 
  FileText, 
  Loader2,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Lock,
  Edit3
} from "lucide-react";
import { Navbar } from "../components/Navbar";

// Types defined for strong TypeScript checking
interface LawyerProfile {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
  barCouncilId: string;
  location: string;
  status: "Verified" | "Pending";
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  caseType: string;
  status: "Active" | "Pending" | "Closed";
  lastContact: string;
}

interface Case {
  id: number;
  clientName: string;
  caseType: string;
  status: "In Progress" | "Under Review" | "Resolved";
  filingDate: string;
  nextHearing: string;
  priority: "High" | "Medium" | "Low";
}

export function LawyerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"clients" | "cases">("clients");
  
  // Dynamic State Variables
  const [profile, setProfile] = useState<LawyerProfile | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate Backend API Fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // TODO: Phase 2 - Replace with real API calls:
      // const profileRes = await axios.get('/api/lawyer/profile');
      // const clientsRes = await axios.get('/api/lawyer/clients');
      // const casesRes = await axios.get('/api/lawyer/cases');
      
      try {
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock DB Responses
        setProfile({
          name: "Adv. Priya Sharma",
          email: "priya.sharma@nyaymitra.in",
          phone: "+91 98765 43210",
          specialization: "Divorce & Family Law",
          experience: "12 Years",
          barCouncilId: "D/1234/2010",
          location: "New Delhi, India",
          status: "Verified"
        });

        setClients([
          { id: 1, name: "Rajesh Kumar", email: "rajesh.k@email.com", phone: "+91 91234 56789", caseType: "Property Dispute", status: "Active", lastContact: "2026-06-02" },
          { id: 2, name: "Anita Desai", email: "anita.d@email.com", phone: "+91 92345 67890", caseType: "Family Law", status: "Active", lastContact: "2026-06-01" },
          { id: 3, name: "Vikram Singh", email: "v.singh@email.com", phone: "+91 93456 78901", caseType: "Business Contract", status: "Pending", lastContact: "2026-05-28" },
        ]);

        setCases([
          { id: 1, clientName: "Rajesh Kumar", caseType: "Property Dispute", status: "In Progress", filingDate: "2026-04-15", nextHearing: "2026-06-15", priority: "High" },
          { id: 2, clientName: "Anita Desai", caseType: "Mutual Divorce", status: "Under Review", filingDate: "2026-05-20", nextHearing: "2026-07-05", priority: "Medium" },
          { id: 3, clientName: "Vikram Singh", caseType: "Contract Breach", status: "In Progress", filingDate: "2026-05-01", nextHearing: "2026-06-25", priority: "High" },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar isAuthenticated={true} userType="lawyer" />

      {/* Profile Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 pt-12 pb-20 relative">
        <div className="container mx-auto px-6">
          
          {isLoading || !profile ? (
            <div className="animate-pulse flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-slate-800 rounded-full"></div>
              <div className="space-y-3 flex-1">
                <div className="h-8 w-48 bg-slate-800 rounded"></div>
                <div className="h-4 w-32 bg-slate-800 rounded"></div>
                <div className="flex gap-4 pt-2">
                  <div className="h-4 w-24 bg-slate-800 rounded"></div>
                  <div className="h-4 w-24 bg-slate-800 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Left: Avatar & Name */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-slate-800 border-2 border-amber-500 rounded-full flex items-center justify-center text-3xl font-bold text-amber-500 shadow-lg shadow-amber-500/20 flex-shrink-0">
                  {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                    {profile.status === "Verified" && (
                      <span className="bg-emerald-500/10 text-emerald-500 text-xs px-2 py-1 rounded flex items-center gap-1 border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-amber-500 font-medium mb-3">{profile.specialization} • {profile.experience} Experience</p>
                  
                  {/* Private Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-slate-500" /> {profile.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-slate-500" /> {profile.phone}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-500" /> {profile.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-slate-500" /> ID: {profile.barCouncilId}</span>
                  </div>
                </div>
              </div>

              {/* Right: Privacy Alert & Edit Button */}
              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <div className="bg-slate-950/50 border border-slate-700 p-3 rounded-lg flex items-start gap-3 max-w-xs">
                  <Lock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white block mb-0.5">Privacy Protected</strong>
                    Your contact details and Bar ID are hidden from the public. They are only revealed to clients after you accept their case.
                  </p>
                </div>
                <button className="text-slate-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Total Clients</span>
              <User className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading ? (
               <div className="h-9 w-16 bg-slate-800 animate-pulse rounded mt-1"></div>
            ) : (
              <>
                <p className="text-3xl font-bold text-white">{clients.length}</p>
                <p className="text-sm text-slate-500 mt-1">+2 this month</p>
              </>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Active Cases</span>
              <Briefcase className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading ? (
               <div className="h-9 w-16 bg-slate-800 animate-pulse rounded mt-1"></div>
            ) : (
              <>
                <p className="text-3xl font-bold text-white">
                  {cases.filter((c) => c.status === "In Progress").length}
                </p>
                <p className="text-sm text-slate-500 mt-1">Currently ongoing</p>
              </>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Pending Review</span>
              <FileText className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading ? (
               <div className="h-9 w-16 bg-slate-800 animate-pulse rounded mt-1"></div>
            ) : (
              <>
                <p className="text-3xl font-bold text-white">
                  {cases.filter((c) => c.status === "Under Review").length}
                </p>
                <p className="text-sm text-slate-500 mt-1">Requires your attention</p>
              </>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Next Hearing</span>
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading ? (
               <div className="h-9 w-16 bg-slate-800 animate-pulse rounded mt-1"></div>
            ) : (
              <>
                <p className="text-xl font-bold text-white pt-1">
                  Jun 15, 2026
                </p>
                <p className="text-sm text-slate-500 mt-1">Rajesh Kumar Case</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-6 mt-8 pb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          <div className="border-b border-slate-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("clients")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "clients"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                My Active Clients
              </button>
              <button
                onClick={() => setActiveTab("cases")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "cases"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Case Management
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              // Loading Skeleton for Tables
              <div className="space-y-4">
                <div className="h-8 bg-slate-800 animate-pulse rounded w-full"></div>
                <div className="h-16 bg-slate-800 animate-pulse rounded w-full opacity-70"></div>
                <div className="h-16 bg-slate-800 animate-pulse rounded w-full opacity-50"></div>
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Clients Table */}
                {activeTab === "clients" && (
                  <table className="w-full text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Client Name</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Contact Info</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Case Type</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-white">{client.name}</td>
                          <td className="py-4 px-4">
                            <div className="text-slate-300">{client.email}</div>
                            <div className="text-slate-500 text-sm">{client.phone}</div>
                          </td>
                          <td className="py-4 px-4 text-slate-400">{client.caseType}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                client.status === "Active"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : client.status === "Pending"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-slate-700/30 text-slate-400 border border-slate-600/30"
                              }`}
                            >
                              {client.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => navigate("/conversations")}
                              className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-2"
                            >
                              <MessageSquare className="w-4 h-4" /> Message
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Cases Table */}
                {activeTab === "cases" && (
                  <table className="w-full text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Client Name</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Case Details</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Next Hearing</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.map((caseItem) => (
                        <tr key={caseItem.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-white">{caseItem.clientName}</td>
                          <td className="py-4 px-4">
                            <div className="text-slate-300">{caseItem.caseType}</div>
                            <div className="text-slate-500 text-sm">Filed: {caseItem.filingDate}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                caseItem.status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : caseItem.status === "Under Review"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              {caseItem.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-400">
                            {caseItem.nextHearing !== "-" ? (
                               <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {caseItem.nextHearing}</span>
                            ) : (
                               "-"
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                              Update Case
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}