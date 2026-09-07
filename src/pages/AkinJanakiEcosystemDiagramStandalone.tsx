import React, { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { LayoutDashboard, Mail, AlertCircle, Loader2, ChevronRight } from 'lucide-react';
// Local user data type for simple auth handling
import bgLockImage from '../components/assets/logos/bg-for-lock.png';
import magsmennewlogo from '../components/assets/logos/magsmen-new-logo-black-horizontal-landscape.png';

type UserData = {
    email: string;
    name?: string;
    password?: string;
};

export default function AkinJanakiEcosystemDiagramStandalone() {

    // Authentication / Registration state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);



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

  try {
    // 🔥 ALWAYS send email (both new + existing users)
    await emailjs.send(
      'service_9gmlg2q',
      'template_p0q050i',
      { email },
      '-ePIcI6qQCURx5hAM'
    );

    if (existingUser) {
      setSuccessMessage('Welcome back.');
      setTimeout(() => setIsLoggedIn(true), 800);
    } else {
      saveUser({ email });
      setSuccessMessage('Registered successfully.');
      setTimeout(() => setIsLoggedIn(true), 1000);
    }

  } catch (err) {
    setError('Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
  
  if (!isLoggedIn) {
    return (
         <div
       className="relative min-h-screen bg-cover 
                  bg-[position:90%_center] 
                  md:bg-center 
                  flex items-center justify-center md:justify-end 
                  p-4 md:p-6 font-sans"
       style={{
         backgroundImage: `url(${bgLockImage})`,
       }}
     >
           {/* Optional overlay for better readability */}
           <div className="absolute inset-0 bg-black/20"></div>
     
           {/* LOGIN CARD */}
           <div className="relative w-full max-w-md mr-0 md:mr-28 ">
             <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
     
               <div className="flex flex-col items-center mb-8 text-center">
                 <div className="p-4 bg-slate-100 rounded-2xl mb-4 text-[#1E293B]">
                   <LayoutDashboard className="w-8 h-8" />
                 </div>
                 <h1 className="text-xl font-bold text-[#1E293B] uppercase">
                   Ecosystem Dashboard
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
         </div>
       );
  }

  return (
    <div className="min-h-screen w-full bg-[#fbfbf9] text-[#1e1e1e] font-sans antialiased p-4 md:p-8 lg:p-12 selection:bg-[#16352a] selection:text-white">
      <div className="max-w-[1540px] mx-auto space-y-10">

        {/* HEADER SECTION */}
        <header className="border-b border-gray-300 pb-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
            <div>
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase block mb-1">
                FROM POTENTIAL TO ENDURING IMPACT
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-black">
                Akin Analytics <span className="font-light text-gray-400">×</span> Janaki Pulaparthi
              </h1>
              <p className="text-sm md:text-base font-semibold text-gray-800 mt-2">
                An Integrated Ecosystem for a Stronger Company, a Credible Founder, and a Larger National Impact
              </p>
              <p className="text-xs md:text-sm text-gray-500 italic mt-0.5">
                Two tracks. One evidence system. A self-reinforcing ecosystem.
                          </p>
                      </div>
                      <div className="text-left lg:text-right shrink-0">
                          <img
                              src={magsmennewlogo}
                              alt="Brand Logo"
                              className="h-8 w-auto object-contain mr-auto ml-0 lg:mx-auto pb-2"
                          />
                          <span className="text-[10px] tracking-[0.25em] font-bold text-gray-500 uppercase block">
                              STRATEGY · BRANDS · GROWTH · IMPACT
                          </span>
                          <span className="text-xs text-gray-400 italic block mt-1">
                              Ideas that build what's next.
                          </span>
            </div>
          </div>
        </header>

        {/* ROW 1: SECTIONS 01, 02, 03, 04 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: 01 CONTEXT & 02 CORE CHALLENGE */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* 01 CONTEXT */}
            <section className="space-y-4">
              <div>
                <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                  01 CONTEXT
                </h2>
                <p className="text-xs text-gray-500">A favourable market. A defining moment.</p>
              </div>

              <div className="space-y-3.5 text-xs text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-black text-xs">Market growth</h3>
                  <p className="mt-0.5 text-gray-600">
                    Indian drone market projected to grow from US$0.47B (2025) to US$1.39B (2030), 24.4% CAGR.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black text-xs">Policy tailwinds</h3>
                  <p className="mt-0.5 text-gray-600">
                    Drone Rules 2021, PLI scheme, 2022 import ban, women drone pilot programme (₹1,200+ Cr).
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black text-xs">Rising competition</h3>
                  <p className="mt-0.5 text-gray-600">
                    500+ Indian drone startups. Certification and capital will decide survival.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black text-xs">Strategic opportunity</h3>
                  <p className="mt-0.5 text-gray-600">
                    A differentiated, women-led, dual-use manufacturer with real proof — if structured, scaled and communicated right.
                  </p>
                </div>
              </div>
            </section>

            {/* 02 CORE CHALLENGE */}
            <section className="space-y-3 pt-2">
              <div>
                <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                  02 CORE CHALLENGE
                </h2>
                <p className="text-xs text-gray-500">Two symptoms. One underlying issue.</p>
              </div>

              <div className="bg-[#f2efe9] rounded-md p-3.5 space-y-1">
                <h3 className="font-bold text-xs text-gray-900">Akin Analytics</h3>
                <p className="text-[11px] leading-relaxed text-gray-700">
                  Narrative outruns evidence. Independent proof, digital estate and message discipline lag ambition.
                </p>
              </div>

              <div className="bg-[#f2efe9] rounded-md p-3.5 space-y-1">
                <h3 className="font-bold text-xs text-gray-900">Janaki Pulaparthi</h3>
                <p className="text-[11px] leading-relaxed text-gray-700">
                  Credible founder, but one credential needs correction and one impact claim is not yet documented.
                </p>
              </div>

              <div className="bg-[#16352a] text-white rounded-md p-4 space-y-1 shadow-sm">
                <span className="text-[9px] font-bold tracking-widest uppercase text-emerald-300 block">
                  GOVERNING PRINCIPLE
                </span>
                <p className="text-xs font-bold leading-snug">
                  Nothing enters either track until it is documented.
                </p>
              </div>
            </section>
          </div>

          {/* MIDDLE COLUMN: 03 THE ECOSYSTEM ARCHITECTURE */}
          <section className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full text-left mb-2">
              <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                03 THE ECOSYSTEM ARCHITECTURE
              </h2>
              <p className="text-xs text-gray-500">People. Partners. Proof. Possibilities.</p>
            </div>

            <div className="w-full max-w-[480px] py-4">
              <svg viewBox="0 0 500 450" className="w-full h-auto overflow-visible select-none">
                {/* Connecting Web Lines */}
                <g stroke="#d5d3cb" strokeWidth="1" strokeDasharray="2,2">
                  <line x1="250" y1="75" x2="250" y2="235" />
                  <line x1="180" y1="120" x2="215" y2="235" />
                  <line x1="320" y1="120" x2="285" y2="235" />
                  <line x1="140" y1="210" x2="215" y2="235" />
                  <line x1="360" y1="210" x2="285" y2="235" />
                  <line x1="150" y1="315" x2="215" y2="235" />
                  <line x1="350" y1="315" x2="285" y2="235" />
                  <line x1="210" y1="375" x2="250" y2="235" />
                  <line x1="290" y1="375" x2="250" y2="235" />
                </g>

                {/* Venn Outline Circle Left: Akin Analytics */}
                <circle cx="215" cy="235" r="75" fill="none" stroke="#1e1e1e" strokeWidth="1.5" />
                
                {/* Venn Outline Circle Right: Janaki Pulaparthi */}
                <circle cx="285" cy="235" r="75" fill="none" stroke="#1e1e1e" strokeWidth="1.5" />

                {/* Overlap Solid Center */}
                <clipPath id="venn-clip">
                  <circle cx="215" cy="235" r="75" />
                </clipPath>
                <circle cx="285" cy="235" r="75" clipPath="url(#venn-clip)" fill="#16352a" />

                {/* Center Core Text */}
                <text x="250" y="230" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold" letterSpacing="0.05em">
                  DOCUMENTED
                </text>
                <text x="250" y="242" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold" letterSpacing="0.05em">
                  PROOF
                </text>
                <text x="250" y="254" textAnchor="middle" fill="#93c5b5" fontSize="5.5">
                  The foundation for both tracks.
                </text>

                {/* Venn Left Label */}
                <text x="175" y="232" textAnchor="middle" fill="#111" fontSize="9" fontWeight="bold">Akin</text>
                <text x="175" y="243" textAnchor="middle" fill="#111" fontSize="9" fontWeight="bold">Analytics</text>
                <text x="175" y="253" textAnchor="middle" fill="#777" fontSize="5.5">Corporate Repositioning</text>

                {/* Venn Right Label */}
                <text x="325" y="232" textAnchor="middle" fill="#111" fontSize="9" fontWeight="bold">Janaki</text>
                <text x="325" y="243" textAnchor="middle" fill="#111" fontSize="9" fontWeight="bold">Pulaparthi</text>
                <text x="325" y="253" textAnchor="middle" fill="#777" fontSize="5.5">Personal Authority & Stature</text>

                {/* Surrounding Nodes */}
                {/* Top: Customers */}
                <circle cx="250" cy="50" r="13" fill="#dfdacb" />
                <text x="250" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">C</text>
                <text x="250" y="70" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Customers</text>
                <text x="250" y="79" textAnchor="middle" fontSize="6" fill="#666">Agri, Defence, Govt.</text>

                {/* Top Left: Government */}
                <circle cx="180" cy="100" r="13" fill="#dfdacb" />
                <text x="180" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">G</text>
                <text x="180" y="120" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Government</text>
                <text x="180" y="129" textAnchor="middle" fontSize="6" fill="#666">Policy & Schemes</text>

                {/* Top Right: Suppliers & Manufacturing */}
                <circle cx="320" cy="100" r="13" fill="#dfdacb" />
                <text x="320" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">S</text>
                <text x="320" y="120" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Suppliers &</text>
                <text x="320" y="129" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Manufacturing</text>
                <text x="320" y="138" textAnchor="middle" fontSize="6" fill="#666">Partners</text>

                {/* Mid Left: Regulators */}
                <circle cx="140" cy="190" r="13" fill="#dfdacb" />
                <text x="140" y="194" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">R</text>
                <text x="140" y="210" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Regulators</text>
                <text x="140" y="219" textAnchor="middle" fontSize="6" fill="#666">DGCA, Others</text>

                {/* Mid Right: Academic */}
                <circle cx="360" cy="190" r="13" fill="#dfdacb" />
                <text x="360" y="194" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">A</text>
                <text x="360" y="210" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Academic & Research</text>
                <text x="360" y="219" textAnchor="middle" fontSize="6" fill="#666">Institutions</text>

                {/* Bottom Left: Investors */}
                <circle cx="150" cy="295" r="13" fill="#dfdacb" />
                <text x="150" y="299" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">I</text>
                <text x="150" y="315" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Investors</text>
                <text x="150" y="324" textAnchor="middle" fontSize="6" fill="#666">Venture, Strategic, Public</text>

                {/* Bottom Right: Media */}
                <circle cx="350" cy="295" r="13" fill="#dfdacb" />
                <text x="350" y="299" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">M</text>
                <text x="350" y="315" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Media</text>
                <text x="350" y="324" textAnchor="middle" fontSize="6" fill="#666">National, Trade, Digital</text>

                {/* Bottom Center-Left: Industry Forums */}
                <circle cx="210" cy="355" r="13" fill="#dfdacb" />
                <text x="210" y="359" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">I</text>
                <text x="210" y="375" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Industry / Policy Forums</text>
                <text x="210" y="384" textAnchor="middle" fontSize="6" fill="#666">Thought Leadership</text>

                {/* Bottom Center-Right: Communities */}
                <circle cx="290" cy="355" r="13" fill="#dfdacb" />
                <text x="290" y="359" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">C</text>
                <text x="290" y="375" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#222">Communities</text>
                <text x="290" y="384" textAnchor="middle" fontSize="6" fill="#666">SHGs, Local Ecosystems</text>
              </svg>
            </div>

            {/* Magsmen attribution under Venn */}
            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-gray-900">Magsmen Strategy Consultants</p>
              <p className="text-[10px] text-gray-500">Strategy, Execution, Governance</p>
              <div className="flex items-center justify-center gap-3 pt-2 text-[9px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-4 h-[1px] bg-gray-700"></span> Direct relationship</span>
                <span className="flex items-center gap-1"><span className="w-4 h-[1px] bg-gray-400"></span> Influence</span>
                <span className="flex items-center gap-1"><span className="w-4 h-[1px] border-b border-dashed border-gray-400"></span> Validation</span>
                <span className="flex items-center gap-1"><span className="w-4 h-[1px] border-b border-dotted border-gray-400"></span> Strategic dependency</span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: 04 TWO STRATEGIC TRACKS */}
          <section className="lg:col-span-4 space-y-4">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                04 TWO STRATEGIC TRACKS
              </h2>
              <p className="text-xs text-gray-500">Distinct focus. Shared system. Compounding impact.</p>
            </div>

            {/* Track Comparison Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f4f2ec] rounded p-3 text-center">
                <span className="text-[9px] font-bold tracking-wider text-gray-400 block uppercase">TRACK 01</span>
                <h3 className="text-xs font-bold text-black mt-0.5">Akin Analytics</h3>
                <p className="text-[10px] text-gray-600 mt-1 leading-snug">
                  From a drone company to India's decision intelligence company.
                </p>
              </div>

              <div className="bg-[#f4f2ec] rounded p-3 text-center">
                <span className="text-[9px] font-bold tracking-wider text-gray-400 block uppercase">TRACK 02</span>
                <h3 className="text-xs font-bold text-black mt-0.5">Janaki Pulaparthi</h3>
                <p className="text-[10px] text-gray-600 mt-1 leading-snug">
                  From founder visibility to independent domain authority.
                </p>
              </div>
            </div>

            {/* Track Dimensions Matrix */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Positioning</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Decision intelligence for agriculture and defence.
                </p>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Correct & Consolidate</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Resolve Forbes framing and training-number claim.
                </p>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Proof Architecture</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Consolidate, document and publish existing proof.
                </p>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Position</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Three pillars: manufacturing, women in deep tech, ground-level impact.
                </p>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Scale & Commercialisation</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Manufacturing, deployment, training, sector focus.
                </p>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Activate</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  LinkedIn, long-form content, forums, independent speaking.
                </p>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Brand & Digital</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  One voice, one narrative, independent presence.
                </p>
              </div>

              <div className="space-y-0.5">
                <h4 className="font-bold text-gray-900 text-[11px]">Sustain</h4>
                <p className="text-[11px] text-gray-600 leading-snug">
                  Independent authority, search clarity, consistent presence.
                </p>
              </div>
            </div>

            {/* Shared Governance Layer Banner */}
            <div className="bg-[#f4f2ec] rounded p-3 text-center space-y-1 mt-2">
              <h4 className="font-bold text-xs text-gray-900">Shared Governance Layer</h4>
              <p className="text-[10px] text-gray-600 leading-relaxed">
                Evidence checks · Data governance · Reputation risk management<br />
                Integrated sequencing · Quarterly review
              </p>
            </div>
          </section>
        </div>

        {/* SECTION 05: THE OUTCOME (GREEN BANNER) */}
        <section className="bg-[#16352a] text-white rounded-lg p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-emerald-400">
              05 THE OUTCOME
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              Mutually reinforcing. Independently credible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 text-xs leading-relaxed">
            <div>
              <h3 className="font-bold text-sm text-white mb-1.5">Akin Analytics</h3>
              <p className="text-gray-300">
                Proof-led, two-category focus (agriculture + defence), stronger brand equity.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white mb-1.5">Together</h3>
              <p className="text-gray-300">
                A trusted ecosystem that creates economic, social and strategic value for India.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white mb-1.5">Janaki Pulaparthi</h3>
              <p className="text-gray-300">
                Independent, evidence-led domain authority in policy, manufacturing and agri-tech.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#264b3d] text-center">
            <p className="text-xs italic text-gray-300">
              Her authority should be able to stand on its own the day Akin has a difficult quarter.
            </p>
          </div>
        </section>

        {/* ROW 3: SECTIONS 06, 07, 08 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 06 KEY GOVERNANCE GATES */}
          <section className="lg:col-span-3 space-y-3">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                06 KEY GOVERNANCE GATES
              </h2>
              <p className="text-xs text-gray-500">Non-negotiable. Precede scale.</p>
            </div>

            <div className="space-y-2.5">
              <div className="bg-white border border-gray-200/90 rounded-md p-3 shadow-xs">
                <h3 className="text-xs font-bold text-gray-900">01 · Credential Correction</h3>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                  Replace Forbes framing with accurate attribution.
                </p>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-2 block">
                  JANAKI + MAGSMEN · WEEK 1
                </span>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-md p-3 shadow-xs">
                <h3 className="text-xs font-bold text-gray-900">02 · Impact Claim</h3>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                  Document training numbers precisely or retire the figure.
                </p>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-2 block">
                  AKIN OPERATIONS · WEEK 2
                </span>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-md p-3 shadow-xs">
                <h3 className="text-xs font-bold text-gray-900">03 · Data Governance</h3>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                  Publish privacy policy and data-handling statement.
                </p>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-2 block">
                  AKIN + MAGSMEN · WEEK 4
                </span>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-md p-3 shadow-xs">
                <h3 className="text-xs font-bold text-gray-900">04 · Key Person Concentration</h3>
                <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                  Name a visible second-tier leadership presence.
                </p>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-2 block">
                  AKIN LEADERSHIP · MONTH 6
                </span>
              </div>
            </div>
          </section>

          {/* 07 12-MONTH INTEGRATED ROADMAP */}
          <section className="lg:col-span-5 space-y-3">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                07 12-MONTH INTEGRATED ROADMAP
              </h2>
              <p className="text-xs text-gray-500">Sequenced execution across both tracks.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 rounded-md overflow-hidden border border-gray-200 shadow-xs">
              
              {/* Weeks 1–4 */}
              <div className="flex flex-col bg-white">
                <div className="bg-[#16352a] text-white p-2.5">
                  <span className="text-xs font-bold block">Weeks 1–4</span>
                  <span className="text-[10px] text-gray-300 font-normal">Foundation</span>
                </div>
                <div className="p-3 text-[11px] text-gray-700 space-y-2 flex-1">
                  <p>Privacy policy</p>
                  <p>Domain consolidation</p>
                  <p>Forbes correction</p>
                  <p>Discover audits</p>
                </div>
              </div>

              {/* Weeks 5–12 */}
              <div className="flex flex-col bg-white border-l border-gray-200">
                <div className="bg-[#244b3c] text-white p-2.5">
                  <span className="text-xs font-bold block">Weeks 5–12</span>
                  <span className="text-[10px] text-gray-300 font-normal">Build</span>
                </div>
                <div className="p-3 text-[11px] text-gray-700 space-y-2 flex-1">
                  <p>One-sentence description</p>
                  <p>YouTube launch</p>
                  <p>Training claim resolution</p>
                  <p>Content pillars locked</p>
                </div>
              </div>

              {/* Months 4–6 */}
              <div className="flex flex-col bg-white border-l border-gray-200">
                <div className="bg-[#3b6553] text-white p-2.5">
                  <span className="text-xs font-bold block">Months 4–6</span>
                  <span className="text-[10px] text-gray-300 font-normal">Scale</span>
                </div>
                <div className="p-3 text-[11px] text-gray-700 space-y-2 flex-1">
                  <p>Case studies</p>
                  <p>Sector narrowing</p>
                  <p>LinkedIn rebuild</p>
                  <p>Personal domain</p>
                </div>
              </div>

              {/* Months 7–12 */}
              <div className="flex flex-col bg-white border-l border-gray-200">
                <div className="bg-[#0f1f18] text-white p-2.5">
                  <span className="text-xs font-bold block">Months 7–12</span>
                  <span className="text-[10px] text-gray-300 font-normal">Leadership</span>
                </div>
                <div className="p-3 text-[11px] text-gray-700 space-y-2 flex-1">
                  <p>Certification visibility</p>
                  <p>Second-tier leadership</p>
                  <p>Independent speaking</p>
                  <p>Citation building</p>
                </div>
              </div>
            </div>
          </section>

          {/* 08 THE STRATEGIC FLYWHEEL */}
          <section className="lg:col-span-4 space-y-3">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-gray-900 uppercase">
                08 THE STRATEGIC FLYWHEEL
              </h2>
              <p className="text-xs text-gray-500">A compounding cycle.</p>
            </div>

            <div className="w-full flex items-center justify-center py-2">
              <svg viewBox="0 0 340 340" className="w-full max-w-[310px] h-auto overflow-visible select-none">
                {/* Outer Dashed Orbit */}
                <circle 
                  cx="170" 
                  cy="170" 
                  r="120" 
                  fill="none" 
                  stroke="#cfcbbe" 
                  strokeWidth="2.5" 
                  strokeDasharray="4 6" 
                />

                {/* Node: More proof (Top) */}
                <text x="170" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  More proof
                </text>

                {/* Node: Trust (Top Right) */}
                <text x="295" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  Trust
                </text>

                {/* Node: Authority (Bottom Right) */}
                <text x="295" y="240" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  Authority
                </text>

                {/* Node: Visibility (Bottom) */}
                <text x="170" y="318" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  Visibility
                </text>

                {/* Node: Category leadership (Bottom Left) */}
                <text x="50" y="235" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  Category
                </text>
                <text x="50" y="248" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  leadership
                </text>

                {/* Node: Commercial / Institutional value (Top Left) */}
                <text x="50" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  Commercial /
                </text>
                <text x="50" y="118" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#111">
                  Institutional value
                </text>
              </svg>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-gray-300 pt-5 pb-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 gap-2">
          <div>
            <span>Magsmen Strategy Consultants</span>
            <span className="mx-2 text-gray-400">|</span>
            <span>Confidential</span>
          </div>
          <div>
            <span>India and Australia</span>
            <span className="mx-2 text-gray-400">|</span>
            <span>September 2026</span>
          </div>
        </footer>

      </div>
    </div>
  );
}