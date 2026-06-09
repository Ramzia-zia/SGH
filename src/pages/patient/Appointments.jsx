import { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiPlus, FiClock, FiX, FiCheck } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const initialRdv = [
  { id: 1, date: "12 Juin 2025", heure: "09h00", medecin: "Dr. Kofi Mensah", specialite: "Cardiologie", statut: "Confirmé", motif: "Suivi cardiaque" },
  { id: 2, date: "18 Juin 2025", heure: "14h30", medecin: "Dr. Ama Koffi", specialite: "Pédiatrie", statut: "En attente", motif: "Consultation générale" },
  { id: 3, date: "25 Mai 2025", heure: "10h00", medecin: "Dr. Yao Agbeko", specialite: "Neurologie", statut: "Clôturé", motif: "Maux de tête" },
  { id: 4, date: "10 Mai 2025", heure: "08h30", medecin: "Dr. Efua Asante", specialite: "Gynécologie", statut: "Annulé", motif: "Bilan annuel" },
];

const statutColor = {
  "Confirmé": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  "Annulé": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  "Clôturé": "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400",
};

export default function PatientAppointments() {
  const [rdvList, setRdvList] = useState(initialRdv);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("Tous");
  const [form, setForm] = useState({ date: "", heure: "", medecin: "", specialite: "", motif: "" });

  const filters = ["Tous", "Confirmé", "En attente", "Annulé", "Clôturé"];

  const filtered = filter === "Tous" ? rdvList : rdvList.filter(r => r.statut === filter);

  const handleAnnuler = (id) => {
    setRdvList(rdvList.map(r => r.id === id ? { ...r, statut: "Annulé" } : r));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRdv = { id: Date.now(), ...form, statut: "En attente" };
    setRdvList([newRdv, ...rdvList]);
    setShowModal(false);
    setForm({ date: "", heure: "", medecin: "", specialite: "", motif: "" });
  };

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mes Rendez-vous</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Gérez vos rendez-vous médicaux</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none">
          <FiPlus size={16} /> Nouveau rendez-vous
        </button>
      </motion.div>

      {/* Filtres */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300"}`}>
            {f}
          </button>
        ))}
      </motion.div>

      {/* Liste */}
      <div className="space-y-3">
        {filtered.map((rdv, i) => (
          <motion.div key={rdv.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex flex-col items-center justify-center">
                  <FiCalendar className="text-blue-600 dark:text-sky-400" size={16} />
                  <span className="text-blue-600 dark:text-sky-400 text-xs font-bold mt-1">{rdv.heure}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{rdv.medecin}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{rdv.specialite}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    <FiClock size={11} className="inline mr-1" />{rdv.date} · {rdv.motif}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statutColor[rdv.statut]}`}>{rdv.statut}</span>
                {rdv.statut === "En attente" || rdv.statut === "Confirmé" ? (
                  <button onClick={() => handleAnnuler(rdv.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <FiX size={16} />
                  </button>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal nouveau RDV */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Nouveau rendez-vous</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Date", name: "date", type: "date" },
                { label: "Heure", name: "heure", type: "time" },
                { label: "Médecin", name: "medecin", type: "text", placeholder: "Dr. Nom Prénom" },
                { label: "Spécialité", name: "specialite", type: "text", placeholder: "Ex: Cardiologie" },
                { label: "Motif", name: "motif", type: "text", placeholder: "Motif de la consultation" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all">
                  <FiCheck size={16} className="inline mr-2" />Confirmer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}