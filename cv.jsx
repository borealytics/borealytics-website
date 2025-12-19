import React, { useState } from 'react';
import { Lock, Unlock, Download, Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, Award, ChevronRight, CheckCircle } from 'lucide-react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mot de passe pour la démo: "boreal"
  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'boreal') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect. Essayez "boreal"');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Aurora Effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-600 rounded-full blur-[120px]"></div>
        </div>

        <div className="z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl mb-4 shadow-lg shadow-cyan-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">BORÉALYTICS</h1>
            <p className="text-cyan-400 text-sm uppercase tracking-widest mt-2">Votre boussole numérique</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Espace sécurisé - Accès client</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                placeholder="Entrez le mot de passe"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-900/50 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Accéder au profil
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-xs">Indice : le mot de passe est <span className="font-mono text-cyan-500">boreal</span></p>
          </div>
        </div>
      </div>
    );
  }

  // CV CONTENT (Once Authenticated)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

      {/* Header / Hero Section */}
      <header className="bg-slate-900 text-white pb-20 pt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-400 rounded-full blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                  CONSULTANT DISPONIBLE
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Ludovic Asselin, <span className="text-cyan-400">ing., PMP</span></h1>
              <h2 className="text-xl md:text-2xl text-slate-300">Président, Boréalytics</h2>
              <p className="mt-4 text-lg text-slate-400 max-w-2xl italic">"Votre boussole numérique pour l'optimisation des PME"</p>
            </div>

            <div className="flex flex-col gap-3 items-start md:items-end">
              <a href="mailto:ludovic@borealytics.com" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-cyan-400" /> ludovic@borealytics.com
              </a>
              <a href="tel:+14189980901" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-cyan-400" /> 418-998-0901
              </a>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" /> Saint-Damien, QC
              </div>
              <button className="mt-2 px-6 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2 shadow-lg">
                <Download className="w-4 h-4" /> Télécharger CV (PDF)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="container mx-auto px-6 -mt-12 mb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Skills & Profile */}
          <div className="space-y-8">
            {/* Profil Card */}
            <div className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-cyan-600">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-600" /> Profil
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Expert en transformation numérique et ingénieur d'expérience cumulant plus de 15 ans en gestion. Je combine une expertise technique en <strong>BI (SQL, Tableau)</strong> et en amélioration continue <strong>(Lean, Six Sigma)</strong> pour aider les PME à structurer leurs données.
              </p>
            </div>

            {/* Competences */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-600" /> Compétences Clés
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Numérique & Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Business Intelligence', 'Tableau', 'SQL', 'Excel Avancé', 'Office 365', 'Diagnostic Numérique'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Opérations</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Gestion de flotte', 'Lean', 'Six Sigma', 'Logistique', 'BPR'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Certifications</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> PMP (PMI)</li>
                    <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> ITIL</li>
                    <li className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> Lean Six Sigma</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-600" /> Formation
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-bold text-slate-800">Baccalauréat Génie Électrique</div>
                  <div className="text-xs text-slate-500">Université Laval (2003-2007)</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">D.E.C. Sciences Natures</div>
                  <div className="text-xs text-slate-500">Collège Champlain-St. Lawrence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 border-b pb-2 border-slate-200">Expérience Professionnelle</h3>

            {/* Experience Card 1 */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border-l-4 border-cyan-500">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Directeur, Gestion Matières Résiduelles</h4>
                  <div className="text-cyan-700 font-medium">MRC de Bellechasse</div>
                </div>
                <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block">
                  Août 2023 - Présent
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4 italic">Transformation d'un service opérationnel (26 employés, flotte de 15 camions).</p>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm"><strong>Virage Numérique :</strong> Implantation de KPI pour suivre la productivité et les coûts à la tonne. Prise de décision basée sur les données.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm"><strong>Optimisation Lean :</strong> Réduction des temps d'arrêt de machinerie et optimisation des routes de collecte.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm"><strong>Gestion du Changement :</strong> Accompagnement de l'équipe terrain dans l'adoption technologique.</span>
                </li>
              </ul>
            </div>

            {/* Experience Card 2 */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border-l-4 border-slate-300">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Analyste Senior Gestion de Projet & BI</h4>
                  <div className="text-cyan-700 font-medium">TELUS</div>
                </div>
                <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block">
                  Nov 2013 - Août 2023
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm"><strong>Business Intelligence :</strong> Développement d'un système de suivi (SQL, Tableau) pour 15k commandes annuelles. Visibilité temps réel.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm"><strong>Productivité :</strong> Gains de 10% générés par l'analyse des processus et mesures d'efficacité.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm"><strong>Gestion Financière :</strong> Gestion d'un CAPEX de 100M$ pour des projets majeurs.</span>
                </li>
              </ul>
            </div>

            {/* Experience Card 3 */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border-l-4 border-slate-200 opacity-90">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Rôles Précédents</h4>
                  <div className="text-slate-600 text-sm font-medium">TELUS | Bell Canada | Club de Golf Bellechasse</div>
                </div>
                <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block">
                  2007 - 2013
                </div>
              </div>

              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5"></span>
                  Coordination de projets complexes (Gouv. Qc, Ville de Montréal).
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5"></span>
                  Gestion d'équipe technique (configuration commutateurs PSTN).
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5"></span>
                  VP Conseil d'Administration (Stratégie & Marketing Web).
                </li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center border-t border-slate-800">
        <p className="text-sm">© 2025 Boréalytics Inc. Tous droits réservés.</p>
        <p className="text-xs mt-2 opacity-50">Développé avec React & Tailwind</p>
      </footer>

    </div>
  );
};

export default App;