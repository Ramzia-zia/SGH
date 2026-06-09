import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiEye, FiCheck, FiX } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const medecins = [
  { id: 1, nom: "Dr. Kofi Mensah", specialite: "Cardiologie", telephone: "+228 90 00 11 22", patients: 120, statut: "Actif" },
  { id: 2, nom: "Dr. Ama Koffi", specialite: "Pédiatrie", telephone: "+228 91 00 22 33", patients: 95, statut: "Actif" },
  { id: 3, nom: "Dr. Yao Agbeko", specialite: "Neurologie", telephone: "+228 92 00 33 44", patients: 80, statut: "Actif" },
  { id: 4, nom: "Dr. Efua Asante", specialite: "Gynécologie", telephone: "+228 93 00 44 55", patients: 110, statut: "En attente" },
];

const statutColor = {
  "Actif": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
};

export default function AdminMedecins() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = medecins.filter(m =>
    m.nom.toLowerCase().includes(search.toLowerCase()) ||
    m.specialite.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gestion des Médecins</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{medecins.length} médecins enregistrés</p>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="relative max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input type="text" placeholder="Rechercher un médecin..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {filtered.map((m, i) => (
          <motion.div key={m.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-400 to-blue-400 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
              {m.nom.split(" ")[1][0]}
            </div>
            <p className="font-semibold text-slate-800 dark:text-white">{m.nom}</p>
            <p className="text-sm text-green-600 dark:text-emerald-400 font-medium mt-1">{m.specialite}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.patients} patients</p>
            <div className="flex items-center justify-between mt-4">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${statutColor[m.statut]}`}>{m.statut}</span>
              <button onClick={() => setSelected(m)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium hover:bg-purple-100 transition-colors">
                <FiEye size={12} /> Voir
              </button>
            </div>
            {m.statut === "En attente" && (
              <button className="w-full mt-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-xl transition-all flex items-center justify-center gap-1">
                <FiCheck size={13} /> Valider le compte
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Profil Médecin</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><FiX size={18} /></button>
            </div>
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-400 to-blue-400 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-2">
                {selected.nom.split(" ")[1][0]}
              </div>
              <p className="font-bold text-slate-800 dark:text-white">{selected.nom}</p>
              <p className="text-sm text-green-600 dark:text-emerald-400">{selected.specialite}</p>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: "Téléphone", value: selected.telephone },
                { label: "Patients suivis", value: selected.patients },
                { label: "Statut", value: selected.statut },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-800 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)}
              className="w-full mt-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all">
              Fermer
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}