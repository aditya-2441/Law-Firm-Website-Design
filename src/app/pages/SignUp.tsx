import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Scale, Mail, Lock, User, Briefcase, Phone, ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export function SignUp() {
  const navigate = useNavigate();
  
  // Step & UI State
  const [step, setStep] = useState<"details" | "otp">("details");
  const [userType, setUserType] = useState<"client" | "lawyer">("client");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Timer for Resend OTP
  useEffect(() => {
    if (countdown > 0 && step === "otp") {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, step]);

  // Generic Keystroke Listener for Numbers Only (Used for Phone and OTP)
  const handleNumberValidation = (
    e: React.KeyboardEvent<HTMLDivElement | HTMLInputElement>, 
    setErrorState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const isControlKey = 
      ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter"].includes(e.key) || 
      e.metaKey || 
      e.ctrlKey || 
      e.altKey;

    if (!isControlKey && !/^[0-9]$/.test(e.key)) {
      setErrorState("Please enter numbers only");
    } else {
      setErrorState("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Specifically handle phone number to physically strip non-digits if pasted
    if (name === "phone") {
      setFormData({
        ...formData,
        [name]: value.replace(/\D/g, ''),
      });
      if (phoneError) setPhoneError("");
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Phase 2 - Save pending user in DB and send OTP to formData.phone
    console.log("Submitting details:", formData);
    
    setStep("otp");
    setCountdown(30);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    // TODO: Phase 2 - Verify OTP with backend to activate the account
    console.log(`Verifying Registration OTP ${otp} for: ${formData.phone}`);

    if (userType === "client") {
      navigate("/client");
    } else if (userType === "lawyer") {
      navigate("/lawyer");
    }
  };

  const handleResendOTP = () => {
    // TODO: Phase 2 - Request backend to send a fresh OTP
    console.log("Resending OTP code...");
    setCountdown(30);
    setOtpError("");
    setOtp("");
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
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === "details" ? "Create Your Account" : "Verify Your Phone"}
          </h2>
          <p className="text-slate-400">
            {step === "details" 
              ? "Join our legal community today" 
              : `We sent a 6-digit code to ${formData.phone}`}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-xl relative">
          
          {/* STEP 1: REGISTRATION DETAILS */}
          {step === "details" && (
            <>
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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="relative">
                  <label className="block text-slate-300 mb-2 font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onKeyDown={(e) => handleNumberValidation(e, setPhoneError)}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      maxLength={10}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  {/* Phone Error Message - Positioned absolutely to prevent layout shifting and gap issues */}
                  <div className="absolute -bottom-5 left-1">
                    {phoneError && (
                      <p className="text-red-500 text-xs font-medium animate-pulse">
                        {phoneError}
                      </p>
                    )}
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
            </>
          )}

          {/* STEP 2: PHONE OTP VERIFICATION */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="flex flex-col items-center space-y-6">
              
              <button 
                type="button"
                onClick={() => {
                  setStep("details");
                  setOtp("");
                  setOtpError("");
                }}
                className="absolute top-4 left-4 text-slate-400 hover:text-white flex items-center text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>

              <div className="mt-4 flex flex-col items-center" onKeyDown={(e) => handleNumberValidation(e, setOtpError)}>
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={(value) => {
                    setOtp(value);
                    if (otpError) setOtpError("");
                  }} 
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot index={0} className="w-12 h-12 text-lg border-slate-400 bg-white text-black font-semibold rounded-md" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-lg border-slate-400 bg-white text-black font-semibold rounded-md" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-lg border-slate-400 bg-white text-black font-semibold rounded-md" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-lg border-slate-400 bg-white text-black font-semibold rounded-md" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-lg border-slate-400 bg-white text-black font-semibold rounded-md" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-lg border-slate-400 bg-white text-black font-semibold rounded-md" />
                  </InputOTPGroup>
                </InputOTP>
                
                <div className="h-6 mt-2">
                  {otpError && (
                    <p className="text-red-500 text-sm font-medium animate-pulse">
                      {otpError}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-center w-full">
                {countdown > 0 ? (
                  <p className="text-slate-400 text-sm">
                    Resend code in <span className="text-amber-500 font-medium">00:{countdown.toString().padStart(2, '0')}</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors"
                  >
                    Didn't receive a code? Resend
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={otp.length !== 6}
                className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Complete Setup
              </button>
            </form>
          )}

          {/* Login Link (Only show on details step) */}
          {step === "details" && (
            <div className="mt-6 text-center">
              <span className="text-slate-400">Already have an account? </span>
              <button
                onClick={() => navigate("/login")}
                className="text-amber-500 hover:text-amber-400 font-medium"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-slate-300 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}