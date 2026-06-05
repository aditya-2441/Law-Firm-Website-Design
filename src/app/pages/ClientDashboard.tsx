import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  MessageSquare, 
  User, 
  Briefcase, 
  Calendar, 
  Loader2,
  Mail,
  Phone,
  FileText,
  CreditCard,
  CheckCircle
} from "lucide-react";
import { Navbar } from "../components/Navbar";

// Interfaces for strong typing
interface ClientProfile {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
}

interface HiredLawyer {
  id: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
}

interface Case {
  id: number;
  caseType: string;
  lawyerName: string;
  status: "In Progress" | "Under Review" | "Resolved";
  filingDate: string;
  nextHearing: string;
}

export function ClientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"cases" | "lawyers">("cases");
  
  // State Variables
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [myCases, setMyCases] = useState<Case[]>([]);
  const [myLawyers, setMyLawyers] = useState<HiredLawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate Fetching from Database
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        
        setProfile({
          name: "Rajesh Kumar",
          email: "rajesh.k@email.com",
          phone: "+91 91234 56789",
          joinDate: "Joined March 2026",
        });

        setMyCases([
          { id: 1, caseType: "Property Dispute", lawyerName: "Adv. Amit Patel", status: "In Progress", filingDate: "2026-04-15", nextHearing: "2026-06-15" },
          { id: 2, caseType: "Mutual Divorce", lawyerName: "Adv. Priya Sharma", status: "Under Review", filingDate: "2026-05-20", nextHearing: "2026-07-05" },
        ]);

        setMyLawyers([
          { id: 1, name: "Adv. Amit Patel", specialization: "Real Estate & Property", email: "amit.patel@nyaymitra.in", phone: "+91 98765 11111" },
          { id: 2, name: "Adv. Priya Sharma", specialization: "Divorce & Family Law", email: "priya.sharma@nyaymitra.in", phone: "+91 98765 43210" },
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
      <Navbar isAuthenticated={true} userType="client" onLogout={() => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userType");
        navigate("/");
      }}/>

      {/* Profile Header Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 pt-12 pb-20 relative">
        <div className="container mx-auto px-6">
          
          {isLoading || !profile ? (
            <div className="animate-pulse flex items-center gap-6">
              <div className="w-24 h-24 bg-slate-800 rounded-full"></div>
              <div className="space-y-3">
                <div className="h-8 w-48 bg-slate-800 rounded"></div>
                <div className="h-4 w-32 bg-slate-800 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-slate-800 border-2 border-amber-500 rounded-full flex items-center justify-center text-3xl font-bold text-amber-500 shadow-lg shadow-amber-500/20">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-slate-500" /> {profile.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-4 h-4 text-slate-500" /> {profile.phone}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-slate-500" /> {profile.joinDate}</span>
                  </div>
                </div>
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
              <span className="text-slate-400">Active Cases</span>
              <Briefcase className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading ? <div className="h-9 w-16 bg-slate-800 animate-pulse rounded mt-1"></div> : (
              <p className="text-3xl font-bold text-white">{myCases.filter(c => c.status !== "Resolved").length}</p>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Next Hearing</span>
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading ? <div className="h-9 w-16 bg-slate-800 animate-pulse rounded mt-1"></div> : (
              <>
                <p className="text-xl font-bold text-white pt-1">Jun 15, 2026</p>
                <p className="text-sm text-slate-500 mt-1">Property Dispute</p>
              </>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Total Lawyers</span>
              <User className="w-5 h-5 text-amber-500" />
            </div>
            {isLoading ? <div className="h-9 w-16 bg-slate-800 animate-pulse rounded mt-1"></div> : (
              <p className="text-3xl font-bold text-white">{myLawyers.length}</p>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Pending Payments</span>
              <CreditCard className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-emerald-400 flex items-center gap-2">
               <CheckCircle className="w-6 h-6"/> All Paid
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-6 mt-8 pb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          <div className="border-b border-slate-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("cases")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "cases"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                My Cases
              </button>
              <button
                onClick={() => setActiveTab("lawyers")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "lawyers"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                My Legal Team
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* My Cases Table */}
                {activeTab === "cases" && (
                  <table className="w-full text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Case Type</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Lawyer Assigned</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Next Hearing</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myCases.map((c) => (
                        <tr key={c.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-medium text-white">{c.caseType}</div>
                            <div className="text-slate-500 text-sm">Filed: {c.filingDate}</div>
                          </td>
                          <td className="py-4 px-4 text-slate-300">{c.lawyerName}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                c.status === "In Progress" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : c.status === "Under Review" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-400">
                             {c.nextHearing !== "-" ? <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {c.nextHearing}</span> : "-"}
                          </td>
                          <td className="py-4 px-4 flex items-center gap-4">
                            <button className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-medium text-sm">
                              <FileText className="w-4 h-4" /> Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* My Lawyers Table */}
                {activeTab === "lawyers" && (
                  <table className="w-full text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Lawyer Name</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Specialization</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Direct Contact Info</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myLawyers.map((lawyer) => (
                        <tr key={lawyer.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-white">{lawyer.name}</td>
                          <td className="py-4 px-4 text-slate-400">{lawyer.specialization}</td>
                          <td className="py-4 px-4">
                            <div className="text-slate-300">{lawyer.email}</div>
                            <div className="text-slate-500 text-sm">{lawyer.phone}</div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}