import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import { 
  ShoppingBag, Star, Users, TrendingUp, AlertCircle, Phone, 
  Menu, X, ArrowUpRight, User, Shirt, UserCheck, Search, Filter, PieChart as PieChartIcon
} from 'lucide-react';

// --- DATA ---
const RAW_DATA = [
  {
    id: 1,
    phone: "8341977094",
    type: "ONE-TIME",
    division: "KIDS",
    purchase: 3798,
    date: "12/20/2025",
    ratings: { overall: 8, quality: 10, service: 7, environment: 9 },
    feedback: "Staff creating a compact atmosphere, overwhelming at entrance. Requested lift setup.",
    issue: "Staff too pushy/aggressive.",
    sentiment: "mixed"
  },
  {
    id: 2,
    phone: "9849620719",
    type: "REPEAT",
    division: "MENS",
    purchase: 7448,
    date: "1/17/2026",
    ratings: { overall: 10, quality: 8, service: 9, environment: 9 }, // inferred service/env average
    feedback: "Product quality can be improved. Needs more offers.",
    issue: null,
    sentiment: "positive"
  },
  {
    id: 3,
    phone: "7702797890",
    type: "REPEAT",
    division: "LADIES",
    purchase: 6197,
    date: "1/24/2026",
    ratings: { overall: 8.5, quality: 9, service: 10, environment: 10 }, // Averaged 8 or 9 to 8.5
    feedback: "Need more offers (discounts).",
    issue: null,
    sentiment: "positive"
  },
  {
    id: 4,
    phone: "9603133124",
    type: "ONE-TIME",
    division: "LADIES",
    purchase: 3408,
    date: "1/12/2026",
    ratings: { overall: 10, quality: 10, service: 9, environment: 9 }, // inferred
    feedback: "LADIES section excellent. GENTS section needs expansion/variety.",
    issue: null,
    sentiment: "positive"
  },
  {
    id: 5,
    phone: "9731465929",
    type: "REPEAT",
    division: "KIDS",
    purchase: 20557,
    date: "2/11/2026",
    ratings: { overall: 9, quality: 9, service: 9, environment: 9 }, // inferred
    feedback: "More variety in ladies particularly western wear. Strong Ladies & Kids sections.",
    issue: null,
    sentiment: "positive"
  }
];

const CALL_STATS = {
  totalCalled: 8,
  responded: 5,
  noClue: 3, // "Wives did shopping"
};

const INSIGHTS_SUMMARY = [
  { title: "Men's Section", desc: "Need more variety/stock", icon: <Shirt size={20} className="text-blue-400" /> },
  { title: "Promotional Offers", desc: "Current offers perceived as insufficient", icon: <TrendingUp size={20} className="text-green-400" /> },
  { title: "Staff Service", desc: "Need more breathing space (less aggressive)", icon: <UserCheck size={20} className="text-yellow-400" /> },
  { title: "Western Variety", desc: "Expand Ladies Western Wear collection", icon: <ShoppingBag size={20} className="text-purple-400" /> },
];

// --- COMPONENTS ---

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 shadow-lg ${className}`}>
    {children}
  </div>
);

const Metric = ({ label, value, subtext, icon, color }: { label: string; value: string | number; subtext?: string; icon: React.ReactNode; color: string }) => (
  <Card className="flex items-center space-x-4 group hover:-translate-y-1">
    <div className={`p-4 rounded-full bg-opacity-20 ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">{label}</p>
      <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  </Card>
);

const RatingBadge = ({ score }: { score: number }) => {
  let colorClass = "bg-red-500/20 text-red-400 border-red-500/50";
  if (score >= 9) colorClass = "bg-green-500/20 text-green-400 border-green-500/50";
  else if (score >= 7) colorClass = "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${colorClass}`}>
      {score}/10
    </span>
  );
};

const CustomerRow = ({ data }: { data: typeof RAW_DATA[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-0">
      <div 
        className="p-4 hover:bg-white/5 cursor-pointer transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="md:col-span-3 flex items-center space-x-3">
          <div className={`p-2 rounded-full ${data.type === 'REPEAT' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
            <User size={16} />
          </div>
          <div>
            <p className="text-white font-medium">{data.phone}</p>
            <p className="text-xs text-gray-500">{data.type}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs border border-gray-700">
            {data.division}
          </span>
        </div>

        <div className="md:col-span-2 text-white font-mono">
          ₹{data.purchase.toLocaleString()}
        </div>

        <div className="md:col-span-2 text-gray-400 text-sm">
          {data.date}
        </div>

        <div className="md:col-span-2 flex items-center justify-end space-x-2">
          <span className="text-sm text-gray-400 mr-2">Exp:</span>
          <RatingBadge score={data.ratings.overall} />
          {isExpanded ? <ArrowUpRight size={16} className="text-gray-500" /> : <ArrowUpRight size={16} className="text-gray-500 rotate-45" />}
        </div>
      </div>

      {isExpanded && (
        <div className="bg-gray-900/80 p-6 border-t border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-400 text-sm uppercase mb-3 font-semibold">Detailed Ratings</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Product Quality</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${data.ratings.quality * 10}%` }}></div>
                  </div>
                  <span className="text-white">{data.ratings.quality}/10</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Staff Service</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${data.ratings.service * 10}%` }}></div>
                  </div>
                  <span className="text-white">{data.ratings.service}/10</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Environment</span>
                  <div className="flex-1 mx-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500" style={{ width: `${data.ratings.environment * 10}%` }}></div>
                  </div>
                  <span className="text-white">{data.ratings.environment}/10</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-gray-400 text-sm uppercase mb-3 font-semibold">Feedback & Notes</h4>
              <div className="bg-black/40 p-3 rounded-lg border border-gray-700 mb-2">
                <p className="text-gray-300 text-sm italic">"{data.feedback}"</p>
              </div>
              {data.issue && (
                <div className="bg-red-900/20 p-3 rounded-lg border border-red-900/50 flex items-start space-x-2">
                  <AlertCircle size={16} className="text-red-400 mt-0.5" />
                  <p className="text-red-300 text-sm font-medium">{data.issue}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function LVLUPDashboard() {
  const [filter, setFilter] = useState('ALL');

  // --- DERIVED METRICS ---
  const filteredData = useMemo(() => {
    return filter === 'ALL' ? RAW_DATA : RAW_DATA.filter(d => d.division === filter);
  }, [filter]);

  const totalRevenue = useMemo(() => RAW_DATA.reduce((acc, curr) => acc + curr.purchase, 0), []);
  const avgRating = useMemo(() => (RAW_DATA.reduce((acc, curr) => acc + curr.ratings.overall, 0) / RAW_DATA.length).toFixed(1), []);
  const topSpender = useMemo(() => [...RAW_DATA].sort((a,b) => b.purchase - a.purchase)[0], []);

  // Chart Data Preparation
  const divisionData = [
    { name: 'Kids', value: RAW_DATA.filter(d => d.division === 'KIDS').length, fill: '#8b5cf6' }, // violet
    { name: 'Ladies', value: RAW_DATA.filter(d => d.division === 'LADIES').length, fill: '#ec4899' }, // pink
    { name: 'Mens', value: RAW_DATA.filter(d => d.division === 'MENS').length, fill: '#3b82f6' }, // blue
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500 selection:text-white pb-12">
      {/* --- HEADER --- */}
      <header className="bg-black/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">LVL UP <span className="text-purple-400">STORE</span></h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Customer Feedback Report</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="px-3 py-1 rounded-full bg-gray-900 border border-gray-700 text-xs text-gray-400">
              Report Date: Feb 2026
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* --- KPI SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric 
            label="Total Revenue" 
            value={`₹${totalRevenue.toLocaleString()}`} 
            subtext="From 5 analyzed receipts"
            icon={<ShoppingBag size={24} className="text-white" />}
            color="bg-emerald-500"
          />
          <Metric 
            label="Avg Experience" 
            value={`${avgRating}/10`} 
            subtext="High satisfaction rate"
            icon={<Star size={24} className="text-white" />}
            color="bg-yellow-500"
          />
          <Metric 
            label="Response Rate" 
            value={`${CALL_STATS.responded}/${CALL_STATS.totalCalled}`} 
            subtext="3 contacts were unaware"
            icon={<Phone size={24} className="text-white" />}
            color="bg-blue-500"
          />
          <Metric 
            label="Highest Sale" 
            value={`₹${topSpender.purchase.toLocaleString()}`} 
            subtext={`${topSpender.division} Division`}
            icon={<TrendingUp size={24} className="text-white" />}
            color="bg-purple-500"
          />
        </div>

        {/* --- CALL CONTEXT BANNER --- */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-1 border border-gray-700">
           <div className="bg-black/50 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="bg-gray-700 p-2 rounded-full">
                  <Users size={20} className="text-gray-300"/>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-200">Call Campaign Insight</h3>
                  <p className="text-sm text-gray-400">Out of 8 calls, 3 husbands were unaware of their wives' shopping activities.</p>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-[10px] uppercase text-gray-500">Dialed</div>
                </div>
                <div className="h-8 w-px bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">5</div>
                  <div className="text-[10px] uppercase text-gray-500">Valid Feedback</div>
                </div>
                <div className="h-8 w-px bg-gray-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">3</div>
                  <div className="text-[10px] uppercase text-gray-500">Unaware</div>
                </div>
              </div>
           </div>
        </div>

        {/* --- MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COL: CHARTS & SUMMARY */}
          <div className="lg:col-span-1 space-y-8">
            {/* Division Chart */}
            <Card className="h-80 flex flex-col">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <PieChartIcon size={18} className="mr-2 text-purple-400"/> Division Split
              </h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={divisionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {divisionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.5)" />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Strategic Feedback Summary */}
            <Card className="bg-gradient-to-b from-gray-900 to-black border-purple-500/20">
              <h3 className="text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Overall Feedback Highlights
              </h3>
              <div className="space-y-4">
                {INSIGHTS_SUMMARY.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT COL: CUSTOMER LIST */}
          <div className="lg:col-span-2">
            <Card className="h-full border-t-4 border-t-purple-500 min-h-[600px] flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <Users size={20} className="mr-2 text-purple-400"/> Detailed Customer Logs
                </h3>
                
                {/* Filters */}
                <div className="flex space-x-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
                  {['ALL', 'KIDS', 'MENS', 'LADIES'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        filter === f 
                          ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.4)]' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-0 divide-y divide-gray-800">
                 {/* Table Header */}
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-2 text-xs uppercase tracking-wider text-gray-500 font-semibold hidden md:grid">
                    <div className="md:col-span-3">Customer</div>
                    <div className="md:col-span-2">Division</div>
                    <div className="md:col-span-2">Spend</div>
                    <div className="md:col-span-2">Date</div>
                    <div className="md:col-span-2 text-right">Rating</div>
                 </div>

                 {filteredData.length > 0 ? (
                   filteredData.map((customer) => (
                     <CustomerRow key={customer.id} data={customer} />
                   ))
                 ) : (
                   <div className="p-12 text-center text-gray-500">
                     No data found for this filter.
                   </div>
                 )}
              </div>
            </Card>
          </div>
        </div>

        {/* --- FOOTER / GLOW EFFECT --- */}
        <div className="fixed bottom-0 left-0 w-full h-1 pointer-events-none bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-50 blur-sm"></div>
      </main>
    </div>
  );
}