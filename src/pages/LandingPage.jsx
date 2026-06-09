import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiShield, FiUsers, FiActivity, FiFileText, FiSmartphone, FiChevronDown } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ROUTES } from "../constants";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const services = [
  { icon: <FiCalendar size={28} />, title: "Rendez-vous en ligne", desc: "Prenez rendez-vous avec un médecin en quelques clics, 24h/24." },
  { icon: <FiFileText size={28} />, title: "Dossier médical", desc: "Accédez à votre historique médical complet depuis n'importe où." },
  { icon: <FiShield size={28} />, title: "Sécurité des données", desc: "Vos données médicales sont chiffrées et protégées." },
  { icon: <FiActivity size={28} />, title: "Suivi en temps réel", desc: "Suivez vos consultations et ordonnances en temps réel." },
  { icon: <FiUsers size={28} />, title: "Équipe médicale", desc: "Une équipe de médecins spécialistes disponibles pour vous." },
  { icon: <FiSmartphone size={28} />, title: "Application mobile", desc: "Accédez à Clinique Santé Togo depuis votre téléphone à tout moment." },
];

const medecins = [
  { nom: "Dr. Kofi Mensah", specialite: "Cardiologie", patients: 120 },
  { nom: "Dr. Ama Koffi", specialite: "Pédiatrie", patients: 95 },
  { nom: "Dr. Yao Agbeko", specialite: "Neurologie", patients: 80 },
  { nom: "Dr. Efua Asante", specialite: "Gynécologie", patients: 110 },
];

const stats = [
  { value: "2 500+", label: "Patients" },
  { value: "50+", label: "Médecins" },
  { value: "10 000+", label: "Consultations" },
  { value: "98%", label: "Satisfaction" },
];

const features = [
  "Gestion complète des dossiers patients",
  "Prise de rendez-vous en ligne",
  "Ordonnances numériques sécurisées",
  "Alertes allergies automatiques",
  "QR Code patient unique",
  "Paiement Mobile Money (T-Money, Moov)",
  "Tableau de bord statistiques",
  "Journal d'audit complet",
];

const faqs = [
  { q: "Comment créer un compte patient ?", r: "Cliquez sur Inscription, renseignez vos informations et validez votre email par OTP." },
  { q: "Mes données médicales sont-elles sécurisées ?", r: "Oui, toutes vos données sont chiffrées et accessibles uniquement aux professionnels autorisés." },
  { q: "Puis-je annuler un rendez-vous ?", r: "Oui, vous pouvez annuler ou modifier un rendez-vous depuis votre tableau de bord jusqu'à 2h avant." },
  { q: "Clinique Santé Togo est-il disponible sur mobile ?", r: "Oui, l'interface est entièrement responsive et fonctionne sur tous les appareils." },
];

export default function LandingPage() {
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 bg-linear-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-sky-400 text-sm font-medium mb-6">
          <FiActivity size={14} /> Système de Gestion Hospitalière Moderne
        </motion.div>

        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
          className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white max-w-4xl leading-tight mb-6">
          La santé de vos patients,{" "}
          <span className="text-blue-600 dark:text-sky-400">notre priorité</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-10">
          Clinique Santé Togo digitalise la gestion hospitalière au Togo. Dossiers médicaux, rendez-vous, ordonnances et plus — tout en un seul endroit.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to={ROUTES.REGISTER}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none">
            Prendre Rendez-vous
          </Link>
          <a href="#fonctionnalites"
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-sky-400 dark:border-sky-400 font-semibold rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 transition-all">
            Découvrir Clinique Santé Togo
          </a>
        </motion.div>

        {/* Stats hero */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl w-full">
          {stats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-2xl font-bold text-blue-600 dark:text-sky-400">{s.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.a href="#services" variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="mt-12 text-slate-400 animate-bounce">
          <FiChevronDown size={28} />
        </motion.a>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Des outils modernes pour améliorer la qualité des soins et simplifier la gestion hospitalière.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="p-6 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-sky-400 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDECINS */}
      <section id="medecins" className="py-20 px-4 bg-blue-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Médecins Spécialistes</h2>
            <p className="text-slate-500 dark:text-slate-400">Une équipe de professionnels de santé dédiée à votre bien-être.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {medecins.map((m, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {m.nom.split(" ")[1][0]}
                </div>
                <h3 className="font-semibold text-base">{m.nom}</h3>
                <p className="text-blue-600 dark:text-sky-400 text-sm font-medium mt-1">{m.specialite}</p>
                <p className="text-slate-400 text-xs mt-2">{m.patients} patients suivis</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FONCTIONNALITES */}
      <section id="fonctionnalites" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tout ce dont vous avez besoin</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Clinique Santé Togo regroupe toutes les fonctionnalités essentielles pour une gestion hospitalière efficace et moderne.</p>
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 flex items-center justify-center text-xs font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="bg-linear-to-br from-blue-600 to-green-500 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Prêt à commencer ?</h3>
              <p className="mb-6 text-blue-100">Rejoignez des milliers de patients et professionnels de santé qui font confiance à Clinique Santé Togo.</p>
              <Link to={ROUTES.REGISTER}
                className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                Créer un compte gratuit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{f.q}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{f.r}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}