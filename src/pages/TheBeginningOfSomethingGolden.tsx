import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Moon, 
  Sun, 
  Wind, 
  Circle, 
  Crown, 
  Baby, 
  Link as LinkIcon, 
  ChevronRight,
  ShoppingBag,
  Star,
  Compass
} from 'lucide-react';

const TheBeginningOfSomethingGolden = () => {
  const [activeTab, setActiveTab] = useState('Anklets');

  const categories: Record<string, { icon: React.ReactElement; tagline: string; description: string; names: Array<{ title: string; isRecommended?: boolean; desc: string; meta: string }> }> = {
    "Anklets": {
      icon: <Wind className="w-5 h-5" />,
      tagline: "Grace at every step",
      description: "Anklets adorn the feet with a hint of sound and shine, carrying both traditional charm and modern boho-chic vibes. We want names that evoke movement, dance, and grace, as well as the idea of being guided by something precious (gold at your feet).",
      names: [
        { 
          title: "Golden Steps", 
          isRecommended: true,
          desc: "A metaphorical name suggesting that every step taken while wearing these anklets is a step graced with gold. It carries an aspirational tone: walking on a path of gold implies prosperity and confidence. The name is straightforward (Golden = gold material, Steps = related to feet) yet poetic, symbolizing that these anklets make your journey special perfectly in line with Nirva’s theme of starting something golden.",
          meta: "Aspirational • Poetic • Straightforward" 
        }
      ]
    },
    "Bridal Fashion": {
      icon: <Sparkles className="w-5 h-5" />,
      tagline: "Romantic & Lightweight",
      description: "Bridal-inspired pieces echo the celebration of weddings but in lightweight, fashion-forward designs. Names should capture romance and auspicious beginnings while remaining easy to understand.",
      names: [
        { 
          title: "Eternal Vows", 
          desc: "Conveys the idea of wedding vows that last forever, linking to the lifelong commitment of marriage. “Eternal” gives a poetic, timeless feel, while “Vows” clearly ties to bridal imagery. This name blends traditional wedding significance with an aspirational tone of enduring love and prosperity (a “golden beginning” in life).",
          meta: "Timeless • Poetic • Symbolic"
        },
        { 
          title: "Bridal Bliss", 
          desc: "A straightforward yet evocative option that marries product clarity with poetic appeal. Bridal Bliss suggests the joy and happiness of a bride on her big day. The term bliss is aspirational, implying that wearing these lightweight bridal-inspired pieces can spark feelings of delight and fortune.",
          meta: "Joyful • Direct • Evocative"
        }
      ]
    },
    "Indian Bridal": {
      icon: <Crown className="w-5 h-5" />,
      tagline: "Heritage & Opulence",
      description: "The bridal jewelry category includes the heavy, traditional pieces worn for Indian weddings (opulent necklaces, chokers, bangles, earrings sets, etc.). Here, the naming should evoke heritage, celebration, and auspicious beginnings, as a wedding is literally the beginning of a new life chapter.",
      names: [
        { 
          title: "Golden Vivah", 
          desc: "This option directly ties gold to the wedding ceremony. It’s simple, mixing English and Hindi for a modern-traditional fusion. The name implies that these pieces will make one’s wedding a truly “golden” occasion.",
          meta: "Cultural • Premium • Fusion"
        },
        { 
          title: "Nava Vivaham", 
          desc: "A celebration of modern sacredness. It redefines bridal jewelry for today’s woman: lighter, luminous, rooted not in tradition alone, but in the promise of a new beginning, in her own way. It’s not just a name—it’s a feeling, an invitation, and a story waiting to be worn.",
          meta: "Sacred • Modern • Story-driven"
        }
      ]
    },
    "Bracelets & Bangles": {
      icon: <Circle className="w-5 h-5" />,
      tagline: "The Art of Embracing",
      description: "For bracelets, bangles or kadas, the category name should capture the notion of adorning one’s wrist with grace, and maybe the idea of encircling or embracing. Bracelets can symbolize friendship, luck (charm bracelets), or simply personal style.",
      names: [
        { 
          title: "Golden Embrace", 
          isRecommended: true,
          desc: "Recommended. Conveys the image of the bracelet encircling the wrist like a gentle, golden hug. It’s elegant and experience-focused. Wearing the bracelet feels like being wrapped in a touch of gold.",
          meta: "Graceful • Emotional • Elegant"
        },
        { 
          title: "Wrist & Wonder", 
          desc: "A bit of alliteration and whimsy, suggesting that these wrist pieces bring wonder or magical charm to your look. Implies that slipping on a bangle adds a spark to your day.",
          meta: "Whimsical • Playful • Modern"
        },
        { 
          title: "Charm Circle", 
          desc: "Implies both circular shape and the charm (both literal charms on a bracelet and figurative charm) it brings.",
          meta: "Direct • Classic • Friendly"
        }
      ]
    },
    "Daily Wear": {
      icon: <Sun className="w-5 h-5" />,
      tagline: "Modern Aesthetic",
      description: "Nirva needs a category for the modern, aesthetic daily-wear pieces, those that are lighter, trendier, or fusion designs, separate from heavy traditional styles. This caters to young urban shoppers looking for “lighter, contemporary” designs that offer “accessible luxury” for everyday use. The name for this category should feel stylish, fresh, and aspirational, highlighting that these pieces elevate everyday moments.",
      names: [
        { 
          title: "Chic Daily", 
          desc: "A shorter, punchy name indicating stylish pieces for daily wear. Chic gives a modern fashion-forward vibe; Daily implies practicality. Together, it suggests “everyday fashion, elevated.”",
          meta: "Punchy • Modern • Practical"
        },
        { 
          title: "Urban Elegance", 
          desc: "Targets the urban, young audience. It blends the idea of city-smart style with elegance. Implies these gold pieces are perfect for a cosmopolitan lifestyle, trendy yet elegant.",
          meta: "Sophisticated • Trendy • Urban"
        }
      ]
    },
    "Kids & Teens": {
      icon: <Baby className="w-5 h-5" />,
      tagline: "Youthful Sparkle",
      description: "This category covers jewelry designed for children and teenagers—typically smaller, playful, or youthful designs, but still in 9K gold. Names here should feel fun, nurturing, or hopeful, capturing the spirit of youth and new beginnings (which ties nicely to Nirva’s tagline). They should appeal to parents (for kids) and be aspirational enough for teens to feel “cool” or special wearing them.",
      names: [
        { 
          title: "Little Luxuries", 
          desc: "Emphasizes that these items, though designed for younger ones, are still precious and luxurious. Little denotes that they are for kids or are petite in size, and Luxuries suggests high quality (real gold) yet accessible—exactly Nirva’s proposition of affordable luxury. The alliteration (L-L) makes it charming and memorable.",
          meta: "Charming • Quality • Memorable"
        },
        { 
          title: "Twinkle Treasures", 
          desc: "This playful, alliterative name immediately brings to mind the nursery rhyme “Twinkle Twinkle Little Star,” tapping into childhood nostalgia. Twinkle suggests sparkly but gentle shine—perfect for small earrings, pendants or rings that aren’t too flashy for kids. Treasures conveys that these items are precious objects, aligning with how a child or teen might cherish their first pieces of jewelry.",
          meta: "Playful • Nostalgic • Precious"
        }
      ]
    },
    "Neckwear": {
      icon: <LinkIcon className="w-5 h-5" />,
      tagline: "Regal Adornment",
      description: "This category likely includes various necklaces or neck adornments that are neither minimal chains nor specialty pieces like mangalsutras. The naming should suggest elegance around the neck, possibly with a hint of regality or cultural flair, given neck pieces often make a statement.",
      names: [
        { 
          title: "Golden Bonds", 
          desc: "Indicates a bond or connection (the chain links) forged in gold. This name feels traditional (golden) yet speaks to the emotional bond one might have with a gifted chain.",
          meta: "Strong • Emotional • Traditional"
        },
        { 
          title: "Golden Tales", 
          desc: "Suggests that each pendant chain holds a story (a tale). This name leans into an aspirational, storytelling vibe: wearing these pieces is like wearing a story in gold. Perhaps the pendant’s design, or the occasion it was bought for, becomes a “golden tale” for the customer.",
          meta: "Storytelling • Aspirational • Poetic"
        }
      ]
    },
    "Rings": {
      icon: <Heart className="w-5 h-5" />,
      tagline: "Circles of Promise",
      description: "Rings often symbolize promises, love, and new beginnings, making this category ideal to reflect Nirva’s “something golden” theme. A ring is a circle with no end, representing eternal commitments.",
      names: [
        { 
          title: "Golden Promise", 
          isRecommended: true,
          desc: "Recommended. Conveys a vow sealed in gold, perfect for engagement or commitment rings (aligns with aspirational yet attainable love). This name resonates with the idea of a new chapter beginning in one’s life.",
          meta: "Romantic • Commitment • Pure"
        },
        { 
          title: "Eternal Circles", 
          desc: "Emphasizes the ring’s shape and the idea of endless love or unity. Eternal adds a classic, timeless feel.",
          meta: "Timeless • Unity • Minimalist"
        },
        { 
          title: "Circle of Love", 
          desc: "A familiar phrase implying that a ring encircles one’s love. (It’s slightly more common, but instantly communicates the sentimental value.)",
          meta: "Sentimental • Familiar • Warm"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E5E5E5] font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Navigation Header */}
      <header className="border-b border-[#222] bg-[#0D0D0D]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-light tracking-[0.3em] text-[#C5A059] uppercase leading-none">Nirva</h1>
            <span className="text-[9px] tracking-[0.4em] uppercase opacity-50 mt-1">The beginning of something golden</span>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-[10px] tracking-[0.2em] uppercase font-semibold">
            <span className="text-[#C5A059] border-b border-[#C5A059] pb-1 cursor-default">Naming Guide</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Strategy Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#C5A059]/20 bg-[#C5A059]/5 text-[#C5A059] text-[10px] tracking-widest uppercase mb-8">
              <Compass className="w-3 h-3" />
              <span>Experiential Strategy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-white leading-tight">
              Aspirational & <br />
              <span className="text-[#C5A059] italic serif-font">Approachable</span>
            </h2>
            <p className="text-lg text-[#999] leading-relaxed max-w-lg mb-0">
              We employ an experiential naming strategy, emphasizing emotions and narratives rather than just items. 
              Our names combine contemporary style with classic charm to foster deep connections.
            </p>
          </div>
          <div className="bg-[#151515] border border-[#222] p-8 rounded-3xl relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C5A059]/10 blur-3xl"></div>
            <h4 className="text-[#C5A059] text-xs tracking-widest uppercase font-bold mb-6">Core Values</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <Star className="w-5 h-5 text-[#C5A059] mt-1 shrink-0" />
                <p className="text-sm text-[#BBB]"><strong className="text-white block mb-1">Evocative Imagery</strong> Utilizing themes of dawn, promise, and illumination aligned with "Golden Beginnings."</p>
              </li>
              <li className="flex items-start space-x-4">
                <Moon className="w-5 h-5 text-[#C5A059] mt-1 shrink-0" />
                <p className="text-sm text-[#BBB]"><strong className="text-white block mb-1">Cultural Fusion</strong> Using "beautiful words" and non-English terminology to blend traditional and modern vibes.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Categories Explorer */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Category Tabs */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-32 space-y-2">
              <div className="px-4 mb-4">
                <h5 className="text-[10px] tracking-[0.2em] uppercase text-[#555] font-bold">Product Categories</h5>
              </div>
              <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible space-x-2 lg:space-x-0 lg:space-y-1 pb-4 lg:pb-0 scrollbar-hide">
                {Object.keys(categories).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-400 group relative ${
                      activeTab === tab 
                      ? 'bg-[#C5A059] text-black' 
                      : 'text-[#888] hover:bg-[#1A1A1A] hover:text-white'
                    }`}
                  >
                    <div className={activeTab === tab ? 'text-black' : 'text-[#C5A059]'}>
                      {categories[tab].icon}
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">{tab}</span>
                    {activeTab === tab && (
                      <div className="absolute right-4 hidden lg:block">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Details Pane */}
          <div className="flex-grow">
            <div className="bg-[#111] border border-[#222] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500">
              {/* Internal Header */}
              <div className="p-8 md:p-12 border-b border-[#222] bg-gradient-to-br from-[#161616] to-[#111]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-xl">
                    <span className="text-[#C5A059] text-[10px] tracking-[0.3em] uppercase font-black mb-3 block">Perspective</span>
                    <h3 className="text-3xl md:text-4xl font-light text-white mb-4 italic">{categories[activeTab].tagline}</h3>
                    <p className="text-[#888] text-sm leading-relaxed">
                      {categories[activeTab].description}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-20 h-20 rounded-full border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059]/40">
                      {React.cloneElement(categories[activeTab].icon, { className: "w-8 h-8" })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Names List */}
              <div className="p-8 md:p-12 space-y-12">
                {categories[activeTab].names.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="md:w-1/3 shrink-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-2xl font-light text-white group-hover:text-[#C5A059] transition-colors">
                            {item.title}
                          </h4>
                          {item.isRecommended && (
                            <span className="px-2 py-0.5 rounded bg-[#C5A059]/10 text-[#C5A059] text-[8px] tracking-tighter uppercase font-bold border border-[#C5A059]/20">Recommended</span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#555] uppercase tracking-[0.15em] font-bold">
                          {item.meta}
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <p className="text-[#999] text-sm leading-relaxed bg-[#181818] p-6 rounded-2xl border border-[#222] group-hover:border-[#333] transition-all">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Context Footer */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
              <div className="p-6 rounded-3xl border border-[#222] bg-[#0A0A0A]">
                <h6 className="text-[10px] text-[#C5A059] uppercase tracking-widest mb-2 font-bold">Audience Focus</h6>
                <p className="text-xs text-[#777]">Middle-class customers looking for aspirational style without the high price tag.</p>
              </div>
              <div className="p-6 rounded-3xl border border-[#222] bg-[#0A0A0A]">
                <h6 className="text-[10px] text-[#C5A059] uppercase tracking-widest mb-2 font-bold">Material Truth</h6>
                <p className="text-xs text-[#777]">Real gold jewelry at lower karats (9K and above) positioned as accessible luxury.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-20 border-t border-[#222] mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="w-12 h-[1px] bg-[#C5A059] mb-8"></div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#555] text-center max-w-sm">
            Nirva: The beginning of something golden. <br />
            <span className="mt-4 block opacity-50">Confidential Brand Architecture Guide</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TheBeginningOfSomethingGolden;