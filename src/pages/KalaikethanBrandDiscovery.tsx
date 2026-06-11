import { useState, useEffect, useRef } from "react";
import grofesionlogo from "../components/assets/logos/grofesion-logo.png";
import grofesionlogo2 from "../components/assets/logos/grofesion-white.png";



const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&family=Noto+Serif+Telugu:wght@300;400&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --gold:#C5A35A;--gold-pale:#F7F0DC;--gold-light:#E8D5A0;
    --ink:#1A1410;--ink-mid:#3D2E1E;--ink-soft:#6B5744;
    --cream:#FAF6EE;--cream-deep:#F2EAD8;--ivory:#FDFAF4;
    --border:rgba(197,163,90,0.22);--border-s:rgba(197,163,90,0.5);
    --green:#4A7C59;--green-pale:#EBF4EE;
    --red:#8B3A2A;--red-pale:#F9EEEB;
  }
  html{scroll-behavior:smooth}
  body{font-family:'Jost',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden}

  nav.kl-nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:16px 60px;background:rgba(253,250,244,0.95);backdrop-filter:blur(14px);border-bottom:0.5px solid var(--border)}
  .nav-logo-text{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--ink);letter-spacing:0.04em}
  .nav-right{font-size:11px;font-weight:300;letter-spacing:0.2em;color:var(--ink-soft);text-transform:uppercase}

  #kl-progress{position:fixed;top:0;left:0;right:0;z-index:300;height:2px;background:rgba(197,163,90,0.12)}
  #kl-progress-fill{height:100%;background:var(--gold);width:0%;transition:width 0.3s}

  .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 80px 80px;text-align:center;background:var(--ivory);position:relative;overflow:hidden}
  .hero-grid{position:absolute;inset:0;opacity:0.03;background-image:repeating-linear-gradient(0deg,transparent,transparent 60px,var(--gold) 60px,var(--gold) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,var(--gold) 60px,var(--gold) 61px)}
  .hero-badge{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);border:0.5px solid var(--gold);padding:8px 24px;margin-bottom:52px;display:inline-block;animation:fadeUp 0.8s 0.2s both}
  .hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(52px,8vw,110px);font-weight:300;line-height:0.95;color:var(--ink);animation:fadeUp 0.9s 0.4s both}
  .hero-title em{font-style:italic;color:var(--gold)}
  .hero-rule{width:1px;height:60px;background:var(--border-s);margin:44px auto;animation:fadeUp 0.7s 0.8s both}
  .hero-sub{font-size:13px;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink-soft);max-width:520px;line-height:1.9;animation:fadeUp 0.8s 1s both}
  .hero-scroll{position:absolute;bottom:48px;left:0;right:0;text-align:center;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(197,163,90,0.5);animation:fadeUp 0.8s 1.4s both}

  .s-label{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
  .s-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,64px);font-weight:300;line-height:1.05;color:var(--ink);margin-bottom:20px}
  .s-title em{font-style:italic;color:var(--gold)}
  .s-body{font-size:15px;font-weight:300;line-height:1.9;color:var(--ink-soft);max-width:640px}

  .case-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:56px;background:rgba(197,163,90,0.1)}
  .case-card{background:var(--ivory);padding:52px 44px;border:0.5px solid var(--border);transition:border-color 0.3s;cursor:default}
  .case-card:hover{border-color:var(--gold)}
  .case-tag{font-size:9px;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:20px;display:inline-block;padding:4px 12px}
  .tag-success{background:var(--green-pale);color:var(--green)}
  .tag-fail{background:var(--red-pale);color:var(--red)}
  .case-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:var(--ink);margin-bottom:6px}
  .case-cat{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:24px}
  .case-body{font-size:13px;font-weight:300;line-height:1.85;color:var(--ink-soft)}
  .case-lesson{margin-top:24px;padding:18px 22px;border-left:2px solid var(--gold);background:var(--gold-pale);font-size:13px;font-style:italic;color:var(--ink-mid);line-height:1.7}
  .case-points{margin-top:16px;display:flex;flex-direction:column;gap:8px}
  .case-point{display:flex;gap:12px;font-size:12px;font-weight:300;color:var(--ink-soft);line-height:1.7}
  .case-point::before{content:"·";color:var(--gold);flex-shrink:0;font-size:16px;line-height:1.4}

  .principle-strip{background:var(--ink);padding:80px;margin:0}
  .principle-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:rgba(197,163,90,0.1);margin-top:48px}
  .principle-card{background:var(--ink);padding:36px 28px;text-align:center;transition:background 0.3s}
  .principle-card:hover{background:#221810}
  .principle-num{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:200;color:rgba(197,163,90,0.2);line-height:1;margin-bottom:14px}
  .principle-pct{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:var(--gold);margin-bottom:8px}
  .principle-name{font-size:11px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:rgba(250,246,238,0.7);margin-bottom:10px}
  .principle-body{font-size:11px;font-weight:300;color:rgba(250,246,238,0.4);line-height:1.7}
  .principle-highlight{border:1px solid rgba(197,163,90,0.4) !important}
  .principle-highlight .principle-pct{font-size:36px}
  .principle-highlight .principle-name{color:var(--gold)}

  .discovery-section{background:var(--cream-deep);padding:100px 80px}
  .form-intro{max-width:680px;margin:0 auto 72px;text-align:center}
  .q-block{max-width:800px;margin:0 auto 64px}
  .q-num{font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
  .q-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:var(--ink);margin-bottom:8px}
  .q-sub{font-size:13px;font-weight:300;color:var(--ink-soft);line-height:1.8;margin-bottom:24px}
  .q-why{font-size:11px;font-weight:300;color:var(--gold);font-style:italic;margin-bottom:20px;padding:12px 18px;border-left:2px solid var(--gold);background:var(--gold-pale)}

  .kl-textarea,.kl-input{width:100%;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);background:var(--ivory);border:0.5px solid var(--border);padding:14px 18px;outline:none;transition:border-color 0.3s;resize:vertical;appearance:none;-webkit-appearance:none}
  .kl-textarea:focus,.kl-input:focus{border-color:var(--gold)}
  .kl-textarea{min-height:100px}
  .input-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
  .input-single{margin-bottom:14px}
  .input-label{font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px;display:block}

  .choice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
  .choice-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
  .choice-btn{border:0.5px solid var(--border);background:var(--ivory);padding:14px 16px;cursor:pointer;text-align:left;transition:all 0.25s;font-family:'Jost',sans-serif}
  .choice-btn:hover{border-color:var(--gold);background:var(--gold-pale)}
  .choice-btn.selected{border-color:var(--gold);background:var(--gold);color:var(--ink)}
  .choice-btn .c-main{font-size:13px;font-weight:400;color:inherit;display:block;margin-bottom:2px}
  .choice-btn .c-sub{font-size:10px;font-weight:300;color:var(--ink-soft);display:block}
  .choice-btn.selected .c-sub{color:var(--ink-mid)}

  .scale-row{display:flex;gap:8px;margin-bottom:8px}
  .scale-btn{flex:1;border:0.5px solid var(--border);background:var(--ivory);padding:12px 8px;cursor:pointer;font-size:12px;font-weight:300;color:var(--ink-soft);transition:all 0.25s;font-family:'Jost',sans-serif;text-align:center}
  .scale-btn:hover{border-color:var(--gold);color:var(--ink)}
  .scale-btn.selected{background:var(--gold);border-color:var(--gold);color:var(--ink);font-weight:400}
  .scale-labels{display:flex;justify-content:space-between;font-size:10px;color:var(--ink-soft);letter-spacing:0.1em;margin-bottom:14px}

  .submit-area{max-width:800px;margin:48px auto 0;text-align:center}
  .submit-btn{background:var(--gold);border:none;color:var(--ink);font-family:'Jost',sans-serif;font-size:12px;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;padding:18px 60px;cursor:pointer;transition:opacity 0.2s;display:inline-block}
  .submit-btn:hover{opacity:0.85}
  .submit-note{font-size:11px;font-weight:300;color:var(--ink-soft);margin-top:16px;line-height:1.8}

  .confirm-screen{text-align:center;padding:80px 40px;max-width:600px;margin:0 auto}
  .confirm-icon{font-size:40px;margin-bottom:24px;color:var(--gold)}

  footer.kl-footer{background:var(--ink);padding:56px 80px;display:flex;align-items:center;justify-content:space-between;border-top:0.5px solid rgba(197,163,90,0.15)}
  .footer-logo-text{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;color:rgba(250,246,238,0.6);letter-spacing:0.08em}
  .footer-right{font-size:11px;font-weight:300;color:rgba(250,246,238,0.3);text-align:right;line-height:1.9;letter-spacing:0.1em}

  .gold-rule{border:none;border-top:0.5px solid var(--border);margin:0 80px}
  .dark-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(197,163,90,0.3),transparent);margin:0}

  .op-visual{background:var(--ink);padding:100px 80px}
  .op-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1100px;margin:0 auto}
  .price-demo{border:0.5px solid rgba(197,163,90,0.2);padding:44px;max-width:400px}
  .pd-header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:0.5px solid rgba(197,163,90,0.15);padding-bottom:20px;margin-bottom:24px}
  .pd-brand{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:var(--cream)}
  .pd-sku{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(250,246,238,0.35);text-align:right}
  .pd-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid rgba(197,163,90,0.08)}
  .pd-lbl{font-size:12px;font-weight:300;color:rgba(250,246,238,0.5)}
  .pd-val{font-size:14px;font-family:'Cormorant Garamond',serif;color:rgba(250,246,238,0.9)}
  .pd-total{display:flex;justify-content:space-between;padding-top:20px;border-top:1px solid var(--gold);margin-top:10px}
  .pd-total-lbl{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold)}
  .pd-total-val{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:var(--cream)}
  .opm-label{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
  .opm-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,52px);font-weight:300;color:var(--cream);line-height:1.1;margin-bottom:24px}
  .opm-title em{color:var(--gold);font-style:italic}
  .opm-body{font-size:14px;font-weight:300;color:rgba(250,246,238,0.55);line-height:1.9}
  .opm-stats{display:flex;gap:48px;margin-top:40px;padding-top:32px;border-top:0.5px solid rgba(197,163,90,0.2)}
  .opm-stat-num{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;color:var(--gold);line-height:1}
  .opm-stat-lbl{font-size:11px;font-weight:300;color:rgba(250,246,238,0.4);margin-top:6px}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s ease,transform 0.8s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}
  .rd1{transition-delay:0.1s}.rd2{transition-delay:0.22s}.rd3{transition-delay:0.34s}.rd4{transition-delay:0.46s}

  @media(max-width:900px){
    .case-grid,.input-row,.choice-grid,.principle-grid,.op-grid{grid-template-columns:1fr}
    nav.kl-nav{padding:16px 24px}
    .discovery-section,.op-visual,.principle-strip{padding:80px 24px}
    .hero{padding:120px 24px 80px}
    .gold-rule{margin:0 24px}
    footer.kl-footer{padding:48px 24px;flex-direction:column;gap:24px;text-align:center}
    .footer-right{text-align:center}
  }
`;

function useScrollProgress() {
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      const el = document.getElementById("kl-progress-fill");
      if (el) el.style.width = pct + "%";
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Navbar() {
  return (
    <nav className="kl-nav h-[60px]">
      <div className="nav-logo-text">
        <img src={grofesionlogo} alt="grofesion-footer-logo" className="w-48" />
      </div>
      <div className="nav-right">Brand Discovery · Kalanikethan 2025</div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="hero-grid" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-badge">Magsmen Brand Consultants · Confidential</div>
        <h1 className="hero-title">Before the Name,<br />comes the <em>Clarity.</em></h1>
        <div className="hero-rule" />
        <p className="hero-sub">This page has two parts. First, case studies that show why brand success goes far beyond the name. Second, twelve discovery questions that will give both of us the clarity to get this right.</p>
        <div className="hero-scroll">Scroll to begin · 8 minutes</div>
      </div>
    </div>
  );
}

function OpenPricing() {
  return (
    <div className="op-visual">
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="reveal rd1"><div className="s-label" style={{ color: "var(--gold)" }}>The Brand Idea</div></div>
        <div className="reveal rd2">
          <div className="s-title" style={{ color: "var(--cream)", marginBottom: "60px" }}>
            What Open Pricing<br /><em>Actually Means</em>
          </div>
        </div>
        <div className="op-grid">
          <div className="price-demo reveal rd3">
            <div className="pd-header">
              <div className="pd-brand">Kalanikethan</div>
              <div className="pd-sku">Kanchipuram Pattu<br />Pure Silk · 6.2 Yards</div>
            </div>
            <div className="pd-row"><span className="pd-lbl">Fabric Cost (Loom Price)</span><span className="pd-val">₹ 7,200</span></div>
            <div className="pd-row"><span className="pd-lbl">Weaving and Finishing</span><span className="pd-val">₹ 1,800</span></div>
            <div className="pd-row"><span className="pd-lbl">Transport and Quality Check</span><span className="pd-val">₹ 400</span></div>
            <div className="pd-row"><span className="pd-lbl">Store and Staff Cost</span><span className="pd-val">₹ 1,100</span></div>
            <div className="pd-row">
              <span className="pd-lbl" style={{ color: "var(--gold)" }}>Our Margin</span>
              <span className="pd-val" style={{ color: "var(--gold)" }}>₹ 1,500 · 12%</span>
            </div>
            <div className="pd-total">
              <span className="pd-total-lbl">You Pay</span>
              <span className="pd-total-val">₹ 12,000</span>
            </div>
            <div style={{ marginTop: "18px", fontSize: "10px", color: "rgba(250,246,238,0.25)", textAlign: "center", letterSpacing: "0.12em" }}>
              This is what you are paying for. Nothing more.
            </div>
          </div>
          <div className="reveal rd4">
            <div className="opm-label">The Category Disruption</div>
            <div className="opm-title">No saree brand in India has ever shown a customer <em>this.</em></div>
            <div className="opm-body">This price tag is not a feature. It is the entire brand. Every woman who sees it will tell another woman. Every woman who buys will return because she trusts the number. This is the brand promise. Whatever name we put on the store, it must serve this idea without apology.</div>
            <div className="opm-stats">
              <div><div className="opm-stat-num">12%</div><div className="opm-stat-lbl">Declared margin. Fixed. Published. Honest.</div></div>
              <div><div className="opm-stat-num">4</div><div className="opm-stat-lbl">Lines that explain what every woman wants to know.</div></div>
              <div><div className="opm-stat-num">0</div><div className="opm-stat-lbl">Hidden charges in any transaction.</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const successCases = [
  {
    name: "D-Mart", cat: "Grocery Retail · Founded 2002 · ₹2.5L Cr Market Cap",
    body: "D stands for Damani. A founder initial plus a generic suffix. The name means nothing. Yet D-Mart is the most trusted retail brand in India.",
    points: ["Owns its real estate instead of leasing. Lowered costs by 30 percent versus every competitor", "Pays vendors in 8 days instead of the industry norm of 60 days. Earns better prices", "Same product at the same price every day. No festival markups. No surprises", "Simple clean stores. No aggressive selling. The experience is predictable and trustworthy"],
    lesson: "The name became iconic only after the business became iconic. The operating system built the brand. The name held it."
  },
  {
    name: "Pothys", cat: "Saree Retail · Founded 1925 · ₹1,000 Cr+ Revenue",
    body: "A family surname. No cultural meaning. No language depth. Just a name. Yet Pothys is the most visited saree destination in South India.",
    points: ["Multi-floor stores curated by occasion, region, and fabric. A woman can spend half a day inside", "Staff trained as advisors, not salespeople. They identify weaves and recommend for occasions", "Visible price tags on every saree. No bargaining. The price is the price", "Three generations of women have bought their sarees from Pothys. The trust is inherited"],
    lesson: "The floor experience, the staff knowledge, and the transparent pricing built a brand that a family surname could never have built on its own."
  },
  {
    name: "Nalli Silks", cat: "Saree Retail · Founded 1928 · 35+ Stores Pan India",
    body: "A founder surname. Nalli Chinnasami Chetty. No heritage in the name. Purely personal. Yet Nalli is the default word for premium silk sarees across South India.",
    points: ["Specialised in Kanchipuram silks exclusively before expanding. Became the authority on one product", "A full return policy on quality concerns. Radical in 1950. Still the primary trust anchor today", "Store as event. Women dress up to go to Nalli. The store visit is itself a cultural moment", "No discounting. The price is the price. This alone created the premium perception over 95 years"],
    lesson: "Craft authority, quality guarantee, and pricing discipline built Nalli. The founder's surname just became the label for what the business created."
  },
  {
    name: "Deepam Silks", cat: "Saree Retail · Founded 1948 · ₹500 Cr+ from One Store",
    body: "Deepam means lamp. A common word in multiple Indian languages. Yet Deepam Silks in Bangalore generates over five hundred crore rupees from a single flagship.",
    points: ["One massive flagship store instead of expansion. The store became a pilgrimage destination", "The building itself became the brand. Women say \"let us go to Deepam\" the way they say \"Lalbagh\"", "Fifty thousand sarees in stock. A woman never leaves without finding something", "Refused all franchise offers. Scarcity through non-expansion made the brand more desirable"],
    lesson: "A common word became legendary because the store experience was unforgettable. The name did not create the legend. The store did."
  }
];

const failureCases = [
  {
    name: "Kingfisher Airlines", cat: "Aviation · Peak Revenue ₹6,233 Cr · Closed 2012",
    body: "Iconic name. Instant recall. Backed by the King of Good Times brand. One hundred percent recall within months of launch. Still went bankrupt.",
    points: ["Priced tickets below cost to capture market share. Unsustainable from day one", "Staff salaries unpaid for six months. Service quality collapsed from inside", "Flights cancelled without notice. Customer trust destroyed publicly", "Nine thousand crore rupees in unpaid loans across seventeen banks"],
    lesson: "The name could not compensate when the financial model collapsed. A brand cannot survive on its name when the operating system is broken."
  },
  {
    name: "Subhiksha Retail", cat: "Grocery Retail · 1,650 Stores · Closed 2009",
    body: "Subhiksha means prosperity and abundance. Auspicious. Culturally rich. Instantly understood across South India. A genuinely well-crafted name. Closed completely in 2009.",
    points: ["No air conditioning in stores to cut cost. Unbearable in Indian summers", "No individual price tags on products. Created customer suspicion despite being well-intentioned", "Empty shelves became normal as supplier credit lines collapsed", "The name promised abundance. The store delivered scarcity, heat, and confusion"],
    lesson: "This case is most relevant for Kalanikethan. The name promised one thing. The in-store reality delivered the opposite. The contradiction killed the brand every day."
  },
  {
    name: "Koutons Retail", cat: "Apparel Retail · 1,400 Stores · Collapsed 2013",
    body: "A constructed premium-sounding name designed for European aspiration. Strong recall. Pan-India presence. Owned the menswear category for a decade before collapse.",
    points: ["Aggressive franchise expansion without quality control. Store experience varied wildly by city", "Constant fifty and seventy percent discounting destroyed the premium positioning the name was trying to hold", "Inventory mismanagement created pile-ups in wrong markets", "A premium name cannot rescue a business operating like a discount retailer"],
    lesson: "The name said premium. The discount stickers said otherwise. When the name and the behaviour contradict each other, the behaviour always wins."
  },
  {
    name: "Vishal Mega Mart", cat: "Multi-category Retail · 172 Stores · Sold in Distress 2011",
    body: "Vishal means vast in Hindi. Mega Mart reinforces scale. A powerful combination that promised exactly what a destination retailer should. Still ended in a distress sale.",
    points: ["Expanded from 14 to 172 stores in three years without building supply chain to support it", "Vendors unpaid, inventory ageing, quality declining, customer trust eroding simultaneously", "Broken air conditioning, understaffed counters, long queues became the customer experience", "Seven hundred thirty crore rupees in debt with declining same-store sales"],
    lesson: "The name sold a story of scale and value. The operating system could not honour that story. The brand collapsed under the weight of its own promise."
  }
];

function CaseCard({ c, fail }) {
  return (
    <div className="case-card" style={fail ? { background: "white" } : {}}>
      <span className={`case-tag ${fail ? "tag-fail" : "tag-success"}`}>{fail ? "Failure" : "Success"}</span>
      <div className="case-name">{c.name}</div>
      <div className="case-cat">{c.cat}</div>
      <div className="case-body">{c.body}</div>
      <div className="case-points">
        {c.points.map((p, i) => <div key={i} className="case-point">{p}</div>)}
      </div>
      <div className="case-lesson" style={fail ? { borderLeftColor: "var(--red)", background: "var(--red-pale)" } : {}}>{c.lesson}</div>
    </div>
  );
}

function SuccessCases() {
  return (
    <div style={{ background: "var(--ivory)", padding: "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal rd1"><div className="s-label">Part One · Success Case Studies</div></div>
        <div className="reveal rd2"><div className="s-title">Brands That Won<br /><em>Without a Great Name</em></div></div>
        <div className="reveal rd3"><p className="s-body">These five brands became institutions. None of them won because of their name. Read what actually built them.</p></div>
        <div className="case-grid reveal rd4">
          {successCases.map(c => <CaseCard key={c.name} c={c} fail={false} />)}
        </div>
      </div>
    </div>
  );
}

function FailureCases() {
  return (
    <div style={{ background: "var(--cream-deep)", padding: "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal rd1"><div className="s-label">Part Two · Failure Case Studies</div></div>
        <div className="reveal rd2"><div className="s-title">Brands That Failed<br /><em>Despite a Great Name</em></div></div>
        <div className="reveal rd3"><p className="s-body">These brands had strong names and real momentum. The name did not save them when the operating system broke underneath.</p></div>
        <div className="case-grid reveal rd4">
          {failureCases.map(c => <CaseCard key={c.name} c={c} fail={true} />)}
        </div>
      </div>
    </div>
  );
}

const principles = [
  { num: "01", pct: "35%", name: "Customer Experience", body: "Store layout · staff training · personal advisor model · pricing transparency · respect at every touchpoint", hi: false },
  { num: "02", pct: "25%", name: "Inventory Authority", body: "Range depth in chosen categories · direct weaver relationships · curation that signals expertise", hi: false },
  { num: "03", pct: "15%", name: "Operating Discipline", body: "Consistent pricing every day · predictable quality · return policy · supply chain reliability", hi: false },
  { num: "04", pct: "10%", name: "Cultural Positioning", body: "Festival and wedding ownership · generational trust · story of craft, weave, and tradition", hi: false },
  { num: "05", pct: "10%", name: "Physical Identity", body: "Store architecture · interior design · lighting · signage · sensory consistency across locations", hi: false },
  { num: "06", pct: "5%", name: "The Name", body: "Recall · trademark protection · bilingual readability · cultural appropriateness · scalability", hi: true },
];

function PrincipleStrip() {
  return (
    <div className="principle-strip">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal rd1"><div className="s-label" style={{ color: "var(--gold)" }}>The Framework</div></div>
        <div className="reveal rd2"><div className="s-title" style={{ color: "var(--cream)", marginBottom: "8px" }}>What Actually<br /><em>Builds a Brand</em></div></div>
        <div className="reveal rd3"><p className="s-body" style={{ color: "rgba(250,246,238,0.5)" }}>Six dimensions determine brand equity in saree retail. The name is the last one. Understanding this changes everything about how we choose it.</p></div>
        <div className="principle-grid reveal rd4">
          {principles.map(p => (
            <div key={p.num} className={`principle-card${p.hi ? " principle-highlight" : ""}`}>
              <div className="principle-num">{p.num}</div>
              <div className="principle-pct">{p.pct}</div>
              <div className="principle-name">{p.name}</div>
              <div className="principle-body">{p.body}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "40px", padding: "24px 32px", border: "0.5px solid rgba(197,163,90,0.25)", background: "rgba(197,163,90,0.05)", maxWidth: "800px" }}>
          <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(250,246,238,0.6)", lineHeight: 1.9 }}>
            The name is 5 percent of the brand equity. When the other 95 percent is weak, no name rescues the business. When the other 95 percent is strong, almost any name can succeed. This is why Pothys and RMKV became legendary with ordinary names. And why Kingfisher and Subhiksha failed despite powerful ones.
          </p>
        </div>
      </div>
    </div>
  );
}

function ScaleRow({ id, label, value, onChange }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <span className="input-label">{label}</span>
      <div className="scale-row">
        {[1, 2, 3, 4, 5].map(v => (
          <button
            key={v}
            className={`scale-btn${value === v ? " selected" : ""}`}
            onClick={() => onChange(v)}
          >{v}</button>
        ))}
      </div>
      <div className="scale-labels"><span>Not important</span><span>Essential</span></div>
    </div>
  );
}

function ChoiceGrid({ options, selected, onSelect, cols = 3 }) {
  return (
    <div className={cols === 2 ? "choice-grid-2" : "choice-grid"}>
      {options.map(opt => (
        <button
          key={opt.main}
          className={`choice-btn${selected === opt.main ? " selected" : ""}`}
          onClick={() => onSelect(opt.main)}
        >
          <span className="c-main">{opt.main}</span>
          <span className="c-sub">{opt.sub}</span>
        </button>
      ))}
    </div>
  );
}

function DiscoveryForm() {
  const [form, setForm] = useState({
    q1: "", q2: "", q2_other: "", q3: "", q4: "", q5: "", q5_other: "",
    q6: "", q6_other: "", q7: "", q8: [0, 0, 0, 0, 0, 0],
    q9: "", q10: "", q11: "", q12: "",
    name: "", role: "", email: "", time: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const setQ8 = (i, v) => {
    const arr = [...form.q8];
    arr[i] = v;
    setForm(f => ({ ...f, q8: arr }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter your name and email before submitting.");
      return;
    }

    setSending(true);

    const scaleNames = [
      "Telugu culture connection",
      "Premium and aspirational",
      "Connection to silk or saree",
      "Easy to say in 3 seconds",
      "Scalable pan-India",
      "Unique, never heard before"
    ];
    const scales = form.q8.map((v, i) => `${scaleNames[i]}: ${v || "not answered"}/5`).join(" | ");

    try {
      // Formspree - replace YOUR_FORM_ID with the ID from formspree.io
      // Steps: go to formspree.io → New Form → enter connect@magsmen.com → copy the form ID
      const FORMSPREE_ID = "mkoavvrn";

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: `Brand Discovery Responses · Kalanikethan · ${form.name}`,
          _replyto: form.email,
          "Submitted By": `${form.name} (${form.role})`,
          "Submitter Email": form.email,
          "Best Call Time": form.time,
          "Q1 - Woman on opening day": form.q1,
          "Q2 - Feeling she takes home": `${form.q2}${form.q2_other ? " — " + form.q2_other : ""}`,
          "Q3 - What she tells her friend": form.q3,
          "Q4 - Store they most admire": form.q4,
          "Q5 - One thing done better": `${form.q5}${form.q5_other ? " — " + form.q5_other : ""}`,
          "Q6 - Why Saadi Mart landed": `${form.q6}${form.q6_other ? " — " + form.q6_other : ""}`,
          "Q7 - What did not work in other names": form.q7,
          "Q8 - Naming priority scales": scales,
          "Q9 - Kalave vs main store": form.q9,
          "Q10 - Geographic ambition": form.q10,
          "Q11 - Staff answer about store name": form.q11,
          "Q12 - What has been in their mind": form.q12,
        }),
      });

      if (res.ok) {
        setSending(false);
        setSubmitted(true);
        setTimeout(() => {
          document.getElementById("confirm-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      } else {
        const data = await res.json();
        throw new Error(data?.error || "Submission failed");
      }
    } catch (err) {
      setSending(false);
      console.error("Submission error:", err);
      alert("Submission failed: " + (err.message || "Unknown error") + "\n\nPlease email connect@magsmen.com directly.");
    }
  };

  const q2opts = [
    { main: "Proud", sub: "She feels she made the right decision" },
    { main: "Respected", sub: "She was treated with dignity" },
    { main: "Confident", sub: "She knows exactly what she paid and why" },
    { main: "Excited", sub: "She cannot wait to wear it" },
    { main: "Empowered", sub: "She was informed, not sold to" },
    { main: "Delighted", sub: "The experience exceeded her expectation" },
  ];
  const q5opts = [
    { main: "Open Pricing", sub: "Full cost breakdown on every saree" },
    { main: "Range Depth", sub: "More variety in chosen category than anyone" },
    { main: "Staff Knowledge", sub: "Advisors who know every weave and occasion" },
    { main: "Store Experience", sub: "The most beautiful saree shopping environment" },
    { main: "Weaver Relationships", sub: "Direct from loom, no middlemen" },
    { main: "Pricing Guarantee", sub: "No competitor sells the same weave cheaper" },
  ];
  const q6opts = [
    { main: "It sounds familiar", sub: "A woman already knows the word Saadi" },
    { main: "It sounds honest", sub: "Mart feels like a place of fair value" },
    { main: "It sounds accessible", sub: "Not too premium, not too ordinary" },
    { main: "It sounds Telugu", sub: "Rooted in the language and culture" },
    { main: "It is easy to say", sub: "Women will say it naturally in conversation" },
    { main: "It sounds confident", sub: "Direct, clear, no decoration needed" },
  ];
  const q10opts = [
    { main: "One flagship city", sub: "Dominate one market first" },
    { main: "2 to 3 cities in AP and Telangana", sub: "Regional brand" },
    { main: "All major AP and Telangana cities", sub: "State-wide brand" },
    { main: "Pan-India eventually", sub: "National brand ambition" },
  ];
  const scaleLabels = ["Connection to Telugu culture and language", "Sounds premium and aspirational", "Connection to silk or saree", "Easy to say and remember in 3 seconds", "Scalable to other cities and eventually pan-India", "Unique, never heard before in any brand"];

  if (submitted) {
    return (
      <div id="confirm-section" className="confirm-screen">
        <div className="confirm-icon">✦</div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "56px", fontWeight: 300, color: "var(--ink)", marginBottom: "16px" }}>
          Thank you,<br /><em style={{ color: "var(--gold)" }}>{form.name.split(" ")[0]}</em>
        </div>
        <p style={{ fontSize: "15px", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.9, marginTop: "24px" }}>
          Your responses have been received by the Magsmen team at connect@magsmen.com. We will review every answer carefully before we meet. The next conversation will not have a batch of names. It will have one recommendation, built entirely from what you have shared here.
        </p>
        <p style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-soft)", marginTop: "16px", lineHeight: 1.8 }}>
          We will reach out within one business day to confirm the call time you shared.
        </p>
        <div style={{ marginTop: "40px", padding: "24px 32px", border: "0.5px solid var(--border)", background: "var(--gold-pale)" }}>
          <p style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-mid)", lineHeight: 1.8, fontStyle: "italic" }}>"Before the name, comes the clarity. You have given us the clarity. The name will follow."</p>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginTop: "12px" }}>Sandeep N · Magsmen Brand Consultants</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-intro reveal">
        <div className="s-label" style={{ textAlign: "center" }}>Part Three · Brand Discovery</div>
        <div className="s-title" style={{ textAlign: "center", marginBottom: "16px" }}>Twelve Questions<br /><em>That Change Everything</em></div>
        <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.9, textAlign: "center" }}>Your answers to these questions are not for evaluation. They are the raw material from which the right name will emerge naturally. There are no correct answers. Honest answers are the only useful ones.</p>
      </div>

      {/* BLOCK A */}
      <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block A · The Customer</div>
      </div>
      <div className="q-block reveal rd1">
        <div className="q-num">Question 01 of 12</div>
        <div className="q-title">Picture the woman walking into your first store on opening day.</div>
        <div className="q-sub">What is she wearing? What is she carrying? What time of day is it? Why did she come today specifically?</div>
        <div className="q-why">Why we ask: The name must speak to this woman. Not to a category. Not to a market segment. To her, specifically. The more vividly you can see her, the more precisely we can name the brand for her.</div>
        <textarea className="kl-textarea" placeholder="Describe her as you see her in your mind..." value={form.q1} onChange={e => setForm(f => ({ ...f, q1: e.target.value }))} />
      </div>
      <div className="q-block reveal rd2">
        <div className="q-num">Question 02 of 12</div>
        <div className="q-title">She has just paid and is walking out of your store with a saree.</div>
        <div className="q-sub">What one feeling do you most want her to carry out? Choose the one that matters most to you.</div>
        <div className="q-why">Why we ask: The name carries an emotion before it carries a meaning. This question identifies the emotion the brand should lead with.</div>
        <ChoiceGrid options={q2opts} selected={form.q2} onSelect={v => setForm(f => ({ ...f, q2: v }))} />
        <input className="kl-input" type="text" placeholder="Or describe the feeling in your own words..." value={form.q2_other} onChange={e => setForm(f => ({ ...f, q2_other: e.target.value }))} />
      </div>
      <div className="q-block reveal rd3">
        <div className="q-num">Question 03 of 12</div>
        <div className="q-title">She tells her friend about your store that evening.</div>
        <div className="q-sub">What is the one sentence she uses? Write it the way she would actually say it, in Telugu or English or both.</div>
        <div className="q-why">Why we ask: Word of mouth is how saree brands grow in AP and Telangana. The name must fit naturally into the sentence she speaks. If the name is awkward in her mouth, word of mouth breaks down.</div>
        <textarea className="kl-textarea" placeholder="Write how she would describe your store to her friend..." value={form.q3} onChange={e => setForm(f => ({ ...f, q3: e.target.value }))} />
      </div>

      {/* BLOCK B */}
      <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block B · The Competition</div>
      </div>
      <div className="q-block reveal rd1">
        <div className="q-num">Question 04 of 12</div>
        <div className="q-title">Which existing saree store in your city do you most admire, and why?</div>
        <div className="q-sub">This could be a local store, a regional brand, or a national brand. What specifically about them earns your respect?</div>
        <div className="q-why">Why we ask: Admiration tells us your aspirational benchmark. The brand we are naming is positioning itself in relation to this store. We need to know where you want to stand relative to it.</div>
        <textarea className="kl-textarea" placeholder="Name the store and tell us what specifically you admire about them..." value={form.q4} onChange={e => setForm(f => ({ ...f, q4: e.target.value }))} />
      </div>
      <div className="q-block reveal rd2">
        <div className="q-num">Question 05 of 12</div>
        <div className="q-title">What is the one thing you will do better than any competitor in your market?</div>
        <div className="q-sub">Not multiple things. The one thing that if you execute it perfectly, makes you the first choice for the woman who knows about it.</div>
        <div className="q-why">Why we ask: The name should signal this one thing, or at minimum not contradict it. This is the brand's primary weapon. The name must not soften it.</div>
        <ChoiceGrid options={q5opts} selected={form.q5} onSelect={v => setForm(f => ({ ...f, q5: v }))} />
        <input className="kl-input" type="text" placeholder="Or describe it in your own words..." value={form.q5_other} onChange={e => setForm(f => ({ ...f, q5_other: e.target.value }))} />
      </div>

      {/* BLOCK C */}
      <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block C · The Name</div>
      </div>
      <div className="q-block reveal rd1">
        <div className="q-num">Question 06 of 12</div>
        <div className="q-title">When you say "Saadi Mart" out loud, what specifically do you like about it?</div>
        <div className="q-sub">Not what you think you should like about it from a strategy perspective. What genuinely appeals to you when you say those two words.</div>
        <div className="q-why">Why we ask: You liked Saadi Mart for a reason. That reason is the creative direction for the second name. We have been guessing at it. Tell us directly.</div>
        <ChoiceGrid options={q6opts} selected={form.q6} onSelect={v => setForm(f => ({ ...f, q6: v }))} />
        <input className="kl-input" type="text" placeholder="Or tell us in your own words what you like about it..." value={form.q6_other} onChange={e => setForm(f => ({ ...f, q6_other: e.target.value }))} />
      </div>
      <div className="q-block reveal rd2">
        <div className="q-num">Question 07 of 12</div>
        <div className="q-title">What specifically did not work in the names we suggested after Saadi Mart?</div>
        <div className="q-sub">Sogasari, Cheera Mart, Cheli Mart, Kalavé, Pattu Mart, Vaaga Mart. For any that felt wrong, tell us what felt wrong. Tone, meaning, sound, length, anything.</div>
        <div className="q-why">Why we ask: Understanding rejection is more valuable than presenting options. One sentence about why a name did not work tells us more than ten names that did not land.</div>
        <textarea className="kl-textarea" placeholder="Tell us what felt off about any of the names you rejected..." value={form.q7} onChange={e => setForm(f => ({ ...f, q7: e.target.value }))} />
      </div>
      <div className="q-block reveal rd3">
        <div className="q-num">Question 08 of 12</div>
        <div className="q-title">You mentioned connection to silks without using the word Mart. Rate how important each of these qualities is to you for the second name.</div>
        <div className="q-sub">Move your selection for each quality on a scale of 1 to 5.</div>
        <div className="q-why">Why we ask: You want the name to connect to silks and feel unique and scalable. These three things can pull in different directions. Understanding their relative importance helps us make the trade-off correctly.</div>
        <div style={{ marginTop: "16px" }}>
          {scaleLabels.map((lbl, i) => (
            <ScaleRow key={i} label={lbl} value={form.q8[i]} onChange={v => setQ8(i, v)} id={undefined} />
          ))}
        </div>
      </div>

      {/* BLOCK D */}
      <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block D · The Business</div>
      </div>
      <div className="q-block reveal rd1">
        <div className="q-num">Question 09 of 12</div>
        <div className="q-title">You mentioned Kalavé as a possible premium-format store name for later. Can you describe what that store looks like versus the first store?</div>
        <div className="q-sub">Is it a different price point? A different customer? A different experience? A different city? Help us understand the two-brand architecture you are envisioning.</div>
        <div className="q-why">Why we ask: If Kalavé is the premium and the second name is accessible-premium, the names need to create a deliberate hierarchy. We cannot name one without understanding the other.</div>
        <textarea className="kl-textarea" placeholder="Describe how the Kalave store feels different from the main store..." value={form.q9} onChange={e => setForm(f => ({ ...f, q9: e.target.value }))} />
      </div>
      <div className="q-block reveal rd2">
        <div className="q-num">Question 10 of 12</div>
        <div className="q-title">How many stores do you see in five years, and in which cities?</div>
        <div className="q-sub">A rough vision is fine. Single city, two cities, or pan-AP? This matters for the name because some names travel and some names belong to one place.</div>
        <div className="q-why">Why we ask: A name that works perfectly in Vijayawada may feel strange in Hyderabad or Chennai. Knowing the geographic ambition shapes the naming strategy.</div>
        <ChoiceGrid options={q10opts} selected={form.q10} onSelect={v => setForm(f => ({ ...f, q10: v }))} cols={2} />
      </div>
      <div className="q-block reveal rd3">
        <div className="q-num">Question 11 of 12</div>
        <div className="q-title">If a customer asks why your store is called what it is called, what answer do you want your staff to give?</div>
        <div className="q-sub">Not a marketing line. What do you want them to actually say, in plain language, when a curious customer asks?</div>
        <div className="q-why">Why we ask: The best names have a thirty-second story. The answer your staff gives is that story. If the name requires a five-minute explanation, it is the wrong name.</div>
        <textarea className="kl-textarea" placeholder="Write the answer your staff member gives to that question..." value={form.q11} onChange={e => setForm(f => ({ ...f, q11: e.target.value }))} />
      </div>
      <div className="q-block reveal rd4">
        <div className="q-num">Question 12 of 12</div>
        <div className="q-title">Is there a word, a feeling, a visual, or a name that you have had in your mind throughout this process that you have not yet told us?</div>
        <div className="q-sub">Anything. A word you heard somewhere. A feeling you cannot describe. A visual you keep coming back to. Something you dismissed as too simple or too strange. Write it here.</div>
        <div className="q-why">Why we ask: In every naming engagement, the client has a reference point they have not shared. It is usually the most useful thing they know. This is your space to say it.</div>
        <textarea className="kl-textarea" style={{ minHeight: "120px" }} placeholder="Write anything that has been in your mind. There is no wrong answer here..." value={form.q12} onChange={e => setForm(f => ({ ...f, q12: e.target.value }))} />
      </div>

      {/* SUBMISSION DETAILS */}
      <div style={{ maxWidth: "800px", margin: "48px auto 0", padding: "40px", background: "var(--ivory)", border: "0.5px solid var(--border)" }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 400, color: "var(--ink)", marginBottom: "24px" }}>Complete Your Submission</div>
        <div className="input-row">
          <div>
            <span className="input-label">Your Name</span>
            <input className="kl-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <span className="input-label">Your Designation</span>
            <input className="kl-input" type="text" placeholder="Founder / Director / etc" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
          </div>
        </div>
        <div className="input-single">
          <span className="input-label">Your Email Address</span>
          <input className="kl-input" type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="input-single">
          <span className="input-label">Best time for our follow-up call this week</span>
          <input className="kl-input" type="text" placeholder="e.g. Tuesday and Thursday after 3pm" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
        </div>
      </div>

      <div className="submit-area">
        <button className="submit-btn" onClick={handleSubmit} disabled={sending} style={{ opacity: sending ? 0.6 : 1, cursor: sending ? "not-allowed" : "pointer" }}>
          {sending ? "Sending..." : "Submit Discovery Responses →"}
        </button>
        <p className="submit-note">Your responses go directly to connect@magsmen.com. We will review them before our next meeting and come prepared with a precise name recommendation rather than another batch of options.</p>
      </div>
    </div>
  );
}

export default function KalaikethanBrandDiscovery() {
  useScrollProgress();
  useReveal();

  return (
    <>
      <style>{css}</style>
      <div id="kl-progress"><div id="kl-progress-fill" /></div>
      <Navbar />
      <Hero />
      <OpenPricing />
      <div className="dark-divider" />
      <SuccessCases />
      <div className="gold-rule" />
      <FailureCases />
      <PrincipleStrip />
      <div className="discovery-section" id="discovery">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <DiscoveryForm />
        </div>
      </div>
      <footer className="kl-footer">
        <div className="footer-logo-text">
          <img src={grofesionlogo2} alt="Grofesion Logo" className="w-40" />
        </div>
        <div className="footer-right">
          Brand Discovery · Kalanikethan 2025<br />
          Magsmen Brand Consultants · connect@magsmen.com<br />
          Confidential · Not for distribution
        </div>
      </footer>
    </>
  );
}










// import { useState, useEffect, useRef } from "react";
// import grofesionlogo from "../components/assets/logos/grofesion-logo.png";
// import grofesionlogo2 from "../components/assets/logos/grofesion-white.png";




// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&family=Noto+Serif+Telugu:wght@300;400&display=swap');
//   *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//   :root{
//     --gold:#C5A35A;--gold-pale:#F7F0DC;--gold-light:#E8D5A0;
//     --ink:#1A1410;--ink-mid:#3D2E1E;--ink-soft:#6B5744;
//     --cream:#FAF6EE;--cream-deep:#F2EAD8;--ivory:#FDFAF4;
//     --border:rgba(197,163,90,0.22);--border-s:rgba(197,163,90,0.5);
//     --green:#4A7C59;--green-pale:#EBF4EE;
//     --red:#8B3A2A;--red-pale:#F9EEEB;
//   }
//   html{scroll-behavior:smooth}
//   body{font-family:'Jost',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden}

//   nav.kl-nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:16px 60px;background:rgba(253,250,244,0.95);backdrop-filter:blur(14px);border-bottom:0.5px solid var(--border)}
//   .nav-logo-text{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--ink);letter-spacing:0.04em}
//   .nav-right{font-size:11px;font-weight:300;letter-spacing:0.2em;color:var(--ink-soft);text-transform:uppercase}

//   #kl-progress{position:fixed;top:0;left:0;right:0;z-index:300;height:2px;background:rgba(197,163,90,0.12)}
//   #kl-progress-fill{height:100%;background:var(--gold);width:0%;transition:width 0.3s}

//   .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 80px 80px;text-align:center;background:var(--ivory);position:relative;overflow:hidden}
//   .hero-grid{position:absolute;inset:0;opacity:0.03;background-image:repeating-linear-gradient(0deg,transparent,transparent 60px,var(--gold) 60px,var(--gold) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,var(--gold) 60px,var(--gold) 61px)}
//   .hero-badge{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);border:0.5px solid var(--gold);padding:8px 24px;margin-bottom:52px;display:inline-block;animation:fadeUp 0.8s 0.2s both}
//   .hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(52px,8vw,110px);font-weight:300;line-height:0.95;color:var(--ink);animation:fadeUp 0.9s 0.4s both}
//   .hero-title em{font-style:italic;color:var(--gold)}
//   .hero-rule{width:1px;height:60px;background:var(--border-s);margin:44px auto;animation:fadeUp 0.7s 0.8s both}
//   .hero-sub{font-size:13px;font-weight:300;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink-soft);max-width:520px;line-height:1.9;animation:fadeUp 0.8s 1s both}
//   .hero-scroll{position:absolute;bottom:48px;left:0;right:0;text-align:center;font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(197,163,90,0.5);animation:fadeUp 0.8s 1.4s both}

//   .s-label{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
//   .s-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,64px);font-weight:300;line-height:1.05;color:var(--ink);margin-bottom:20px}
//   .s-title em{font-style:italic;color:var(--gold)}
//   .s-body{font-size:15px;font-weight:300;line-height:1.9;color:var(--ink-soft);max-width:640px}

//   .case-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:56px;background:rgba(197,163,90,0.1)}
//   .case-card{background:var(--ivory);padding:52px 44px;border:0.5px solid var(--border);transition:border-color 0.3s;cursor:default}
//   .case-card:hover{border-color:var(--gold)}
//   .case-tag{font-size:9px;letter-spacing:0.35em;text-transform:uppercase;margin-bottom:20px;display:inline-block;padding:4px 12px}
//   .tag-success{background:var(--green-pale);color:var(--green)}
//   .tag-fail{background:var(--red-pale);color:var(--red)}
//   .case-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:var(--ink);margin-bottom:6px}
//   .case-cat{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:24px}
//   .case-body{font-size:13px;font-weight:300;line-height:1.85;color:var(--ink-soft)}
//   .case-lesson{margin-top:24px;padding:18px 22px;border-left:2px solid var(--gold);background:var(--gold-pale);font-size:13px;font-style:italic;color:var(--ink-mid);line-height:1.7}
//   .case-points{margin-top:16px;display:flex;flex-direction:column;gap:8px}
//   .case-point{display:flex;gap:12px;font-size:12px;font-weight:300;color:var(--ink-soft);line-height:1.7}
//   .case-point::before{content:"·";color:var(--gold);flex-shrink:0;font-size:16px;line-height:1.4}

//   .principle-strip{background:var(--ink);padding:80px;margin:0}
//   .principle-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:rgba(197,163,90,0.1);margin-top:48px}
//   .principle-card{background:var(--ink);padding:36px 28px;text-align:center;transition:background 0.3s}
//   .principle-card:hover{background:#221810}
//   .principle-num{font-family:'Cormorant Garamond',serif;font-size:40px;font-weight:200;color:rgba(197,163,90,0.2);line-height:1;margin-bottom:14px}
//   .principle-pct{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:var(--gold);margin-bottom:8px}
//   .principle-name{font-size:11px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:rgba(250,246,238,0.7);margin-bottom:10px}
//   .principle-body{font-size:11px;font-weight:300;color:rgba(250,246,238,0.4);line-height:1.7}
//   .principle-highlight{border:1px solid rgba(197,163,90,0.4) !important}
//   .principle-highlight .principle-pct{font-size:36px}
//   .principle-highlight .principle-name{color:var(--gold)}

//   .discovery-section{background:var(--cream-deep);padding:100px 80px}
//   .form-intro{max-width:680px;margin:0 auto 72px;text-align:center}
//   .q-block{max-width:800px;margin:0 auto 64px}
//   .q-num{font-size:10px;letter-spacing:0.35em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
//   .q-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:var(--ink);margin-bottom:8px}
//   .q-sub{font-size:13px;font-weight:300;color:var(--ink-soft);line-height:1.8;margin-bottom:24px}
//   .q-why{font-size:11px;font-weight:300;color:var(--gold);font-style:italic;margin-bottom:20px;padding:12px 18px;border-left:2px solid var(--gold);background:var(--gold-pale)}

//   .kl-textarea,.kl-input{width:100%;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;color:var(--ink);background:var(--ivory);border:0.5px solid var(--border);padding:14px 18px;outline:none;transition:border-color 0.3s;resize:vertical;appearance:none;-webkit-appearance:none}
//   .kl-textarea:focus,.kl-input:focus{border-color:var(--gold)}
//   .kl-textarea{min-height:100px}
//   .input-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
//   .input-single{margin-bottom:14px}
//   .input-label{font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:8px;display:block}

//   .choice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
//   .choice-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
//   .choice-btn{border:0.5px solid var(--border);background:var(--ivory);padding:14px 16px;cursor:pointer;text-align:left;transition:all 0.25s;font-family:'Jost',sans-serif}
//   .choice-btn:hover{border-color:var(--gold);background:var(--gold-pale)}
//   .choice-btn.selected{border-color:var(--gold);background:var(--gold);color:var(--ink)}
//   .choice-btn .c-main{font-size:13px;font-weight:400;color:inherit;display:block;margin-bottom:2px}
//   .choice-btn .c-sub{font-size:10px;font-weight:300;color:var(--ink-soft);display:block}
//   .choice-btn.selected .c-sub{color:var(--ink-mid)}

//   .scale-row{display:flex;gap:8px;margin-bottom:8px}
//   .scale-btn{flex:1;border:0.5px solid var(--border);background:var(--ivory);padding:12px 8px;cursor:pointer;font-size:12px;font-weight:300;color:var(--ink-soft);transition:all 0.25s;font-family:'Jost',sans-serif;text-align:center}
//   .scale-btn:hover{border-color:var(--gold);color:var(--ink)}
//   .scale-btn.selected{background:var(--gold);border-color:var(--gold);color:var(--ink);font-weight:400}
//   .scale-labels{display:flex;justify-content:space-between;font-size:10px;color:var(--ink-soft);letter-spacing:0.1em;margin-bottom:14px}

//   .submit-area{max-width:800px;margin:48px auto 0;text-align:center}
//   .submit-btn{background:var(--gold);border:none;color:var(--ink);font-family:'Jost',sans-serif;font-size:12px;font-weight:400;letter-spacing:0.25em;text-transform:uppercase;padding:18px 60px;cursor:pointer;transition:opacity 0.2s;display:inline-block}
//   .submit-btn:hover{opacity:0.85}
//   .submit-note{font-size:11px;font-weight:300;color:var(--ink-soft);margin-top:16px;line-height:1.8}

//   .confirm-screen{text-align:center;padding:80px 40px;max-width:600px;margin:0 auto}
//   .confirm-icon{font-size:40px;margin-bottom:24px;color:var(--gold)}

//   footer.kl-footer{background:var(--ink);padding:56px 80px;display:flex;align-items:center;justify-content:space-between;border-top:0.5px solid rgba(197,163,90,0.15)}
//   .footer-logo-text{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;color:rgba(250,246,238,0.6);letter-spacing:0.08em}
//   .footer-right{font-size:11px;font-weight:300;color:rgba(250,246,238,0.3);text-align:right;line-height:1.9;letter-spacing:0.1em}

//   .gold-rule{border:none;border-top:0.5px solid var(--border);margin:0 80px}
//   .dark-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(197,163,90,0.3),transparent);margin:0}

//   .op-visual{background:var(--ink);padding:100px 80px}
//   .op-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1100px;margin:0 auto}
//   .price-demo{border:0.5px solid rgba(197,163,90,0.2);padding:44px;max-width:400px}
//   .pd-header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:0.5px solid rgba(197,163,90,0.15);padding-bottom:20px;margin-bottom:24px}
//   .pd-brand{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:var(--cream)}
//   .pd-sku{font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(250,246,238,0.35);text-align:right}
//   .pd-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:0.5px solid rgba(197,163,90,0.08)}
//   .pd-lbl{font-size:12px;font-weight:300;color:rgba(250,246,238,0.5)}
//   .pd-val{font-size:14px;font-family:'Cormorant Garamond',serif;color:rgba(250,246,238,0.9)}
//   .pd-total{display:flex;justify-content:space-between;padding-top:20px;border-top:1px solid var(--gold);margin-top:10px}
//   .pd-total-lbl{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold)}
//   .pd-total-val{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:var(--cream)}
//   .opm-label{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
//   .opm-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,52px);font-weight:300;color:var(--cream);line-height:1.1;margin-bottom:24px}
//   .opm-title em{color:var(--gold);font-style:italic}
//   .opm-body{font-size:14px;font-weight:300;color:rgba(250,246,238,0.55);line-height:1.9}
//   .opm-stats{display:flex;gap:48px;margin-top:40px;padding-top:32px;border-top:0.5px solid rgba(197,163,90,0.2)}
//   .opm-stat-num{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;color:var(--gold);line-height:1}
//   .opm-stat-lbl{font-size:11px;font-weight:300;color:rgba(250,246,238,0.4);margin-top:6px}

//   @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
//   .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.8s ease,transform 0.8s ease}
//   .reveal.visible{opacity:1;transform:translateY(0)}
//   .rd1{transition-delay:0.1s}.rd2{transition-delay:0.22s}.rd3{transition-delay:0.34s}.rd4{transition-delay:0.46s}

//   @media(max-width:900px){
//     .case-grid,.input-row,.choice-grid,.principle-grid,.op-grid{grid-template-columns:1fr}
//     nav.kl-nav{padding:16px 24px}
//     .discovery-section,.op-visual,.principle-strip{padding:80px 24px}
//     .hero{padding:120px 24px 80px}
//     .gold-rule{margin:0 24px}
//     footer.kl-footer{padding:48px 24px;flex-direction:column;gap:24px;text-align:center}
//     .footer-right{text-align:center}
//   }
// `;

// function useScrollProgress() {
//   useEffect(() => {
//     const handler = () => {
//       const h = document.documentElement;
//       const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
//       const el = document.getElementById("kl-progress-fill");
//       if (el) el.style.width = pct + "%";
//     };
//     window.addEventListener("scroll", handler, { passive: true });
//     return () => window.removeEventListener("scroll", handler);
//   }, []);
// }

// function useReveal() {
//   useEffect(() => {
//     const obs = new IntersectionObserver(entries => {
//       entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
//     }, { threshold: 0.08 });
//     document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
//     return () => obs.disconnect();
//   }, []);
// }

// function Navbar() {
//   return (
//     <nav className="kl-nav h-[60px]">
        
//       <div className="nav-logo-text ">
//          <img src={grofesionlogo} alt="grofesion-footer-logo" className="w-48" />

//       </div>
//       <div className="nav-right">Brand Discovery · Kalanikethan 2025</div>
//     </nav>
//   );
// }

// function Hero() {
//   return (
//     <div className="hero">
//       <div className="hero-grid" />
//       <div style={{ position: "relative", zIndex: 1 }}>
//         <div className="hero-badge">Magsmen Brand Consultants · Confidential</div>
//         <h1 className="hero-title">Before the Name,<br />comes the <em>Clarity.</em></h1>
//         <div className="hero-rule" />
//         <p className="hero-sub">This page has two parts. First, case studies that show why brand success goes far beyond the name. Second, twelve discovery questions that will give both of us the clarity to get this right.</p>
//         <div className="hero-scroll">Scroll to begin · 8 minutes</div>
//       </div>
//     </div>
//   );
// }

// function OpenPricing() {
//   return (
//     <div className="op-visual">
//       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
//         <div className="reveal rd1"><div className="s-label" style={{ color: "var(--gold)" }}>The Brand Idea</div></div>
//         <div className="reveal rd2">
//           <div className="s-title" style={{ color: "var(--cream)", marginBottom: "60px" }}>
//             What Open Pricing<br /><em>Actually Means</em>
//           </div>
//         </div>
//         <div className="op-grid">
//           <div className="price-demo reveal rd3">
//             <div className="pd-header">
//               <div className="pd-brand">Kalanikethan</div>
//               <div className="pd-sku">Kanchipuram Pattu<br />Pure Silk · 6.2 Yards</div>
//             </div>
//             <div className="pd-row"><span className="pd-lbl">Fabric Cost (Loom Price)</span><span className="pd-val">₹ 7,200</span></div>
//             <div className="pd-row"><span className="pd-lbl">Weaving and Finishing</span><span className="pd-val">₹ 1,800</span></div>
//             <div className="pd-row"><span className="pd-lbl">Transport and Quality Check</span><span className="pd-val">₹ 400</span></div>
//             <div className="pd-row"><span className="pd-lbl">Store and Staff Cost</span><span className="pd-val">₹ 1,100</span></div>
//             <div className="pd-row">
//               <span className="pd-lbl" style={{ color: "var(--gold)" }}>Our Margin</span>
//               <span className="pd-val" style={{ color: "var(--gold)" }}>₹ 1,500 · 12%</span>
//             </div>
//             <div className="pd-total">
//               <span className="pd-total-lbl">You Pay</span>
//               <span className="pd-total-val">₹ 12,000</span>
//             </div>
//             <div style={{ marginTop: "18px", fontSize: "10px", color: "rgba(250,246,238,0.25)", textAlign: "center", letterSpacing: "0.12em" }}>
//               This is what you are paying for. Nothing more.
//             </div>
//           </div>
//           <div className="reveal rd4">
//             <div className="opm-label">The Category Disruption</div>
//             <div className="opm-title">No saree brand in India has ever shown a customer <em>this.</em></div>
//             <div className="opm-body">This price tag is not a feature. It is the entire brand. Every woman who sees it will tell another woman. Every woman who buys will return because she trusts the number. This is the brand promise. Whatever name we put on the store, it must serve this idea without apology.</div>
//             <div className="opm-stats">
//               <div><div className="opm-stat-num">12%</div><div className="opm-stat-lbl">Declared margin. Fixed. Published. Honest.</div></div>
//               <div><div className="opm-stat-num">4</div><div className="opm-stat-lbl">Lines that explain what every woman wants to know.</div></div>
//               <div><div className="opm-stat-num">0</div><div className="opm-stat-lbl">Hidden charges in any transaction.</div></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// type CaseStudy = { name: string; cat: string; body: string; points: string[]; lesson: string };

// const successCases: CaseStudy[] = [
//   {
//     name: "D-Mart", cat: "Grocery Retail · Founded 2002 · ₹2.5L Cr Market Cap",
//     body: "D stands for Damani. A founder initial plus a generic suffix. The name means nothing. Yet D-Mart is the most trusted retail brand in India.",
//     points: ["Owns its real estate instead of leasing. Lowered costs by 30 percent versus every competitor", "Pays vendors in 8 days instead of the industry norm of 60 days. Earns better prices", "Same product at the same price every day. No festival markups. No surprises", "Simple clean stores. No aggressive selling. The experience is predictable and trustworthy"],
//     lesson: "The name became iconic only after the business became iconic. The operating system built the brand. The name held it."
//   },
//   {
//     name: "Pothys", cat: "Saree Retail · Founded 1925 · ₹1,000 Cr+ Revenue",
//     body: "A family surname. No cultural meaning. No language depth. Just a name. Yet Pothys is the most visited saree destination in South India.",
//     points: ["Multi-floor stores curated by occasion, region, and fabric. A woman can spend half a day inside", "Staff trained as advisors, not salespeople. They identify weaves and recommend for occasions", "Visible price tags on every saree. No bargaining. The price is the price", "Three generations of women have bought their sarees from Pothys. The trust is inherited"],
//     lesson: "The floor experience, the staff knowledge, and the transparent pricing built a brand that a family surname could never have built on its own."
//   },
//   {
//     name: "Nalli Silks", cat: "Saree Retail · Founded 1928 · 35+ Stores Pan India",
//     body: "A founder surname. Nalli Chinnasami Chetty. No heritage in the name. Purely personal. Yet Nalli is the default word for premium silk sarees across South India.",
//     points: ["Specialised in Kanchipuram silks exclusively before expanding. Became the authority on one product", "A full return policy on quality concerns. Radical in 1950. Still the primary trust anchor today", "Store as event. Women dress up to go to Nalli. The store visit is itself a cultural moment", "No discounting. The price is the price. This alone created the premium perception over 95 years"],
//     lesson: "Craft authority, quality guarantee, and pricing discipline built Nalli. The founder's surname just became the label for what the business created."
//   },
//   {
//     name: "Deepam Silks", cat: "Saree Retail · Founded 1948 · ₹500 Cr+ from One Store",
//     body: "Deepam means lamp. A common word in multiple Indian languages. Yet Deepam Silks in Bangalore generates over five hundred crore rupees from a single flagship.",
//     points: ["One massive flagship store instead of expansion. The store became a pilgrimage destination", "The building itself became the brand. Women say \"let us go to Deepam\" the way they say \"Lalbagh\"", "Fifty thousand sarees in stock. A woman never leaves without finding something", "Refused all franchise offers. Scarcity through non-expansion made the brand more desirable"],
//     lesson: "A common word became legendary because the store experience was unforgettable. The name did not create the legend. The store did."
//   }
// ];

// const failureCases = [
//   {
//     name: "Kingfisher Airlines", cat: "Aviation · Peak Revenue ₹6,233 Cr · Closed 2012",
//     body: "Iconic name. Instant recall. Backed by the King of Good Times brand. One hundred percent recall within months of launch. Still went bankrupt.",
//     points: ["Priced tickets below cost to capture market share. Unsustainable from day one", "Staff salaries unpaid for six months. Service quality collapsed from inside", "Flights cancelled without notice. Customer trust destroyed publicly", "Nine thousand crore rupees in unpaid loans across seventeen banks"],
//     lesson: "The name could not compensate when the financial model collapsed. A brand cannot survive on its name when the operating system is broken."
//   },
//   {
//     name: "Subhiksha Retail", cat: "Grocery Retail · 1,650 Stores · Closed 2009",
//     body: "Subhiksha means prosperity and abundance. Auspicious. Culturally rich. Instantly understood across South India. A genuinely well-crafted name. Closed completely in 2009.",
//     points: ["No air conditioning in stores to cut cost. Unbearable in Indian summers", "No individual price tags on products. Created customer suspicion despite being well-intentioned", "Empty shelves became normal as supplier credit lines collapsed", "The name promised abundance. The store delivered scarcity, heat, and confusion"],
//     lesson: "This case is most relevant for Kalanikethan. The name promised one thing. The in-store reality delivered the opposite. The contradiction killed the brand every day."
//   },
//   {
//     name: "Koutons Retail", cat: "Apparel Retail · 1,400 Stores · Collapsed 2013",
//     body: "A constructed premium-sounding name designed for European aspiration. Strong recall. Pan-India presence. Owned the menswear category for a decade before collapse.",
//     points: ["Aggressive franchise expansion without quality control. Store experience varied wildly by city", "Constant fifty and seventy percent discounting destroyed the premium positioning the name was trying to hold", "Inventory mismanagement created pile-ups in wrong markets", "A premium name cannot rescue a business operating like a discount retailer"],
//     lesson: "The name said premium. The discount stickers said otherwise. When the name and the behaviour contradict each other, the behaviour always wins."
//   },
//   {
//     name: "Vishal Mega Mart", cat: "Multi-category Retail · 172 Stores · Sold in Distress 2011",
//     body: "Vishal means vast in Hindi. Mega Mart reinforces scale. A powerful combination that promised exactly what a destination retailer should. Still ended in a distress sale.",
//     points: ["Expanded from 14 to 172 stores in three years without building supply chain to support it", "Vendors unpaid, inventory ageing, quality declining, customer trust eroding simultaneously", "Broken air conditioning, understaffed counters, long queues became the customer experience", "Seven hundred thirty crore rupees in debt with declining same-store sales"],
//     lesson: "The name sold a story of scale and value. The operating system could not honour that story. The brand collapsed under the weight of its own promise."
//   }
// ];

// function CaseCard({ c, fail }: { c: CaseStudy; fail: boolean }) {
//   return (
//     <div className="case-card" style={fail ? { background: "white" } : {}}>
//       <span className={`case-tag ${fail ? "tag-fail" : "tag-success"}`}>{fail ? "Failure" : "Success"}</span>
//       <div className="case-name">{c.name}</div>
//       <div className="case-cat">{c.cat}</div>
//       <div className="case-body">{c.body}</div>
//       <div className="case-points">
//         {c.points.map((p, i) => <div key={i} className="case-point">{p}</div>)}
//       </div>
//       <div className="case-lesson" style={fail ? { borderLeftColor: "var(--red)", background: "var(--red-pale)" } : {}}>{c.lesson}</div>
//     </div>
//   );
// }

// function SuccessCases() {
//   return (
//     <div style={{ background: "var(--ivory)", padding: "100px 80px" }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//         <div className="reveal rd1"><div className="s-label">Part One · Success Case Studies</div></div>
//         <div className="reveal rd2"><div className="s-title">Brands That Won<br /><em>Without a Great Name</em></div></div>
//         <div className="reveal rd3"><p className="s-body">These five brands became institutions. None of them won because of their name. Read what actually built them.</p></div>
//         <div className="case-grid reveal rd4">
//           {successCases.map(c => <CaseCard key={c.name} c={c} fail={false} />)}
//         </div>
//       </div>
//     </div>
//   );
// }

// function FailureCases() {
//   return (
//     <div style={{ background: "var(--cream-deep)", padding: "100px 80px" }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//         <div className="reveal rd1"><div className="s-label">Part Two · Failure Case Studies</div></div>
//         <div className="reveal rd2"><div className="s-title">Brands That Failed<br /><em>Despite a Great Name</em></div></div>
//         <div className="reveal rd3"><p className="s-body">These brands had strong names and real momentum. The name did not save them when the operating system broke underneath.</p></div>
//         <div className="case-grid reveal rd4">
//           {failureCases.map(c => <CaseCard key={c.name} c={c} fail={true} />)}
//         </div>
//       </div>
//     </div>
//   );
// }

// const principles = [
//   { num: "01", pct: "35%", name: "Customer Experience", body: "Store layout · staff training · personal advisor model · pricing transparency · respect at every touchpoint", hi: false },
//   { num: "02", pct: "25%", name: "Inventory Authority", body: "Range depth in chosen categories · direct weaver relationships · curation that signals expertise", hi: false },
//   { num: "03", pct: "15%", name: "Operating Discipline", body: "Consistent pricing every day · predictable quality · return policy · supply chain reliability", hi: false },
//   { num: "04", pct: "10%", name: "Cultural Positioning", body: "Festival and wedding ownership · generational trust · story of craft, weave, and tradition", hi: false },
//   { num: "05", pct: "10%", name: "Physical Identity", body: "Store architecture · interior design · lighting · signage · sensory consistency across locations", hi: false },
//   { num: "06", pct: "5%", name: "The Name", body: "Recall · trademark protection · bilingual readability · cultural appropriateness · scalability", hi: true },
// ];

// function PrincipleStrip() {
//   return (
//     <div className="principle-strip">
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//         <div className="reveal rd1"><div className="s-label" style={{ color: "var(--gold)" }}>The Framework</div></div>
//         <div className="reveal rd2"><div className="s-title" style={{ color: "var(--cream)", marginBottom: "8px" }}>What Actually<br /><em>Builds a Brand</em></div></div>
//         <div className="reveal rd3"><p className="s-body" style={{ color: "rgba(250,246,238,0.5)" }}>Six dimensions determine brand equity in saree retail. The name is the last one. Understanding this changes everything about how we choose it.</p></div>
//         <div className="principle-grid reveal rd4">
//           {principles.map(p => (
//             <div key={p.num} className={`principle-card${p.hi ? " principle-highlight" : ""}`}>
//               <div className="principle-num">{p.num}</div>
//               <div className="principle-pct">{p.pct}</div>
//               <div className="principle-name">{p.name}</div>
//               <div className="principle-body">{p.body}</div>
//             </div>
//           ))}
//         </div>
//         <div style={{ marginTop: "40px", padding: "24px 32px", border: "0.5px solid rgba(197,163,90,0.25)", background: "rgba(197,163,90,0.05)", maxWidth: "800px" }}>
//           <p style={{ fontSize: "14px", fontWeight: 300, color: "rgba(250,246,238,0.6)", lineHeight: 1.9 }}>
//             The name is 5 percent of the brand equity. When the other 95 percent is weak, no name rescues the business. When the other 95 percent is strong, almost any name can succeed. This is why Pothys and RMKV became legendary with ordinary names. And why Kingfisher and Subhiksha failed despite powerful ones.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// type ScaleRowProps = {
//   id: string;
//   label: string;
//   value: number;
//   onChange: (value: number) => void;
// };

// function ScaleRow({ id, label, value, onChange }: ScaleRowProps) {
//   return (
//     <div style={{ marginBottom: "28px" }}>
//       <span className="input-label">{label}</span>
//       <div className="scale-row">
//         {[1, 2, 3, 4, 5].map(v => (
//           <button
//             key={v}
//             className={`scale-btn${value === v ? " selected" : ""}`}
//             onClick={() => onChange(v)}
//           >{v}</button>
//         ))}
//       </div>
//       <div className="scale-labels"><span>Not important</span><span>Essential</span></div>
//     </div>
//   );
// }

// type ChoiceOption = {
//   main: string;
//   sub: string;
// };

// type ChoiceGridProps = {
//   options: ChoiceOption[];
//   selected: string;
//   onSelect: (value: string) => void;
//   cols?: number;
// };

// function ChoiceGrid({ options, selected, onSelect, cols = 3 }: ChoiceGridProps) {
//   return (
//     <div className={cols === 2 ? "choice-grid-2" : "choice-grid"}>
//       {options.map(opt => (
//         <button
//           key={opt.main}
//           className={`choice-btn${selected === opt.main ? " selected" : ""}`}
//           onClick={() => onSelect(opt.main)}
//         >
//           <span className="c-main">{opt.main}</span>
//           <span className="c-sub">{opt.sub}</span>
//         </button>
//       ))}
//     </div>
//   );
// }

// function DiscoveryForm() {
//   const [form, setForm] = useState({
//     q1: "", q2: "", q2_other: "", q3: "", q4: "", q5: "", q5_other: "",
//     q6: "", q6_other: "", q7: "", q8: [0, 0, 0, 0, 0, 0],
//     q9: "", q10: "", q11: "", q12: "",
//     name: "", role: "", email: "", time: ""
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const setQ8 = (i: number, v: number) => {
//     const arr = [...form.q8];
//     arr[i] = v;
//     setForm(f => ({ ...f, q8: arr }));
//   };

//   const handleSubmit = () => {
//     if (!form.name.trim() || !form.email.trim()) {
//       alert("Please enter your name and email before submitting.");
//       return;
//     }
//     const scales = form.q8.map((v, i) => `  ${["Telugu culture connection","Premium and aspirational","Connection to silk or saree","Easy to say in 3 seconds","Scalable pan-India","Unique, never heard before"][i]}: ${v || "not answered"}/5`).join("\n");
//     const subject = encodeURIComponent("Brand Discovery Responses · Kalanikethan · " + form.name);
//     const body = encodeURIComponent(
//       "KALANIKETHAN BRAND DISCOVERY RESPONSES\n==========================================\n\n" +
//       `Submitted by: ${form.name} (${form.role})\nEmail: ${form.email}\nBest call time: ${form.time}\n\n` +
//       `--- BLOCK A: THE CUSTOMER ---\n\nQ1 · The woman on opening day:\n${form.q1}\n\nQ2 · Feeling she takes home: ${form.q2}${form.q2_other ? " — " + form.q2_other : ""}\n\nQ3 · What she tells her friend:\n${form.q3}\n\n` +
//       `--- BLOCK B: THE COMPETITION ---\n\nQ4 · Store they most admire:\n${form.q4}\n\nQ5 · One thing they will do better: ${form.q5}${form.q5_other ? " — " + form.q5_other : ""}\n\n` +
//       `--- BLOCK C: THE NAME ---\n\nQ6 · Why Saadi Mart landed: ${form.q6}${form.q6_other ? " — " + form.q6_other : ""}\n\nQ7 · What did not work in other names:\n${form.q7}\n\nQ8 · Naming priority scales:\n${scales}\n\n` +
//       `--- BLOCK D: THE BUSINESS ---\n\nQ9 · Kalave vs main store difference:\n${form.q9}\n\nQ10 · Geographic ambition: ${form.q10}\n\nQ11 · What staff says when asked about the name:\n${form.q11}\n\nQ12 · What has been in their mind throughout:\n${form.q12}\n\n==========================================\nSubmitted via Kalanikethan Brand Discovery Page\nMagsmen Brand Consultants`
//     );
//     window.location.href = `mailto:connect@magsmen.com?cc=${encodeURIComponent(form.email)}&subject=${subject}&body=${body}`;
//     setSubmitted(true);
//     setTimeout(() => {
//       document.getElementById("confirm-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
//     }, 300);
//   };

//   const q2opts = [
//     { main: "Proud", sub: "She feels she made the right decision" },
//     { main: "Respected", sub: "She was treated with dignity" },
//     { main: "Confident", sub: "She knows exactly what she paid and why" },
//     { main: "Excited", sub: "She cannot wait to wear it" },
//     { main: "Empowered", sub: "She was informed, not sold to" },
//     { main: "Delighted", sub: "The experience exceeded her expectation" },
//   ];
//   const q5opts = [
//     { main: "Open Pricing", sub: "Full cost breakdown on every saree" },
//     { main: "Range Depth", sub: "More variety in chosen category than anyone" },
//     { main: "Staff Knowledge", sub: "Advisors who know every weave and occasion" },
//     { main: "Store Experience", sub: "The most beautiful saree shopping environment" },
//     { main: "Weaver Relationships", sub: "Direct from loom, no middlemen" },
//     { main: "Pricing Guarantee", sub: "No competitor sells the same weave cheaper" },
//   ];
//   const q6opts = [
//     { main: "It sounds familiar", sub: "A woman already knows the word Saadi" },
//     { main: "It sounds honest", sub: "Mart feels like a place of fair value" },
//     { main: "It sounds accessible", sub: "Not too premium, not too ordinary" },
//     { main: "It sounds Telugu", sub: "Rooted in the language and culture" },
//     { main: "It is easy to say", sub: "Women will say it naturally in conversation" },
//     { main: "It sounds confident", sub: "Direct, clear, no decoration needed" },
//   ];
//   const q10opts = [
//     { main: "One flagship city", sub: "Dominate one market first" },
//     { main: "2 to 3 cities in AP and Telangana", sub: "Regional brand" },
//     { main: "All major AP and Telangana cities", sub: "State-wide brand" },
//     { main: "Pan-India eventually", sub: "National brand ambition" },
//   ];
//   const scaleLabels = ["Connection to Telugu culture and language", "Sounds premium and aspirational", "Connection to silk or saree", "Easy to say and remember in 3 seconds", "Scalable to other cities and eventually pan-India", "Unique, never heard before in any brand"];

//   if (submitted) {
//     return (
//       <div id="confirm-section" className="confirm-screen">
//         <div className="confirm-icon">✦</div>
//         <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "56px", fontWeight: 300, color: "var(--ink)", marginBottom: "16px" }}>
//           Thank you,<br /><em style={{ color: "var(--gold)" }}>{form.name.split(" ")[0]}</em>
//         </div>
//         <p style={{ fontSize: "15px", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.9, marginTop: "24px" }}>
//           Your responses have been received by the Magsmen team at connect@magsmen.com. We will review every answer carefully before we meet. The next conversation will not have a batch of names. It will have one recommendation, built entirely from what you have shared here.
//         </p>
//         <p style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-soft)", marginTop: "16px", lineHeight: 1.8 }}>
//           We will reach out within one business day to confirm the call time you shared.
//         </p>
//         <div style={{ marginTop: "40px", padding: "24px 32px", border: "0.5px solid var(--border)", background: "var(--gold-pale)" }}>
//           <p style={{ fontSize: "13px", fontWeight: 300, color: "var(--ink-mid)", lineHeight: 1.8, fontStyle: "italic" }}>"Before the name, comes the clarity. You have given us the clarity. The name will follow."</p>
//           <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginTop: "12px" }}>Sandeep N · Magsmen Brand Consultants</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="form-intro reveal">
//         <div className="s-label" style={{ textAlign: "center" }}>Part Three · Brand Discovery</div>
//         <div className="s-title" style={{ textAlign: "center", marginBottom: "16px" }}>Twelve Questions<br /><em>That Change Everything</em></div>
//         <p style={{ fontSize: "14px", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.9, textAlign: "center" }}>Your answers to these questions are not for evaluation. They are the raw material from which the right name will emerge naturally. There are no correct answers. Honest answers are the only useful ones.</p>
//       </div>

//       {/* BLOCK A */}
//       <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
//         <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block A · The Customer</div>
//       </div>
//       <div className="q-block reveal rd1">
//         <div className="q-num">Question 01 of 10</div>
//         <div className="q-title">Picture the woman walking into your first store on opening day.</div>
//         <div className="q-sub">What is she wearing? What is she carrying? What time of day is it? Why did she come today specifically?</div>
//         <div className="q-why">Why we ask: The name must speak to this woman. Not to a category. Not to a market segment. To her, specifically. The more vividly you can see her, the more precisely we can name the brand for her.</div>
//         <textarea className="kl-textarea" placeholder="Describe her as you see her in your mind..." value={form.q1} onChange={e => setForm(f => ({ ...f, q1: e.target.value }))} />
//       </div>
//       {/* <div className="q-block reveal rd2">
//         <div className="q-num">Question 02 of 12</div>
//         <div className="q-title">She has just paid and is walking out of your store with a saree.</div>
//         <div className="q-sub">What one feeling do you most want her to carry out? Choose the one that matters most to you.</div>
//         <div className="q-why">Why we ask: The name carries an emotion before it carries a meaning. This question identifies the emotion the brand should lead with.</div>
//         <ChoiceGrid options={q2opts} selected={form.q2} onSelect={v => setForm(f => ({ ...f, q2: v }))} />
//         <input className="kl-input" type="text" placeholder="Or describe the feeling in your own words..." value={form.q2_other} onChange={e => setForm(f => ({ ...f, q2_other: e.target.value }))} />
//       </div> */}
//       <div className="q-block reveal rd3">
//         <div className="q-num">Question 02 of 10</div>
//         <div className="q-title">She tells her friend about your store that evening.</div>
//         <div className="q-sub">What is the one sentence she uses? Write it the way she would actually say it, in Telugu or English or both.</div>
//         <div className="q-why">Why we ask: Word of mouth is how saree brands grow in AP and Telangana. The name must fit naturally into the sentence she speaks. If the name is awkward in her mouth, word of mouth breaks down.</div>
//         <textarea className="kl-textarea" placeholder="Write how she would describe your store to her friend..." value={form.q3} onChange={e => setForm(f => ({ ...f, q3: e.target.value }))} />
//       </div>

//       {/* BLOCK B */}
//       <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
//         <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block B · The Competition</div>
//       </div>
//       {/* <div className="q-block reveal rd1">
//         <div className="q-num">Question 04 of 12</div>
//         <div className="q-title">Which existing saree store in your city do you most admire, and why?</div>
//         <div className="q-sub">This could be a local store, a regional brand, or a national brand. What specifically about them earns your respect?</div>
//         <div className="q-why">Why we ask: Admiration tells us your aspirational benchmark. The brand we are naming is positioning itself in relation to this store. We need to know where you want to stand relative to it.</div>
//         <textarea className="kl-textarea" placeholder="Name the store and tell us what specifically you admire about them..." value={form.q4} onChange={e => setForm(f => ({ ...f, q4: e.target.value }))} />
//       </div> */}
//       <div className="q-block reveal rd2">
//         <div className="q-num">Question 03 of 10</div>
//         <div className="q-title">What is the one thing you will do better than any competitor in your market?</div>
//         <div className="q-sub">Not multiple things. The one thing that if you execute it perfectly, makes you the first choice for the woman who knows about it.</div>
//         <div className="q-why">Why we ask: The name should signal this one thing, or at minimum not contradict it. This is the brand's primary weapon. The name must not soften it.</div>
//         <ChoiceGrid options={q5opts} selected={form.q5} onSelect={v => setForm(f => ({ ...f, q5: v }))} />
//         <input className="kl-input" type="text" placeholder="Or describe it in your own words..." value={form.q5_other} onChange={e => setForm(f => ({ ...f, q5_other: e.target.value }))} />
//       </div>

//       {/* BLOCK C */}
//       <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
//         <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block C · The Name</div>
//       </div>
//       <div className="q-block reveal rd1">
//         <div className="q-num">Question 04 of 10</div>
//         <div className="q-title">When you say "Saadi Mart" out loud, what specifically do you like about it?</div>
//         <div className="q-sub">Not what you think you should like about it from a strategy perspective. What genuinely appeals to you when you say those two words.</div>
//         <div className="q-why">Why we ask: You liked Saadi Mart for a reason. That reason is the creative direction for the second name. We have been guessing at it. Tell us directly.</div>
//         <ChoiceGrid options={q6opts} selected={form.q6} onSelect={v => setForm(f => ({ ...f, q6: v }))} />
//         <input className="kl-input" type="text" placeholder="Or tell us in your own words what you like about it..." value={form.q6_other} onChange={e => setForm(f => ({ ...f, q6_other: e.target.value }))} />
//       </div>
//       <div className="q-block reveal rd2">
//         <div className="q-num">Question 05 of 10</div>
//         <div className="q-title">What specifically did not work in the names we suggested after Saadi Mart?</div>
//         <div className="q-sub">Sogasari, Cheera Mart, Cheli Mart, Kalavé, Pattu Mart, Vaaga Mart. For any that felt wrong, tell us what felt wrong. Tone, meaning, sound, length, anything.</div>
//         <div className="q-why">Why we ask: Understanding rejection is more valuable than presenting options. One sentence about why a name did not work tells us more than ten names that did not land.</div>
//         <textarea className="kl-textarea" placeholder="Tell us what felt off about any of the names you rejected..." value={form.q7} onChange={e => setForm(f => ({ ...f, q7: e.target.value }))} />
//       </div>
//       <div className="q-block reveal rd3">
//         <div className="q-num">Question 06 of 10</div>
//         <div className="q-title">You mentioned connection to silks without using the word Mart. Rate how important each of these qualities is to you for the second name.</div>
//         <div className="q-sub">Move your selection for each quality on a scale of 1 to 5.</div>
//         <div className="q-why">Why we ask: You want the name to connect to silks and feel unique and scalable. These three things can pull in different directions. Understanding their relative importance helps us make the trade-off correctly.</div>
//         <div style={{ marginTop: "16px" }}>
//           {scaleLabels.map((lbl, i) => (
//             <ScaleRow key={i} label={lbl} value={form.q8[i]} onChange={v => setQ8(i, v)} id={""} />
//           ))}
//         </div>
//       </div>

//       {/* BLOCK D */}
//       <div style={{ margin: "64px 0 32px", paddingBottom: "20px", borderBottom: "0.5px solid var(--border)" }}>
//         <div style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>Block D · The Business</div>
//       </div>
//       <div className="q-block reveal rd1">
//         <div className="q-num">Question 07 of 10</div>
//         <div className="q-title">You mentioned Kalavé as a possible premium-format store name for later. Can you describe what that store looks like versus the first store?</div>
//         <div className="q-sub">Is it a different price point? A different customer? A different experience? A different city? Help us understand the two-brand architecture you are envisioning.</div>
//         <div className="q-why">Why we ask: If Kalavé is the premium and the second name is accessible-premium, the names need to create a deliberate hierarchy. We cannot name one without understanding the other.</div>
//         <textarea className="kl-textarea" placeholder="Describe how the Kalave store feels different from the main store..." value={form.q9} onChange={e => setForm(f => ({ ...f, q9: e.target.value }))} />
//       </div>
//       <div className="q-block reveal rd2">
//         <div className="q-num">Question 08 of 10</div>
//         <div className="q-title">How many stores do you see in five years, and in which cities?</div>
//         <div className="q-sub">A rough vision is fine. Single city, two cities, or pan-AP? This matters for the name because some names travel and some names belong to one place.</div>
//         <div className="q-why">Why we ask: A name that works perfectly in Vijayawada may feel strange in Hyderabad or Chennai. Knowing the geographic ambition shapes the naming strategy.</div>
//         <ChoiceGrid options={q10opts} selected={form.q10} onSelect={v => setForm(f => ({ ...f, q10: v }))} cols={2} />
//       </div>
//       <div className="q-block reveal rd3">
//         <div className="q-num">Question 09 of 10</div>
//         <div className="q-title">If a customer asks why your store is called what it is called, what answer do you want your staff to give?</div>
//         <div className="q-sub">Not a marketing line. What do you want them to actually say, in plain language, when a curious customer asks?</div>
//         <div className="q-why">Why we ask: The best names have a thirty-second story. The answer your staff gives is that story. If the name requires a five-minute explanation, it is the wrong name.</div>
//         <textarea className="kl-textarea" placeholder="Write the answer your staff member gives to that question..." value={form.q11} onChange={e => setForm(f => ({ ...f, q11: e.target.value }))} />
//       </div>
//       <div className="q-block reveal rd4">
//         <div className="q-num">Question 10 of 10</div>
//         <div className="q-title">Is there a word, a feeling, a visual, or a name that you have had in your mind throughout this process that you have not yet told us?</div>
//         <div className="q-sub">Anything. A word you heard somewhere. A feeling you cannot describe. A visual you keep coming back to. Something you dismissed as too simple or too strange. Write it here.</div>
//         <div className="q-why">Why we ask: In every naming engagement, the client has a reference point they have not shared. It is usually the most useful thing they know. This is your space to say it.</div>
//         <textarea className="kl-textarea" style={{ minHeight: "120px" }} placeholder="Write anything that has been in your mind. There is no wrong answer here..." value={form.q12} onChange={e => setForm(f => ({ ...f, q12: e.target.value }))} />
//       </div>

//       {/* SUBMISSION DETAILS */}
//       <div style={{ maxWidth: "800px", margin: "48px auto 0", padding: "40px", background: "var(--ivory)", border: "0.5px solid var(--border)" }}>
//         <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 400, color: "var(--ink)", marginBottom: "24px" }}>Complete Your Submission</div>
//         <div className="input-row">
//           <div>
//             <span className="input-label">Your Name</span>
//             <input className="kl-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
//           </div>
//           <div>
//             <span className="input-label">Your Designation</span>
//             <input className="kl-input" type="text" placeholder="Founder / Director / etc" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
//           </div>
//         </div>
//         <div className="input-single">
//           <span className="input-label">Your Email Address</span>
//           <input className="kl-input" type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
//         </div>
//         <div className="input-single">
//           <span className="input-label">Best time for our follow-up call this week</span>
//           <input className="kl-input" type="text" placeholder="e.g. Tuesday and Thursday after 3pm" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
//         </div>
//       </div>

//       <div className="submit-area">
//         <button className="submit-btn" onClick={handleSubmit}>Submit Discovery Responses →</button>
//         <p className="submit-note">Your responses go directly to connect@magsmen.com. We will review them before our next meeting and come prepared with a precise name recommendation rather than another batch of options.</p>
//       </div>
//     </div>
//   );
// }

// export default function KalaikethanBrandDiscovery() {
//   useScrollProgress();
//   useReveal();

//   return (
//     <>
//       <style>{css}</style>
//       <div id="kl-progress"><div id="kl-progress-fill" /></div>
//       <Navbar />
//       <Hero />
//       <OpenPricing />
//       <div className="dark-divider" />
//       <SuccessCases />
//       <div className="gold-rule" />
//       <FailureCases />
//       <PrincipleStrip />
//       <div className="discovery-section" id="discovery">
//         <div style={{ maxWidth: "900px", margin: "0 auto" }}>
//           <DiscoveryForm />
//         </div>
//       </div>
//       <footer className="kl-footer">
//         <div className="footer-logo-text">
//             <img src={grofesionlogo2} alt="grofesion-footer-logo" className="w-[20%]" />
//         </div>

//         <div className="footer-right">
//           Brand Discovery · Kalanikethan 2025<br />
//           Magsmen Brand Consultants · connect@magsmen.com<br />
//           Confidential · Not for distribution
//         </div>
//       </footer>
//     </>
//   );
// }
