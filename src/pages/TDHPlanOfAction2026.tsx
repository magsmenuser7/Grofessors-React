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
  ShieldCheck
} from 'lucide-react';

const TDHPlanOfAction2026 = () => {
  const [activeSection, setActiveSection] = useState('pan-india');

  const sections = [
    {
      id: 'pan-india',
      title: 'Pan India Positioning',
      icon: <Globe className="w-5 h-5" />,
      content: 'Strategically expanding into Tier 2 and Tier 3 towns and cities. Systematic approach to entering nearby states such as Maharashtra, Karnataka, Tamil Nadu, and Goa, ensuring well-rounded regional penetration.',
      accent: 'blue',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center bg-blue-500/5 rounded-xl border border-blue-500/20">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <circle cx="100" cy="50" r="8" className="fill-blue-500 animate-pulse" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <line key={i} x1="100" y1="50" x2={100 + Math.cos(angle * Math.PI / 180) * 35} y2={50 + Math.sin(angle * Math.PI / 180) * 35} className="stroke-blue-400/40" strokeWidth="1" />
            ))}
          </svg>
        </div>
      )
    },
    {
      id: 'innovation',
      title: 'Kiosks & Product Innovation',
      icon: <ShoppingBag className="w-5 h-5" />,
      content: 'Implement kiosk systems in gated communities. Position "Sunundalu" as "Protein Ladoo" to build a pan-India offering and expand nationwide appeal.',
      accent: 'amber',
      visual: (
        <div className="mt-4 h-24 flex items-end justify-around px-4">
          <div className="w-8 bg-amber-500/20 h-[40%] rounded-t-lg border-t border-amber-500/40"></div>
          <div className="w-8 bg-amber-500/40 h-[70%] rounded-t-lg border-t border-amber-500/60"></div>
          <div className="w-8 bg-amber-500 h-[90%] rounded-t-lg shadow-lg"></div>
        </div>
      )
    },
    {
      id: 'market',
      title: 'G.T Market Availability',
      icon: <TrendingUp className="w-5 h-5" />,
      content: 'TDH FOODS/Rishika needs to build strong independent brand awareness, ensuring the same distribution reach as TDH Pulses while maintaining price parity.',
      accent: 'emerald',
      visual: (
        <div className="mt-4 h-24 flex flex-col justify-center space-y-2 px-4">
          <div className="w-full h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[90%]"></div>
          </div>
          <div className="w-full h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[45%] animate-pulse"></div>
          </div>
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
      icon: <LayoutGrid className="w-5 h-5" />,
      content: 'Analyze products for merging/cross-selling. Creating SKU awareness through bundling and "Buy One + Get One" of small portions.',
      accent: 'cyan',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center animate-spin-slow">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
      )
    },
    {
      id: 'digital',
      title: 'Digital Communication',
      icon: <Share2 className="w-5 h-5" />,
      content: 'Creating distinct Instagram strategies for TDH Foods and Tenali Double Horse to highlight unique identities and target audiences.',
      accent: 'indigo',
      visual: (
        <div className="mt-4 h-24 flex items-center justify-center gap-2">
          <div className="w-8 h-12 bg-indigo-500/20 rounded-md border border-indigo-500/40"></div>
          <div className="w-8 h-12 bg-indigo-500 rounded-md shadow-lg"></div>
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
      id: 'foundation',
      title: 'TDH Foundation',
      icon: <Users className="w-5 h-5" />,
      content: 'Support women entrepreneurs through training on selling and branding, and explore potential acquisition opportunities.',
      accent: 'pink',
      visual: (
        <div className="mt-4 h-24 flex items-end justify-center space-x-1">
          {[30, 50, 70, 95].map((h, i) => (
            <div key={i} className="w-4 bg-pink-500 rounded-t" style={{ height: `${h}%`, opacity: (i + 1) / 4 }}></div>
          ))}
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
              Executive Proposal
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
              TDH PLAN OF<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-700">ACTION 2026</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              A strategic blueprint focusing on market expansion, brand evolution, and operational excellence for the upcoming fiscal cycle.
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto">
          {/* Main Grid for All Content Sections */}
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

          {/* Operational Support & Legal Blocks */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/5 border border-white/10 p-10 rounded-[40px] flex flex-col justify-center relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <Settings className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-black tracking-tight">Streamlining Vendor Management</h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Establishment of a clear and transparent communication regarding the vendor management and work approach process. By streamlining the vendor workflow and approval process, we aim to enhance the effectiveness of brand value communication across creatives, posts, and all forms of communication. This will ensure that the brand’s goals and accomplishments are consistently identified and conveyed in a cohesive and impactful manner.
              </p>
              <div className="flex gap-2">
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-2/3 animate-pulse"></div>
                </div>
                <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-black mb-3">Legal & Compliance</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                Ensuring that all legal aspects are thoroughly checked and addressed, including compliance with industry regulations.
              </p>
            </div>
          </div>
        </main>

        <footer className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-black tracking-tighter">TENALI DOUBLE HORSE</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Proposal Version 2.6 | 2026</div>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <span>TDH Foods</span>
            <span>Rishika</span>
            <span>Millet Marvels</span>
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
          
          .border-blue-500\/50 { border-color: rgba(59, 130, 246, 0.5); }
          .border-amber-500\/50 { border-color: rgba(245, 158, 11, 0.5); }
          .border-emerald-500\/50 { border-color: rgba(16, 185, 129, 0.5); }
          .border-rose-500\/50 { border-color: rgba(244, 63, 94, 0.5); }
          .border-cyan-500\/50 { border-color: rgba(6, 182, 212, 0.5); }
          .border-indigo-500\/50 { border-color: rgba(99, 102, 241, 0.5); }
          .border-orange-500\/50 { border-color: rgba(249, 115, 22, 0.5); }
          .border-pink-500\/50 { border-color: rgba(236, 72, 153, 0.5); }

          .bg-blue-500\/5 { background-color: rgba(59, 130, 246, 0.05); }
          .bg-amber-500\/5 { background-color: rgba(245, 158, 11, 0.05); }
          .bg-emerald-500\/5 { background-color: rgba(16, 185, 129, 0.05); }
          .bg-rose-500\/5 { background-color: rgba(244, 63, 94, 0.05); }
          .bg-cyan-500\/5 { background-color: rgba(6, 182, 212, 0.05); }
          .bg-indigo-500\/5 { background-color: rgba(99, 102, 241, 0.05); }
          .bg-orange-500\/5 { background-color: rgba(249, 115, 22, 0.05); }
          .bg-pink-500\/5 { background-color: rgba(236, 72, 153, 0.05); }
        `}
      </style>
    </div>
  );
};

export default TDHPlanOfAction2026;