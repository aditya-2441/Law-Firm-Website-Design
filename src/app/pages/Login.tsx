import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Scale, Mail, Lock, User, Briefcase, ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export function Login() {
  const navigate = useNavigate();
  
  // State Management
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [userType, setUserType] = useState<"client" | "lawyer">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [otpError, setOtpError] = useState("");

  // Timer for Resend OTP
  useEffect(() => {
    if (countdown > 0 && step === "otp") {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, step]);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // TODO: In Phase 2, verify email/password via backend API here.
    // If credentials match, the backend will trigger an OTP SMS to the user's phone.
    console.log(`Authenticating credentials for ${email}`);
    
    setStep("otp");
    setCountdown(30); // 30 seconds countdown for resend safety
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    // TODO: In Phase 2, send OTP to backend to verify and get session tokens
    console.log(`Verifying 2FA OTP ${otp} for user type: ${userType}`);

    if (userType === "client") {
      navigate("/client");
    } else if (userType === "lawyer") {
      navigate("/lawyer");
    }
  };

  const handleResendOTP = () => {
    // TODO: Request backend to send a fresh OTP to the user's phone number
    console.log("Resending OTP code to registered mobile number...");
    setCountdown(30);
    setOtpError("");
    setOtp("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Allow control keys (Backspace, Tab, Arrows, etc.) and copy/paste shortcuts
    const isControlKey = 
      ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Enter"].includes(e.key) || 
      e.metaKey || 
      e.ctrlKey || 
      e.altKey;

    // If it's not a control key and not a number (0-9), show error
    if (!isControlKey && !/^[0-9]$/.test(e.key)) {
      setOtpError("Please enter numbers only");
    } else {
      // Clear the error if they type a valid number or use a control key
      setOtpError("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-amber-500 p-3 rounded">
              <Scale className="w-8 h-8 text-slate-900" />
            </div>
            <span className="text-3xl font-bold text-white">LegalConnect</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === "credentials" ? "Welcome Back" : "Security Verification"}
          </h2>
          <p className="text-slate-400">
            {step === "credentials" 
              ? "Sign in to access your account" 
              : "Enter the 6-digit security code sent to your registered mobile number"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 shadow-xl relative">
          
          {/* STEP 1: CREDENTIALS (EMAIL & PASSWORD) */}
          {step === "credentials" && (
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

              <form onSubmit={handleCredentialsSubmit} className="space-y-5">
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

                {/* Auxiliary Controls */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 bg-slate-700 border-slate-600 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-slate-300">Remember me</span>
                  </label>
                  <button type="button" className="text-amber-500 hover:text-amber-400 transition-colors">
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors mt-2"
                >
                  Sign In
                </button>
              </form>
            </>
          )}

          {/* STEP 2: PHONE OTP VERIFICATION */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="flex flex-col items-center space-y-6">
              
              {/* Back to credentials button */}
              <button 
                type="button"
                onClick={() => {
                  setStep("credentials");
                  setOtp("");
                  setOtpError("");
                }}
                className="absolute top-4 left-4 text-slate-400 hover:text-white flex items-center text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </button>

              {/* Shadcn InputOTP Component with Keyboard Listener */}
              <div className="mt-4 flex flex-col items-center" onKeyDown={handleKeyDown}>
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={(value) => {
                    setOtp(value);
                    if (otpError) setOtpError(""); // Clear error when value successfully changes
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
                
                {/* Error Message Display */}
                <div className="h-6 mt-2">
                  {otpError && (
                    <p className="text-red-500 text-sm font-medium animate-pulse">
                      {otpError}
                    </p>
                  )}
                </div>
              </div>

              {/* Resend Logic */}
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

              {/* Verify Code Submit Button */}
              <button
                type="submit"
                disabled={otp.length !== 6}
                className="w-full bg-amber-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Login
              </button>
            </form>
          )}

          {/* Sign Up Footer Link */}
          {step === "credentials" && (
            <div className="mt-6 text-center">
              <span className="text-slate-400">Don't have an account? </span>
              <button
                onClick={() => navigate("/signup")}
                className="text-amber-500 hover:text-amber-400 font-medium"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Back to Home Navigation */}
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