import { motion } from "framer-motion";
import { FiUsers, FiUserCheck, FiCalendar, FiActivity, FiTrendingUp, FiAlertCircle } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { useAuth } from "../../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stats = [
  { icon: <FiUsers size={22} />, label: "Total Patients", value: "2 548", evolution: "+12%", color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-sky-400" },
  { icon: <FiUserCheck size={22} />, label: "Médecins actifs", value: "54", evolution: "+3%", color: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-emerald-400" },
  { icon: <FiCalendar size={22} />, label: "Rendez-vous", value: "342", evolution: "+8%", color: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
  { icon: <FiActivity size={22} />, label: "Consultations", value: "1 204", evolution: "+5%", color: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
];

const recentUsers = [
  { nom: "Koami Atsou", role: "Patient", email: "koami@email.com", statut: "Actif", date: "05 Mai 2025" },
  { nom: "Dr. Mensah", role: "Médecin", email: "mensah@Clinique Santé Togo.tg", statut: "Actif", date: "03 Mai 2025" },
  { nom: "Efua Koffi", role: "Patient", email: "efua@email.com", statut: "En attente", date: "01 Mai 2025" },
  { nom: "Dr. Agbeko", role: "Médecin", email: "agbeko@Clinique Santé Togo.tg", statut: "Actif", date: "28 Avr 2025" },
  { nom: "Ama Asante", role: "Patient", email: "ama@email.com", statut: "Inactif", date: "25 Avr 2025" },
];

const recentAudit = [
  { action: "Connexion réussie", user: "Dr. Mensah", date: "Aujourd'hui 09h12" },
  { action: "Création ordonnance", user: "Dr. Agbeko", date: "Aujourd'hui 08h45" },
  { action: "Modification dossier", user: "Dr. Koffi", date: "Hier 17h30" },
  { action: "Tentative connexion échouée", user: "Inconnu", date: "Hier 15h20" },
];

const statutColor = {
  "Actif": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  "Inactif": "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
};

export default function AdminDashboard() {
  

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Tableau de bord Admin 🛡️
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Vue d'ensemble du système Clinique Santé Togo
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" animate="visible" custom={i}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{s.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <FiTrendingUp size={11} /> {s.evolution} ce mois
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilisateurs récents */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <FiUsers className="text-purple-600" /> Utilisateurs récents
            </h2>
            <a href="/admin/utilisateurs" className="text-sm text-blue-600 dark:text-sky-400 hover:underline">Voir tout</a>
          </div>
          <div className="space-y-3">
            {recentUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                    {u.nom[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{u.nom}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{u.role} · {u.email}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statutColor[u.statut]}`}>
                  {u.statut}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Journal d'audit */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <FiAlertCircle className="text-orange-500" /> Activité récente
            </h2>
            <a href="/admin/audit" className="text-sm text-blue-600 dark:text-sky-400 hover:underline">Voir tout</a>
          </div>
          <div className="space-y-3">
            {recentAudit.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.action.includes("échouée") ? "bg-red-500" : "bg-green-500"}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{a.action}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{a.user} · {a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}