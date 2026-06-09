/* eslint-disable react-hooks/static-components */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import NavLogo3D from "../three/NavLogo3D";

export default function Sidebar({ links, role }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleColors = {
    patient: "from-blue-600 to-blue-800",
    medecin: "from-green-600 to-green-800",
    admin: "from-purple-600 to-purple-800",
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`bg-linear-to-br ${roleColors[role] || roleColors.patient} p-6`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-lg">
            {user?.nom?.[0] || "U"}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{user?.nom || "Utilisateur"}</p>
            <p className="text-white/60 text-xs capitalize">{user?.role || role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`
            }>
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
        <button onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
          {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          {theme === "dark" ? "Mode clair" : "Mode sombre"}
        </button>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
          <FiLogOut size={16} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 fixed left-0 top-0 z-40">
      {/* Logo */}
<div className="px-4 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
  <NavLogo3D />
  <span className="font-bold text-base text-red-500 dark:text-red-400">
    Clinique Santé Togo
  </span>
</div>
        
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
       <div className="flex items-center gap-2">
  <NavLogo3D />
  <span className="font-bold text-base text-red-500 dark:text-red-400">CST</span>
</div>
        <button onClick={() => setOpen(true)} className="p-2 rounded-lg text-slate-500">
          <FiMenu size={22} />
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50" />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-800 z-50 flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-bold text-xl text-blue-600 dark:text-sky-400">Clinique Santé Togonique Santé Togo</span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg text-slate-500">
                  <FiX size={20} />
                </button>
              </div>
              
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}