import { motion } from "framer-motion";
import { FiCalendar, FiFileText, FiActivity, FiClock, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stats = [
  { icon: <FiCalendar size={22} />, label: "Rendez-vous", value: "3", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400" },
  { icon: <FiActivity size={22} />, label: "Consultations", value: "12", color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-emerald-400" },
  { icon: <FiFileText size={22} />, label: "Ordonnances", value: "5", color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
  { icon: <FiAlertCircle size={22} />, label: "Allergies", value: "2", color: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" },
];

const prochainRdv = [
  { date: "12 Juin 2025", heure: "09h00", medecin: "Dr. Mensah", specialite: "Cardiologie", statut: "Confirmé" },
  { date: "18 Juin 2025", heure: "14h30", medecin: "Dr. Koffi", specialite: "Pédiatrie", statut: "En attente" },
];

const consultations = [
  { date: "05 Mai 2025", medecin: "Dr. Agbeko", motif: "Consultation générale", diagnostic: "Hypertension légère" },
  { date: "20 Avr 2025", medecin: "Dr. Mensah", motif: "Suivi cardiaque", diagnostic: "RAS" },
  { date: "10 Mar 2025", medecin: "Dr. Koffi", motif: "Fièvre persistante", diagnostic: "Paludisme" },
];

const statutColor = {
  "Confirmé": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  "Annulé": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
};

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Bonjour, {user?.nom || "Patient"} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Voici un résumé de votre espace de santé.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Prochain RDV */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <FiCalendar className="text-blue-600 dark:text-sky-400" /> Prochains rendez-vous
          </h2>
          <a href="/patient/rendez-vous" className="text-sm text-blue-600 dark:text-sky-400 hover:underline">Voir tout</a>
        </div>
        <div className="space-y-3">
          {prochainRdv.map((rdv, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 gap-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex flex-col items-center justify-center">
                  <FiClock className="text-blue-600 dark:text-sky-400" size={14} />
                  <span className="text-blue-600 dark:text-sky-400 text-xs font-bold">{rdv.heure}</span>
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-white text-sm">{rdv.medecin}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">{rdv.specialite} · {rdv.date}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${statutColor[rdv.statut]}`}>
                {rdv.statut}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Historique consultations */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <FiActivity className="text-green-600 dark:text-emerald-400" /> Historique des consultations
          </h2>
          <a href="/patient/dossier" className="text-sm text-blue-600 dark:text-sky-400 hover:underline">Voir tout</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <th className="text-left pb-3 font-medium">Date</th>
                <th className="text-left pb-3 font-medium">Médecin</th>
                <th className="text-left pb-3 font-medium hidden sm:table-cell">Motif</th>
                <th className="text-left pb-3 font-medium hidden md:table-cell">Diagnostic</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {consultations.map((c, i) => (
                <tr key={i} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 text-slate-600 dark:text-slate-300">{c.date}</td>
                  <td className="py-3 font-medium text-slate-800 dark:text-white">{c.medecin}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{c.motif}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400 hidden md:table-cell">{c.diagnostic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}