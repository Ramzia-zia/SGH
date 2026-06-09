import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../constants";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (form.email === "patient@gmail.com" && form.password === "123456") {
        login({ nom: "Koami Atsou", email: form.email, role: "patient" });
        navigate(ROUTES.PATIENT_DASHBOARD);
      } else if (form.email === "medecin@gmail.com" && form.password === "123456") {
        login({ nom: "Dr. Mensah", email: form.email, role: "medecin" });
        navigate(ROUTES.MEDECIN_DASHBOARD);
      } else if (form.email === "admin@gmail.com" && form.password === "123456") {
        login({ nom: "Administrateur", email: form.email, role: "admin" });
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        setError("Email ou mot de passe incorrect.");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div classNamse="text-center mb-8">
          <Link to={ROUTES.HOME} className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-2xl text-blue-600 dark:text-sky-400">Clinique Santé Togo</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mt-4">Connexion</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Accédez à votre espace personnel</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">

          {/* Comptes de test */}
          <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-xs text-slate-600 dark:text-slate-400">
            <p className="font-semibold text-blue-600 dark:text-sky-400 mb-1">Comptes de test :</p>
            <p>👤 patient@gmail.com / 123456</p>
            <p>🩺 medecin@gmail.com / 123456</p>
            <p>🔧 admin@gmail.com / 123456</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mot de passe</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm text-blue-600 dark:text-sky-400 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connexion...
                </span>
              ) : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Pas encore de compte ?{" "}
            <Link to={ROUTES.REGISTER} className="text-blue-600 dark:text-sky-400 font-medium hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}