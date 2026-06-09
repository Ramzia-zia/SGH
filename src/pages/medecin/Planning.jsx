import { motion } from "framer-motion";
import { FiCalendar, FiClock } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const jours = ["Lun 09", "Mar 10", "Mer 11", "Jeu 12", "Ven 13"];

const planning = {
  "Lun 09": [
    { heure: "08h00", patient: "Koami Atsou", motif: "Suivi cardiaque", statut: "Confirmé" },
    { heure: "10h00", patient: "Efua Mensah", motif: "Bilan diabète", statut: "Confirmé" },
    { heure: "14h00", patient: "Yao Agbeko", motif: "Douleurs", statut: "En attente" },
  ],
  "Mar 10": [
    { heure: "09h00", patient: "Ama Koffi", motif: "Consultation", statut: "Confirmé" },
    { heure: "11h30", patient: "Kodjo Asante", motif: "Arthrose", statut: "Confirmé" },
  ],
  "Mer 11": [
    { heure: "08h30", patient: "Koami Atsou", motif: "Suivi", statut: "En attente" },
  ],
  "Jeu 12": [
    { heure: "10h00", patient: "Efua Mensah", motif: "Résultats", statut: "Confirmé" },
    { heure: "15h00", patient: "Nouveau patient", motif: "1ère consultation", statut: "En attente" },
  ],
  "Ven 13": [
    { heure: "09h00", patient: "Yao Agbeko", motif: "Suivi", statut: "Confirmé" },
  ],
};

const statutColor = {
  "Confirmé": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
};

export default function MedecinPlanning() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mon Planning</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Semaine du 9 au 13 Juin 2025</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {jours.map((jour, i) => (
          <motion.div key={jour} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
              <FiCalendar className="text-green-600 dark:text-emerald-400" size={14} />
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">{jour} Juin</h3>
            </div>
            <div className="space-y-3">
              {(planning[jour] || []).map((rdv, j) => (
                <div key={j} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <FiClock size={11} /> {rdv.heure}
                  </div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{rdv.patient}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{rdv.motif}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statutColor[rdv.statut]}`}>
                    {rdv.statut}
                  </span>
                </div>
              ))}
              {(!planning[jour] || planning[jour].length === 0) && (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">Aucun RDV</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}