import React, { useState } from 'react';
import { 
  Smartphone, 
  Package, 
  ShieldCheck, 
  Calendar,
  AlertCircle,
  Filter
} from 'lucide-react';

const TenalidoubleHorse = () => {
  const [activeTab, setActiveTab] = useState('digital');

  // FIXED DESTRUCTURING
  const TabButton = (props: { icon: any; id: React.SetStateAction<string>; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    const Icon = props.icon;
    return (
      <button
        onClick={() => setActiveTab(props.id)}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
          activeTab === props.id 
            ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' 
            : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
        }`}
      >
        <Icon size={18} />
        {props.label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      {/* Header Section */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2 text-orange-600 font-bold tracking-widest text-xs uppercase">
              <Calendar size={14} />
              Annual Report 2026
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Tenali Double Horse <br/>
              <span className="text-orange-600 underline decoration-orange-200 underline-offset-8">Brand-Specific Audit</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <TabButton id="digital" label="Digital Audit" icon={Smartphone} />
            <TabButton id="brand" label="Brand Guidelines" icon={ShieldCheck} />
            <TabButton id="packaging" label="Packaging Audit" icon={Package} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {activeTab === 'digital' && <DigitalTab />}
        {activeTab === 'brand' && <BrandTab />}
        {activeTab === 'packaging' && <PackagingTab />}
      </main>

      <footer className="max-w-7xl mx-auto mt-12 py-6 border-t border-slate-200 flex justify-between items-center text-slate-400 text-sm">
        <span>© 2026 TDH Group Communication Audit</span>
        <span className="flex items-center gap-1 font-medium text-slate-500 uppercase tracking-tighter text-[10px]">
          <AlertCircle size={12} /> Confidential Strategy Document
        </span>
      </footer>
    </div>
  );
};

// --- TABLE COMPONENT FIXED ---
const AuditTable = (props: { title: any; brandTag: any; headers: any; rows: any; }) => {
  const { title, brandTag, headers, rows } = props;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
            brandTag === 'Main' ? 'bg-blue-100 text-blue-700' : 
            brandTag === 'Rishika' ? 'bg-orange-100 text-orange-700' : 
            'bg-emerald-100 text-emerald-700'
          }`}>
            {brandTag}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              {headers.map((header: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                <th key={index} className="p-4 px-6">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {rows.map((row: any[], rowIndex: React.Key | null | undefined) => (
              <tr key={rowIndex} className="hover:bg-slate-50/50 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-4 px-6 text-slate-600 leading-relaxed font-medium">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- TAB CONTENT FIXED ---

const DigitalTab = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
      <Filter size={16} /> <span>Digital Infrastructure Breakdown</span>
    </div>

    <AuditTable 
      title="Tenali Double Horse (Main)"
      brandTag="Main"
      headers={["Area", "Situation 2026", "Gap", "Recommendations"]}
      rows={[
        ["Consumer Use", "Strong product/event visuals.", "Limited real-life, everyday human connection.", "Add BTS, team stories, and real customer journey reels."],
        ["Engagement", "Minimal interactive content.", "One-way communication dominant.", "Use polls, quizzes, and recipe challenges; active DM responses."],
        ["Content", "Mostly products and updates.", "Content feels repetitive.", "Add kitchen tips, food facts, and seasonal storytelling."],
        ["Website", "Static listings and banners.", "No brand story/heritage sections.", "Integrate brand story and founder/family history section."]
      ]}
    />

    <AuditTable 
      title="TDH Rishika"
      brandTag="Rishika"
      headers={["Area", "Situation 2026", "Gap", "Recommendations"]}
      rows={[
        ["Consumer Use", "Focus on powders/sunnundalu.", "Family/home moments are limited; mirrors main page.", "Show home cooking & family snack moments. Focus on 'Home-style'."],
        ["Engagement", "Mostly promotional content.", "Low participation; lacks unique interaction style.", "Repost UGC, use recipe prompts, and foster familiarity."],
        ["Consistency", "Moderately consistent.", "No fixed weekly structure/rhythm.", "Implement themed days: 'Recipe Wednesday' or 'Product Tips'."],
        ["Website", "Static product focus.", "Sub-brand personality is thin.", "Create 'Behind the Scenes' of traditional preparation methods."]
      ]}
    />

    <AuditTable 
      title="TDH Millet Marvels"
      brandTag="Millets"
      headers={["Area", "Situation 2026", "Gap", "Recommendations"]}
      rows={[
        ["Consumer Use", "Focus on health benefits.", "Relatable daily consumption/lifestyle missing.", "Show quick breakfasts/snacks; integrate into everyday diets."],
        ["Engagement", "Benefit-focused reels.", "Lacks a health-focused community personality.", "Use health tip polls and 'this vs that' nutritional posts."],
        ["Voice", "Informative/Technical.", "Tone overlaps parent brand; lacks lifestyle appeal.", "Position as a friendly guide to healthy living, not just info."],
        ["Website", "Benefit-focused.", "Visitor dwell time is low.", "Add interactive recipe selectors and nutritional calculators."]
      ]}
    />
  </div>
);

const BrandTab = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
      <ShieldCheck size={16} /> <span>Messaging Architecture by Brand Entity</span>
    </div>

    <AuditTable 
      title="Group & Main Brand"
      brandTag="Main"
      headers={["Aspect", "Focus 2026", "Improvement Needed"]}
      rows={[
        ["Positioning", "Legacy, trust, and global presence.", "Highlight innovation and future-growth stories."],
        ["Tone", "Corporate, confident, reliable.", "Under-communicates societal contribution/CSR."],
        ["Messaging", "Quality, responsibility, excellence.", "Showcase more of the corporate/leadership culture."]
      ]}
    />

    <AuditTable 
      title="TDH Foods / Rishika"
      brandTag="Rishika"
      headers={["Aspect", "Focus 2026", "Improvement Needed"]}
      rows={[
        ["Positioning", "Tradition with convenience.", "Better reflect TDH Group's legacy heritage to build trust."],
        ["Tone", "Convenient, modern, traditional.", "Needs more credibility/purity cues to match modern needs."],
        ["QA", "Limited communication.", "Reinforce high quality standards in every post/message."]
      ]}
    />

    <AuditTable 
      title="TDH Millets"
      brandTag="Millets"
      headers={["Aspect", "Focus 2026", "Improvement Needed"]}
      rows={[
        ["Positioning", "Health and superfoods.", "Avoid functional-only tone; add lifestyle relevance."],
        ["Audience", "Niche/Health-conscious.", "Make the messaging more accessible to the average family."],
        ["Impact", "Functionality.", "Needs to show community/farmer impact stories."]
      ]}
    />
  </div>
);

const PackagingTab = () => (
  <div className="animate-in fade-in duration-500">
    <div className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
      <Package size={16} /> <span>Product & Packaging SKU Audit</span>
    </div>

    <AuditTable 
      title="Main Brand SKUs"
      brandTag="Main"
      headers={["Category", "Current Package State", "Audit Finding 2026"]}
      rows={[
        ["Pulses & Dals", "Simple, functional, accessible.", "Logo sizes vary; premium positioning not visible."],
        ["Grains", "Generic packs; clarity focused.", "Needs standardized premium claiming aesthetics."]
      ]}
    />

    <AuditTable 
      title="Rishika Brand SKUs"
      brandTag="Rishika"
      headers={["Category", "Current Package State", "Audit Finding 2026"]}
      rows={[
        ["Ladoos", "Premium packet; Grandma visual.", "Strong emotional asset; highest recognition."],
        ["Powders", "Vibrant colors; Amma outline.", "RISHIKA font is inconsistent across packages."],
        ["Pickles", "Homemade rooted essence.", "Speak more on authenticity (no colors/preservatives)."],
        ["Cashews", "Premium handy can packaging.", "Lacks sourcing and nutritional constituent details."]
      ]}
    />

    <AuditTable 
      title="Millet Marvels SKUs"
      brandTag="Millets"
      headers={["Category", "Current Package State", "Audit Finding 2026"]}
      rows={[
        ["Cookies", "Superfood focus; flavor lead.", "Social media redirection on pack causes confusion."],
        ["Noodles", "Health and quick prep focus.", "Logo placement inconsistent with other millet SKUs."],
        ["Pasta", "Superfood/Grains focus.", "Inconsistent logo sizing compared to main grains."]
      ]}
    />

    <div className="w-full">
      <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg">
          <AlertCircle size={20} className="text-orange-500" /> Primary 2026 Objective
        </h4>
        <p className="text-slate-600 leading-relaxed">
          The primary goal for <strong>2026</strong> is the elimination of brand dilution through visual standardization. 
          Standardizing the <strong>Visual Vocabulary</strong> (logo sizing, font hierarchy, and brand-specific palettes) 
          must be executed across all SKUs to ensure the group's legacy remains visible in every sub-brand interaction.
        </p>
      </div>
    </div>
  </div>
);

export default TenalidoubleHorse;








// import React, { useState } from 'react';
// import { 
//   Smartphone, 
//   Package, 
//   ShieldCheck, 
//   Calendar,
//   AlertCircle,
//   Filter
// } from 'lucide-react';

// const App = () => {
//   const [activeTab, setActiveTab] = useState('digital');

//   const TabButton = ({ id, label, icon: Icon }) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
//         activeTab === id 
//           ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' 
//           : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
//       }`}
//     >
//       <Icon size={18} />
//       {label}
//     </button>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
//       {/* Header Section */}
//       <header className="max-w-7xl mx-auto mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
//           <div>
//             <div className="flex items-center gap-2 mb-2 text-orange-600 font-bold tracking-widest text-xs uppercase">
//               <Calendar size={14} />
//               Annual Report 2026
//             </div>
//             <h1 className="text-4xl font-black text-slate-900 tracking-tight">
//               Tenali Double Horse <br/>
//               <span className="text-orange-600 underline decoration-orange-200 underline-offset-8">Brand-Specific Audit</span>
//             </h1>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <TabButton id="digital" label="Digital Audit" icon={Smartphone} />
//             <TabButton id="brand" label="Brand Guidelines" icon={ShieldCheck} />
//             <TabButton id="packaging" label="Packaging Audit" icon={Package} />
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto space-y-12">
//         {activeTab === 'digital' && <DigitalTab />}
//         {activeTab === 'brand' && <BrandTab />}
//         {activeTab === 'packaging' && <PackagingTab />}
//       </main>

//       <footer className="max-w-7xl mx-auto mt-12 py-6 border-t border-slate-200 flex justify-between items-center text-slate-400 text-sm">
//         <span>© 2026 TDH Group Communication Audit</span>
//         <span className="flex items-center gap-1 font-medium text-slate-500 uppercase tracking-tighter text-[10px]">
//           <AlertCircle size={12} /> Confidential Strategy Document
//         </span>
//       </footer>
//     </div>
//   );
// };

// // --- TABLE COMPONENT ---
// const AuditTable = ({ title, brandTag, headers, rows }) => (
//   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
//     <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <h3 className="font-bold text-slate-800">{title}</h3>
//         <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
//           brandTag === 'Main' ? 'bg-blue-100 text-blue-700' : 
//           brandTag === 'Rishika' ? 'bg-orange-100 text-orange-700' : 
//           'bg-emerald-100 text-emerald-700'
//         }`}>
//           {brandTag}
//         </span>
//       </div>
//     </div>
//     <div className="overflow-x-auto">
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-white text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
//             {headers.map((h, i) => (
//               <th key={i} className="p-4 px-6">{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-slate-100 text-sm">
//           {rows.map((row, i) => (
//             <tr key={i} className="hover:bg-slate-50/50 transition-colors">
//               {row.map((cell, j) => (
//                 <td key={j} className="p-4 px-6 text-slate-600 leading-relaxed font-medium">
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// // --- TAB CONTENT ---

// const DigitalTab = () => (
//   <div className="animate-in fade-in duration-500">
//     <div className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
//       <Filter size={16} /> <span>Digital Infrastructure Breakdown</span>
//     </div>

//     <AuditTable 
//       title="Tenali Double Horse (Main)"
//       brandTag="Main"
//       headers={["Area", "Situation 2026", "Gap", "Recommendations"]}
//       rows={[
//         ["Consumer Use", "Strong product/event visuals.", "Limited real-life, everyday human connection.", "Add BTS, team stories, and real customer journey reels."],
//         ["Engagement", "Minimal interactive content.", "One-way communication dominant.", "Use polls, quizzes, and recipe challenges; active DM responses."],
//         ["Content", "Mostly products and updates.", "Content feels repetitive.", "Add kitchen tips, food facts, and seasonal storytelling."],
//         ["Website", "Static listings and banners.", "No brand story/heritage sections.", "Integrate brand story and founder/family history section."]
//       ]}
//     />

//     <AuditTable 
//       title="TDH Rishika"
//       brandTag="Rishika"
//       headers={["Area", "Situation 2026", "Gap", "Recommendations"]}
//       rows={[
//         ["Consumer Use", "Focus on powders/sunnundalu.", "Family/home moments are limited; mirrors main page.", "Show home cooking & family snack moments. Focus on 'Home-style'."],
//         ["Engagement", "Mostly promotional content.", "Low participation; lacks unique interaction style.", "Repost UGC, use recipe prompts, and foster familiarity."],
//         ["Consistency", "Moderately consistent.", "No fixed weekly structure/rhythm.", "Implement themed days: 'Recipe Wednesday' or 'Product Tips'."],
//         ["Website", "Static product focus.", "Sub-brand personality is thin.", "Create 'Behind the Scenes' of traditional preparation methods."]
//       ]}
//     />

//     <AuditTable 
//       title="TDH Millet Marvels"
//       brandTag="Millets"
//       headers={["Area", "Situation 2026", "Gap", "Recommendations"]}
//       rows={[
//         ["Consumer Use", "Focus on health benefits.", "Relatable daily consumption/lifestyle missing.", "Show quick breakfasts/snacks; integrate into everyday diets."],
//         ["Engagement", "Benefit-focused reels.", "Lacks a health-focused community personality.", "Use health tip polls and 'this vs that' nutritional posts."],
//         ["Voice", "Informative/Technical.", "Tone overlaps parent brand; lacks lifestyle appeal.", "Position as a friendly guide to healthy living, not just info."],
//         ["Website", "Benefit-focused.", "Visitor dwell time is low.", "Add interactive recipe selectors and nutritional calculators."]
//       ]}
//     />
//   </div>
// );

// const BrandTab = () => (
//   <div className="animate-in fade-in duration-500">
//     <div className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
//       <ShieldCheck size={16} /> <span>Messaging Architecture by Brand Entity</span>
//     </div>

//     <AuditTable 
//       title="Group & Main Brand"
//       brandTag="Main"
//       headers={["Aspect", "Focus 2026", "Improvement Needed"]}
//       rows={[
//         ["Positioning", "Legacy, trust, and global presence.", "Highlight innovation and future-growth stories."],
//         ["Tone", "Corporate, confident, reliable.", "Under-communicates societal contribution/CSR."],
//         ["Messaging", "Quality, responsibility, excellence.", "Showcase more of the corporate/leadership culture."]
//       ]}
//     />

//     <AuditTable 
//       title="TDH Foods / Rishika"
//       brandTag="Rishika"
//       headers={["Aspect", "Focus 2026", "Improvement Needed"]}
//       rows={[
//         ["Positioning", "Tradition with convenience.", "Better reflect TDH Group's legacy heritage to build trust."],
//         ["Tone", "Convenient, modern, traditional.", "Needs more credibility/purity cues to match modern needs."],
//         ["QA", "Limited communication.", "Reinforce high quality standards in every post/message."]
//       ]}
//     />

//     <AuditTable 
//       title="TDH Millets"
//       brandTag="Millets"
//       headers={["Aspect", "Focus 2026", "Improvement Needed"]}
//       rows={[
//         ["Positioning", "Health and superfoods.", "Avoid functional-only tone; add lifestyle relevance."],
//         ["Audience", "Niche/Health-conscious.", "Make the messaging more accessible to the average family."],
//         ["Impact", "Functionality.", "Needs to show community/farmer impact stories."]
//       ]}
//     />
//   </div>
// );

// const PackagingTab = () => (
//   <div className="animate-in fade-in duration-500">
//     <div className="mb-6 flex items-center gap-2 text-slate-500 font-medium">
//       <Package size={16} /> <span>Product & Packaging SKU Audit</span>
//     </div>

//     <AuditTable 
//       title="Main Brand SKUs"
//       brandTag="Main"
//       headers={["Category", "Current Package State", "Audit Finding 2026"]}
//       rows={[
//         ["Pulses & Dals", "Simple, functional, accessible.", "Logo sizes vary; premium positioning not visible."],
//         ["Grains", "Generic packs; clarity focused.", "Needs standardized premium claiming aesthetics."]
//       ]}
//     />

//     <AuditTable 
//       title="Rishika Brand SKUs"
//       brandTag="Rishika"
//       headers={["Category", "Current Package State", "Audit Finding 2026"]}
//       rows={[
//         ["Ladoos", "Premium packet; Grandma visual.", "Strong emotional asset; highest recognition."],
//         ["Powders", "Vibrant colors; Amma outline.", "RISHIKA font is inconsistent across packages."],
//         ["Pickles", "Homemade rooted essence.", "Speak more on authenticity (no colors/preservatives)."],
//         ["Cashews", "Premium handy can packaging.", "Lacks sourcing and nutritional constituent details."]
//       ]}
//     />

//     <AuditTable 
//       title="Millet Marvels SKUs"
//       brandTag="Millets"
//       headers={["Category", "Current Package State", "Audit Finding 2026"]}
//       rows={[
//         ["Cookies", "Superfood focus; flavor lead.", "Social media redirection on pack causes confusion."],
//         ["Noodles", "Health and quick prep focus.", "Logo placement inconsistent with other millet SKUs."],
//         ["Pasta", "Superfood/Grains focus.", "Inconsistent logo sizing compared to main grains."]
//       ]}
//     />

//     <div className="w-full">
//       <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
//         <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg">
//           <AlertCircle size={20} className="text-orange-500" /> Primary 2026 Objective
//         </h4>
//         <p className="text-slate-600 leading-relaxed">
//           The primary goal for <strong>2026</strong> is the elimination of brand dilution through visual standardization. 
//           Standardizing the <strong>Visual Vocabulary</strong> (logo sizing, font hierarchy, and brand-specific palettes) 
//           must be executed across all SKUs to ensure the group's legacy remains visible in every sub-brand interaction.
//         </p>
//       </div>
//     </div>
//   </div>
// );

// export default App;