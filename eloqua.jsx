import { useState, useRef, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ttuqjkqeuvokoiltngqo.supabase.co";
const SUPABASE_KEY = "sb_publishable_CfyiIAFfBy00m2dtekpbPg_qF7kwPqz";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const THEMES_UI = {
  theatre: { name: "Théâtre", icon: "🎭", bg: "#0D0A06", surface: "#1A1410", border: "#B8965A", accent: "#B8965A", accent2: "#8B6914", text: "#FAF0DC", textMuted: "#9A8A6A", gradient: "linear-gradient(135deg,#0D0A06 0%,#1A1008 100%)", glow: "rgba(184,150,90,0.15)" },
  classique: { name: "Classique", icon: "📜", bg: "#F5F0E8", surface: "#FFFFFF", border: "#8B1A1A", accent: "#8B1A1A", accent2: "#6B0F0F", text: "#1A0A0A", textMuted: "#6B5555", gradient: "linear-gradient(135deg,#F5F0E8 0%,#EDE5D5 100%)", glow: "rgba(139,26,26,0.1)" },
  moderne: { name: "Moderne", icon: "⚡", bg: "#050510", surface: "#0D0D1F", border: "#4A6FFF", accent: "#4A6FFF", accent2: "#2A4FDF", text: "#E8EAFF", textMuted: "#6870AA", gradient: "linear-gradient(135deg,#050510 0%,#0A0A25 100%)", glow: "rgba(74,111,255,0.15)" },
  nature: { name: "Nature", icon: "🌿", bg: "#F2F7F2", surface: "#FFFFFF", border: "#2D6A4F", accent: "#2D6A4F", accent2: "#1B4332", text: "#1B2E1B", textMuted: "#52796F", gradient: "linear-gradient(135deg,#F2F7F2 0%,#E8F4E8 100%)", glow: "rgba(45,106,79,0.1)" },
  nuit: { name: "Nuit", icon: "🌙", bg: "#08080F", surface: "#10101A", border: "#9B7FD4", accent: "#9B7FD4", accent2: "#7B5FB4", text: "#EAE0FF", textMuted: "#6B5F8A", gradient: "linear-gradient(135deg,#08080F 0%,#0F0F1F 100%)", glow: "rgba(155,127,212,0.15)" },
};

const CRITERES = ["Structure", "Clarté", "Rythme", "Impact", "Vocabulaire"];

const SUJETS_DEBAT = [
  // Société
  "Le télétravail devrait être le mode de travail par défaut",
  "Les réseaux sociaux font plus de mal que de bien à la société",
  "L'école devrait enseigner la méditation dès le primaire",
  "La semaine de 4 jours devrait être généralisée",
  "Les voitures personnelles devraient être interdites en centre-ville",
  // Philosophie
  "Le bonheur est-il une question de choix ou de destin ?",
  "Vaut-il mieux une vie courte et intense ou longue et paisible ?",
  "La liberté absolue est-elle compatible avec la vie en société ?",
  "Le progrès technique rend-il l'humanité plus heureuse ?",
  "Peut-on être heureux sans être libre ?",
  // Éthique
  "L'intelligence artificielle menace-t-elle l'humanité ?",
  "Faut-il imposer des quotas de diversité dans les entreprises ?",
  "Le végétarisme devrait-il être encouragé par l'État ?",
  "Les données personnelles appartiennent-elles vraiment à leurs utilisateurs ?",
  "La peine de mort est-elle jamais justifiable ?",
  // Culture
  "L'art contemporain a-t-il encore du sens ?",
  "Les jeux vidéo sont-ils un art à part entière ?",
  "La culture populaire appauvrit-elle le goût artistique ?",
  "Faut-il préserver les langues régionales ?",
  "Le cinéma français est-il en déclin ?",
  // Politique
  "Le vote devrait être obligatoire",
  "La monarchie constitutionnelle est préférable à la république",
  "L'Europe devrait avoir une armée commune",
  "Le revenu universel est une utopie réalisable",
  "Les frontières sont-elles encore nécessaires au XXIe siècle ?",
];

const EXERCICES_ELOCUTION = [
  { titre: "Virelangues Progressifs", niveau: "Débutant", duree: "5 min", objectif: "Articulation", premium: false, desc: "Niveau 1 : «Un chasseur sachant chasser sait chasser sans son chien.»\nNiveau 2 : «Ces cyprès sont si loin qu'on ne sait si l'on voit ces cyprès.»\nNiveau 3 : «Seize jacinthes sèchent dans seize sachets secs.»\nRépétez chaque phrase 10 fois en accélérant progressivement." },
  { titre: "Voyelles Ouvertes", niveau: "Débutant", duree: "5 min", objectif: "Résonance", premium: false, desc: "Prononcez lentement : A — E — I — O — U — OU. Exagérez l'ouverture de la bouche. Sentez les vibrations dans votre poitrine. Répétez 3 séries de 10." },
  { titre: "Les Consonnes Explosives", niveau: "Débutant", duree: "5 min", objectif: "Percussion", premium: false, desc: "Répétez en marquant chaque consonne : «Pa-Ba-Ta-Da-Ka-Ga». Placez votre main devant la bouche et sentez l'air. Chaque consonne doit être nette et percutante." },
  { titre: "La Respiration de l'Orateur", niveau: "Débutant", duree: "10 min", objectif: "Souffle", premium: false, desc: "Inspirez 4 secondes, retenez 4 secondes, expirez 8 secondes. Répétez 8 fois debout. Puis prononcez une longue phrase en une seule expiration." },
  { titre: "Le Débit Maîtrisé", niveau: "Intermédiaire", duree: "10 min", objectif: "Rythme", premium: true, desc: "Lisez un texte à voix haute avec un métronome à 60 bpm. Une syllabe par temps. Puis à 80, puis 100. Observez comment votre articulation change avec la vitesse." },
  { titre: "La Projection Vocale", niveau: "Intermédiaire", duree: "10 min", objectif: "Volume", premium: true, desc: "Imaginez que vous parlez à quelqu'un à 10 mètres. Projetez votre voix sans crier. Le son doit venir du diaphragme, pas de la gorge. Posez une main sur le ventre." },
  { titre: "Le Silence Maîtrisé", niveau: "Intermédiaire", duree: "10 min", objectif: "Pausation", premium: true, desc: "Lisez un texte et placez une pause de 3 secondes après chaque virgule, 5 secondes après chaque point. Inconfortable au début, souverain à l'arrivée." },
  { titre: "Les Intonations Contrastées", niveau: "Intermédiaire", duree: "15 min", objectif: "Mélodie", premium: true, desc: "Prononcez la même phrase avec 6 émotions : joie, tristesse, colère, surprise, ironie, solennité. Notez comment votre corps change pour chaque émotion." },
  { titre: "La Voix du Personnage", niveau: "Avancé", duree: "15 min", objectif: "Timbre", premium: true, desc: "Inventez 3 personnages avec des voix différentes : un vieillard sage, un enfant curieux, un général autoritaire. Lisez le même texte avec chacun d'eux." },
  { titre: "L'Improvisation Rhétorique", niveau: "Avancé", duree: "15 min", objectif: "Spontanéité", premium: true, desc: "Tirez un mot au hasard et parlez-en 2 minutes sans préparation. Structure : définition → exemple personnel → ouverture philosophique. Sans notes." },
];

const SCENES_THEATRE = [
  { titre: "Le Malade Imaginaire", type: "Classique", auteur: "Molière", niveau: "Intermédiaire", premium: true, personnage_ia: "Argan", personnage_user: "Toinette", contexte: "Argan veut marier sa fille Angélique à un médecin. Toinette, la servante insolente, s'y oppose avec esprit.", replique_ia: "Je veux, je dis, que ma fille épouse M. Diafoirus, et c'est une chose que j'ai résolue. Je suis le maître ici !" },
  { titre: "Le Bourgeois Gentilhomme", type: "Classique", auteur: "Molière", niveau: "Débutant", premium: false, personnage_ia: "M. Jourdain", personnage_user: "Le Maître de Philosophie", contexte: "M. Jourdain, bourgeois vaniteux, découvre qu'il fait de la prose sans le savoir. Il veut tout apprendre pour impressionner la noblesse.", replique_ia: "Apprenez-moi l'orthographe ! Et puis vous m'apprendrez l'almanach, pour savoir quand il y a de la lune et quand il n'y en a point." },
  { titre: "Cyrano de Bergerac", type: "Classique", auteur: "Rostand", niveau: "Avancé", premium: true, personnage_ia: "Roxane", personnage_user: "Cyrano", contexte: "Cyrano, poète au grand nez, aime Roxane en secret. Elle lui confie aimer Christian. Cyrano doit cacher sa souffrance avec panache.", replique_ia: "Je voulais vous parler, mais n'osais pas. Votre cousin m'a dit vos improvisations, vos vers... Je suis émue, je vous l'avoue." },
  { titre: "L'Entretien d'Embauche", type: "Contemporain", auteur: "Scène moderne", niveau: "Débutant", premium: false, personnage_ia: "Le Recruteur", personnage_user: "Le Candidat", contexte: "Un entretien pour un poste de manager. Le recruteur est exigeant mais bienveillant. Le candidat doit convaincre avec éloquence et assurance.", replique_ia: "Bonjour. Asseyez-vous. Alors, pourquoi avoir postulé chez nous ? Et surtout, pourquoi devrions-nous vous choisir vous, plutôt qu'un autre ?" },
  { titre: "La Rupture", type: "Contemporain", auteur: "Scène moderne", niveau: "Intermédiaire", premium: true, personnage_ia: "Alex", personnage_user: "Jordan", contexte: "Deux amis de longue date. L'un a trahi la confiance de l'autre. La confrontation est inévitable. Gérer l'émotion tout en restant éloquent.", replique_ia: "Je pensais pouvoir te faire confiance. On se connaît depuis dix ans. Dix ans. Et tu m'as menti. Je veux juste comprendre... pourquoi ?" },
  { titre: "Le Discours Politique", type: "Contemporain", auteur: "Scène moderne", niveau: "Avancé", premium: true, personnage_ia: "Le Journaliste", personnage_user: "Le Politique", contexte: "Conférence de presse tendue. Le journaliste questionne, interpelle, provoque. Le politique doit répondre avec éloquence, sans se déstabiliser.", replique_ia: "Monsieur le Ministre, les sondages vous donnent à 28%. Vos promesses de campagne n'ont pas été tenues. Comment osez-vous demander la confiance des Français ?" },
  { titre: "Phèdre", type: "Classique", auteur: "Racine", niveau: "Avancé", premium: true, personnage_ia: "Hippolyte", personnage_user: "Phèdre", contexte: "Phèdre avoue son amour interdit pour Hippolyte, son beau-fils. Une scène d'une intensité tragique absolue. Maîtriser l'émotion dans le texte classique.", replique_ia: "Madame, j'ignore ce que vous voulez dire... Mais je ne puis trahir mon père, ni manquer à l'honneur. Parlez cependant. Je vous écoute." },
  { titre: "La Négociation", type: "Contemporain", auteur: "Scène moderne", niveau: "Intermédiaire", premium: true, personnage_ia: "Le Client", personnage_user: "Le Commercial", contexte: "Négociation commerciale tendue. Le client hésite, questionne le prix, compare. Le commercial doit défendre sa valeur avec conviction et élégance.", replique_ia: "Votre offre m'intéresse, je ne vais pas vous mentir. Mais vos concurrents proposent 30% moins cher. Donnez-moi une bonne raison de vous choisir." },
];

const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };

export default function Eloqua() {
  const [uiTheme, setUiTheme] = useState(() => load("eq_theme", "theatre"));
  const [showThemes, setShowThemes] = useState(false);
  const [page, setPage] = useState("landing");
  const [subPage, setSubPage] = useState(null);

  const [user, setUser] = useState(() => load("eq_user", null));
  const [authMode, setAuthMode] = useState("register");
  const [authForm, setAuthForm] = useState({ email: "", password: "", prenom: "", objectif: "" });
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  const [plan, setPlan] = useState(() => load("eq_plan", "gratuit"));
  const [analysesCount, setAnalysesCount] = useState(() => load("eq_analyses_count", 0));
  const [history, setHistory] = useState(() => load("eq_history", []));

  // Analyse
  const [mode, setMode] = useState("texte");
  const [textInput, setTextInput] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Débat
  const [sujetDebat, setSujetDebat] = useState("");
  const [debatTexte, setDebatTexte] = useState("");
  const [debatFeedback, setDebatFeedback] = useState(null);
  const [debatLoading, setDebatLoading] = useState(false);

  // Théâtre
  const [sceneActive, setSceneActive] = useState(null);
  const [theatreMessages, setTheatreMessages] = useState([]);
  const [theatreInput, setTheatreInput] = useState("");
  const [theatreLoading, setTheatreLoading] = useState(false);
  const [theatreFeedback, setTheatreFeedback] = useState(null);
  const [theatreEchanges, setTheatreEchanges] = useState(0);

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);
  const t = THEMES_UI[uiTheme];

  useEffect(() => { save("eq_theme", uiTheme); }, [uiTheme]);
  useEffect(() => { save("eq_history", history); }, [history]);
  useEffect(() => { save("eq_analyses_count", analysesCount); }, [analysesCount]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [theatreMessages]);
  useEffect(() => {
    if (timerRunning) { timerRef.current = setInterval(() => setTimer(s => s + 1), 1000); }
    else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const formatTime = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const canAnalyse = plan === "premium" || plan === "essai" || analysesCount < 3;
  const isPremium = plan === "premium" || plan === "essai";
  const tirerSujet = () => setSujetDebat(SUJETS_DEBAT[Math.floor(Math.random() * SUJETS_DEBAT.length)]);

  const handleRegister = async () => {
    if (!authForm.email || !authForm.password || !authForm.prenom) { setAuthError("Veuillez remplir tous les champs obligatoires."); return; }
    if (authForm.password.length < 6) { setAuthError("Le mot de passe doit contenir au moins 6 caractères."); return; }
    setAuthError("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: authForm.email,
        password: authForm.password,
        options: { data: { prenom: authForm.prenom, objectif: authForm.objectif } }
      });
      if (error) { setAuthError(error.message); return; }
      const u = { email: authForm.email, prenom: authForm.prenom, objectif: authForm.objectif, id: data.user?.id };
      save("eq_user", u); save("eq_plan", "essai");
      setUser(u); setPlan("essai");
      setAuthSuccess(`✉️ Email de confirmation envoyé à ${authForm.email}. Bienvenue ${authForm.prenom} ! Votre essai 7 jours commence maintenant.`);
      setTimeout(() => { setAuthSuccess(""); setPage("analyser"); }, 2800);
    } catch (e) { setAuthError("Erreur lors de l'inscription. Réessayez."); }
  };

  const handleLogin = async () => {
    if (!authForm.email || !authForm.password) { setAuthError("Veuillez remplir tous les champs."); return; }
    setAuthError("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: authForm.email, password: authForm.password });
      if (error) { setAuthError("Email ou mot de passe incorrect."); return; }
      const meta = data.user?.user_metadata || {};
      const u = { email: authForm.email, prenom: meta.prenom || authForm.email, objectif: meta.objectif || "", id: data.user?.id };
      save("eq_user", u); setUser(u); setAuthError(""); setPage("analyser");
    } catch (e) { setAuthError("Erreur de connexion. Réessayez."); }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setUser(null); setPage("landing"); };
  const STRIPE_LINK = "https://buy.stripe.com/test_00wfZgcJr3D03OM1nHgEg00";
  const activatePremium = () => { window.open(STRIPE_LINK, "_blank"); };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunks.current = [];
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = e => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = () => stream.getTracks().forEach(t => t.stop());
      mediaRecorder.current.start();
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SR();
        recognitionRef.current.lang = "fr-FR"; recognitionRef.current.continuous = true; recognitionRef.current.interimResults = false;
        let full = "";
        recognitionRef.current.onresult = e => { for (let i = e.resultIndex; i < e.results.length; i++) { if (e.results[i].isFinal) full += e.results[i][0].transcript + " "; } setTranscript(full); };
        recognitionRef.current.start();
      }
      setRecording(true); setTimer(0); setTimerRunning(true); setFeedback(null);
    } catch { alert("Accès au microphone refusé."); }
  };
  const stopRecording = () => { mediaRecorder.current?.stop(); recognitionRef.current?.stop(); setRecording(false); setTimerRunning(false); };

  const callClaude = async (systemPrompt, userMsg) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages: [{ role: "user", content: userMsg }] }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "";
  };

  const callClaudeMulti = async (systemPrompt, messages) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "";
  };

  const analyserDiscours = async texte => {
    if (!texte.trim() || !canAnalyse) return;
    setLoading(true); setFeedback(null);
    try {
      const raw = await callClaude(
        `Tu es Eloqua, coach expert en éloquence. Réponds UNIQUEMENT en JSON valide sans markdown ni backticks. Format: {"scores":{"Structure":0-100,"Clarté":0-100,"Rythme":0-100,"Impact":0-100,"Vocabulaire":0-100},"scoreGlobal":0-100,"titre":"titre court","synthese":"2-3 phrases","pointsForts":["fort1","fort2","fort3"],"ameliorations":[{"passage":"extrait exact 10-20 mots","probleme":"description","suggestion":"conseil concret"},{"passage":"autre","probleme":"p","suggestion":"s"}],"exercice":"exercice personnalisé"}`,
        `Analyse ce discours:\n\n${texte}`
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setFeedback(parsed);
      const entry = { date: new Date().toLocaleDateString("fr-FR"), score: parsed.scoreGlobal, titre: parsed.titre || "Discours", type: "analyse" };
      setHistory(prev => [entry, ...prev].slice(0, 30));
      if (plan === "gratuit") setAnalysesCount(c => c + 1);
    } catch { setFeedback({ erreur: "Analyse impossible." }); }
    setLoading(false);
  };

  const analyserDebat = async () => {
    if (!debatTexte.trim() || !sujetDebat) return;
    setDebatLoading(true); setDebatFeedback(null);
    try {
      const raw = await callClaude(
        `Tu es Eloqua, expert en rhétorique et art du débat. Réponds UNIQUEMENT en JSON valide sans markdown ni backticks. Format: {"scoreGlobal":0-100,"scores":{"Thèse":0-100,"Arguments":0-100,"Réfutation":0-100,"Éloquence":0-100,"Conviction":0-100},"synthese":"analyse en 2-3 phrases","pointsForts":["f1","f2"],"ameliorations":[{"passage":"extrait","probleme":"p","suggestion":"s"}],"contreArguments":["contre-argument que l'adversaire pourrait utiliser 1","contre-argument 2"],"exercice":"conseil personnalisé pour mieux débattre"}`,
        `Sujet du débat : "${sujetDebat}"\n\nArgument présenté :\n${debatTexte}`
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setDebatFeedback(parsed);
      const entry = { date: new Date().toLocaleDateString("fr-FR"), score: parsed.scoreGlobal, titre: `Débat: ${sujetDebat.slice(0, 40)}...`, type: "debat" };
      setHistory(prev => [entry, ...prev].slice(0, 30));
    } catch { setDebatFeedback({ erreur: "Analyse impossible." }); }
    setDebatLoading(false);
  };

  const demarrerScene = (scene) => {
    if (scene.premium && !isPremium) { setPage("tarifs"); return; }
    setSceneActive(scene);
    setTheatreMessages([{ role: "assistant", content: scene.replique_ia }]);
    setTheatreEchanges(0);
    setTheatreFeedback(null);
    setSubPage("scene");
  };

  const envoyerReplique = async () => {
    if (!theatreInput.trim() || !sceneActive) return;
    const userMsg = theatreInput;
    setTheatreInput("");
    const newMessages = [...theatreMessages, { role: "user", content: userMsg }];
    setTheatreMessages(newMessages);
    setTheatreLoading(true);
    const newEchanges = theatreEchanges + 1;
    setTheatreEchanges(newEchanges);
    try {
      if (newEchanges >= 4) {
        const histText = newMessages.map(m => `${m.role === "user" ? sceneActive.personnage_user : sceneActive.personnage_ia}: ${m.content}`).join("\n");
        const raw = await callClaude(
          `Tu es Eloqua. Réponds UNIQUEMENT en JSON valide sans markdown. Format: {"scoreGlobal":0-100,"scores":{"Présence":0-100,"Émotion":0-100,"Éloquence":0-100,"Jeu":0-100},"synthese":"2 phrases","pointsForts":["f1","f2"],"ameliorations":[{"passage":"extrait","probleme":"p","suggestion":"s"}],"prochainExercice":"exercice théâtral recommandé"}`,
          `Évalue cette scène de théâtre jouée par l'utilisateur dans le rôle de ${sceneActive.personnage_user}:\n\n${histText}`
        );
        const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
        setTheatreFeedback(parsed);
        setTheatreMessages(prev => [...prev, { role: "assistant", content: "🎭 Bravo ! La scène est terminée. Voici votre évaluation ci-dessous.", system: true }]);
      } else {
        const sysPrompt = `Tu joues le rôle de ${sceneActive.personnage_ia} dans "${sceneActive.titre}" de ${sceneActive.auteur}. Contexte : ${sceneActive.contexte}. Reste STRICTEMENT dans le personnage. Réponds en français avec le style et le ton du personnage. Réponse courte (2-4 phrases maximum). Pas d'indication de mise en scène entre crochets.`;
        const reply = await callClaudeMulti(sysPrompt, newMessages);
        setTheatreMessages(prev => [...prev, { role: "assistant", content: reply }]);
      }
    } catch { setTheatreMessages(prev => [...prev, { role: "assistant", content: "Une erreur est survenue." }]); }
    setTheatreLoading(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    .app{min-height:100vh;background:${t.gradient};color:${t.text};font-family:'Jost',sans-serif;transition:all 0.4s;}
    .header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid ${t.border}33;background:${t.surface}CC;backdrop-filter:blur(12px);position:sticky;top:0;z-index:100;gap:10px;flex-wrap:wrap;}
    .logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;letter-spacing:3px;color:${t.accent};cursor:pointer;white-space:nowrap;}
    .nav{display:flex;gap:2px;flex-wrap:wrap;}
    .nb{background:none;border:none;cursor:pointer;padding:6px 9px;border-radius:7px;font-family:'Jost',sans-serif;font-size:12px;color:${t.textMuted};transition:all 0.2s;}
    .nb:hover,.nb.active{color:${t.accent};background:${t.glow};}
    .hbtn{background:${t.surface};border:1px solid ${t.border}44;border-radius:8px;cursor:pointer;padding:6px 10px;color:${t.text};font-size:12px;display:flex;align-items:center;gap:5px;transition:all 0.2s;}
    .hbtn:hover{border-color:${t.accent};}
    .tpicker{position:absolute;top:60px;right:18px;background:${t.surface};border:1px solid ${t.border}55;border-radius:12px;padding:6px;z-index:200;box-shadow:0 8px 32px rgba(0,0,0,0.3);min-width:130px;}
    .topt{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:7px;cursor:pointer;font-size:13px;border:none;background:none;color:${t.text};font-family:'Jost',sans-serif;width:100%;text-align:left;transition:all 0.15s;}
    .topt:hover{background:${t.glow};color:${t.accent};}
    .page{padding:18px;max-width:680px;margin:0 auto;}
    .stitle{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:${t.accent};margin-bottom:5px;letter-spacing:1px;}
    .ssub{font-size:13px;color:${t.textMuted};margin-bottom:20px;line-height:1.6;}
    .card{background:${t.surface};border:1px solid ${t.border}33;border-radius:14px;padding:18px;transition:all 0.25s;}
    .card-hover{cursor:pointer;}
    .card-hover:hover{border-color:${t.accent};transform:translateY(-2px);box-shadow:0 6px 28px ${t.glow};}
    .input{width:100%;background:${t.surface};border:1px solid ${t.border}44;border-radius:9px;padding:11px 13px;color:${t.text};font-family:'Jost',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;margin-bottom:10px;}
    .input:focus{border-color:${t.accent};}
    select.input{cursor:pointer;}
    .textarea{width:100%;background:${t.surface};border:1px solid ${t.border}44;border-radius:12px;padding:13px;color:${t.text};font-family:'Jost',sans-serif;font-size:14px;line-height:1.7;resize:vertical;min-height:130px;outline:none;margin-bottom:12px;transition:border-color 0.2s;}
    .textarea:focus{border-color:${t.accent};}
    .btn{border:none;border-radius:9px;padding:11px 22px;font-family:'Jost',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;letter-spacing:0.5px;}
    .btn-primary{background:${t.accent};color:#fff;width:100%;}
    .btn-primary:hover{background:${t.accent2};transform:translateY(-1px);}
    .btn-primary:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
    .btn-outline{background:transparent;color:${t.accent};border:1px solid ${t.accent}55;width:100%;margin-top:8px;}
    .btn-outline:hover{background:${t.glow};}
    .btn-sm{padding:7px 14px;font-size:12px;background:${t.accent};color:#fff;border:none;border-radius:7px;cursor:pointer;transition:all 0.2s;}
    .btn-sm:hover{background:${t.accent2};}
    .btn-ghost{padding:7px 14px;font-size:12px;background:${t.glow};color:${t.accent};border:1px solid ${t.border}33;border-radius:7px;cursor:pointer;transition:all 0.2s;}
    .btn-ghost:hover{border-color:${t.accent};}
    .err{color:#FF6B6B;font-size:13px;margin-bottom:10px;padding:9px 13px;background:rgba(255,107,107,0.1);border-radius:8px;}
    .suc{color:#52B788;font-size:13px;margin-bottom:10px;padding:9px 13px;background:rgba(82,183,136,0.1);border-radius:8px;}
    .label{font-size:11px;color:${t.textMuted};letter-spacing:1px;text-transform:uppercase;margin-bottom:5px;display:block;}
    .divider{height:1px;background:${t.border}22;margin:18px 0;}
    .h3{font-family:'Cormorant Garamond',serif;font-size:18px;color:${t.accent};margin-bottom:9px;font-weight:600;}
    .badge{display:inline-flex;align-items:center;gap:5px;background:${t.glow};border:1px solid ${t.border}33;border-radius:7px;padding:4px 9px;font-size:12px;color:${t.accent};}
    .pill{display:inline-block;padding:3px 9px;border-radius:20px;font-size:11px;letter-spacing:0.5px;}
    .pill-essai{background:rgba(82,183,136,0.2);color:#52B788;}
    .pill-gratuit{background:${t.glow};color:${t.accent};}
    .pill-premium{background:${t.accent}22;color:${t.accent};}
    .tabs{display:flex;gap:5px;margin-bottom:18px;background:${t.surface};border-radius:10px;padding:4px;border:1px solid ${t.border}22;}
    .tab{flex:1;padding:8px 6px;border:none;border-radius:7px;cursor:pointer;font-family:'Jost',sans-serif;font-size:12px;transition:all 0.2s;background:none;color:${t.textMuted};text-align:center;}
    .tab.active{background:${t.accent};color:#fff;font-weight:500;}

    /* LANDING */
    .hero{text-align:center;padding:40px 16px 28px;}
    .hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(48px,10vw,84px);font-weight:300;letter-spacing:8px;color:${t.accent};line-height:1;}
    .hero-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:${t.textMuted};letter-spacing:2px;margin:7px 0 32px;}
    .plans-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;}
    @media(max-width:480px){.plans-grid{grid-template-columns:1fr;}.nav{gap:1px;}}
    .plan-card{background:${t.surface};border:1px solid ${t.border}33;border-radius:14px;padding:18px;text-align:center;position:relative;}
    .plan-card.featured{border-color:${t.accent};box-shadow:0 0 28px ${t.glow};}
    .plan-badge{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:${t.accent};color:#fff;font-size:9px;padding:2px 10px;border-radius:20px;white-space:nowrap;letter-spacing:1px;}
    .plan-name{font-family:'Cormorant Garamond',serif;font-size:20px;color:${t.accent};margin-bottom:3px;}
    .plan-price{font-size:26px;font-weight:500;color:${t.text};margin:6px 0 3px;}
    .plan-price span{font-size:12px;color:${t.textMuted};}
    .plan-features{list-style:none;margin:10px 0 14px;text-align:left;}
    .plan-features li{font-size:11px;color:${t.textMuted};padding:3px 0;display:flex;align-items:center;gap:5px;}
    .plan-features li::before{content:"✦";color:${t.accent};font-size:9px;}

    /* RECORD */
    .record-zone{background:${t.surface};border:2px solid ${t.border}44;border-radius:18px;padding:32px 18px;text-align:center;margin-bottom:14px;transition:all 0.3s;}
    .record-zone.rec{border-color:${t.accent};box-shadow:0 0 36px ${t.glow};}
    .rec-wrap{position:relative;width:68px;height:68px;margin:0 auto 14px;}
    .rec-btn{width:68px;height:68px;border-radius:50%;border:3px solid ${t.accent};background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;transition:all 0.25s;box-shadow:0 0 18px ${t.glow};position:relative;z-index:1;}
    .rec-btn.active{background:${t.accent};}
    .rec-btn:hover{transform:scale(1.05);}
    .ring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:68px;height:68px;border-radius:50%;border:2px solid ${t.accent};animation:rp 1.5s ease-out infinite;}
    @keyframes rp{0%{opacity:0.8;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.9)}}
    .timer-big{font-family:'Cormorant Garamond',serif;font-size:36px;color:${t.accent};letter-spacing:4px;}
    .timer-lbl{font-size:10px;color:${t.textMuted};letter-spacing:2px;text-transform:uppercase;margin-top:2px;}
    .mode-toggle{display:flex;gap:5px;margin-bottom:18px;background:${t.surface};border-radius:9px;padding:3px;border:1px solid ${t.border}22;}
    .mbtn{flex:1;padding:8px;border:none;border-radius:7px;cursor:pointer;font-family:'Jost',sans-serif;font-size:12px;transition:all 0.2s;background:none;color:${t.textMuted};}
    .mbtn.active{background:${t.accent};color:#fff;font-weight:500;}
    .tbox{background:${t.surface};border:1px solid ${t.border}33;border-radius:9px;padding:12px;font-size:13px;color:${t.textMuted};line-height:1.7;min-height:60px;margin-bottom:12px;}

    /* FEEDBACK */
    .sg{text-align:center;padding:24px 18px;background:${t.surface};border:2px solid ${t.border}44;border-radius:18px;margin-bottom:14px;}
    .sn{font-family:'Cormorant Garamond',serif;font-size:60px;font-weight:300;color:${t.accent};line-height:1;}
    .sl{font-size:10px;color:${t.textMuted};letter-spacing:3px;text-transform:uppercase;margin-top:3px;}
    .st{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:${t.text};margin-top:8px;}
    .scores-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:14px;}
    .si{background:${t.surface};border:1px solid ${t.border}22;border-radius:9px;padding:12px;}
    .sin{font-size:10px;color:${t.textMuted};text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;}
    .sbar{height:4px;background:${t.border}22;border-radius:2px;overflow:hidden;}
    .sbarfill{height:100%;border-radius:2px;background:${t.accent};transition:width 0.8s ease;}
    .sv{font-size:17px;font-weight:500;color:${t.accent};margin-top:4px;}
    .tag{display:inline-block;background:${t.accent}22;color:${t.accent};border-radius:5px;padding:3px 8px;font-size:11px;margin:3px 3px 0 0;}
    .ai{border-left:3px solid ${t.accent};padding:10px 13px;margin-bottom:9px;background:${t.glow};border-radius:0 7px 7px 0;}
    .ap{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:${t.textMuted};margin-bottom:4px;}
    .apb{font-size:12px;color:${t.text};margin-bottom:2px;font-weight:500;}
    .as{font-size:12px;color:${t.textMuted};}
    .exo-box{background:${t.accent}15;border:1px solid ${t.accent}44;border-radius:11px;padding:16px;}
    .exo-title{font-family:'Cormorant Garamond',serif;font-size:16px;color:${t.accent};margin-bottom:5px;}
    .exo-text{font-size:13px;color:${t.text};line-height:1.7;}

    /* DÉBAT */
    .sujet-box{background:${t.surface};border:2px solid ${t.accent}44;border-radius:14px;padding:20px;text-align:center;margin-bottom:16px;}
    .sujet-text{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:${t.text};line-height:1.4;margin-bottom:12px;}
    .contre-arg{background:${t.glow};border:1px solid ${t.border}33;border-radius:8px;padding:10px 13px;font-size:13px;color:${t.text};margin-bottom:7px;}
    .contre-arg::before{content:"⚔ ";color:${t.accent};}

    /* THÉÂTRE */
    .scene-card{background:${t.surface};border:1px solid ${t.border}33;border-radius:14px;padding:16px;margin-bottom:10px;cursor:pointer;transition:all 0.2s;}
    .scene-card:hover{border-color:${t.accent};box-shadow:0 4px 20px ${t.glow};}
    .scene-type{font-size:10px;color:${t.accent};background:${t.glow};padding:2px 7px;border-radius:4px;display:inline-block;margin-bottom:6px;letter-spacing:1px;}
    .scene-titre{font-family:'Cormorant Garamond',serif;font-size:19px;color:${t.accent};margin-bottom:3px;}
    .scene-meta{font-size:11px;color:${t.textMuted};}
    .chat-zone{background:${t.surface};border:1px solid ${t.border}33;border-radius:14px;padding:14px;min-height:280px;max-height:380px;overflow-y:auto;margin-bottom:12px;display:flex;flex-direction:column;gap:10px;}
    .msg{padding:10px 14px;border-radius:10px;font-size:13px;line-height:1.6;max-width:88%;}
    .msg-ia{background:${t.glow};border:1px solid ${t.border}33;align-self:flex-start;color:${t.text};}
    .msg-user{background:${t.accent}22;border:1px solid ${t.accent}33;align-self:flex-end;color:${t.text};}
    .msg-system{background:transparent;color:${t.accent};font-style:italic;text-align:center;font-size:12px;align-self:center;}
    .msg-name{font-size:10px;color:${t.textMuted};margin-bottom:3px;letter-spacing:1px;text-transform:uppercase;}
    .chat-input-row{display:flex;gap:8px;align-items:flex-end;}
    .chat-input{flex:1;background:${t.surface};border:1px solid ${t.border}44;border-radius:9px;padding:10px 13px;color:${t.text};font-family:'Jost',sans-serif;font-size:13px;outline:none;resize:none;min-height:44px;max-height:100px;transition:border-color 0.2s;}
    .chat-input:focus{border-color:${t.accent};}
    .send-btn{background:${t.accent};border:none;border-radius:9px;width:44px;height:44px;cursor:pointer;color:#fff;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;}
    .send-btn:hover{background:${t.accent2};}
    .send-btn:disabled{opacity:0.5;cursor:not-allowed;}
    .scene-header{background:${t.surface};border:1px solid ${t.border}33;border-radius:12px;padding:14px;margin-bottom:14px;}

    /* DASHBOARD */
    .stat-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin-bottom:18px;}
    .stat{background:${t.surface};border:1px solid ${t.border}33;border-radius:11px;padding:14px;text-align:center;}
    .stat-val{font-family:'Cormorant Garamond',serif;font-size:30px;color:${t.accent};}
    .stat-lbl{font-size:10px;color:${t.textMuted};letter-spacing:1px;text-transform:uppercase;margin-top:2px;}
    .hist-item{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid ${t.border}22;}
    .hist-score{font-family:'Cormorant Garamond',serif;font-size:20px;color:${t.accent};}

    .loading-dots{display:flex;justify-content:center;gap:7px;padding:24px;}
    .dot{width:8px;height:8px;border-radius:50%;background:${t.accent};animation:pulse 1.2s ease-in-out infinite;}
    .dot:nth-child(2){animation-delay:0.2s;}.dot:nth-child(3){animation-delay:0.4s;}
    @keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
    .lock-overlay{background:${t.surface};border:1px solid ${t.accent}33;border-radius:11px;padding:14px;text-align:center;margin-bottom:10px;}
    .progress-bar{display:flex;gap:3px;margin-bottom:14px;}
    .progress-step{flex:1;height:4px;border-radius:2px;background:${t.border}22;}
    .progress-step.done{background:${t.accent};}
  `;

  // ─── SUB-PAGES ────────────────────────────────────────────────────────────

  const SceneActive = () => (
    <div className="page">
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <button className="btn-ghost" onClick={() => { setSubPage(null); setSceneActive(null); setTheatreMessages([]); setTheatreFeedback(null); }}>← Retour</button>
        <span style={{ fontSize: 12, color: t.textMuted }}>{sceneActive?.titre} · {sceneActive?.auteur}</span>
      </div>
      <div className="scene-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: t.accent }}>{sceneActive?.titre}</div>
          <div className="progress-bar" style={{ width: 80, marginBottom: 0 }}>
            {[0,1,2,3].map(i => <div key={i} className={`progress-step ${i < theatreEchanges ? "done" : ""}`} />)}
          </div>
        </div>
        <div style={{ fontSize: 12, color: t.textMuted }}>{sceneActive?.contexte}</div>
        <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
          <span style={{ fontSize: 11, color: t.accent }}>Vous jouez : <strong>{sceneActive?.personnage_user}</strong></span>
          <span style={{ fontSize: 11, color: t.textMuted }}>IA joue : {sceneActive?.personnage_ia}</span>
        </div>
      </div>
      <div className="chat-zone">
        {theatreMessages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "user" ? "msg-user" : m.system ? "msg-system" : "msg-ia"}`}>
            {!m.system && <div className="msg-name">{m.role === "user" ? sceneActive?.personnage_user : sceneActive?.personnage_ia}</div>}
            {m.content}
          </div>
        ))}
        {theatreLoading && <div className="msg msg-ia"><div className="loading-dots" style={{ padding: "4px 0" }}><div className="dot"/><div className="dot"/><div className="dot"/></div></div>}
        <div ref={chatEndRef} />
      </div>
      {!theatreFeedback && theatreEchanges < 4 && (
        <div className="chat-input-row">
          <textarea className="chat-input" placeholder={`${sceneActive?.personnage_user} répond...`} value={theatreInput} onChange={e => setTheatreInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); envoyerReplique(); } }} rows={2} />
          <button className="send-btn" onClick={envoyerReplique} disabled={theatreLoading || !theatreInput.trim()}>↑</button>
        </div>
      )}
      {theatreFeedback && (
        <div style={{ marginTop: 8 }}>
          <div className="sg">
            <div className="sn">{theatreFeedback.scoreGlobal}</div>
            <div className="sl">Score de jeu</div>
          </div>
          {theatreFeedback.scores && (
            <div className="scores-grid">
              {Object.entries(theatreFeedback.scores).map(([k, v]) => (
                <div key={k} className="si"><div className="sin">{k}</div><div className="sbar"><div className="sbarfill" style={{ width: `${v}%` }} /></div><div className="sv">{v}/100</div></div>
              ))}
            </div>
          )}
          {theatreFeedback.synthese && <div className="card" style={{ marginBottom: 12 }}><div className="h3">Bilan</div><p style={{ fontSize: 13, lineHeight: 1.7 }}>{theatreFeedback.synthese}</p></div>}
          {theatreFeedback.pointsForts?.length > 0 && <div style={{ marginBottom: 12 }}>{theatreFeedback.pointsForts.map((f, i) => <span key={i} className="tag">{f}</span>)}</div>}
          {theatreFeedback.ameliorations?.length > 0 && (
            <div className="card" style={{ marginBottom: 12 }}>
              <div className="h3">Points à travailler</div>
              {theatreFeedback.ameliorations.map((a, i) => <div key={i} className="ai"><div className="ap">« {a.passage} »</div><div className="apb">⚠ {a.probleme}</div><div className="as">→ {a.suggestion}</div></div>)}
            </div>
          )}
          {theatreFeedback.prochainExercice && <div className="exo-box"><div className="exo-title">🎭 Prochain exercice recommandé</div><div className="exo-text">{theatreFeedback.prochainExercice}</div></div>}
          <div className="divider" />
          <button className="btn btn-outline" onClick={() => { setSubPage(null); setSceneActive(null); setTheatreMessages([]); setTheatreFeedback(null); }}>Rejouer une scène</button>
        </div>
      )}
    </div>
  );

  const PageLanding = () => (
    <div className="page">
      <div className="hero">
        <div className="hero-title">ELOQUA 🎭</div>
        <div className="hero-sub">L'art de la parole, sublimé par l'IA</div>
        <div className="badge">✦ Essai gratuit 7 jours · Sans carte bancaire</div>
      </div>
      <div className="plans-grid">
        {[
          { nom: "Gratuit", prix: "0€", desc: "/mois", features: ["3 analyses/mois", "Score global", "2 exercices", "1 scène théâtre"], featured: false },
          { nom: "Premium", prix: "5,99€", desc: "/mois", features: ["Analyses illimitées", "Feedback localisé IA", "Tous les exercices", "Toutes les scènes", "Générateur de débats", "Historique complet"], featured: true },
          { nom: "Essai 7j", prix: "Gratuit", desc: "puis 5,99€", features: ["Premium complet", "Sans CB", "Sans engagement"], featured: false },
        ].map((p, i) => (
          <div key={i} className={`plan-card ${p.featured ? "featured" : ""}`}>
            {p.featured && <div className="plan-badge">✦ POPULAIRE</div>}
            <div className="plan-name">{p.nom}</div>
            <div className="plan-price">{p.prix} <span>{p.desc}</span></div>
            <ul className="plan-features">{p.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
            <button className="btn btn-primary" style={{ fontSize: 12, padding: "9px" }} onClick={() => { setAuthMode("register"); setPage("auth"); }}>Commencer</button>
          </div>
        ))}
      </div>
      <div className="divider" />
      <p style={{ textAlign: "center", fontSize: 13, color: t.textMuted }}>Déjà un compte ? <span style={{ color: t.accent, cursor: "pointer" }} onClick={() => { setAuthMode("login"); setPage("auth"); }}>Se connecter →</span></p>
    </div>
  );

  const PageAuth = () => (
    <div className="page" style={{ maxWidth: 420 }}>
      <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 20 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, color: t.accent, letterSpacing: 4 }}>ELOQUA 🎭</div>
        <div style={{ fontSize: 13, color: t.textMuted, marginTop: 3 }}>{authMode === "register" ? "Créer votre compte" : "Connexion"}</div>
      </div>
      <div className="card">
        {authMode === "register" && <><span className="label">Prénom *</span><input className="input" placeholder="Votre prénom" value={authForm.prenom} onChange={e => setAuthForm({ ...authForm, prenom: e.target.value })} /></>}
        <span className="label">Email *</span>
        <input className="input" type="email" placeholder="votre@email.com" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} />
        <span className="label">Mot de passe *</span>
        <input className="input" type="password" placeholder={authMode === "register" ? "Minimum 6 caractères" : "Votre mot de passe"} value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} />
        {authMode === "register" && (
          <><span className="label">Votre objectif</span>
          <select className="input" value={authForm.objectif} onChange={e => setAuthForm({ ...authForm, objectif: e.target.value })}>
            <option value="">Choisir...</option>
            <option>Prise de parole professionnelle</option>
            <option>Préparer un examen oral</option>
            <option>Réduire le stress en public</option>
            <option>Art oratoire et théâtre</option>
            <option>Débat et argumentation</option>
            <option>Autre</option>
          </select></>
        )}
        {authError && <div className="err">{authError}</div>}
        {authSuccess && <div className="suc">{authSuccess}</div>}
        <button className="btn btn-primary" onClick={authMode === "register" ? handleRegister : handleLogin}>
          {authMode === "register" ? "✦ Créer mon compte & démarrer l'essai" : "Se connecter"}
        </button>
        <button className="btn btn-outline" onClick={() => setAuthMode(authMode === "register" ? "login" : "register")}>
          {authMode === "register" ? "Déjà un compte ? Connexion" : "Pas de compte ? S'inscrire"}
        </button>
      </div>
    </div>
  );

  const PageAnalyser = () => (
    <div className="page">
      <div className="stitle">Analyser mon discours</div>
      <div className="ssub">
        <span className={`pill ${plan === "essai" ? "pill-essai" : plan === "premium" ? "pill-premium" : "pill-gratuit"}`}>
          {plan === "essai" ? "✦ Essai Premium" : plan === "premium" ? "✦ Premium" : `Gratuit — ${Math.max(0, 3 - analysesCount)} analyse(s) restante(s)`}
        </span>
      </div>
      <div className="mode-toggle">
        <button className={`mbtn ${mode === "vocal" ? "active" : ""}`} onClick={() => setMode("vocal")}>🎙️ Vocal</button>
        <button className={`mbtn ${mode === "texte" ? "active" : ""}`} onClick={() => setMode("texte")}>✍️ Texte</button>
      </div>
      {mode === "vocal" && (
        <div className={`record-zone ${recording ? "rec" : ""}`}>
          <div className="rec-wrap">
            {recording && <div className="ring" />}
            <button className={`rec-btn ${recording ? "active" : ""}`} onClick={recording ? stopRecording : startRecording}>{recording ? "⏹" : "🎙"}</button>
          </div>
          <div className="timer-big">{formatTime(timer)}</div>
          <div className="timer-lbl">{recording ? "Enregistrement en cours..." : "Appuyez pour démarrer"}</div>
        </div>
      )}
      {mode === "vocal" && transcript && <><div className="label" style={{ marginBottom: 5 }}>Transcription</div><div className="tbox">{transcript}</div></>}
      {mode === "texte" && <textarea className="textarea" placeholder="Collez ou rédigez votre discours ici..." value={textInput} onChange={e => setTextInput(e.target.value)} />}
      {((mode === "vocal" && transcript) || (mode === "texte" && textInput)) && !loading && canAnalyse && (
        <button className="btn btn-primary" onClick={() => analyserDiscours(mode === "vocal" ? transcript : textInput)}>✦ Analyser mon éloquence</button>
      )}
      {!canAnalyse && (
        <div className="lock-overlay"><p style={{ fontSize: 13, color: t.textMuted, marginBottom: 10 }}>Vous avez utilisé vos 3 analyses gratuites.</p><button className="btn-sm" onClick={() => setPage("tarifs")}>Passer Premium — 5,99€/mois</button></div>
      )}
      {loading && <div style={{ textAlign: "center" }}><div className="loading-dots"><div className="dot"/><div className="dot"/><div className="dot"/></div><p style={{ color: t.textMuted, fontSize: 12, fontStyle: "italic" }}>Analyse en cours...</p></div>}
      {feedback && !feedback.erreur && (
        <div style={{ marginTop: 20 }}>
          <div className="sg"><div className="sn">{feedback.scoreGlobal}</div><div className="sl">Score d'éloquence</div>{feedback.titre && <div className="st">« {feedback.titre} »</div>}</div>
          {feedback.synthese && <div className="card" style={{ marginBottom: 12 }}><div className="h3">Synthèse</div><p style={{ fontSize: 13, lineHeight: 1.7 }}>{feedback.synthese}</p></div>}
          {feedback.scores && <><div className="h3">Évaluation détaillée</div><div className="scores-grid">{CRITERES.map(c => <div key={c} className="si"><div className="sin">{c}</div><div className="sbar"><div className="sbarfill" style={{ width: `${feedback.scores[c]}%` }}/></div><div className="sv">{feedback.scores[c]}/100</div></div>)}</div></>}
          {feedback.pointsForts?.length > 0 && <div className="card" style={{ marginBottom: 12 }}><div className="h3">✦ Points forts</div>{feedback.pointsForts.map((p, i) => <span key={i} className="tag">{p}</span>)}</div>}
          {isPremium && feedback.ameliorations?.length > 0 && <div className="card" style={{ marginBottom: 12 }}><div className="h3">📍 Points d'amélioration</div>{feedback.ameliorations.map((a, i) => <div key={i} className="ai"><div className="ap">« {a.passage} »</div><div className="apb">⚠ {a.probleme}</div><div className="as">→ {a.suggestion}</div></div>)}</div>}
          {!isPremium && <div className="lock-overlay"><p style={{ fontSize: 12, color: t.textMuted, marginBottom: 8 }}>🔒 Passages localisés réservés Premium</p><button className="btn-sm" onClick={() => setPage("tarifs")}>Débloquer</button></div>}
          {isPremium && feedback.exercice && <div className="exo-box" style={{ marginBottom: 12 }}><div className="exo-title">🎯 Exercice personnalisé</div><div className="exo-text">{feedback.exercice}</div></div>}
          <div className="divider"/>
          <button className="btn btn-outline" onClick={() => { setFeedback(null); setTranscript(""); setTextInput(""); setTimer(0); }}>Nouvelle analyse</button>
        </div>
      )}
      {feedback?.erreur && <div className="err" style={{ marginTop: 14 }}>{feedback.erreur}</div>}
    </div>
  );

  const PageDebat = () => (
    <div className="page">
      <div className="stitle">Entraînement au débat</div>
      <div className="ssub">Tirez un sujet au hasard, construisez votre argumentation, l'IA évalue votre rhétorique.</div>
      <div className="sujet-box">
        {sujetDebat ? <div className="sujet-text">« {sujetDebat} »</div> : <div style={{ fontSize: 14, color: t.textMuted, marginBottom: 12 }}>Aucun sujet sélectionné</div>}
        <button className="btn-sm" onClick={tirerSujet}>🎲 {sujetDebat ? "Autre sujet" : "Tirer un sujet"}</button>
      </div>
      {sujetDebat && (
        <>
          <span className="label">Votre argumentation</span>
          <textarea className="textarea" placeholder="Développez votre position sur ce sujet. Présentez votre thèse, vos arguments, votre conclusion..." value={debatTexte} onChange={e => setDebatTexte(e.target.value)} />
          {!debatLoading && debatTexte.trim() && (
            <button className="btn btn-primary" onClick={analyserDebat}>✦ Analyser mon argumentation</button>
          )}
        </>
      )}
      {debatLoading && <div className="loading-dots"><div className="dot"/><div className="dot"/><div className="dot"/></div>}
      {debatFeedback && !debatFeedback.erreur && (
        <div style={{ marginTop: 20 }}>
          <div className="sg"><div className="sn">{debatFeedback.scoreGlobal}</div><div className="sl">Score rhétorique</div></div>
          {debatFeedback.scores && <div className="scores-grid">{Object.entries(debatFeedback.scores).map(([k, v]) => <div key={k} className="si"><div className="sin">{k}</div><div className="sbar"><div className="sbarfill" style={{ width: `${v}%` }}/></div><div className="sv">{v}/100</div></div>)}</div>}
          {debatFeedback.synthese && <div className="card" style={{ marginBottom: 12 }}><div className="h3">Analyse</div><p style={{ fontSize: 13, lineHeight: 1.7 }}>{debatFeedback.synthese}</p></div>}
          {debatFeedback.pointsForts?.length > 0 && <div style={{ marginBottom: 12 }}>{debatFeedback.pointsForts.map((f, i) => <span key={i} className="tag">{f}</span>)}</div>}
          {debatFeedback.ameliorations?.length > 0 && <div className="card" style={{ marginBottom: 12 }}><div className="h3">📍 Points à renforcer</div>{debatFeedback.ameliorations.map((a, i) => <div key={i} className="ai"><div className="ap">« {a.passage} »</div><div className="apb">⚠ {a.probleme}</div><div className="as">→ {a.suggestion}</div></div>)}</div>}
          {debatFeedback.contreArguments?.length > 0 && <div className="card" style={{ marginBottom: 12 }}><div className="h3">⚔ Contre-arguments possibles</div>{debatFeedback.contreArguments.map((c, i) => <div key={i} className="contre-arg">{c}</div>)}</div>}
          {debatFeedback.exercice && <div className="exo-box"><div className="exo-title">🎯 Pour progresser</div><div className="exo-text">{debatFeedback.exercice}</div></div>}
          <div className="divider"/>
          <button className="btn btn-outline" onClick={() => { setDebatFeedback(null); setDebatTexte(""); setSujetDebat(""); }}>Nouveau débat</button>
        </div>
      )}
    </div>
  );

  const PageExercices = () => (
    <div className="page">
      <div className="stitle">Exercices d'élocution</div>
      <div className="ssub">Techniques issues de la rhétorique antique et des arts du théâtre.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {EXERCICES_ELOCUTION.map((ex, i) => (
          <div key={i} className="card" style={{ opacity: ex.premium && !isPremium ? 0.65 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: t.accent, background: t.glow, padding: "2px 7px", borderRadius: 4 }}>{ex.niveau} · {ex.duree} · {ex.objectif}</span>
              {ex.premium && !isPremium && <span style={{ fontSize: 10, color: t.textMuted }}>🔒 Premium</span>}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, color: t.accent, marginBottom: 5 }}>{ex.titre}</div>
            <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6, whiteSpace: "pre-line" }}>{ex.premium && !isPremium ? "Disponible en Premium." : ex.desc}</div>
          </div>
        ))}
      </div>
      {!isPremium && <div style={{ textAlign: "center", marginTop: 16 }}><button className="btn btn-primary" onClick={() => setPage("tarifs")}>Débloquer tous les exercices</button></div>}
    </div>
  );

  const PageTheatre = () => (
    <div className="page">
      <div className="stitle">Atelier Théâtre</div>
      <div className="ssub">Jouez une scène face à l'IA. Classiques ou contemporaines — recevez un feedback sur votre jeu et votre éloquence.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SCENES_THEATRE.map((sc, i) => (
          <div key={i} className="scene-card" onClick={() => demarrerScene(sc)} style={{ opacity: sc.premium && !isPremium ? 0.65 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span className="scene-type">{sc.type} · {sc.niveau}</span>
                <div className="scene-titre">{sc.titre}</div>
                <div className="scene-meta">{sc.auteur} · Vous jouez : <strong>{sc.personnage_user}</strong></div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4, fontStyle: "italic" }}>{sc.contexte.slice(0, 70)}...</div>
              </div>
              {sc.premium && !isPremium ? <span style={{ fontSize: 10, color: t.textMuted, flexShrink: 0, marginLeft: 8 }}>🔒</span> : <span style={{ fontSize: 16 }}>→</span>}
            </div>
          </div>
        ))}
      </div>
      {!isPremium && <div style={{ textAlign: "center", marginTop: 16 }}><button className="btn btn-primary" onClick={() => setPage("tarifs")}>Débloquer toutes les scènes</button></div>}
    </div>
  );

  const PageDashboard = () => (
    <div className="page">
      <div className="stitle">Bonjour, {user?.prenom || "Orateur"} 👋</div>
      {user?.objectif && <div className="ssub"><em>Objectif :</em> {user.objectif}</div>}
      <div className="stat-row">
        <div className="stat"><div className="stat-val">{history.length}</div><div className="stat-lbl">Analyses</div></div>
        <div className="stat"><div className="stat-val">{history.length > 0 ? Math.round(history.reduce((a, b) => a + (b.score || 0), 0) / history.length) : "—"}</div><div className="stat-lbl">Moy.</div></div>
        <div className="stat"><div className="stat-val">{history.length > 0 ? Math.max(...history.map(h => h.score || 0)) : "—"}</div><div className="stat-lbl">Record</div></div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div className="h3" style={{ marginBottom: 0 }}>Mon abonnement</div>
          <span className={`pill ${plan === "essai" ? "pill-essai" : plan === "premium" ? "pill-premium" : "pill-gratuit"}`}>{plan === "essai" ? "Essai" : plan === "premium" ? "Premium" : "Gratuit"}</span>
        </div>
        {plan !== "premium" && <button className="btn btn-primary" onClick={activatePremium}>✦ Passer Premium — 5,99€/mois</button>}
        {plan === "premium" && <p style={{ fontSize: 12, color: t.textMuted }}>Accès illimité actif.</p>}
      </div>
      <div className="h3">Historique</div>
      {history.length === 0 ? <p style={{ fontSize: 13, color: t.textMuted }}>Aucune analyse encore. Lancez-vous !</p> :
        history.slice(0, 12).map((h, i) => (
          <div key={i} className="hist-item">
            <div><div style={{ fontSize: 13, color: t.text }}>{h.titre}</div><div style={{ fontSize: 10, color: t.textMuted }}>{h.date} · {h.type}</div></div>
            <div className="hist-score">{h.score}</div>
          </div>
        ))
      }
    </div>
  );

  const PageTarifs = () => (
    <div className="page">
      <div className="stitle">Nos offres</div>
      <div className="ssub">Commencez gratuitement, évoluez à votre rythme.</div>
      {[
        { nom: "Gratuit", prix: "0€", desc: "/mois", features: ["3 analyses/mois", "Score global", "2 exercices", "1 scène théâtre"], cta: "Plan actuel", dis: plan === "gratuit", action: null },
        { nom: "Essai 7 jours", prix: "Gratuit", desc: "puis 5,99€/mois", features: ["Premium complet 7j", "Sans carte bancaire", "Sans engagement"], cta: plan === "essai" ? "Essai en cours" : "Démarrer l'essai", dis: plan === "essai", action: () => { setPlan("essai"); save("eq_plan", "essai"); } },
        { nom: "Premium", prix: "5,99€", desc: "/mois", features: ["Analyses illimitées", "Feedback localisé IA", "Tous les exercices", "Toutes les scènes théâtre", "Débats illimités", "Historique complet"], cta: plan === "premium" ? "Plan actuel" : "Activer Premium", dis: plan === "premium", action: activatePremium, featured: true },
      ].map((p, i) => (
        <div key={i} className="card" style={{ marginBottom: 12, border: p.featured ? `2px solid ${t.accent}` : undefined }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: t.accent }}>{p.nom}</div>
            <div><span style={{ fontSize: 20, fontWeight: 500 }}>{p.prix}</span><span style={{ fontSize: 11, color: t.textMuted }}> {p.desc}</span></div>
          </div>
          <ul className="plan-features" style={{ marginBottom: 12 }}>{p.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
          <button className="btn btn-primary" disabled={p.dis} onClick={p.action || undefined} style={{ opacity: p.dis ? 0.5 : 1 }}>{p.cta}</button>
        </div>
      ))}
    </div>
  );

  // ─── MAIN RENDER ──────────────────────────────────────────────────────────
  return (
    <div className="app">
      <style>{css}</style>
      <div className="header" style={{ position: "relative" }}>
        <div className="logo" onClick={() => { setPage(user ? "analyser" : "landing"); setSubPage(null); }}>ELOQUA 🎭</div>
        {user && (
          <nav className="nav">
            <button className={`nb ${page === "analyser" ? "active" : ""}`} onClick={() => { setPage("analyser"); setSubPage(null); }}>Analyser</button>
            <button className={`nb ${page === "debat" ? "active" : ""}`} onClick={() => { setPage("debat"); setSubPage(null); }}>Débat</button>
            <button className={`nb ${page === "exercices" ? "active" : ""}`} onClick={() => { setPage("exercices"); setSubPage(null); }}>Exercices</button>
            <button className={`nb ${page === "theatre" ? "active" : ""}`} onClick={() => { setPage("theatre"); setSubPage(null); }}>Théâtre</button>
            <button className={`nb ${page === "dashboard" ? "active" : ""}`} onClick={() => { setPage("dashboard"); setSubPage(null); }}>Espace</button>
          </nav>
        )}
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <button className="hbtn" onClick={() => setShowThemes(!showThemes)}>{THEMES_UI[uiTheme].icon}</button>
          {user ? <button className="hbtn" onClick={handleLogout}>Déco.</button> : <button className="hbtn" onClick={() => { setAuthMode("login"); setPage("auth"); }}>Connexion</button>}
        </div>
        {showThemes && (
          <div className="tpicker">
            {Object.entries(THEMES_UI).map(([k, v]) => (
              <button key={k} className="topt" onClick={() => { setUiTheme(k); setShowThemes(false); }}>{v.icon} {v.name}</button>
            ))}
          </div>
        )}
      </div>

      {subPage === "scene" && sceneActive ? <SceneActive /> :
        page === "landing" ? <PageLanding /> :
        page === "auth" ? <PageAuth /> :
        page === "analyser" && user ? <PageAnalyser /> :
        page === "debat" && user ? <PageDebat /> :
        page === "exercices" && user ? <PageExercices /> :
        page === "theatre" && user ? <PageTheatre /> :
        page === "dashboard" && user ? <PageDashboard /> :
        page === "tarifs" ? <PageTarifs /> :
        <PageLanding />
      }
    </div>
  );
}
