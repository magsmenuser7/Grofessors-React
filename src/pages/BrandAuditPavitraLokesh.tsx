import React, { useState, useEffect } from 'react';
// Assume Tailwind CSS is available in the environment

// --- Data Definitions (from PDF content) ---
const SENTIMENT_DATA = {
    overallScore: 45,
    confidence: 'High (85%)',
    commercialViability: 3.5,
    currentAlert: { status: 'YELLOW ALERT', risk: 'Elevated Risk', color: 'bg-yellow-500', text: 'text-yellow-800' },
    recoveryTimeline: '3-5 years minimum',
    breakdown: {
        positive: 25,
        neutral: 30,
        negative: 45,
    },
    drivers: [
        { theme: "Relationship Controversy", weight: 60, desc: "Marriage to Naresh (4th), 'home-wrecker' and 'gold-digging' allegations." },
        { theme: "Online Trolling & Harassment", weight: 25, desc: "Cyber complaints against 15 YouTube channels, continuous trolling." },
        { theme: "Professional Impact", weight: 15, desc: "Sidelined from major projects, poor reception of 'Malli Pelli'." },
    ],
    platform: [
        { name: "Social Media", score: 40, tone: "Predominantly Negative", color: "red-500", detail: "Low following (19K), high trolling." },
        { name: "Discussion Forums", score: 35, tone: "Largely Satirical/Negative", color: "red-600", detail: "Focus on mockery and disbelief." },
        { name: "News Media Coverage", score: 50, tone: "Neutral to Negative", color: "yellow-600", detail: "Controversy dominates, but professional mentions exist." },
    ]
};

const TIMELINE_DATA = [
    { year: "2018-2021", title: "Positive-Neutral Stability", score: "65/100", details: "Respected supporting actress, steady career.", color: "green-500" },
    { year: "July 2022", title: "SHARP NEGATIVE TURN - CRISIS ALERT", score: "30/100", details: "Hotel incident public, massive trolling wave. Sentiment crash.", color: "red-600", pulse: true },
    { year: "Late 2022-2023", title: "Continued Negativity", score: "", details: "Legal battles, cyber complaints, 'Malli Pelli' release.", color: "red-400" },
    { year: "2024-2025 (Current)", title: "Stabilized but Still Negative", score: "40-45/100", details: "Controversy subsiding, focus on professional comeback attempts.", color: "yellow-500" },
];

const STRATEGY_DATA = {
    // These remain the primary structural items
    immediate: [
        "SILENCE PROTOCOL: Complete media blackout on personal life.",
        "Hire professional reputation management team.",
        "Digital Cleanup: Post only professional content.",
        "Focus on securing quality, smaller projects."
    ],
    medium: [
        "Reputation Rebuilding: Engage in charitable/social causes quietly.",
        "Media interviews focused only on craft and resilience.",
        "Target professional reset: Quality character roles, OTT platforms.",
        "Nurture existing fanbase with authentic, non-controversial content."
    ],
    longTerm: [
        "Position as 'survivor' and 'professional' veteran actress.",
        "Explore OTT dominance and production roles.",
        "Build legacy separate from controversy ('Nana Patekar Model').",
        "Consider selective, niche brand partnerships (women-focused)."
    ],
    // New data for the detailed plan view
    commPlan: {
        silenceProtocol: [
            "No interviews about Naresh or marriage.",
            "No responses to trolls or negative comments.",
            "No social media posts about personal life.",
            "Only film promotional content allowed."
        ],
        digitalCleanup: [
            "Remove/archive all controversial posts.",
            "Post professional content 2-3x/week.",
            "Engage only with positive comments.",
            "Systematically report and remove defamatory content (legal action done quietly)."
        ],
        mediaScript: "I'm focusing entirely on my craft. My work will speak for me. Thank you for understanding."
    },
    budget: {
        services: [
            { name: "Professional PR Agency", cost: "₹1-2 lakhs/month" },
            { name: "Social Media Manager", cost: "₹50K-75K/month" },
            { name: "Legal Retainer", cost: "₹50K-1 lakh/month" }
        ],
        totalMonthly: "₹2-4 lakhs/month",
        roi: "Year 2: ₹10-20 lakhs. Year 3+: ₹50 lakhs-1 crore annually."
    },
    worstCase: [
        "Naresh New Controversy (Mitigation: Public statement distancing professionally).",
        "Film Project Cancellation (Mitigation: Multiple projects in pipeline).",
        "Viral Negative Content (Mitigation: Legal action, counter-narrative with professional achievements).",
        "Health/Safety Threat (Mitigation: Police protection, full legal action)."
    ]
};

const KPI_GOALS = {
    sixMonth: [
        { metric: "Sentiment Score", current: "45/100", target: "55/100", strategy: "Professional work, silence on personal life" },
        { metric: "Instagram Followers", current: "19K", target: "50K", strategy: "Consistent quality content, engagement" },
        { metric: "Film Projects (Quality)", current: "2-3/year", target: "4-5/year", strategy: "Selective quality roles" },
        { metric: "Positive Media %", current: "25%", target: "50%", strategy: "Proactive PR, film promotions" },
        { metric: "Brand Inquiries", current: "0", target: "2-3", strategy: "Niche positioning, professional image" },
    ],
    twelveMonth: [
        { metric: "Sentiment Score", current: "45/100", target: "65/100", strategy: "Time + consistent professionalism" },
        { metric: "Instagram Followers", current: "19K", target: "100K", strategy: "Organic growth, quality content" },
        { metric: "Film Projects (Quality)", current: "2-3/year", target: "6-8/year", strategy: "Established reliability" },
        { metric: "Brand Endorsements", current: "0", target: "1-2", strategy: "Regional/niche brands" },
        { metric: "Industry Perception", current: "Controversial", target: "Professional", strategy: "Body of recent work" },
    ]
};

const COMPETITIVE_BENCHMARKING = [
    { actress: "Pavitra Lokesh", age: 45, films: "150+", social: "19K", endorsements: "0", controversy: "Major (2022)", score: "45/100", color: "text-red-600" },
    { actress: "Sarathkumar", age: 61, films: "200+", social: "1.2M", endorsements: "3-5", controversy: "None", score: "75/100", color: "text-green-600" },
    { actress: "Suhasini Maniratnam", age: 63, films: "250+", social: "580K", endorsements: "2-4", controversy: "None", score: "80/100", color: "text-green-600" },
    { actress: "Varalaxmi Sarathkumar", age: 38, films: "50+", social: "2.8M", endorsements: "5-8", controversy: "None", score: "70/100", color: "text-green-600" },
    { actress: "Nadia Moidu", age: 60, films: "80+", social: "450K", endorsements: "1-2", controversy: "None", score: "75/100", color: "text-green-600" },
];

const FORECAST_DATA = [
    { period: "6-Month Outlook", score: "50/100", detail: "Slight Improvement. If no new scandals, natural sentiment recovery.", color: "text-yellow-600", bg: "bg-yellow-50" },
    { period: "12-Month Outlook", score: "55-60/100", detail: "Cautious Recovery. Consistent professional work can shift narrative.", color: "text-green-600", bg: "bg-green-50" },
];

// --- Utility Components ---

const StatusIndicator = ({ status, risk, colorClass }: { status: string; risk: string; colorClass: string }) => (
    <div className={`p-4 rounded-xl shadow-md border ${colorClass.replace('bg-', 'border-')} ${colorClass.replace('bg-', 'text-')} bg-white`}>
        <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold p-1 px-2 rounded-full ${colorClass} text-white`}>{status}</span>
            <span className="text-3xl font-extrabold text-red-600">🚨</span>
        </div>
        <p className="text-2xl font-extrabold mt-2 text-gray-800">{risk}</p>
        <p className="text-sm text-gray-500 mt-1">Current Alert Level</p>
    </div>
);

type MetricCardProps = {
    title: string;
    value: string | number;
    unit?: string;
    subtext?: string;
    color?: string;
    icon?: React.ReactNode;
    trend?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, subtext, color = 'indigo', icon, trend }) => (
    <div className={`bg-white p-4 rounded-xl shadow-md border-b-4 border-${color}-500 transition-shadow hover:shadow-lg`}>
        <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-500 uppercase">{title}</p>
            <span className={`text-${color}-500 text-lg`}>{icon}</span>
        </div>
        <div className="flex items-end mt-1">
            <p className={`text-4xl font-extrabold text-gray-900`}>
                {value}
            </p>
            {unit && <span className="text-lg font-medium text-gray-600 ml-1 mb-1">{unit}</span>}
        </div>
        <div className="flex justify-between items-center text-xs mt-1">
             <p className="text-gray-500">{subtext}</p>
             {trend && <span className={`font-bold ${trend.includes('-') ? 'text-red-500' : 'text-green-500'}`}>{trend}</span>}
        </div>
    </div>
);

type PlatformBarProps = {
    name: string;
    score: number;
    color: string;
    detail: string;
};

const PlatformBar: React.FC<PlatformBarProps> = ({ name, score, color, detail }) => (
    <div className="p-3 bg-gray-50 rounded-lg shadow-inner mb-2 border border-gray-200 hover:shadow-md transition">
        <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">{name}</p>
            <span className={`font-bold text-sm text-${color}`}>{score}/100</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
            <div className={`h-full bg-${color.split('-')[0]}-400`} style={{ width: `${score}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{detail}</p>
    </div>
);

type SectionCardProps = {
    title: string;
    children: React.ReactNode;
    color?: string;
    className?: string;
};

const SectionCard: React.FC<SectionCardProps> = ({ title, children, color = 'border-indigo-600', className = '' }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${color} border-gray-100 ${className}`}>
        <h2 className="text-xl font-bold mb-6 text-gray-800">{title}</h2>
        {children}
    </div>
);

// --- View Components ---

type DashboardViewProps = {
    data: typeof SENTIMENT_DATA;
};
const DashboardView: React.FC<DashboardViewProps> = ({ data }) => (
    <div className="space-y-7">
        {/* KPI Row 1: Core Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
                title="Overall Sentiment Score" 
                value={data.overallScore} 
                unit="/100" 
                subtext="Mixed-to-Negative" 
                color="red"
                icon="💔"
                trend={`Confidence ${data.confidence}`}
            />
            <MetricCard 
                title="Commercial Viability" 
                value={data.commercialViability} 
                unit="/10" 
                subtext="Brand Endorsement Potential: Very Low" 
                color="orange"
                icon="💸"
                trend="-60% Value Drop"
            />
            <StatusIndicator 
                status={data.currentAlert.status} 
                risk={data.currentAlert.risk} 
                colorClass={data.currentAlert.color}
            />
        </div>

        {/* KPI Row 2: Sentiment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
                title="Negative Sentiment" 
                value={data.breakdown.negative} 
                unit="%" 
                subtext="Primary risk exposure" 
                color="red"
                icon="👎"
            />
            <MetricCard 
                title="Neutral Sentiment" 
                value={data.breakdown.neutral} 
                unit="%" 
                subtext="Potential to swing" 
                color="yellow"
                icon="😐"
            />
            <MetricCard 
                title="Positive Sentiment" 
                value={data.breakdown.positive} 
                unit="%" 
                subtext="Dedicated fanbase" 
                color="green"
                icon="👍"
            />
        </div>

        {/* Platform Breakdown Chart */}
        <SectionCard title="Sentiment Breakdown by Platform" color="border-purple-500" className="lg:col-span-3">
            <div className="grid md:grid-cols-3 gap-4">
                {data.platform.map((p, i) => (
                    <PlatformBar key={i} name={p.name} score={p.score} color={p.color} detail={p.detail} />
                ))}
            </div>
        </SectionCard>
    </div>
);

type DriversViewProps = {
    data: typeof SENTIMENT_DATA;
};
const DriversView: React.FC<DriversViewProps> = ({ data }) => (
    <div className="space-y-6">
        <SectionCard title="Key Negative Sentiment Drivers" color="border-red-500">
            <div className="grid md:grid-cols-3 gap-4">
                {data.drivers.map((driver, i) => (
                    <div key={i} className="p-4 bg-red-50 rounded-lg shadow-sm border border-red-200 hover:shadow-md transition">
                        <p className="font-extrabold text-3xl text-red-600 mb-1">{driver.weight}%</p>
                        <p className="font-semibold text-lg text-gray-800">{driver.theme}</p>
                        <p className="text-sm text-gray-600 mt-1">{driver.desc}</p>
                    </div>
                ))}
            </div>
        </SectionCard>
        
        <SectionCard title="Key Positive/Neutral Sentiment Factors" color="border-green-500">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg shadow-sm border border-green-200">
                    <p className="font-bold text-green-700 mb-2">Professional Credentials</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-4">
                        <li>150+ films in Kannada, Telugu, Tamil cinema</li>
                        <li>Daughter of veteran actor Mysore Lokesh</li>
                        <li>Recognized for strong supporting/character roles</li>
                        <li>Natural acting ability acknowledged</li>
                    </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg shadow-sm border border-green-200">
                    <p className="font-bold text-green-700 mb-2">Resilience & Support System</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-4">
                        <li>Spoke openly about suicidal thoughts/mental health</li>
                        <li>Defended independence: "Never asked Naresh for money"</li>
                        <li>Husband Naresh's public defense of her character</li>
                        <li>Standing up against trolls through legal action</li>
                    </ul>
                </div>
            </div>
        </SectionCard>
    </div>
);

type TimelineItem = {
    year: string;
    title: string;
    score: string;
    details: string;
    color: string;
    pulse?: boolean;
};

type TimelineViewProps = {
    data: TimelineItem[];
};

const TimelineView: React.FC<TimelineViewProps> = ({ data }) => (
    <SectionCard title="Sentiment Trend Analysis: Timeline of Crisis" color="border-yellow-500">
        <div className="relative pl-8">
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 rounded-full"></div>

            <div className="space-y-10">
                {data.map((item, i) => (
                    <div key={i} className="relative">
                        <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full border-4 border-white ${item.pulse ? 'bg-red-600 animate-pulse' : 'bg-' + item.color}`}></div>
                        
                        <p className="text-sm text-gray-500 font-semibold mb-1 ml-4">{item.year}</p>
                        <h3 className={`text-lg font-bold ml-4 ${item.pulse ? 'text-red-700 text-xl' : 'text-gray-800'}`}>
                            {item.title} {item.score && <span className="text-base font-normal">({item.score})</span>}
                        </h3>
                        <p className="text-gray-600 text-sm ml-4">{item.details}</p>
                    </div>
                ))}
            </div>
        </div>
    </SectionCard>
);

type ActionPlanTabProps = {
    title: string;
    items: string[];
    color?: string;
};

const ActionPlanTab: React.FC<ActionPlanTabProps> = ({ title, items, color = 'indigo' }) => (
    <div className={`p-4 bg-white rounded-lg shadow-sm border border-${color}-200`}>
        <h3 className={`text-xl font-bold mb-3 text-${color}-700 border-b border-${color}-100 pb-2`}>{title}</h3>
        <ul className="text-sm space-y-2 list-disc pl-5 text-gray-700">
            {items.map((item, i) => <li key={i} className="leading-relaxed">{item}</li>)}
        </ul>
    </div>
);

type StrategyViewProps = {
    data: typeof STRATEGY_DATA;
};

const StrategyView: React.FC<StrategyViewProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState('timeline');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'timeline':
                return (
                    <div className="grid md:grid-cols-3 gap-4">
                        <ActionPlanTab title="Immediate Actions (0-3 Months)" items={data.immediate} color="red" />
                        <ActionPlanTab title="Medium-Term Strategy (3-12 Months)" items={data.medium} color="yellow" />
                        <ActionPlanTab title="Long-Term Vision (12+ Months)" items={data.longTerm} color="green" />
                    </div>
                );
            case 'commPlan':
                return (
                    <div className="space-y-6">
                        <SectionCard title="Crisis Communication & Digital Cleanup" color="border-red-500" className="space-y-4">
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Silence Protocol (Immediate Action)</h4>
                                <ul className="list-disc list-inside text-sm text-gray-700 pl-4 space-y-1 bg-red-50 p-3 rounded-lg border border-red-200">
                                    {data.commPlan.silenceProtocol.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 mb-2">Digital Presence Strategy</h4>
                                <ul className="list-disc list-inside text-sm text-gray-700 pl-4 space-y-1 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                    {data.commPlan.digitalCleanup.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-600">Script for Media:</h4>
                                <p className="italic text-gray-800">"{data.commPlan.mediaScript}"</p>
                            </div>
                        </SectionCard>
                        <SectionCard title="Worst-Case Scenarios & Mitigation" color="border-orange-500">
                            <ul className="list-disc list-inside text-sm text-gray-700 pl-4 space-y-2">
                                {data.worstCase.map((item, i) => <li key={i} className="font-semibold">{item}</li>)}
                            </ul>
                        </SectionCard>
                    </div>
                );
            case 'budget':
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <SectionCard title="Budget & Resource Allocation" color="border-green-500">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">Essential Services (Monthly)</h4>
                            <table className="w-full text-left text-sm mb-4 border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-600">
                                        <th className="p-2">Service</th>
                                        <th className="p-2">Cost (Estimate)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {data.budget.services.map((s, i) => (
                                        <tr key={i} className="hover:bg-green-50">
                                            <td className="p-2 font-medium">{s.name}</td>
                                            <td className="p-2 text-gray-600">{s.cost}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-green-100 font-bold text-green-800">
                                        <td className="p-2">Total Monthly Investment:</td>
                                        <td className="p-2">{data.budget.totalMonthly}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h4 className="text-lg font-bold text-gray-800 mb-2 mt-4">ROI Expectation</h4>
                            <p className="text-base text-gray-700 bg-green-50 p-3 rounded-lg">{data.budget.roi}</p>
                        </SectionCard>

                        <SectionCard title="Success Definition & Model" color="border-gray-500">
                            <p className="text-lg font-semibold text-gray-700 mb-2">New Success Definition:</p>
                            <p className="text-base text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">"Become respected veteran character artist despite controversy." Focus: Craft over celebrity, longevity over fame.</p>
                            
                            <p className="text-lg font-semibold text-gray-700 mb-2">Inspiration Model: Nana Patekar Model</p>
                            <p className="text-base text-gray-600">Veteran actor with personal controversies who built respect purely through acting excellence, selective roles, and high industry respect.</p>
                        </SectionCard>
                    </div>
                );
            default:
                return null;
        }
    };

    const tabButtonClass = (tab: string) => 
        `px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-150 ${
            activeTab === tab
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`;

    return (
        <SectionCard title="Strategic Implementation Plan" color="border-indigo-600">
            <div className="mb-6 flex space-x-2 border-b border-gray-200 pb-1">
                <button className={tabButtonClass('timeline')} onClick={() => setActiveTab('timeline')}>
                    Action Timeline
                </button>
                <button className={tabButtonClass('commPlan')} onClick={() => setActiveTab('commPlan')}>
                    Crisis Protocol & Cleanup
                </button>
                <button className={tabButtonClass('budget')} onClick={() => setActiveTab('budget')}>
                    Budget & ROI
                </button>
            </div>
            {renderTabContent()}
        </SectionCard>
    );
};

type GoalsAndViewProps = {
    benchmark: typeof COMPETITIVE_BENCHMARKING;
    forecast: typeof FORECAST_DATA;
    kpiGoals: typeof KPI_GOALS;
};

const GoalsAndView: React.FC<GoalsAndViewProps> = ({ benchmark, forecast, kpiGoals }) => (
    <div className="space-y-6">
        {/* Competitive Benchmarking Table */}
        <SectionCard title="Competitive Benchmarking (vs. Industry Peers)" color="border-purple-500">
            <div className="overflow-x-auto mb-6 border rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actress</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Films</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Social Media</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endorsements</th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {benchmark.map((item, i) => (
                            <tr key={i} className={`hover:bg-gray-50 ${item.actress === 'Pavitra Lokesh' ? 'bg-red-50 font-bold' : ''}`}>
                                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-800">{item.actress}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm">{item.age}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm">{item.films}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm">{item.social}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm">{item.endorsements}</td>
                                <td className={`px-3 py-3 whitespace-nowrap text-sm ${item.color}`}>{item.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="text-xs text-gray-500">Observation: P. Lokesh lags significantly in social media and endorsement metrics compared to peers.</p>
        </SectionCard>

        {/* Sentiment Forecast */}
        <SectionCard title="Sentiment Forecast & Recovery Timeline" color="border-cyan-500">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
                {forecast.map((item, i) => (
                    <div key={i} className={`p-4 ${item.bg} rounded-lg shadow-inner border border-gray-200`}>
                        <p className="font-semibold text-lg flex justify-between mb-1">
                            {item.period}: <span className={`font-bold text-xl ${item.color}`}>{item.score}</span>
                        </p>
                        <p className="text-sm text-gray-700">{item.detail}</p>
                    </div>
                ))}
            </div>
            
            <p className="mt-4 text-sm font-semibold text-indigo-700 bg-indigo-100 p-3 rounded-lg">
                Full Recovery Timeline: <span className="font-bold">{SENTIMENT_DATA.recoveryTimeline}</span> (Requires disciplined execution)
            </p>
        </SectionCard>

        {/* KPI Goals */}
        <SectionCard title="Strategic KPI Goals" color="border-indigo-500">
            <div className="grid lg:grid-cols-2 gap-6">
                <KPITable title="6-Month Goals" goals={kpiGoals.sixMonth} color="yellow" />
                <KPITable title="12-Month Goals" goals={kpiGoals.twelveMonth} color="green" />
            </div>
        </SectionCard>
    </div>
);

const KPITable: React.FC<{
    title: string;
    goals: { metric: string; current: string; target: string; strategy: string }[];
    color: string;
}> = ({ title, goals, color }) => (
    <div className="border border-gray-200 rounded-lg shadow-sm">
        <h3 className={`text-lg font-bold p-3 bg-${color}-50 text-${color}-800 rounded-t-lg`}>{title}</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-white">
                    <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Target</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Strategy</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {goals.map((goal, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium">{goal.metric}</td>
                            <td className="px-3 py-2 text-red-500">{goal.current}</td>
                            <td className="px-3 py-2 text-green-600 font-semibold">{goal.target}</td>
                            <td className="px-3 py-2 text-gray-500 text-xs hidden sm:table-cell">{goal.strategy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const NAV_ITEMS = [
    { id: 'DASHBOARD', name: 'Dashboard & Summary', icon: '📊' },
    { id: 'DRIVERS', name: 'Key Sentiment Drivers', icon: '🔥' },
    { id: 'TIMELINE', name: 'Crisis Timeline', icon: '🕰️' },
    { id: 'STRATEGY', name: 'Action Plan', icon: '🚀' },
    { id: 'GOALS', name: 'Forecast & Goals', icon: '📈' },
];

const App = () => {
    const [activeView, setActiveView] = useState('DASHBOARD');
    const [userId, setUserId] = useState('Loading...');

    // Function to render the current view
    const renderView = () => {
        switch (activeView) {
            case 'DASHBOARD':
                return <DashboardView data={SENTIMENT_DATA} />;
            case 'DRIVERS':
                return <DriversView data={SENTIMENT_DATA} />;
            case 'TIMELINE':
                return <TimelineView data={TIMELINE_DATA} />;
            case 'STRATEGY':
                return <StrategyView data={STRATEGY_DATA} />;
            case 'GOALS':
                return <GoalsAndView benchmark={COMPETITIVE_BENCHMARKING} forecast={FORECAST_DATA} kpiGoals={KPI_GOALS} />;
            default:
                return <DashboardView data={SENTIMENT_DATA} />;
        }
    };

    // Firebase Auth Simulation/Setup
    useEffect(() => {
        // Placeholder for Firebase/Auth check in the canvas environment
        const authenticate = async () => {
            const tempId = crypto.randomUUID();
            setUserId(tempId);
        };

        authenticate();
    }, []);

    const navItemClass = (id: string) =>    
        `flex items-center p-3 rounded-xl cursor-pointer transition-colors duration-200 ${
            activeView === id
                ? 'bg-gray-800 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
        }`;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row pt-20">
            
            {/* --- Sidebar Navigation (Corporate Look) --- */}
            <aside className="lg:w-64 bg-white shadow-2xl lg:h-screen lg:sticky lg:top-0 p-4 border-r border-gray-200">
                <div className="flex flex-col h-full">
                    <h1 className="text-2xl font-extrabold text-gray-900 mb-6 border-b pb-4">
                        Brand Audit <span className="text-gray-600 text-sm block font-medium">Pavitra Lokesh</span>
                    </h1>
                    
                    <nav className="flex-grow space-y-2">
                        {NAV_ITEMS.map(item => (
                            <div 
                                key={item.id} 
                                className={navItemClass(item.id)}
                                onClick={() => setActiveView(item.id)}
                            >
                                <span className="text-xl mr-3">{item.icon}</span>
                                <span className="font-semibold text-sm">{item.name}</span>
                            </div>
                        ))}
                    </nav>

                    {/* Footer/Auth Info */}
                    <div className="mt-8 pt-4 border-t text-xs text-gray-400">
                        <p className="font-semibold">Analysis Date: Nov 26, 2025</p>
                        <p>User ID: <span className="font-mono text-gray-500 break-all">{userId}</span></p>
                    </div>
                </div>
            </aside>

            {/* --- Main Content Area --- */}
            <main className="flex-1 p-4 md:p-8">
                <header className="mb-8 p-4 bg-white shadow-md rounded-xl lg:hidden">
                    <h2 className="text-3xl font-extrabold text-gray-900">{NAV_ITEMS.find(item => item.id === activeView)?.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">Tollywood/Sandalwood Actress Analysis</p>
                </header>

                <div className="pb-10">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default App;