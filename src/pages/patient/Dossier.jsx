import { motion } from "framer-motion";
import { FiUser, FiAlertTriangle, FiActivity, FiHeart } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const dossier = {
  nom: "Koami Atsou",
  prenom: "Kodjo",
  ddn: "15 Mars 1990",
  sexe: "Masculin",
  telephone: "+228 90 12 34 56",
  email: "koami@email.com",
  adresse: "Lomé, Quartier Bè",
  groupeSanguin: "O+",
  allergies: ["Pénicilline", "Arachides"],
  antecedents: ["Hypertension (2020)", "Paludisme chronique (2018)"],
  consultations: [
    { date: "05 Mai 2025", medecin: "Dr. Mensah", diagnostic: "Hypertension légère", traitement: "Amlodipine 5mg" },
    { date: "20 Avr 2025", medecin: "Dr. Agbeko", diagnostic: "RAS", traitement: "Aucun" },
    { date: "10 Mar 2025", medecin: "Dr. Koffi", diagnostic: "Paludisme", traitement: "Coartem 6 cp" },
  ],
};

export default function PatientDossier() {
  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mon Dossier Médical</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Toutes vos informations médicales en un seul endroit</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Infos personnelles */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <FiUser className="text-blue-600 dark:text-sky-400" /> Informations personnelles
          </h2>
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-3xl mb-3">
              {dossier.nom[0]}
            </div>
            <p className="font-bold text-slate-800 dark:text-white">{dossier.prenom} {dossier.nom}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{dossier.email}</p>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { label: "Date de naissance", value: dossier.ddn },
              { label: "Sexe", value: dossier.sexe },
              { label: "Téléphone", value: dossier.telephone },
              { label: "Adresse", value: dossier.adresse },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-slate-50 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                <span className="font-medium text-slate-800 dark:text-white text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
          {/* Groupe sanguin */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
              <FiHeart className="text-red-500" /> Groupe sanguin & Allergies
            </h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                <span className="text-3xl font-bold text-red-600 dark:text-red-400">{dossier.groupeSanguin}</span>
                <span className="text-sm text-red-500">Groupe sanguin</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                  <FiAlertTriangle className="text-orange-500" size={14} /> Allergies connues
                </p>
                <div className="flex flex-wrap gap-2">
                  {dossier.allergies.map((a, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium">
                      ⚠️ {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Antécédents */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
              <FiActivity className="text-purple-600" /> Antécédents médicaux
            </h2>
            <div className="space-y-2">
              {dossier.antecedents.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{a}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Consultations */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
            <h2 className="font-semibold text-slate-800 dark:text-white mb-4">Historique des consultations</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                    <th className="text-left pb-3 font-medium">Date</th>
                    <th className="text-left pb-3 font-medium">Médecin</th>
                    <th className="text-left pb-3 font-medium hidden sm:table-cell">Diagnostic</th>
                    <th className="text-left pb-3 font-medium hidden md:table-cell">Traitement</th>
                  </tr>
                </thead>
                <tbody>
                  {dossier.consultations.map((c, i) => (
                    <tr key={i} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 text-slate-600 dark:text-slate-300">{c.date}</td>
                      <td className="py-3 font-medium text-slate-800 dark:text-white">{c.medecin}</td>
                      <td className="py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{c.diagnostic}</td>
                      <td className="py-3 text-slate-500 dark:text-slate-400 hidden md:table-cell">{c.traitement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}