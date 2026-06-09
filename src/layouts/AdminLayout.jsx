import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { FiGrid, FiUsers, FiUserCheck, FiCalendar, FiBarChart2, FiShield } from "react-icons/fi";

const adminLinks = [
  { to: "/admin/dashboard", icon: <FiGrid />, label: "Tableau de bord" },
  { to: "/admin/utilisateurs", icon: <FiUsers />, label: "Utilisateurs" },
  { to: "/admin/patients", icon: <FiUserCheck />, label: "Patients" },
  { to: "/admin/medecins", icon: <FiUserCheck />, label: "Médecins" },
  { to: "/admin/rendez-vous", icon: <FiCalendar />, label: "Rendez-vous" },
  { to: "/admin/statistiques", icon: <FiBarChart2 />, label: "Statistiques" },
  { to: "/admin/audit", icon: <FiShield />, label: "Journal d'audit" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar links={adminLinks} role="admin" />
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}