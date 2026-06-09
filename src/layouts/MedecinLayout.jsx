import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { FiGrid, FiUsers, FiActivity, FiFileText, FiCalendar } from "react-icons/fi";

const medecinLinks = [
  { to: "/medecin/dashboard", icon: <FiGrid />, label: "Tableau de bord" },
  { to: "/medecin/patients", icon: <FiUsers />, label: "Patients" },
  { to: "/medecin/consultations", icon: <FiActivity />, label: "Consultations" },
  { to: "/medecin/ordonnances", icon: <FiFileText />, label: "Ordonnances" },
  { to: "/medecin/planning", icon: <FiCalendar />, label: "Mon Planning" },
];

export default function MedecinLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar links={medecinLinks} role="medecin" />
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}