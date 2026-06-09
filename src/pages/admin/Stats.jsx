import { motion } from "framer-motion";
import { FiTrendingUp, FiUsers, FiActivity, FiCalendar } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"];
const consultationsData = [120, 145, 132, 178, 195, 204];
const patientsData = [80, 95, 110, 130, 148, 162];
const maxVal = 220;

export default function AdminStats() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Statistiques</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Vue d'ensemble des activités — 2025</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <FiUsers size={20} />, label: "Patients totaux", value: "2 548", pct: "+12%", color: "text-blue-600 dark:text-sky-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
          { icon: <FiActivity size={20} />, label: "Consultations", value: "1 204", pct: "+8%", color: "text-green-600 dark:text-emerald-400", bg: "bg-green-50 dark:bg-green-900/30" },
          { icon: <FiCalendar size={20} />, label: "Rendez-vous", value: "342", pct: "+5%", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/30" },
          { icon: <FiTrendingUp size={20} />, label: "Satisfaction", value: "98%", pct: "+2%", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/30" },
        ].map((s, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg} ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">{s.pct} ce mois</p>
          </motion.div>
        ))}
      </div>

      {/* Graphique barres consultations */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
        <h2 className="font-semibold text-slate-800 dark:text-white mb-6">Consultations par mois</h2>
        <div className="flex items-end gap-4 h-48">
          {mois.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-blue-600 dark:text-sky-400">{consultationsData[i]}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(consultationsData[i] / maxVal) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="w-full bg-blue-500 dark:bg-sky-500 rounded-t-xl min-h-2"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">{m}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Graphique barres patients */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
        <h2 className="font-semibold text-slate-800 dark:text-white mb-6">Nouveaux patients par mois</h2>
        <div className="flex items-end gap-4 h-48">
          {mois.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-green-600 dark:text-emerald-400">{patientsData[i]}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(patientsData[i] / maxVal) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="w-full bg-green-500 dark:bg-emerald-500 rounded-t-xl min-h-2"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">{m}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Répartition */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Cardiologie", value: 28, color: "bg-blue-500" },
          { label: "Pédiatrie", value: 22, color: "bg-green-500" },
          { label: "Neurologie", value: 18, color: "bg-purple-500" },
          { label: "Gynécologie", value: 20, color: "bg-pink-500" },
          { label: "Généraliste", value: 35, color: "bg-orange-500" },
          { label: "Autres", value: 15, color: "bg-slate-400" },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">{s.value}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className={`h-2 rounded-full ${s.color}`}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}