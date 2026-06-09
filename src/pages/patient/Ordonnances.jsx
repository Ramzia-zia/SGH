import { motion } from "framer-motion";
import { FiFileText, FiDownload, FiEye, FiCalendar } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const ordonnances = [
  {
    id: "ORD-2025-001", date: "05 Mai 2025", medecin: "Dr. Kofi Mensah",
    medicaments: ["Amlodipine 5mg — 1 cp/jour", "Doliprane 1000mg — si douleur"],
    statut: "Active",
  },
  {
    id: "ORD-2025-002", date: "10 Mar 2025", medecin: "Dr. Ama Koffi",
    medicaments: ["Coartem 6 cp — 2x/jour pendant 3 jours", "Paracétamol 500mg"],
    statut: "Expirée",
  },
  {
    id: "ORD-2025-003", date: "20 Avr 2025", medecin: "Dr. Yao Agbeko",
    medicaments: ["Ibuprofène 400mg — 3x/jour après repas"],
    statut: "Active",
  },
];

export default function PatientOrdonnances() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mes Ordonnances</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Consultez et téléchargez vos ordonnances médicales</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {ordonnances.map((ord, i) => (
          <motion.div key={ord.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <FiFileText className="text-blue-600 dark:text-sky-400" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{ord.id}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <FiCalendar size={10} /> {ord.date}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                ord.statut === "Active"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
              }`}>
                {ord.statut}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">Par {ord.medecin}</p>

            {/* Médicaments */}
            <div className="space-y-2 mb-5">
              {ord.medicaments.map((m, j) => (
                <div key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                  <span className="text-blue-500 mt-0.5">💊</span> {m}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                <FiEye size={14} /> Voir
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm transition-all">
                <FiDownload size={14} /> PDF
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}