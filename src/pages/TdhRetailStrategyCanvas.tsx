import React, { useState } from 'react';
import { 
  User, 
  UtensilsCrossed, 
  ShoppingCart, 
  Store, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Layers,
  ChevronRight,
  Megaphone,
  Tag,
  TrendingUp, // New icon for Activation Timeline
  MapPin,
  MessageSquareQuote,
  Clock, // Icon for individual tasks in Timeline
  Target // Icon for objectives in Timeline
} from 'lucide-react';

const TdhRetailStrategyCanvas = () => {
  // 'strategy' (Creative Plan), 'comms' (Communication), or 'timeline' (Activation Timeline)
  const [activeTab, setActiveTab] = useState('strategy'); 
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // --- 1. Creative Plan (Formerly Visual Merchandising) ---
  const strategies = [
    {
      id: 1,
      title: "Brand Ambassador Cutout",
      subtitle: "Suma Garu Integration",
      icon: <User size={40} />,
      color: "from-orange-400 to-red-500",
      accent: "text-orange-600",
      bg: "bg-orange-50",
      concept: "Use a life-sized cutout of Suma Garu placed next to the TDH rack to build familiarity, trust, and immediate recognition.",
      execution: [
        "Full-height standee positioned beside TDH product racks.",
        "Suma is holding or pointing toward Sunnundalu.",
        "Messaging panel: 'Suma’s Favourite Traditional Goodness – Now at Pure O Natural.'",
        "Co-branded footer: TDH × Pure O Natural.",
        "Rack visuals aligned with the cutout design to maintain consistency."
      ],
      purpose: [
        "Enhances brand legitimacy.",
        "Strengthens recall for walk-ins.",
        "Speeds up product identification inside a busy retail environment.",
        "Connects emotionally through a widely loved celebrity face."
      ]
    },
    {
      id: 2,
      title: "Jewellery-Style Glass Dome Display", 
      subtitle: "Premium Display",
      icon: <UtensilsCrossed size={40} />,
      color: "from-amber-300 to-yellow-500",
      accent: "text-amber-600",
      bg: "bg-amber-50",
      concept: "Showcase TDH items like Sunnundalu, Ribbon Pakodi, Millet Snacks in premium 'jewellery-style' displays. Each product sits inside a glass dome without a brand label to highlight texture, purity, and artisanal value.",
      execution: [
        "3–5 glass dome plates placed on the central flagship slab.",
        "Each dome features one product with its raw ingredients displayed.",
        "Ingredient and description card placed in front: 'From Telangana’s kitchens, crafted with purity.'",
        "Adds a curated, boutique presentation that aligns with Pure O Natural’s image."
      ],
      purpose: [
        "Creates a visual wow factor.",
        "Encourages trial through premium presentation.",
        "Differentiates TDH from conventional FMCG products.",
        "Communicates craftsmanship and authenticity."
      ]
    },
    {
      id: 3,
      title: "Shopping Cart Cards",
      subtitle: "Communication Nudges",
      icon: <ShoppingCart size={40} />,
      color: "from-emerald-400 to-green-600",
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
      concept: "Insert small message cards in every shopping cart and basket. Subtle communication nudges customers to consider TDH while they shop.",
      execution: [
        "Small cards placed on cart handles or inside baskets.",
        "Cards carry rotating statements like: 'Have you tried TDH’s famed Ribbon Pakodi?'",
        "Clean, co-branded minimal design to match store aesthetics.",
        "Cards are rotated weekly to keep messaging fresh and noticeable."
      ],
      purpose: [
        "Silent in-store persuasion throughout the customer’s journey.",
        "Triggers product recall without promoter involvement.",
        "Encourages basket-building behaviour.",
        "Drives awareness of multiple TDH categories."
      ]
    },
    {
      id: 4,
      title: "Store Entry Gate Display",
      subtitle: "Ambassador Installation",
      icon: <Store size={40} />,
      color: "from-blue-400 to-indigo-600",
      accent: "text-indigo-600",
      bg: "bg-indigo-50",
      concept: "A storefront visual installation featuring Suma Garu + TDH. Announces the TDH launch boldly at the main entry point.",
      execution: [
        "Cutout of Suma placed near the entrance with key TDH packs.",
        "A small pedestal or promo display with flagship SKUs placed beside it.",
        "Entry gate header message: 'Now at Pure O Natural – TDH Traditional Foods.'",
        "Clean, premium visual presentation that is noticeable but non-intrusive.",
        "Consistent creative identity across all 10 Phase-1 stores."
      ],
      purpose: [
        "Creates instant high visibility for walk-ins.",
        "Establishes the collaboration narrative at the very first touchpoint.",
        "Drives initial curiosity and footfall into the TDH rack.",
        "Reinforces TDH presence before customers begin shopping."
      ]
    }
  ];

  // --- 2. Communication Framework ---
  const communications = [
    {
      id: 1,
      title: "Brand Positioning & Voice",
      subtitle: "Core Identity",
      icon: <MessageSquareQuote size={40} />,
      color: "from-violet-400 to-purple-600",
      accent: "text-violet-600",
      bg: "bg-violet-50",
      concept: "Made in Tenali. Made for the World.",
      execution: [
        "Tone: Confident, Clean, Minimal + Shelf-first Readability.",
        "Anchor Statement: Reinforces brand presence consistently.",
        "Why it works: Simplifies brand recall in a collaboration context.",
        "Key Themes: Tradition meets Modern Purity."
      ],
      purpose: [
        "Establishes a strong, singular voice.",
        "Ensures consistent messaging across all touchpoints.",
        "Leverages the 'Made in Tenali' heritage."
      ]
    },
    {
      id: 2,
      title: "Shelf & Slab Messaging",
      subtitle: "On-Product Communication",
      icon: <Tag size={40} />,
      color: "from-teal-400 to-cyan-600",
      accent: "text-teal-600",
      bg: "bg-teal-50",
      concept: "Headline: Clean Bites. Clear Choices. / Better Bites. Better Living.",
      execution: [
        "Slab 1 (Sunnundalu): 'Protein Powered Goodness' | 'Where Taste Meets Wellness'",
        "Slab 2a (Millets): 'Rooted in Tradition. Ready in Minutes.' | 'Pure Ingredients. Honest Nutrition.'",
        "Slab 2b (Snacks): 'TDH’s Cleanest Creations' | 'A Better Way to Snack.'",
        "Slab 3 (Podis): 'Daily Nutrition Picks' | 'Your Daily Wellness'"
      ],
      purpose: [
        "Guides customer preference at the point of sale.",
        "Categorizes products by benefit (Protein, Tradition, Snacking).",
        "Reinforces the 'Clean Label' promise."
      ]
    },
    {
      id: 3,
      title: "Campaign & Social Media",
      subtitle: "Digital Narrative",
      icon: <Megaphone size={40} />,
      color: "from-pink-400 to-rose-600",
      accent: "text-pink-600",
      bg: "bg-pink-50",
      concept: "Primary Campaign Name: 'Purely TDH'",
      execution: [
        "Alternative Names: 'Now Pure Has TDH' | 'Tradition Meets Pure'",
        "Hashtags: #PurelyTDH #NowAtPureONatural",
        "Tagline options: 'Clean Food. Clear Choices.' | 'Eat Clean. Live Strong.'",
        "Call to Action: 'Available at Pure O Naturals'"
      ],
      purpose: [
        "Connects TDH’s clean-food positioning with Pure O Natural’s ethos.",
        "Short, premium, and easy for social media sharing.",
        "Instantly communicates availability."
      ]
    },
    {
      id: 4,
      title: "In-Store Signage",
      subtitle: "Touchpoint Messaging",
      icon: <MapPin size={40} />,
      color: "from-sky-400 to-blue-600",
      accent: "text-sky-600",
      bg: "bg-sky-50",
      concept: "Display Stand: 'Upgrade Your Grain Game - By TDH'",
      execution: [
        "Entry Sub-line: 'Ancient Nutrition for Modern Living'",
        "Tent Card Nudges: 'Pure Choices Start Here. Powered by TDH'",
        "Store Front: 'Daily Nutrition Picks - From the house of TDH'",
        "Pop-up Message: 'Now at Pure O Naturals — TDH’s Cleanest Creations.'"
      ],
      purpose: [
        "Attracts attention at high-traffic zones (Entry, Check-out).",
        "Frames the products as a lifestyle upgrade.",
        "Reinforces the collaboration at every physical touchpoint."
      ]
    }
  ];
  
  // --- 3. Activation Timeline ---
  const activities = [
    {
      id: 1,
      title: "Pre-Launch Preparations",
      subtitle: "Foundation & Hype (Week 0–1)",
      icon: <Clock size={40} />,
      color: "from-purple-400 to-indigo-600",
      accent: "text-indigo-600",
      bg: "bg-indigo-50",
      concept: "Focus on setting up the physical infrastructure, staff training, and generating early anticipation both in-store and digitally.",
      phase: "PRE-LAUNCH",
      tasks: [
          { task: "Rack Branding Preparation", execution: "20 TDH-branded racks prepared with category headers + LED lit tops; Flagship slab earmarked.", objective: "Visibility foundation." },
          { task: "Product Hierarchy Setup", execution: "Set category system: Prioritising categories slab (Rack) - wise products.", objective: "Proper categorisation + highlight." },
          { task: "Teaser POS Materials", execution: "Teaser 'Tradition arriving soon' posters in all 10 stores.", objective: "Curiosity before launch." },
          { task: "Shelf Placeholders", execution: "Block shelf space with mock placeholders & 'Coming Soon: TDH Sunnundalu' (OR TDH).", objective: "Anticipation + brand spotlight." },
          { task: "Store Staff Training", execution: "10-store staff trained on TDH story, how to push Sunnundalu, upsell packs.", objective: "Internal advocacy boosts conversions." },
          { task: "Pre-Launch Social Media", execution: "5 Co-branded posts: Countdown, Sunnundalu heritage story.", objective: "Digital expectation." },
          { task: "Influencer Promotion", execution: "A small bite videos from hyper local influencer to gain traction and Promo Code for discount and which enables us to track sales from influencer campaigns.", objective: "Micro Influencers + Campaign ROI tracking." },
      ]
    },
    {
      id: 2,
      title: "Launch Activities",
      subtitle: "The Big Reveal (Week 1–2)",
      icon: <TrendingUp size={40} />,
      color: "from-red-400 to-pink-600",
      accent: "text-red-600",
      bg: "bg-red-50",
      concept: "Executing the go-live strategy, driving immediate sales through premium presence, sampling, and attractive launch offers.",
      phase: "LAUNCH",
      tasks: [
          { task: "Full Rack Installation", execution: "All 20 racks installed → Slab 1 fully stacked with Sunnundalu; Snacks placed near checkout.", objective: "Premium presence." },
          { task: "Impulse Checkout Setup", execution: "Mini-packs (₹20–₹40) set up at checkout.", objective: "High-frequency impulse triggers and sample distribution." },
          { task: "Launch Offer (14 Days)", execution: "Provide small discounts (10%, 20% on products purchased).", objective: "Pushes cross-category movement." },
          { task: "Launch Social Media", execution: "Mega reel from PON + TDH; 'Now Available Across 10 Stores' static; In-store video of sampling (Posting on their both socials).", objective: "Drive awareness & store visits." },
          { task: "Store front Pop-Ups", execution: "Micro pop-up near each store (Total: 10 pop-ups).", objective: "Converts walk-ins and Awareness of product availability." },
          { task: "QR & Food Recipes", execution: "QR tool directing website - food recipes page.", objective: "Website Awareness + Product utilization." },
          { task: "Shelf RoboTokinomo", execution: "Robot assisting device.", objective: "Attention Driven + Wow factor." },
      ]
    },
    {
      id: 3,
      title: "Post-Launch Growth",
      subtitle: "Sustaining Momentum (Week 2–4)",
      icon: <Target size={40} />,
      color: "from-green-400 to-teal-600",
      accent: "text-green-600",
      bg: "bg-green-50",
      concept: "Implementing strategies to encourage repeat purchases, broaden category discovery, and build long-term digital trust.",
      phase: "POST-LAUNCH",
      tasks: [
          { task: "Repeat Purchase Drivers", execution: "The ‘Product of the Week’ tag can be used to promote any new or emerging product categories (millets, savoury items, batters, pickles, etc.).", objective: "Sustained momentum." },
          { task: "In-Store A5 Tent Cards", execution: "Placed near vegetables 'Complete Your Healthy Basket with TDH Millets'.", objective: "Behavioural nudge at key zones." },
          { task: "Influencer Visits", execution: "1–2 local mom/health influencers do store walk-throughs.", objective: "High trust-building." },
          { task: "Post Launch Social Media", execution: "Store photos, customer reviews, (Eg - 'Why Sunnundalu is our flagship' carousel, walk-in reminder posts).", objective: "Extend visibility." },
          { task: "Google Maps + Discovery", execution: "Tag all 10 stores with: 'Now selling TDH Traditional Foods'.", objective: "Digital discovery." },
      ]
    },
    {
      id: 4,
      title: "Walk-In Strategy",
      subtitle: "Continuous Footfall Generation",
      icon: <MapPin size={40} />,
      color: "from-cyan-400 to-blue-600",
      accent: "text-blue-600",
      bg: "bg-cyan-50",
      concept: "Ongoing tactical efforts focused on converting digital and local awareness into physical store visits and purchases across all phases.",
      phase: "WALK-IN STRATEGY",
      tasks: [
          { task: "Flagship Slab as Footfall Magnet", execution: "Sunnundalu slab lit brighter + special tag 'Telugu's Favourite'.", objective: "Attraction to Walk-in pull." },
          { task: "Hyperlocal Digital Ads", execution: "2–3 km radius ads for each of the 10 stores.", objective: "Targeted walk-in push." },
          { task: "Neighbourhood Coupon Strategy", execution: "Print coupons given during sampling: 'Visit Pure O Natural to Redeem TDH Sunnundalu Offer'.", objective: "Offline to store footfall." },
          { task: "Seasonal Call-Outs", execution: "Sankranthi angle for Sunnundalu (cultural nudge).", objective: "Tap cultural buying pattern." },
      ]
    }
  ];

  const currentData = 
    activeTab === 'strategy' ? strategies : 
    activeTab === 'comms' ? communications : 
    activities;
  
  const activeItem = currentData.find(item => item.id === activeId);

  // Function to render content based on the active tab type
  const renderDetailContent = (item: any) => {
    if (activeTab === 'timeline') {
      const timelineItem = item as (typeof activities)[number];
      return (
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${timelineItem.bg}`}>
              <Clock size={20} className={timelineItem.accent} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{timelineItem.phase} Tasks</h3>
          </div>
          
          <div className="grid gap-6">
            {timelineItem.tasks.map((taskItem, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-indigo-50/30 hover:border-indigo-200 shadow-sm">
                <div className={`text-lg font-bold ${timelineItem.accent} mb-2 flex items-center gap-2`}>
                    <span className="text-slate-900">{taskItem.task}</span>
                </div>
                
                <div className="space-y-3 mt-4">
                  {/* Execution */}
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <p className="text-slate-600 leading-relaxed text-sm">
                        <span className="font-semibold text-slate-700">Execution:</span> {taskItem.execution}
                    </p>
                  </div>
                  {/* Objective */}
                  <div className="flex items-start gap-3">
                    <Target size={16} className={`flex-shrink-0 mt-0.5 ${timelineItem.accent}`} />
                    <p className="text-slate-600 leading-relaxed text-sm">
                        <span className="font-semibold text-slate-700">Objective:</span> {taskItem.objective}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } 
    
    // Default rendering for Creative Plan and Communication
    return (
      <div className="p-8 md:p-12 space-y-10">
        
        {/* Execution/Messaging Section */}
        <div className="animate-in slide-in-from-right-4 duration-500 delay-100">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${item.bg}`}>
              {activeTab === 'strategy' 
                ? <Layers size={20} className={item.accent} />
                : <MessageSquareQuote size={20} className={item.accent} />
              }
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {activeTab === 'strategy' ? 'Execution Plan' : 'Key Messaging & Tactics'}
            </h3>
          </div>
          
          <div className="grid gap-4">
            {item.execution.map((exec: string, idx: number) => (
              <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors group ${activeTab === 'strategy' ? 'hover:bg-emerald-50/30 hover:border-emerald-200' : 'hover:bg-violet-50/30 hover:border-violet-200'}`}>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold mt-0.5 transition-colors ${activeTab === 'strategy' ? 'group-hover:border-emerald-400 group-hover:text-emerald-600' : 'group-hover:border-violet-400 group-hover:text-violet-600'}`}>
                  {idx + 1}
                </span>
                <span className="text-slate-700 leading-relaxed font-medium">{exec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Purpose Section */}
        <div className="animate-in slide-in-from-right-4 duration-500 delay-200">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${activeTab === 'strategy' ? 'bg-emerald-100' : 'bg-violet-100'}`}>
              <CheckCircle2 size={20} className={activeTab === 'strategy' ? 'text-emerald-600' : 'text-violet-600'} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {activeTab === 'strategy' ? 'Strategic Purpose' : 'Why It Works'}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.purpose.map((purpose: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 shadow-sm ${activeTab === 'strategy' ? 'bg-emerald-500 shadow-emerald-200' : 'bg-violet-500 shadow-violet-200'}`} />
                <span className="text-slate-600 leading-relaxed text-sm md:text-base">{purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-100 pt-28">
      
      {/* Header */}
      <header className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200">
                Phase 1 Launch
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              TDH <span className="text-emerald-500 px-1">×</span> Pure O Natural
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Retail Strategy & Communication Canvas</p>
          </div>
          
          {/* Tab Switcher */}
          <div className="bg-slate-100 p-5 w-full  flex gap-10 shadow-inner flex flex-col md:flex-row lg:flex-row items-center rounded-full md:w-auto md:rounded-full lg:rounded-full">
            {/* Activation Timeline (First) */}
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'timeline' 
                  ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Clock size={16} />
              Activation Timeline
            </button>
            {/* Creative Plan (Second) */}
            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'strategy' 
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Layers size={16} />
              Creative Plan
            </button>
            {/* Communication (Last) */}
            <button
              onClick={() => setActiveTab('comms')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'comms' 
                  ? 'bg-white text-violet-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Megaphone size={16} />
              Communication
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {currentData.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-white border border-slate-200 transition-all duration-500
                ${activeId === item.id 
                  ? `ring-2 ring-offset-2 ${activeTab === 'strategy' ? 'ring-emerald-500' : activeTab === 'comms' ? 'ring-violet-500' : 'ring-indigo-500'} shadow-2xl scale-[0.98]` 
                  : 'hover:shadow-xl hover:-translate-y-1'
                }
                min-h-[380px] md:min-h-[340px] flex flex-col
              `}
            >
              {/* Dynamic Background Gradient */}
              <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${item.color} opacity-5 rounded-full blur-3xl -mr-20 -mt-20 transition-all duration-700 group-hover:opacity-15 group-hover:scale-110`} />
              
              <div className="flex-1 flex flex-col p-8 relative z-10">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${item.bg} ${item.accent} shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105`}>
                    {item.icon}
                  </div>
                  <div className={`w-10 h-10 rounded-full border border-slate-100 bg-white flex items-center justify-center text-slate-300 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900`}>
                    <ArrowRight size={18} className={`transition-transform duration-300 ${hoveredId === item.id ? 'translate-x-0.5' : ''}`} />
                  </div>
                </div>

                {/* Content Preview */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-widest ${item.accent} opacity-80`}>
                      {activeTab === 'strategy' ? 'Strategy' : activeTab === 'comms' ? 'Comms' : 'phase' in item ? item.phase : 'Timeline'} 0{item.id}
                    </span>
                    <div className={`h-px flex-grow bg-gradient-to-r ${item.color} opacity-20`}></div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1 leading-tight group-hover:opacity-80 transition-opacity">{item.title}</h2>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">{item.subtitle}</h3>
                  <p className="text-slate-600 line-clamp-3 leading-relaxed opacity-90 font-medium">
                    {item.concept}
                  </p>
                </div>

                {/* Footer Action */}
                <div className={`mt-6 flex items-center gap-2 text-sm font-bold ${activeTab === 'strategy' ? 'text-emerald-600' : activeTab === 'comms' ? 'text-violet-600' : 'text-indigo-600'} opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0`}>
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Detail Overlay/Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={() => setActiveId(null)}
          />

          {/* Modal Content */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative z-10 animate-in zoom-in-95 duration-300">
            
            {/* Left Panel - Visual/Header */}
            <div className={`relative w-full md:w-1/3 bg-gradient-to-br ${activeItem.color} p-8 md:p-10 flex flex-col justify-between text-white overflow-hidden shrink-0`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md text-white mb-8 shadow-inner border border-white/30">
                   {React.cloneElement(activeItem.icon, { size: 32 })}
                 </div>
                 <div className="space-y-2">
                   <span className="text-white/80 font-bold tracking-widest uppercase text-sm">
                     {activeTab === 'strategy' ? 'Creative Plan' : activeTab === 'comms' ? 'Communication' : ('phase' in activeItem ? activeItem.phase : 'Timeline')} 0{activeItem.id}
                   </span>
                   <h2 className="text-3xl md:text-4xl font-bold leading-tight">{activeItem.title}</h2>
                   <p className="text-white/90 font-medium text-lg mt-2">{activeItem.subtitle}</p>
                 </div>
              </div>

              <div className="relative z-10 mt-12">
                 <div className="h-1 w-12 bg-white/40 rounded-full mb-4"></div>
                 <p className="text-white/90 leading-relaxed font-light text-lg italic">
                   "{activeItem.concept}"
                 </p>
              </div>
            </div>

            {/* Right Panel - Details */}
            <div className="flex-1 bg-white overflow-y-auto relative">
              <button 
                onClick={() => setActiveId(null)}
                className="absolute top-1 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors z-20"
              >
                <X size={20} />
              </button>

              {renderDetailContent(activeItem)}

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TdhRetailStrategyCanvas;