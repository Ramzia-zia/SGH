import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { ROUTES } from "../../constants";
import NavLogo3D from "../three/NavLogo3D";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
<Link to={ROUTES.HOME} className="flex items-center gap-2">
  <NavLogo3D />
    
</Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors text-sm font-medium">Services</a>
            <a href="#medecins" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors text-sm font-medium">Médecins</a>
            <a href="#fonctionnalites" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors text-sm font-medium">Fonctionnalités</a>
            <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors text-sm font-medium">FAQ</a>
          </div>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <Link to={ROUTES.LOGIN} className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
              Connexion
            </Link>
            <Link to={ROUTES.REGISTER} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Inscription
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400">
              {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-slate-500 dark:text-slate-400">
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-4 flex flex-col gap-4">
          <a href="#services" onClick={() => setMenuOpen(false)} className="text-slate-600 dark:text-slate-300 text-sm font-medium">Services</a>
          <a href="#medecins" onClick={() => setMenuOpen(false)} className="text-slate-600 dark:text-slate-300 text-sm font-medium">Médecins</a>
          <a href="#fonctionnalites" onClick={() => setMenuOpen(false)} className="text-slate-600 dark:text-slate-300 text-sm font-medium">Fonctionnalités</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="text-slate-600 dark:text-slate-300 text-sm font-medium">FAQ</a>
          <div className="flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
            <Link to={ROUTES.LOGIN} className="flex-1 text-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg">Connexion</Link>
            <Link to={ROUTES.REGISTER} className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">Inscription</Link>
          </div>
        </div>
      )}
    </nav>
  );
}