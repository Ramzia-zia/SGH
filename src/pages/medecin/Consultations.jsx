import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiActivity, FiX, FiCheck } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const initialConsultations = [
  { id: 1, date: "05 Mai 2025", patient: "Koami Atsou", motif: "Suivi cardiaque", diagnostic: "Hypertension légère", observations: "PA 140/90, patient sous traitement", traitement: "Amlodipine 5mg" },
  { id: 2, date: "03 Mai 2025", patient: "Efua Mensah", motif: "Suivi diabète", diagnostic: "Diabète stable", observations: "Glycémie à jeun 1.2g/L", traitement: "Metformine 500mg" },
  { id: 3, date: "01 Mai 2025", patient: "Yao Agbeko", motif: "Douleurs thoraciques", diagnostic: "Insuffisance cardiaque", observations: "ECG anormal, référer en cardiologie", traitement: "Furosémide 40mg" },
];

export default function MedecinConsultations() {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ patient: "", motif: "", diagnostic: "", observations: "", traitement: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newC = {
      id: Date.now(),
      date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }),
      ...form,
    };
    setConsultations([newC, ...consultations]);
    setShowModal(false);
    setForm({ patient: "", motif: "", diagnostic: "", observations: "", traitement: "" });
  };

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Consultations</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Gérez vos consultations médicales</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-green-200 dark:shadow-none">
          <FiPlus size={16} /> Nouvelle consultation
        </button>
      </motion.div>

      <div className="space-y-4">
        {consultations.map((c, i) => (
          <motion.div key={c.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                  <FiActivity className="text-green-600 dark:text-emerald-400" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{c.patient}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.date} · {c.motif}</p>
                </div>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 self-start">
                Terminée
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Diagnostic</p>
                <p className="font-medium text-slate-800 dark:text-white">{c.diagnostic}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Observations</p>
                <p className="text-slate-600 dark:text-slate-300">{c.observations}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Traitement</p>
                <p className="text-slate-600 dark:text-slate-300">{c.traitement}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Nouvelle consultation</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Patient", name: "patient", placeholder: "Nom du patient" },
                { label: "Motif", name: "motif", placeholder: "Motif de la consultation" },
                { label: "Diagnostic", name: "diagnostic", placeholder: "Diagnostic établi" },
                { label: "Observations", name: "observations", placeholder: "Observations cliniques" },
                { label: "Traitement prescrit", name: "traitement", placeholder: "Médicaments et posologie" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
                  <input type="text" placeholder={field.placeholder} value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all">
                  <FiCheck size={16} className="inline mr-2" />Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}