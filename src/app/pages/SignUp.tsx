import { useState } from "react";
import { useNavigate } from "react-router";
import { Scale, Mail, Lock, User, Briefcase, Phone } from "lucide-react";

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [userType, setUserType] = useState<"client" | "lawyer">("client");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Simulate signup - in real app, this would register with backend
    if (userType === "client") {
      navigate("/client");
    } else if (userType === "lawyer") {
      navigate("/lawyer");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
          <p className="text-slate-400">Join our legal community today</p>
        </div>

        {/* Signup Form */}
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
                <span className="block text-xs text-slate-400 mt-1">
                  Seeking legal help
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
                <span className="block text-xs text-slate-400 mt-1">
                  Providing legal services
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-slate-300 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Someone Example"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-300 mb-2 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-slate-300 mb-2 font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-300 mb-2 font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 bg-slate-700 border-slate-600 rounded text-amber-500 focus:ring-amber-500"
              />
              <label className="ml-2 text-slate-300 text-sm">
                I agree to the{" "}
                <button type="button" className="text-amber-500 hover:text-amber-400">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-amber-500 hover:text-amber-400">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-slate-400">Already have an account? </span>
            <button
              onClick={() => navigate("/login")}
              className="text-amber-500 hover:text-amber-400 font-medium"
            >
              Sign In
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
