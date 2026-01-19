import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, Package, Layout, Target, Info, FileText, CheckCircle2, ArrowRight
} from 'lucide-react';

const COLORS = ['#1d4ed8', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];

const TDHBrandsProductsToFocusOn = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Data for Category Priority
  const categoryData = [
    { name: 'Pulses & Dals', priority: 100, brand: 'Tenali Double Horse', status: 'Core Driver' },
    { name: 'Instant Mixes', priority: 90, brand: 'TDH Rishika', status: 'High Growth' },
    { name: 'Innovative Ladoos', priority: 85, brand: 'TDH Rishika', status: 'High Growth' },
    { name: 'Cashews/Dry Fruits', priority: 60, brand: 'TDH Foods', status: 'Premium/Gifting' },
    { name: 'Pickles', priority: 40, brand: 'TDH Foods', status: 'Cultural Demand' },
    { name: 'Millets', priority: 20, brand: 'TDH Millets', status: 'Soft Launch' },
  ];

  const revenueData = [
    { name: 'Urad Dal', value: 75 },
    { name: 'Other Dals', value: 15 },
    { name: 'Instant Mixes', value: 5 },
    { name: 'Sweets/Ladoos', value: 3 },
    { name: 'Others', value: 2 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Executive Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg text-white"><Package size={24}/></div>
                <div>
                  <p className="text-sm text-blue-600 font-semibold uppercase">Primary Engine</p>
                  <p className="text-xl font-bold text-slate-800">Urad Dal</p>
                </div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center space-x-4">
                <div className="bg-emerald-600 p-2 rounded-lg text-white"><TrendingUp size={24}/></div>
                <div>
                  <p className="text-sm text-emerald-600 font-semibold uppercase">Growth Horizon</p>
                  <p className="text-xl font-bold text-slate-800">Instant Mixes</p>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-center space-x-4">
                <div className="bg-amber-600 p-2 rounded-lg text-white"><Target size={24}/></div>
                <div>
                  <p className="text-sm text-amber-600 font-semibold uppercase">Hero Product</p>
                  <p className="text-xl font-bold text-slate-800">Protein Ladoos</p>
                </div>
              </div>
            </div>

            {/* Detailed Overview Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center mb-6">
                <FileText className="text-blue-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-slate-800">Strategic Overview</h2>
              </div>
              
              <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                <p className="leading-relaxed">
                  The <span className="font-bold text-slate-800">Tenali Double Horse Group</span> is primarily driven by Tenali Double Horse Pulses & Dals, with <span className="text-blue-600 font-semibold">urad dal accounting for the majority of revenue</span>. The product enjoys strong availability across general trade, which supports brand awareness and reinforces its position as the core revenue driver. This category should continue to be strengthened through consistent quality, trusted pricing, and potential value-added SKUs.
                </p>

                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Focus on TDH Rishika</h3>
                  <p className="mb-4">
                    Certain categories present higher growth potential. <span className="font-semibold text-slate-800">Instant mixes</span> (idly and dosa) represent a high-priority category extension. Currently, awareness is primarily restricted to select e-commerce and modern trade channels. Leveraging the strong recognition of Tenali Double Horse urad dal, Instant mixes can act as category extensions, reinforcing consumer trust.
                  </p>
                  <p>
                    Similarly, <span className="font-semibold text-slate-800">TDH Rishika Sunnundalu</span> (ladoos) are recognized in certain circles; however, product innovation can further enhance brand leverage. These products should be pushed aggressively to increase visibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center"><CheckCircle2 className="text-emerald-500 mr-2" size={18}/> Why Aggressive Push?</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start"><ArrowRight size={14} className="mt-1 mr-2 text-blue-500 shrink-0"/> Use existing brand equity of Pulses & Dals.</li>
                      <li className="flex items-start"><ArrowRight size={14} className="mt-1 mr-2 text-blue-500 shrink-0"/> Increase awareness beyond E-commerce to General Trade.</li>
                      <li className="flex items-start"><ArrowRight size={14} className="mt-1 mr-2 text-blue-500 shrink-0"/> Innovative ladoos attract younger/health-conscious segments.</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center"><Info className="text-amber-500 mr-2" size={18}/> Market Monitoring</h4>
                    <p className="text-sm italic">
                      TDH Millets has only had a soft launch with low penetration. It is too early for deep market understanding; this brand should be monitored for future opportunities as the supply chain improves.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Roadmap Component */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Layout className="mr-2 text-blue-600" size={20}/> 
                Transition to General Trade (GT)
              </h3>
              <div className="relative border-l-2 border-blue-200 ml-4 pl-8 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 bg-blue-600 w-4 h-4 rounded-full border-4 border-white"></div>
                  <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Phase 1: Brand Leverage</h4>
                  <p className="text-slate-600">Capitalize on the "Urad Dal Trust." Position TDH Rishika Instant Mixes as natural extensions.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 bg-emerald-500 w-4 h-4 rounded-full border-4 border-white"></div>
                  <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Phase 2: Distribution Push</h4>
                  <p className="text-slate-600">Move TDH Rishika beyond Modern Trade. Penetrate Tier 2 & 3 GT using the existing Dal supply chain.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analysis':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Category Priority Matrix</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="priority" name="Priority Score" radius={[0, 4, 4, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.priority > 80 ? '#1d4ed8' : entry.priority > 50 ? '#f59e0b' : '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Anchor Distribution</h3>
              <div className="h-64 flex flex-col md:flex-row items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full md:w-48 space-y-2 mt-4 md:mt-0">
                   {revenueData.map((entry, index) => (
                     <div key={index} className="flex items-center text-xs text-slate-600">
                       <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                       <span className="flex-1">{entry.name}</span>
                       <span className="font-bold">{entry.value}%</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Brand & Category</th>
                    <th className="px-6 py-4">Focus & Strategy</th>
                    <th className="px-6 py-4">Priority</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-800">TDH Pulses & Dals</span>
                      <span className="text-xs text-slate-500">Core Urad Dal Range</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Revenue anchor. Explore value-added SKUs and maintain distribution dominance.</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold uppercase">High</span></td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-800">TDH Rishika</span>
                      <span className="text-xs text-slate-500">Instant Mixes (Idly/Dosa)</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-blue-600 font-medium">Aggressive General Trade push. Leverage brand equity of the Dal range.</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold uppercase">High</span></td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-800">TDH Rishika</span>
                      <span className="text-xs text-slate-500">Innovative Ladoos</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Product innovation (Protein/Health) as hero differentiator for Gen-Z.</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold uppercase">High</span></td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-800">TDH Foods</span>
                      <span className="text-xs text-slate-500">Pickles</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Strong cultural demand; immediate market push recommended.</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-bold uppercase">Low-Mid</span></td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors opacity-60">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-slate-800 italic">TDH Millets</span>
                      <span className="text-xs text-slate-500 italic">Millet Grains/Snacks</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Soft launch monitoring. Hold off on mass marketing until readiness.</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-xs font-bold uppercase">Watch</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">TDH Strategic Report</h1>
            <p className="text-slate-500 font-medium">Brand Evolution & Distribution Roadmap 2024-25</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'analysis', label: 'Analysis', icon: TrendingUp },
              { id: 'products', label: 'Product Strategy', icon: Layout }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        {renderTabContent()}

        {/* Footer Insight Box */}
        <div className="mt-8 bg-slate-900 text-slate-300 p-6 rounded-2xl shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500/20 p-2 rounded-lg"><Info className="text-blue-400" size={24}/></div>
            <div>
              <h4 className="text-white font-bold mb-1">Final Summary</h4>
              <p className="text-sm leading-relaxed">
                The group must transition from being a single-category leader (Pulses) to a multi-category house of brands. The bridge is the <span className="text-blue-400 font-semibold">Urad Dal quality</span>. By aggressively pushing TDH Rishika Instant Mixes and Innovative Ladoos into General Trade, the brand can capture higher margins and modern consumer segments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TDHBrandsProductsToFocusOn;