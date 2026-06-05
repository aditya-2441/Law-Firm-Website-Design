import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { 
  Scale, 
  User, 
  LogOut, 
  Menu, 
  X, 
  MessageSquare,
  Home,
  Briefcase,
  HelpCircle,
  Phone
} from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  userType?: "client" | "lawyer" | "admin" | null;
  onLogout?: () => void;
}

export function Navbar({ isAuthenticated = false, userType = null, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  const handleProfileClick = () => {
    if (userType === "client") {
      navigate("/client");
    } else if (userType === "lawyer") {
      navigate("/lawyer/dashboard");
    } else if (userType === "admin") {
      navigate("/admin");
    }
  };

  // Determine where "Home" should go based on user type
  const isLawyerLoggedIn = isAuthenticated && userType === "lawyer";
  const homeRoute = isLawyerLoggedIn ? "/lawyer" : "/";

  // Smart Navigation Handler
  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);

    // Handle clicking Home or Logo
    if (target === "home") {
      if (location.pathname === homeRoute) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(homeRoute);
      }
      return;
    }

    // Handle clicking Services, How It Works, or Contact
    if (location.pathname === "/") {
      // If already on Home page, just scroll smoothly
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, route to Home and pass the target ID in the state
      navigate("/", { state: { scrollTo: target } });
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo (Stays on the far left) */}
          <div
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-amber-500 p-2 rounded">
              <Scale className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-xl font-bold text-white">NyayMitra</span>
          </div>

          {/* RIGHT SIDE GROUP: Navigation + Auth Buttons */}
          <div className="hidden md:flex items-center gap-10">
            
            {/* Desktop Navigation Links */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => handleNavClick("home")}
                className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors font-medium"
              >
                <Home className="w-5 h-5" />
                Home
              </button>
              
              {/* Hide these links if a lawyer is logged in */}
              {!isLawyerLoggedIn && (
                <>
                  <button 
                    onClick={() => handleNavClick("services")}
                    className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    <Briefcase className="w-5 h-5" />
                    Services
                  </button>
                  <button 
                    onClick={() => handleNavClick("how-it-works")}
                    className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    <HelpCircle className="w-5 h-5" />
                    How It Works
                  </button>
                </>
              )}

              <button 
                onClick={() => handleNavClick("contact")}
                className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                Contact
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-6">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    <User className="w-5 h-5" />
                    Log In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="bg-amber-500 text-slate-900 px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/conversations")}
                    className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Messages
                  </button>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
            >
              <Home className="w-5 h-5" />
              Home
            </button>

            {/* Hide these links if a lawyer is logged in */}
            {!isLawyerLoggedIn && (
              <>
                <button 
                  onClick={() => handleNavClick("services")}
                  className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
                >
                  <Briefcase className="w-5 h-5" />
                  Services
                </button>
                <button 
                  onClick={() => handleNavClick("how-it-works")}
                  className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
                >
                  <HelpCircle className="w-5 h-5" />
                  How It Works
                </button>
              </>
            )}

            <button 
              onClick={() => handleNavClick("contact")}
              className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
            >
              <Phone className="w-5 h-5" />
              Contact
            </button>
            <div className="border-t border-slate-700 pt-3 mt-3">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-white transition-colors py-2 font-medium"
                  >
                    <User className="w-5 h-5" />
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full bg-amber-500 text-slate-900 px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold mt-2"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/conversations");
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Messages
                  </button>
                  <button
                    onClick={() => {
                      handleProfileClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}