import React, { useState, FormEvent, useMemo } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Target, Activity, Search, FileText, CheckCircle, 
  Briefcase, ArrowRight, Layers, PieChart as PieIcon, 
  ChevronRight
} from 'lucide-react';

import { Star, Instagram, Youtube, Lock, Mail, Loader2, LayoutDashboard, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- Types ---
type TabType = 'millets' | 'foods' | 'pulses';
type FormatType = 'REEL' | 'STATIC' | 'CAROUSEL';

interface ContentEntry {
  date: string;
  format: FormatType;
  idea: string;
  product: string;
}

interface UserData {
  email: string;
}

// --- Data ---
const calendarData: Record<TabType, ContentEntry[]> = {
  millets: [
    { date: 'Apr 01, Tue', format: 'REEL', idea: 'Choose millets every morning.', product: 'Health Mix' },
    { date: 'Apr 03, Thu', format: 'STATIC', idea: '"Why Millets?" Simple benefits post.', product: 'Millets' },
    { date: 'Apr 05, Sat', format: 'REEL', idea: "Found your Easter egg... it's millet noodles, and so yum!", product: 'Noodles' },
    { date: 'Apr 07, Mon', format: 'CAROUSEL', idea: 'Red vs Green Superfoods explained.', product: 'Superfoods' },
    { date: 'Apr 10, Thu', format: 'REEL', idea: 'Healthy Snacking: Millet Cookies.', product: 'Cookies' },
    { date: 'Apr 12, Sat', format: 'STATIC', idea: '"Swap your maida" awareness post.', product: 'Millets' },
    { date: 'Apr 15, Tue', format: 'CAROUSEL', idea: 'Weekly Millet Meal Plan.', product: 'All Millets' },
    { date: 'Apr 17, Thu', format: 'REEL', idea: 'Gym snack: Millet Health Mix shake.', product: 'Health Mix' },
    { date: 'Apr 19, Sat', format: 'STATIC', idea: 'Akshay Tritiya Wishes Post', product: '—' },
    { date: 'Apr 20, Sun', format: 'STATIC', idea: '"Sunday guilt-free snack."', product: 'Cookies' },
    { date: 'Apr 22, Tue', format: 'CAROUSEL', idea: 'Kids + Millets = Smart nutrition.', product: 'Noodles' },
    { date: 'Apr 25, Fri', format: 'REEL', idea: 'Office lunch with a millet twist.', product: 'Noodles' },
    { date: 'Apr 30, Wed', format: 'CAROUSEL', idea: '30-Day Millet Challenge recap.', product: 'All Millets' },
  ],
  foods: [
    { date: 'Apr 02, Wed', format: 'REEL', idea: "At least your snack won't fool you.", product: 'Savouries' },
    { date: 'Apr 04, Fri', format: 'CAROUSEL', idea: '5 ways to style your chai time.', product: 'CTC Tea' },
    { date: 'Apr 05, Sat', format: 'REEL', idea: 'Skip the prep, keep the sweetness.', product: 'Laddus' },
    { date: 'Apr 08, Tue', format: 'STATIC', idea: '"Tea + Papad = Comfort Combo"', product: 'Papad' },
    { date: 'Apr 11, Fri', format: 'CAROUSEL', idea: 'Flour Guide: Which flour for what dish?', product: 'Flours' },
    { date: 'Apr 13, Sun', format: 'REEL', idea: 'Sunday binge snack platter (Cashew Mix).', product: 'Cashew RTE' },
    { date: 'Apr 15, Tue', format: 'STATIC', idea: '"No time? No problem." RTE positioning.', product: 'Savouries' },
    { date: 'Apr 18, Fri', format: 'REEL', idea: 'Fry vs. Roast Papad — which team are you?', product: 'Papad' },
    { date: 'Apr 19, Sat', format: 'STATIC', idea: 'Akshay Tritiya Wishes Post', product: '—' },
    { date: 'Apr 20, Sun', format: 'CAROUSEL', idea: '3 Tiffin Ideas using TDH Flours.', product: 'Flours' },
    { date: 'Apr 23, Wed', format: 'STATIC', idea: '"Perfect Chai Ritual" storytelling post.', product: 'CTC Tea' },
    { date: 'Apr 26, Sat', format: 'REEL', idea: 'Office snack box ideas (RTE focus).', product: 'Savouries' },
    { date: 'Apr 29, Tue', format: 'CAROUSEL', idea: '"From Kitchen to Couch" — Snacking moments.', product: 'All Foods' },
  ],
  pulses: [
    { date: 'Apr 01, Tue', format: 'STATIC', idea: 'April may fool you, but your kitchen staples never will.', product: 'All Pulses' },
    { date: 'Apr 03, Thu', format: 'CAROUSEL', idea: '5 breakfasts from Idly Ravva (beyond Idli).', product: 'Idly Ravva' },
    { date: 'Apr 05, Sat', format: 'REEL', idea: 'Crack open something better!', product: 'Putnalu' },
    { date: 'Apr 07, Mon', format: 'CAROUSEL', idea: "Urad Gota vs. Split Urad — what's better?", product: 'Urad Gota' },
    { date: 'Apr 09, Wed', format: 'STATIC', idea: '"Did you know?" Nutritional benefits of Toor Dal.', product: 'Toor Dal' },
    { date: 'Apr 12, Sat', format: 'REEL', idea: '10-min Dal Fry for busy mornings.', product: 'Toor Dal' },
    { date: 'Apr 14, Mon', format: 'STATIC', idea: 'Vishu / Tamil New Year Wish (Regional connect).', product: 'All Pulses' },
    { date: 'Apr 16, Wed', format: 'CAROUSEL', idea: 'Pottu Pappu — the underrated protein hero.', product: 'Pottu Pappu' },
    { date: 'Apr 18, Fri', format: 'REEL', idea: 'Chutney in 2 mins with Putnalu.', product: 'Putnalu' },
    { date: 'Apr 19, Sat', format: 'STATIC', idea: 'Akshay Tritiya Wishes Post', product: '—' },
    { date: 'Apr 21, Mon', format: 'CAROUSEL', idea: 'Pallilu (Peanuts): Snack vs. Cooking Use.', product: 'Pallilu' },
    { date: 'Apr 24, Thu', format: 'REEL', idea: '"Mom vs. Me" — Dal consistency test.', product: 'Toor Dal' },
    { date: 'Apr 28, Mon', format: 'CAROUSEL', idea: 'Weekly Meal Plan using TDH Pulses.', product: 'All Pulses' },
  ],
};

// --- Components ---

const FormatBadge: React.FC<{ format: FormatType }> = ({ format }) => {
  const styles = {
    REEL: 'bg-amber-100 text-amber-800',
    STATIC: 'bg-green-100 text-green-800',
    CAROUSEL: 'bg-sky-100 text-sky-800',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${styles[format]}`}>
      {format}
    </span>
  );
};

export default function TdhContentCalendarApril() {



     // Authentication / Registration state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dashboard State management
  const [activeTab, setActiveTab] = useState<TabType>('millets');

    // ================= USER STORAGE =================

  const getUsers = (): UserData[] => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  };

  const saveUser = (user: UserData): void => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const findUser = (email: string): UserData | undefined => {
    return getUsers().find((u) => u.email === email);
  };

  // ================= LOGIN =================

 const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError('');
  setSuccessMessage('');
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const email = (formData.get('email') as string)?.trim();

  if (!email) {
    setError('Please enter your email address.');
    setIsLoading(false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address.');
    setIsLoading(false);
    return;
  }

  const existingUser = findUser(email);

  try {
    // 🔥 ALWAYS send email (both new + existing users)
    await emailjs.send(
      'service_ztfkvtu',
      'template_zhvk3r4',
      { email },
      'lGEySRjC5bz4G2JLr'
    );

    if (existingUser) {
      setSuccessMessage('Welcome back.');
      setTimeout(() => setIsLoggedIn(true), 800);
    } else {
      saveUser({ email });
      setSuccessMessage('Registered successfully.');
      setTimeout(() => setIsLoggedIn(true), 1000);
    }

  } catch (err) {
    setError('Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
  // ================= LOGIN SCREEN =================

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">

          <div className="flex flex-col items-center mb-8 text-center">
            <div className="p-4 bg-slate-100 rounded-2xl mb-4 text-[#1E293B]">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-[#1E293B] uppercase">
              Strategic Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Enter your email to access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E293B]/20"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {successMessage && (
              <div className="text-green-600 bg-green-50 p-3 rounded-xl text-xs">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E293B] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Access Dashboard
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }




  
  const tabs: { id: TabType; label: string }[] = [
    { id: 'millets', label: 'TDH MILLETS' },
    { id: 'foods', label: 'TDH FOODS' },
    { id: 'pulses', label: 'TDH PULSES' },
  ];

  const currentData = calendarData[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tenali Double Horse</h1>
            <p className="text-slate-500 font-medium italic">Social Media Content Calendar — April 2026</p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex space-x-8 border-b border-slate-200 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition-all whitespace-nowrap outline-none ${
                activeTab === tab.id
                  ? 'border-b-4 border-red-700 text-red-700 font-bold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Calendar Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Content Idea</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Focus Product</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <FormatBadge format={item.format} />
                    </td>
                    <td className="px-6 py-4 text-sm min-w-[250px]">{item.idea}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-700 whitespace-nowrap">{item.product}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-sm text-slate-400 text-center">
          &copy; 2026 Tenali Double Horse Marketing Strategy
        </footer>
      </div>
    </div>
  );
}