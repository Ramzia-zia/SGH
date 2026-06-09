import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiEye } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const patients = [
  { id: 1, nom: "Koami Atsou", age: 35, sexe: "M", telephone: "+228 90 12 34 56", diagnostic: "Hypertension", groupeSanguin: "O+", derniere: "05 Mai 2025" },
  { id: 2, nom: "Efua Mensah", age: 28, sexe: "F", telephone: "+228 91 23 45 67", diagnostic: "Diabète type 2", groupeSanguin: "A+", derniere: "03 Mai 2025" },
  { id: 3, nom: "Yao Agbeko", age: 52, sexe: "M", telephone: "+228 92 34 56 78", diagnostic: "Insuffisance cardiaque", groupeSanguin: "B-", derniere: "01 Mai 2025" },
  { id: 4, nom: "Ama Koffi", age: 41, sexe: "F", telephone: "+228 93 45 67 89", diagnostic: "RAS", groupeSanguin: "AB+", derniere: "28 Avr 2025" },
  { id: 5, nom: "Kodjo Asante", age: 60, sexe: "M", telephone: "+228 94 56 78 90", diagnostic: "Arthrose", groupeSanguin: "O-", derniere: "25 Avr 2025" },
];

export default function MedecinPatients() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = patients.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.diagnostic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mes Patients</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{patients.length} patients suivis</p>
      </motion.div>

      {/* Recherche */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="relative max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input type="text" placeholder="Rechercher un patient..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="text-left px-6 py-4 font-medium">Patient</th>
                <th className="text-left px-6 py-4 font-medium hidden sm:table-cell">Âge</th>
                <th className="text-left px-6 py-4 font-medium hidden md:table-cell">Téléphone</th>
                <th className="text-left px-6 py-4 font-medium hidden lg:table-cell">Diagnostic</th>
                <th className="text-left px-6 py-4 font-medium hidden lg:table-cell">Groupe</th>
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
                      <span className="font-medium text-slate-800 dark:text-white">{p.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 hidden sm:table-cell">{p.age} ans</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 hidden md:table-cell">{p.telephone}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 hidden lg:table-cell">{p.diagnostic}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="px-2 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium">{p.groupeSanguin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setSelected(p)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400 text-xs font-medium hover:bg-blue-100 transition-colors">
                      <FiEye size={13} /> Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal détail patient */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Dossier Patient</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">✕</button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-2xl">
                {selected.nom[0]}
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-lg">{selected.nom}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{selected.age} ans · {selected.sexe === "M" ? "Masculin" : "Féminin"}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { label: "Téléphone", value: selected.telephone },
                { label: "Groupe sanguin", value: selected.groupeSanguin },
                { label: "Diagnostic principal", value: selected.diagnostic },
                { label: "Dernière consultation", value: selected.derniere },
              ].map((item, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-800 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all">
              Fermer
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}