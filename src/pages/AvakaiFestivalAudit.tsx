import React, { useState } from 'react';
import { LayoutDashboard, Users, Fingerprint, Mic2, MapPin, History, Zap, Settings, ChevronDown, ChevronUp, ArrowRight, BrainCircuit, Globe, UtensilsCrossed, Camera, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';

import image1 from '../components/assets/logos/image1.png'
import image2 from '../components/assets/logos/image2.jpg'
import image3 from '../components/assets/logos/image3.png'


const AvakaiFestivalAudit = () => {
  const [activeTab, setActiveTab] = useState('brand');
  const [expandedQa, setExpandedQa] = useState<number | null>(null);

  const pillars = [
    { id: 'brand', label: 'Identity & Curation', icon: Fingerprint },
    { id: 'audience', label: 'Experiential Strategy', icon: Users },
    { id: 'ops', label: 'Systems & Governance', icon: Settings },
    { id: 'visual', label: 'Visual Audit & Pivot', icon: Eye },
  ];

  const insights = {
    brand: [
      {
        title: "Narrative Archetyping",
        icon: History,
        observation: "Generic Cultural Template",
        desc_obs: "The 2025 iteration utilized a high-production but localized-agnostic 'Pan-Indian' template. While aesthetically competent, it lacked the specific semiotic markers of the Amaravati region, leading to a diluted brand recall.",
        strategy: "Hyper-Local Contextualization",
        desc_strat: "For 2026, we must transition from 'Display' to 'Discovery'. Anchor the narrative in the Satavahana and Ikshvaku legacies. This isn't just history; it's a 'Geographic Moat' that establishes Amaravati as a unique destination brand."
      },
      {
        title: "Linguistic & Semantic Alignment",
        icon: Mic2,
        observation: "Cognitive Dissonance in Delivery",
        desc_obs: "A disconnect existed between the professional 'Class' delivery (English-centric/non-native) and the 'Mass' audience reality. This creates an emotional barrier to brand adoption.",
        strategy: "Vernacular Authority",
        desc_strat: "Prioritize 'Cultural Navigators'—native linguistic authorities who command respect and resonance. The goal is to bridge the gap between high-level institutional messaging and grassroots cultural pride."
      },
      {
        title: "Institutional Value Proposition",
        icon: Globe,
        observation: "Passive Asset Utilization",
        desc_obs: "Historical assets were treated as static backdrops rather than active drivers of the tourism value proposition.",
        strategy: "Strategic Heritage Valuation",
        desc_strat: "Reposition history as a validation of future potential. Every historical touchpoint must be a 'Reason to Believe' (RTB) for investors and tourists regarding the state's civilization-building capacity."
      }
    ],
    audience: [
      {
        title: "Engagement Architecture",
        icon: Zap,
        observation: "Low-Intensity Interaction",
        desc_obs: "The engagement model relied on passive consumption (viewing) which yields low emotional 'stickiness' and minimal social currency for the younger demographic.",
        strategy: "High-Octane Participation",
        desc_strat: "Architect 'Immersive Loops'—integrating tech-enabled participation, social-sharing triggers, and kinetic experiences that transform the spectator into a brand advocate."
      },
      {
        title: "Psychographic Segmentation",
        icon: Users,
        observation: "Broad-Stroke Programming",
        desc_obs: "The 2025 schedule lacked distinct tracks, leading to a demographic 'average' that failed to fully satisfy either high-net-worth professionals or the youth segment.",
        strategy: "Bifurcated Experience Design",
        desc_strat: "Implement a dual-track strategy: 'Executive/Institutional' networking during daylight hours and 'High-Energy/Cultural' immersion for the youth in the evenings to maximize total footfall value."
      },
      {
        title: "Hospitality Semiotics",
        icon: UtensilsCrossed,
        observation: "Standardized Amenity Provision",
        desc_obs: "Hospitality was functional but lacked the 'Andhra Hospitality' signature, missing an opportunity to build emotional brand equity through sensory triggers.",
        strategy: "Signature Sensory Branding",
        desc_strat: "Curate a bespoke culinary and hospitality layer that leverages local 'Nostalgia' and authentic flavors, ensuring the experience feels proprietary to the region."
      }
    ],
    ops: [
      {
        title: "Operational Framework",
        icon: BrainCircuit,
        observation: "Execution-Only Mandate",
        desc_obs: "The operational focus was limited to logistics and production delivery, leaving a vacuum in 'Strategic Curation' and local alignment.",
        strategy: "Brand Governance Model",
        desc_strat: "Magsmen assumes the role of 'Strategic Architect'. We define the brand standards and cultural KPIs, ensuring that external execution partners (builders) adhere to the strategic blueprint."
      },
      {
        title: "Real-Time Amplification",
        icon: LayoutDashboard,
        observation: "Delayed Social Integration",
        desc_obs: "Technical management was robust but operated in a silo, separate from the real-time social and digital amplification required for a modern festival.",
        strategy: "Digital-First Operational Flow",
        desc_strat: "Integrate specialized 'Amplification Units' within the core tech team to ensure that every key moment is captured, processed, and distributed within a 15-minute window for maximum virality."
      }
    ]
  };

  const visualCritiqueData = [
    {
      type: "Architectural Semiotics",
      image: image2,
      title: "Authenticity Over Accustomed Aesthetics",
      critique: "The existing visual language (arches/domes) utilizes a 'Pan-Indian Accustomed' aesthetic—largely Mughal or Rajputana—which is semiotically inconsistent with the Dravidian/Andhra architectural lexicon. This creates a brand 'blur' where the destination is indistinguishable from festivals in North India.",
      pivot: "Strategic Pivot: Pivot to 'Ancient Andhra' structural motifs. We must mandate the use of the Amaravati Stupa silhouette, the Kakatiya Torana, and the Lepakshi pillar aesthetics. This creates immediate visual distinction and proprietary brand equity for AP Tourism."
    },
    {
      type: "Visual Identity & Attire",
      image: image1,
      title: "The Semiotic Disconnect in Styling",
      critique: "The utilization of non-regional costuming (e.g., specific turban styles) signals a 'Borrowed Identity'. This lack of visual discipline undermines the festival's claim of being a custodian of Andhra's heritage for a global audience.",
      pivot: "Strategic Pivot: Implement a 'Visual Purity' code. Every performer and staff member must serve as a visual ambassador. Prioritize the specific sartorial traditions of Andhra, leveraging local art forms like Perini Sivatandavam to deliver an experience that cannot be replicated elsewhere."
    },
    {
      type: "Brand Architecture & Hierarchy",
      image: image3,
      title: "Institutional Brand Leadership",
      critique: "Current collateral exhibits a weak brand hierarchy where the 'Initiator' (AP Tourism) is positioned as a secondary element. A confused narrative that attempts to satisfy local familiarity while seeking global appeal results in a message that captivates neither.",
      pivot: "Strategic Pivot: Position AP Tourism as the 'Visionary Force'. The brand architecture must be bold, ubiquitous, and authoritative. Every touchpoint must clearly communicate a singular narrative: Amaravati is the global gateway to Ancient Andhra, with the Government as its premier host."
    }
  ];

  const qaData = [
    {
      q: "What is Magsmen's role vs. the Event Management Agency?",
      a: "We operate as the Strategic Management Office (SMO). While the EMA focuses on 'Production Performance' (lights, sound, logistics), Magsmen governs 'Perception Performance' (positioning, narrative, cultural alignment). We protect the state's brand ROI."
    },
    {
      q: "Why is 'Ancient Andhra' a business imperative?",
      a: "In a saturated global tourism market, 'generic' is invisible. Authenticity is a premium asset. By claiming the 'Ancient Andhra' narrative, we create a Geographic Moat—a proprietary brand story that neighboring states cannot legally or culturally claim, driving destination value."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white py-16 px-6 shadow-xl border-b-4 border-blue-500 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-blue-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-[0.2em]">Institutional Report</span>
            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Magsmen Strategic Advisory</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
            AVAKAI <span className="font-bold text-blue-400">Amaravati 2026</span>
          </h1>
          <div className="max-w-2xl border-l-2 border-blue-500/50 pl-6">
            <p className="text-xl text-gray-400 font-light italic leading-relaxed">
              "A Civilization-First approach to Destination Branding: Moving from Commodity to Cultural Distinction."
            </p>
          </div>
        </div>
        {/* Subtle background element */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        
        {/* Unified Navigation Bar */}
        <nav className="flex flex-wrap bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden mb-12">
          {pillars.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-3 px-6 py-6 transition-all duration-300 border-b-4 ${
                  isActive 
                    ? 'border-blue-600 bg-blue-50/30 text-blue-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                <span className="font-black text-xs uppercase tracking-[0.15em] whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Content Area */}
        <div className="animate-fadeIn">
          {activeTab === 'visual' ? (
            /* VISUAL AUDIT SECTION - ALIGNED GRID */
            <div className="space-y-12">
              <div className="bg-slate-900 text-white p-10 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 border border-slate-800">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-amber-400 mb-4">
                    <AlertTriangle size={24} />
                    <span className="font-black text-xs uppercase tracking-[0.2em]">Strategic Imperative</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 tracking-tight">VII. Strategic Pivot: Reclaiming Identity</h2>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                    Visual equity is the most potent driver of brand perception. We must execute a visual pivot to reclaim Andhra's distinct cultural semiotics and eliminate <strong>'Aesthetic Homogenization'</strong>.
                  </p>
                </div>
                <div className="hidden lg:block opacity-20">
                  <ShieldCheck size={140} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visualCritiqueData.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group">
                    <div className="h-64 bg-slate-100 relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-6">
                        <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest rounded-sm">
                          Audit: {item.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-lg font-black text-slate-900 mb-6 leading-tight uppercase tracking-tight">{item.title}</h3>
                      
                      <div className="mb-8 flex-1">
                        <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-3 flex items-center">
                          <span className="w-4 h-[1px] bg-red-600 mr-2"></span> Diagnosis
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed italic border-l-2 border-red-100 pl-4">
                          "{item.critique}"
                        </p>
                      </div>

                      <div className="mt-auto bg-slate-900 p-6 rounded-xl border-t-4 border-blue-600 shadow-inner">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center">
                          <BrainCircuit size={14} className="mr-2" /> Strategic Pivot
                        </h4>
                        <p className="text-slate-200 text-[13px] leading-relaxed font-medium">
                          {item.pivot}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Strategic Synthesis Block */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden mt-16">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-3">
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Synthesis Matrix</span>
                </div>
                <div className="p-10 grid md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">The Narrative Realignment</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      The current delivery mechanism suffers from <strong>'Aesthetic Dilution'</strong>. By borrowing North Indian tropes, we sacrifice the unique competitive advantage of the Andhra heritage.
                    </p>
                    <p className="text-slate-500 leading-relaxed">
                      To establish Andhra Pradesh as a premier destination, we must leverage the <strong>uniqueness of Ancient Andhra</strong>. This is a deliberate shift from 'General Event' to 'Civilizational Experience'.
                    </p>
                  </div>
                  <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100/50">
                    <h4 className="font-black text-blue-900 mb-6 text-xs uppercase tracking-widest flex items-center">
                       Mandates for 2026 Deployment
                    </h4>
                    <ul className="space-y-5">
                      {[
                        { label: "Semiotic Overhaul", desc: "Mandate designs based strictly on Amaravati artifacts." },
                        { label: "Visual Purity", desc: "Eliminate non-regional styling in performance and staff." },
                        { label: "Brand Ubiquity", desc: "Position AP Tourism as the primary Visionary Architect." }
                      ].map((m, i) => (
                        <li key={i} className="flex items-start group">
                          <div className="mt-1 mr-4 bg-blue-600 text-white rounded-full p-1 transition-transform group-hover:scale-110">
                            <ArrowRight size={12} />
                          </div>
                          <div>
                            <span className="block font-bold text-slate-900 text-sm mb-1">{m.label}</span>
                            <span className="text-slate-600 text-[13px]">{m.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STRATEGY PILLARS SECTION - ALIGNED CARDS */
            <div className="grid grid-cols-1 gap-8">
              {insights[activeTab as keyof typeof insights]?.map((item: { icon: any; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; observation: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; desc_obs: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; strategy: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; desc_strat: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => {
                const ItemIcon = item.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group">
                    <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center space-x-4">
                        <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                          <ItemIcon size={18} />
                        </div>
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{item.title}</h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/2 p-10 border-r border-gray-100 relative">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center">
                          <span className="w-8 h-[1px] bg-slate-200 mr-3"></span> Diagnosis
                        </div>
                        <h4 className="text-xl font-medium text-slate-700 mb-4">{item.observation}</h4>
                        <p className="text-slate-500 text-[15px] leading-relaxed">{item.desc_obs}</p>
                      </div>

                      <div className="md:w-1/2 p-10 bg-blue-50/20">
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] mb-6 flex items-center">
                          <span className="w-8 h-[1px] bg-blue-200 mr-3"></span> Strategic Realignment
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                          {item.strategy}
                          <ArrowRight className="ml-3 text-blue-600 opacity-50 group-hover:translate-x-1 transition-transform" size={20} />
                        </h4>
                        <p className="text-slate-700 text-[15px] leading-relaxed font-medium">{item.desc_strat}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Q&A Section - Aligned Bottom */}
          <section className="mt-24 pt-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-4">Strategic Clarity</span>
              <h2 className="text-2xl font-light tracking-tight text-slate-900">Executive Q&A</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {qaData.map((qa, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
                  <button 
                    onClick={() => setExpandedQa(expandedQa === idx ? null : idx)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center group"
                  >
                    <span className="font-bold text-slate-800 text-xs uppercase tracking-widest transition-colors group-hover:text-blue-600">{qa.q}</span>
                    <div className={`transition-transform duration-300 ${expandedQa === idx ? 'rotate-180' : ''}`}>
                      <ChevronDown size={18} className={expandedQa === idx ? 'text-blue-600' : 'text-gray-300'} />
                    </div>
                  </button>
                  {expandedQa === idx && (
                    <div className="px-8 pb-8 text-slate-500 text-sm leading-relaxed border-t border-gray-50 bg-slate-50/30">
                      <p className="pt-6">{qa.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Structured Footer */}
      <footer className="bg-slate-900 text-gray-500 py-20 mt-20 border-t-8 border-blue-600 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <p className="uppercase tracking-[0.5em] text-[10px] font-black text-white mb-4">Magsmen Brand Consultants</p>
            <p className="text-[10px] font-bold text-slate-500 leading-loose">
              CIVILIZATIONAL BRANDING • AMARAVATI 2026 ENGAGEMENT<br />
              CONFIDENTIAL STRATEGIC INTELLIGENCE UNIT
            </p>
          </div>
          <div className="h-px w-24 bg-slate-800 md:h-12 md:w-px"></div>
          <div className="text-center md:text-right">
            <p className="text-xs italic text-slate-400 font-serif leading-relaxed">
              "Strategy is the art of creating distinction<br /> where others see commodity."
            </p>
          </div>
        </div>
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </footer>
    </div>
  );
};

export default AvakaiFestivalAudit;