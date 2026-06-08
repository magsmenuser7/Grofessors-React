import React, { useState, useEffect, useRef } from "react";
import magsmennewlogo1 from "../components/assets/logos/magsmen-new-logo-white-landscape.png"
import magsmennewlogo from "../components/assets/logos/Favi-light.svg"


import {
  LayoutDashboard, Store, Sparkles, UserCheck, ShieldCheck,
  Building2, Calendar, Target, Users, Palette, Map, Tag,
  HeartHandshake, Gem, MapPin, Phone, Mail, Globe, Instagram,
  CheckCircle2, BarChart2, Layers, CheckCheck
} from "lucide-react";


import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";


// ─── Color Palette ───────────────────────────────────────────────────────────
const C = {
  purple: "#7C3AED",
  purpleDeep: "#5B21B6",
  purpleDark: "#4C1D95",
  purpleLight: "#EDE9FE",
  purpleMuted: "#A78BFA",
  purpleSoft: "#DDD6FE",
  slate: "#2D2D2D",
  slateLight: "#6B7280",
  border: "#E5E0F0",
  surface: "#F9F8FC",
  insight: "#1A1A1A",
};

const gradients = {
  hero: "linear-gradient(135deg, #0A0A0A 0%, #1E1037 30%, #2D1B69 60%, #4C1D95 100%)",
  metric: "linear-gradient(135deg, #110C1D 0%, #1E1037 50%, #2D1B69 100%)",
  insight: "linear-gradient(135deg, #1A1A1A 0%, #1E1037 50%, #2D1B69 100%)",
  dark: "linear-gradient(135deg, #0A0A0A 0%, #110C1D 50%, #0A0A0A 100%)",
  card: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFE 100%)",
  opportunity: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 50%, #C4B5FD 100%)",
};

// ─── Counter Hook ─────────────────────────────────────────────────────────────
function useCounter(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1200;
    const easeOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - (start as number)) / duration, 1);
      setValue(Math.floor(easeOut(p) * target));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [target, active]);
  return value;
}

// ─── Tooltip Component ────────────────────────────────────────────────────────
function StrategicTerm({ children, tooltip }: { children: React.ReactNode; tooltip: React.ReactNode | string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ borderBottom: "1px dashed #A78BFA", cursor: "help", position: "relative", display: "inline" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span style={{
          position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
          width: "max-content", maxWidth: 250,
          background: gradients.insight, color: "white",
          padding: "8px 12px", borderRadius: 4, fontSize: "0.75rem",
          borderLeft: `3px solid ${C.purple}`, zIndex: 100, whiteSpace: "normal",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)", marginBottom: 8,
          fontFamily: "DM Sans, sans-serif", lineHeight: 1.4,
          pointerEvents: "none"
        }}>
          {tooltip}
        </span>
      )}
    </span>
  );
}

// ─── Custom Chart Tooltip ─────────────────────────────────────────────────────
type MgTooltipPayload = { name?: string; value?: number | string; color?: string };

function MgTooltip({ active, payload, label }: { active?: boolean; payload?: MgTooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1E1037", border: `1px solid ${C.purple}`, borderRadius: 6, padding: "10px 14px", color: "#FAFAF8", fontSize: 12 }}>
      <p style={{ fontWeight: 700, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}%</p>
      ))}
    </div>
  );
}

// ─── Overview Chart ────────────────────────────────────────────────────────────
const overviewData = [
  { phase: "Research", skinAffair: 100, siyara: 100, personal: 100 },
  { phase: "Positioning", skinAffair: 100, siyara: 100, personal: 80 },
  { phase: "Vendor", skinAffair: 90, siyara: 40, personal: 40 },
  { phase: "Execution", skinAffair: 50, siyara: 0, personal: 20 },
  { phase: "Review", skinAffair: 0, siyara: 0, personal: 0 },
];

function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={overviewData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E0F044" />
        <XAxis dataKey="phase" tick={{ fontSize: 12, fill: C.slateLight }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: C.slateLight }} />
        <Tooltip content={<MgTooltip active={undefined} payload={undefined} label={undefined} />} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="skinAffair" name="Skin Affair Progress (%)" fill={C.purple} radius={[4, 4, 0, 0]} barSize={22} />
        <Bar dataKey="siyara" name="Siyara Progress (%)" fill={C.purpleMuted} radius={[4, 4, 0, 0]} barSize={22} />
        <Bar dataKey="personal" name="Personal Brand Progress (%)" fill="#0A0A0A" radius={[4, 4, 0, 0]} barSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Radar Chart ──────────────────────────────────────────────────────────────
const radarData = [
  { subject: "Digital Consistency", baseline: 40, target: 85 },
  { subject: "Staff Workflow", baseline: 50, target: 80 },
  { subject: "Visual Aesthetic", baseline: 60, target: 90 },
  { subject: "Vendor Coord.", baseline: 30, target: 85 },
  { subject: "Patient Exp.", baseline: 55, target: 85 },
];

function SkinAffairRadar() {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#E5E0F044" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: C.slate }} />
        <Radar name="Baseline (Pre-Magsmen)" dataKey="baseline" stroke={C.slateLight} fill={C.slateLight} fillOpacity={0.2} strokeWidth={2} />
        <Radar name="Target Trajectory (Active)" dataKey="target" stroke={C.purple} fill={C.purple} fillOpacity={0.2} strokeWidth={2} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        <Tooltip content={<MgTooltip active={undefined} payload={undefined} label={undefined} />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ─── Scatter Chart ────────────────────────────────────────────────────────────
const scatterMetro = [{ x: 80, y: 85 }, { x: 75, y: 70 }, { x: 90, y: 95 }, { x: 65, y: 80 }];
const scatterHyd = [{ x: 60, y: 55 }, { x: 45, y: 65 }, { x: 55, y: 50 }];
const scatterCurrent = [{ x: 50, y: 45 }];
const scatterTarget = [{ x: 85, y: 90 }];

function StatureScatter() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E0F044" />
        <XAxis type="number" dataKey="x" name="Digital Reach" domain={[0, 100]} label={{ value: "Digital Reach & PR Presence", position: "insideBottom", offset: -15, fontSize: 11, fill: C.slateLight }} tick={{ fontSize: 11, fill: C.slateLight }} />
        <YAxis type="number" dataKey="y" name="Authority" domain={[0, 100]} label={{ value: "Clinical Authority Perception", angle: -90, position: "insideLeft", offset: 15, fontSize: 11, fill: C.slateLight }} tick={{ fontSize: 11, fill: C.slateLight }} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} content={({ active, payload }) => {
          if (!active || !payload?.length) return null;
          return (
            <div style={{ background: "#1E1037", border: `1px solid ${C.purple}`, borderRadius: 6, padding: "8px 12px", color: "#FAFAF8", fontSize: 12 }}>
              <p>{payload[0]?.payload?.label || "Data point"}</p>
            </div>
          );
        }} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        <Scatter name="Other Metro Leaders" data={scatterMetro} fill={C.slateLight} />
        <Scatter name="Hyderabad Competitors" data={scatterHyd} fill={C.purpleMuted} />
        <Scatter name="Dr. Srujana (Current)" data={scatterCurrent} fill="#0A0A0A" shape="diamond" />
        <Scatter name="Dr. Srujana (Target)" data={scatterTarget} fill={C.purple} shape="star" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────
function MetricCard({ icon: Icon, label, target, note, delay, active }: { icon: React.ComponentType<any>; label: string; target: number; note: string; delay?: number; active?: boolean }) {
  const val = useCounter(target, !!active);
  return (
    <div style={{
      background: gradients.metric, borderRadius: 12, padding: 24,
      color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      transition: "all 0.4s ease", cursor: "default",
      animationDelay: `${delay}ms`, position: "relative", overflow: "hidden"
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, padding: 16, opacity: 0.1 }}>
        <Icon size={96} />
      </div>
      <p style={{ color: C.purpleMuted, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 40, fontFamily: "Playfair Display, serif", fontWeight: 700 }}>{val}</span>
        <span style={{ fontSize: 24, color: C.purpleMuted }}>%</span>
      </div>
      <p style={{ fontSize: 11, color: "rgba(237,233,254,0.7)", fontStyle: "italic", borderTop: `1px solid rgba(124,58,237,0.3)`, paddingTop: 12, marginTop: 12 }}>
        {note}
      </p>
    </div>
  );
}

// ─── CardHover style helper ───────────────────────────────────────────────────
interface CardHoverHandlers {
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function cardHoverHandlers(): CardHoverHandlers {
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 4px 24px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.2)";
      e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow = "";
      e.currentTarget.style.borderColor = "";
    }
  };
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

function TabOverview({ active }: { active: boolean }) {
  return (
    <div>
      {/* Strategic Thesis */}
      <div style={{ background: C.purpleLight, borderLeft: `4px solid ${C.purple}`, padding: "24px 32px", borderRadius: "0 8px 8px 0", marginBottom: 40, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ padding: 8, background: "white", borderRadius: "50%", color: C.purple, flexShrink: 0, display: "none" }}></div>
          <div>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: C.purpleDark, marginBottom: 8 }}>The Strategic Thesis</h3>
            <p style={{ color: C.slate, lineHeight: 1.7, fontSize: 15 }}>
              Clinical scaling in the AP/Telangana aesthetic market is not achieved by simply opening doors; it requires{" "}
              <StrategicTerm tooltip="The structured relationship between the corporate brand, clinic brands, and the individual doctor.">
                <strong style={{ color: C.purpleDark }}>Brand Architecture</strong>
              </StrategicTerm>. Our current sprint focuses on stabilizing the operational baseline of <strong>Skin Affair</strong>, engineering a premium launch environment for <strong>Siyara</strong>, and establishing <strong>Dr. Srujana</strong> as the undisputed category authority. Authority drives trust, trust lowers CAC, and clear positioning prevents internal cannibalization between the two clinic assets.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
        <MetricCard icon={Store} label="Skin Affair Optimization" target={85} note="Foundation secured. Staff feedback digitized & Wisecap integration active." delay={0} active={active} />
        <MetricCard icon={Sparkles} label="Siyara Launch Readiness" target={60} note="Core identity & architecture locked. Ground survey complete. Operations pending." delay={100} active={active} />
        <MetricCard icon={UserCheck} label="Personal Stature Build" target={45} note="Metro mapping complete. PR & LinkedIn pipelines initialized with vendors." delay={200} active={active} />
      </div>

      {/* Overview Chart */}
      <div style={{ background: "white", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(124,58,237,0.08)", padding: "24px 32px", border: `1px solid ${C.border}`, marginBottom: 48 }}>
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, color: C.slate, marginBottom: 4 }}>Architecture Deployment Trajectory</h3>
          <p style={{ fontSize: 13, color: C.slateLight }}>Phase completion across all three strategic verticals.</p>
        </div>
        <OverviewChart />
      </div>
    </div>
  );
}

function TabSkinAffair() {
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 700, color: C.slate, marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <Store color={C.purple} /> Skin Affair: The Current Baseline
        </h2>
        <p style={{ color: C.slateLight, maxWidth: 700, lineHeight: 1.7 }}>
          Before scaling to Siyara, the existing asset must operate seamlessly. We focused on diagnosing internal friction, establishing a cohesive digital aesthetic, and aligning external vendor pipelines.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginBottom: 32 }}>
        {/* Card 1 */}
        <div style={{ background: gradients.insight, borderRadius: 12, padding: 32, color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", transition: "all 0.4s ease", cursor: "default" }} {...cardHoverHandlers()}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 8, background: "rgba(124,58,237,0.2)", borderRadius: 8 }}><Users size={20} color="#EDE9FE" /></div>
            <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700 }}>Staff Feedback as a Diagnostic</h4>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 16, border: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
              <strong>Data:</strong> Conducted comprehensive staff feedback sessions. Uncovered operational bottlenecks in patient flow and service delivery within the Hyderabad clinic context.
            </p>
          </div>
          <p style={{ fontSize: 13, color: C.purpleLight, fontStyle: "italic" }}>
            <strong>Implication:</strong> This data isn't just to fix Skin Affair; it serves as the foundational operational blueprint for Siyara. We are integrating these learnings into tool integrations to prevent legacy issues in the new brand.
          </p>
        </div>

        {/* Card 2 */}
        <div style={{ background: gradients.insight, borderRadius: 12, padding: 32, color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", transition: "all 0.4s ease", cursor: "default" }} {...cardHoverHandlers()}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ padding: 8, background: "rgba(124,58,237,0.2)", borderRadius: 8 }}><Palette size={20} color="#EDE9FE" /></div>
            <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700 }}>Digital Presence & Palette</h4>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 16, border: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
              <strong>Data:</strong> Defined standard clinic colour palettes and successfully onboarded <strong style={{ color: C.purpleSoft }}>Wisecap</strong> as the dedicated vendor for Digital Integration and Social Media management.
            </p>
          </div>
          <p style={{ fontSize: 13, color: C.purpleLight, fontStyle: "italic" }}>
            <strong>Implication:</strong> Consistency builds trust. By standardizing the visual output and placing execution in capable vendor hands (governed by our strategy), we free up Dr. Srujana's bandwidth for clinical leadership.
          </p>
        </div>
      </div>

      {/* Radar Chart */}
      <div style={{ background: "white", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(124,58,237,0.08)", padding: "24px 32px", border: `1px solid ${C.border}` }}>
        <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: C.slate, marginBottom: 24, textAlign: "center" }}>
          Skin Affair: Pre vs. Post Optimization Trajectory
        </h3>
        <SkinAffairRadar />
        <div style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: C.slateLight, maxWidth: 600, margin: "24px auto 0" }}>
          <p><strong>So what?</strong> The gap between current state and Magsmen target reveals where Wisecap's digital integration and internal staff tooling will yield the highest ROI.</p>
        </div>
      </div>
    </div>
  );
}

function TabSiyara() {
  const pipeline = [
    { n: 1, title: "Strategy Lock", sub: "Naming & Positioning", done: true },
    { n: 2, title: "Spatial Alignment", sub: "Coordination with Asha garu", done: true },
    { n: 3, title: "Vendor Onboarding", sub: "Sourcing & Integration", done: false, partial: true },
    { n: 4, title: "Launch Comms", sub: "Execution phase", done: false },
  ];

  return (
    <div>
      <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 700, color: C.slate, marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <Sparkles color={C.purple} /> Siyara: The Future Brand
          </h2>
          <p style={{ color: C.slateLight, maxWidth: 700, lineHeight: 1.7 }}>
            A new entity requires deliberate{" "}
            <StrategicTerm tooltip="The intentional shaping of what a consumer feels and believes about a brand at every touchpoint.">
              <span style={{ fontWeight: 600, color: C.slate }}>Perception Engineering</span>
            </StrategicTerm>. From nomenclature to patient experience architecture, Siyara is being positioned to own a distinct category in the aesthetic market.
          </p>
        </div>
      </div>

      {/* Beyond Scope Callout */}
      <div style={{ background: C.purpleDeep, borderRadius: 12, padding: 4, boxShadow: "0 0 40px rgba(124,58,237,0.15)", marginBottom: 40, cursor: "default", transition: "all 0.4s ease" }} {...cardHoverHandlers()}>
        <div style={{ background: gradients.insight, borderRadius: 8, padding: "24px 32px", display: "flex", flexDirection: "row", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ padding: 16, background: "rgba(255,255,255,0.1)", borderRadius: "50%", flexShrink: 0, border: `1px solid rgba(124,58,237,0.3)` }}>
            <Gem size={32} color="#EDE9FE" />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "white", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Magsmen Strategic Value: Beyond the Scope</h4>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
              While the formal Interior Design objective was not opted for (utilizing the client's existing vendor), physical environments dictate clinical brand perception. To protect the brand's integrity, Magsmen proactively stepped in to provide strategic color palette recommendations and coordinated extensively with the interior vendor (Asha garu).
            </p>
            <p style={{ color: C.purpleMuted, fontSize: 13, fontWeight: 600, fontStyle: "italic" }}>
              <strong>The Implication:</strong> We ensure the visual identity and{" "}
              <StrategicTerm tooltip="The tangible feeling of a brand in a physical space.">
                <span style={{ color: "white" }}>Spatial Positioning</span>
              </StrategicTerm>{" "}
              remain tightly aligned with the overall strategy, preventing a disconnect between digital promise and physical reality.
            </p>
          </div>
        </div>
      </div>

      {/* Execution Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 32 }}>
        {[
          { icon: Tag, title: "Identity & Nomenclature", desc: "Developed core Brand Names & Suffixes that communicate premium clinical care without sounding generic.", status: "Status: Completed", statusIcon: CheckCircle2 },
          { icon: Map, title: "Market Intelligence", desc: "Conducted on-ground clinic surveys, Clinic Positioning mapping, and deep-dive Market Research.", status: "Status: Data Captured", statusIcon: BarChart2 },
          { icon: HeartHandshake, title: "Experience & Comms", desc: "Designed the Patient Experience flow and formulated the complete Brand Communication Architecture.", status: "Status: Architecture Designed", statusIcon: Layers },
        ].map(({ icon: Icon, title, desc, status, statusIcon: SIcon }, i) => (
          <div key={i} style={{ background: "white", border: `1px solid ${C.border}`, padding: 24, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "all 0.4s ease", cursor: "default", position: "relative", overflow: "hidden" }} {...cardHoverHandlers()}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 64, height: 64, background: "rgba(124,58,237,0.05)", borderRadius: "0 0 0 100%" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Icon size={20} color={C.purple} />
              <h5 style={{ fontWeight: 700, color: C.slate, fontSize: 15 }}>{title}</h5>
            </div>
            <p style={{ fontSize: 13, color: C.slateLight, marginBottom: 16, lineHeight: 1.6 }}>{desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontWeight: 600, color: C.purple }}>
              <span>{status}</span><SIcon size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div style={{ background: gradients.card, borderRadius: 12, padding: "32px", border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: C.slate, marginBottom: 24 }}>Siyara Vendor & Execution Pipeline</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, position: "relative" }}>
          {pipeline.map(({ n, title, sub, done, partial }) => (
            <div key={n} style={{
              background: done ? "white" : partial ? "white" : C.surface,
              border: `2px solid ${done ? C.purple : partial ? C.purpleMuted : C.border}`,
              borderStyle: done ? "solid" : partial ? "dashed" : "dashed",
              padding: 16, borderRadius: 8, textAlign: "center",
              boxShadow: done ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
              opacity: !done && !partial ? 0.7 : 1
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: done ? C.purple : partial ? C.purpleLight : C.border,
                color: done ? "white" : partial ? C.purple : C.slateLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 8px", fontSize: 14, fontWeight: 700
              }}>{n}</div>
              <h6 style={{ fontWeight: 700, fontSize: 13, color: C.slate }}>{title}</h6>
              <p style={{ fontSize: 10, color: C.slateLight, marginTop: 4 }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabPersonal() {
  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 30, fontWeight: 700, color: C.slate, marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <UserCheck color={C.purple} /> Personal Branding Stature
        </h2>
        <p style={{ color: C.slateLight, maxWidth: 700, lineHeight: 1.7 }}>
          Clinics are chosen for convenience; doctors are sought for authority. By elevating Dr. Srujana's personal brand, we create a halo effect that automatically drives premium patient acquisition for both Skin Affair and Siyara.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, marginBottom: 32, flexWrap: "wrap" }}>
        {/* Left Col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 240 }}>
          <div style={{ background: gradients.insight, borderRadius: 12, padding: 24, color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 16, color: C.purpleLight, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>Intelligence Gathered</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.6 }}>
                <MapPin size={16} color={C.purple} style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong>Metro Mapping:</strong> Analyzed influencer doctor positioning across Hyderabad, Bangalore, Mumbai, & Delhi.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.6 }}>
                <Target size={16} color={C.purple} style={{ marginTop: 2, flexShrink: 0 }} />
                <span><strong>Gap Analysis:</strong> Identified the white space for Dr. Srujana's specific clinical voice in the South Indian market.</span>
              </li>
            </ul>
          </div>

          <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 16, color: C.slate, borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>Execution Engine</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Digital Partner", badge: "Wisecap", dark: false },
                { label: "PR Vendor", badge: "Article Pub.", dark: false },
                { label: "LinkedIn Strategy", badge: "Active", dark: true },
              ].map(({ label, badge, dark }) => (
                <li key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: C.slate }}>{label}</span>
                  <span style={{ background: dark ? C.purple : C.purpleLight, color: dark ? "white" : C.purple, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, boxShadow: dark ? "0 0 12px rgba(124,58,237,0.3)" : "none" }}>{badge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Col */}
        <div style={{ background: "white", borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(124,58,237,0.08)", padding: "24px 32px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", minWidth: 300 }}>
          <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: C.slate, marginBottom: 8 }}>Doctor Authority vs. Reach (Metro Mapping)</h3>
          <p style={{ fontSize: 13, color: C.slateLight, marginBottom: 24, lineHeight: 1.6 }}>Benchmarking top-tier dermatologists/aesthetic doctors across 4 cities to identify Dr. Srujana's strategic positioning target.</p>
          <div style={{ flex: 1 }}>
            <StatureScatter />
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.slateLight, fontStyle: "italic" }}>
            <strong>Strategic Goal:</strong> Move from regional practitioner to national thought-leader quadrant via targeted PR and LinkedIn execution.
          </div>
        </div>
      </div>
    </div>
  );
}

function TabMagsmen() {
  const badges = ["Clutch Top Branding Agency (4.9★)", "Google 4.9★ (133 Reviews)", "Consultant of the Year 2023", "ISO 9001:2015", "TEDx Speaker", "India 500 Startup Award"];
  const cases1 = [
    { c: "Tenali Double Horse", d: "Repositioned for pan-India, US market entry." },
    { c: "Sri Bhramara", d: "Market dominance in AP real estate." },
    { c: "Chakrasiddh", d: "Elite-only to trusted holistic healing centre." },
    { c: "LVLUP (GV Mall)", d: "Premium fashion for Tier 3/4 cities." },
  ];
  const cases2 = [
    { c: "Cargill", d: "Rural brand strategy for Fortune 25 in vannamei feed." },
    { c: "MR Constructions", d: "Real estate brand via experience redesign." },
    { c: "Suma Filmy Arts", d: "Legacy banner to creator launchpad." },
    { c: "Swargaseema", d: "Standalone to structured group brand." },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, fontWeight: 700, color: C.slate, marginBottom: 16 }}>Clear Vision. Calm Approach. Bold Moves.</h2>
        <p style={{ color: C.slateLight, maxWidth: 560, margin: "0 auto", fontSize: 17, lineHeight: 1.7 }}>
          We don't just build brands. We build brands that perform.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginBottom: 48 }}>
        <div style={{ background: "white", padding: 32, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", transition: "all 0.4s ease" }} {...cardHoverHandlers()}>
          <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16, color: C.purpleDark, borderBottom: `1px solid ${C.border}`, paddingBottom: 8 }}>Who We Are</h3>
          <p style={{ fontSize: 13, color: C.slateLight, lineHeight: 1.8, marginBottom: 12 }}>
            Magsmen is a strategic brand consulting firm that helps organizations strengthen how they are perceived, chosen, and valued in the market. We identify the real issues limiting brand performance, clarify the position a business can own, and design the strategic frameworks that unlock measurable growth.
          </p>
          <p style={{ fontSize: 13, color: C.slateLight, lineHeight: 1.8 }}>
            We sit between the brand and all execution partners. We are the strategy layer, orchestrating specialized agencies (Advertising, PR, Tech, Social) to ensure one direction.
          </p>
        </div>

        <div style={{ background: gradients.insight, padding: 32, borderRadius: 12, color: "white", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", transition: "all 0.4s ease" }} {...cardHoverHandlers()}>
          <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16, color: C.purpleLight, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>The Ecosystem</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16, fontSize: 13, lineHeight: 1.7 }}>
            <li><strong style={{ color: C.purpleMuted }}>Magsmen Strategy Consultants</strong> — Strategy and brand consulting (the core)</li>
            <li><strong style={{ color: C.purpleMuted }}>MIBBS (mibbs.ai)</strong> — AI-powered brand budget allocation tool.</li>
            <li><strong style={{ color: C.purpleMuted }}>InTalks Podcast</strong> — 90M+ viewership, 30+ episodes.</li>
            <li><strong style={{ color: C.purpleMuted }}>SanStrategies</strong> — Legal, Compliance & BI thought leadership.</li>
          </ul>
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, color: C.slate, marginBottom: 24, textAlign: "center" }}>Market Proof & Recognitions</h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          {badges.map((b) => (
            <span key={b} style={{ padding: "8px 16px", background: C.purpleLight, color: C.purpleDark, fontSize: 12, fontWeight: 700, borderRadius: 999, border: `1px solid rgba(124,58,237,0.2)` }}>{b}</span>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      <div style={{ background: "white", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ background: C.surface, padding: "16px 24px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontWeight: 700, fontSize: 17, color: C.slate }}>Select Case Studies (AP/Telangana Context)</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {[cases1, cases2].map((col, ci) => (
            <div key={ci} style={{ padding: 24, borderRight: ci === 0 ? `1px solid ${C.border}` : "none" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {col.map(({ c, d }) => (
                  <li key={c} style={{ fontSize: 13, color: C.slateLight }}>
                    <strong style={{ color: C.slate }}>{c}:</strong> {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p style={{ textAlign: "center", color: C.purpleDark, fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 22, marginTop: 48, marginBottom: 16 }}>
        "When clarity leads, brands win."
      </p>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: string | number }>;
}

export default function MagsmenDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs: Tab[] = [
    { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
    { id: "skinaffair", label: "Skin Affair (Current)", icon: Store },
    { id: "siyara", label: "Siyara (Future) ◆", icon: Sparkles },
    { id: "personal", label: "Personal Brand Stature", icon: UserCheck },
    { id: "magsmen", label: "About Magsmen", icon: ShieldCheck },
  ];

  const handleTab = (id: string): void => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", background: C.surface, color: C.slate, minHeight: "100vh", position: "relative" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #7C3AED; border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .tab-content-enter { animation: fadeUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>

      {/* Scroll Progress */}
      <div style={{ position: "fixed", top: 0, left: 0, width: `${scrollProgress}%`, height: 3, background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)", zIndex: 1000, transition: "width 0.1s ease" }} />

      {/* Header */}
      <header style={{ background: gradients.hero, color: "white", paddingTop: 40, paddingBottom: 24, paddingLeft: 48, paddingRight: 48, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 384, height: 384, background: C.purple, borderRadius: "50%", filter: "blur(120px)", opacity: 0.2, transform: "translate(33%, -50%)" }} />
        <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ marginBottom: 24 }}>
                <img src={magsmennewlogo1} alt="Magsmen Logo" className="w-[190px]" />
              {/* <h2 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", color: "white" }}>M A G S M E N</h2>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", color: C.purpleMuted, fontWeight: 600, marginTop: 4 }}>STRATEGY CONSULTANTS</p> */}
            </div>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>
              Dr. Srujana — Project Status Overview
            </h1>
            <p style={{ color: C.purpleMuted, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: 11, fontWeight: 600, marginBottom: 16 }}>
              A Magsmen Strategic Analysis & Progress Report
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "rgba(237,233,254,0.8)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Building2 size={12} /> Prepared for Dr. Srujana</span>
              <span>|</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={12} /> June 2026</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.purpleMuted, display: "block", marginBottom: 4 }}>Methodology Stage</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {[1,2,3,4].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= 3 ? C.purple : "rgba(255,255,255,0.2)" }} />)}
              <span style={{ marginLeft: 8, fontSize: 14, fontWeight: 600 }}>Execution & Alignment</span>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 1, background: "rgba(124,58,237,0.2)" }} />
      </header>

      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", paddingLeft: 48, paddingRight: 48, overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32, minWidth: "max-content", height: 52 }}>
            {tabs.map(({ id, label, icon: Icon }, idx) => (
              <button
                key={id}
                onClick={() => handleTab(id)}
                style={{
                  position: "relative", height: "100%", fontSize: 13, fontWeight: activeTab === id ? 600 : 400,
                  color: activeTab === id ? "#0A0A0A" : C.slateLight,
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                  marginLeft: idx === tabs.length - 1 ? "auto" : 0,
                  transition: "color 0.2s ease", padding: "0 4px",
                  fontFamily: "DM Sans, sans-serif"
                }}
              >
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 3, background: activeTab === id ? C.purple : "transparent", transition: "background 0.3s ease", borderRadius: "2px 2px 0 0" }} />
                <Icon size={16} />{label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: 1320, margin: "0 auto", padding: "40px 48px" }}>
        <div key={activeTab} className="tab-content-enter">
          {activeTab === "overview" && <TabOverview active={true} />}
          {activeTab === "skinaffair" && <TabSkinAffair />}
          {activeTab === "siyara" && <TabSiyara />}
          {activeTab === "personal" && <TabPersonal />}
          {activeTab === "magsmen" && <TabMagsmen />}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: gradients.dark, color: "white", borderTop: `4px solid ${C.purple}`, marginTop: 48 }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "48px 48px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, marginBottom: 32 }}>
            <div>
              <img src={magsmennewlogo} alt="Magsmen Logo" className="w-20 h-20"  />
              {/* <h2 style={{ fontSize: 18, letterSpacing: "0.2em", fontWeight: 700, marginBottom: 16 }}>MAGSMEN</h2>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Strategy Consultants</p> */}
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.8, maxWidth: 280 }}>
                A division of Grofessors Innovations Pvt Ltd.<br />
                Defining the strategic direction for brands that intend to lead.
              </p>
            </div>
            <div>
              <h4 style={{ color: C.purpleMuted, fontWeight: 600, marginBottom: 16, textTransform: "uppercase", fontSize: 11, letterSpacing: "0.1em" }}>Contact</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}><Phone size={16} color={C.purple} /> +91 90449 10449</li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}><Mail size={16} color={C.purple} /> connect@magsmen.com</li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}><Globe size={16} color={C.purple} /> www.magsmen.com</li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}><Instagram size={16} color={C.purple} /> @magsmenindia</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: C.purpleMuted, fontWeight: 600, marginBottom: 16, textTransform: "uppercase", fontSize: 11, letterSpacing: "0.1em" }}>Global Presence</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                <li><strong>Head Office:</strong> Brodipet, Guntur, AP 522002</li>
                <li><strong>Corporate:</strong> Madhapur, Hyderabad, TS 500081</li>
                <li><strong>Australia:</strong> Rowville, VIC 3178</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
            <p>CONFIDENTIAL — Prepared for Dr. Srujana — June 2026</p>
            <p>© Magsmen is a registered trademark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}