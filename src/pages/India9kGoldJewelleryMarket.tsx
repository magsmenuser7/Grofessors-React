import React, { useState } from 'react';
import { ArrowLeft, Home, Users, TrendingUp, Gem, AlertTriangle, Map, MapPin } from 'lucide-react';

const StrategyCanvas = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const navigateToPage = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo(0, 0);
  };

  const NavigationTile = ({ title, subtitle, icon, targetPageId }: { title: string; subtitle: string; icon: string; targetPageId: string }) => (
    <button
      onClick={() => navigateToPage(targetPageId)}
      className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-amber-500 hover:shadow-lg transition-all text-left group"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-amber-600">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </button>
  );

  const PageHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b-2 border-amber-200 p-6 mb-6">
      <button
        onClick={onBack}
        className="flex items-center text-amber-700 hover:text-amber-900 mb-3 font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );

  const Callout = ({ variant, title, text }: { variant: 'info' | 'highlight' | 'idea' | 'note'; title: string; text: string }) => {
    const variants: Record<string, string> = {
      info: 'bg-blue-50 border-blue-300 text-blue-900',
      highlight: 'bg-amber-50 border-amber-300 text-amber-900',
      idea: 'bg-purple-50 border-purple-300 text-purple-900',
      note: 'bg-green-50 border-green-300 text-green-900'
    };

    return (
      <div className={`border-l-4 p-4 my-4 ${variants[variant]}`}>
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-sm">{text}</p>
      </div>
    );
  };

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 text-white p-8 rounded-lg shadow-xl mb-8">
        <h1 className="text-4xl font-bold mb-4">India 9K Gold Jewellery Market</h1>
        <h2 className="text-2xl font-semibold mb-4">Strategy Canvas 2025</h2>
        <p className="text-lg leading-relaxed mb-4">
          India's 9KT gold jewellery landscape is a nascent, fast-emerging niche valued at approximately USD 4–6 billion in 2025. 9K currently forms a low single-digit share of organised jewellery sales but is growing faster than the overall category.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-xl mb-3">Key Statistics</h3>
            <ul className="space-y-2 text-sm">
              <li>• Market size (2025): USD 4–6 billion</li>
              <li>• Expected 9K CAGR: 25–30% (next 5 years)</li>
              <li>• ~5–8% of organised jewellery by FY30</li>
              <li>• 1,000+ CaratLane customers/month</li>
              <li>• Overall jewellery CAGR: ~16% (FY24–FY28)</li>
            </ul>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-xl mb-3">Market Dynamics</h3>
            <ul className="space-y-2 text-sm">
              <li>• BIS hallmarking extended to 9K (mid-2025)</li>
              <li>• Fastest-growing organised jewellery segment</li>
              <li>• Affordable-luxury positioning</li>
              <li>• Daily-wear & gifting category</li>
              <li>• Target: Gen Z & urban professionals</li>
            </ul>
          </div>
        </div>
      </div>

      <Callout 
        variant="info"
        title="Positioning of 9K"
        text="9K gold in India is best positioned as fashion-led, affordable-luxury, daily-wear jewellery – not as a wealth-preservation or investment product."
      />

      {/* Navigation Grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Explore the 9K Ecosystem</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <NavigationTile
          title="Consumer Demographics"
          subtitle="Who is buying 9K?"
          icon="👤"
          targetPageId="consumer_demographics"
        />
        <NavigationTile
          title="Demand Drivers"
          subtitle="Why is 9K growing?"
          icon="📈"
          targetPageId="demand_drivers"
        />
        <NavigationTile
          title="Product & Design Preferences"
          subtitle="What are they buying?"
          icon="💍"
          targetPageId="product_design_preferences"
        />
        <NavigationTile
          title="Key Market Gaps"
          subtitle="Where are the opportunities?"
          icon="⚠️"
          targetPageId="key_gaps"
        />
        <NavigationTile
          title="India-wide 9K Retailers"
          subtitle="National brand & retailer map"
          icon="🗺️"
          targetPageId="retailers_india_wide"
        />
        <NavigationTile
          title="AP & TS 9K Retailers"
          subtitle="Telugu states supply & retail"
          icon="📍"
          targetPageId="retailers_ap_ts"
        />
      </div>
    </div>
  );

  const ConsumerDemographicsPage = () => (
    <div>
      <PageHeader title="1. Consumer Demographics" onBack={() => navigateToPage('home')} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Who is the 9K Customer?</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Age Profile</h3>
              <p className="text-gray-700">Primarily Gen Z & young millennials (approx. 20–35 years)</p>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Life Stage</h3>
              <p className="text-gray-700">Young professionals, early-stage couples, gifting between partners and friends</p>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <p className="text-gray-700">Urban and semi-urban, metro & Tier 1/2 cities</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Digital Behaviour</h3>
              <p className="text-gray-700">Highly active on social media, discover brands via Instagram, YouTube, influencers and online ads</p>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Mindset</h3>
              <p className="text-gray-700">View jewellery as fashion, personal style, and self-expression – not just as an asset locked in a locker</p>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Income</h3>
              <p className="text-gray-700">Middle-income and mass-affluent segments looking for premium feel at accessible price points</p>
            </div>
          </div>
        </div>
      </div>

      <Callout 
        variant="highlight"
        title="Core Insight"
        text="For the 9K customer, jewellery is closer to fashion and lifestyle (like a handbag or sneaker) than a traditional investment or dowry asset."
      />
    </div>
  );

  const DemandDriversPage = () => (
    <div>
      <PageHeader title="2. Demand Drivers" onBack={() => navigateToPage('home')} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Macro Factors & Mindset Shifts</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>High and volatile gold prices are pushing younger consumers toward lower-karat, lower-ticket options like 9K.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Younger generations prefer to wear their gold daily rather than keep it locked away.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Rapid urbanisation and rising disposable incomes in metros and Tier 2 cities.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Increased exposure to global fashion trends and Western jewellery styling.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fashion, Media & Behavioural Drivers</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>High influence of Instagram, Pinterest, YouTube, and influencers promoting minimalist, stackable, and mix-and-match jewellery.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Rise of fashion-led brands mixing 9K gold with diamonds, lab-grown diamonds, and semi-precious stones.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Growing demand for lightweight, everyday-wear jewellery that is comfortable at work, college, and social settings.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Regulatory legitimisation via BIS hallmarking has increased trust in non-traditional karats like 9K.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Brands and designs matter more than karat purity – logo, aesthetic, and storytelling are key.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Gifting occasions (birthdays, anniversaries, friendship/relationship milestones) are a big driver of small-ticket 9K purchases.</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const ProductDesignPage = () => (
    <div>
      <PageHeader title="3. Product & Design Preferences" onBack={() => navigateToPage('home')} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Preferred Categories in 9K</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 text-amber-900">Core Product Categories</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Daily-wear, minimalistic pieces</li>
              <li>• Pendants (geometric, symbolic, initials)</li>
              <li>• Stud earrings and small hoops</li>
              <li>• Stackable rings</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3 text-amber-900">Lifestyle & Gifting</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Thin bracelets and delicate chains</li>
              <li>• Name pendants and personalised motifs</li>
              <li>• Lifestyle bracelets</li>
              <li>• Charm-based designs for gifting</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Design Elements & Aesthetic Trends</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Stone/diamond-studded designs mixing diamonds or semi-precious stones with 9K gold.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Use of lab-grown diamonds to keep ticket sizes accessible.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Clean, minimal lines, often influenced by Western/Scandinavian design language.</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Soft colours, pastel enamel work, and modern motifs (hearts, stars, initials, zodiac, etc.).</span>
          </li>
          <li className="flex items-start">
            <span className="text-amber-500 mr-3 text-xl">•</span>
            <span>Gifting SKUs which are easy to understand, emotionally themed, and ready-to-gift packaging.</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const KeyGapsPage = () => (
    <div>
      <PageHeader title="4. Key Market Gaps & Opportunities" onBack={() => navigateToPage('home')} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Positioning & Awareness Gaps</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>Confusion between 9K as fashion jewellery vs traditional investment jewellery.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>Low awareness about 9K in non-metro and less digitally savvy audiences.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>No single brand currently 'owns' the 9K category as the clear specialist in consumers' minds.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>9K is perceived as less premium and less trustworthy compared to 18K/22K without strong brand reassurance.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Resale, Liquidity & Pricing Gaps</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>Weak or non-existent resale and liquidity infrastructure for 9K jewellery.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>No standard pricing formula across retailers; making charges and mark-ups vary widely.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>No brand currently offers robust resale or exchange programs specifically for 9K.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>The value of 9K jewellery is heavily dependent on design and gemstone perceived value rather than metal value.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Depth & Segment Gaps</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>Most focus is on women's daily wear and gifting; very limited depth in men's, couples', teen, and custom segments.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>Rising demand for newer, fresher designs outpacing current design refresh cycles.</span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-3 text-xl">⚠</span>
            <span>Opportunity for stronger storytelling around durability, design, and brand-backed trust to make 9K 'feel' premium.</span>
          </li>
        </ul>
      </div>

      <Callout 
        variant="idea"
        title="Innovation Opportunity"
        text="A brand that combines 9K with strong design IP, transparent pricing, and a buyback/exchange promise can become the default 9K specialist in India."
      />
    </div>
  );

  const RetailersIndiaPage = () => (
    <div>
      <PageHeader title="5. India-wide 9K Retailers Landscape" onBack={() => navigateToPage('home')} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Retail & Brand Landscape – Pan India</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-amber-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Retailer/Brand</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Presence</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Offering</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Stores / Locations</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Glow", "Multiple locations in India", "9K + other gold variants", "8 stores"],
                ["Jos Alukkas", "Multiple locations in India", "9K + other gold variants", "100+ stores"],
                ["CaratLane", "Multiple locations in India", "9K + other gold variants", "110+ stores"],
                ["Giva", "Multiple locations in India", "9K + other gold variants", "70+ stores"],
                ["Mia by Tanishq", "Multiple locations in India", "9K + other gold variants", "100+ stores"],
                ["Zaun", "Anand, Gujarat", "9K + other gold variants", "204, Maruti Saday, BS SiddhiVinayak Temple, 80 Feet Road, Anand"],
                ["The Rajalaxmi", "Multiple locations in India", "9K + other gold variants", "Location not specified"],
                ["Ornate Jewelles", "Jaipur, Rajasthan", "9K + other gold variants", "G1-14A, EPIP, Jewellery Zone, Sitapura, Jaipur"],
                ["Palmonas", "Mostly online + some offline", "Exclusively 9K", "Approx. 27 touchpoints"],
                ["Senco", "Mostly online", "Exclusively 9K", "Approx. 183 outlets / touchpoints"],
                ["Mirava", "Mostly online", "Exclusively 9K", "Sector 58, Plot A100, Noida, Uttar Pradesh"],
                ["Emori", "Mostly online + Gurugram", "Exclusively 9K", "Ground floor, AIPL Joy Street, Shop 128–129, Gurugram"]
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 px-4 py-2 font-medium">{row[0]}</td>
                  <td className="border border-gray-300 px-4 py-2">{row[1]}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className={row[2].includes("Exclusively") ? "text-purple-700 font-semibold" : ""}>
                      {row[2]}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key 9K Manufacturers (India)</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Maniratnam Jewellers – West Bengal",
            "RK Jewellery – West Bengal",
            "Manikarnika Design – Rajasthan",
            "The United Jewellery – Rajasthan",
            "Shyama Jewellers – Rajasthan"
          ].map((mfg, idx) => (
            <div key={idx} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-sm font-medium text-gray-800">{mfg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RetailersAPTSPage = () => (
    <div>
      <PageHeader title="6. Telugu States (AP & TS) Retailer Landscape" onBack={() => navigateToPage('home')} />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Andhra Pradesh & Telangana – 9K Retailers & Manufacturers</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Retailer/Brand</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">City</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Offering / Role</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Rudra Koteshwara Gold", "Nandyal (AP)", "9K + other gold variants", "Retailer"],
                ["Sri Lakshmi Keshava Jewellers & Cutting Works", "Nandyal (AP)", "Listed under 9K manufacturer", "Manufacturer / cutter"],
                ["Asian Gems", "Eluru (AP)", "Listed under 9K manufacturer", "Manufacturer"],
                ["Sri Virat Jewellers", "Hyderabad (TS)", "Listed under 9K manufacturer", "Likely wholesale/manufacturer with possible retail"],
                ["Kader Jewellers", "Hyderabad (TS)", "Listed under 9K manufacturer", "Manufacturer/retailer"]
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 px-4 py-2 font-medium">{row[0]}</td>
                  <td className="border border-gray-300 px-4 py-2">{row[1]}</td>
                  <td className="border border-gray-300 px-4 py-2">{row[2]}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Callout 
        variant="note"
        title="Regional Insight"
        text="AP & TS currently show more presence of 9K manufacturers and cutters than fully branded 9K retail experiences. This indicates upstream capability with room for downstream brand-building and modern retail formats."
      />
    </div>
  );

  const pages: Record<string, JSX.Element> = {
    home: <HomePage />,
    consumer_demographics: <ConsumerDemographicsPage />,
    demand_drivers: <DemandDriversPage />,
    product_design_preferences: <ProductDesignPage />,
    key_gaps: <KeyGapsPage />,
    retailers_india_wide: <RetailersIndiaPage />,
    retailers_ap_ts: <RetailersAPTSPage />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 pt-36 pb-16">
        {pages[currentPage]}
      </div>
    </div>
  );
};

export default StrategyCanvas;