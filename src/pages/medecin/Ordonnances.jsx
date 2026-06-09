import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiFileText, FiX, FiCheck } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const initialOrd = [
  { id: "ORD-001", date: "05 Mai 2025", patient: "Koami Atsou", medicaments: ["Amlodipine 5mg — 1cp/jour", "Doliprane 1000mg — si douleur"] },
  { id: "ORD-002", date: "03 Mai 2025", patient: "Efua Mensah", medicaments: ["Metformine 500mg — 2x/jour", "Vitamines B12"] },
];

export default function MedecinOrdonnances() {
  const [ordonnances, setOrdonnances] = useState(initialOrd);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ patient: "", medicament: "" });
  const [medicaments, setMedicaments] = useState([]);

  const ajouterMedicament = () => {
    if (form.medicament.trim()) {
      setMedicaments([...medicaments, form.medicament.trim()]);
      setForm({ ...form, medicament: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || medicaments.length === 0) return;
    const newOrd = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }),
      patient: form.patient,
      medicaments,
    };
    setOrdonnances([newOrd, ...ordonnances]);
    setShowModal(false);
    setForm({ patient: "", medicament: "" });
    setMedicaments([]);
  };

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Ordonnances</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Créez et gérez les ordonnances de vos patients</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-green-200 dark:shadow-none">
          <FiPlus size={16} /> Nouvelle ordonnance
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {ordonnances.map((ord, i) => (
          <motion.div key={ord.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                <FiFileText className="text-green-600 dark:text-emerald-400" size={18} />
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-white text-sm">{ord.id}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{ord.patient} · {ord.date}</p>
              </div>
            </div>
            <div className="space-y-2">
              {ord.medicaments.map((m, j) => (
                <div key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
                  <span>💊</span> {m}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Nouvelle ordonnance</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Patient</label>
                <input type="text" placeholder="Nom du patient" value={form.patient}
                  onChange={(e) => setForm({ ...form, patient: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ajouter un médicament</label>
                <div className="flex gap-2">
                  <input type="text" placeholder="Ex: Paracétamol 500mg — 3x/jour" value={form.medicament}
                    onChange={(e) => setForm({ ...form, medicament: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  <button type="button" onClick={ajouterMedicament}
                    className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all">
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
              {medicaments.length > 0 && (
                <div className="space-y-2">
                  {medicaments.map((m, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2 text-sm">
                      <span className="text-slate-700 dark:text-slate-300">💊 {m}</span>
                      <button type="button" onClick={() => setMedicaments(medicaments.filter((_, j) => j !== i))}
                        className="text-red-400 hover:text-red-600"><FiX size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all">
                  <FiCheck size={16} className="inline mr-2" />Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}