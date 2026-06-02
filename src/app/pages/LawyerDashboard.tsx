import { useState } from "react";
import { useNavigate } from "react-router";
import { MessageSquare, User, Briefcase, Calendar, FileText, TrendingUp } from "lucide-react";
import { Navbar } from "../components/Navbar";

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

  const clients: Client[] = [
    {
      id: 1,
      name: "John Anderson",
      email: "john.anderson@email.com",
      phone: "+1 (555) 123-4567",
      caseType: "Property Dispute",
      status: "Active",
      lastContact: "2026-05-30",
    },
    {
      id: 2,
      name: "Sarah Martinez",
      email: "sarah.m@email.com",
      phone: "+1 (555) 234-5678",
      caseType: "Family Law",
      status: "Active",
      lastContact: "2026-05-28",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 345-6789",
      caseType: "Business Contract",
      status: "Pending",
      lastContact: "2026-05-25",
    },
    {
      id: 4,
      name: "Emma Thompson",
      email: "emma.t@email.com",
      phone: "+1 (555) 456-7890",
      caseType: "Employment Law",
      status: "Closed",
      lastContact: "2026-05-20",
    },
  ];

  const cases: Case[] = [
    {
      id: 1,
      clientName: "John Anderson",
      caseType: "Property Dispute",
      status: "In Progress",
      filingDate: "2026-04-15",
      nextHearing: "2026-06-10",
      priority: "High",
    },
    {
      id: 2,
      clientName: "Sarah Martinez",
      caseType: "Family Law - Divorce",
      status: "Under Review",
      filingDate: "2026-03-20",
      nextHearing: "2026-06-05",
      priority: "Medium",
    },
    {
      id: 3,
      clientName: "Michael Chen",
      caseType: "Business Contract Dispute",
      status: "In Progress",
      filingDate: "2026-05-01",
      nextHearing: "2026-06-15",
      priority: "High",
    },
    {
      id: 4,
      clientName: "Emma Thompson",
      caseType: "Employment Termination",
      status: "Resolved",
      filingDate: "2026-02-10",
      nextHearing: "-",
      priority: "Low",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar isAuthenticated={true} userType="lawyer" />

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2 text-white">Welcome Back, Attorney</h1>
          <p className="text-slate-400">Manage your clients and cases efficiently</p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Total Clients</span>
              <User className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">{clients.length}</p>
            <p className="text-sm text-slate-500 mt-1">+2 this month</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Active Cases</span>
              <Briefcase className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              {cases.filter((c) => c.status === "In Progress").length}
            </p>
            <p className="text-sm text-slate-500 mt-1">In progress</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Pending Review</span>
              <FileText className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              {cases.filter((c) => c.status === "Under Review").length}
            </p>
            <p className="text-sm text-slate-500 mt-1">Requires attention</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Upcoming Hearings</span>
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              {cases.filter((c) => c.nextHearing !== "-").length}
            </p>
            <p className="text-sm text-slate-500 mt-1">Next 30 days</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 mt-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
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
                My Clients
              </button>
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
            </div>
          </div>

          {/* Clients List */}
          {activeTab === "clients" && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Phone</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Case Type</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Last Contact</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b border-slate-800 hover:bg-slate-800">
                        <td className="py-4 px-4 font-medium text-white">{client.name}</td>
                        <td className="py-4 px-4 text-slate-400">{client.email}</td>
                        <td className="py-4 px-4 text-slate-400">{client.phone}</td>
                        <td className="py-4 px-4 text-slate-400">{client.caseType}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              client.status === "Active"
                                ? "bg-green-500 bg-opacity-20 text-green-400 border border-green-500"
                                : client.status === "Pending"
                                ? "bg-yellow-500 bg-opacity-20 text-yellow-400 border border-yellow-500"
                                : "bg-slate-700 text-slate-400 border border-slate-600"
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-400">{client.lastContact}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => navigate("/conversations")}
                            className="text-amber-500 hover:text-amber-400 font-medium"
                          >
                            Message
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cases List */}
          {activeTab === "cases" && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Client Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Case Type</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Filing Date</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Next Hearing</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Priority</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((caseItem) => (
                      <tr key={caseItem.id} className="border-b border-slate-800 hover:bg-slate-800">
                        <td className="py-4 px-4 font-medium text-white">{caseItem.clientName}</td>
                        <td className="py-4 px-4 text-slate-400">{caseItem.caseType}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              caseItem.status === "In Progress"
                                ? "bg-blue-500 bg-opacity-20 text-blue-400 border border-blue-500"
                                : caseItem.status === "Under Review"
                                ? "bg-yellow-500 bg-opacity-20 text-yellow-400 border border-yellow-500"
                                : "bg-green-500 bg-opacity-20 text-green-400 border border-green-500"
                            }`}
                          >
                            {caseItem.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-400">{caseItem.filingDate}</td>
                        <td className="py-4 px-4 text-slate-400">{caseItem.nextHearing}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              caseItem.priority === "High"
                                ? "bg-red-500 bg-opacity-20 text-red-400 border border-red-500"
                                : caseItem.priority === "Medium"
                                ? "bg-orange-500 bg-opacity-20 text-orange-400 border border-orange-500"
                                : "bg-slate-700 text-slate-400 border border-slate-600"
                            }`}
                          >
                            {caseItem.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-amber-500 hover:text-amber-400 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
