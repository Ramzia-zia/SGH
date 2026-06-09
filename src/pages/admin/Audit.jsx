import { useState } from "react";
import { motion } from "framer-motion";
import { FiShield, FiSearch, FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const logs = [
  { id: 1, type: "success", action: "Connexion réussie", user: "Dr. Kofi Mensah", role: "Médecin", ip: "197.155.x.x", date: "Aujourd'hui 09h12" },
  { id: 2, type: "success", action: "Création ordonnance ORD-2025-045", user: "Dr. Agbeko", role: "Médecin", ip: "197.155.x.x", date: "Aujourd'hui 08h45" },
  { id: 3, type: "info", action: "Modification dossier patient #1234", user: "Dr. Koffi", role: "Médecin", ip: "197.155.x.x", date: "Hier 17h30" },
  { id: 4, type: "error", action: "Tentative de connexion échouée (3x)", user: "Inconnu", role: "—", ip: "41.74.x.x", date: "Hier 15h20" },
  { id: 5, type: "info", action: "Consultation ajoutée pour Koami Atsou", user: "Dr. Mensah", role: "Médecin", ip: "197.155.x.x", date: "Hier 14h05" },
  { id: 6, type: "success", action: "Nouveau patient enregistré", user: "Admin Clinique Santé Togo", role: "Admin", ip: "197.155.x.x", date: "Hier 11h00" },
  { id: 7, type: "error", action: "Accès refusé — ressource protégée", user: "Inconnu", role: "—", ip: "41.74.x.x", date: "02 Juin 2025" },
  { id: 8, type: "info", action: "Rendez-vous annulé par patient", user: "Efua Koffi", role: "Patient", ip: "197.155.x.x", date: "02 Juin 2025" },
];

const typeConfig = {
  success: { icon: <FiCheckCircle size={16} />, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
  error: { icon: <FiAlertCircle size={16} />, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
  info: { icon: <FiInfo size={16} />, color: "text-blue-600 dark:text-sky-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
};

export default function AdminAudit() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");

  const filters = ["Tous", "success", "error", "info"];
  const filterLabels = { "Tous": "Tous", "success": "Succès", "error": "Erreurs", "info": "Info" };

  const filtered = logs.filter(l => {
    const matchSearch = l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Tous" || l.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <FiShield className="text-purple-600" /> Journal d'Audit
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Traçabilité complète des actions du système</p>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}
        className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Rechercher une action..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
        </div>
        <div className="flex gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? "bg-purple-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"}`}>
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-3">
        {filtered.map((log, i) => {
          const config = typeConfig[log.type];
          return (
            <motion.div key={log.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.bg} ${config.color}`}>
                    {config.icon}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white text-sm">{log.action}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {log.user} · {log.role} · IP: {log.ip}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">{log.date}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}