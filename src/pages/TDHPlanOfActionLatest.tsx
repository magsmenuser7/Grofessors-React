import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  TrendingUp,
  LayoutGrid,
  ArrowRightLeft,
  Activity,
  Zap,
  Globe,
  ShoppingBag,
  Share2,
  Gift,
  Settings,
  ShieldCheck,
  Sparkles,
  Truck,
  MapPin,
  Package,
  FileCheck,
  Workflow
} from 'lucide-react';

const TDHPlanOfActionLatest = () => {
  const [activeSection, setActiveSection] = useState('pan-india');

  const sections = [
    {
      id: 'pan-india',
      title: 'Pan India Positioning',
      icon: <Globe className="w-5 h-5" />,
      content: 'Strategically expanding into Tier 2 and Tier 3 towns and cities. Systematic approach to entering nearby states such as Maharashtra, Karnataka, Tamil Nadu, and Goa, ensuring well-rounded regional penetration.',
      accent: 'blue',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center bg-blue-500/5 rounded-xl border border-blue-500/20 px-2 overflow-hidden">
          <div className="flex flex-wrap justify-center gap-1.5">
            {['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Goa'].map((state) => (
              <div key={state} className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                <MapPin className="w-2.5 h-2.5 text-blue-400" />
                <span className="text-[9px] font-bold text-blue-100 uppercase tracking-tighter">{state}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'protein-market',
      title: 'Protein Market Opportunity',
      icon: <Sparkles className="w-5 h-5" />,
      content: 'Scaling TDH Sunundalu as a "Protein Ladoo" for the All-India market. Leveraging consumer focus on cleaner ingredients and functional foods to bridge modern nutrition with traditional taste.',
      accent: 'amber',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center">
            <div className="relative">
                <div className="w-12 h-12 bg-amber-500 rounded-full animate-bounce shadow-lg shadow-amber-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full">NATURAL</div>
            </div>
        </div>
      )
    },
    {
      id: 'packaging-innovation',
      title: 'Packaging Innovation',
      icon: <Package className="w-5 h-5" />,
      content: 'Introducing premium, modular gifting ecosystems (Retail + "Dil Se"). Enabling customization at scale with co-branded templates, variable print areas, and quick-turn vendor workflows.',
      accent: 'teal',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-teal-500/20 border border-teal-500/50 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-500 rounded-sm"></div>
            </div>
            <div className="w-10 h-10 bg-teal-500 border-2 border-white/20 rounded flex items-center justify-center shadow-lg">
                <Gift className="w-5 h-5 text-black" />
            </div>
             <div className="w-8 h-8 bg-teal-500/20 border border-teal-500/50 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-teal-500 rounded-sm"></div>
            </div>
        </div>
      )
    },
    {
      id: 'brand-vs-availability',
      title: 'Brand vs. Availability',
      icon: <Truck className="w-5 h-5" />,
      content: 'Closing the gap between brand building and outlet-level availability. Using distributor meetings to capture ground-level inputs and solve execution challenges to ensure consistent product reach.',
      accent: 'emerald',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-between px-6">
            <Activity className="w-6 h-6 text-emerald-500" />
            <div className="flex-1 mx-4 h-px bg-emerald-500/30 border-dashed border-t"></div>
            <ShoppingBag className="w-6 h-6 text-white" />
        </div>
      )
    },
    {
      id: 'innovation',
      title: 'Kiosks & Innovation',
      icon: <LayoutGrid className="w-5 h-5" />,
      content: 'Implementing kiosk systems in gated communities to drive direct-to-consumer engagement and local product trials.',
      accent: 'indigo',
      visual: (
        <div className="mt-4 h-24 flex items-end justify-around px-4">
          <div className="w-8 bg-indigo-500/20 h-[40%] rounded-t-lg border-t border-indigo-500/40"></div>
          <div className="w-8 bg-indigo-500/40 h-[70%] rounded-t-lg border-t border-indigo-500/60"></div>
          <div className="w-8 bg-indigo-500 h-[90%] rounded-t-lg shadow-lg"></div>
        </div>
      )
    },
    {
      id: 'positioning',
      title: 'Brand Positioning Shift',
      icon: <Target className="w-5 h-5" />,
      content: 'Shift from Women-Centric to "Decision Makers at Home." A gender-neutral platform reflecting who drives grocery and kitchen choices today.',
      accent: 'rose',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-around">
          <Users className="w-6 h-6 text-rose-300/40" />
          <ArrowRightLeft className="w-4 h-4 text-white/20" />
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shadow-lg"><LayoutGrid className="w-5 h-5 text-white" /></div>
        </div>
      )
    },
    {
      id: 'cross-selling',
      title: 'Merge & Cross-Selling',
      icon: <Zap className="w-5 h-5" />,
      content: 'Analyzing products for merging/cross-selling. Creating SKU awareness through bundling and "Buy One + Get One" of small portions.',
      accent: 'cyan',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center animate-spin-slow">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
      )
    },
    {
      id: 'digital',
      title: 'Digital Communication',
      icon: <Share2 className="w-5 h-5" />,
      content: 'Creating distinct Instagram strategies for TDH Foods and Tenali Double Horse to highlight unique identities and target audiences.',
      accent: 'purple',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center gap-2">
          <div className="w-8 h-12 bg-purple-500/20 rounded-md border border-purple-500/40"></div>
          <div className="w-8 h-12 bg-purple-500 rounded-md shadow-lg"></div>
        </div>
      )
    },
    {
      id: 'dil-se',
      title: 'Revamp of "Dil Se"',
      icon: <Gift className="w-5 h-5" />,
      content: 'Rename to corporate-friendly title for celebration/gifting. Additional pack sizes and co-branded packs with logo upload capabilities.',
      accent: 'orange',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center">
          <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/30">
            <Gift className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      )
    },
    {
      id: 'vendor',
      title: 'Vendor & Workflow',
      icon: <Workflow className="w-5 h-5" />,
      content: 'Streamlining communication to ensure brand values are effectively translated. Establishing clear workflow approvals for cohesive brand impact across all creative assets.',
      accent: 'pink',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-500/40"></div>
          <div className="w-6 h-0.5 bg-pink-500/20"></div>
          <div className="w-3 h-3 rounded-full bg-pink-500/70"></div>
          <div className="w-6 h-0.5 bg-pink-500/20"></div>
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Settings className="w-4 h-4 text-black" />
          </div>
        </div>
      )
    },
    {
      id: 'legal',
      title: 'Legal & Compliance',
      icon: <ShieldCheck className="w-5 h-5" />,
      content: 'Rigorous checks on regulatory standards and regional compliance for all new market entries. Ensuring documentation meets industry benchmarks.',
      accent: 'slate',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center">
          <div className="relative">
             <div className="w-12 h-14 bg-slate-500/10 border border-slate-500/30 rounded-b-2xl flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-slate-400" />
             </div>
             <div className="absolute -bottom-1 -right-1 bg-slate-500 rounded-full p-1 border-2 border-black">
                <div className="w-2 h-2 bg-white rounded-full"></div>
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 p-6 md:p-12 lg:p-16">
        <header className="max-w-7xl mx-auto mb-16 text-center lg:text-left border-b border-white/10 pb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] tracking-[0.4em] uppercase mb-4 text-gray-400">
              Strategic Roadmap
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
              TDH PLAN OF<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-700">ACTION 2026</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              Integrating market-grounded insights with nutrition-forward innovation to drive the next phase of TDH growth.
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
              <div
                key={section.id}
                onMouseEnter={() => setActiveSection(section.id)}
                className={`group p-6 rounded-[28px] border transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[420px] ${
                  activeSection === section.id 
                    ? `border-${section.accent}-500/50 bg-${section.accent}-500/5 ring-1 ring-${section.accent}-500/20 shadow-2xl` 
                    : 'border-white/10 bg-white/5 opacity-80'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-500 ${
                    activeSection === section.id ? `bg-${section.accent}-500 text-black` : 'bg-white/10 text-white'
                  }`}>
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-black mb-3 tracking-tight">{section.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium line-clamp-6 group-hover:line-clamp-none transition-all duration-500">
                    {section.content}
                  </p>
                </div>

                <div className="mt-4">
                  {section.visual}
                </div>

                <div className={`absolute top-0 right-0 w-20 h-20 bg-${section.accent}-500/10 blur-3xl -mr-10 -mt-10 transition-opacity ${activeSection === section.id ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
            ))}
          </div>
        </main>

        <footer className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-black tracking-tighter">TENALI DOUBLE HORSE</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Confidential Proposal | 2026</div>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <span>TDH Foods</span>
            <span>Rishika</span>
            <span>TDH Foundation</span>
          </div>
        </footer>
      </div>

      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          
          .bg-blue-500 { background-color: #3b82f6; }
          .bg-amber-500 { background-color: #f59e0b; }
          .bg-emerald-500 { background-color: #10b981; }
          .bg-rose-500 { background-color: #f43f5e; }
          .bg-cyan-500 { background-color: #06b6d4; }
          .bg-indigo-500 { background-color: #6366f1; }
          .bg-orange-500 { background-color: #f97316; }
          .bg-pink-500 { background-color: #ec4899; }
          .bg-purple-500 { background-color: #a855f7; }
          .bg-teal-500 { background-color: #14b8a6; }
          .bg-slate-500 { background-color: #64748b; }
          
          .border-blue-500\/50 { border-color: rgba(59, 130, 246, 0.5); }
          .border-amber-500\/50 { border-color: rgba(245, 158, 11, 0.5); }
          .border-emerald-500\/50 { border-color: rgba(16, 185, 129, 0.5); }
          .border-rose-500\/50 { border-color: rgba(244, 63, 94, 0.5); }
          .border-cyan-500\/50 { border-color: rgba(6, 182, 212, 0.5); }
          .border-indigo-500\/50 { border-color: rgba(99, 102, 241, 0.5); }
          .border-orange-500\/50 { border-color: rgba(249, 115, 22, 0.5); }
          .border-pink-500\/50 { border-color: rgba(236, 72, 153, 0.5); }
          .border-purple-500\/50 { border-color: rgba(168, 85, 247, 0.5); }
          .border-teal-500\/50 { border-color: rgba(20, 184, 166, 0.5); }
          .border-slate-500\/50 { border-color: rgba(100, 116, 139, 0.5); }

          .bg-blue-500\/5 { background-color: rgba(59, 130, 246, 0.05); }
          .bg-amber-500\/5 { background-color: rgba(245, 158, 11, 0.05); }
          .bg-emerald-500\/5 { background-color: rgba(16, 185, 129, 0.05); }
          .bg-rose-500\/5 { background-color: rgba(244, 63, 94, 0.05); }
          .bg-cyan-500\/5 { background-color: rgba(6, 182, 212, 0.05); }
          .bg-indigo-500\/5 { background-color: rgba(99, 102, 241, 0.05); }
          .bg-orange-500\/5 { background-color: rgba(249, 115, 22, 0.05); }
          .bg-pink-500\/5 { background-color: rgba(236, 72, 153, 0.05); }
          .bg-purple-500\/5 { background-color: rgba(168, 85, 247, 0.05); }
          .bg-teal-500\/5 { background-color: rgba(20, 184, 166, 0.05); }
          .bg-slate-500\/5 { background-color: rgba(100, 116, 139, 0.05); }
          .bg-slate-500\/10 { background-color: rgba(100, 116, 139, 0.1); }
        `}
      </style>
    </div>
  );
};

export default TDHPlanOfActionLatest;