import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Building2, Briefcase, ShoppingBag, Utensils, Truck, Cpu, HeartPulse, 
  ChevronRight, Target, ShieldCheck, Zap, ArrowUpRight, LayoutDashboard,
  User, Phone, AlertCircle, Loader2
} from 'lucide-react';
import emailjs from '@emailjs/browser';



const StrategicBrandDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Construction');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');



  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Capture form data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');

    // PHONE NUMBER VALIDATION LOGIC
    // Regex for 10-digit Indian numbers starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      setIsLoading(false);
      return;
    }

    const payload = { name, phone };


    try {
      // ✅ EMAILJS SEND
      await emailjs.send(
        'service_alp1zsm',        // SERVICE ID
        'template_77v8c0t',       // TEMPLATE ID
        {
          name: name,
          phone: phone,
        },
        '3wTsQ9ooVSx-OAMuR'         // PUBLIC KEY
      );

       // ✅ SUCCESS MESSAGE
  setSuccessMessage('✅ Details submitted successfully! Redirecting...');
  
  setTimeout(() => {
    setIsLoggedIn(true);
  }, 1200);

} catch (err) {
  console.error('EmailJS Error:', err);
  setIsLoggedIn(true);
} finally {
  setIsLoading(false);
}
 };

//     try {
//       // SEND DATA TO API
//       const response = await fetch('https://api.your-backend.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setIsLoggedIn(true);
//       } else {
//         // Fallback for demo: Allow login even if API fails
//         console.warn("API request failed, logging in for demo purposes.");
//         setIsLoggedIn(true);
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//       // Fallback for demo
//       setIsLoggedIn(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const industries = [
    {
      id: 'Construction',
      icon: <Building2 className="w-5 h-5" />,
      title: 'Construction & Interiors',
      challenge: 'Hard to find and hard to trust',
      improvement: 'Build Real Trust',
      strategy: 'Stop just selling products and start helping people build their dream homes. Focus on being the most reliable expert.',
      archetype: 'The Expert Builder',
      companies: ['Spy Leakages', 'Stoneo', 'MCK Interiors', 'Jyothi Agencies', 'Venkata Parameswari Paints', 'SP Interiors'],
      metrics: [
        { name: 'Customer Trust', current: 45, target: 85 },
        { name: 'People Who Know Us', current: 30, target: 70 }
      ]
    },
    {
      id: 'Finance',
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Finance & Professional',
      challenge: 'Feels too cold and formal',
      improvement: 'Be More Personal',
      strategy: 'Make money talk easy to understand. Move from "managing wealth" to "taking care of your family\'s future."',
      archetype: 'The Wise Guide',
      companies: ['Finotive Advisory', 'Manavi Wealth', 'Vijaya Saradhi Chit Fund', 'Insugo Insurance'],
      metrics: [
        { name: 'Clear Talk', current: 50, target: 90 },
        { name: 'Customer Loyalty', current: 60, target: 85 }
      ]
    },
    {
      id: 'Fashion',
      icon: <ShoppingBag className="w-5 h-5" />,
      title: 'Fashion & Lifestyle',
      challenge: 'Too many similar options',
      improvement: 'Stand Out with Style',
      strategy: 'Tell the story behind the clothes. Focus on local pride and the special care put into making every piece.',
      archetype: 'The Trendsetter',
      companies: ['Babu Jewellers', 'Sri Sai Bhavani Handloom', 'M&M Mens Wear'],
      metrics: [
        { name: 'Style Appeal', current: 40, target: 80 },
        { name: 'Unique Factor', current: 35, target: 75 }
      ]
    },
    {
      id: 'Hospitality',
      icon: <Utensils className="w-5 h-5" />,
      title: 'Food & Hospitality',
      challenge: 'Service changes every day',
      improvement: 'Be Great Every Time',
      strategy: 'Make sure every guest gets the same amazing treatment. Use your history to make people feel at home.',
      archetype: 'The Friendly Host',
      companies: ['Sree Kubera Grand', 'Subbaiah Gari Hotel', 'Tattvavanam Resort'],
      metrics: [
        { name: 'Good Service', current: 65, target: 95 },
        { name: 'Happy Reviews', current: 40, target: 90 }
      ]
    },
    {
      id: 'Automotive',
      icon: <Truck className="w-5 h-5" />,
      title: 'Automotive & Industrial',
      challenge: 'Only talk when there is a fix',
      improvement: 'Stay in Touch Always',
      strategy: 'Don’t just fix problems; help customers prevent them. Remind them when service is due before things break.',
      archetype: 'The Helpful Hero',
      companies: ['Jupudy Tyre Zone', 'SR Polymers', 'Shyam Krishna Auto', 'GRBN Filling'],
      metrics: [
        { name: 'Returning Guests', current: 30, target: 70 },
        { name: 'Reliability', current: 55, target: 85 }
      ]
    },
    {
      id: 'Technology',
      icon: <Cpu className="w-5 h-5" />,
      title: 'Tech & Specialised',
      challenge: 'Too hard to understand',
      improvement: 'Keep it Simple',
      strategy: 'Talk about how the product helps, not how it works. Sell "Peace of Mind," not technical features.',
      archetype: 'The Problem Solver',
      companies: ['Unicard Automation', 'Gayatri Vodatech', 'Dhrusya Photography'],
      metrics: [
        { name: 'Easy to Use', current: 40, target: 80 },
        { name: 'Fair Price Feel', current: 50, target: 85 }
      ]
    },
    {
      id: 'Wellness',
      icon: <HeartPulse className="w-5 h-5" />,
      title: 'Health & Events',
      challenge: 'Feels scary or clinical',
      improvement: 'Show More Heart',
      strategy: 'Focus on the happy ending for the patient or guest. Be the expert who actually cares about the person.',
      archetype: 'The Kind Caretaker',
      companies: ['Ashwini Dental Hospital', 'Events By Sruthi', 'Ayurveda Vaidyasala'],
      metrics: [
        { name: 'Patient Trust', current: 60, target: 95 },
        { name: 'Caring Feel', current: 35, target: 80 }
      ]
    }
  ];

  const currentData = industries.find(ind => ind.id === activeTab);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans md:pt-28">
        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-10 border border-slate-200">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-slate-100 rounded-2xl mb-4 text-[#1E293B]">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight text-center">
              Strategic Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium text-center">
              Enter your details to access the platform
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider pl-1">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  name="name"
                  required 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E293B]/20 focus:border-[#1E293B] transition-all font-semibold text-slate-700 placeholder:font-normal placeholder:text-slate-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider pl-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-5 h-5" />
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  required 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E293B]/20 focus:border-[#1E293B] transition-all font-semibold text-slate-700 placeholder:font-normal placeholder:text-slate-400"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-[12px] font-bold">{error}</p>
              </div>
            )}

            {successMessage && (
  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200 animate-in fade-in slide-in-from-top-1">
    <span className="text-[12px] font-bold">{successMessage}</span>
  </div>
)}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E293B] hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 mt-4 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-100 flex md:pt-20">
      <aside className="w-72 bg-white/80 border-r border-slate-200 hidden md:flex flex-col flex-shrink-0 pt-10">
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left ${
                activeTab === ind.id 
                  ? 'bg-[#1E293B] text-white shadow-lg' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className={activeTab === ind.id ? 'text-blue-400' : 'text-slate-400'}>
                {ind.icon}
              </span>
              <span className="truncate">{ind.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-slate-100/90 backdrop-blur-md px-10 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg border border-slate-200">
              <LayoutDashboard className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] max-w-xs sm:max-w-none">
              Simple Advice to Help Businesses Grow
            </p>
          </div>
        </header>

        <div className="px-10 pb-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 items-stretch">
            {/* THE PROBLEM */}
            <div className="group bg-[#E2E8F0]/40 p-8 rounded-[2.5rem] border border-slate-200 transition-all duration-300 flex flex-col min-h-[240px]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white text-red-500 rounded-2xl shadow-sm group-hover:bg-red-500 group-hover:text-white transition-all flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-black text-slate-400 text-[9px] uppercase tracking-[0.2em] leading-none mb-1">The Problem</h3>
                  <div className="h-[1.5px] w-4 bg-red-400/50"></div>
                </div>
              </div>
              <div className="mt-auto pt-6">
                <p className="text-xl font-black text-[#1E293B] leading-tight mb-2 uppercase tracking-tight">
                  {currentData.challenge}
                </p>
                <p className="text-[12px] text-slate-500 italic font-bold">What is holding you back.</p>
              </div>
            </div>

            {/* THE SOLUTION */}
            <div className="group bg-[#E2E8F0]/40 p-8 rounded-[2.5rem] border border-slate-200 transition-all duration-300 flex flex-col min-h-[240px]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white text-green-500 rounded-2xl shadow-sm group-hover:bg-green-500 group-hover:text-white transition-all flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-black text-slate-400 text-[9px] uppercase tracking-[0.2em] leading-none mb-1">The Solution</h3>
                  <div className="h-[1.5px] w-4 bg-green-400/50"></div>
                </div>
              </div>
              <div className="mt-auto pt-6">
                <p className="text-xl font-black text-[#1E293B] leading-tight mb-2 uppercase tracking-tight">
                  {currentData.improvement}
                </p>
                <p className="text-[12px] text-slate-500 italic font-bold">How we fix it.</p>
              </div>
            </div>

            {/* BRAND PERSONALITY */}
            <div className="group bg-[#E2E8F0]/40 p-8 rounded-[2.5rem] border border-slate-200 transition-all duration-300 flex flex-col min-h-[240px]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white text-purple-500 rounded-2xl shadow-sm group-hover:bg-purple-500 group-hover:text-white transition-all flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-black text-slate-400 text-[9px] uppercase tracking-[0.2em] leading-none mb-1">Brand Personality</h3>
                  <div className="h-[1.5px] w-4 bg-purple-400/50"></div>
                </div>
              </div>
              <div className="mt-auto pt-6">
                <p className="text-xl font-black text-[#1E293B] leading-tight mb-2 uppercase tracking-tight">
                  {currentData.archetype}
                </p>
                <p className="text-[12px] text-slate-500 italic font-bold">How the brand acts.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">Step-by-Step Plan</h2>
                  <span className="text-[9px] font-black px-4 py-1.5 bg-blue-600 text-white rounded-full tracking-[0.2em] uppercase">OUR TOP RECOMMENDATION</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg font-bold mb-10">
                  {currentData.strategy}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {currentData.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Better {m.name}</span>
                        <span className="text-blue-600">{m.target}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1E293B] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${m.target}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-200">
                <h2 className="text-lg font-black text-[#1E293B] mb-8 flex items-center gap-4 uppercase tracking-tight">
                   Success Forecast
                   <div className="h-[1px] flex-1 bg-slate-100" />
                </h2>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentData.metrics} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                      <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                      <YAxis hide />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="current" name="Where you are" fill="#e2e8f0" radius={[8, 8, 0, 0]} barSize={40} />
                      <Bar dataKey="target" name="Where we want to be" fill="#2563EB" radius={[8, 8, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <section className="bg-[#1E293B] text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <ArrowUpRight className="w-32 h-32" />
                </div>
                <h2 className="text-xl font-black mb-8 relative z-10 uppercase tracking-tight">
                  Business List
                </h2>
                <div className="space-y-4 relative z-10">
                  {currentData.companies.map((company, idx) => (
                    <div key={idx} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-3">
                      <span className="text-slate-400 group-hover:text-white transition-all font-bold text-base truncate pr-4">{company}</span>
                      <ChevronRight className="w-4 h-4 flex-shrink-0 text-slate-700 group-hover:text-blue-400 transition-all" />
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200">
                <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-6">Action Items</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#1E293B]">Brand Checkup</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Making sure everything looks the same.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#1E293B]">Market Study</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Finding where we can do better.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StrategicBrandDashboard;