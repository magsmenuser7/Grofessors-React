import React, { useState, useMemo } from 'react';
import { 
  BarChart, Target, Users, Zap, Eye, Share2, 
  ShieldCheck, TrendingUp, ChevronRight, AlertCircle,
  CheckCircle2, XCircle, Clock, Gavel, Minus,
  Lock, Loader2, ArrowRight,Link
} from 'lucide-react';

const App = () => {
  // ------------------------- LOGIN STATE -------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleLogout = () => {
  setIsLoggedIn(false);
};

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        setIsLoggedIn(true);
      } else {
        setError("Invalid login credentials");
      }
      setIsLoading(false);
    }, 800);
  };

  // --------------------- DASHBOARD DATA BELOW ---------------------
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

  // ----------------- RENDER LOGIN IF NOT LOGGED IN -----------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-zinc-700">
              <Lock className="w-5 h-5 text-zinc-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">
              <span className="text-zinc-500">TDH GROUP</span>
            </h1>
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Internal Strategic Portal</p>
          </div>
 
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Access ID</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 focus:outline-none"
                placeholder="user@tdhgroup.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-rose-500 text-xs text-center font-medium bg-rose-500/10 py-2 rounded">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  ACCESS DASHBOARD
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-[10px] text-zinc-600 tracking-widest uppercase">
              Restricted Access • Authorized Personnel Only
            </p>
            <p className='text-white'>
                credentials email: admin@gmail.com <br />
                password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------- RENDER DASHBOARD AFTER LOGIN -----------------
  /* YOUR ENTIRE DASHBOARD CODE BELOW (UNCHANGED) */
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans p-4 md:p-8 uppercase">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-12 relative">
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

                        <div className='mb-5'>
                              <button
                                  onClick={handleLogout}
                                  className='text-white border rounded-lg px-10 py-3'
                              >
                                  Back To Login
                              </button>
                          </div>
                  </div>
        </div>
      </header>

      {/* Stats */}
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

      {/* Dashboard Cards */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reportData.map((item) => (
            <div 
              key={item.id} 
              className={`group bg-zinc-900/30 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col ${item.status === 'Idle' ? 'opacity-80' : ''}`}
            >
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

      {/* Footer */}
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

export default App;





// import React, { useState, useMemo } from 'react';
// import { 
//   Target, CheckCircle2, AlertCircle, ShieldCheck, Gavel,
//   ChevronRight, Minus, XCircle, Clock, TrendingUp,
//   Lock, ArrowRight, Loader2
// } from 'lucide-react';

// // =======================
// // Login Component
// // =======================
// const Login = ({ onLogin = () => {} }: { onLogin?: () => void }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     setTimeout(() => {
//       if (email && password) {
//         setIsLoading(false);
//         onLogin();
//       } else {
//         setIsLoading(false);
//         setError('Please enter both email and password.');
//       }
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 text-white relative overflow-hidden md:mt-20">
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[100px]" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-zinc-900/40 rounded-full blur-[100px]" />
//       </div>

//       <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10">
//         <div className="text-center mb-10">
//           <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-zinc-700">
//             <Lock className="w-5 h-5 text-zinc-400" />
//           </div>
//           <h1 className="text-2xl font-bold tracking-tight mb-2">TDH <span className="text-zinc-500">GROUP</span></h1>
//           <p className="text-zinc-500 text-sm uppercase tracking-widest">Internal Strategic Portal</p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email Access ID</label>
//             <input 
//               type="email" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 focus:outline-none"
//               placeholder="user@tdhgroup.com"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Password</label>
//             <input 
//               type="password" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 focus:outline-none"
//               placeholder="••••••••"
//             />
//           </div>

//           {error && (
//             <div className="text-rose-500 text-xs text-center font-medium bg-rose-500/10 py-2 rounded">
//               {error}
//             </div>
//           )}

//           <button 
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
//           >
//             {isLoading ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               <>
//                 ACCESS DASHBOARD
//                 <ArrowRight className="w-4 h-4" />
//               </>
//             )}
//           </button>
//         </form>

//         <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
//           <p className="text-[10px] text-zinc-600 tracking-widest uppercase">Restricted Access • Authorized Personnel Only</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // =======================
// // Dashboard Component
// // =======================
// const Dashboard = () => {
//   const reportData = [
//     { id:1, category:'Growth', title:'Pan India Expansion', status:'Partial' },
//     { id:2, category:'Partnerships', title:'Distributor Strengthening', status:'Delayed' },
//     { id:3, category:'Marketing', title:'Comm Differentiation', status:'Progress' },
//   ];

//   const totalExecutedCount = useMemo(() => {
//     return reportData.filter(item => item.status !== 'Delayed').length;
//   }, [reportData]);

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'Partial': return <TrendingUp className="w-4 h-4" />;
//       case 'Progress': return <Clock className="w-4 h-4" />;
//       case 'Delayed': return <XCircle className="w-4 h-4" />;
//       default: return <Minus className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white p-8 uppercase">
//       <header className="mb-12 border-b border-zinc-800 pb-8">
//         <h1 className="text-5xl font-bold">TDH <span className="text-zinc-500">Group</span></h1>
//         <p className="text-zinc-400 text-lg normal-case">Planned vs Executed Performance Report</p>
//       </header>

//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         {[
//           { label:'Strategic Pillars', value:'10', icon:Target },
//           { label:'Total Executed', value:`0${totalExecutedCount}`, icon:CheckCircle2, highlight:true },
//           { label:'Execution Gap', value:'High', icon:AlertCircle },
//         ].map((stat,i) => (
//           <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl">
//             <stat.icon className={`w-6 h-6 mb-4 ${stat.highlight ? 'text-emerald-400' : 'text-zinc-500'}`} />
//             <div className="text-4xl font-bold mb-2 tracking-tight">{stat.value}</div>
//             <div className="text-zinc-500 text-xs tracking-widest font-bold">{stat.label}</div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// // =======================
// // Main Wrapper Component
// // =======================
// const TdhGroup = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   return loggedIn ? <Dashboard /> : <Login onLogin={() => setLoggedIn(true)} />;
// };

// export default TdhGroup;
