import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants";
import ProtectedRoute from "./ProtectedRoute";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import PatientLayout from "../layouts/PatientLayout";
import MedecinLayout from "../layouts/MedecinLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public pages
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OTP from "../pages/auth/OTP";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Patient pages
import PatientDashboard from "../pages/patient/Dashboard";
import PatientAppointments from "../pages/patient/Appointments";
import PatientDossier from "../pages/patient/Dossier";
import PatientOrdonnances from "../pages/patient/Ordonnances";
import PatientProfile from "../pages/patient/Profile";

// Medecin pages
import MedecinDashboard from "../pages/medecin/Dashboard";
import MedecinPatients from "../pages/medecin/Patients";
import MedecinConsultations from "../pages/medecin/Consultations";
import MedecinOrdonnances from "../pages/medecin/Ordonnances";
import MedecinPlanning from "../pages/medecin/Planning";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminPatients from "../pages/admin/Patients";
import AdminMedecins from "../pages/admin/Medecins";
import AdminAppointments from "../pages/admin/Appointments";
import AdminStats from "../pages/admin/Stats";
import AdminAudit from "../pages/admin/Audit";

// Error pages
import NotFound from "../pages/errors/NotFound";
import Forbidden from "../pages/errors/Forbidden";
import ServerError from "../pages/errors/ServerError";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.OTP} element={<OTP />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>

        {/* Patient */}
        <Route path="/patient" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to={ROUTES.PATIENT_DASHBOARD} />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="rendez-vous" element={<PatientAppointments />} />
          <Route path="dossier" element={<PatientDossier />} />
          <Route path="ordonnances" element={<PatientOrdonnances />} />
          <Route path="profil" element={<PatientProfile />} />
        </Route>

        {/* Medecin */}
        <Route path="/medecin" element={
          <ProtectedRoute allowedRoles={["medecin"]}>
            <MedecinLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to={ROUTES.MEDECIN_DASHBOARD} />} />
          <Route path="dashboard" element={<MedecinDashboard />} />
          <Route path="patients" element={<MedecinPatients />} />
          <Route path="consultations" element={<MedecinConsultations />} />
          <Route path="ordonnances" element={<MedecinOrdonnances />} />
          <Route path="planning" element={<MedecinPlanning />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to={ROUTES.ADMIN_DASHBOARD} />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="utilisateurs" element={<AdminUsers />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="medecins" element={<AdminMedecins />} />
          <Route path="rendez-vous" element={<AdminAppointments />} />
          <Route path="statistiques" element={<AdminStats />} />
          <Route path="audit" element={<AdminAudit />} />
        </Route>

        {/* Errors */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.FORBIDDEN} element={<Forbidden />} />
        <Route path={ROUTES.SERVER_ERROR} element={<ServerError />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} />} />
      </Routes>
    </BrowserRouter>
  );
}