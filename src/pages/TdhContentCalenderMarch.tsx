import React, { useState, useMemo, FormEvent } from 'react';
import { Search, Star, Instagram, Youtube, Lock, Mail, ArrowRight, Loader2, LayoutDashboard, ChevronRight, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import logo from "../components/assets/logos/logo-01.svg";


// --- Type Definitions ---
export type BrandKey = 'tdh' | 'rishika' | 'millet';

export interface Post {
    date: string;
    day: string;
    type: string;
    festival: boolean;
    desc: string;
    product: string;
    status: string;
}

export interface BrandData {
    subtitle: string;
    posts: Post[];
}

export interface UserData {
    email: string;
}

// Centralized Data Store
const appData: Record<BrandKey, BrandData> = {
    tdh: {
        subtitle: "Legacy, Heritage & The Home-maker's Soul",
        posts: [
            { date: "Mar 03", day: "Mon", type: "carousel", festival: false, desc: "5 things every Indian kitchen must have: Urad Dal, Toor Dal, Turmeric. Warm visuals & why it's non-negotiable.", product: "Urad Dal, Toor Dal", status: "Planned" },
            { date: "Mar 04", day: "Tue", type: "static", festival: true, desc: "Holi Color Palette: Nature’s own colors with TDH Spices. Homely wishing post.", product: "Dal & Chili Powder", status: "Scheduled" },
            { date: "Mar 05", day: "Wed", type: "carousel", festival: false, desc: "Purity Check: How to identify unadulterated Urad Dal. Highlighting Sattvik certification.", product: "Urad Dal", status: "Planned" },
            { date: "Mar 07", day: "Fri", type: "video", festival: true, desc: "Women's Day: Montage showing women at factory/labs. 'Built by women, for women'.", product: "Brand Awareness", status: "Shot" },
            { date: "Mar 10", day: "Mon", type: "carousel", festival: false, desc: "Washed vs Unwashed Dal: Debunking kitchen myths as a knowledgeable friend.", product: "Urad Dal", status: "Planned" },
            { date: "Mar 12", day: "Wed", type: "reel", festival: false, desc: "Sunday Mornings Pesarattu: Mother-daughter cooking. Slow cuts, real vibes.", product: "Moong Dal", status: "Edited" },
            { date: "Mar 17", day: "Mon", type: "reel", festival: false, desc: "Office lunch sorted in 10 mins! Homemaker's POV of quick Dal tadka.", product: "Toor Dal", status: "Planned" },
            { date: "Mar 19", day: "Wed", type: "static", festival: true, desc: "Happy Ugadi: Vibrant wish post featuring Ugadi Pachadi and staples.", product: "All Products", status: "Scheduled" },
            { date: "Mar 21", day: "Fri", type: "carousel", festival: false, desc: "From Fields to Kitchen: 20 years of trust. Emotional legacy storytelling.", product: "Corporate Story", status: "Planned" },
            { date: "Mar 24", day: "Mon", type: "reel", festival: false, desc: "Grandma vs Me: Girl tries to match Grandma's Sambar taste using TDH powder.", product: "Toor Dal, Spices", status: "Planned" },
            { date: "Mar 28", day: "Fri", type: "carousel", festival: false, desc: "6 AM to 6 PM Story: A working woman's day with TDH range from idli to snacks.", product: "Urad Dal", status: "Planned" }
        ]
    },
    rishika: {
        subtitle: "Fresh, Young & Traditional Treat",
        posts: [
            { date: "Mar 02", day: "Mon", type: "reel", festival: false, desc: "Why Rishika Sunnundalu hits different. Origin story, Ghee benefits, No preservatives.", product: "Sunnundalu", status: "Planned" },
            { date: "Mar 04", day: "Wed", type: "static", festival: true, desc: "Happy Holi! Vibrant photo of Laddus surrounded by organic gulal. Sweet palate cleaner.", product: "Laddus", status: "Scheduled" },
            { date: "Mar 06", day: "Fri", type: "carousel", festival: false, desc: "GRWM Reel: Packing hostel bag + must-have snacks (Sunnundalu, Murukku).", product: "Assorted Snacks", status: "In Progress" },
            { date: "Mar 09", day: "Mon", type: "reel", festival: false, desc: "POV: Finding the hidden laddu box. Relatable 'stealing' video.", product: "Sunnundalu", status: "Shot" },
            { date: "Mar 11", day: "Wed", type: "static", festival: false, desc: "Why Sunnundalu? Modern health benefits as the 'original protein bar'.", product: "Sunnundalu", status: "Planned" },
            { date: "Mar 13", day: "Fri", type: "reel", festival: false, desc: "Friday Movie Night: Flat-lay with laptop, blanket and bowl of Karapoosa.", product: "Savouries", status: "Planned" },
            { date: "Mar 16", day: "Mon", type: "carousel", festival: true, desc: "Ugadi Prep List: Essential ready-to-serve sweets for your guests.", product: "Laddus", status: "Planned" },
            { date: "Mar 18", day: "Wed", type: "reel", festival: false, desc: "The Women who inspired us: Celebrating the original creators of traditional sweets.", product: "Legacy", status: "Edited" },
            { date: "Mar 20", day: "Fri", type: "static", festival: true, desc: "Happy Ugadi! Homely & Fresh wish for New Beginnings.", product: "General", status: "Scheduled" },
            { date: "Mar 23", day: "Mon", type: "reel", festival: false, desc: "From Our Kitchen to Yours: BTS of shaping laddus by hand.", product: "Sunnundalu", status: "Planned" },
            { date: "Mar 25", day: "Wed", type: "carousel", festival: false, desc: "Interactive: Which Rishika snack are you? Personalities for Sunnundalu vs Murukku.", product: "All Products", status: "Planned" },
            { date: "Mar 26", day: "Tue", type: "static", festival: true, desc: "Sri Rama Navami: Pairing Panakam with Dry Fruit Mix.", product: "Dry Fruits", status: "Scheduled" },
            { date: "Mar 30", day: "Mon", type: "static", festival: false, desc: "Meme: 'Me: Just one laddu... Also me 5 mins later: empty.'", product: "Sunnundalu", status: "Planned" }
        ]
    },
    millet: {
        subtitle: "Health-Focused, High-Energy Superfoods",
        posts: [
            { date: "Mar 02", day: "Mon", type: "reel", festival: false, desc: "Fuel Right: Montage of students, athletes and pros fueling with Millets.", product: "All Range", status: "Planned" },
            { date: "Mar 04", day: "Wed", type: "reel", festival: true, desc: "Color Your Plate: Holi transition showing colors turning into Moringa Noodles.", product: "Noodles", status: "Scheduled" },
            { date: "Mar 06", day: "Fri", type: "carousel", festival: false, desc: "Brand Story: 'India deserved better food.' Lab to kitchen journey.", product: "Brand", status: "In Progress" },
            { date: "Mar 07", day: "Sat", type: "reel", festival: true, desc: "Women's Day: Women farmers & workforce behind the millet revolution.", product: "Supply Chain", status: "Planned" },
            { date: "Mar 09", day: "Mon", type: "reel", festival: false, desc: "30-sec One-Pot Brown Top Noodle recipe for busy lives.", product: "Noodles", status: "Shot" },
            { date: "Mar 11", day: "Wed", type: "static", festival: false, desc: "Gym Shot: Superfoods as the ultimate fitness fuel.", product: "Superfoods", status: "Planned" },
            { date: "Mar 13", day: "Fri", type: "reel", festival: false, desc: "World Sleep Day: Why light millet dinner leads to better sleep.", product: "Noodles", status: "Planned" },
            { date: "Mar 16", day: "Mon", type: "carousel", festival: false, desc: "Millet vs The World: Protein/Fiber/GI comparison chart.", product: "Education", status: "Edited" },
            { date: "Mar 18", day: "Wed", type: "reel", festival: false, desc: "Exam Energy: Switching chips for Millet Cookies for focus.", product: "Cookies", status: "Planned" },
            { date: "Mar 20", day: "Fri", type: "static", festival: true, desc: "Happy Ugadi! Fresh, minimalist health-focused greeting.", product: "General", status: "Scheduled" },
            { date: "Mar 23", day: "Mon", type: "reel", festival: false, desc: "Future Self: Reaching for cookies instead of donuts.", product: "Cookies", status: "Planned" },
            { date: "Mar 27", day: "Fri", type: "static", festival: true, desc: "Sri Rama Navami: Purity and strength through ideal nutrition.", product: "Brand", status: "Scheduled" },
            { date: "Mar 30", day: "Mon", type: "reel", festival: false, desc: "Marvel Makers: Fast clips of youth tagging the brand.", product: "Community", status: "Planned" }
        ]
    }
};

// Style Mappers replacing raw CSS classes
const typeStyles: Record<string, string> = {
    reel: "bg-sky-100 text-sky-700",
    carousel: "bg-green-100 text-green-700",
    static: "bg-yellow-100 text-yellow-700",
    video: "bg-purple-100 text-purple-700",
    graphic: "bg-pink-100 text-pink-700"
};

const statusStyles: Record<string, string> = {
    "Planned": "bg-gray-100 text-gray-600",
    "Scheduled": "bg-blue-100 text-blue-800",
    "Posted": "bg-emerald-100 text-emerald-800",
    "Shot": "bg-orange-100 text-orange-800",
    "Edited": "bg-indigo-100 text-indigo-800",
    "In Progress": "bg-amber-100 text-amber-800"
};

interface TabButtonProps {
    id: BrandKey;
    label: string;
    isActive: boolean;
    onClick: (id: BrandKey) => void;
}

// Reusable component for Tab Buttons
const TabButton: React.FC<TabButtonProps> = ({ id, label, isActive, onClick }) => {
    return (
        <button
            onClick={() => onClick(id)}
            className={`relative pb-4 text-sm font-bold transition-all duration-300 ${
                isActive ? 'text-[var(--brand-primary)]' : 'text-gray-400 hover:text-gray-600'
            }`}
        >
            {label}
            {isActive && (
                <span className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-[var(--brand-primary)] rounded-full"></span>
            )}
        </button>
    );
};

export default function TdhContentCalenderMarch() {
    // Authentication / Registration state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Dashboard State management
    const [currentBrand, setCurrentBrand] = useState<BrandKey>('tdh');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('all');

    // Memoized filtering logic
    const filteredPosts = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return appData[currentBrand].posts.filter((post) => {
            const matchesSearch = post.desc.toLowerCase().includes(query) || post.product.toLowerCase().includes(query);
            const matchesType = filterType === 'all' || post.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [currentBrand, searchQuery, filterType]);

    // ================= USER STORAGE =================

  const getUsers = (): UserData[] => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  };

  const saveUser = (user: UserData): void => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const findUser = (email: string): UserData | undefined => {
    return getUsers().find((u) => u.email === email);
  };

  // ================= LOGIN =================

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('email') as string)?.trim();

    if (!email) {
      setError('Please enter your email address.');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    const existingUser = findUser(email);

    if (existingUser) {
      setSuccessMessage('Welcome back.');
      setTimeout(() => setIsLoggedIn(true), 800);
      setIsLoading(false);
      return;
    }

    try {
      await emailjs.send(
        'service_ztfkvtu',
        'template_zhvk3r4',
        { email },
        'lGEySRjC5bz4G2JLr'
      );

      saveUser({ email });

      setSuccessMessage('Registered successfully.');
      setTimeout(() => setIsLoggedIn(true), 1000);

    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ================= LOGIN SCREEN =================

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">

          <div className="flex flex-col items-center mb-8 text-center">
            <div className="p-4 bg-slate-100 rounded-2xl mb-4 text-[#1E293B]">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-[#1E293B] uppercase">
              Strategic Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Enter your email to access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E293B]/20"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {successMessage && (
              <div className="text-green-600 bg-green-50 p-3 rounded-xl text-xs">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E293B] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Access Dashboard
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

    // --- MAIN DASHBOARD SCREEN ---
    return (
        <div className={`brand-${currentBrand} transition-colors duration-500 min-h-screen flex flex-col font-['Plus_Jakarta_Sans',sans-serif] bg-[#F9FAFB]`}>
            {/* Injecting CSS variables and custom scrollbar styles required for dynamic theming */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
                
                .brand-tdh { --brand-primary: #8B0000; --brand-secondary: #D4AF37; }
                .brand-rishika { --brand-primary: #E9967A; --brand-secondary: #FAD0C4; }
                .brand-millet { --brand-primary: #2D5A27; --brand-secondary: #A8E063; }

                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
            `}</style>

            {/* HEADER */}
<header className="pt-12 pb-8 px-6 text-center flex flex-col items-center">
    {/* Add your logo here */}
    <img 
        src={logo}
        alt="Company Logo" 
        className="h-16 w-auto mb-6 object-contain" 
    />
    
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight transition-all">
        TDH Content Calendar{' '}<span className="text-gray-400 font-light">March 2026</span>
    </h1>
    <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto transition-all duration-300">
        {appData[currentBrand].subtitle}
    </p>
</header>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 max-w-[1400px] mx-auto w-full">
                <div className="bg-white rounded-3xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col">
                    
                    {/* TABS & FILTERS */}
                    <div className="px-8 pt-6 border-b border-gray-50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-10">
                                <TabButton id="tdh" label="TDH Group" isActive={currentBrand === 'tdh'} onClick={setCurrentBrand} />
                                <TabButton id="rishika" label="TDH Rishika" isActive={currentBrand === 'rishika'} onClick={setCurrentBrand} />
                                <TabButton id="millet" label="Millet Marvels" isActive={currentBrand === 'millet'} onClick={setCurrentBrand} />
                            </div>
                            <div className="flex items-center gap-4 pb-4">
                                <div className="bg-gray-50 rounded-full px-4 py-2 border border-gray-100 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-[var(--brand-primary)]">
                                    <Search size={14} className="text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        value={searchQuery}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                        className="bg-transparent border-none outline-none text-sm w-32 md:w-48 text-gray-600"
                                    />
                                </div>
                                <select 
                                    value={filterType}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value)}
                                    className="text-xs font-semibold bg-gray-50 border-none rounded-lg px-3 py-2 outline-none text-gray-600 focus:ring-2 focus:ring-[var(--brand-primary)] cursor-pointer"
                                >
                                    <option value="all">All Types</option>
                                    <option value="reel">Reels</option>
                                    <option value="carousel">Carousels</option>
                                    <option value="static">Statics</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* TABLE AREA */}
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date / Day</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Format</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Campaign Description</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Focus</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post: Post, idx: number) => (
                                        <tr key={idx} className="group hover:bg-gray-50/80 transition-all">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800">{post.date}</span>
                                                    <span className="text-[10px] font-semibold text-gray-400 uppercase">{post.day}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${typeStyles[post.type] || 'bg-gray-100 text-gray-700'}`}>
                                                    {post.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 max-w-md">
                                                <div className="relative group/tip">
                                                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed cursor-help flex items-center gap-1.5">
                                                        {post.festival && <Star fill="currentColor" size={12} className="text-amber-400 flex-shrink-0" />}
                                                        <span>{post.desc}</span>
                                                    </p>
                                                    {/* Tooltip */}
                                                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover/tip:block bg-gray-900 text-white text-[11px] p-4 rounded-xl shadow-2xl z-50 w-72 leading-relaxed">
                                                        <p className="font-bold mb-1 text-[var(--brand-secondary)]">{post.type.toUpperCase()}</p>
                                                        {post.desc}
                                                        <div className="mt-2 pt-2 border-t border-gray-700 flex justify-between">
                                                            <span>Instagram • YouTube</span>
                                                            <span className="font-bold">{post.status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]"></div>
                                                    <span className="text-xs font-bold text-gray-500">{post.product}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border border-transparent ${statusStyles[post.status] || 'bg-gray-100 text-gray-600'}`}>
                                                        {post.status}
                                                    </span>
                                                    <div className="flex gap-3 text-gray-300">
                                                        <Instagram size={14} className="hover:text-pink-500 cursor-pointer transition-colors" />
                                                        <Youtube size={15} className="hover:text-red-600 cursor-pointer transition-colors" />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-12 text-center text-gray-400 font-medium">
                                            No campaigns found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            
            <footer className="p-8 text-center text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                &copy; 2026 TDH Ecosystem • Marketing Strategy Dashboard
            </footer>
        </div>
    );
}
