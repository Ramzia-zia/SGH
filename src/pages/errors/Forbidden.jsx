import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLock, FiHome } from "react-icons/fi";

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6"
        >
          <FiLock size={40} className="text-red-500" />
        </motion.div>
        <h1 className="text-8xl font-extrabold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Accès refusé</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <Link to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-200 dark:shadow-none">
          <FiHome size={16} /> Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}