import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone } from "react-icons/fi";
import { ROUTES } from "../../constants";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", telephone: "", password: "", confirm: "", role: "patient" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nom) newErrors.nom = "Nom requis";
    if (!form.prenom) newErrors.prenom = "Prénom requis";
    if (!form.email) newErrors.email = "Email requis";
    if (!form.telephone) newErrors.telephone = "Téléphone requis";
    if (form.password.length < 6) newErrors.password = "Minimum 6 caractères";
    if (form.password !== form.confirm) newErrors.confirm = "Les mots de passe ne correspondent pas";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(ROUTES.OTP);
    }, 1200);
  };

  const inputClass = (field) =>
    `w-full pl-10 pr-4 py-3 rounded-xl border ${errors[field] ? "border-red-400" : "border-slate-200 dark:border-slate-600"} bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-lg">

        <div className="text-center mb-8">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-2xl text-blue-600 dark:text-sky-400">Clinique Santé Togo</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mt-4">Créer un compte</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Rejoignez Clinique Santé Togo gratuitement</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Rôle */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Je suis</label>
              <select name="role" value={form.role} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                <option value="patient">Patient</option>
                <option value="medecin">Médecin</option>
              </select>
            </div>

            {/* Nom & Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nom</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} placeholder="Atsou"
                    className={inputClass("nom")} />
                </div>
                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prénom</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Koami"
                    className={inputClass("prenom")} />
                </div>
                {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="koami@email.com"
                  className={inputClass("email")} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Téléphone</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+228 90 00 00 00"
                  className={inputClass("telephone")} />
              </div>
              {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mot de passe</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="••••••••"
                  className={inputClass("password")} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirmation */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type={showPass ? "text" : "password"} name="confirm" value={form.confirm} onChange={handleChange} placeholder="••••••••"
                  className={inputClass("confirm")} />
              </div>
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Création...
                </span>
              ) : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Déjà un compte ?{" "}
            <Link to={ROUTES.LOGIN} className="text-blue-600 dark:text-sky-400 font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}