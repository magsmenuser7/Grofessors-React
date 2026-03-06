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



export default function ToopaOTCDashboard() {



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

    if (existingUser) {
      setSuccessMessage('Welcome back.');
      setTimeout(() => setIsLoggedIn(true), 800);
      setIsLoading(false);
      return;
    }

    try {
      await emailjs.send(
        'service_ztfkvtu',
        'template_zhvk3r4',
        { email },
        'lGEySRjC5bz4G2JLr'
      );

      saveUser({ email });

      setSuccessMessage('Registered successfully.');
      setTimeout(() => setIsLoggedIn(true), 1000);

    } catch (err) {
      setError('Registration failed. Please try again.');
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




  

  const TabButton = ({ id, icon: Icon, label }: { id: string; icon: React.ComponentType<any>; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
        activeTab === id 
          ? 'border-slate-900 text-slate-900 bg-slate-100' 
          : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
      }`}
    >
      <Icon size={18} />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">TOOPA ICE CREAMS</h1>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-widest mt-1">Strategic Brand Diagnosis (OTC)</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400 font-semibold tracking-wider">MAGSMEN BRAND CONSULTANTS</p>
              <p className="text-xs text-slate-500">Clear Vision. Calm Approach. Bold Moves.</p>
            </div>
          </div>
          
          {/* TABBED NAVIGATION */}
          <nav className="flex space-x-2 md:space-x-6 overflow-x-auto hide-scrollbar mt-2">
            <TabButton id="executive" icon={Activity} label="1. Executive Summary" />
            <TabButton id="segments" icon={PieIcon} label="2. Audit Scope & Segments" />
            <TabButton id="landscape" icon={Target} label="3. Competitive Landscape" />
            <TabButton id="strategy" icon={Layers} label="4. Strategic Deliverables" />
            <TabButton id="commercials" icon={Briefcase} label="5. Commercials" />
          </nav>
        </div>
      </header>

      {/* CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-10 transition-all duration-500">
          
          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'executive' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">Moving from Symptom to System</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <blockquote className="bg-slate-100 border-l-4 border-slate-900 p-6 rounded-r-lg mb-8">
                    <p className="text-lg text-slate-900 font-medium italic">
                      "When a brand faces resistance in the market, the visible symptoms, stagnant sales, customer confusion, or inefficient marketing spend, are rarely the root cause."
                    </p>
                  </blockquote>
                  
                  <h3 className="text-xl font-bold mb-4">The OTC Philosophy</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    OTC is not a tactical execution service; it is a structural business diagnosis. Through rigorous analysis, we evaluate Toopa Ice Creams' communication ecosystem to identify exactly what is holding the business back, providing the clarity required to scale with discipline.
                  </p>
                  
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start">
                      <CheckCircle className="text-slate-800 mr-3 mt-1" size={20} />
                      <span className="text-slate-700"><strong>Stop Inefficient Spend:</strong> Reallocate marketing capital from symptoms to structural fixes.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-slate-800 mr-3 mt-1" size={20} />
                      <span className="text-slate-700"><strong>Identify the Constraint:</strong> Pinpoint the exact pillar (Legal, Brand, Business, Ops, Team) blocking scale.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-slate-800 mr-3 mt-1" size={20} />
                      <span className="text-slate-700"><strong>Achieve Clarity:</strong> Provide the leadership team with an actionable 90-day roadmap.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">Diagnostic Framework Illustration</h4>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={auditPillarsData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Current Health (Hypothetical)" dataKey="score" stroke="#0f172a" fill="#0f172a" fillOpacity={0.5} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 text-center">The 5-Pillar Audit assesses structural integrity across all business functions.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDIT SCOPE & SEGMENTS */}
          {activeTab === 'segments' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">Audit Scope: Positioning & Segmentation</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="order-2 lg:order-1">
                  <div className="h-80 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={marketShareData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {marketShareData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-slate-500 text-center">Evaluating whether Toopa is targeting the most commercially viable audience segment.</p>
                </div>
                
                <div className="order-1 lg:order-2">
                  <blockquote className="bg-slate-100 border-l-4 border-slate-900 p-6 rounded-r-lg mb-8">
                    <p className="text-lg text-slate-900 font-medium">
                      <strong>The Opportunity Gap:</strong> Are we targeting everyone and reaching no one? We will evaluate how clearly Toopa is differentiated through a consumer lens.
                    </p>
                  </blockquote>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="flex items-center text-lg font-bold text-slate-900 mb-2">
                        <Target className="mr-2 text-slate-700" size={20}/> Audience Segmentation
                      </h4>
                      <p className="text-slate-600 text-sm">We assess whether the existing profile of target consumers aligns with the actual purchasers, utilizing testimonials, current market reception data, and reviews.</p>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center text-lg font-bold text-slate-900 mb-2">
                        <Search className="mr-2 text-slate-700" size={20}/> Brand Positioning
                      </h4>
                      <p className="text-slate-600 text-sm">Determining if Toopa's category pricing and product lines are structurally aligned with a premium, mass, or artisanal market position.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPETITIVE LANDSCAPE & MESSAGING */}
          {activeTab === 'landscape' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">Messaging Framework & Budget Alignment</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-bold mb-4">Communication Audit</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    A strong product with a disjointed message loses market share. We analyze the consistency of your narrative across all touchpoints (packaging, digital, physical footprint) to ensure the tone resonates deeply with the target market.
                  </p>
                  
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-6">
                    <h4 className="font-bold text-slate-800 mb-2">Communication Guidelines Review</h4>
                    <p className="text-sm text-slate-600">We establish and review the rules governing how the brand speaks, ensuring a unified presence across all active outlet locations and service delivery points.</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Marketing Budget Allocation</h3>
                    <button 
                      onClick={() => setShowData(!showData)}
                      className="text-xs bg-slate-200 text-slate-800 px-3 py-1 rounded-full font-bold hover:bg-slate-300 transition"
                    >
                      {showData ? 'Hide Data Table' : 'Toggle Data'}
                    </button>
                  </div>
                  
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={budgetAllocationData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                        <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false}/>
                        <Tooltip cursor={{fill: '#f1f5f9'}}/>
                        <Legend />
                        <Bar name="Current Spend % (Symptom)" dataKey="current" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                        <Bar name="Optimal Spend % (System)" dataKey="optimal" fill="#0f172a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {showData && (
                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full text-sm text-left text-slate-500">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                          <tr>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Current Allocation</th>
                            <th className="px-4 py-2">Optimal Target</th>
                          </tr>
                        </thead>
                        <tbody>
                          {budgetAllocationData.map((row, i) => (
                            <tr key={i} className="border-b">
                              <td className="px-4 py-2 font-medium text-slate-900">{row.name}</td>
                              <td className="px-4 py-2">{row.current}%</td>
                              <td className="px-4 py-2 font-bold text-slate-900">{row.optimal}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STRATEGIC OPPORTUNITY */}
          {activeTab === 'strategy' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b pb-4">Strategic Deliverables</h2>
              
              <blockquote className="bg-slate-100 border-l-4 border-slate-900 p-6 rounded-r-lg mb-10">
                <p className="text-lg text-slate-900 font-medium">
                  <strong>The Ultimate Output:</strong> An OTC engagement concludes with structured, actionable outputs designed to give the leadership team absolute clarity on the single most critical constraint.
                </p>
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Five-Pillar Business Audit', desc: 'Structured findings evaluating communication across Legal, Brand, Business, Operations, and Team dimensions.' },
                  { title: 'Primary Constraint ID', desc: 'The single most critical issue currently restricting Toopa\'s growth and communication efficacy, with root-cause reasoning.' },
                  { title: 'Strategic Direction Summary', desc: 'A definitive blueprint detailing exactly what the business must focus on next regarding positioning, messaging, and budgeting.' },
                  { title: '90-Day Action Roadmap', desc: 'Specific, sequenced, and actionable steps the business must take over the next quarter to correct trajectory.' },
                  { title: 'Recommended Next Project', desc: 'The specific, scope-defined intervention required to resolve the primary constraint and build a high-performance framework.' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 bg-slate-200 text-slate-800 rounded-full flex items-center justify-center mb-4 font-bold">
                      {idx + 1}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMMERCIALS & PREREQUISITES */}
          {activeTab === 'commercials' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Commercials Card */}
                <div className="col-span-1">
                  <div className="bg-slate-900 text-white rounded-xl shadow-xl overflow-hidden h-full">
                    <div className="p-8">
                      <h2 className="text-2xl font-bold mb-2">Project Commercials</h2>
                      <p className="text-slate-300 text-sm mb-8">One-Time Consulting Engagement</p>
                      
                      <div className="space-y-6">
                        <div>
                          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Timeline</p>
                          <p className="text-3xl font-light">28 Days</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Professional Fee</p>
                          <p className="text-3xl font-light">INR 70,000 <span className="text-lg text-slate-400">+ GST</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white text-slate-900 p-6 mt-auto">
                      <button className="w-full flex items-center justify-center font-bold tracking-wide hover:bg-slate-100 transition">
                        APPROVE PROPOSAL <ArrowRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="col-span-1 lg:col-span-2">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Client Intake Prerequisites</h2>
                  <p className="text-slate-600 mb-6">
                    To ensure the discovery process targets depth rather than basic background information, the following intelligence must be submitted prior to project commencement:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Founder's Problem", desc: "1-2 sentences defining the primary market symptom experienced." },
                      { title: "Brand Tone & Vision", desc: "Current perceived personality and long-term ambition." },
                      { title: "Categories & Pricing", desc: "Breakdown of product lines and pricing models." },
                      { title: "Audience & Feedback", desc: "Profile of consumers, testimonials, and market reception." },
                      { title: "Past Interventions", desc: "Details of previous campaigns, agencies, or strategies." },
                      { title: "Revenue Trajectory", desc: "Current revenue range (growing, flat, or declining)." },
                      { title: "Team Structure", desc: "Headcount and who manages communication/sales." },
                      { title: "Physical Footprint", desc: "List of all active outlet locations or delivery points." }
                    ].map((req, idx) => (
                      <div key={idx} className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <FileText className="text-slate-700 mr-3 shrink-0 mt-1" size={18}/>
                        <div>
                          <h5 className="font-bold text-slate-800 text-sm">{req.title}</h5>
                          <p className="text-xs text-slate-500 mt-1">{req.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
const useMemo = useMemoDep;
