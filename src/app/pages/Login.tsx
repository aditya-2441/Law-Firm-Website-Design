import { useState } from "react";
import { useNavigate } from "react-router";
import { Scale, Mail, Lock, User, Briefcase } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"client" | "lawyer">("client");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login - in real app, this would authenticate with backend
    if (userType === "client") {
      navigate("/client");
    } else if (userType === "lawyer") {
      navigate("/lawyer");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-amber-500 p-3 rounded">
              <Scale className="w-8 h-8 text-slate-900" />
            </div>
            <span className="text-3xl font-bold text-white">LegalConnect</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Sign in to access your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-xl">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-slate-300 mb-3 font-medium">I am a</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType("client")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === "client"
                    ? "border-amber-500 bg-slate-500 bg-opacity-10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <User className={`w-6 h-6 mx-auto mb-2 ${
                  userType === "client" ? "text-amber-500" : "text-slate-400"
                }`} />
                <span className={`block font-medium ${
                  userType === "client" ? "text-amber-500" : "text-slate-300"
                }`}>
                  Client
                </span>
              </button>
              <button
                type="button"
                onClick={() => setUserType("lawyer")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === "lawyer"
                    ? "border-amber-500 bg-slate-500 bg-opacity-10"
                    : "border-slate-600 hover:border-slate-500"
                }`}
              >
                <Briefcase className={`w-6 h-6 mx-auto mb-2 ${
                  userType === "lawyer" ? "text-amber-500" : "text-slate-400"
                }`} />
                <span className={`block font-medium ${
                  userType === "lawyer" ? "text-amber-500" : "text-slate-300"
                }`}>
                  Lawyer
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-slate-300 mb-2 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-slate-700 border-slate-600 rounded text-amber-500 focus:ring-amber-500"
                />
                <span className="ml-2 text-slate-300 text-sm">Remember me</span>
              </label>
              <button type="button" className="text-amber-500 hover:text-amber-400 text-sm">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-slate-400">Don't have an account? </span>
            <button
              onClick={() => navigate("/signup")}
              className="text-amber-500 hover:text-amber-400 font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-slate-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
