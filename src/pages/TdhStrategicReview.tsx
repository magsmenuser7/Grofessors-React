import React, { useState, useMemo, FormEvent } from 'react';
import { 
  BarChart, Target, Users, Zap, Eye, Share2, 
  ShieldCheck, TrendingUp, ChevronRight, AlertCircle,
  CheckCircle2, XCircle, Clock, Gavel, Minus
} from 'lucide-react';
import { Star, Instagram, Youtube, Lock, Mail, Loader2, LayoutDashboard } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { UserData } from './TdhContentCalenderMarch';
import logo from "../components/assets/logos/grofesion-white.png"
type TabType = string;

const TDHStrartegicReview = () => {

     
  const reportData = [
    {
      id: 'pan-india',
      category: 'Growth',
      title: 'Pan India Expansion',
      planned: 'Focus on Gulf & Indus Foods expos to enhance brand visibility globally and nationally.',
      executed: 'Participated in expos; basic visibility achieved. However, post-expo momentum and regional expansion were limited.',
      status: 'Partial',
      remarks: 'Concentrating on SKU identity and regional availability now.'
    },
    {
      id: 'distributor',
      category: 'Partnerships',
      title: 'Distributor Strengthening',
      planned: 'Communication support for expos; direct consumer demand generation; identify "Hero Products".',
      executed: 'Distribution meeting is withdrawn so execution is delayed. Distributor engagement was weakened due to credit line withdrawal.',
      status: 'Delayed',
      remarks: 'Millet Marvels identified as high potential for Urban/Quick-commerce markets.'
    },
    {
      id: 'comm-diff',
      category: 'Marketing',
      title: 'Communication Differentiation',
      planned: 'Unique voice for each brand (Pulses vs Foods); distinct objectives per channel.',
      executed: 'Content remains repetitive and uniform across platforms. Communication guidelines not effectively reflected.',
      status: 'Delayed',
      remarks: 'Limited brand-level clarity due to content redundancy.'
    },
    {
      id: 'moderation',
      category: 'Operations',
      title: 'Vendor & Content Moderation',
      planned: 'Tailored adaptation of posts; streamlined approval process for creatives.',
      executed: 'Uniform publishing without platform-specific adaptation. Lack of transparency in digital posting.',
      status: 'Delayed',
      remarks: 'Content published without considering platform/audience expectations.'
    },
    {
      id: 'positioning',
      category: 'Strategy',
      title: 'Brand Positioning Shift',
      planned: 'Transition from "Women-centric" to "Decision Maker Choice" brand.',
      executed: 'No significant attempt seen for this transition. Strategy not yet adapted in awareness campaigns.',
      status: 'Delayed',
      remarks: 'Mild redirection approach recommended to test and scale gradually.'
    },
    {
      id: 'transparency',
      category: 'Identity',
      title: 'Transparency & Quality',
      planned: 'Communicate premium quality transparency to convince lower purchase power audiences.',
      executed: 'Communication guidelines for transparency not yet adapted; storytelling is in progress.',
      status: 'Progress',
      remarks: 'Remains a key opportunity area for geographical market enrichment.'
    },
    {
      id: 'cross-selling',
      category: 'Sales',
      title: 'Merge & Cross-Selling',
      planned: 'Strategically bundle complementary products to create value propositions.',
      executed: 'Group promotions via sponsorships occurred, but structured bundle-led selling is limited.',
      status: 'Partial',
      remarks: 'Product differentiation within bundles is currently lacking.'
    },
    {
      id: 'digital',
      category: 'Digital',
      title: 'Digital Communication',
      planned: 'Distinct IG strategies for Foods/Pulses; LinkedIn positioning; Website SKU visibility.',
      executed: 'LinkedIn active for corporate updates. Website follow-ups done, but content calendars/platform separation failed.',
      status: 'Partial',
      remarks: 'Platform separation and consistent execution not followed as planned.'
    },
    {
      id: 'projection',
      category: 'Brand',
      title: 'TDH Group Projection',
      planned: 'Rising Horses initiative, TDH Foundation, group gifting, and website restructure.',
      executed: 'Themes given; gifting and website restructure suggested. Group sponsorships included.',
      status: 'Progress',
      remarks: 'Structured group identity build is still at an early stage.'
    },
    {
      id: 'legal',
      category: 'Compliance',
      title: 'Legal Aspect',
      planned: 'Ensure all legal aspects are thoroughly checked and addressed, including compliance with industry regulations.',
      executed: 'Review of regulatory documentation and compliance framework protocols.',
      status: 'Idle',
      remarks: 'This section is included for oversight; no execution status assigned.'
    }
  ];

  const totalExecutedCount = useMemo(() => {
    // Total count including Legal (Idle), Executed, and Partial
    return reportData.filter(item => ['Executed', 'Partial', 'Idle'].includes(item.status)).length;
  }, [reportData]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Executed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Partial': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Delayed': return 'bg-rose-500/20 text-rose-400 border-rose-500/50';
      case 'Idle': return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Executed': return <CheckCircle2 className="w-4 h-4" />;
      case 'Partial': return <TrendingUp className="w-4 h-4" />;
      case 'Progress': return <Clock className="w-4 h-4" />;
      case 'Delayed': return <XCircle className="w-4 h-4" />;
      case 'Idle': return <Minus className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  // Authentication / Registration state
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');
//     const [successMessage, setSuccessMessage] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);

 
//   const [activeTab, setActiveTab] = useState<TabType>('millets');

    
//   const getUsers = (): UserData[] => {
//     return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//   };

//   const saveUser = (user: UserData): void => {
//     const users = getUsers();
//     users.push(user);
//     localStorage.setItem('registeredUsers', JSON.stringify(users));
//   };

//   const findUser = (email: string): UserData | undefined => {
//     return getUsers().find((u) => u.email === email);
//   };



//  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   setError('');
//   setSuccessMessage('');
//   setIsLoading(true);

//   const formData = new FormData(e.currentTarget);
//   const email = (formData.get('email') as string)?.trim();

//   if (!email) {
//     setError('Please enter your email address.');
//     setIsLoading(false);
//     return;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     setError('Please enter a valid email address.');
//     setIsLoading(false);
//     return;
//   }

//   const existingUser = findUser(email);

//   try {
   
//     await emailjs.send(
//       'service_9gmlg2q',
//       'template_p0q050i',
//       { email },
//       '-ePIcI6qQCURx5hAM'
//     );

//     if (existingUser) {
//       setSuccessMessage('Welcome back.');
//       setTimeout(() => setIsLoggedIn(true), 800);
//     } else {
//       saveUser({ email });
//       setSuccessMessage('Registered successfully.');
//       setTimeout(() => setIsLoggedIn(true), 1000);
//     }

//   } catch (err) {
//     setError('Something went wrong. Please try again.');
//   } finally {
//     setIsLoading(false);
//   }
// };
  

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
//         <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">

//           <div className="flex flex-col items-center mb-8 text-center">
//             <div className="p-4 bg-slate-100 rounded-2xl mb-4 text-[#1E293B]">
//               <LayoutDashboard className="w-8 h-8" />
//             </div>
//             <h1 className="text-xl font-bold text-[#1E293B] uppercase">
//               Strategic Dashboard
//             </h1>
//             <p className="text-slate-500 text-sm mt-2">
//               Enter your email to access
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">

//             <div>
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
//                 Email
//               </label>
//               <div className="relative mt-2">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
//                   <Mail className="w-5 h-5" />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E293B]/20"
//                   placeholder="example@email.com"
//                 />
//               </div>
//             </div>

//             {error && (
//               <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-xs">
//                 <AlertCircle className="w-4 h-4" />
//                 {error}
//               </div>
//             )}

//             {successMessage && (
//               <div className="text-green-600 bg-green-50 p-3 rounded-xl text-xs">
//                 {successMessage}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-[#1E293B] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <>
//                   Access Dashboard
//                   <ChevronRight className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans p-4 md:p-8 uppercase">
      {/* Header section */}
      <img src={logo} alt="TDH Logo" className="mx-auto h-20 w-50 mb-8" />
      <header className="max-w-7xl mx-auto mb-12 mt-22 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-zinc-800/20 rounded-full blur-3xl" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-zinc-500 font-medium tracking-[0.2em] text-xs">
              <span className="w-8 h-[1px] bg-zinc-700"></span>
              Strategic Review
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
              TDH <span className="text-zinc-500 tracking-normal">Group</span>
            </h1>
            <p className="text-zinc-400 text-lg normal-case">Planned vs. Executed Performance Report</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] text-zinc-600 tracking-[0.3em] font-bold">Confidential</div>
              <div className="text-xl font-light text-zinc-400 tracking-tighter italic">Internal_Audit</div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Quick View - Now limited to 3 metrics */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Strategic Pillars', value: '10', icon: Target },
          { label: 'Total Executed', value: `0${totalExecutedCount}`, icon: CheckCircle2, highlight: true },
          { label: 'Execution Gap', value: 'High', icon: AlertCircle },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:border-zinc-700 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <stat.icon className={`w-6 h-6 ${stat.highlight ? 'text-emerald-500' : 'text-zinc-500'} group-hover:text-white transition-colors`} />
              <div className="text-xs text-zinc-700 font-mono tracking-tighter">DATA_PT_0{i+1}</div>
            </div>
            <div className={`text-4xl font-bold mb-2 tracking-tight ${stat.highlight ? 'text-emerald-400' : 'text-white'}`}>{stat.value}</div>
            <div className="text-zinc-500 text-xs tracking-widest font-bold">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reportData.map((item) => (
            <div 
              key={item.id} 
              className={`group bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col ${item.status === 'Idle' ? 'opacity-80' : ''}`}
            >
              {/* Card Header */}
              <div className="p-6 border-b border-zinc-800/50 flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] mb-2 px-2 py-0.5 border border-zinc-800 rounded inline-block">
                    {item.category}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors uppercase">{item.title}</h3>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold tracking-wider ${getStatusStyle(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {item.status}
                </div>
              </div>

              {/* Comparison Section */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    <span className="text-xs font-bold tracking-widest">Proposed Plan</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed italic normal-case">
                    "{item.planned}"
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                    <span className="text-xs font-bold tracking-widest">Executed Status</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed normal-case">
                    {item.executed}
                  </p>
                </div>
              </div>

              {/* Remarks Footer */}
              <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-zinc-500 font-medium italic truncate max-w-[200px] md:max-w-sm normal-case">
                    {item.remarks}
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-zinc-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
        <div className="flex items-center gap-8 text-xs font-bold tracking-widest">
          <div>TENALI DOUBLE HORSE</div>
          <div className="text-zinc-600 hidden sm:block">INTERNAL STRATEGIC AUDIT</div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 border border-zinc-800 rounded flex items-center justify-center text-zinc-500">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="w-10 h-10 border border-zinc-800 rounded flex items-center justify-center text-zinc-500">
            <Gavel className="w-4 h-4" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TDHStrartegicReview;
