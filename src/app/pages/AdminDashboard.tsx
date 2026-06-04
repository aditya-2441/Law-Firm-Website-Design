import { useState, useEffect } from "react";
import { Users, Briefcase, Activity, Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Navbar } from "../components/Navbar";

// Types for strong TypeScript checking
interface Lawyer {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  status: "Pending" | "Approved" | "Suspended";
  joinDate: string;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  type: "Client" | "Lawyer";
  status: "Active" | "Inactive";
  lastLogin: string;
}

interface SystemStat {
  label: string;
  value: string;
  change: string;
  icon: any;
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "lawyers" | "users">("overview");
  
  // Dynamic State Variables for API Integration
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState<SystemStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate Backend API Fetch
  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      
      // TODO: PHASE 2 - Replace with real API calls to your Node/MySQL backend
      // const statsRes = await axios.get('/api/admin/stats');
      // const lawyersRes = await axios.get('/api/admin/lawyers');
      // const usersRes = await axios.get('/api/admin/users');

      try {
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock DB Responses
        setStats([
          { label: "Total Users", value: "2,543", change: "+12.5%", icon: Users },
          { label: "Active Lawyers", value: "145", change: "+5.2%", icon: Briefcase },
          { label: "Platform Activity", value: "8,942", change: "+18.4%", icon: Activity },
          { label: "Pending Approvals", value: "12", change: "-2.1%", icon: Shield },
        ]);

        setLawyers([
          { id: 1, name: "David Wilson", specialization: "Corporate Law", experience: "15 years", status: "Pending", joinDate: "2026-06-01" },
          { id: 2, name: "Lisa Brown", specialization: "Family Law", experience: "8 years", status: "Approved", joinDate: "2026-05-15" },
          { id: 3, name: "Robert Taylor", specialization: "Criminal Defense", experience: "12 years", status: "Approved", joinDate: "2026-05-10" },
          { id: 4, name: "James Anderson", specialization: "Real Estate", experience: "5 years", status: "Suspended", joinDate: "2026-04-20" },
        ]);

        setUsers([
          { id: 1, name: "Alice Smith", email: "alice@email.com", type: "Client", status: "Active", lastLogin: "2 hours ago" },
          { id: 2, name: "Lisa Brown", email: "lisa@lawfirm.com", type: "Lawyer", status: "Active", lastLogin: "5 mins ago" },
          { id: 3, name: "Tom Wilson", email: "tom@email.com", type: "Client", status: "Inactive", lastLogin: "2 weeks ago" },
          { id: 4, name: "Robert Taylor", email: "robert@lawfirm.com", type: "Lawyer", status: "Active", lastLogin: "1 day ago" },
        ]);
      } catch (error) {
        console.error("Failed to fetch admin dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar isAuthenticated={true} userType="admin" />

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2 text-white">System Administration</h1>
          <p className="text-slate-400">Manage users, approve lawyers, and monitor platform activity</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="grid md:grid-cols-4 gap-6">
          {isLoading ? (
            // Skeleton Loaders for Stats
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 w-24 bg-slate-800 animate-pulse rounded"></div>
                  <div className="w-5 h-5 bg-slate-800 animate-pulse rounded-full"></div>
                </div>
                <div className="h-8 w-20 bg-slate-800 animate-pulse rounded mb-2"></div>
                <div className="h-3 w-16 bg-slate-800 animate-pulse rounded"></div>
              </div>
            ))
          ) : (
            stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400">{stat.label}</span>
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 mt-8 pb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          {/* Tab Navigation */}
          <div className="border-b border-slate-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "overview"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("lawyers")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "lawyers"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Lawyer Approvals
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "users"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                User Management
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
                <div className="h-16 bg-slate-800 animate-pulse rounded w-full opacity-30"></div>
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                
                {/* Overview Tab (Placeholder for Future Charts/Graphs) */}
                {activeTab === "overview" && (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Activity className="w-16 h-16 text-slate-700 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">System Analytics Overview</h3>
                    <p>Detailed charts and activity graphs will appear here.</p>
                  </div>
                )}

                {/* Lawyer Approvals Table */}
                {activeTab === "lawyers" && (
                  <table className="w-full text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Specialization</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Experience</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Join Date</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lawyers.map((lawyer) => (
                        <tr key={lawyer.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4 font-medium text-white">{lawyer.name}</td>
                          <td className="py-4 px-4 text-slate-400">{lawyer.specialization}</td>
                          <td className="py-4 px-4 text-slate-400">{lawyer.experience}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                lawyer.status === "Approved"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : lawyer.status === "Pending"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                            >
                              {lawyer.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-400">{lawyer.joinDate}</td>
                          <td className="py-4 px-4">
                            {lawyer.status === "Pending" ? (
                              <div className="flex gap-2">
                                <button className="text-emerald-500 hover:text-emerald-400 p-1 bg-emerald-500/10 rounded transition-colors" title="Approve">
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                                <button className="text-red-500 hover:text-red-400 p-1 bg-red-500/10 rounded transition-colors" title="Reject">
                                  <XCircle className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <button className="text-slate-400 hover:text-white font-medium transition-colors">
                                View Profile
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Users Management Table */}
                {activeTab === "users" && (
                  <table className="w-full text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">User</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Last Login</th>
                        <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-slate-500">{user.email}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.type === "Lawyer" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            }`}>
                              {user.type}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-slate-300">
                              <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                              {user.status}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-400">{user.lastLogin}</td>
                          <td className="py-4 px-4">
                            <button className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                              Manage
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