import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import { 
  LayoutDashboard, ShoppingBag, Leaf, Zap, Award, 
  Map, TrendingUp, AlertTriangle, Lightbulb, ChevronRight,
  Search, Bell, Filter, Download, Heart, ShieldCheck, Tag
} from 'lucide-react';

const TDHConsumerPreferenceAnalysis = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [hoveredMetric, setHoveredMetric] = useState(null);

  // Core Data Structure
  const categories = {
    "Pulses & Dals": {
      size: 38,
      unit: "M MT",
      trend: "+2.4%",
      preference: { price: 60, quality: 30, trust: 10 },
      prefLabel: "Price & Quality Driven",
      opportunity: "Organic/Branded",
      regional: { ap: "Rural Price-Sensitive", tg: "Urban Branded" },
      color: "#6366f1"
    },
    "Millets": {
      size: 11.6,
      unit: "USD B",
      trend: "+12.8%",
      preference: { nutrition: 70, convenience: 20, taste: 10 },
      prefLabel: "Health & Nutrition Focused",
      opportunity: "Convenience Formats",
      regional: { ap: "Traditional Use", tg: "High Urban Adoption" },
      color: "#10b981"
    },
    "Pickles": {
      size: 0.6,
      unit: "USD B",
      trend: "+5.1%",
      preference: { taste: 80, regional: 15, organic: 5 },
      prefLabel: "Authentic Taste Priority",
      opportunity: "Clean-label Variants",
      regional: { ap: "Staple Side-dish", tg: "Regional Flavors" },
      color: "#f59e0b"
    },
    "Healthy Snacks": {
      size: 8.8,
      unit: "USD B",
      trend: "+15.2%",
      preference: { nutrition: 50, taste: 30, brand: 20 },
      prefLabel: "Clean-label Snacking",
      opportunity: "Millet Cookies/Pasta",
      regional: { ap: "Emerging Niche", tg: "Urban Health Hubs" },
      color: "#ec4899"
    }
  };

  const chartData = useMemo(() => Object.entries(categories).map(([name, data]) => ({
    name,
    value: data.size,
    color: data.color,
  })), []);

  const pieData = useMemo(() => Object.entries(categories).map(([name, data]) => ({
    name,
    value: data.size,
    color: data.color
  })), []);

  // ❗ FIXED: TabButton Props
  const TabButton = (props:any) => {
    const Icon = props.icon;
    const name = props.name;
    return (
      <button
        onClick={() => setActiveTab(name)}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 ${
          activeTab === name 
            ? 'bg-white shadow-lg text-indigo-600 scale-105' 
            : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        <Icon size={18} />
        {name}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100 pb-12">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-indigo-200 shadow-lg">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            MARKET PULSE 2026
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search data points..." 
              className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-all w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
            <Download size={16} /> Export Report
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-black mb-2 text-slate-800 tracking-tight">Consumer Preference Insights</h2>
          <p className="text-slate-500 flex items-center gap-2 font-medium">
            <Map size={16} className="text-indigo-500" /> Granular Demand Analysis across India & Regional Hubs
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-2xl w-fit">
          <TabButton name="Overview" icon={TrendingUp} />
          <TabButton name="Market Size" icon={ShoppingBag} />
          <TabButton name="Regional Split" icon={Map} />
          <TabButton name="Strategy" icon={Lightbulb} />
        </div>

        {/* Animated Content Wrapper */}
        <div className="transition-all duration-500">
          {/* ---------------- OVERVIEW TAB ---------------- */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4">
              
              {Object.entries(categories).map(([name, data]) => (
                <div 
                  key={name}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
                >
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div 
                      className="p-3 rounded-2xl group-hover:rotate-6 transition-transform"
                      style={{ backgroundColor: `${data.color}15`, color: data.color }}
                    >
                      {name === 'Pulses & Dals' ? <ShoppingBag size={24} /> : 
                       name === 'Millets' ? <Leaf size={24} /> : 
                       name === 'Pickles' ? <Zap size={24} /> : <Award size={24} />}
                    </div>
                    <span className="text-xs font-black px-2 py-1 rounded bg-green-100 text-green-600">
                      {data.trend}
                    </span>
                  </div>

                  <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1 relative z-10">{name}</h3>
                  <p className="text-2xl font-black text-slate-800 mb-4">{data.size} <span className="text-sm font-normal text-slate-400">{data.unit.split(' ')[0]}</span></p>
                  
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <Heart size={14} className="text-red-500" />
                      {data.prefLabel}
                    </div>
                    
                    <div className="space-y-1.5">
                      {Object.entries(data.preference).map(([label, val]) => (
                        <div key={label} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                            <span>{label}</span>
                            <span>{val}%</span>
                          </div>
                          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-1000"
                              style={{ width: `${val}%`, backgroundColor: data.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="lg:col-span-3 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xl font-black flex items-center gap-2 text-slate-800">
                    <TrendingUp className="text-indigo-500" /> Sector Growth Velocity
                  </h3>
                  <div className="flex gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Market Value</span>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '16px' }} />
                      <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                <div>
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Zap className="text-amber-400" size={20} /> Regional Insight
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    Telangana is seeing a <span className="text-white font-bold">40% spike</span> in millet-based RTC (Ready-to-Cook) products over traditional grains in urban clusters.
                  </p>
                </div>
                <div className="mt-8 bg-white/5 p-5 rounded-[2rem] border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase text-slate-500">Urban Preference Index</span>
                    <span className="text-xs font-black text-amber-400">High Demand</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} className={`flex-1 rounded-full ${i < 7 ? 'bg-amber-400' : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ---------------- MARKET SIZE TAB ---------------- */}
          {activeTab === 'Market Size' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in zoom-in-95">
          
              {/* Pie Chart Section */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black mb-2">Market Composition</h3>
                <p className="text-sm text-slate-400 mb-8 font-medium">Share of Market Potential by Value (USD B)</p>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={140}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{paddingTop: '20px', fontWeight: 'bold'}} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart Section */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
                <h3 className="text-xl font-black mb-2">Market Size Delta</h3>
                <p className="text-sm text-slate-400 mb-8 font-medium">Relative Scale Comparison</p>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{fill: '#64748b', fontWeight: 800, fontSize: 11}} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="value" radius={[0, 20, 20, 0]} barSize={40}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldCheck className="text-indigo-500" size={18} />
                    <span className="font-black text-slate-800 uppercase text-xs">Stability Index</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Pulses maintain the highest stability due to their role as a primary protein source in Indian diets, while Millets show the highest growth elasticity.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ---------------- REGIONAL SPLIT ---------------- */}
          {activeTab === 'Regional Split' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-left-8">
              {Object.entries(categories).map(([name, data]) => (
                <div key={name} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                  <div 
                    className="absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 transition-all group-hover:scale-150" 
                    style={{ backgroundColor: data.color }} 
                  />
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: data.color }} />
                    <h3 className="text-xl font-black tracking-tight">{name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors">
                      <div className="flex items-center gap-1.5 mb-2 text-indigo-600">
                        <MapPin size={14} fill="currentColor" />
                        <span className="text-[10px] uppercase font-black tracking-widest">Andhra Pradesh</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{data.regional.ap}</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-violet-200 transition-colors">
                      <div className="flex items-center gap-1.5 mb-2 text-violet-600">
                        <MapPin size={14} fill="currentColor" />
                        <span className="text-[10px] uppercase font-black tracking-widest">Telangana</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{data.regional.tg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---------------- STRATEGY ---------------- */}
          {activeTab === 'Strategy' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border-b-8 border-indigo-500 shadow-xl hover:-translate-y-2 transition-transform">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-6 shadow-inner">
                    <Tag size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3">Premium Branding</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                    Shift toward "Origin-Specific" and "Clean-Label" pulses to capture the premium segment in Hyderabad & Vizag.
                  </p>
                  <button className="text-indigo-600 text-sm font-black flex items-center gap-1 group">
                    Roadmap Details <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="bg-white p-8 rounded-[2.5rem] border-b-8 border-emerald-500 shadow-xl hover:-translate-y-2 transition-transform">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 shadow-inner">
                    <ShieldCheck size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3">Nutrition Value-Add</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                    Introduce fortification in millet products to address the urban health segment's demand for high-protein grains.
                  </p>
                  <button className="text-emerald-600 text-sm font-black flex items-center gap-1 group">
                    Product Pipeline <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border-b-8 border-amber-500 shadow-xl hover:-translate-y-2 transition-transform">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-6 shadow-inner">
                    <Zap size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3">RTC Aggression</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                    Aggressive push into Ready-to-Cook regional flavors to compete with the unorganized local pickle & snack market.
                  </p>
                  <button className="text-amber-600 text-sm font-black flex items-center gap-1 group">
                    GTM Strategy <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row gap-8 items-center justify-between overflow-hidden relative shadow-3xl">
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="max-w-xl z-10">
                  <h3 className="text-4xl font-black mb-6 tracking-tight leading-tight">Master the Consumer Preference Shift</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">
                    Our analysis indicates that <span className="text-white font-bold">Price</span> is no longer the sole driver in urban TG/AP. 
                    Trust and Quality are now significant tie-breakers for branded staples.
                  </p>
                </div>
                <div className="z-10 shrink-0 flex flex-col gap-4">
                  <button className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black shadow-2xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95">
                    Request Full Report
                  </button>
                  <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Available Jan 2026</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// ❗ FIXED: MapPin Component
const MapPin = (props:any) => {
  const size = props.size;
  const fill = props.fill;
  const className = props.className;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
};

export default TDHConsumerPreferenceAnalysis;
