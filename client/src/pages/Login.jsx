import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Languages,
  Brain,
  Pill,
  Activity,
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useLanguage } from "../context/LanguageContext";

function Login() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const [email, setEmail] = useState(localStorage.getItem("rememberEmail") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberEmail"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(t.invalidCredentials);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    {
      icon: Languages,
      title: t.multilingualPlatform,
      desc: t.multilingualDesc,
    },
    {
      icon: Brain,
      title: t.aiAssistantTitle,
      desc: t.aiAssistantDesc,
    },
    {
      icon: Pill,
      title: t.lockStockTitle,
      desc: t.lockStockDesc,
    },
    {
      icon: ShieldCheck,
      title: t.surveillanceTitle,
      desc: t.surveillanceDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-teal-700 text-white p-14 flex-col justify-between">
        <div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-2xl p-4">
              <Activity size={40}/>
            </div>
            <div>
              <h1 className="text-4xl font-bold">{t.appTitle}</h1>
              <p className="text-teal-100 mt-2">{t.tagline}</p>
            </div>
          </div>

          <div className="mt-16 space-y-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex gap-4">
                  <Icon className="mt-1"/>
                  <div>
                    <h3 className="text-xl font-semibold">{f.title}</h3>
                    <p className="text-teal-100">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-teal-100">{t.builtFor}</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10">
          <div className="text-center">
            <div className="inline-flex bg-teal-100 rounded-full p-4">
              <Activity className="text-teal-700" size={34}/>
            </div>

            <h2 className="text-3xl font-bold mt-6">{t.welcomeTitle}</h2>
            <h3 className="text-xl text-teal-700 font-semibold mt-2">{t.appTitle}</h3>
          </div>

          <div className="mt-8">
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Globe size={16}/>
              {t.selectLanguage}
            </label>

            <select
              value={language}
              onChange={(e)=>setLanguage(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 mt-6">

            <div>
              <label className="text-sm">{t.email}</label>

              <div className="relative mt-2">
                <Mail size={18} className="absolute left-4 top-4 text-gray-400"/>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder={t.email}
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm">{t.password}</label>

              <div className="relative mt-2">
                <Lock size={18} className="absolute left-4 top-4 text-gray-400"/>

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder={t.password}
                  className="w-full border rounded-xl pl-12 pr-12 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
                />

                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-4 top-3"
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={()=>setRememberMe(!rememberMe)}
                />
                {t.rememberMe}
              </label>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 rounded-xl p-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold"
            >
              {loading ? t.signingIn : t.login}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            {t.securePlatform}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
