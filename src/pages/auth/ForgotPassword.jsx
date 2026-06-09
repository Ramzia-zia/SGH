import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { ROUTES } from "../../constants";

export default function ForgotPassword() {
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🔑</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Mot de passe oublié</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Entrez votre email pour recevoir un lien de réinitialisation</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">Email envoyé !</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Vérifiez votre boîte mail et suivez les instructions.</p>
              <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-2 text-blue-600 dark:text-sky-400 font-medium hover:underline">
                <FiArrowLeft size={16} /> Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-all">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi...
                  </span>
                ) : "Envoyer le lien"}
              </button>
              <Link to={ROUTES.LOGIN} className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                <FiArrowLeft size={14} /> Retour à la connexion
              </Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}