import { motion } from "framer-motion";
import { FiUsers, FiActivity, FiCalendar, FiAlertCircle, FiClock } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stats = [
  { icon: <FiUsers size={22} />, label: "Total Patients", value: "142", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400" },
  { icon: <FiActivity size={22} />, label: "Consultations aujourd'hui", value: "8", color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-emerald-400" },
  { icon: <FiCalendar size={22} />, label: "Rendez-vous du jour", value: "12", color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
  { icon: <FiAlertCircle size={22} />, label: "Urgences", value: "2", color: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400" },
];

const rdvAujourdhui = [
  { heure: "08h00", patient: "Koami Atsou", motif: "Suivi cardiaque", statut: "Clôturé" },
  { heure: "09h30", patient: "Efua Mensah", motif: "Consultation générale", statut: "Clôturé" },
  { heure: "11h00", patient: "Yao Agbeko", motif: "Douleurs thoraciques", statut: "En cours" },
  { heure: "14h00", patient: "Ama Koffi", motif: "Bilan annuel", statut: "En attente" },
  { heure: "15h30", patient: "Kodjo Asante", motif: "Hypertension", statut: "En attente" },
];

const patientsRecents = [
  { nom: "Koami Atsou", age: 35, diagnostic: "Hypertension", derniere: "05 Mai 2025" },
  { nom: "Efua Mensah", age: 28, diagnostic: "Diabète type 2", derniere: "03 Mai 2025" },
  { nom: "Yao Agbeko", age: 52, diagnostic: "Insuffisance cardiaque", derniere: "01 Mai 2025" },
  { nom: "Ama Koffi", age: 41, diagnostic: "RAS", derniere: "28 Avr 2025" },
];

const statutColor = {
  "En cours": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-sky-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  "Clôturé": "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400",
};

export default function MedecinDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Bonjour, {user?.nom || "Docteur"} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Voici votre tableau de bord du jour.
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RDV du jour */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <FiCalendar className="text-purple-600" /> Rendez-vous du jour
          </h2>
          <div className="space-y-3">
            {rdvAujourdhui.map((rdv, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex flex-col items-center justify-center">
                    <FiClock className="text-purple-600 dark:text-purple-400" size={12} />
                    <span className="text-purple-600 dark:text-purple-400 text-xs font-bold">{rdv.heure}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{rdv.patient}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{rdv.motif}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statutColor[rdv.statut]}`}>
                  {rdv.statut}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Patients récents */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <FiUsers className="text-blue-600 dark:text-sky-400" /> Patients récents
          </h2>
          <div className="space-y-3">
            {patientsRecents.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                    {p.nom[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{p.nom}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{p.age} ans · {p.diagnostic}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">{p.derniere}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}