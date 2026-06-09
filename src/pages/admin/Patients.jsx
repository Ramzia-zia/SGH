import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiEye, FiX } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const patients = [
  { id: 1, nom: "Koami Atsou", age: 35, telephone: "+228 90 12 34 56", medecin: "Dr. Mensah", statut: "Actif", date: "05 Mai 2025" },
  { id: 2, nom: "Efua Koffi", age: 28, telephone: "+228 91 23 45 67", medecin: "Dr. Agbeko", statut: "Actif", date: "03 Mai 2025" },
  { id: 3, nom: "Yao Mensah", age: 52, telephone: "+228 92 34 56 78", medecin: "Dr. Koffi", statut: "En attente", date: "01 Mai 2025" },
  { id: 4, nom: "Ama Asante", age: 41, telephone: "+228 93 45 67 89", medecin: "Dr. Mensah", statut: "Inactif", date: "28 Avr 2025" },
];

const statutColor = {
  "Actif": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  "Inactif": "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
};

export default function AdminPatients() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = patients.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Gestion des Patients</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{patients.length} patients enregistrés</p>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="relative max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input type="text" placeholder="Rechercher un patient..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="text-left px-6 py-4 font-medium">Patient</th>
                <th className="text-left px-6 py-4 font-medium hidden sm:table-cell">Âge</th>
                <th className="text-left px-6 py-4 font-medium hidden md:table-cell">Médecin</th>
                <th className="text-left px-6 py-4 font-medium">Statut</th>
                <th className="text-left px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                        {p.nom[0]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{p.nom}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{p.telephone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 hidden sm:table-cell">{p.age} ans</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 hidden md:table-cell">{p.medecin}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statutColor[p.statut]}`}>{p.statut}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setSelected(p)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium hover:bg-purple-100 transition-colors">
                      <FiEye size={13} /> Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Détail Patient</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><FiX size={18} /></button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: "Nom", value: selected.nom },
                { label: "Âge", value: `${selected.age} ans` },
                { label: "Téléphone", value: selected.telephone },
                { label: "Médecin traitant", value: selected.medecin },
                { label: "Statut", value: selected.statut },
                { label: "Inscrit le", value: selected.date },
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