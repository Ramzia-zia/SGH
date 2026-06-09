import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
// eslint-disable-next-line no-unused-vars
import { FiGrid, FiCalendar, FiFolder, FiFileText, FiUser, FiSettings } from "react-icons/fi";

const patientLinks = [
  { to: "/patient/dashboard", icon: <FiGrid />, label: "Tableau de bord" },
  { to: "/patient/rendez-vous", icon: <FiCalendar />, label: "Rendez-vous" },
  { to: "/patient/dossier", icon: <FiFolder />, label: "Dossier médical" },
  { to: "/patient/ordonnances", icon: <FiFileText />, label: "Ordonnances" },
  { to: "/patient/profil", icon: <FiUser />, label: "Mon profil" },
];

export default function PatientLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar links={patientLinks} role="patient" />
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}