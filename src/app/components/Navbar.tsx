import { useState } from "react";
import { useNavigate } from "react-router";
import { Scale, User, LogOut, Menu, X } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  userType?: "client" | "lawyer" | "admin" | null;
  onLogout?: () => void;
}

export function Navbar({ isAuthenticated = false, userType = null, onLogout }: NavbarProps) {
  const navigate = useNavigate();
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
      navigate("/lawyer");
    } else if (userType === "admin") {
      navigate("/admin");
    }
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-amber-500 p-2 rounded">
              <Scale className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-xl font-bold text-white">LegalConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-slate-300 hover:text-amber-500 transition-colors"
            >
              Home
            </button>
            <button className="text-slate-300 hover:text-amber-500 transition-colors">
              Services
            </button>
            <button className="text-slate-300 hover:text-amber-500 transition-colors">
              How It Works
            </button>
            <button className="text-slate-300 hover:text-amber-500 transition-colors">
              Contact
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-slate-300 hover:text-white transition-colors"
                >
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
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors"
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
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
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2"
            >
              Home
            </button>
            <button className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2">
              Services
            </button>
            <button className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2">
              How It Works
            </button>
            <button className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2">
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
                    className="block w-full text-left text-slate-300 hover:text-white transition-colors py-2"
                  >
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
                      handleProfileClick();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2"
                  >
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
