import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function PatientProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    nom: user?.nom || "Atsou",
    prenom: "Koami",
    email: user?.email || "koami@email.com",
    telephone: "+228 90 12 34 56",
    adresse: "Lomé, Quartier Bè",
    ddn: "1990-03-15",
    sexe: "Masculin",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mon Profil</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Mettez à jour vos informations personnelles</p>
      </motion.div>

      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-3xl">
            {form.nom[0]}
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white text-lg">{form.prenom} {form.nom}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Patient · Clinique Santé Togo</p>
          </div>
        </div>

        {saved && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm text-center font-medium">
            ✅ Profil mis à jour avec succès !
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: "Nom", name: "nom", icon: <FiUser size={15} />, type: "text" },
              { label: "Prénom", name: "prenom", icon: <FiUser size={15} />, type: "text" },
              { label: "Email", name: "email", icon: <FiMail size={15} />, type: "email" },
              { label: "Téléphone", name: "telephone", icon: <FiPhone size={15} />, type: "tel" },
              { label: "Date de naissance", name: "ddn", icon: null, type: "date" },
              { label: "Sexe", name: "sexe", icon: null, type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
                <div className="relative">
                  {field.icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{field.icon}</span>}
                  <input type={field.type} value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className={`w-full ${field.icon ? "pl-9" : "pl-4"} pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Adresse</label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-3.5 text-slate-400" size={15} />
              <input type="text" value={form.adresse}
                onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>

          <button type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none">
            <FiSave size={16} /> Sauvegarder les modifications
          </button>
        </form>
      </motion.div>
    </div>
  );
}