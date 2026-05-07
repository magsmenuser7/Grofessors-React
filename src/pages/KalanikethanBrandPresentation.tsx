import React, { useState, useEffect, useRef } from 'react';
import bgImage from "../components/assets/logos/Final Brand presentation for printing.png";
import {  FormEvent } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  TrendingUp, 
  Shield, 
  Zap, 
  Briefcase, 
  Mic, 
  Cpu, 
  Building, 
  Scale, 
  Award,
  Lightbulb
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { 
  Hexagon, 
  Layers, 
  Building2, 
  
  Compass, 
  Menu, 
  X, 
 
  Rocket, 
  PenTool, 
 
  Armchair, 
  UserCheck, 
  ShieldCheck, 
 
  Star, 
  Clock,
  AlertCircle,
  LayoutDashboard,
  Loader2,
  Mail
} from 'lucide-react';

// const LOGO_SRC = "/components/assets/logos/grofesion.png"
import logo from "../components/assets/logos/grofesion.png"

export default function KalanikethanBrandPresentation() {


type UserData = {
  email: string;
};

  const [activeSection, setActiveSection] = useState<string>('');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    remarks: ''
  });
  const [isApproved, setIsApproved] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100', 'translate-y-0');
          e.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal-elem').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  // Scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 200) {
          current = s.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleName = (name: string) => {
    if (name === 'Both Names') {
      setSelectedNames(['Kalavé', 'Saadi Mart']);
    } else {
      if (selectedNames.includes(name)) {
        setSelectedNames(selectedNames.filter((n) => n !== name));
      } else {
        setSelectedNames([...selectedNames, name]);
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitApproval = () => {
    const { name, designation, email, remarks } = formData;

    if (!name || !email) {
      alert('Please enter your name and email address to proceed.');
      return;
    }

    const namesStr = selectedNames.join(' and ');
    const ref = 'KLN-' + Date.now().toString(36).toUpperCase();
    const subject = encodeURIComponent('Name Approval: ' + namesStr + ' — Kalanikethan | ' + ref);
    const body = encodeURIComponent(
      'Brand Name Approval — Kalanikethan\n' +
      '===============================\n\n' +
      'Approved by: ' + name + '\n' +
      'Designation: ' + (designation || 'Not specified') + '\n' +
      'Email: ' + email + '\n' +
      'Reference: ' + ref + '\n\n' +
      'Approved Name(s): ' + namesStr + '\n\n' +
      'Remarks:\n' + (remarks || 'None') + '\n\n' +
      '---\n' +
      'Submitted via Kalanikethan Brand Presentation\n' +
      'Magsmen Brand Consultants · connect@magsmen.com'
    );

    window.location.href = `mailto:connect@magsmen.com?cc=${encodeURIComponent(email)}&subject=${subject}&body=${body}`;
    setIsApproved(true);
  };

  const scrollToApprove = () => {
    document.getElementById('s11')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Authentication / Registration state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dashboard State management
 

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
  backgroundImage: `url(${bgImage})`
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
      </div>
    );
  }

  return (
    <div className="font-['Jost',sans-serif] bg-[#FAF6EE] text-[#1A1410] overflow-x-hidden min-h-screen">
      {/* Global & Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&family=Noto+Serif+Telugu:wght@300;400;500&display=swap');
        
        html { scroll-behavior: smooth; }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        
        .anim-1 { animation: fadeUp 0.8s 0.1s both; }
        .anim-2 { animation: fadeUp 0.8s 0.25s both; }
        .anim-3 { animation: fadeUp 0.8s 0.4s both; }
        .anim-4 { animation: fadeUp 0.8s 0.55s both; }
        .anim-5 { animation: fadeUp 0.8s 0.7s both; }
        .anim-6 { animation: scaleIn 0.8s 0.3s both; }
        
        .grid-pat {
          position: absolute; inset: 0; opacity: 0.035; pointer-events: none;
          background-image: repeating-linear-gradient(0deg, transparent, transparent 70px, #C5A35A 70px, #C5A35A 71px),
                            repeating-linear-gradient(90deg, transparent, transparent 70px, #C5A35A 70px, #C5A35A 71px);
        }
        `
      }} />

      

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-[60px] py-[18px] bg-[#FDFAF4]/95 backdrop-blur-[14px] border-b-[0.5px] border-[#C5A35A]/20">
        <div className="flex items-center">
          <img src={logo} alt="Magsmen Brand Consultants" className="h-[62px] block" />
        </div>
        <div className="flex items-center gap-[32px]">
          <div className="hidden md:flex gap-[32px]">
            {['s1:Overview', 's2:Names', 's6:In-Store', 's8:Voice', 's11:Approve'].map((item) => {
              const [id, label] = item.split(':');
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`text-[11px] font-light tracking-[0.2em] uppercase transition-colors duration-300 ${
                    activeSection === id ? 'text-[#C5A35A]' : 'text-[#6B5744] hover:text-[#C5A35A]'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>
          <button
            onClick={scrollToApprove}
            className="text-[11px] font-normal tracking-[0.15em] uppercase bg-[#C5A35A] text-[#1A1410] border-none px-[24px] py-[10px] cursor-pointer transition-opacity duration-200 hover:opacity-85"
          >
            Approve Names
          </button>
        </div>
      </nav>

      {/* SLIDE 1: HERO */}
      <section id="s1" className="min-h-screen flex flex-col relative overflow-hidden bg-[#FDFAF4]">
        <div className="grid-pat"></div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-[80px] pt-[100px] pb-[120px] text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#C5A35A] border-[0.5px] border-[#C5A35A] px-[28px] py-[8px] mb-[56px] anim-1">
            Confidential Brand Presentation · Kalanikethan 2026
          </div>
          <div className="text-[clamp(68px,9vw,130px)] font-['Cormorant_Garamond',serif] font-light leading-[0.92] text-[#1A1410] anim-2">
            Two Names.<br /><em className="not-italic italic text-[#C5A35A]">One Truth.</em>
          </div>
          <div className="w-[1px] h-[72px] bg-[#C5A35A]/50 my-[48px] anim-3"></div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#6B5744] anim-4">
            Brand Identity · In-Store Experience · Communication Architecture
          </div>
          <div className="flex items-center justify-center gap-[64px] mt-[64px] anim-5">
            <div className="text-center">
              <div className="font-['Cormorant_Garamond',serif] text-[34px] font-light text-[#1A1410]">Kalavé</div>
              <span className="font-['Noto_Serif_Telugu',serif] text-[22px] text-[#C5A35A] block mt-[6px]">కలవే</span>
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#6B5744] mt-[10px]">Art Woven Into Being</div>
            </div>
            <div className="w-[1px] h-[80px] bg-[#C5A35A]/50"></div>
            <div className="text-center">
              <div className="font-['Cormorant_Garamond',serif] text-[34px] font-light text-[#1A1410]">Saadi Mart</div>
              <span className="font-['Noto_Serif_Telugu',serif] text-[18px] text-[#C5A35A] block mt-[6px]">సాడీ మార్ట్</span>
              <div className="text-[10px] tracking-[0.22em] uppercase text-[#6B5744] mt-[10px]">The Word Women Actually Use</div>
            </div>
          </div>
          <div className="absolute bottom-[60px] left-0 right-0 text-center">
            <div
              className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] opacity-60"
              style={{ animation: 'fadeUp 1s 1.8s both' }}
            >
              Scroll to explore · or use arrow keys
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 2: NAME ORIGINS */}
      <section id="s2" className="min-h-screen flex flex-col relative overflow-hidden bg-[#F2EAD8] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem  translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">01 · The Names</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#1A1410] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              Where Each Name<br /><em className="text-[#C5A35A] italic">Comes From</em>
            </div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms] text-[15px] font-light leading-[1.9] text-[#6B5744] max-w-[560px] mb-0">
            Two names found inside the culture. One a goddess name transformed. The other the word a grandmother uses.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] mt-[64px] flex-1 reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[550ms]">
            {/* Card 1 */}
            <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[60px_52px] relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C5A35A] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[36px]">Name 01</div>
              <div className="font-['Cormorant_Garamond',serif] text-[72px] font-light leading-none text-[#1A1410]">Kalavé</div>
              <span className="font-['Noto_Serif_Telugu',serif] text-[36px] text-[#C5A35A] block my-[10px] mb-[36px]">కలవే</span>
              <div className="flex gap-[36px] mb-[30px]">
                <div>
                  <div className="font-['Cormorant_Garamond',serif] text-[20px] text-[#C5A35A]">కళ · Kala</div>
                  <div className="text-[11px] text-[#6B5744] font-light mt-[4px] leading-[1.6]">Art · The sixty-four<br />divine arts · Beauty<br />created through skill</div>
                </div>
                <div>
                  <div className="font-['Cormorant_Garamond',serif] text-[20px] text-[#C5A35A]">వే · Vé</div>
                  <div className="text-[11px] text-[#6B5744] font-light mt-[4px] leading-[1.6]">To weave · The Telugu<br />root of all saree<br />creation</div>
                </div>
              </div>
              <div className="text-[13px] leading-[1.85] text-[#6B5744] font-light max-w-[440px]">
                The Lakshmi to Lakmé transformation applied to Kalavathi. Kala is one of the sixteen phases of the moon — each a quality of feminine grace. Vé is the ancient Telugu verb for weaving. Together: <em className="text-[#C5A35A] not-italic">the one who has woven beauty into being.</em>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B5744] border-t-[0.5px] border-[#C5A35A]/20 pt-[20px] mt-[28px]">
                Premium · Goddess lineage · Trademark defensible · Bilingual
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[60px_52px] relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C5A35A] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[36px]">Name 02</div>
              <div className="font-['Cormorant_Garamond',serif] text-[64px] font-light leading-none text-[#1A1410]">Saadi Mart</div>
              <span className="font-['Noto_Serif_Telugu',serif] text-[28px] text-[#C5A35A] block my-[10px] mb-[36px]">సాడీ మార్ట్</span>
              <div className="flex gap-[36px] mb-[30px]">
                <div>
                  <div className="font-['Cormorant_Garamond',serif] text-[20px] text-[#C5A35A]">సాడీ · Saadi</div>
                  <div className="text-[11px] text-[#6B5744] font-light mt-[4px] leading-[1.6]">The vernacular word<br />for saree · How women<br />speak to each other</div>
                </div>
                <div>
                  <div className="font-['Cormorant_Garamond',serif] text-[20px] text-[#C5A35A]">మార్ట్ · Mart</div>
                  <div className="text-[11px] text-[#6B5744] font-light mt-[4px] leading-[1.6]">A market of value<br />Curated access<br />Not mass</div>
                </div>
              </div>
              <div className="text-[13px] leading-[1.85] text-[#6B5744] font-light max-w-[440px]">
                Not "saree" the formal catalogue word. Sadi. The word spoken in kitchens, at mirrors, between mothers and daughters before a function. Every premium brand uses the formal word. <em className="text-[#C5A35A] not-italic">Saadi Mart speaks the way women actually speak.</em>
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B5744] border-t-[0.5px] border-[#C5A35A]/20 pt-[20px] mt-[28px]">
                Culturally intimate · Vernacular power · Category disruptor
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 3: MEANING ARCHITECTURE */}
      <section id="s3" className="min-h-screen flex flex-col relative overflow-hidden bg-[#1A1410] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem  translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">02 · Brand Architecture</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#FAF6EE] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              What Kalavé<br /><em className="text-[#C5A35A] italic">Carries</em>
            </div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms] text-[15px] font-light leading-[1.9] text-[#FAF6EE]/55 max-w-[560px]">
            A name this carefully rooted carries meaning across six simultaneous dimensions. Every one adds weight to the brand.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#C5A35A]/10 mt-[64px] flex-1 reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[550ms]">
            {[
              { num: '01', title: 'The Sixty-Four Arts', desc: 'In Sanskrit tradition, Kala refers to the sixty-four divine arts. One of them is the art of honest commercial exchange. Kalavé is the brand that restores an art that commerce forgot.' },
              { num: '02', title: 'The Weaving Root', desc: 'Vé is the Telugu root for weaving — the foundational act of creating a saree. The name contains the product. Every saree sold is literally a Kala Vé — beauty woven.' },
              { num: '03', title: 'The Lunar Phase', desc: 'Kala is one of the sixteen phases of the moon, each representing a quality of feminine grace. The brand aligns with a quality of womanhood, not just a product category.' },
              { num: '04', title: 'Goddess Lineage', desc: 'Kalavé follows the Lakshmi to Lakmé principle. Religious weight removed. Cultural resonance kept. Trademark space clean. The brand stands completely alone.' },
              { num: '05', title: 'Telugu Identity', desc: 'Sits naturally in Telugu speech, looks distinguished in calligraphy, and travels comfortably in English. Belongs to the AP and Telangana market without being limited to it.' },
              { num: '06', title: 'The Transparent Promise', desc: 'Kala means skill made visible. Transparent pricing is Kala applied to commerce. The name and the brand promise are the same thing expressed differently.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#1A1410] p-[48px_36px] transition-colors duration-300 hover:bg-[#221810]">
                <div className="font-['Cormorant_Garamond',serif] text-[44px] font-extralight text-[#C5A35A]/25 leading-none">{item.num}</div>
                <div className="font-['Cormorant_Garamond',serif] text-[24px] font-normal text-[#C5A35A] mt-[18px]">{item.title}</div>
                <div className="text-[13px] font-light leading-[1.9] text-[#FAF6EE]/55 mt-[14px]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 4: LOGO SYSTEM */}
      <section id="s4" className="min-h-screen flex flex-col relative overflow-hidden bg-[#F2EAD8] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem  translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">03 · Visual Identity</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#1A1410] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              The Logo<br /><em className="text-[#C5A35A] italic">System</em>
            </div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms] text-[15px] font-light leading-[1.9] text-[#6B5744] max-w-[560px]">
            Calligraphed identity in Telugu and English. Two equal originals — not a translation.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] mt-[64px] flex-1 reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[550ms]">
            {/* Panel 1 */}
            <div className="min-h-[320px] flex flex-col items-center justify-center p-[60px] relative bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20">
              <div className="font-['Cormorant_Garamond',serif] text-[60px] font-light leading-none text-center text-[#1A1410]">
                <span className="text-[#C5A35A] text-[13px] font-light tracking-[0.35em] uppercase block mb-[10px]">✦ · ✦</span>
                Kalavé
                <span className="font-['Noto_Serif_Telugu',serif] text-[26px] text-[#C5A35A] block mt-[6px]">కలవే</span>
                <span className="text-[10px] tracking-[0.25em] uppercase block mt-[16px] text-[#6B5744]/70 font-['Jost',sans-serif]">The Art of Honest Beauty</span>
              </div>
              <div className="absolute bottom-[20px] left-0 right-0 text-center text-[9px] tracking-[0.3em] uppercase text-[#6B5744]">Primary · Light</div>
            </div>
            
            {/* Panel 2 */}
            <div className="min-h-[320px] flex flex-col items-center justify-center p-[60px] relative bg-[#1A1410]">
              <div className="font-['Cormorant_Garamond',serif] text-[60px] font-light leading-none text-center text-[#FAF6EE]">
                <span className="text-[#C5A35A]/45 text-[13px] font-light tracking-[0.35em] uppercase block mb-[10px]">✦ · ✦</span>
                Kalavé
                <span className="font-['Noto_Serif_Telugu',serif] text-[26px] text-[#C5A35A] block mt-[6px]">కలవే</span>
                <span className="text-[10px] tracking-[0.25em] uppercase block mt-[16px] text-[#C5A35A]/50 font-['Jost',sans-serif]">The Art of Honest Beauty</span>
              </div>
              <div className="absolute bottom-[20px] left-0 right-0 text-center text-[9px] tracking-[0.3em] uppercase text-[#FAF6EE]/30">Primary · Dark</div>
            </div>
            
            {/* Panel 3 */}
            <div className="min-h-[320px] flex flex-col items-center justify-center p-[60px] relative bg-[#C5A35A]">
              <div className="font-['Cormorant_Garamond',serif] text-[60px] font-light leading-none text-center text-[#1A1410]">
                <span className="text-[#1A1410]/40 text-[13px] font-light tracking-[0.35em] uppercase block mb-[10px]">✦ · ✦</span>
                Kalavé
                <span className="font-['Noto_Serif_Telugu',serif] text-[26px] text-[#3D2E1E] block mt-[6px]">కలవే</span>
                <span className="text-[10px] tracking-[0.25em] uppercase block mt-[16px] text-[#1A1410]/50 font-['Jost',sans-serif]">The Art of Honest Beauty</span>
              </div>
              <div className="absolute bottom-[20px] left-0 right-0 text-center text-[9px] tracking-[0.3em] uppercase text-[#1A1410]/40">Gold · Special Use</div>
            </div>
            
            {/* Panel 4 */}
            <div className="min-h-[320px] flex flex-col items-center justify-center p-[60px] relative bg-[#2A1F14]">
              <div className="font-['Cormorant_Garamond',serif] font-light leading-none text-center text-[#FAF6EE]">
                <span className="text-[#C5A35A]/45 text-[13px] font-light tracking-[0.35em] uppercase block mb-[10px]">✦ · ✦</span>
                <span className="text-[52px]">Saadi Mart</span>
                <span className="font-['Noto_Serif_Telugu',serif] text-[22px] text-[#C5A35A] block mt-[6px]">సాడీ మార్ట్</span>
                <span className="text-[10px] tracking-[0.25em] uppercase block mt-[16px] text-[#C5A35A]/50 font-['Jost',sans-serif]">Every Rupee, Explained</span>
              </div>
              <div className="absolute bottom-[20px] left-0 right-0 text-center text-[9px] tracking-[0.3em] uppercase text-[#FAF6EE]/30">Saadi Mart · Dark</div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 5: COLOUR + TYPE */}
      <section id="s5" className="min-h-screen flex flex-col relative overflow-hidden bg-[#FDFAF4] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">04 · Colour & Typography</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#1A1410] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              The Palette of<br /><em className="text-[#C5A35A] italic">Honesty</em>
            </div>
          </div>
          
          <div className="flex gap-[2px] mt-[64px] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms]">
            {[
              { name: 'Kala Gold', hex: '#C5A35A', desc: 'Primary', bg: 'bg-[#C5A35A]', text: 'text-[#1A1410]' },
              { name: 'Weave Ink', hex: '#1A1410', desc: 'Anchor', bg: 'bg-[#1A1410]', text: 'text-[#FAF6EE]/80' },
              { name: 'Silk Cream', hex: '#FAF6EE', desc: 'Base', bg: 'bg-[#FAF6EE]', text: 'text-[#1A1410]', border: 'border-[0.5px] border-[#C5A35A]/20' },
              { name: 'Handloom Rust', hex: '#8B3A2A', desc: 'Heritage', bg: 'bg-[#8B3A2A]', text: 'text-[#FAF6EE]/85' },
              { name: 'Temple Gold', hex: '#E8D5A0', desc: 'Accent', bg: 'bg-[#E8D5A0]', text: 'text-[#1A1410]' },
              { name: 'Zari Shadow', hex: '#3D2E1E', desc: 'Deep', bg: 'bg-[#3D2E1E]', text: 'text-[#FAF6EE]/75' }
            ].map((color, i) => (
              <div key={i} className={`flex-1 h-[180px] flex flex-col justify-end p-[22px] transition-[flex] duration-400 ease-in-out hover:flex-[2.2] cursor-default relative overflow-hidden group ${color.bg} ${color.border || ''}`}>
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className={`text-[11px] tracking-[0.18em] uppercase font-normal relative z-10 ${color.text}`}>{color.name}</div>
                <div className={`text-[10px] font-light mt-[4px] opacity-65 relative z-10 ${color.text}`}>{color.hex} · {color.desc}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] mt-[64px] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[550ms]">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[18px]">Display · Cormorant Garamond 300</div>
              <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#1A1410] text-[52px]">Kalavé</div>
              <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#C5A35A] text-[52px] italic">Beauty</div>
              <div className="text-[12px] font-light text-[#6B5744] mt-[14px] leading-[1.8]">All hero typography, brand name, editorial headings. Fine strokes, high contrast. Weight 300 only — never bold.</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[18px]">Telugu · Noto Serif Telugu 300</div>
              <div className="font-['Noto_Serif_Telugu',serif] text-[46px] text-[#C5A35A]">కలవే</div>
              <div className="font-['Noto_Serif_Telugu',serif] text-[28px] text-[#6B5744] mt-[8px]">సాడీ మార్ట్</div>
              <div className="text-[12px] font-light text-[#6B5744] mt-[14px] leading-[1.8]">The Telugu calligraphic equal partner. Always in gold. The bilingual identity is non-negotiable — the Telugu name is not a translation, it is a co-original.</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[18px]">Body · Jost 200–300</div>
              <div className="font-['Jost',sans-serif] text-[17px] font-extralight text-[#1A1410] leading-[1.75]">Every saree has a cost breakdown. You deserve to see it. Fabric. Making. Space. Our margin. Nothing hidden.</div>
              <div className="text-[12px] font-light text-[#6B5744] mt-[14px] leading-[1.8]">All communication, pricing, and operational text. Weight 200–300. The contrast between Cormorant and Jost is the brand's visual personality.</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[18px]">Hierarchy in Use</div>
              <div className="p-[32px] border-[0.5px] border-[#C5A35A]/20 bg-white">
                <div className="text-[9px] tracking-[0.4em] uppercase text-[#C5A35A] mb-[10px]">New Arrivals · Kanchipuram</div>
                <div className="font-['Cormorant_Garamond',serif] text-[32px] font-light text-[#1A1410] leading-[1.1] mb-[12px]">
                  Pure Silk<br /><em className="text-[#C5A35A] italic">Pattu Saree</em>
                </div>
                <div className="text-[12px] font-light text-[#6B5744] leading-[1.8] mb-[16px]">Woven in Kanchipuram. Six yards of 120-count pure silk. Every thread, explained.</div>
                <div className="text-[10px] font-light text-[#6B5744]">Starting at ₹12,400</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 6: IN-STORE */}
      <section id="s6" className="min-h-screen flex flex-col relative overflow-hidden bg-[#1A1410] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">05 · In-Store Experience</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#FAF6EE] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              What Happens<br /><em className="text-[#C5A35A] italic">Inside</em>
            </div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms] text-[15px] font-light leading-[1.9] text-[#FAF6EE]/60 max-w-[560px]">
            The store is not a showroom. It is a classroom. Every element makes a woman feel respected, informed, and in control.
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#C5A35A]/10 mt-[64px] flex-1 reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[550ms]">
            {[
              { icon: <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#C5A35A] fill-none stroke-[1.2]"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>, title: 'The Price Board', desc: 'Every saree has a vertical price strip on its stand. Four lines. Fabric. Making. Store. Margin. The total is at the bottom. The breakdown is at the top. No customer has to ask.', tag: 'Transparent by design' },
              { icon: <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#C5A35A] fill-none stroke-[1.2]"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title: 'The Origin Wall', desc: 'One wall carries the story of each weaving region. Dharmavaram. Kanchipuram. Gadwal. Pochampally. The woman knows the place before she touches the saree.', tag: 'Heritage as identity' },
              { icon: <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#C5A35A] fill-none stroke-[1.2]"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, title: 'The Consultation Corner', desc: 'A seating area where a trained advisor explains the pricing of any saree in three minutes. The advisor never sells. She informs. The customer decides without pressure.', tag: 'Respect as standard' },
              { icon: <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#C5A35A] fill-none stroke-[1.2]"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, title: 'The Gifting Experience', desc: 'Every saree is wrapped in cream Kalavé tissue with a calligraphed tag. The price breakdown is sealed inside, available if the buyer wants to share it. Premium without compromising privacy.', tag: 'Dignity in every detail' },
              { icon: <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#C5A35A] fill-none stroke-[1.2]"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>, title: 'The Weave Catalogue', desc: 'A printed catalogue at billing shows each saree\'s journey from loom to shelf. The woman takes it home. It is the most useful communication the brand produces.', tag: 'Knowledge as loyalty' },
              { icon: <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-[#C5A35A] fill-none stroke-[1.2]"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: 'The Price Promise', desc: 'A framed statement on the checkout wall: "If any competitor sells this weave for less than our declared fabric cost, we will buy it back at full price." This is the brand identity made physical.', tag: 'Accountability as brand value' }
            ].map((item, i) => (
              <div key={i} className="bg-[#1A1410] p-[48px_36px] transition-colors duration-350 hover:bg-[#221810]">
                <div className="w-[44px] h-[44px] border-[0.5px] border-[#C5A35A]/30 flex items-center justify-center mb-[32px]">
                  {item.icon}
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-[22px] font-normal text-[#FAF6EE] mb-[14px]">{item.title}</div>
                <div className="text-[13px] font-light leading-[1.9] text-[#FAF6EE]/50">{item.desc}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#C5A35A] mt-[20px]">{item.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE 7: PRICE TAG */}
      <section id="s7" className="min-h-screen flex flex-col relative overflow-hidden bg-[#FDFAF4] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem  translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">06 · The Price Tag</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#1A1410] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              The Product That<br />Changes <em className="text-[#C5A35A] italic">Everything</em>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-center mt-[64px] flex-1 reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms]">
            <div className="border-[0.5px] border-[#C5A35A]/20 p-[48px] bg-white shadow-[0_20px_70px_rgba(26,20,16,0.1)]">
              <div className="flex items-center justify-between pb-[24px] border-b-[0.5px] border-[#C5A35A]/20 mb-[28px]">
                <div className="font-['Cormorant_Garamond',serif] text-[28px] font-light">
                  Kalavé<span className="font-['Noto_Serif_Telugu',serif] text-[17px] text-[#C5A35A] block mt-[4px]">కలవే</span>
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B5744] text-right leading-[1.8]">
                  Dharmavaram Pattu<br />Pure Silk · 6.2 Yards<br /><span className="text-[#C5A35A]">SKU KLV-2025-0041</span>
                </div>
              </div>
              
              {[
                { label: 'Fabric Cost (Loom Price)', val: '₹ 7,200', hl: false },
                { label: 'Weaving & Finishing', val: '₹ 1,800', hl: false },
                { label: 'Transport & Quality Check', val: '₹ 400', hl: false },
                { label: 'Store & Staff Cost', val: '₹ 1,100', hl: false },
                { label: 'Our Margin', val: '₹ 1,500 · 12%', hl: true }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-[11px] border-b-[0.5px] border-[#C5A35A]/10 last:border-b-0">
                  <span className={`text-[12px] font-light ${row.hl ? 'text-[#C5A35A]' : 'text-[#6B5744]'}`}>{row.label}</span>
                  <span className={`text-[14px] font-['Cormorant_Garamond',serif] ${row.hl ? 'text-[#C5A35A]' : 'text-[#1A1410]'}`}>{row.val}</span>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-[22px] border-t border-[#C5A35A] mt-[8px]">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A]">You Pay</span>
                <span className="font-['Cormorant_Garamond',serif] text-[36px] font-light">₹ 12,000</span>
              </div>
              <div className="mt-[20px] pt-[18px] border-t-[0.5px] border-[#C5A35A]/20 text-[10px] text-[#6B5744] font-light tracking-[0.12em] text-center">
                This is what you are paying for. Nothing more. Nothing hidden.<br />
                <span className="text-[#C5A35A]">Kalavé · The Art of Honest Beauty</span>
              </div>
            </div>
            
            <div>
              <div className="font-['Cormorant_Garamond',serif] text-[38px] font-light leading-[1.2] text-[#1A1410] mb-[28px]">
                No saree brand in India has ever shown you <em className="text-[#C5A35A] italic">this.</em>
              </div>
              <div className="text-[14px] font-light leading-[1.9] text-[#6B5744]">
                This tag is the product. The saree is the reason to come. The tag is the reason to stay, return, and tell every woman she knows. Transparency is not a feature. It is the entire brand. The price breakdown is the advertisement.
              </div>
              <div className="flex gap-[44px] mt-[36px] pt-[28px] border-t-[0.5px] border-[#C5A35A]/20">
                <div>
                  <div className="font-['Cormorant_Garamond',serif] text-[44px] font-light text-[#C5A35A] leading-none">12%</div>
                  <div className="text-[11px] font-light text-[#6B5744] mt-[6px]">Our declared margin. Published. Fixed. Honest.</div>
                </div>
                <div>
                  <div className="font-['Cormorant_Garamond',serif] text-[44px] font-light text-[#C5A35A] leading-none">4</div>
                  <div className="text-[11px] font-light text-[#6B5744] mt-[6px]">Lines that explain everything a woman wants to know.</div>
                </div>
                <div>
                  <div className="font-['Cormorant_Garamond',serif] text-[44px] font-light text-[#C5A35A] leading-none">0</div>
                  <div className="text-[11px] font-light text-[#6B5744] mt-[6px]">Hidden charges. Inflated prices. Vague markups.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 8: VOICE */}
      <section id="s8" className="min-h-screen flex flex-col relative overflow-hidden bg-[#F2EAD8] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">07 · Brand Voice</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#1A1410] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              How <em className="text-[#C5A35A] italic">Kalavé</em><br />Speaks
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[64px] mt-[64px] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms]">
            {/* Col 1 */}
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[10px]">Storefront · Signage</div>
              <div className="font-['Cormorant_Garamond',serif] text-[22px] font-normal text-[#1A1410] mb-[18px]">What Women Read Before They Enter</div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">Store Entrance Line</div>
                <div className="font-['Cormorant_Garamond',serif] text-[20px] font-normal leading-[1.55] text-[#1A1410]">Every saree here has a price tag that explains <em className="text-[#C5A35A] italic">itself.</em></div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">No call to action. No urgency. No discount language. The brand states its premise and lets the woman decide. The most confident thing a brand can do.</div>
              </div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">Window Communication</div>
                <div className="font-['Cormorant_Garamond',serif] text-[20px] font-normal leading-[1.55] text-[#1A1410]">Fabric. Making. Store. Margin. <em className="text-[#C5A35A] italic">Total.</em><br />That is all we charge.</div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">Five words then the brand promise. The format of the price tag becomes the format of the communication.</div>
              </div>
            </div>
            {/* Col 2 */}
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[10px]">Social Media · Digital</div>
              <div className="font-['Cormorant_Garamond',serif] text-[22px] font-normal text-[#1A1410] mb-[18px]">How the Brand Sounds Online</div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">Instagram Caption</div>
                <div className="font-['Cormorant_Garamond',serif] text-[20px] font-normal leading-[1.55] text-[#1A1410]">This Kanchipuram came from a third-generation loom. It cost ₹8,400 to make. We sell it for <em className="text-[#C5A35A] italic">₹10,200.</em> Here is why.</div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">Every product post follows this format. Story, cost, price, reason. Radical transparency applied to social media.</div>
              </div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">Staff · Standard Introduction</div>
                <div className="font-['Cormorant_Garamond',serif] text-[20px] font-normal leading-[1.55] text-[#1A1410]">"This saree is ₹12,000. The fabric costs ₹7,200. Would you like to know <em className="text-[#C5A35A] italic">the rest?</em>"</div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">Opens with fabric cost — the number that gives price context. This single change creates a fundamentally different buying experience.</div>
              </div>
            </div>
            {/* Col 3 */}
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[10px]">Print · Physical</div>
              <div className="font-['Cormorant_Garamond',serif] text-[22px] font-normal text-[#1A1410] mb-[18px]">What She Takes Home</div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">Carry Bag · Inner Side</div>
                <div className="font-['Cormorant_Garamond',serif] text-[20px] font-normal leading-[1.55] text-[#1A1410]">You paid what it cost to make, carry, and sell this saree. Plus our margin. That is it. Thank you for trusting <em className="text-[#C5A35A] italic">Kalavé.</em></div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">The last thing the brand says. Confirms the purchase as informed trust, not retail transaction.</div>
              </div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">Response to "Is this your best price?"</div>
                <div className="font-['Cormorant_Garamond',serif] text-[20px] font-normal leading-[1.55] text-[#1A1410]">"Yes. Our margin is 12 percent on every saree. It is the <em className="text-[#C5A35A] italic">same for everyone.</em>"</div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">The brand eliminates negotiation by making the margin public. The answer to bargaining is a fact.</div>
              </div>
            </div>
            {/* Col 4 */}
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A] mb-[10px]">Telugu · WhatsApp</div>
              <div className="font-['Cormorant_Garamond',serif] text-[22px] font-normal text-[#1A1410] mb-[18px]">Saadi Mart's Vernacular Voice</div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">WhatsApp Broadcast</div>
                <div className="font-['Noto_Serif_Telugu',serif] text-[18px] leading-[1.7] text-[#1A1410]">ఈ సాడీ ₹6,000 కి వస్తుంది.<br /><em className="text-[#C5A35A] italic font-['Cormorant_Garamond',serif]">ఎందుకంటే ఇది మీకు చెప్తాం.</em></div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">For Saadi Mart's intimate communication. The vernacular name demands a vernacular voice. Telugu first.</div>
              </div>
              <div className="bg-[#FDFAF4] border-[0.5px] border-[#C5A35A]/20 p-[32px_36px] mb-[14px]">
                <div className="text-[9px] tracking-[0.3em] uppercase text-[#6B5744] mb-[14px]">Real Conversation Moment</div>
                <div className="font-['Cormorant_Garamond',serif] text-[20px] font-normal leading-[1.55] text-[#1A1410]">"Amma, nenu oka saree store ki vacchanu. Vaallu price ki reason <em className="text-[#C5A35A] italic">cheptunnaru.</em>"</div>
                <div className="text-[11px] font-light text-[#6B5744] mt-[14px] pt-[14px] border-t-[0.5px] border-[#C5A35A]/20 leading-[1.75]">This is how Kalavé spreads. Not advertising. A daughter calling her mother from inside the store.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 9: SIGNAGE */}
      <section id="s9" className="min-h-screen flex flex-col relative overflow-hidden bg-[#FDFAF4] px-[80px] py-[100px]">
        <div className="relative z-10 w-full flex-1 flex flex-col">
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[100ms]">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A]">08 · Signage & Store Identity</div>
          </div>
          <div className="reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            <div className="font-['Cormorant_Garamond',serif] font-light leading-[1.05] text-[#1A1410] text-[clamp(38px,5vw,66px)] mt-[8px] mb-[6px]">
              How the Brand<br /><em className="text-[#C5A35A] italic">Looks</em> in the World
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] mt-[64px] flex-1 reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms]">
            {/* Storefront Kalave */}
            <div>
              <div className="bg-[#1A1410] p-[60px_50px] flex flex-col items-center justify-center min-h-[400px] relative text-center">
                <div className="absolute top-0 left-[40px] right-[40px] h-[3px] bg-[#C5A35A]"></div>
                <div className="font-['Cormorant_Garamond',serif] text-[56px] font-light text-[#FAF6EE] leading-none">Kalavé</div>
                <span className="font-['Noto_Serif_Telugu',serif] text-[28px] text-[#C5A35A] block mt-[10px]">కలవే</span>
                <div className="w-[50px] h-[0.5px] bg-[#C5A35A]/40 my-[20px]"></div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A]/60">The Art of Honest Beauty</div>
                <div className="text-[10px] font-light text-[#FAF6EE]/35 tracking-[0.2em] mt-[6px]">Vijayawada · Andhra Pradesh</div>
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#6B5744] text-center mt-[16px]">Store Facade · Primary</div>
            </div>
            
            {/* Storefront Saadi Mart */}
            <div>
              <div className="bg-[#2A1F14] p-[60px_50px] flex flex-col items-center justify-center min-h-[400px] relative text-center">
                <div className="absolute top-0 left-[40px] right-[40px] h-[3px] bg-[#C5A35A]"></div>
                <div className="font-['Cormorant_Garamond',serif] text-[46px] font-light text-[#FAF6EE] leading-none">Saadi Mart</div>
                <span className="font-['Noto_Serif_Telugu',serif] text-[28px] text-[#C5A35A] block mt-[10px]">సాడీ మార్ట్</span>
                <div className="w-[50px] h-[0.5px] bg-[#C5A35A]/40 my-[20px]"></div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A35A]/60">Every Rupee, Explained</div>
                <div className="text-[10px] font-light text-[#FAF6EE]/35 tracking-[0.2em] mt-[6px]">Guntur · Andhra Pradesh</div>
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#6B5744] text-center mt-[16px]">Store Facade · Saadi Mart</div>
            </div>
            
            {/* Carry Bag */}
            <div>
              <div className="bg-[#F2EAD8] border-[0.5px] border-[#C5A35A]/20 flex items-center justify-center min-h-[400px] p-[50px]">
                <div className="w-[180px] h-[220px] border border-[#C5A35A]/50 bg-[#FDFAF4] flex flex-col items-center justify-center relative text-center">
                  <div className="absolute top-[-26px] left-1/2 -translate-x-1/2 w-[70px] h-[28px] border border-[#C5A35A]/50 border-b-0 rounded-t-[36px]"></div>
                  <div className="font-['Cormorant_Garamond',serif] text-[28px] font-light text-[#1A1410]">Kalavé</div>
                  <div className="font-['Noto_Serif_Telugu',serif] text-[17px] text-[#C5A35A] mt-[4px]">కలవే</div>
                  <div className="text-[9px] tracking-[0.25em] uppercase text-[#6B5744] mt-[14px]">The Art of Honest Beauty</div>
                </div>
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#6B5744] text-center mt-[16px]">Carry Bag · Kraft Paper</div>
            </div>
            
            {/* Gift Tag */}
            <div>
              <div className="bg-[#F2EAD8] border-[0.5px] border-[#C5A35A]/20 min-h-[340px] flex items-center justify-center p-[40px]">
                <div className="border-[0.5px] border-[#C5A35A]/50 p-[32px_40px] text-center bg-white max-w-[220px]">
                  <div className="text-[9px] tracking-[0.4em] uppercase text-[#C5A35A] mb-[18px]">Kalavé Gift Tag</div>
                  <div className="font-['Cormorant_Garamond',serif] text-[32px] font-light text-[#1A1410]">Kalavé</div>
                  <div className="font-['Noto_Serif_Telugu',serif] text-[18px] text-[#C5A35A] mt-[6px]">కలవే</div>
                  <div className="w-[36px] h-[0.5px] bg-[#C5A35A]/50 my-[16px] mx-auto"></div>
                  <div className="text-[10px] font-light text-[#6B5744] leading-[1.8]">Woven with honesty.<br />Priced with care.</div>
                </div>
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#6B5744] text-center mt-[16px]">Gift Tag · Ivory Stock</div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 10: TAGLINE */}
      <section id="s10" className="min-h-screen flex flex-col relative overflow-hidden bg-[#1A1410] items-center justify-center text-center px-[80px] py-[100px]">
        <div className="relative z-10 w-full max-w-[800px] mx-auto">
          <div className="text-[10px] tracking-[0.5em] uppercase text-[#C5A35A] mb-[56px] reveal-elem  translate-y-8 transition-all duration-900 ease-out delay-[100ms]">The Brand Promise</div>
          <div className="font-['Cormorant_Garamond',serif] text-[clamp(44px,6.5vw,86px)] font-light leading-[1.1] text-[#FAF6EE] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
            The art of knowing<br />what you <em className="text-[#C5A35A] italic">pay for.</em>
          </div>
          <div className="text-[12px] font-light tracking-[0.22em] text-[#FAF6EE]/40 mt-[36px] reveal-elem  translate-y-8 transition-all duration-900 ease-out delay-[400ms]">
            Kalavé · Saadi Mart · Kalanikethan 2025
          </div>
          <div className="flex items-center justify-center gap-[72px] mt-[90px] reveal-elem  translate-y-8 transition-all duration-900 ease-out delay-[550ms]">
            <div>
              <div className="font-['Cormorant_Garamond',serif] text-[36px] font-light text-[#FAF6EE]">Kalavé</div>
              <div className="font-['Cormorant_Garamond',serif] text-[17px] font-light italic text-[#C5A35A] mt-[10px]">The art of honest beauty.</div>
            </div>
            <div className="w-[1px] h-[72px] bg-[#C5A35A]/25"></div>
            <div>
              <div className="font-['Cormorant_Garamond',serif] text-[36px] font-light text-[#FAF6EE]">Saadi Mart</div>
              <div className="font-['Cormorant_Garamond',serif] text-[17px] font-light italic text-[#C5A35A] mt-[10px]">Every rupee, explained.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 11: APPROVAL */}
      <section id="s11" className="min-h-screen flex flex-col relative overflow-hidden bg-[#FDFAF4] items-center justify-center px-[80px] py-[100px]">
        <div className="relative z-10 w-full max-w-[720px] mx-auto text-center">
          <div className="max-w-[680px] mx-auto">
            <div className="text-[10px] font-normal tracking-[0.4em] uppercase text-[#C5A35A] mb-[20px] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[100ms]">12 · Name Approval</div>
            <div className="font-['Cormorant_Garamond',serif] text-[clamp(44px,6vw,80px)] font-light leading-[1.05] text-[#1A1410] mb-[28px] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[250ms]">
              Approve the<br /><em className="italic text-[#C5A35A]">Brand Names</em>
            </div>
            <div className="text-[15px] font-light leading-[1.9] text-[#6B5744] max-w-[520px] mx-auto mb-[56px] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[400ms]">
              Select the names you would like to move forward with. Once approved, our team at Magsmen will immediately begin the trademark screening and identity development process.
            </div>
            
            {!isApproved ? (
              <>
                <div className="flex gap-[16px] justify-center flex-wrap mb-[52px] reveal-elem translate-y-8 transition-all duration-900 ease-out delay-[550ms]">
                  {[
                    { name: 'Kalavé', tel: 'కలవే' },
                    { name: 'Saadi Mart', tel: 'సాడీ మార్ట్' },
                    { name: 'Both Names', tel: 'రెండూ అంగీకారం' }
                  ].map((btn, i) => {
                    const isSelected = btn.name === 'Both Names' ? selectedNames.length === 2 : selectedNames.includes(btn.name);
                    return (
                      <button
                        key={i}
                        onClick={() => handleToggleName(btn.name)}
                        className={`font-['Cormorant_Garamond',serif] text-[20px] font-light border p-[14px_32px] cursor-pointer transition-all duration-300 flex items-center gap-[12px] relative
                          ${isSelected ? 'border-[#C5A35A] bg-[#C5A35A] text-[#1A1410]' : 'border-[#C5A35A]/50 bg-[#FDFAF4] text-[#1A1410] hover:border-[#C5A35A] hover:bg-[#F7F0DC]'}`}
                      >
                        <div className="text-left">
                          <div className="text-[22px]">{btn.name}</div>
                          <div className={`font-['Noto_Serif_Telugu',serif] text-[14px] ${isSelected ? 'text-[#3D2E1E]' : 'text-[#C5A35A]'}`}>{btn.tel}</div>
                        </div>
                        <span className={`text-[14px] transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>✓</span>
                      </button>
                    )
                  })}
                </div>

                {selectedNames.length > 0 && (
                  <div className="bg-[#F2EAD8] border-[0.5px] border-[#C5A35A]/20 p-[40px] max-w-[480px] mx-auto block reveal-elem translate-y-8 transition-all duration-900 ease-out">
                    <div className="font-['Cormorant_Garamond',serif] text-[22px] font-normal text-[#1A1410] text-left mb-[6px]">Complete Your Approval</div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[#C5A35A] text-left mb-[24px]">Selected: {selectedNames.join(' + ')}</div>
                    
                    <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Your name" type="text" className="w-full border-[0.5px] border-[#C5A35A]/20 bg-[#FDFAF4] p-[14px_18px] font-['Jost',sans-serif] text-[14px] font-light text-[#1A1410] mb-[14px] outline-none transition-colors duration-300 focus:border-[#C5A35A]" />
                    <input name="designation" value={formData.designation} onChange={handleFormChange} placeholder="Your designation" type="text" className="w-full border-[0.5px] border-[#C5A35A]/20 bg-[#FDFAF4] p-[14px_18px] font-['Jost',sans-serif] text-[14px] font-light text-[#1A1410] mb-[14px] outline-none transition-colors duration-300 focus:border-[#C5A35A]" />
                    <input name="email" value={formData.email} onChange={handleFormChange} placeholder="Your email address" type="email" className="w-full border-[0.5px] border-[#C5A35A]/20 bg-[#FDFAF4] p-[14px_18px] font-['Jost',sans-serif] text-[14px] font-light text-[#1A1410] mb-[14px] outline-none transition-colors duration-300 focus:border-[#C5A35A]" />
                    <textarea name="remarks" value={formData.remarks} onChange={handleFormChange} placeholder="Any remarks or notes (optional)" rows={3} className="w-full border-[0.5px] border-[#C5A35A]/20 bg-[#FDFAF4] p-[14px_18px] font-['Jost',sans-serif] text-[14px] font-light text-[#1A1410] mb-[14px] outline-none transition-colors duration-300 focus:border-[#C5A35A] resize-none"></textarea>
                    
                    <div className="text-[11px] text-[#6B5744] font-light leading-[1.7] mb-[24px] text-left">
                      By clicking Approve, you confirm that Kalanikethan authorises Magsmen Brand Consultants to proceed with trademark screening and identity development for the selected name(s). A confirmation will be sent to connect@magsmen.com and to your email address.
                    </div>
                    <button onClick={submitApproval} className="w-full bg-[#C5A35A] border-none text-[#1A1410] font-['Jost',sans-serif] text-[12px] font-normal tracking-[0.2em] uppercase p-[16px] cursor-pointer transition-opacity duration-200 hover:opacity-85">
                      Approve & Notify Magsmen →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-[40px] bg-[#1A1410] max-w-[480px] mx-auto text-center block reveal-elem translate-y-8 transition-all duration-900 ease-out">
                <div className="text-[32px] mb-[16px] text-[#C5A35A]">✦</div>
                <div className="font-['Cormorant_Garamond',serif] text-[28px] font-light text-[#FAF6EE] mb-[12px]">Approval Confirmed</div>
                <div className="text-[13px] font-light text-[#FAF6EE]/55 leading-[1.8]">
                  Thank you, <span className="text-[#C5A35A]">{formData.name}</span>.<br /><br />
                  Your approval for <span className="text-[#C5A35A]">{selectedNames.join(' and ')}</span> has been received. The Magsmen team has been notified at connect@magsmen.com and will reach out within one business day to confirm next steps.<br /><br />
                  <span className="text-[11px] opacity-60">Approval reference: <span>KLN-{Date.now().toString(36).toUpperCase()}</span></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1410] px-[80px] py-[56px] flex items-center justify-between border-t-[0.5px] border-[#C5A35A]/20">
        <div className="flex items-center">
          <img src={logo} alt="Magsmen" className="h-[62px] brightness-0 invert opacity-70" />
        </div>
        <div className="text-[11px] font-light text-[#FAF6EE]/30 text-right tracking-[0.12em] leading-[1.9]">
          Confidential Brand Presentation · Kalanikethan 2025<br />
          Prepared by Magsmen Brand Consultants<br />
          Not for distribution · All rights reserved
        </div>
      </footer>
    </div>
  );
}