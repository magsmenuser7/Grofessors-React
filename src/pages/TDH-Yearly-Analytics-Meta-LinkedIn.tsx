import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  TrendingUp, 
  Users, 
  Eye, 
  ThumbsUp, 
  Target, 
  ChevronRight,
  AlertCircle,
  MapPin
} from 'lucide-react';

const TdhYearlyAnalysis = () => {
  const [activeTab, setActiveTab] = useState('meta');

  const COLORS = {
    meta: '#0668E1',
    instagram: '#E4405F',
    linkedin: '#0A66C2',
    accent: '#FFD700',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const metaData = {
    genderData: [
      { name: 'Men', value: 70.2 },
      { name: 'Women', value: 29.8 },
    ]
  };

  const linkedinData = {
    topCities: [
      { name: 'Delhi', value: 18.4 },
      { name: 'Bengaluru', value: 9.6 },
      { name: 'Vijayawada', value: 7.5 },
      { name: 'Mumbai', value: 6.7 },
      { name: 'Tenali', value: 3.4 },
    ]
  };

  const StatCard = (props: any) => {
    const Icon = props.icon;
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${props.color}1A`, color: props.color }}>
            <Icon size={24} />
          </div>
          {props.trend && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${props.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {props.trend}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{props.title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{props.value}</p>
          {props.subtext && <p className="text-xs text-gray-400 mt-1">{props.subtext}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">TDH</div>
              <h1 className="text-xl font-bold tracking-tight">2025 Yearly Analytics</h1>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('meta')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'meta' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Facebook size={16} /> Meta Ecosystem
              </button>
              <button 
                onClick={() => setActiveTab('linkedin')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'linkedin' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Linkedin size={16} /> LinkedIn Professional
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'meta' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total FB Views" value="485.2M" icon={Eye} trend="+5.9K%" subtext="99.9% Ad-driven" color={COLORS.meta} />
              <StatCard title="Instagram Reach" value="75.3M" icon={Target} trend="+193.8%" subtext="Scale significantly expanded" color={COLORS.instagram} />
              <StatCard title="IG Interactions" value="105.6K" icon={ThumbsUp} trend="+100%" subtext="Engagement growth" color={COLORS.instagram} />
              <StatCard title="FB Watch Time" value="81 Days" icon={TrendingUp} trend="+6.8K%" subtext="Cumulative video consumption" color={COLORS.meta} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                   <AlertCircle size={20} className="text-amber-500" /> Reliance on Paid Ads (Facebook)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Organic', value: 386163 },
                      { name: 'Paid Ads', value: 484774398 }
                    ]} layout="vertical" margin={{ left: 20, right: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => value?.toLocaleString()} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        <Cell fill="#94a3b8" />
                        <Cell fill={COLORS.meta} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-500 mt-4 italic text-center">
                  Notice: Organic reach accounts for only 0.1% of total visibility.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6">Audience Demographic (IG)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={metaData.genderData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        <Cell fill={COLORS.meta} />
                        <Cell fill={COLORS.instagram} />
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Meta Strategy 2026</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-white/20 p-2 rounded-lg h-fit"><Users size={20} /></div>
                    <div>
                      <h4 className="font-bold">Balance Gender Reach</h4>
                      <p className="text-blue-100 text-sm">Launch campaigns targeting the 29.8% female segment.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold mb-2 text-amber-300 flex items-center gap-2">
                    <AlertCircle size={18} /> Retention Alert
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Total unfollows on IG hit 3,678. More MOFU content needed to retain reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Impressions" value="20,083" icon={Eye} subtext="Jan - Dec 2025" color={COLORS.linkedin} />
              <StatCard title="Engagement Rate" value="10.3%" icon={TrendingUp} subtext="Industry Leading" color={COLORS.success} />
              <StatCard title="New Followers" value="+355" icon={Users} subtext="Quality growth" color={COLORS.linkedin} />
              <StatCard title="Total Interactions" value="853" icon={ThumbsUp} subtext="Reactions & Comments" color={COLORS.accent} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6">LinkedIn Visibility Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { month: 'Jan', imp: 1200 },
                      { month: 'Mar', imp: 1800 },
                      { month: 'Jun', imp: 2400 },
                      { month: 'Sep', imp: 2100 },
                      { month: 'Dec', imp: 3500 },
                    ]}>
                      <defs>
                        <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={COLORS.linkedin} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={COLORS.linkedin} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" />
                      <YAxis hide />
                      <Tooltip formatter={(value) => value?.toLocaleString()} />
                      <Area type="monotone" dataKey="imp" stroke={COLORS.linkedin} strokeWidth={3} fillOpacity={1} fill="url(#colorImp)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                   <MapPin size={20} className="text-red-500" /> Geographic Footprint
                </h3>
                <div className="space-y-5">
                  {linkedinData.topCities.map((city, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm font-medium">
                        <span>{city.name}</span>
                        <span className="text-gray-500">{city.value}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full"
                          style={{ width: `${(city.value / 18.4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        <footer className="mt-12 text-center text-gray-400 text-xs py-8 border-t">
          <p>© 2026 Tenali Double Horse Analytics. Data sourced from Internal 2025 Performance Reports.</p>
        </footer>
      </main>
    </div>
  );
};

export default TdhYearlyAnalysis;
