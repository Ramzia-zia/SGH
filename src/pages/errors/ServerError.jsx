import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiRefreshCw, FiHome } from "react-icons/fi";

export default function ServerError() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="text-8xl mb-6 inline-block"
        >
          ⚙️
        </motion.div>
        <h1 className="text-8xl font-extrabold text-orange-500 mb-4">500</h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Erreur serveur</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Une erreur interne s'est produite. Notre équipe technique a été notifiée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-200 dark:shadow-none">
            <FiRefreshCw size={16} /> Réessayer
          </button>
          <Link to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <FiHome size={16} /> Accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}