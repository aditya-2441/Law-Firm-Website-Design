import { useState } from "react";
import { useNavigate } from "react-router";
import { Users, Scale, UserPlus, Link2, X, Check } from "lucide-react";
import { Navbar } from "../components/Navbar";

interface Lawyer {
  id: number;
  name: string;
  email: string;
  specialization: string;
  activeCases: number;
  status: "Active" | "Inactive";
}

interface Client {
  id: number;
  name: string;
  email: string;
  assignedLawyer: string | null;
  caseType: string;
  status: "Active" | "Pending" | "Closed";
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"lawyers" | "clients" | "access">("lawyers");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);

  const [lawyers, setLawyers] = useState<Lawyer[]>([
    {
      id: 1,
      name: "Robert Williams",
      email: "r.williams@legalconnect.com",
      specialization: "Property Law",
      activeCases: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Jennifer Davis",
      email: "j.davis@legalconnect.com",
      specialization: "Family Law",
      activeCases: 5,
      status: "Active",
    },
    {
      id: 3,
      name: "David Martinez",
      email: "d.martinez@legalconnect.com",
      specialization: "Business Law",
      activeCases: 2,
      status: "Active",
    },
    {
      id: 4,
      name: "Lisa Anderson",
      email: "l.anderson@legalconnect.com",
      specialization: "Employment Law",
      activeCases: 4,
      status: "Inactive",
    },
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "John Anderson",
      email: "john.anderson@email.com",
      assignedLawyer: "Robert Williams",
      caseType: "Property Dispute",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Martinez",
      email: "sarah.m@email.com",
      assignedLawyer: "Jennifer Davis",
      caseType: "Family Law",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@email.com",
      assignedLawyer: null,
      caseType: "Business Contract",
      status: "Pending",
    },
    {
      id: 4,
      name: "Emma Thompson",
      email: "emma.t@email.com",
      assignedLawyer: "Lisa Anderson",
      caseType: "Employment Law",
      status: "Closed",
    },
    {
      id: 5,
      name: "Alex Johnson",
      email: "alex.j@email.com",
      assignedLawyer: null,
      caseType: "Criminal Defense",
      status: "Pending",
    },
  ]);

  const handleConnect = () => {
    if (selectedClient && selectedLawyer) {
      const lawyer = lawyers.find((l) => l.id === selectedLawyer);
      setClients((prev) =>
        prev.map((client) =>
          client.id === selectedClient
            ? { ...client, assignedLawyer: lawyer?.name || null, status: "Active" }
            : client
        )
      );
      setShowConnectModal(false);
      setSelectedClient(null);
      setSelectedLawyer(null);
    }
  };

  const toggleLawyerStatus = (lawyerId: number) => {
    setLawyers((prev) =>
      prev.map((lawyer) =>
        lawyer.id === lawyerId
          ? { ...lawyer, status: lawyer.status === "Active" ? "Inactive" : "Active" }
          : lawyer
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar isAuthenticated={true} userType="admin" />

      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2 text-white">Super Admin Dashboard</h1>
          <p className="text-slate-400">Manage lawyers, clients, and platform access</p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Total Lawyers</span>
              <Scale className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">{lawyers.length}</p>
            <p className="text-sm text-slate-500 mt-1">Registered attorneys</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Total Clients</span>
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">{clients.length}</p>
            <p className="text-sm text-slate-500 mt-1">Active users</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Active Lawyers</span>
              <Check className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              {lawyers.filter((l) => l.status === "Active").length}
            </p>
            <p className="text-sm text-slate-500 mt-1">Currently available</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Unassigned Clients</span>
              <UserPlus className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-white">
              {clients.filter((c) => !c.assignedLawyer).length}
            </p>
            <p className="text-sm text-slate-500 mt-1">Awaiting assignment</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 mt-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="border-b border-slate-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab("lawyers")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "lawyers"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Lawyers
              </button>
              <button
                onClick={() => setActiveTab("clients")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "clients"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Clients
              </button>
              <button
                onClick={() => setActiveTab("access")}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === "access"
                    ? "text-amber-500 border-b-2 border-amber-500 bg-slate-800"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Access Management
              </button>
            </div>
          </div>

          {/* Lawyers List */}
          {activeTab === "lawyers" && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                        Specialization
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                        Active Cases
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lawyers.map((lawyer) => (
                      <tr key={lawyer.id} className="border-b border-slate-800 hover:bg-slate-800">
                        <td className="py-4 px-4 font-medium text-white">{lawyer.name}</td>
                        <td className="py-4 px-4 text-slate-400">{lawyer.email}</td>
                        <td className="py-4 px-4 text-slate-400">{lawyer.specialization}</td>
                        <td className="py-4 px-4 text-slate-400">{lawyer.activeCases}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              lawyer.status === "Active"
                                ? "bg-green-500 bg-opacity-20 text-green-400 border border-green-500"
                                : "bg-slate-700 text-slate-400 border border-slate-600"
                            }`}
                          >
                            {lawyer.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => toggleLawyerStatus(lawyer.id)}
                            className="text-amber-500 hover:text-amber-400 font-medium"
                          >
                            {lawyer.status === "Active" ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Clients List */}
          {activeTab === "clients" && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">
                        Assigned Lawyer
                      </th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Case Type</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.id} className="border-b border-slate-800 hover:bg-slate-800">
                        <td className="py-4 px-4 font-medium text-white">{client.name}</td>
                        <td className="py-4 px-4 text-slate-400">{client.email}</td>
                        <td className="py-4 px-4 text-slate-400">
                          {client.assignedLawyer || (
                            <span className="text-orange-400 italic">Unassigned</span>
                          )}
                        </td>
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
                        <td className="py-4 px-4">
                          <button
                            onClick={() => {
                              setSelectedClient(client.id);
                              setShowConnectModal(true);
                            }}
                            className="text-amber-500 hover:text-amber-400 font-medium"
                          >
                            {client.assignedLawyer ? "Reassign" : "Assign Lawyer"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Access Management */}
          {activeTab === "access" && (
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Connect Clients with Lawyers</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Unassigned Clients */}
                <div>
                  <h4 className="font-semibold text-slate-300 mb-4">Unassigned Clients</h4>
                  <div className="space-y-3">
                    {clients
                      .filter((c) => !c.assignedLawyer)
                      .map((client) => (
                        <div
                          key={client.id}
                          className="bg-slate-800 border border-slate-700 p-4 rounded-lg"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-white">{client.name}</p>
                              <p className="text-sm text-slate-400">{client.caseType}</p>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedClient(client.id);
                                setShowConnectModal(true);
                              }}
                              className="bg-amber-500 text-slate-900 px-4 py-2 rounded hover:bg-amber-600 transition-colors text-sm flex items-center gap-2"
                            >
                              <Link2 className="w-4 h-4" />
                              Assign
                            </button>
                          </div>
                        </div>
                      ))}
                    {clients.filter((c) => !c.assignedLawyer).length === 0 && (
                      <p className="text-slate-500 italic">All clients are assigned to lawyers</p>
                    )}
                  </div>
                </div>

                {/* Available Lawyers */}
                <div>
                  <h4 className="font-semibold text-slate-300 mb-4">Available Lawyers</h4>
                  <div className="space-y-3">
                    {lawyers
                      .filter((l) => l.status === "Active")
                      .map((lawyer) => (
                        <div
                          key={lawyer.id}
                          className="bg-slate-800 border border-amber-500 border-opacity-30 p-4 rounded-lg"
                        >
                          <p className="font-medium text-white">{lawyer.name}</p>
                          <p className="text-sm text-slate-400">{lawyer.specialization}</p>
                          <p className="text-sm text-amber-500 mt-1">
                            {lawyer.activeCases} active cases
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => {
                setShowConnectModal(false);
                setSelectedClient(null);
                setSelectedLawyer(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-amber-500 bg-opacity-20 p-4 rounded-full">
                <Link2 className="w-12 h-12 text-amber-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-white">
              Assign Lawyer to Client
            </h2>
            <p className="text-slate-400 text-center mb-6">
              Select a lawyer to assign to{" "}
              {clients.find((c) => c.id === selectedClient)?.name}
            </p>
            <div className="space-y-3 mb-6">
              {lawyers
                .filter((l) => l.status === "Active")
                .map((lawyer) => (
                  <div
                    key={lawyer.id}
                    onClick={() => setSelectedLawyer(lawyer.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedLawyer === lawyer.id
                        ? "border-amber-500 bg-amber-500 bg-opacity-10"
                        : "border-slate-700 hover:border-amber-500"
                    }`}
                  >
                    <p className="font-medium text-white">{lawyer.name}</p>
                    <p className="text-sm text-slate-400">{lawyer.specialization}</p>
                    <p className="text-sm text-slate-500 mt-1">{lawyer.activeCases} active cases</p>
                  </div>
                ))}
            </div>
            <button
              onClick={handleConnect}
              disabled={!selectedLawyer}
              className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Lawyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
