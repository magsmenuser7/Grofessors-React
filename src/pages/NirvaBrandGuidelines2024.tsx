import React, { useState } from 'react';
import { 
  Store, 
  Package, 
  Smartphone, 
  Award, 
  ChevronRight, 
  Heart, 
  Gift, 
  Sparkles,
  ShoppingBag,
  Info,
  Quote,
  Layers
} from 'lucide-react';

const NirvaBrandGuidelines2024 = () => {
  const [activeTab, setActiveTab] = useState<'instore' | 'packaging' | 'digital' | 'ranges'>('instore');

  type TabId = 'instore' | 'packaging' | 'digital' | 'ranges';
  const tabs: { id: TabId; label: string; icon: React.ElementType; description: string }[] = [
    { id: 'instore', label: 'In-Store', icon: Store, description: 'Spatial touchpoints and customer journey.' },
    { id: 'packaging', label: 'Packaging', icon: Package, description: 'The unboxing and tactile experience.' },
    { id: 'digital', label: 'Digital', icon: Smartphone, description: 'Post-purchase and supporting collateral.' },
    { id: 'ranges', label: 'Collections', icon: Award, description: 'Messaging categorized by product range.' },
  ];

  type ContentItem = {
    sub: string;
    strategy: string;
    lines: string[];
    icon?: React.ReactNode;
    category?: string;
    tag?: string;
  };

  const content: {
    instore: ContentItem[];
    packaging: ContentItem[];
    digital: ContentItem[];
    ranges: ContentItem[];
  } = {
    instore: [
      {
        sub: "Store Entrance",
        strategy: "First Impression & Invitation",
        lines: [
          "The start of something golden.",
          "Where meaningful beginnings shine.",
          "Gold for moments that stay.",
          "Begin your golden chapter here.",
          "Where every beginning turns golden."
        ],
        icon: <Sparkles className="text-amber-600" size={20} />
      },
      {
        sub: "Brand Story Wall",
        strategy: "The Emotional Anchor",
        lines: [
          "Gold chosen for pride, promise, and memory.",
          "Not every celebration needs noise.",
          "Jewellery that marks life’s meaningful firsts."
        ],
        icon: <Info className="text-amber-600" size={20} />
      },
      {
        sub: "Gifting Zone",
        strategy: "Intentionality & Memory",
        lines: [
          "Crafted for the moment it marks.",
          "More than gold. A beginning.",
          "Chosen to remember.",
          "For moments that become memories.",
          "Make someone's day a little brighter."
        ],
        icon: <Gift className="text-amber-600" size={20} />
      },
      {
        sub: "Trial Area",
        strategy: "Personal Connection",
        lines: [
          "This is how a golden beginning feels.",
          "This moment is yours.",
          "See how a beginning feels.",
          "The start of something personal.",
          "A quiet yes to something lasting."
        ],
        icon: <Heart className="text-amber-600" size={20} />
      }
    ],
    packaging: [
      {
        sub: "Brochures / Catalogues",
        strategy: "Timeless Visual Storytelling",
        lines: ["The start of something golden.", "Firsts, made timeless.", "Gold for meaningful moments.", "Where firsts are made forever.", "Beginnings, refined in gold."],
        category: "Cover & Inner Pages"
      },
      {
        sub: "Carry Bags",
        strategy: "The Mobile Brand Statement",
        lines: ["The start of something golden.", "Carry a golden beginning.", "Your moment. In gold.", "A moment, beautifully held.", "From firsts to forever.", "Quiet luxury. Lasting meaning.", "Made to remember."],
        category: "Front & Sides"
      },
      {
        sub: "The Box Experience",
        strategy: "The Sacred Vessel",
        lines: ["The moment begins here.", "A beginning, beautifully kept.", "For a moment worth holding.", "Where every story starts.", "This gold carries your story.", "Every piece begins with a moment.", "This is the start of something golden.", "A celebration, softly marked."],
        category: "Lid & Inner Flap"
      },
      {
        sub: "Thank You Cards",
        strategy: "The Lasting Impression",
        lines: ["Thank you for choosing a golden beginning.", "This piece marks a moment worth celebrating.", "May this be a beginning you cherish.", "Your moment, held in gold.", "Let this moment stay with you forever."],
        category: "Post-Purchase"
      }
    ],
    digital: [
      {
        sub: "Digital & Warranty",
        strategy: "Assurance & Longevity",
        lines: [
          "Thank you for choosing a meaningful beginning.",
          "A new chapter, now in gold.",
          "Gold that marks what matters.",
          "Nirva Gold, for meaningful beginnings."
        ],
        icon: <Smartphone className="text-amber-600" size={20} />
      },
      {
        sub: "Supporting Elements",
        strategy: "Attention to Detail",
        lines: [
          "Wrapped around a beginning.",
          "Unwrap a golden moment.",
          "Gently holding a memory.",
          "Firsts, wrapped in gold.",
          "Crafted for what matters.",
          "Gold for moments that stay."
        ],
        icon: <ShoppingBag className="text-amber-600" size={20} />
      }
    ],
    ranges: [
      {
        sub: "Gifting Range",
        strategy: "Occasion Based",
        lines: ["Crafted for the moment it marks.", "More than gold. A beginning.", "For moments that become memories."],
        tag: "Emotional"
      },
      {
        sub: "Everyday Luxury",
        strategy: "Daily Meaning",
        lines: ["Quiet gold for everyday firsts.", "Simple beginnings. Lasting beauty.", "Gold that stays with you.", "Quiet luxury, every day."],
        tag: "Functional"
      },
      {
        sub: "Traditional",
        strategy: "Legacy & Heritage",
        lines: ["Where heritage begins anew.", "Gold chosen with pride.", "Traditions, carried forward.", "What’s chosen with love is always precious."],
        tag: "Cultural"
      },
      {
        sub: "Bridal / Milestone",
        strategy: "Lifelong Promises",
        lines: ["Where forever begins.", "Gold for promises made.", "A proud start to a shared journey.", "From first vows to forever.", "A beginning worth celebrating.", "Marking life’s most meaningful yes."],
        tag: "Significant"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-amber-100 pb-20">
      {/* Editorial Header */}
      <header className="max-w-6xl mx-auto pt-12 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-amber-200 pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-amber-400"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600">Brand Guidelines 2024</span>
            </div>
            <h1 className="text-6xl font-serif font-light text-slate-950 mb-2">
              NIRVA
            </h1>
            <p className="text-xl font-light text-slate-500 font-serif italic">
              "The Start of Something Golden"
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-semibold text-slate-400 tracking-tighter uppercase mb-1">Prepared by</p>
            <p className="text-lg font-medium text-slate-800">Magsmen Brand Consultants</p>
          </div>
        </div>
      </header>

      {/* Navigation Sub-header */}
      <nav className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left p-5 rounded-2xl transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-white border-amber-200 shadow-xl shadow-amber-900/5 ring-1 ring-amber-100'
                  : 'bg-transparent border-transparent grayscale hover:grayscale-0 hover:bg-white/50'
              }`}
            >
              <tab.icon size={24} className={activeTab === tab.id ? 'text-amber-600 mb-3' : 'text-slate-400 mb-3'} />
              <div className="font-semibold text-sm mb-1">{tab.label}</div>
              <div className="text-[11px] text-slate-400 leading-tight hidden md:block">{tab.description}</div>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content[activeTab].map((item, index) => (
            <article key={index} className="group flex flex-col bg-white border border-slate-100 rounded-3xl p-8 shadow-sm transition-all hover:shadow-lg hover:border-amber-100">
              <header className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-2 text-amber-600 mb-1">
                    {item.icon ? item.icon : <Layers size={18} />}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{item.strategy || "Core Theme"}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-slate-900">{item.sub}</h3>
                </div>
                {item.tag && (
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100">
                    {item.tag}
                  </span>
                )}
                {item.category && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                )}
              </header>

              <div className="space-y-6 flex-grow">
                {item.lines.map((line, idx) => (
                  <div key={idx} className="relative pl-6">
                    <Quote size={12} className="absolute left-0 top-1 text-amber-200" />
                    <p className="text-lg font-serif italic text-slate-700 leading-relaxed group-hover:text-slate-950 transition-colors">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-24 px-6 opacity-40">
        <div className="border-t border-slate-200 pt-8 flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold">
          <span>Nirva Creative Communication Framework</span>
          <span>© 2024 Magsmen</span>
        </div>
      </footer>
    </div>
  );
};

export default NirvaBrandGuidelines2024;