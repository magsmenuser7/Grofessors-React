import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('story');

  // Custom styles to maintain the exact look of the original CSS variables and classes
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;600;700&display=swap');

    :root {
      --gold-light: #f4e8c1;
      --gold-main: #b8860b; 
      --gold-dark: #8b6d1b;
      --deep-charcoal: #111111;
      --soft-cream: #faf9f6;
      --text-main: #1a1a1a;
      --text-muted: #4a4a4a;
      --dark-brown: #3d2b1f;
    }

    body {
      background-color: #faf9f6; /* Fallback for variable */
    }

    .font-montserrat {
      font-family: 'Montserrat', sans-serif;
    }

    .font-cormorant {
      font-family: 'Cormorant Garamond', serif;
    }

    .gold-text {
      color: #b8860b;
      font-weight: 600;
    }

    /* Animation */
    .fade-in {
      animation: fadeIn 0.4s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tab-btn {
      position: relative;
      transition: all 0.3s ease;
      color: #4a4a4a;
    }

    .tab-btn.active-tab {
      color: #b8860b;
      font-weight: 700;
    }

    .tab-btn.active-tab::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #b8860b;
    }

    .highlight-box {
      background-color: #ffffff;
      border: 1px solid #f4e8c1;
      box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    }

    .peacock-accent {
      background-image: radial-gradient(circle at 1px 1px, #b8860b 1px, transparent 0);
      background-size: 25px 25px;
      opacity: 0.1;
    }
  `;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1a1a] font-montserrat leading-relaxed antialiased">
      <style>{customStyles}</style>

      {/* Brand Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-3xl font-bold tracking-widest uppercase font-cormorant text-[#111111]">
            Nirva<span className="gold-text">.</span>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-600 font-bold bg-stone-100 px-5 py-2 rounded-full border border-stone-200">
              Magsmen Brand Consultants | Strategy Deck
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="bg-white border-t border-stone-100">
          <div className="container mx-auto flex justify-center space-x-6 md:space-x-16">
            <button 
              onClick={() => setActiveTab('story')} 
              className={`tab-btn py-5 text-xs uppercase tracking-[0.2em] ${activeTab === 'story' ? 'active-tab' : ''}`}
            >
              Brand Story
            </button>
            <button 
              onClick={() => setActiveTab('theme')} 
              className={`tab-btn py-5 text-xs uppercase tracking-[0.2em] ${activeTab === 'theme' ? 'active-tab' : ''}`}
            >
              The Concept
            </button>
            <button 
              onClick={() => setActiveTab('taglines')} 
              className={`tab-btn py-5 text-xs uppercase tracking-[0.2em] ${activeTab === 'taglines' ? 'active-tab' : ''}`}
            >
              Taglines
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        
        {/* TAB 1: BRAND STORY */}
        {activeTab === 'story' && (
          <section className="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-5 relative">
                <div className="aspect-[3/4] bg-stone-100 peacock-accent rounded-sm flex items-center justify-center border border-stone-200">
                  <span className="text-9xl font-cormorant text-stone-300 select-none">N</span>
                </div>
              </div>
              <div className="md:col-span-7">
                <h2 className="text-xs tracking-[0.4em] uppercase text-[#8b6d1b] font-bold mb-4">The Narrative</h2>
                <h1 className="text-5xl font-cormorant text-[#111111] mb-8 leading-tight italic">
                  "Some beginnings arrive softly..."
                </h1>
                
                <div className="space-y-6 text-lg text-stone-800 leading-relaxed font-normal">
                  <p>
                    Like a peacock’s first graceful display, proud but unspoken—the first gold you choose holds the same quiet power. It marks a moment of becoming: a first achievement, an auspicious celebration, a blessing given with love.
                  </p>
                  
                  <p>
                    At <span className="gold-text">Nirva Gold</span>, each piece is meant for meaningful moments. Refined in its form and balanced in its brilliance, it carries tradition without excess and luxury without noise.
                  </p>
                  
                  <div className="p-8 border-l-2 border-[#b8860b] bg-white italic text-xl text-[#111111] my-8 font-light">
                    "Every piece is chosen not to impress, but to remember—to hold pride, emotion, and promise in equal measure."
                  </div>
                  
                  <p>
                    Though designed for life’s grand celebrations, Nirva’s pieces are balanced in a way that allows them to be worn with ease, bringing a gentle touch of everyday luxury to meaningful moments.
                  </p>
                  
                  <p className="font-semibold text-[#111111]">
                    Because when a moment shapes your journey, Nirva believes it deserves to be marked gently, beautifully, and forever, in gold.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: THE THEME & EXPLANATION */}
        {activeTab === 'theme' && (
          <section className="fade-in">
            <div className="text-center mb-16">
              <h2 className="text-xs tracking-[0.5em] uppercase text-stone-500 font-bold mb-2">Primary Strategy</h2>
              <h1 className="text-6xl font-cormorant text-[#111111] italic">
                The Start of <span className="gold-text">Something Golden</span>
              </h1>
              <div className="w-24 h-px bg-[#b8860b] mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="highlight-box p-10 rounded-sm">
                <h3 className="text-2xl font-cormorant mb-6 text-[#111111] border-b border-stone-100 pb-4 italic">
                  Theme Inspiration
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Inspired by the <span className="font-bold">peacock’s moment of first display</span>—symbolizing pride, renewal, and prosperity. This theme celebrates firsts and milestones, shifting gold from a mere commodity to a symbol of emotional significance.
                </p>
              </div>
              <div className="highlight-box p-10 rounded-sm">
                <h3 className="text-2xl font-cormorant mb-6 text-[#111111] border-b border-stone-100 pb-4 italic">
                  Sub-Themes
                </h3>
                <ul className="space-y-4 font-medium text-stone-800">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#b8860b] rounded-full"></span> Your first gold.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#b8860b] rounded-full"></span> Your first achievement.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#b8860b] rounded-full"></span> Your first meaningful gift.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-stone-200 p-12 text-center rounded-sm">
              <h3 className="text-xs tracking-[0.5em] uppercase text-[#8b6d1b] mb-8 font-bold">What this underlines</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] tracking-widest uppercase font-bold text-[#3d2b1f]">
                <div className="border border-stone-400 p-4">First Milestones</div>
                <div className="border border-stone-400 p-4">Moments that Stay</div>
                <div className="border border-stone-400 p-4">Quiet Celebration</div>
                <div className="border border-stone-400 p-4">Emotional Gifting</div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: TAGLINES & CREATIVE */}
        {activeTab === 'taglines' && (
          <section className="fade-in">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-xs tracking-[0.4em] uppercase text-stone-500 font-bold mb-4">Creative Communication</h2>
                <div className="py-10 border-y border-stone-200">
                  <p className="text-xs uppercase tracking-widest text-[#8b6d1b] mb-4 font-bold">Primary Tagline</p>
                  <h2 className="text-5xl md:text-6xl font-cormorant font-semibold text-[#111111] leading-tight italic">
                    “The start of something golden.”
                  </h2>
                </div>
              </div>

              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-stone-400 mb-8 text-center">Optional Communications</h3>
              
              <div className="space-y-4">
                {[
                  { text: "“Every first deserves its gold.”", id: "01" },
                  { text: "“Your gold. Your forever moment.”", id: "02" },
                  { text: "“Mark the moment that started it all.”", id: "03" },
                  { text: "“Gold, for moments worth celebrating.”", id: "04" },
                  { text: "“From firsts to forever, every moment shines.”", id: "05" },
                  { text: "“Firsts, made timeless.”", id: "06" }
                ].map((item) => (
                  <div key={item.id} className="bg-white p-6 border border-stone-100 hover:border-[#b8860b] transition-colors flex justify-between items-center group cursor-default">
                    <p className="text-xl font-cormorant text-[#111111] italic group-hover:text-[#b8860b] transition-colors">
                      {item.text}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-stone-300">Option {item.id}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Consultant Insight Footer */}
      <footer className="bg-white border-t border-stone-200 mt-20 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6 text-stone-400">Consultant's Final Word</p>
            <p className="text-2xl font-cormorant text-[#111111] italic leading-relaxed mb-8">
              "We have positioned Nirva not as a seller of jewelry, but as a curator of milestones. By avoiding 'showy luxury', we build trust with the aspirational consumer who values depth over noise."
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-12 bg-[#b8860b]"></div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#111111]">Magsmen Brand Consultants</p>
              <div className="h-px w-12 bg-[#b8860b]"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}