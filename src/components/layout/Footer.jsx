import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import { FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl text-white">Clinique Santé Togo</span>
            </div>
            <p className="text-sm text-slate-400">
              Système de Gestion d'Hôpital moderne pour un meilleur service de santé au Togo.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#medecins" className="hover:text-blue-400 transition-colors">Médecins</a></li>
              <li><a href="#fonctionnalites" className="hover:text-blue-400 transition-colors">Fonctionnalités</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Accès</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={ROUTES.LOGIN} className="hover:text-blue-400 transition-colors">Connexion</Link></li>
              <li><Link to={ROUTES.REGISTER} className="hover:text-blue-400 transition-colors">Inscription</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 Lomé, Togo</li>
              <li>📞 +228 90 00 00 00</li>
              <li>✉️ contact@Clinique Santé Togo.tg</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <p>© 2025 Clinique Santé Togo — Tous droits réservés</p>
          <p className="flex items-center gap-1">Fait avec <FiHeart className="text-red-500" /> à Lomé, Togo</p>
        </div>
      </div>
    </footer>
  );
}