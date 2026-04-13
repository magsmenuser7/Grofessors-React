import React, { FormEvent, useState } from 'react';
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
import { useMemo as useMemoDep } from 'react';


import mantraadaptationpdf from "../components/assets/logos/Mantra Adaptation Brand Design Proposal.pdf"
// --- TYPE DEFINITIONS ---
interface UserData {
  email: string;
}

type BrandKey = 'tdh';

const appData: Record<BrandKey, { posts: any[] }> = {
  tdh: { posts: [] }
};

// --- DATA MODELS (Illustrative for OTC Methodology) ---

const auditPillarsData = [
  { subject: 'Brand Identity', score: 45, fullMark: 100 },
  { subject: 'Business Model', score: 60, fullMark: 100 },
  { subject: 'Operations', score: 75, fullMark: 100 },
  { subject: 'Team Structure', score: 55, fullMark: 100 },
  { subject: 'Legal & IP', score: 85, fullMark: 100 },
];

const budgetAllocationData = [
  { name: 'Brand Awareness', current: 70, optimal: 30 },
  { name: 'Core Positioning', current: 10, optimal: 45 },
  { name: 'Conversion', current: 20, optimal: 25 },
];

const marketShareData = [
  { name: 'Mass Market Ice Creams', value: 55 },
  { name: 'Premium Segment', value: 25 },
  { name: 'Artisanal / Niche', value: 20 },
];

const COLORS = ['#0f172a', '#475569', '#94a3b8', '#e2e8f0'];



export default function  MantraAdaptation() {



 // Authentication / Registration state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Dashboard State management
    const [currentBrand, setCurrentBrand] = useState<BrandKey>('tdh');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('all');

    const [activeTab, setActiveTab] = useState('executive');
  const [showData, setShowData] = useState(false);

    // Memoized filtering logic
    const filteredPosts = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return appData[currentBrand].posts.filter((post: any) => {
            const matchesSearch = post.desc.toLowerCase().includes(query) || post.product.toLowerCase().includes(query);
            const matchesType = filterType === 'all' || post.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [currentBrand, searchQuery, filterType]);

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
    // ✅ ALWAYS send email (new or returning user)
    await emailjs.send(
      'service_ztfkvtu',
      'template_zhvk3r4',
      { email },
      'lGEySRjC5bz4G2JLr'
    );

    if (existingUser) {
      setSuccessMessage('Welcome back.');
    } else {
      saveUser({ email });
      setSuccessMessage('Registered successfully.');
    }

    setTimeout(() => {
      setIsLoggedIn(true);
      window.open(mantraadaptationpdf, '_blank');
    }, 800);

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
  
    // Dashboard content goes here when logged in
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        {/* Add your dashboard UI here */}
        

      </div>
    );
  }
  
function useMemo<T>(callback: () => T, dependencies: any[]): T {
    const [value, setValue] = React.useState<T>(() => callback());
    const [prevDeps, setPrevDeps] = React.useState<any[]>(dependencies);

    React.useEffect(() => {
        const depsChanged = prevDeps.length !== dependencies.length || 
            prevDeps.some((dep, i) => dep !== dependencies[i]);
        
        if (depsChanged) {
            setValue(callback());
            setPrevDeps(dependencies);
        }
    }, [dependencies]);

    return value;
}

