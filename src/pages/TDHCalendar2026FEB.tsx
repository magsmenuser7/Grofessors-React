import React, { useState } from 'react';
import { Calendar, PlayCircle, Sparkles, CheckCircle2, Lock, ArrowRight, User, Key, Loader2 } from 'lucide-react';
import emailjs from 'emailjs-com';

const TDHCalendar2026FEB = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pd' | 'rishika' | 'millet'>('pd');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // ================================
  // LOCAL STORAGE HELPERS
  // ================================
  const getUsers = (): Array<{ name: string; email: string; password: string }> => {
    return JSON.parse(localStorage.getItem('registeredUsers') ?? '[]');
  };

  const saveUserToLocalStorage = (user: { name: string; email: string; password: string }) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const findUserByEmail = (email: string) => {
    const users = getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  };

  // ================================
  // LOGIN / REGISTER HANDLER
  // ================================
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!name.trim()) {
      setError('Name is required.');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
          return;
      }

      if (!password.trim()) {
          setError('Password is required.');
          setIsLoading(false);
          return;
      }

      if (password.trim().length < 6) {
          setError('Password must be at least 6 characters long.');
          setIsLoading(false);
          return;
      }

      const existingUser = findUserByEmail(email);

    // CASE 1: LOGIN
    if (existingUser) {
      if (existingUser.password !== password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }

      setSuccessMessage('👋 Welcome back! Logging you in...');
      setTimeout(() => setIsLoggedIn(true), 1000);
      setIsLoading(false);
      return;
    }

    // CASE 2: REGISTER
    try {
      await emailjs.send(
        'service_9gmlg2q',
        'template_p0q050i',
         {
        name: name,
        email: email,
        password: password
      },
        '-ePIcI6qQCURx5hAM'
      );

      saveUserToLocalStorage({ name, email, password });

      setSuccessMessage('✅ Registered successfully! Redirecting...');
      setTimeout(() => setIsLoggedIn(true), 1200);

    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('⚠️ Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ================================
  // LOGIN SCREEN UI
  // ================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-900 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl opacity-60"></div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[32px] shadow-2xl border border-slate-100 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-blue-600 shadow-lg shadow-blue-200 rounded-2xl mb-6">
              <Lock className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-2">
              TDH Portal
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Secure Access Required
            </p>
          </div>

          {error && <p className="text-red-500 text-xs font-bold mb-3 text-center">{error}</p>}
          {successMessage && <p className="text-green-600 text-xs font-bold mb-3 text-center">{successMessage}</p>}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* NAME */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Name</label>
              <div className="relative group">
                <User className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold"
                  placeholder="Enter Name"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <User className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold"
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Key className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-700 text-white font-black uppercase text-xs py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              Authorized personnel only. <br />
              <span className="opacity-50">v2.4.0 Secure Build</span>
            </p>
          </div> */}
        </div>
      </div>
    );
  }

  // ================================
  // BEFORE LOGIN UI
  // ================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-900 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl opacity-60"></div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[32px] shadow-2xl border border-slate-100 relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-blue-600 shadow-lg shadow-blue-200 rounded-2xl mb-6">
              <Lock className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-2">
              TDH Portal
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Secure Access Required
            </p>
          </div>

          {error && <p className="text-red-500 text-xs font-bold mb-3 text-center">{error}</p>}
          {successMessage && <p className="text-green-600 text-xs font-bold mb-3 text-center">{successMessage}</p>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Name</label>
              <div className="relative group">
                <User className="absolute inset-y-0 left-0 pl-4 mt-4 text-slate-400" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold"
                  placeholder="Enter Name"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <User className="absolute inset-y-0 left-0 pl-4 mt-4 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold"
                  placeholder="name@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Key className="absolute inset-y-0 left-0 pl-4 mt-4 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-700 text-white font-black uppercase text-xs py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Access Dashboard <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              Authorized personnel only. <br />
              <span className="opacity-50">v2.4.0 Secure Build</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================================
  // AFTER LOGIN CONTENT (YOUR DATA)
  // ================================

  const pdData = [
    { date: "02 Feb", day: "Mon", type: "Carousal", desc: "\"The Kitchen Budget.\" A weighing scale. Left side: 1 cup of Generic Urad Dal. Right side: 1 cup of Tenali Double Horse Urad Gota. The TDH side shows double the batter volume.", product: "Urad gota" },
    { date: "04 Feb", day: "Wed", type: "Reel", desc: "Focus on the color Yellow(colour of saraswathi). Slow-motion pouring of Toor Dal. Cooking a bright yellow Muddapappu with ghee. A student placing books near the sarswathi idol(as the exams season starts)", product: "Toor dal" },
    { date: "06 Feb", day: "Fri", type: "Reel", desc: "Kids back from school, eating putnalu + peanuts snack bowl", product: "Putnalu + peanuts" },
    { date: "07 Feb", day: "sun", type: "Reel", desc: "\"Sunday Cheat Code.\" Making punugulu (fritters) using leftover Idli batter. The sound of the crunch is key (ASMR).", product: "Idly rawa" },
    { date: "09 Feb", day: "Mon", type: "Carousal", desc: "\"The Desi Pizza\". Slide 1: Kids asking for Pizza. Slide 2: Mom spreading Urad Dal Batter thick like a base (Uttapam style). Slide 3: Topping with cheese, corn, and veggies. Slide 4: Happy Kids.", product: "Urad gota" },
    { date: "10 Feb", day: "Tue", type: "Reel (World pulses day)", desc: "A high-quality cinematic video showing the journey of a single grain. From the farm to the factory sorting (showing technology) to the mother's hand. Emotional music.", product: "All" },
    { date: "13 Feb", day: "Fri", type: "Reel (Valentine's Theme)", desc: "A husband trying to cook for his wife. He is making a simple Dosa but struggling. The wife steps in, they laugh, and flip it together.", product: "Urad gota" },
    { date: "15 Feb", day: "Sun", type: "Static(Maha Shivaratri)", desc: "A serene image of a Shiva Lingam with an offering of simple soaked pulses or a satvik meal.", product: "All" },
    { date: "18 Feb", day: "Wed", type: "Reel/static", desc: "A terrace scene. Spreading a white cloth. Pouring the batter for Vadiyalu/Fryums. The bright sun hitting the wet batter. This marks the start of the pickle/fryum season.", product: "Idly rawa" },
    { date: "20 Feb", day: "Fri", type: "Static", desc: "A study table with books and a bowl of roasted peanuts.", product: "peanuts." },
    { date: "23 Feb", day: "Mon", type: "Reel", desc: "A time-lapse of batter fermenting and rising in a glass bowl. Showing the bubbles (fermentation).", product: "Husked Urad spilt" },
    { date: "25 Feb", day: "Wed", type: "Carousal", desc: "\"Pick Your Team...\" Slide 1: Garelu with Chicken Curry. Slide 2: Garelu with Coconut Chutney. Slide 3: Garelu with Ginger Pickle. Slide 4: Comment below!", product: "Urad gota" },
    { date: "27 Feb", day: "Fri", type: "Reel", desc: "The ultimate comfort. A bowl of hot rice. Pouring thick, yellow Toor Dal Sambar over it. Slow motion. Steam rising.", product: "Toor dal" }
  ];

  const rishikaData = [
    { date: "Feb 2", day: "Mon", type: "Reel", desc: "\"The Study/Work Struggle.\" A student/employee falling asleep at their desk. They take a bite of Sunnundalu. Eyes pop open! Energy bar fills up on screen.", product: "Sunnundalu" },
    { date: "Feb 4", day: "Wed", type: "Static Carousel", desc: "\"DIY Masala Papad.\" Slide 1: Plain Papad. Slide 2: Chopped onions, tomatoes, coriander. Slide 3: The final loaded Masala Papad.", product: "Papad" },
    { date: "Feb 6", day: "Fri", type: "Reel (ASMR)", desc: "Extreme close-up. Frying a Papad. The oil bubbling. Breaking the papad, crunch. Dipping it in a spicy chutney.", product: "Papad" },
    { date: "Feb 9", day: "Mon", type: "Static Creative", desc: "\"Team Papad or Team Sunnundalu?\" slide 1: creative visuals of sunnundalu Slide 2: visulas of papad, asking people what they love the most", product: "Sunnundalu" },
    { date: "Feb 11", day: "Wed", type: "Reel", desc: "Two friends fighting over the last Sunnundalu. Freeze frame. Text: \"True Love is giving up the last piece.\"", product: "Sunnundalu" },
    { date: "Feb 13", day: "Fri", type: "Reel (Valentine's Theme)", desc: "\"Ideas that won't fail.\" Showing a beautiful hamper of TDH Rishika Sweets being tied with a red ribbon.", product: "ALL" },
    { date: "Feb 15", day: "Sun", type: "Static Image", desc: "peaceful image of a fast being broken. plate with fruits and Sunnundalu. linking with Maha shivarathri wishes", product: "ALL" },
    { date: "Feb 18", day: "Wed", type: "Static Meme", desc: "\"Me waiting for the weekend\" (Skeleton image) vs \"Me when I hear a Papad frying\" (Dancing kid).", product: "Papad" },
    { date: "Feb 20", day: "Fri", type: "Reel", desc: "\"The Ultimate Combo.\" A bowl of Maggi/Noodles. Crushing a Papad on top of it for texture.", product: "Papad" },
    { date: "Feb 23", day: "Mon", type: "Static Carousel", desc: "\"What's Inside?\" A dissection of a Sunnundalu. Graphic pointing to ingredients: Urad Dal (Protein), Ghee (Good Fats), Jaggery (Iron).", product: "Sunnundalu" },
    { date: "Feb 25", day: "Wed", type: "UGC / Repost", desc: "A collage of people eating Sunnundalu at a wedding or event. Reposting customer stories.", product: "ALL" },
    { date: "Feb 27", day: "Fri", type: "Static Carousel", desc: "\"3 ways to eat a Papad.\" Slide 1: Roasted (Healthy). Slide 2: Fried (Classic). Slide 3: Crushed in Curd Rice (Comfort).", product: "ALL" }
  ];

  const milletData = [
    { date: "Feb 2", day: "Mon", type: "Reel", desc: "Fast cuts: Lacing up running shoes -> Pouring sweat -> Opening a pack of Millet Cookies. Text overlay: \"Pre-workout? Post-workout? Mid-lecture? We got you.\"", product: "Cookies" },
    { date: "Feb 4", day: "Wed", type: "Static", desc: "Focus on the color Yellow, A bowl of Millet Pasta tossed in turmeric/saffron sauce, placed near a stack of books.", product: "Pasta" },
    { date: "Feb 6.", day: "Fri", type: "Reel (ASMR)", desc: "\"Late Night Cravings 101.\" Showing Millet Noodles being cooked in 5 mins. Adding chili oil, sesame seeds, and a fried egg. Slurping sound at the end.", product: "Noodles" },
    { date: "Feb 9", day: "Mon", type: "Carousel (Graphic)", desc: "\"Millet vs. Maida: The Vibe Check.\" Slide 1 (Maida): \"The Toxic Ex\" (Bloating, crash, tired). Slide 2 (Millet): \"The Green Flag\" (Energy, glow, stamina).", product: "All" },
    { date: "Feb 11", day: "Wed", type: "Reel", desc: "Cinematic shots of different millets falling like rain. Transition to a cooked Millet Pasta dish. Text: \"Ancient Grains, Modern Gains.\"", product: "Pasta" },
    { date: "Feb 13", day: "Fri", type: "Reel (POV - Valentine's Theme)", desc: "POV: Cooking dinner for your date. Plating Millet Pasta beautifully with candles. Text: \"Impressing them with my health game.\"", product: "Pasta" },
    { date: "Feb 16", day: "Mon", type: "Static Image", desc: "A minimalist, aesthetic shot of a single pack of Millet Noodles/Soup. Sharp shadows. High contrast.", product: "Noodles" },
    { date: "Feb 18", day: "Wed", type: "Photo", desc: "A flatlay of a laptop, a notebook, and a bowl of Millet Cookies. Text: \"Fuel for the finals.\"", product: "Cookies" },
    { date: "Feb 20", day: "Fri", type: "Reel", desc: "A fitness influencer trying to 'weight lift' using a heavy bag of Millet Noodles packs. Laughs and then sits down to eat. Text: \"I lift, I eat, I repeat.\"", product: "Noodles" },
    { date: "Feb 23", day: "Mon", type: "Reel", desc: "\"POV: You think healthy food is boring.\" Person looks skeptical -> Takes a bite of Spicy Schezwan Millet Noodles -> Eyes widen -> Starts eating faster.", product: "Noodles" },
    { date: "Feb 25", day: "Wed", type: "Carousel", desc: "\"Eat Good, Do Good.\" Slide 1: Millets use less water. Slide 2: Millets need fewer chemicals. Slide 3: You saving the planet one bite at a time.", product: "All" },
    { date: "Feb 27", day: "Fri", type: "Reel", desc: "A group of friends gaming/chilling. A big bowl of Millet Pasta (Nachos style?) being passed around.", product: "Pasta" }
  ];

  const milletAdditional = [
    { date: "Additional", day: "-", type: "Reel", desc: "The \"Internal Skincare\" Routine Start with a dull, grey morning filter. A scoop of \"Greens\" hits clear water. Whoosh sound effect. The water turns vibrant emerald green. Cut to a scoop of \"Reds\" or \"Beets\" hitting water. Boom sound. Vibrant ruby red. Fast cut to the user drinking it and the filter changing to bright/saturated glow.", product: "WELLNESS POWDERS" },
    { date: "Additional", day: "-", type: "Reel", desc: "Extreme ASMR Crunch: Extreme close-up of a Freeze-Dried Strawberry. The user bites into it. CRUNCH (Amplified sound). Show the texture it's airy and crisp, not sticky. Show a Jamun (Black Plum). Crunch it. Text on screen: \"Yes, Crunchy Jamun exists!\" End with tossing the fruits into a gym bag.", product: "Freezed dryfruits" },
    { date: "Additional", day: "-", type: "Reel", desc: "Don't show it boiling in a steel pot (too old school). Show a modern lifestyle: a glass jar, some ice, a splash of almond milk/milk, a banana, a spoonful of peanut butter, and the Health Mix powder. Shake it up. Top with the freeze-dried strawberries. Take a sip. Text: \"The 2-minute breakfast for the 100mph life.\"", product: "Health Mix" }
  ];

  const renderTable = (data: any[], sectionTitle: string | null = null) => (
    <div className="mb-10">
      {sectionTitle && (
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b-2 border-slate-100 pb-2 uppercase tracking-tighter">
          <Sparkles className="text-blue-500" size={22} />
          {sectionTitle}
        </h3>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[15%]">Date / Day</th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[18%]">Content Type</th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[47%]">Content Description</th>
              <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[20%]">Focused Product</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-all duration-150 group">
                <td className="px-8 py-8 align-top">
                  <div className="font-black text-base leading-none mb-1 text-slate-900">{item.date}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.day}</div>
                </td>
                <td className="px-8 py-8 align-top">
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-colors ${
                      item.type?.toLowerCase().includes('valentine')
                        ? 'bg-rose-50 text-rose-700 border-rose-100'
                        : item.type?.toLowerCase().includes('reel')
                        ? 'bg-purple-50 text-purple-700 border-purple-100'
                        : item.type?.toLowerCase().includes('carousal') ||
                          item.type?.toLowerCase().includes('carousel')
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {(item.type?.toLowerCase().includes('reel') ||
                      item.type?.toLowerCase().includes('valentine')) && <PlayCircle size={12} className="mr-2" />}
                    {item.type}
                  </div>
                </td>
                <td className="px-8 py-8 align-top">
                  <p className="text-sm leading-[1.8] font-medium pr-4 text-slate-600">{item.desc}</p>
                </td>
                <td className="px-8 py-8 align-top">
                  <div className="text-[10px] font-black border px-3 py-1.5 rounded-md inline-block uppercase tracking-[0.15em] shadow-sm text-blue-600/70 bg-blue-50/50 border-blue-100">
                    {item.product}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ================================
  // PAGE AFTER LOGIN
  // ================================
  return (
    <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white shadow-md rounded-2xl mb-6 border border-slate-100">
            <Calendar className="text-blue-600" size={28} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            TDH Calendar 2026 <span className="text-blue-600">—</span> FEB
          </h1>
          <p className="mt-4 text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">
            Integrated Media Planning & Strategy
          </p>
          <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mt-6 rounded-full opacity-30"></div>
        </header>

        <nav className="flex flex-wrap gap-3 mb-12 justify-center sticky top-6 z-20">
          <div className="bg-white/80 backdrop-blur-xl p-2 rounded-[24px] shadow-2xl border border-slate-200/50 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab('pd')}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${
                activeTab === 'pd'
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-0.5'
                  : 'bg-transparent text-slate-500 hover:bg-slate-50'
              }`}
            >
              Tenali Double Horse P&D
            </button>

            <button
              onClick={() => setActiveTab('rishika')}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${
                activeTab === 'rishika'
                  ? 'bg-orange-600 text-white shadow-xl shadow-orange-200 -translate-y-0.5'
                  : 'bg-transparent text-slate-500 hover:bg-slate-50'
              }`}
            >
              TDH RISHIKA
            </button>

            <button
              onClick={() => setActiveTab('millet')}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${
                activeTab === 'millet'
                  ? 'bg-emerald-700 text-white shadow-xl shadow-emerald-200 -translate-y-0.5'
                  : 'bg-transparent text-slate-500 hover:bg-slate-50'
              }`}
            >
              Millet Marvels
            </button>
          </div>
        </nav>

        <main className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {activeTab === 'pd' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-8 rounded-[32px] mb-10 shadow-2xl border border-slate-800">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                    <CheckCircle2 size={32} className="text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Tenali Double Horse (P&D)</h2>
                    <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.3em] mt-1">
                      Premium Pulses & Dals Portfolio
                    </p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest">February Content Pipeline</span>
                </div>
              </div>
              {renderTable(pdData)}
            </div>
          )}

          {activeTab === 'rishika' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-orange-700 text-white p-8 rounded-[32px] mb-10 shadow-2xl border border-orange-600">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                    <CheckCircle2 size={32} className="text-orange-200" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">TDH Rishika</h2>
                    <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.3em] mt-1">
                      Confectionery & Sweets Portfolio
                    </p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-orange-500/20 border border-orange-400/30 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest">February Content Pipeline</span>
                </div>
              </div>
              {renderTable(rishikaData)}
            </div>
          )}

          {activeTab === 'millet' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-900 text-white p-8 rounded-[32px] mb-10 shadow-2xl border border-emerald-800">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Millet Marvels</h2>
                    <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.3em] mt-1">
                      Health & Wellness Portfolio
                    </p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-emerald-500/20 border border-emerald-400/30 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest">February Content Pipeline</span>
                </div>
              </div>

              {renderTable(milletData, 'MAIN CONTENT TABLE')}

              <div className="mt-20">
                <div className="h-px bg-slate-200 w-full mb-12"></div>
                {renderTable(milletAdditional, 'ADDITIONAL CONTENTS')}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-24 py-12 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
            Tenali Double Horse Group • Proprietary Planning Framework • 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TDHCalendar2026FEB;

















// import React, { useState } from 'react';
// import { Calendar, Info, PlayCircle, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

// const TDHCalendar2026FEB = () => {
//   const [activeTab, setActiveTab] = useState('pd');

//   const pdData = [
//     { date: "02 Feb", day: "Mon", type: "Carousal", desc: "\"The Kitchen Budget.\" A weighing scale. Left side: 1 cup of Generic Urad Dal. Right side: 1 cup of Tenali Double Horse Urad Gota. The TDH side shows double the batter volume.", product: "Urad gota" },
//     { date: "04 Feb", day: "Wed", type: "Reel", desc: "Focus on the color Yellow(colour of saraswathi). Slow-motion pouring of Toor Dal. Cooking a bright yellow Muddapappu with ghee. A student placing books near the sarswathi idol(as the exams season starts)", product: "Toor dal" },
//     { date: "06 Feb", day: "Fri", type: "Reel", desc: "Kids back from school, eating putnalu + peanuts snack bowl", product: "Putnalu + peanuts" },
//     { date: "07 Feb", day: "sun", type: "Reel", desc: "\"Sunday Cheat Code.\" Making punugulu (fritters) using leftover Idli batter. The sound of the crunch is key (ASMR).", product: "Idly rawa" },
//     { date: "09 Feb", day: "Mon", type: "Carousal", desc: "\"The Desi Pizza\". Slide 1: Kids asking for Pizza. Slide 2: Mom spreading Urad Dal Batter thick like a base (Uttapam style). Slide 3: Topping with cheese, corn, and veggies. Slide 4: Happy Kids.", product: "Urad gota" },
//     { date: "10 Feb", day: "Tue", type: "Reel (World pulses day)", desc: "A high-quality cinematic video showing the journey of a single grain. From the farm to the factory sorting (showing technology) to the mother's hand. Emotional music.", product: "All" },
//     { date: "13 Feb", day: "Fri", type: "Reel (Valentine's Theme)", desc: "A husband trying to cook for his wife. He is making a simple Dosa but struggling. The wife steps in, they laugh, and flip it together.", product: "Urad gota" },
//     { date: "15 Feb", day: "Sun", type: "Static(Maha Shivaratri)", desc: "A serene image of a Shiva Lingam with an offering of simple soaked pulses or a satvik meal.", product: "All" },
//     { date: "18 Feb", day: "Wed", type: "Reel/static", desc: "A terrace scene. Spreading a white cloth. Pouring the batter for Vadiyalu/Fryums. The bright sun hitting the wet batter. This marks the start of the pickle/fryum season.", product: "Idly rawa" },
//     { date: "20 Feb", day: "Fri", type: "Static", desc: "A study table with books and a bowl of roasted peanuts.", product: "peanuts." },
//     { date: "23 Feb", day: "Mon", type: "Reel", desc: "A time-lapse of batter fermenting and rising in a glass bowl. Showing the bubbles (fermentation).", product: "Husked Urad spilt" },
//     { date: "25 Feb", day: "Wed", type: "Carousal", desc: "\"Pick Your Team...\" Slide 1: Garelu with Chicken Curry. Slide 2: Garelu with Coconut Chutney. Slide 3: Garelu with Ginger Pickle. Slide 4: Comment below!", product: "Urad gota" },
//     { date: "27 Feb", day: "Fri", type: "Reel", desc: "The ultimate comfort. A bowl of hot rice. Pouring thick, yellow Toor Dal Sambar over it. Slow motion. Steam rising.", product: "Toor dal" }
//   ];

//   const rishikaData = [
//     { date: "Feb 2", day: "Mon", type: "Reel", desc: "\"The Study/Work Struggle.\" A student/employee falling asleep at their desk. They take a bite of Sunnundalu. Eyes pop open! Energy bar fills up on screen.", product: "Sunnundalu" },
//     { date: "Feb 4", day: "Wed", type: "Static Carousel", desc: "\"DIY Masala Papad.\" Slide 1: Plain Papad. Slide 2: Chopped onions, tomatoes, coriander. Slide 3: The final loaded Masala Papad.", product: "Papad" },
//     { date: "Feb 6", day: "Fri", type: "Reel (ASMR)", desc: "Extreme close-up. Frying a Papad. The oil bubbling. Breaking the papad, crunch. Dipping it in a spicy chutney.", product: "Papad" },
//     { date: "Feb 9", day: "Mon", type: "Static Creative", desc: "\"Team Papad or Team Sunnundalu?\" slide 1: creative visuals of sunnundalu Slide 2: visulas of papad, asking people what they love the most", product: "Sunnundalu" },
//     { date: "Feb 11", day: "Wed", type: "Reel", desc: "Two friends fighting over the last Sunnundalu. Freeze frame. Text: \"True Love is giving up the last piece.\"", product: "Sunnundalu" },
//     { date: "Feb 13", day: "Fri", type: "Reel (Valentine's Theme)", desc: "\"Ideas that won't fail.\" Showing a beautiful hamper of TDH Rishika Sweets being tied with a red ribbon.", product: "ALL" },
//     { date: "Feb 15", day: "Sun", type: "Static Image", desc: "peaceful image of a fast being broken. plate with fruits and Sunnundalu. linking with Maha shivarathri wishes", product: "ALL" },
//     { date: "Feb 18", day: "Wed", type: "Static Meme", desc: "\"Me waiting for the weekend\" (Skeleton image) vs \"Me when I hear a Papad frying\" (Dancing kid).", product: "Papad" },
//     { date: "Feb 20", day: "Fri", type: "Reel", desc: "\"The Ultimate Combo.\" A bowl of Maggi/Noodles. Crushing a Papad on top of it for texture.", product: "Papad" },
//     { date: "Feb 23", day: "Mon", type: "Static Carousel", desc: "\"What's Inside?\" A dissection of a Sunnundalu. Graphic pointing to ingredients: Urad Dal (Protein), Ghee (Good Fats), Jaggery (Iron).", product: "Sunnundalu" },
//     { date: "Feb 25", day: "Wed", type: "UGC / Repost", desc: "A collage of people eating Sunnundalu at a wedding or event. Reposting customer stories.", product: "ALL" },
//     { date: "Feb 27", day: "Fri", type: "Static Carousel", desc: "\"3 ways to eat a Papad.\" Slide 1: Roasted (Healthy). Slide 2: Fried (Classic). Slide 3: Crushed in Curd Rice (Comfort).", product: "ALL" }
//   ];

//   const milletData = [
//     { date: "Feb 2", day: "Mon", type: "Reel", desc: "Fast cuts: Lacing up running shoes -> Pouring sweat -> Opening a pack of Millet Cookies. Text overlay: \"Pre-workout? Post-workout? Mid-lecture? We got you.\"", product: "Cookies" },
//     { date: "Feb 4", day: "Wed", type: "Static", desc: "Focus on the color Yellow, A bowl of Millet Pasta tossed in turmeric/saffron sauce, placed near a stack of books.", product: "Pasta" },
//     { date: "Feb 6.", day: "Fri", type: "Reel (ASMR)", desc: "\"Late Night Cravings 101.\" Showing Millet Noodles being cooked in 5 mins. Adding chili oil, sesame seeds, and a fried egg. Slurping sound at the end.", product: "Noodles" },
//     { date: "Feb 9", day: "Mon", type: "Carousel (Graphic)", desc: "\"Millet vs. Maida: The Vibe Check.\" Slide 1 (Maida): \"The Toxic Ex\" (Bloating, crash, tired). Slide 2 (Millet): \"The Green Flag\" (Energy, glow, stamina).", product: "All" },
//     { date: "Feb 11", day: "Wed", type: "Reel", desc: "Cinematic shots of different millets falling like rain. Transition to a cooked Millet Pasta dish. Text: \"Ancient Grains, Modern Gains.\"", product: "Pasta" },
//     { date: "Feb 13", day: "Fri", type: "Reel (POV - Valentine's Theme)", desc: "POV: Cooking dinner for your date. Plating Millet Pasta beautifully with candles. Text: \"Impressing them with my health game.\"", product: "Pasta" },
//     { date: "Feb 16", day: "Mon", type: "Static Image", desc: "A minimalist, aesthetic shot of a single pack of Millet Noodles/Soup. Sharp shadows. High contrast.", product: "Noodles" },
//     { date: "Feb 18", day: "Photo", desc: "A flatlay of a laptop, a notebook, and a bowl of Millet Cookies. Text: \"Fuel for the finals.\"", product: "Cookies" },
//     { date: "Feb 20", day: "Fri", type: "Reel", desc: "A fitness influencer trying to 'weight lift' using a heavy bag of Millet Noodles packs. Laughs and then sits down to eat. Text: \"I lift, I eat, I repeat.\"", product: "Noodles" },
//     { date: "Feb 23", day: "Mon", type: "Reel", desc: "\"POV: You think healthy food is boring.\" Person looks skeptical -> Takes a bite of Spicy Schezwan Millet Noodles -> Eyes widen -> Starts eating faster.", product: "Noodles" },
//     { date: "Feb 25", day: "Wed", type: "Carousel", desc: "\"Eat Good, Do Good.\" Slide 1: Millets use less water. Slide 2: Millets need fewer chemicals. Slide 3: You saving the planet one bite at a time.", product: "All" },
//     { date: "Feb 27", day: "Fri", type: "Reel", desc: "A group of friends gaming/chilling. A big bowl of Millet Pasta (Nachos style?) being passed around.", product: "Pasta" }
//   ];

//   const milletAdditional = [
//     { date: "Additional", day: "-", type: "Reel", desc: "The \"Internal Skincare\" Routine Start with a dull, grey morning filter. A scoop of \"Greens\" hits clear water. Whoosh sound effect. The water turns vibrant emerald green. Cut to a scoop of \"Reds\" or \"Beets\" hitting water. Boom sound. Vibrant ruby red. Fast cut to the user drinking it and the filter changing to bright/saturated glow.", product: "WELLNESS POWDERS" },
//     { date: "Additional", day: "-", type: "Reel", desc: "Extreme ASMR Crunch: Extreme close-up of a Freeze-Dried Strawberry. The user bites into it. CRUNCH (Amplified sound). Show the texture it's airy and crisp, not sticky. Show a Jamun (Black Plum). Crunch it. Text on screen: \"Yes, Crunchy Jamun exists!\" End with tossing the fruits into a gym bag.", product: "Freezed dryfruits" },
//     { date: "Additional", day: "-", type: "Reel", desc: "Don't show it boiling in a steel pot (too old school). Show a modern lifestyle: a glass jar, some ice, a splash of almond milk/milk, a banana, a spoonful of peanut butter, and the Health Mix powder. Shake it up. Top with the freeze-dried strawberries. Take a sip. Text: \"The 2-minute breakfast for the 100mph life.\"", product: "Health Mix" }
//   ];

//   const renderTable = (data: any[], sectionTitle: string | null = null) => (
//     <div className="mb-10">
//       {sectionTitle && (
//         <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b-2 border-slate-100 pb-2 uppercase tracking-tighter">
//           <Sparkles className="text-blue-500" size={22} />
//           {sectionTitle}
//         </h3>
//       )}
//       <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
//         <table className="w-full text-left border-collapse table-fixed">
//           <thead className="bg-slate-50 border-b border-slate-200">
//             <tr>
//               <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[15%]">Date / Day</th>
//               <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[18%]">Content Type</th>
//               <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[47%]">Content Description</th>
//               <th className="px-8 py-5 text-[12px] font-black text-slate-500 uppercase tracking-widest w-[20%]">Focused Product</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {data.map((item, idx) => (
//               <tr key={idx} className="hover:bg-slate-50/50 transition-all duration-150 group">
//                 <td className="px-8 py-8 align-top">
//                   <div className="font-black text-base leading-none mb-1 text-slate-900">{item.date}</div>
//                   <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.day}</div>
//                 </td>
//                 <td className="px-8 py-8 align-top">
//                   <div className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-colors ${
//                     item.type?.toLowerCase().includes('valentine') ? 'bg-rose-50 text-rose-700 border-rose-100' :
//                     item.type?.toLowerCase().includes('reel') ? 'bg-purple-50 text-purple-700 border-purple-100' : 
//                     item.type?.toLowerCase().includes('carousal') || item.type?.toLowerCase().includes('carousel') ? 'bg-blue-50 text-blue-700 border-blue-100' : 
//                     'bg-slate-50 text-slate-600 border-slate-200'
//                   }`}>
//                     {(item.type?.toLowerCase().includes('reel') || item.type?.toLowerCase().includes('valentine')) && <PlayCircle size={12} className="mr-2" />}
//                     {item.type}
//                   </div>
//                 </td>
//                 <td className="px-8 py-8 align-top">
//                   <p className="text-sm leading-[1.8] font-medium pr-4 text-slate-600">
//                     {item.desc}
//                   </p>
//                 </td>
//                 <td className="px-8 py-8 align-top">
//                   <div className="text-[10px] font-black border px-3 py-1.5 rounded-md inline-block uppercase tracking-[0.15em] shadow-sm text-blue-600/70 bg-blue-50/50 border-blue-100">
//                     {item.product}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#FDFDFF] p-6 md:p-12 font-sans antialiased text-slate-900">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-14 text-center">
//           <div className="inline-flex items-center justify-center p-3 bg-white shadow-md rounded-2xl mb-6 border border-slate-100">
//             <Calendar className="text-blue-600" size={28} />
//           </div>
//           <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
//             TDH Calendar 2026 <span className="text-blue-600">—</span> FEB
//           </h1>
//           <p className="mt-4 text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">
//             Integrated Media Planning & Strategy
//           </p>
//           <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mt-6 rounded-full opacity-30"></div>
//         </header>

//         <nav className="flex flex-wrap gap-3 mb-12 justify-center sticky top-6 z-20">
//           <div className="bg-white/80 backdrop-blur-xl p-2 rounded-[24px] shadow-2xl border border-slate-200/50 flex flex-wrap gap-2 justify-center">
//             <button 
//               onClick={() => setActiveTab('pd')}
//               className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${activeTab === 'pd' ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 -translate-y-0.5' : 'bg-transparent text-slate-500 hover:bg-slate-50'}`}
//             >
//               Tenali Double Horse P&D
//             </button>
//             <button 
//               onClick={() => setActiveTab('rishika')}
//               className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${activeTab === 'rishika' ? 'bg-orange-600 text-white shadow-xl shadow-orange-200 -translate-y-0.5' : 'bg-transparent text-slate-500 hover:bg-slate-50'}`}
//             >
//               TDH RISHIKA
//             </button>
//             <button 
//               onClick={() => setActiveTab('millet')}
//               className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${activeTab === 'millet' ? 'bg-emerald-700 text-white shadow-xl shadow-emerald-200 -translate-y-0.5' : 'bg-transparent text-slate-500 hover:bg-slate-50'}`}
//             >
//               Millet Marvels
//             </button>
//           </div>
//         </nav>

//         <main className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
//           {activeTab === 'pd' && (
//             <div className="space-y-6">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-8 rounded-[32px] mb-10 shadow-2xl border border-slate-800">
//                 <div className="flex items-center gap-6">
//                   <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
//                     <CheckCircle2 size={32} className="text-blue-400" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-black uppercase tracking-tight">Tenali Double Horse (P&D)</h2>
//                     <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.3em] mt-1">Premium Pulses & Dals Portfolio</p>
//                   </div>
//                 </div>
//                 <div className="px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-full">
//                    <span className="text-[10px] font-black uppercase tracking-widest">February Content Pipeline</span>
//                 </div>
//               </div>
//               {renderTable(pdData)}
//             </div>
//           )}

//           {activeTab === 'rishika' && (
//             <div className="space-y-6">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-orange-700 text-white p-8 rounded-[32px] mb-10 shadow-2xl border border-orange-600">
//                 <div className="flex items-center gap-6">
//                   <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
//                     <CheckCircle2 size={32} className="text-orange-200" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-black uppercase tracking-tight">TDH Rishika</h2>
//                     <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.3em] mt-1">Confectionery & Sweets Portfolio</p>
//                   </div>
//                 </div>
//                 <div className="px-6 py-3 bg-orange-500/20 border border-orange-400/30 rounded-full">
//                    <span className="text-[10px] font-black uppercase tracking-widest">February Content Pipeline</span>
//                 </div>
//               </div>
//               {renderTable(rishikaData)}
//             </div>
//           )}

//           {activeTab === 'millet' && (
//             <div className="space-y-6">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-900 text-white p-8 rounded-[32px] mb-10 shadow-2xl border border-emerald-800">
//                 <div className="flex items-center gap-6">
//                   <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
//                     <CheckCircle2 size={32} className="text-emerald-400" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-black uppercase tracking-tight">Millet Marvels</h2>
//                     <p className="text-[10px] opacity-60 uppercase font-black tracking-[0.3em] mt-1">Health & Wellness Portfolio</p>
//                   </div>
//                 </div>
//                 <div className="px-6 py-3 bg-emerald-500/20 border border-emerald-400/30 rounded-full">
//                    <span className="text-[10px] font-black uppercase tracking-widest">February Content Pipeline</span>
//                 </div>
//               </div>
              
//               {renderTable(milletData, "MAIN CONTENT TABLE")}
              
//               <div className="mt-20">
//                 <div className="h-px bg-slate-200 w-full mb-12"></div>
//                 {renderTable(milletAdditional, "ADDITIONAL CONTENTS")}
//               </div>
//             </div>
//           )}
//         </main>

//         <footer className="mt-24 py-12 border-t border-slate-200 text-center">
//           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
//             Tenali Double Horse Group • Proprietary Planning Framework • 2026
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default TDHCalendar2026FEB;