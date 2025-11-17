import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

type SweetItem = { brand: string; priceMin: number; type: string };
type SavouryItem = { brand: string; priceMin: number; type: string };
type LadduItem = { brand: string; protein: number; price: number };

const sweetData: SweetItem[] = [
  { brand: "RiteBite Max", priceMin: 45, type: "Bars" },
  { brand: "Yogabar", priceMin: 40, type: "Bars" },
  { brand: "Whole Truth", priceMin: 60, type: "Bars" },
  { brand: "MyFitness", priceMin: 300, type: "Protein PB" },
  { brand: "MuscleBlaze", priceMin: 60, type: "Powders" },
  { brand: "AndMe", priceMin: 100, type: "Shakes" },
  { brand: "Hershey’s", priceMin: 70, type: "Shakes" },
];

const savouryData: SavouryItem[] = [
  { brand: "RiteBite Max", priceMin: 35, type: "Chips/Namkeen" },
  { brand: "Green Snack Co.", priceMin: 40, type: "Chips/Makhana" },
  { brand: "YogaBar", priceMin: 300, type: "Muesli/Breakfast" },
  { brand: "Habbit Health", priceMin: 50, type: "Savoury Snacks" },
  { brand: "MuscleBlaze", priceMin: 80, type: "Pasta/Snacks" },
  { brand: "Wellversed", priceMin: 50, type: "Low-Carb Snacks" },
];

const ladduData: LadduItem[] = [
  { brand: "Artinci", protein: 5.5, price: 150 },
  { brand: "EAT Anytime", protein: 9.3, price: 441 },
  { brand: "Healthy Belly", protein: 4, price: 329 },
  { brand: "TDH (New SKU)", protein: 15, price: 500 }, // TDH Target
  { brand: "Meethi Kahani", protein: 4.5, price: 749 },
];

const TABS = [
  { id: "overview", label: "1. Market Overview" },
  { id: "behavior", label: "2. Consumer Behavior" },
  { id: "segment_sweet", label: "3. Sweet Segment" },
  { id: "segment_savoury", label: "4. Savoury Segment" },
  { id: "segment_laddu", label: "5. Laddu Segment" },
  { id: "tdh_opportunity", label: "6. TDH SKU Opportunity" },
];

export default function TdhProteinDashboard(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [openTables, setOpenTables] = useState<Record<string, boolean>>({});
  // refs for canvases
  const sweetPriceRef = useRef<HTMLCanvasElement | null>(null);
  const sweetProductRef = useRef<HTMLCanvasElement | null>(null);
  const savouryPriceRef = useRef<HTMLCanvasElement | null>(null);
  const savouryProductRef = useRef<HTMLCanvasElement | null>(null);
  const ladduProteinRef = useRef<HTMLCanvasElement | null>(null);
  const ladduPriceRef = useRef<HTMLCanvasElement | null>(null);
  const positioningRef = useRef<HTMLCanvasElement | null>(null);

  // Keep chart instances to cleanup
  const chartsRef = useRef<Record<string, Chart | null>>({});

  // Utility: create/destroy chart safely
  const destroyChart = (key: string) => {
    const c = chartsRef.current[key];
    if (c) {
      c.destroy();
      chartsRef.current[key] = null;
    }
  };

  // Helpers to derive counts
  const countTypes = (arr: Array<{ type: string }>) =>
    arr.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.type] = (acc[cur.type] || 0) + 1;
      return acc;
    }, {});

  // INIT CHARTS based on activeTab
  useEffect(() => {
    // Sweet charts
    if (activeTab === "segment_sweet") {
      // price chart
      if (sweetPriceRef.current) {
        destroyChart("sweetPrice");
        chartsRef.current["sweetPrice"] = new Chart(sweetPriceRef.current.getContext("2d")!, {
          type: "bar",
          data: {
            labels: sweetData.map((d) => d.brand),
            datasets: [
              {
                label: "Min Price (INR)",
                data: sweetData.map((d) => d.priceMin),
                backgroundColor: "#a78bfa",
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, title: { display: true, text: "Min Price Comparison (INR)", font: { size: 14 } } },
            scales: { y: { beginAtZero: true, title: { display: true, text: "Price (INR)" } } },
          },
        });
      }

      // product mix pie
      if (sweetProductRef.current) {
        destroyChart("sweetProduct");
        const typeCounts = countTypes(sweetData);
        chartsRef.current["sweetProduct"] = new Chart(sweetProductRef.current.getContext("2d")!, {
          type: "pie",
          data: {
            labels: Object.keys(typeCounts),
            datasets: [
              {
                data: Object.values(typeCounts),
                backgroundColor: ["#6d28d9", "#a78bfa", "#c4b5fd", "#e9d5ff", "#a5f3fc", "#818cf8", "#38bdf8"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" }, title: { display: true, text: "Product Type Mix (Count)", font: { size: 14 } } },
          },
        });
      }
    } else {
      destroyChart("sweetPrice");
      destroyChart("sweetProduct");
    }

    // Savoury charts
    if (activeTab === "segment_savoury") {
      if (savouryPriceRef.current) {
        destroyChart("savouryPrice");
        chartsRef.current["savouryPrice"] = new Chart(savouryPriceRef.current.getContext("2d")!, {
          type: "bar",
          data: {
            labels: savouryData.map((d) => d.brand),
            datasets: [
              {
                label: "Min Price (INR)",
                data: savouryData.map((d) => d.priceMin),
                backgroundColor: "#34d399",
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, title: { display: true, text: "Min Price Comparison (INR)", font: { size: 14 } } },
            scales: { y: { beginAtZero: true, title: { display: true, text: "Price (INR)" } } },
          },
        });
      }

      if (savouryProductRef.current) {
        destroyChart("savouryProduct");
        const typeCounts = countTypes(savouryData);
        chartsRef.current["savouryProduct"] = new Chart(savouryProductRef.current.getContext("2d")!, {
          type: "doughnut",
          data: {
            labels: Object.keys(typeCounts),
            datasets: [
              {
                data: Object.values(typeCounts),
                backgroundColor: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#ecfdf5", "#065f46"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" }, title: { display: true, text: "Product Type Mix (Count)", font: { size: 14 } } },
          },
        });
      }
    } else {
      destroyChart("savouryPrice");
      destroyChart("savouryProduct");
    }

    // Laddu charts
    if (activeTab === "segment_laddu") {
      if (ladduProteinRef.current) {
        destroyChart("ladduProtein");
        chartsRef.current["ladduProtein"] = new Chart(ladduProteinRef.current.getContext("2d")!, {
          type: "bar",
          data: {
            labels: ladduData.map((d) => d.brand),
            datasets: [
              {
                label: "Protein (grams per serving)",
                data: ladduData.map((d) => d.protein),
                backgroundColor: ladduData.map((d) => (d.brand === "TDH (New SKU)" ? "#ef4444" : "#f87171")),
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, title: { display: true, text: "Protein Content (g) per Serving", font: { size: 14 } } },
            scales: { y: { beginAtZero: true, max: 18, title: { display: true, text: "Protein (g)" } } },
          },
        });
      }

      if (ladduPriceRef.current) {
        destroyChart("ladduPrice");
        chartsRef.current["ladduPrice"] = new Chart(ladduPriceRef.current.getContext("2d")!, {
          type: "bar",
          data: {
            labels: ladduData.map((d) => d.brand),
            datasets: [
              {
                label: "Price (INR)",
                data: ladduData.map((d) => d.price),
                backgroundColor: "#fb923c",
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, title: { display: true, text: "Smallest SKU Price (INR)", font: { size: 14 } } },
            scales: { y: { beginAtZero: true, title: { display: true, text: "Price (INR)" } } },
          },
        });
      }
    } else {
      destroyChart("ladduProtein");
      destroyChart("ladduPrice");
    }

    // Positioning chart (TDH opportunity)
    if (activeTab === "tdh_opportunity") {
      if (positioningRef.current) {
        destroyChart("positioning");
        chartsRef.current["positioning"] = new Chart(positioningRef.current.getContext("2d")!, {
          type: "line",
          data: {
            labels: ["Sunnundalu (Current)", "Protein Laddu (New)"],
            datasets: [
              {
                label: "Protein Content (g)",
                data: [3.9, 15],
                borderColor: "#6d28d9",
                backgroundColor: "rgba(109, 40, 217, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: ["#a78bfa", "#6d28d9"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, title: { display: true, text: "Protein Content Upgrade (g per unit)", font: { size: 14 } } },
            scales: { y: { beginAtZero: true, max: 18, title: { display: true, text: "Protein (g)" } } },
          },
        });
      }
    } else {
      destroyChart("positioning");
    }

    // cleanup on effect teardown? We'll keep charts destroyed when tab changes above.
    return () => {
      // optional: don't destroy here to avoid flicker when switching quick; charts destroyed at top of effect
    };
  }, [activeTab]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      Object.keys(chartsRef.current).forEach((k) => destroyChart(k));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggle table helper
  const toggleTable = (id: string) => {
    setOpenTables((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-gray-50 font-sans p-4 md:p-8 my-24">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden ">
        <header className="p-6 bg-tdh-primary text-white" style={{ backgroundColor: "#6d28d9" }}>
          <h1 className="text-3xl font-extrabold tracking-tight">TDH Protein Market Opportunity Dashboard</h1>
          <p className="mt-1 text-tdh-light" style={{ color: "#f3e8ff" }}>
            Analysis of the Indian Protein Market & Strategy for New Protein Laddu SKU
          </p>
        </header>

        {/* Tab Navigation */}
        <nav className="border-b border-gray-200 sticky top-0 bg-white z-10">
          <div id="tab-nav" className="flex flex-wrap -mb-px text-sm font-medium text-center">
            {TABS.map((t) => {
              const active = t.id === activeTab;
              return (
                <button
                  key={t.id}
                  data-tab={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`tab-button inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg transition duration-150 ease-in-out ${
                    active ? "text-tdh-primary font-semibold" : "text-gray-500 border-transparent"
                  }`}
                  style={{
                    borderColor: active ? "#6d28d9" : "transparent",
                    color: active ? "#6d28d9" : undefined,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Tab content */}
        <div id="tab-content" className="p-6 md:p-8 space-y-8">
          {/* Overview */}
          {activeTab === "overview" && (
            <section id="tab-overview" className="tab-pane">
              <h2 className="text-2xl font-bold text-tdh-primary mb-4 border-b pb-2" style={{ color: "#6d28d9" }}>
                1. India's Evolving Protein Market Landscape
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-tdh-light p-5 rounded-xl shadow-inner" style={{ backgroundColor: "#f3e8ff" }}>
                  <h3 className="text-xl font-semibold mb-2">Market Overview & Shift</h3>
                  <p className="text-gray-700 leading-relaxed">
                    India’s protein market is rapidly shifting from traditional sources (pulses, dairy) to new, convenient forms (bars, chips, ready-to-eat). People demand protein that is <strong>great-tasting, easy to consume daily, and functional</strong>. This presents a key opportunity for TDH to modernize traditional foods and appeal to the fitness-aware demographic.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <h3 className="text-xl font-semibold text-tdh-primary mb-3" style={{ color: "#6d28d9" }}>
                    Key Market Drivers
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="text-tdh-secondary mr-2 font-bold" style={{ color: "#a78bfa" }}>»</span>Increasing gym culture & fitness awareness.
                    </li>
                    <li className="flex items-start">
                      <span className="text-tdh-secondary mr-2 font-bold" style={{ color: "#a78bfa" }}>»</span>Vegetarian population seeking non-meat options.
                    </li>
                    <li className="flex items-start">
                      <span className="text-tdh-secondary mr-2 font-bold" style={{ color: "#a78bfa" }}>»</span>Influence of social media and influencers.
                    </li>
                    <li className="flex items-start">
                      <span className="text-tdh-secondary mr-2 font-bold" style={{ color: "#a78bfa" }}>»</span>Shift to convenient, fortified foods.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Behavior */}
          {activeTab === "behavior" && (
            <section id="tab-behavior" className="tab-pane">
              <h2 className="text-2xl font-bold text-tdh-primary mb-4 border-b pb-2" style={{ color: "#6d28d9" }}>
                2. Consumer Behavior and Purchase Patterns
              </h2>

              <div className="bg-tdh-light p-6 rounded-xl shadow-lg mb-8" style={{ backgroundColor: "#f3e8ff" }}>
                <h3 className="text-xl font-bold text-tdh-primary mb-3" style={{ color: "#6d28d9" }}>
                  Awareness & Inspiration (The Rapid Trial Cycle)
                </h3>
                <p className="text-gray-700 mb-4">
                  A huge driver of awareness is <strong>social media and influencer culture</strong>. When famous individuals endorse a protein snack for muscle recovery or weight control, it builds trust and motivates fans to try it.
                </p>
                <div className="p-4 bg-white rounded-lg border-l-4 border-tdh-accent" style={{ borderLeftColor: "#f97316" }}>
                  <p className="text-tdh-accent font-semibold" style={{ color: "#f97316" }}>
                    Insight: The "average time for an Indian consumer to try a new protein product has dropped from ~6 months to just 2-3 months." This means <strong>marketing campaigns and influencer tie-ups can yield quick spikes in sales.</strong>
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border border-gray-200 rounded-xl shadow-md space-y-4">
                  <h3 className="text-xl font-bold text-tdh-primary" style={{ color: "#6d28d9" }}>
                    Channels of Discovery
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-lg mr-3 text-tdh-secondary" style={{ color: "#a78bfa" }}>🛒</span>
                      <div>
                        <strong className="text-gray-900">E-commerce & Quick Commerce:</strong> Dedicated health snack sections are key.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lg mr-3 text-tdh-secondary" style={{ color: "#a78bfa" }}>🏪</span>
                      <div>
                        <strong className="text-gray-900">Modern Trade Supermarkets:</strong> Attractive packaging in the health food aisle can catch the eyes of passive shoppers.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lg mr-3 text-tdh-secondary" style={{ color: "#a78bfa" }}>🏋️</span>
                      <div>
                        <strong className="text-gray-900">Gyms & Sports Stores:</strong> Direct counter display targets the core fitness demographic.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-lg mr-3 text-tdh-secondary" style={{ color: "#a78bfa" }}>⚕️</span>
                      <div>
                        <strong className="text-gray-900">Pharmacies (Underrated):</strong> Position as a <em>health supplement</em> for certain groups.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-xl shadow-md border border-green-200 space-y-4" style={{ backgroundColor: "#ecfdf5" }}>
                  <h3 className="text-xl font-bold text-green-700">Core Decision Factors</h3>
                  <p className="text-gray-700">When choosing a product, consumers prioritize:</p>
                  <ul className="space-y-3">
                    <li>
                      <strong className="text-green-700">1. Familiar Taste:</strong> Snacks must taste good, especially a traditional treat like a laddu.
                    </li>
                    <li>
                      <strong className="text-green-700">2. Nutrition (Scrutiny):</strong> Savvy buyers check <strong>protein content</strong>.
                    </li>
                    <li>
                      <strong className="text-green-700">3. Trust & Transparency:</strong> <span className="font-semibold text-tdh-primary" style={{ color: "#6d28d9" }}>64% of Indian consumers prioritize transparency.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 border-t-2 border-tdh-secondary" style={{ borderTopColor: "#a78bfa" }}>
                <h3 className="text-xl font-bold text-tdh-primary mb-3" style={{ color: "#6d28d9" }}>
                  Purchase Habits & Occasions
                </h3>
                <p className="text-gray-700 mb-4">
                  For the average consumer, protein snacks are occasional or supplemental. However, <strong>laddus have an advantage</strong> as Indian consumers are accustomed to buying them in boxes for home consumption or gifting.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <strong className="text-tdh-primary" style={{ color: "#6d28d9" }}>Gifting & Family Consumption:</strong> Reordering larger packs or gifting to relatives as a “healthy sweet.”
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <strong className="text-tdh-primary" style={{ color: "#6d28d9" }}>Seasonality:</strong> Demand for sweets spikes during festivals.
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <strong className="text-tdh-primary" style={{ color: "#6d28d9" }}>Workplace Tie-ups:</strong> Explore corporate programs as office consumption of healthy snacks is rising.
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Sweet Segment */}
          {activeTab === "segment_sweet" && (
            <section id="tab-segment_sweet" className="tab-pane">
              <h2 className="text-2xl font-bold text-tdh-primary mb-4 border-b pb-2" style={{ color: "#6d28d9" }}>
                3. Sweet Protein Segment Analysis (Bars, Shakes, Desserts)
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="chart-container h-72">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Segment Product Categories (Mix)</h3>
                  <canvas ref={sweetProductRef} />
                </div>
                <div className="chart-container h-72 my-24 md:my-0 lg:my-0">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Competitive Landscape (Min Price INR)</h3>
                  <canvas ref={sweetPriceRef} />
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg shadow-inner my-24 md:my-12 lg:my-12" style={{ backgroundColor: "#fffbeb" }}>
                <p className="font-medium text-yellow-700">
                  <span className="font-bold">Finding:</span> Bars and Powders/Shakes dominate, targeting both 'on-the-go' and dedicated 'fitness' consumption. TDH's Laddu can offer a unique "Traditional Indulgence" angle.
                </p>
              </div>

              <div className="mt-6">
                <button onClick={() => toggleTable("sweetTable")} className="flex items-center justify-between w-full p-3 bg-tdh-secondary text-white font-semibold rounded-lg hover:bg-tdh-primary transition duration-150" style={{ backgroundColor: "#a78bfa" }}>
                  <span>Toggle Full Sweet Segment Data Table</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>

                <div id="sweetTable" className={`mt-3 overflow-x-auto shadow-lg rounded-xl border border-gray-200 ${openTables["sweetTable"] ? "" : "hidden"}`}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-tdh-light" style={{ backgroundColor: "#f3e8ff" }}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popular SKUs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                      <tr><td className="px-6 py-4 whitespace-nowrap">RiteBite Max Protein</td><td className="px-6 py-4">Bars, cookies</td><td className="px-6 py-4">10g, 20g, 30g protein bars</td><td className="px-6 py-4">45–120</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">Yogabar</td><td className="px-6 py-4">Bars, oats, protein mix</td><td className="px-6 py-4">10–20g protein bars</td><td className="px-6 py-4">40–150</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">The Whole Truth Foods</td><td className="px-6 py-4">Bars, shakes</td><td className="px-6 py-4">12–15g protein</td><td className="px-6 py-4">60–120</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">MyFitness</td><td className="px-6 py-4">Protein Peanut Butter Bars</td><td className="px-6 py-4">30g/1kg jars</td><td className="px-6 py-4">300–800</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">MuscleBlaze</td><td className="px-6 py-4">Powders</td><td className="px-6 py-4">20–25g protein per serving</td><td className="px-6 py-4">60–4000</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">AndMe</td><td className="px-6 py-4">Protein Shakes</td><td className="px-6 py-4">250ml bottles</td><td className="px-6 py-4">100–180</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Savoury */}
          {activeTab === "segment_savoury" && (
            <section id="tab-segment_savoury" className="tab-pane">
              <h2 className="text-2xl font-bold text-tdh-primary mb-4 border-b pb-2" style={{ color: "#6d28d9" }}>
                4. Savoury Protein Segment Analysis (Chips, Meals, Pasta)
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="chart-container h-72">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Segment Product Categories (Mix)</h3>
                  <canvas ref={savouryProductRef} />
                </div>
                <div className="chart-container h-72 my-24 md:my-0 lg:my-0">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Competitive Landscape (Min Price INR)</h3>
                  <canvas ref={savouryPriceRef} />
                </div>
              </div>

              <div className="sm:my-24 md:my-12 lg:my-12 p-4 bg-tdh-light rounded-lg shadow-inner" style={{ backgroundColor: "#f3e8ff" }}>
                <p className="font-medium text-tdh-primary" style={{ color: "#6d28d9" }}>
                  <span className="font-bold">Finding:</span> This segment focuses on replacing high-carb staples and snacks with protein-fortified, convenient alternatives.
                </p>
              </div>

              <div className="mt-6">
                <button onClick={() => toggleTable("savouryTable")} className="flex items-center justify-between w-full p-3 bg-tdh-secondary text-white font-semibold rounded-lg hover:bg-tdh-primary transition duration-150" style={{ backgroundColor: "#a78bfa" }}>
                  <span>Toggle Full Savoury Segment Data Table</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>

                <div id="savouryTable" className={`mt-3 overflow-x-auto shadow-lg rounded-xl border border-gray-200 ${openTables["savouryTable"] ? "" : "hidden"}`}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-tdh-light" style={{ backgroundColor: "#f3e8ff" }}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Popular SKUs</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                      <tr><td className="px-6 py-4 whitespace-nowrap">RiteBite Max</td><td className="px-6 py-4">Chips, namkeen</td><td className="px-6 py-4">10g protein per pack</td><td className="px-6 py-4">35–60</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">The Green Snack Co.</td><td className="px-6 py-4">Protein chips, makhana</td><td className="px-6 py-4">Pea protein-based chips</td><td className="px-6 py-4">40–80</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">YogaBar</td><td className="px-6 py-4">Protein Muesli</td><td className="px-6 py-4">12g protein per serving</td><td className="px-6 py-4">300–500</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">Habbit Health</td><td className="px-6 py-4">Savoury snacks</td><td className="px-6 py-4">Smart protein mix</td><td className="px-6 py-4">50–150</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">MuscleBlaze</td><td className="px-6 py-4">Protein pasta</td><td className="px-6 py-4">20–25g protein per serve</td><td className="px-6 py-4">80–300</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Laddu */}
          {activeTab === "segment_laddu" && (
            <section id="tab-segment_laddu" className="tab-pane">
              <h2 className="text-2xl font-bold text-tdh-primary mb-4 border-b pb-2" style={{ color: "#6d28d9" }}>
                5. Existing Protein Laddu Segment Analysis
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="chart-container h-72">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Protein Content Comparison (grams)</h3>
                  <canvas ref={ladduProteinRef} />
                </div>
                <div className="chart-container h-72 my-20">
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">Price Comparison (Smallest Listed SKU in INR)</h3>
                  <canvas ref={ladduPriceRef} />
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg shadow-inner my-24 md:my-0 lg:my-0" style={{ backgroundColor: "#fff1f2" }}>
                <p className="font-medium text-red-700">
                  <span className="font-bold">CRITICAL GAP:</span> Most listed laddus have unspecified or lower protein content (4-8g). <strong>TDH's 15g target is a clear market differentiator</strong>.
                </p>
              </div>

              <div className="mt-6">
                <button onClick={() => toggleTable("ladduTable")} className="flex items-center justify-between w-full p-3 bg-tdh-secondary text-white font-semibold rounded-lg hover:bg-tdh-primary transition duration-150" style={{ backgroundColor: "#a78bfa" }}>
                  <span>Toggle Full Laddu Segment Data Table</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>

                <div id="ladduTable" className={`mt-3 overflow-x-auto shadow-lg rounded-xl border border-gray-200 ${openTables["ladduTable"] ? "" : "hidden"}`}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-tdh-light" style={{ backgroundColor: "#f3e8ff" }}>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Ingredients</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (INR)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein (g)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                      <tr><td className="px-6 py-4 whitespace-nowrap">Proteindham</td><td className="px-6 py-4">Protein Laddu</td><td className="px-6 py-4">Dates, seeds & nuts, protein blend</td><td className="px-6 py-4">P.O.I.</td><td className="px-6 py-4">N/S</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">Meethi Kahani</td><td className="px-6 py-4">Protein Power Laddu</td><td className="px-6 py-4">Dates, cashew, almonds, seeds</td><td className="px-6 py-4">₹749</td><td className="px-6 py-4">N/L</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">Artinci</td><td className="px-6 py-4">Protein Ladoo</td><td className="px-6 py-4">Nut & seed flours, soy/wheat protein</td><td className="px-6 py-4">Varies</td><td className="px-6 py-4">~5.5 g</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">Nuskha Kitchen</td><td className="px-6 py-4">Chana / Protein Laddoo</td><td className="px-6 py-4">Roasted chickpeas, oats, nuts, jaggery</td><td className="px-6 py-4">₹1,300 (1kg)</td><td className="px-6 py-4">N/S</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">Healthy Belly</td><td className="px-6 py-4">Protein Rich Laddu</td><td className="px-6 py-4">Urad/moong/masoor/besan, ghee, jaggery</td><td className="px-6 py-4">₹329</td><td className="px-6 py-4">N/S</td></tr>
                      <tr><td className="px-6 py-4 whitespace-nowrap">EAT Anytime</td><td className="px-6 py-4">Hazelnut Protein Balls</td><td className="px-6 py-4">Whey isolate, oats, nuts, dates</td><td className="px-6 py-4">₹441</td><td className="px-6 py-4">~9.3 g</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* TDH Opportunity */}
          {activeTab === "tdh_opportunity" && (
            <section id="tab-tdh_opportunity" className="tab-pane">
              <h2 className="text-2xl font-bold text-tdh-primary mb-4 border-b pb-2" style={{ color: "#6d28d9" }}>
                6. New SKU Opportunity: TDH Protein Laddu (15g)
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-green-50 p-6 rounded-xl shadow-lg border border-green-200" style={{ backgroundColor: "#ecfdf5" }}>
                  <h3 className="text-xl font-bold text-green-700 mb-3">Product Proposition & Competitive Edge</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="col-span-2 p-3 bg-white rounded-lg border-2 border-green-500 text-center">
                      <p className="text-4xl font-extrabold text-tdh-primary" style={{ color: "#6d28d9" }}>15g</p>
                      <p className="text-sm text-gray-600">Protein per Laddu (Target)</p>
                    </div>6. TDH SKU Opportunity
                    <div className="col-span-2 p-3 bg-white rounded-lg border-2 border-green-500 text-center">
                      <p className="text-4xl font-extrabold text-tdh-primary" style={{ color: "#6d28d9" }}>₹400–₹600</p>
                      <p className="text-sm text-gray-600">Target Price Range (200g)</p>
                    </div>
                  </div>

                  <ul className="text-gray-700 space-y-2 list-disc list-inside">
                    <li><strong>Base Ingredients:</strong> Urad dal, Whey/Pea Protein Isolate, jaggery, ghee.</li>
                    <li><strong>Positioning:</strong> Functional Indulgence — authenticity + modern nutrition.</li>
                    <li><strong>Competitive Advantage:</strong> Highest protein offering in the traditional sweets category.</li>
                  </ul>
                </div>

<div
  className="bg-tdh-light p-6 rounded-xl shadow-lg flex flex-col"
  style={{ backgroundColor: "#f3e8ff", height: "400px" }} // fixed height
>
  <h3
    className="text-xl font-bold text-tdh-primary mb-3"
    style={{ color: "#6d28d9" }}
  >
    Protein Upgrade
  </h3>
  <div className="flex-1">
    <canvas ref={positioningRef} className="h-full w-full" />
  </div>
</div>

              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-700 mb-3">Customer Impact & New Audience Reach</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 border-l-4 border-tdh-primary bg-white shadow-md rounded-lg" style={{ borderLeftColor: "#6d28d9" }}>
                    <h4 className="text-lg font-semibold text-tdh-primary mb-2" style={{ color: "#6d28d9" }}>Impact on Existing Customers</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li><strong>Families/Health-Conscious:</strong> Healthier, protein-fortified sweet they trust.</li>
                      <li><strong>Parents:</strong> Easy, nutritious snack for children.</li>
                    </ul>
                  </div>
                  <div className="p-5 border-l-4 border-green-500 bg-white shadow-md rounded-lg" style={{ borderLeftColor: "#16a34a" }}>
                    <h4 className="text-lg font-semibold text-green-700 mb-2">Attracting New Customers</h4>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li><strong>Fitness Lovers/Gym-Goers:</strong> High-protein sweet that fits macros.</li>
                      <li><strong>Millennials/Gen Z:</strong> Appeals to snacks that are both healthy and tasty.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
