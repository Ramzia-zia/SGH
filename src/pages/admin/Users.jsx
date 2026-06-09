import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const initialUsers = [
  { id: 1, nom: "Koami Atsou", email: "koami@email.com", role: "Patient", statut: "Actif", date: "05 Mai 2025" },
  { id: 2, nom: "Dr. Kofi Mensah", email: "mensah@Clinique Santé Togo.tg", role: "Médecin", statut: "Actif", date: "03 Mai 2025" },
  { id: 3, nom: "Efua Koffi", email: "efua@email.com", role: "Patient", statut: "En attente", date: "01 Mai 2025" },
  { id: 4, nom: "Dr. Yao Agbeko", email: "agbeko@Clinique Santé Togo.tg", role: "Médecin", statut: "Actif", date: "28 Avr 2025" },
  { id: 5, nom: "Admin Clinique Santé Togo", email: "admin@Clinique Santé Togo.tg", role: "Admin", statut: "Actif", date: "01 Jan 2025" },
];

const roleColor = {
  "Patient": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-sky-400",
  "Médecin": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "Admin": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
};

const statutColor = {
  "Actif": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  "En attente": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  "Inactif": "bg-slate-100 dark:bg-slate-700 text-slate-500",
};

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ nom: "", email: "", role: "Patient", statut: "Actif" });

  const filtered = users.filter(u =>
    u.nom.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditUser(null);
    setForm({ nom: "", email: "", role: "Patient", statut: "Actif" });
    setShowModal(true);
  };

  const openEdit = (u) => {
    setEditUser(u);
    setForm({ nom: u.nom, email: u.email, role: u.role, statut: u.statut });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u));
    } else {
      setUsers([{ id: Date.now(), ...form, date: new Date().toLocaleDateString("fr-FR") }, ...users]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Utilisateurs</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{users.length} utilisateurs enregistrés</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-purple-200 dark:shadow-none">
          <FiPlus size={16} /> Ajouter un utilisateur
        </button>
      </motion.div>

      {/* Recherche */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="relative max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input type="text" placeholder="Rechercher..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr className="text-slate-500 dark:text-slate-400">
                <th className="text-left px-6 py-4 font-medium">Utilisateur</th>
                <th className="text-left px-6 py-4 font-medium hidden md:table-cell">Email</th>
                <th className="text-left px-6 py-4 font-medium">Rôle</th>
                <th className="text-left px-6 py-4 font-medium hidden sm:table-cell">Statut</th>
                <th className="text-left px-6 py-4 font-medium hidden lg:table-cell">Date</th>
                <th className="text-left px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                        {u.nom[0]}
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{u.nom}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 hidden md:table-cell">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${roleColor[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statutColor[u.statut]}`}>{u.statut}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 hidden lg:table-cell">{u.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(u)}
                        className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(u.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                {editUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
                <FiX size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Nom complet", name: "nom", type: "text", placeholder: "Nom Prénom" },
                { label: "Email", name: "email", type: "email", placeholder: "email@example.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rôle</label>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
                    <option>Patient</option>
                    <option>Médecin</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Statut</label>
                  <select value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition">
                    <option>Actif</option>
                    <option>En attente</option>
                    <option>Inactif</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-all">
                  <FiCheck size={16} className="inline mr-2" />{editUser ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}