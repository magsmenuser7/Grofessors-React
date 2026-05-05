import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

// ── HANDBOOK DATA ──
const hbSections = [
    { id: '1', title: 'About Grofesion & the Ecosystem', req: true, html: <><p>Grofesion Innovations Private Limited operates across brand consulting, personal branding, professional education, and startup support.</p><p>Divisions: <strong>Magsmen Brand Consultants</strong>, <strong>Stature by Magsmen</strong>, <strong>Launchpad</strong>, <strong>Tapestry of Talents</strong>.</p><p><strong>Vision:</strong> To be at the forefront of every industry, providing innovative and sustainable solutions that shape the world.</p><p><strong>Mission:</strong> To empower our clients to create unparalleled value, enabling them to set new industry standards.</p></> },
    { id: '2', title: 'Core Values & Culture', req: true, html: <><p>The culture is structured and purposeful — not casual, not corporate. Everyone holds themselves accountable without being managed.</p><ul><li><strong>Creativity</strong> — fresh ideas and novel approaches.</li><li><strong>Excellence</strong> — highest standards in all endeavours.</li><li><strong>Collaboration</strong> — shared goals through partnership.</li><li><strong>Integrity</strong> — transparency and trust in all relationships.</li><li><strong>Passion</strong> — drive to exceed expectations.</li><li><strong>Innovation</strong> — relentlessly pushing boundaries.</li><li><strong>Social Responsibility</strong> — Tapestry of Talents and Launchpad.</li></ul></> },
    { id: '3', title: 'Working Hours, Attendance & Leave', req: true, html: <><p><strong>Hours:</strong> 10:00 AM – 7:00 PM, Monday to Friday. Arrive by 10:15 AM.</p><p><strong>Late arrivals:</strong> Up to 3 per month without explanation. Beyond 3 requires written justification.</p><p><strong>Leave:</strong> EL — 4 days; SL — 12 days; CL — 12 days per calendar year.</p><p><strong>Applications:</strong> 3 working days in advance via ClickUp or WhatsApp. Emergency leave must be communicated by phone call.</p><p><strong>Absence Without Leave:</strong> Treated as loss-of-pay. 7+ continuous days may result in termination.</p></> },
    { id: '4', title: 'Dress Code & Office Conduct', req: false, html: <><p><strong>Attire:</strong> Formal every day. Level 3 (business formal) for GM+ client meetings. Level 2 (smart casual) for all other interactions.</p><p><strong>Conduct:</strong> Professional at all times. Workspaces must be clean. Smoking strictly prohibited on premises.</p><p><strong>Lunch:</strong> 1:00 PM – 2:00 PM. Visitors to be seated in the discussion room only.</p></> },
    { id: '5', title: 'Performance, Appraisal & Incentives', req: false, html: <><p><strong>Probation:</strong> 2 months. Confirmation based on appraisal. Poor performance leads to extension or termination.</p><p><strong>Annual Hike:</strong> 7–20% based on individual and company performance.</p><p><strong>Incentives:</strong> Client acquisition incentives after 6 months. 7–10% for managers, flat 5% for others.</p></> },
    { id: '6', title: 'Confidentiality, Anti-Harassment & Technology', req: true, html: <><p><strong>Anti-Harassment:</strong> All forms of harassment are strictly prohibited and result in immediate termination. Report to HR.</p><p><strong>Confidentiality:</strong> No disclosure of client data, frameworks, or company IP — during or for 12 months post-employment.</p><p><strong>Non-Compete:</strong> No engagement with clients or competitors for 24 months post-separation.</p><p><strong>Technology:</strong> Company systems are for official use only. The company may review any material on its network without notice.</p></> },
    { id: '7', title: 'Termination & Exit Policy', req: false, html: <><p><strong>Notice:</strong> 30 days from either party. Salary in lieu accepted.</p><p><strong>Immediate Termination:</strong> For fraud, forgery, breach of confidentiality, insubordination, or criminal conduct.</p><p><strong>Exit:</strong> Full written handover of responsibilities and all company assets is mandatory.</p></> },
];

const reqHb = ['1', '2', '3', '6'];

export default function OnboardingPortal() {
    // ── STATE ──
    const [currentStep, setCurrentStep] = useState<number | 'done'>(1);
    const [empType, setEmpType] = useState<'' | 'intern' | 'fulltime'>('');
    const [readItems, setReadItems] = useState<Set<string>>(new Set());
    const [openHb, setOpenHb] = useState<string | null>(null);
    const [scrolledOffer, setScrolledOffer] = useState(false);
    const [scrolledNDA, setScrolledNDA] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [showHbWarn, setShowHbWarn] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const [vals, setVals] = useState<Record<string, string>>({
        firstName: "", lastName: "", email: "", mobile: "", doj: "", role: "",
        division: "", office: "", selfIntro: "", linkedin: "", fatherName: "",
        dob: "", address: "", emergName: "", emergPhone: "", bloodGroup: "",
        qual: "", accName: "", bankName: "", accNo: "", ifsc: "", branch: "",
        ref1Name: "", ref1Desg: "", ref1Org: "", ref1Contact: "",
        ref2Name: "", ref2Desg: "", ref2Org: "", ref2Contact: "",
        signature: "", signDate: new Date().toLocaleDateString('en-IN')
    });

    const [checkboxes, setCheckboxes] = useState({
        offerCb: false,
        ndaCb: false,
        finalCb: false
    });

    const [files, setFiles] = useState<Record<string, File | null>>({
        aadhaar: null, pan: null, photo: null, tenth: null, twelfth: null,
        degree: null, collegeid: null, noc: null, relieve: null, salary: null
    });

    // ── HANDLERS ──
    const handleValChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        
        // Auto-detect empType if role changes
        if (id === 'role') {
            const selectedOption = (e.target as HTMLSelectElement).options[(e.target as HTMLSelectElement).selectedIndex];
            const group = selectedOption.parentElement?.getAttribute('label');
            if (group === 'Internship') setEmpType('intern');
            if (group === 'Full-Time') setEmpType('fulltime');
        }

        setVals(prev => ({ ...prev, [id]: value }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: false }));
    };

    const handleCbChange = (id: keyof typeof checkboxes) => {
        setCheckboxes(prev => ({ ...prev, [id]: !prev[id] }));
        if (errors[id]) setErrors(prev => ({ ...prev, [id]: false }));
    };

const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
// const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

const handleFile = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Reject if over 1MB
  // if (file.size > MAX_FILE_SIZE) {
  //   setFileErrors(prev => ({
  //     ...prev,
  //     [key]: `File exceeds 1MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB)`
  //   }));
  //   e.target.value = ''; 
  //   return; }

  // Clear error & add file to state
  setFileErrors(prev => { const updated = { ...prev }; delete updated[key]; return updated; });
  setFiles(prev => ({ ...prev, [key]: file }));
};

    const triggerFile = (id: string) => {
        document.getElementById(id)?.click();
    };

    const checkScroll = (e: React.UIEvent<HTMLDivElement>, doc: string) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            if (doc === "offer") setScrolledOffer(true);
            if (doc === "nda") setScrolledNDA(true);
        }
    };

    const markRead = (id: string) => {
        setReadItems(prev => new Set(prev).add(id));
    };

    // ── VALIDATION ──
    const validate = (step: number) => {
        let newErrors: Record<string, boolean> = {};
        let ok = true;

        if (step === 1) {
            const req = ['firstName', 'lastName', 'email', 'mobile', 'doj', 'role', 'division', 'office'];
            req.forEach(f => { if (!vals[f]) { newErrors[f] = true; ok = false; } });
            if (vals.selfIntro.length < 50) { newErrors.selfIntro = true; ok = false; }
        }
        if (step === 2) {
            const req = ['fatherName', 'dob', 'address', 'emergName', 'emergPhone', 'qual', 'accName', 'bankName', 'accNo', 'ifsc', 'ref1Name', 'ref1Contact', 'ref2Name', 'ref2Contact'];
            req.forEach(f => { if (!vals[f]) { newErrors[f] = true; ok = false; } });
        }
        if (step === 3) {
            const req = ['aadhaar', 'pan', 'photo', 'tenth', 'twelfth', 'degree'];
            if (empType === 'intern') req.push('collegeid');
            req.forEach(f => { if (!files[f]) { alert(`Please upload ${f}`); ok = false; } });
        }
        if (step === 4 && !checkboxes.offerCb) { newErrors.offerCb = true; ok = false; }
        if (step === 5 && !checkboxes.ndaCb) { newErrors.ndaCb = true; ok = false; }
        if (step === 7) {
            if (!vals.signature) { newErrors.signature = true; ok = false; }
            if (!checkboxes.finalCb) { newErrors.finalCb = true; ok = false; }
        }

        setErrors(newErrors);
        if (!ok) window.scrollTo({ top: 100, behavior: 'smooth' });
        return ok;
    };

    const goTo = (target: number) => {
        if (target > (currentStep as number) && !validate(currentStep as number)) return;
        if (target === 7 && !validateHandbook()) return;
        setCurrentStep(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const validateHandbook = () => {
        const missing = reqHb.filter(id => !readItems.has(id));
        if (missing.length) {
            setShowHbWarn(true);
            return false;
        }
        return true;
    };

    const getRoleText = () => {
        return vals.role ? vals.role.charAt(0).toUpperCase() + vals.role.slice(1) : '—';
    };

    // ── SUBMIT & PDF ──
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Grofesion Onboarding Summary", 20, 20);
        doc.setFontSize(12);
        doc.text(`Name: ${vals.firstName} ${vals.lastName}`, 20, 40);
        doc.text(`Role: ${vals.role}`, 20, 50);
        doc.text(`Division: ${vals.division}`, 20, 60);
        doc.text(`Joined: ${vals.doj}`, 20, 70);
        doc.text(`Signed: ${vals.signature} on ${vals.signDate}`, 20, 80);
        doc.save(`Onboarding_${vals.firstName}.pdf`);
    };

    const submitOnboarding = async () => {
        if (!validate(7)) return;
        setIsSubmitting(true);
        setSubmitStatus("Uploading files and data...");

        try {
            const formData = new FormData();
            Object.keys(vals).forEach(k => formData.append(k, vals[k]));
            Object.keys(checkboxes).forEach(k => formData.append(k, String(checkboxes[k as keyof typeof checkboxes])));
            Object.keys(files).forEach(k => { if (files[k]) formData.append(k, files[k] as Blob); });
            formData.append("empType", empType);
            formData.append("hb_sections", Array.from(readItems).join(","));

            const response = await fetch(
                "https://api.mibbs.ai/api/submit-onboarding/",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (response.ok) {
                setSubmitStatus("Success!");
                setTimeout(() => setCurrentStep('done'), 1000);
            } else {
                setSubmitStatus("Server Error. Please try again.");
            }
        } catch (err) {
            setSubmitStatus("Connection failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

return (
    <>
      <style>{cssStyles}</style>

      {/* OVERLAY */}
      {isSubmitting && (
        <div className="sending-overlay show">
          <div className="sending-spinner"></div>
          <div className="sending-text">Submitting your onboarding…</div>
          <div className="sending-sub">{submitStatus}</div>
        </div>
      )}

      {/* NAV */}
      <nav className="topnav">
        <div className="nav-logo">
          <svg width="136" height="32" viewBox="0 0 136 32" fill="none">
            <text x="2" y="24" fontFamily="Outfit,sans-serif" fontWeight="800" fontSize="20" fill="#E8510A">G</text>
            <text x="20" y="23" fontFamily="Outfit,sans-serif" fontWeight="800" fontSize="18" fill="#0F0F0F">ROFESION</text>
            <text x="128" y="10" fontFamily="Outfit,sans-serif" fontWeight="500" fontSize="8" fill="#A09D95">™</text>
          </svg>
          <div className="nav-div"></div>
          <div className="nav-lbl">Employee Onboarding</div>
        </div>
        <div className="nav-pill">
          {currentStep === 'done' ? 'Complete ✓' : `Step ${currentStep} of 7`}
        </div>
      </nav>

      {/* PROGRESS */}
      {currentStep !== 'done' && (
        <div className="prog-wrap">
          <div className="prog-steps">
            {[1, 2, 3, 4, 5, 6, 7].map(s => (
              <div key={s} className={`ps ${currentStep === s ? 'active' : (currentStep as number) > s ? 'done' : ''}`}>
                <div className="ps-dot">{(currentStep as number) > s ? '✓' : s}</div>
                <div className="ps-lbl">{['Welcome', 'Details', 'Documents', 'Offer Letter', 'NDA', 'Handbook', 'Sign & Submit'][s - 1]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="shell">
        
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="step active">
            <div className="hero">
              <div className="hero-eye">Welcome to Grofesion</div>
              <div className="hero-title">Hello, <span className="hero-name">{vals.firstName || 'there'}</span>.<br />Let's get you onboarded.</div>
              <div className="hero-body">This is your official digital onboarding portal. Complete all seven steps to formally confirm your joining. Takes about 12 minutes.</div>
              <div className="hero-meta">
                <div className="hm-item"><div className="hm-lbl">Entity</div><div className="hm-val">Grofesion Innovations Pvt Ltd</div></div>
                <div className="hm-item"><div className="hm-lbl">Division</div><div className="hm-val">{vals.division || '—'}</div></div>
                <div className="hm-item"><div className="hm-lbl">HR Contact</div><div className="hm-val">hr@magsmen.com</div></div>
              </div>
            </div>

            <div className="step-eye">Step 1 of 7 — Identity</div>
            <div className="step-title">Tell us who you are</div>
            <div className="step-sub">Your name, role, and division personalise this entire onboarding experience.</div>

            <div className="card">
              <div className="card-head">Basic Information</div>
              <div className="frow">
                <div className="field">
                  <label>First Name <span className="req">*</span></label>
                  <input type="text" id="firstName" value={vals.firstName} onChange={handleValChange} placeholder="Arjun" className={errors.firstName ? 'invalid' : ''} />
                  {errors.firstName && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
                <div className="field">
                  <label>Last Name <span className="req">*</span></label>
                  <input type="text" id="lastName" value={vals.lastName} onChange={handleValChange} placeholder="Sharma" className={errors.lastName ? 'invalid' : ''} />
                  {errors.lastName && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
              </div>
              <div className="field">
                <label>Personal Email <span className="req">*</span></label>
                <input type="email" id="email" value={vals.email} onChange={handleValChange} placeholder="your@email.com" className={errors.email ? 'invalid' : ''} />
                {errors.email && <div className="field-error" style={{ display: 'block' }}>Enter a valid email.</div>}
              </div>
              <div className="frow">
                <div className="field">
                  <label>Mobile Number <span className="req">*</span></label>
                  <input type="tel" id="mobile" value={vals.mobile} onChange={handleValChange} placeholder="+91 90000 00000" className={errors.mobile ? 'invalid' : ''} />
                  {errors.mobile && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
                <div className="field">
                  <label>Date of Joining <span className="req">*</span></label>
                  <input type="date" id="doj" value={vals.doj} onChange={handleValChange} className={errors.doj ? 'invalid' : ''} />
                  {errors.doj && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
              </div>
              <div className="frow">
                <div className="field">
                  <label>Role / Designation <span className="req">*</span></label>
                  <select id="role" value={vals.role} onChange={handleValChange} className={errors.role ? 'invalid' : ''}>
                    <option value="">Select role</option>
                    <optgroup label="Internship">
                      <option value="brand-strategy-intern">Brand Strategy Intern</option>
                      <option value="business-development-intern">Business Development Intern</option>
                      <option value="content-intern">Content & Digital Intern</option>
                      <option value="design-intern">Design Intern</option>
                      <option value="research-intern">Research Intern</option>
                      <option value="management-intern">Management Trainee</option>
                       <option value="hr-intern">HR Intern</option>
                        <option value="we-dev-intern">Web Developer Intern</option>
                    </optgroup>
                    <optgroup label="Full-Time">
                      <option value="business-fulltime">Business Associate</option>
                      <option value="strategy-fulltime">Strategy Associate</option>
                      <option value="operations-fulltime">Operations Associate</option>
                      <option value="digital-fulltime">Digital Associate</option>
                      <option value="senior-business-fulltime">Senior Business Development</option>
                      <option value="strategist-fulltime">Lead Strategist</option>
                      <option value="oprations-head-fulltime">Head of Operations</option>
                       <option value="hr-fulltime">HR</option>
                      <option value="junior-web-fulltime">Junior Web Developer</option>
                       <option value="senior-web-fulltime">Senior Web Developer</option>
                    </optgroup>
                  </select>
                  {errors.role && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
                <div className="field">
                  <label>Division <span className="req">*</span></label>
                  <select id="division" value={vals.division} onChange={handleValChange} className={errors.division ? 'invalid' : ''}>
                    <option value="">Select division</option>
                    <option>Magsmen Brand Consultants</option>
                    <option>Stature by Magsmen</option>
                    <option>Launchpad by Magsmen</option>
                    <option>Tapestry of Talents</option>
                    <option>Grofesion (Corporate)</option>
                  </select>
                  {errors.division && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
              </div>
              <div className="field">
                <label>Reporting Office <span className="req">*</span></label>
                <select id="office" value={vals.office} onChange={handleValChange} className={errors.office ? 'invalid' : ''}>
                  <option value="">Select office</option>
                  <option>Guntur, Andhra Pradesh</option>
                  <option>Hyderabad, Telangana</option>
                  <option>Remote</option>
                </select>
                {errors.office && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
              </div>
            </div>

            <div className="card">
              <div className="card-head">Self Introduction — For Your HR File</div>
              <div className="alert alert-info"><div className="alert-icon">💡</div><div>Your team lead reads this before Day 1. Write naturally — who you are, your background, and what drew you to Grofesion.</div></div>
              <div className="field">
                <label>About you <span className="req">*</span></label>
                <textarea id="selfIntro" rows={5} value={vals.selfIntro} onChange={handleValChange} placeholder="e.g. I am a final year MBA student..." maxLength={600} className={errors.selfIntro ? 'invalid' : ''}></textarea>
                <div className={`char-count ${vals.selfIntro.length < 80 && vals.selfIntro.length > 0 ? 'warn' : ''}`}>{vals.selfIntro.length} / 400 recommended</div>
                {errors.selfIntro && <div className="field-error" style={{ display: 'block' }}>Minimum 80 characters required.</div>}
              </div>
              <div className="field">
                <label>LinkedIn Profile <span className="opt">(optional)</span></label>
                <input type="url" id="linkedin" value={vals.linkedin} onChange={handleValChange} placeholder="https://linkedin.com/in/yourname" />
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-primary" onClick={() => goTo(2)}>Continue → Personal Details</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="step active">
            <div className="step-eye">Step 2 of 7 — Personal Details</div>
            <div className="step-title">Personal & Banking Information</div>
            <div className="step-sub">Required for HR records, payroll setup, and compliance. Stored securely.</div>

            <div className="card">
              <div className="card-head">Personal Information</div>
              <div className="frow">
                <div className="field"><label>Father's / Guardian's Name <span className="req">*</span></label><input type="text" id="fatherName" value={vals.fatherName} onChange={handleValChange} placeholder="Full name" className={errors.fatherName ? 'invalid' : ''} />{errors.fatherName && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                <div className="field"><label>Date of Birth <span className="req">*</span></label><input type="date" id="dob" value={vals.dob} onChange={handleValChange} className={errors.dob ? 'invalid' : ''} />{errors.dob && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
              </div>
              <div className="field"><label>Permanent Address <span className="req">*</span></label><textarea id="address" rows={2} value={vals.address} onChange={handleValChange} placeholder="Door no., Street, City, State, PIN Code" className={errors.address ? 'invalid' : ''}></textarea>{errors.address && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
              <div className="frow">
                <div className="field"><label>Emergency Contact Name <span className="req">*</span></label><input type="text" id="emergName" value={vals.emergName} onChange={handleValChange} placeholder="Name & relationship" className={errors.emergName ? 'invalid' : ''} />{errors.emergName && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                <div className="field"><label>Emergency Contact Number <span className="req">*</span></label><input type="tel" id="emergPhone" value={vals.emergPhone} onChange={handleValChange} placeholder="+91 90000 00000" className={errors.emergPhone ? 'invalid' : ''} />{errors.emergPhone && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
              </div>
              <div className="frow">
                <div className="field"><label>Blood Group <span className="opt">(optional)</span></label><select id="bloodGroup" value={vals.bloodGroup} onChange={handleValChange}><option value="">Select</option><option>A+</option><option>A−</option><option>B+</option><option>B−</option><option>O+</option><option>O−</option><option>AB+</option><option>AB−</option></select></div>
                <div className="field"><label>Highest Qualification <span className="req">*</span></label><select id="qual" value={vals.qual} onChange={handleValChange} className={errors.qual ? 'invalid' : ''}><option value="">Select</option><option>Pursuing Undergraduate</option><option>Undergraduate (B.Com / BBA / BA)</option><option>Undergraduate (B.Tech / BE)</option><option>Postgraduate (MBA / PGDM)</option><option>Postgraduate (M.Tech / ME)</option><option>PhD</option></select>{errors.qual && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
              </div>
            </div>

            <div className="card">
              <div className="card-head">Bank Account Details — Salary Disbursement</div>
              <div className="alert alert-info"><div className="alert-icon">🔒</div><div>Accessed only by the Finance team for payroll. Never shared externally.</div></div>
              <div className="field"><label>Account Holder Name <span className="req">*</span></label><input type="text" id="accName" value={vals.accName} onChange={handleValChange} placeholder="Exactly as on bank records" className={errors.accName ? 'invalid' : ''} />{errors.accName && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
              <div className="frow">
                <div className="field"><label>Bank Name <span className="req">*</span></label><input type="text" id="bankName" value={vals.bankName} onChange={handleValChange} placeholder="e.g. State Bank of India" className={errors.bankName ? 'invalid' : ''} />{errors.bankName && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                <div className="field"><label>Account Number <span className="req">*</span></label><input type="text" id="accNo" value={vals.accNo} onChange={handleValChange} placeholder="Account number" className={errors.accNo ? 'invalid' : ''} />{errors.accNo && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
              </div>
              <div className="frow">
                <div className="field"><label>IFSC Code <span className="req">*</span></label><input type="text" id="ifsc" value={vals.ifsc} onChange={handleValChange} placeholder="SBIN0001234" style={{textTransform:'uppercase'}} className={errors.ifsc ? 'invalid' : ''} />{errors.ifsc && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                <div className="field"><label>Branch Name <span className="opt">(optional)</span></label><input type="text" id="branch" value={vals.branch} onChange={handleValChange} placeholder="e.g. Lakshmipuram, Guntur" /></div>
              </div>
            </div>

            <div className="card">
              <div className="card-head">Professional References</div>
              <div className="alert alert-info"><div className="alert-icon">👥</div><div>Provide 2 references — academic or professional. They may be contacted by HR for verification.</div></div>
              <div style={{padding:'14px',background:'var(--off-white)',borderRadius:'var(--r-sm)',marginBottom:'14px'}}>
                <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--gray-400)',marginBottom:'12px'}}>Reference 1</div>
                <div className="frow">
                  <div className="field"><label>Full Name <span className="req">*</span></label><input type="text" id="ref1Name" value={vals.ref1Name} onChange={handleValChange} placeholder="Name" className={errors.ref1Name ? 'invalid' : ''}/>{errors.ref1Name && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                  <div className="field"><label>Designation <span className="req">*</span></label><input type="text" id="ref1Desg" value={vals.ref1Desg} onChange={handleValChange} placeholder="e.g. Professor / Manager" className={errors.ref1Desg ? 'invalid' : ''}/>{errors.ref1Desg && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                </div>
                <div className="frow">
                  <div className="field"><label>Organisation <span className="req">*</span></label><input type="text" id="ref1Org" value={vals.ref1Org} onChange={handleValChange} placeholder="Company / Institution" className={errors.ref1Org ? 'invalid' : ''}/>{errors.ref1Org && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                  <div className="field"><label>Contact <span className="req">*</span></label><input type="tel" id="ref1Contact" value={vals.ref1Contact} onChange={handleValChange} placeholder="Phone or email" className={errors.ref1Contact ? 'invalid' : ''}/>{errors.ref1Contact && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                </div>
              </div>
              <div style={{padding:'14px',background:'var(--off-white)',borderRadius:'var(--r-sm)'}}>
                <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--gray-400)',marginBottom:'12px'}}>Reference 2</div>
                <div className="frow">
                  <div className="field"><label>Full Name <span className="req">*</span></label><input type="text" id="ref2Name" value={vals.ref2Name} onChange={handleValChange} placeholder="Name" className={errors.ref2Name ? 'invalid' : ''}/>{errors.ref2Name && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                  <div className="field"><label>Designation <span className="req">*</span></label><input type="text" id="ref2Desg" value={vals.ref2Desg} onChange={handleValChange} placeholder="e.g. Director / HOD" className={errors.ref2Desg ? 'invalid' : ''}/>{errors.ref2Desg && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                </div>
                <div className="frow">
                  <div className="field"><label>Organisation <span className="req">*</span></label><input type="text" id="ref2Org" value={vals.ref2Org} onChange={handleValChange} placeholder="Company / Institution" className={errors.ref2Org ? 'invalid' : ''}/>{errors.ref2Org && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                  <div className="field"><label>Contact <span className="req">*</span></label><input type="tel" id="ref2Contact" value={vals.ref2Contact} onChange={handleValChange} placeholder="Phone or email" className={errors.ref2Contact ? 'invalid' : ''}/>{errors.ref2Contact && <div className="field-error" style={{display:'block'}}>Required.</div>}</div>
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(1)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(3)}>Continue → Documents</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="step active">
            <div className="step-eye">Step 3 of 7 — Documents</div>
            <div className="step-title">Upload Your Documents</div>
            <div className="step-sub">PDF, JPG, or PNG. Max 5MB per file. Salary processing begins only after all required documents are verified.</div>
<div className="alert alert-warn"><div className="alert-icon">⚠️</div><div>Ensure all uploads are legible. Blurry or incomplete documents will delay your joining process.</div></div>

<div className="card">
  <div className="card-head">Identity Documents</div>
  {[
    { id: 'aadhaar', label: 'Aadhaar Card (Front & Back) *', icon: '📄', hint: 'PDF, JPG, PNG — max 1MB', accept: '.pdf,.jpg,.jpeg,.png' },
    { id: 'pan', label: 'PAN Card *', icon: '🪪', hint: 'PDF, JPG, PNG — max 1MB', accept: '.pdf,.jpg,.jpeg,.png' },
    { id: 'photo', label: 'Passport-size Photograph *', icon: '🖼', hint: 'JPG or PNG — recent photo — max 1MB', accept: '.jpg,.jpeg,.png' }
  ].map(d => (
    <div className="field" key={d.id}>
      <label>{d.label}</label>
      <div className={`uzone ${files[d.id] ? 'done' : ''}`} onClick={() => triggerFile(`uf-${d.id}`)}>
        <input type="file" id={`uf-${d.id}`} accept={d.accept} onChange={(e) => handleFile(d.id, e)} style={{ display: 'none' }} />
        <div className="uzone-icon">{d.icon}</div>
        <div className="uzone-main">Click or drag to upload</div>
        <div className="uzone-hint">{d.hint}</div>
        {fileErrors[d.id] && (
          <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '8px' }}>
            ❌ {fileErrors[d.id]}
          </div>
        )}
        <div className="uzone-fname" style={{ display: files[d.id] ? 'block' : 'none' }}>✓ {files[d.id]?.name}</div>
      </div>
    </div>
  ))}
            </div>

            <div className="card">
              <div className="card-head">Academic Documents</div>
              {[
                { id: 'tenth', label: 'Class 10th Certificate / Marksheet *', icon: '📚', hint: 'SSC / CBSE / ICSE — PDF, JPG, PNG' },
                { id: 'twelfth', label: 'Class 12th Certificate / Marksheet *', icon: '📚', hint: 'Intermediate / HSC / CBSE — PDF, JPG, PNG' },
                { id: 'degree', label: 'Degree / Graduation Certificate *', icon: '🎓', hint: 'If pursuing, upload latest semester marksheet' }
              ].map(d => (
                <div className="field" key={d.id}>
                  <label>{d.label}</label>
                  <div className={`uzone ${files[d.id] ? 'done' : ''}`} onClick={() => triggerFile(`uf-${d.id}`)}>
                    <input type="file" id={`uf-${d.id}`} accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile(d.id, e)} style={{ display: 'none' }} />
                    <div className="uzone-icon">{d.icon}</div>
                    <div className="uzone-main">Click or drag to upload</div>
                    <div className="uzone-hint">{d.hint}</div>
                    {fileErrors[d.id] && (
          <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '8px' }}>
            ❌ {fileErrors[d.id]}
          </div>
        )}
                    <div className="uzone-fname" style={{ display: files[d.id] ? 'block' : 'none' }}>✓ {files[d.id]?.name}</div>
                  </div>
                </div>
              ))}
            </div>

            {empType === 'intern' && (
              <div className="card">
                <div className="card-head"><div className="adapt-lbl intern" style={{ marginBottom: 0 }}>🎓 Intern / Trainee — Additional</div></div>
                <div className="field">
                  <label>College Identity Card <span className="req">*</span></label>
                  <div className={`uzone ${files.collegeid ? 'done' : ''}`} onClick={() => triggerFile('uf-collegeid')}>
                    <input type="file" id="uf-collegeid" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile('collegeid', e)} style={{ display: 'none' }} />
                    <div className="uzone-icon">🏫</div>
                    <div className="uzone-main">Click or drag to upload</div>
                    <div className="uzone-hint">Current valid college ID</div>
                    <div className="uzone-fname" style={{ display: files.collegeid ? 'block' : 'none' }}>✓ {files.collegeid?.name}</div>
                  </div>
                </div>
                <div className="field">
                  <label>NOC / Permission Letter <span className="opt">(if required by institution)</span></label>
                  <div className={`uzone ${files.noc ? 'done' : ''}`} onClick={() => triggerFile('uf-noc')}>
                    <input type="file" id="uf-noc" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile('noc', e)} style={{ display: 'none' }} />
                    <div className="uzone-icon">📋</div>
                    <div className="uzone-main">Click or drag to upload</div>
                    <div className="uzone-hint">Required by many universities for off-campus internship</div>
                    
                    
                    <div className="uzone-fname" style={{ display: files.noc ? 'block' : 'none' }}>✓ {files.noc?.name}</div>
                    
                  </div>
                </div>
              </div>
            )}

            {empType === 'fulltime' && (
              <div className="card">
                <div className="card-head"><div className="adapt-lbl ft" style={{ marginBottom: 0 }}>💼 Full-Time — Additional</div></div>
                <div className="field">
                  <label>Relieving Letter <span className="opt">(if previously employed)</span></label>
                  <div className={`uzone ${files.relieve ? 'done' : ''}`} onClick={() => triggerFile('uf-relieve')}>
                    <input type="file" id="uf-relieve" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile('relieve', e)} style={{ display: 'none' }} />
                    <div className="uzone-icon">📄</div>
                    <div className="uzone-main">Click or drag to upload</div>
                    <div className="uzone-hint">From last employer — PDF, JPG, PNG</div>
                    {fileErrors.relieve && (
          <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '8px' }}>
            ❌ {fileErrors.relieve}
          </div>
        )}
                    <div className="uzone-fname" style={{ display: files.relieve ? 'block' : 'none' }}>✓ {files.relieve?.name}</div>
                  </div>
                </div>
                <div className="field">
                  <label>Last Salary Proof <span className="opt">(if previously employed)</span></label>
                  <div className={`uzone ${files.salary ? 'done' : ''}`} onClick={() => triggerFile('uf-salary')}>
                    <input type="file" id="uf-salary" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFile('salary', e)} style={{ display: 'none' }} />
                    <div className="uzone-icon">💰</div>
                    <div className="uzone-main">Click or drag to upload</div>
                    <div className="uzone-hint">Payslip or bank statement</div>
                    <div className="uzone-fname" style={{ display: files.salary ? 'block' : 'none' }}>✓ {files.salary?.name}</div>
                    {fileErrors.salary && (
          <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '8px' }}>
            ❌ {fileErrors.salary}
          </div>
        )}
                  </div>
                </div>
              </div>
            )}

            

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(2)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(4)}>Continue → Offer Letter</button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div className="step active">
            <div className="step-eye">Step 4 of 7 — Offer Letter</div>
            <div className="step-title">Review & Accept Your Offer Letter</div>
            <div className="step-sub">Read your offer letter carefully before accepting. This is a binding document.</div>

            <div className="card">
              <div className="card-head">Your Offer Letter</div>
              <div className={`doc-read-note ${scrolledOffer ? 'done' : ''}`}>
                {scrolledOffer ? '✓ You have read the full document' : '📖 Scroll to read the full offer letter before accepting'}
              </div>
              <div className="doc-scroll" onScroll={(e) => checkScroll(e, 'offer')}>
                <h4>Offer of Employment</h4>
                <p>Grofesion Innovations Private Limited<br />4th floor, icon spaces 5-98-57/5,<br />6th Lane, Brodipet, Guntur, AP 522002</p>
                <p>Dear <strong>{vals.firstName} {vals.lastName}</strong>,</p>
                <p>We are pleased to extend this offer of employment to you at <strong>Grofesion Innovations Private Limited</strong> for the position of <strong>{getRoleText()}</strong> in our <strong>{vals.division}</strong> division, based at <strong>{vals.office}</strong>, effective from <strong>{vals.doj}</strong>.</p>
                <h4>Terms of Employment</h4>
                <p><strong>Nature of Engagement:</strong> This offer is for a <span>{empType === 'intern' ? 'Internship / Trainee' : 'Full-Time Employment'}</span> engagement, subject to successful completion of the probation period and all joining formalities.</p>
                <p><strong>Probation Period:</strong> Your employment will commence with a probation period of two (2) months, during which your performance will be evaluated. Confirmation of employment is contingent on satisfactory performance as assessed by the Head of Operations and the Founder.</p>
                <p><strong>Working Hours:</strong> The standard working hours are 10:00 AM to 7 PM, Monday to Friday. You may be required to work beyond these hours based on operational requirements.</p>
                <p><strong>Confidentiality:</strong> You are required to maintain strict confidentiality of all company information, client data, proprietary frameworks, and business processes both during and for 24 months following your employment with us.</p>
                <p><strong>Non-Compete:</strong> During your employment and for a period of 24 months post separation, you shall not engage in any capacity with clients or competitors of the company.</p>
                <p><strong>Notice Period:</strong> One (1) calendar month notice is required from either party for separation, unless immediate termination clauses apply as described in the Employee Handbook.</p>
                <h4>Conditions of This Offer</h4>
                <p>This offer is conditional upon: (a) verification of all documents submitted during onboarding; (b) satisfactory reference checks; (c) execution of a Non-Disclosure Agreement; and (d) receipt of a signed copy of this offer letter.</p>
                <p>This letter does not constitute a contract of employment. Terms and conditions of employment are governed by the Grofesion Employee Handbook, which you will acknowledge separately.</p>
                <p>We look forward to having you as part of the Grofesion family. Please confirm your acceptance by checking the box below.</p>
                <p style={{ marginTop: '16px' }}><em>Warm regards,</em><br /><strong>Sandeep N</strong><br />Founder, Grofesion Innovations Private Limited</p>
              </div>
              <div className="field">
                <div className="cb-row" onClick={() => handleCbChange('offerCb')}>
                  <input type="checkbox" checked={checkboxes.offerCb} readOnly />
                  <div>
                    <div className="cb-row-text">I have read and understood the Offer Letter in its entirety and I accept all terms and conditions stated above.</div>
                    <div className="cb-row-sub">Date of acceptance: <span>{vals.signDate}</span></div>
                  </div>
                </div>
                {errors.offerCb && <div className="field-error" style={{ display: 'block' }}>Please read and accept the offer letter to continue.</div>}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(3)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(5)}>Continue → NDA</button>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {currentStep === 5 && (
          <div className="step active">
            <div className="step-eye">Step 5 of 7 Non-Disclosure Agreement</div>
            <div className="step-title">Non-Disclosure Agreement</div>
            <div className="step-sub">This NDA protects both Grofesion and you. Read it fully before signing.</div>

            <div className="card">
              <div className="card-head">Confidentiality & Non-Disclosure Agreement</div>
              <div className={`doc-read-note ${scrolledNDA ? 'done' : ''}`}>
                {scrolledNDA ? '✓ You have read the full document' : '📖 Scroll to read the full NDA before signing'}
              </div>
              <div className="doc-scroll" onScroll={(e) => checkScroll(e, 'nda')}>
                <h4>Non-Disclosure Agreement</h4>
                <p>This Non-Disclosure Agreement ("Agreement") is entered into between <strong>Grofesion Innovations Private Limited</strong> ("Company") and <strong>{vals.firstName} {vals.lastName}</strong> ("Recipient"), effective from the date of joining.</p>
                <h4>1. Definition of Confidential Information</h4>
                <p>"Confidential Information" means any non-public information disclosed by the Company to the Recipient in any form, including but not limited to: client identities and data, brand strategies, positioning frameworks, pricing structures, financial information, business plans, proprietary methodologies, internal processes, employee information, and any other information designated as confidential.</p>
                <h4>2. Obligations of the Recipient</h4>
                <p>The Recipient agrees to: (a) hold all Confidential Information in strict confidence; (b) not disclose Confidential Information to any third party without prior written consent of the Company; (c) use Confidential Information solely for the purpose of performing their duties at the Company; (d) take all reasonable measures to protect the secrecy and confidentiality of all Confidential Information.</p>
                <h4>3. Duration</h4>
                <p>This Agreement shall remain in effect during the term of employment and for a period of <strong>twelve (12) months</strong> following the termination of employment for any reason.</p>
                <h4>4. Return of Information</h4>
                <p>Upon termination of employment or upon request by the Company, the Recipient shall immediately return or destroy all Confidential Information in their possession, including all copies, notes, and summaries.</p>
                <h4>5. Intellectual Property</h4>
                <p>All work product, frameworks, strategies, content, designs, and intellectual property created by the Recipient during the course of employment shall be the exclusive property of Grofesion Innovations Private Limited. The Recipient hereby assigns all rights, title, and interest in such work product to the Company.</p>
                <h4>6. Non-Solicitation</h4>
                <p>During employment and for 24 months post separation, the Recipient shall not directly or indirectly solicit, recruit, or engage any employee, client, or vendor of the Company for personal or competitive business purposes.</p>
                <h4>7. Remedies</h4>
                <p>The Recipient acknowledges that breach of this Agreement would cause irreparable harm to the Company, and that monetary damages may be insufficient. The Company shall be entitled to seek injunctive relief and any other remedies available under applicable law, including the Indian Contract Act 1872.</p>
                <h4>8. Governing Law</h4>
                <p>This Agreement shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Guntur, Andhra Pradesh.</p>
              </div>
              <div className="field" style={{ marginTop: '14px' }}>
                <div className="cb-row" onClick={() => handleCbChange('ndaCb')}>
                  <input type="checkbox" checked={checkboxes.ndaCb} readOnly />
                  <div>
                    <div className="cb-row-text">I have read, understood, and agree to be bound by all terms of this Non-Disclosure Agreement.</div>
                    <div className="cb-row-sub">This constitutes a legally binding digital signature under the Information Technology Act, 2000.</div>
                  </div>
                </div>
                {errors.ndaCb && <div className="field-error" style={{ display: 'block' }}>Please read and accept the NDA to continue.</div>}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(4)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(6)}>Continue → Handbook</button>
            </div>
          </div>
        )}

        {/* STEP 6 */}
        {currentStep === 6 && (
          <div className="step active">
            <div className="step-eye">Step 6 of 7 Handbook</div>
            <div className="step-title">Employee Handbook</div>
            <div className="step-sub">Read each section. All sections marked <strong>Required</strong> must be acknowledged before the final step.</div>

            <div className="alert alert-warn"><div className="alert-icon">⚠️</div><div>No client work in the first 3 days. Use this time to fully absorb the handbook and prepare for your shadowing period.</div></div>

            <div className="hb-progress">
              Required sections read: <span className="hb-count">{reqHb.filter(id => readItems.has(id)).length} / {reqHb.length}</span>
            </div>

            <div id="hbItems">
              {hbSections.map(s => (
                <div className="hb-item" key={s.id}>
                  <div className="hb-hdr" onClick={() => setOpenHb(openHb === s.id ? null : s.id)}>
                    <div className="hb-left">
                      <div className={`hb-num ${readItems.has(s.id) ? 'read' : ''}`}>{readItems.has(s.id) ? '✓' : s.id}</div>
                      <div className="hb-title">{s.title}</div>
                    </div>
                    <div className="hb-right">
                      <span className={`hb-badge ${readItems.has(s.id) ? 'done' : s.req ? 'req' : 'opt'}`}>
                        {readItems.has(s.id) ? 'Done' : s.req ? 'Required' : 'Read'}
                      </span>
                      <span className="hb-chev" style={{ transform: openHb === s.id ? 'rotate(180deg)' : '' }}>▼</span>
                    </div>
                  </div>
                  <div className={`hb-body ${openHb === s.id ? 'open' : ''}`}>
                    {s.html}
                    <button 
                      className={`btn-mark ${readItems.has(s.id) ? 'done' : ''}`} 
                      onClick={() => markRead(s.id)}
                      disabled={readItems.has(s.id)}
                    >
                      {readItems.has(s.id) ? '✓ Marked as Read' : 'Mark as Read'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {showHbWarn && (
              <div className="alert alert-warn" style={{ marginTop: '16px' }}><div className="alert-icon">⚠️</div><div>Please mark all <strong>Required</strong> sections as read before continuing.</div></div>
            )}

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(5)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(7)}>Continue → Sign & Submit</button>
            </div>
          </div>
        )}

        {/* STEP 7 */}
        {currentStep === 7 && (
          <div className="step active">
            <div className="step-eye">Step 7 of 7 Declaration</div>
            <div className="step-title">Sign & Submit Your Onboarding</div>
            <div className="step-sub">Review your summary, sign the declaration, and submit to complete your onboarding.</div>

            <div className="card">
              <div className="card-head">Onboarding Summary</div>
              <div className="sum-grid">
                {[
                  { label: 'Full Name', value: `${vals.firstName} ${vals.lastName}` },
                  { label: 'Role', value: getRoleText() },
                  { label: 'Division', value: vals.division },
                  { label: 'Joining Date', value: vals.doj },
                  { label: 'Office', value: vals.office },
                  { label: 'Email', value: vals.email },
                  { label: 'Mobile', value: vals.mobile },
                  { label: 'Employee Type', value: empType === 'intern' ? 'Intern / Trainee' : empType === 'fulltime' ? 'Full-Time' : '—' }
                ].map(item => (
                  <div className="sum-chip" key={item.label}>
                    <div className="sum-lbl">{item.label}</div>
                    <div className="sum-val">{item.value || '—'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-head">Final Declaration & Acknowledgement</div>
              <div className="decl">I, <strong>{vals.firstName} {vals.lastName}</strong>, hereby declare that all information provided during this onboarding process is accurate and true to the best of my knowledge. I acknowledge receipt of and agreement to: (1) the Offer Letter; (2) the Non-Disclosure Agreement; and (3) the Grofesion Employee Handbook. I understand that misrepresentation of any information may result in immediate termination. I accept all terms and conditions of my employment with <strong>Grofesion Innovations Private Limited</strong>.</div>
              <div className="field">
                <label>Digital Signature — Type your full legal name <span className="req">*</span></label>
                <div className="sig-wrap"><input className="sig-input" type="text" id="signature" value={vals.signature} onChange={handleValChange} placeholder="Type your full name to sign" /></div>
                <div className="field-hint">This digital signature is valid under the Information Technology Act, 2000 (India).</div>
                {errors.signature && <div className="field-error" style={{ display: 'block' }}>Please type your full name to sign.</div>}
              </div>
              <div className="field"><label>Date of Signing</label><input type="text" value={vals.signDate} readOnly style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', cursor: 'default' }} /></div>
              <div className="field" style={{ marginTop: '16px' }}>
                <div className="cb-row" onClick={() => handleCbChange('finalCb')}>
                  <input type="checkbox" checked={checkboxes.finalCb} readOnly />
                  <div>
                    <div className="cb-row-text">I confirm all information is accurate, I have read and accepted the Offer Letter and NDA, and I agree to all policies in the Employee Handbook.</div>
                    <div className="cb-row-sub">By submitting, you authorise Grofesion to process your data for employment purposes.</div>
                  </div>
                </div>
                {errors.finalCb && <div className="field-error" style={{ display: 'block' }}>Please check this box to submit.</div>}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(6)}>← Back</button>
              <button className="btn-submit" onClick={submitOnboarding} disabled={isSubmitting}>Submit Onboarding →</button>
            </div>
          </div>
        )}

        {/* DONE / SUCCESS */}
        {currentStep === 'done' && (
          <div className="step active">
            <div className="success-wrap">
              {/* <div style={{ marginBottom: '28px' }}>
                <svg width="180" height="44" viewBox="0 0 180 44" fill="none">
                  <text x="0" y="36" fontFamily="Outfit,sans-serif" fontWeight="800" fontSize="26" fill="#E8510A">G</text>
                  <text x="26" y="36" fontFamily="Outfit,sans-serif" fontWeight="800" fontSize="26" fill="#0F0F0F">ROFESION</text>
                  <text x="170" y="14" fontFamily="Outfit,sans-serif" fontWeight="500" fontSize="11" fill="#A09D95">™</text>
                </svg>
              </div> */}
              <div className="s-check">
                <svg viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7 13-13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="s-title">You're officially in,<br /><span style={{ fontStyle: 'italic', color: 'var(--orange)' }}>{vals.firstName}</span>.</div>
              <div className="s-body">Your onboarding is complete. A personalised welcome email has been sent to your inbox and HR has been notified. You will receive your Day 1 brief within 24 hours.</div>
              <div className="s-checks">
                <div className="sck"><div className="sck-dot">✓</div><span>Personal & bank details received</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>All documents uploaded</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>Offer letter accepted</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>NDA signed</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>Handbook acknowledged</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>HR notified ceo@grofession.com & hr@magsmen.com</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>Welcome email sent to your inbox</span></div>
              </div>
              <button className="btn-pdf" onClick={downloadPDF}>⬇ Download Onboarding Summary PDF</button>
              
              <div className="ns-box" style={{ marginTop: '24px' }}>
                <div className="ns-title">What happens next</div>
                <div className="ns-item"><div className="ns-num">1</div><span><strong>Day 1–3:</strong> Reading period. Full handbook review. No client work.</span></div>
                <div className="ns-item"><div className="ns-num">2</div><span><strong>Day 3–7:</strong> Shadowing period with a senior team member.</span></div>
                <div className="ns-item"><div className="ns-num">3</div><span><strong>Week 2–4:</strong> Supervised work with daily written feedback.</span></div>
                <div className="ns-item"><div className="ns-num">4</div><span><strong>Day 30:</strong> First performance check-in with Head of Operations.</span></div>
                <div className="ns-item"><div className="ns-num">5</div><span><strong>Day 90:</strong> Probation review formal assessment against role success criteria.</span></div>
              </div>
              <div style={{ marginTop: '24px', fontSize: '12px', color: 'var(--gray-400)' }}>Questions? <strong style={{ color: 'var(--black)' }}>hr@magsmen.com</strong> · <strong style={{ color: 'var(--black)' }}>+91 90449 10449</strong></div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

const cssStyles = `
:root {
  --orange:      #E8510A;
  --orange-d:    #C44208;
  --orange-l:    #FDF0EA;
  --orange-mid:  #F47340;
  --black:       #0F0F0F;
  --charcoal:    #1C1C1C;
  --white:       #FFFFFF;
  --off-white:   #FAF9F7;
  --gray-100:    #F3F1ED;
  --gray-200:    #E5E2DA;
  --gray-400:    #A09D95;
  --gray-600:    #5C5A55;
  --success:     #176B44;
  --success-bg:  #E8F7F0;
  --info:        #1A4D7A;
  --info-bg:     #EBF3FC;
  --warn-bg:     #FFF4EE;
  --warn-border: #FDDBC9;
  --warn-text:   #7A3010;
  --r:           10px;
  --r-sm:        6px;
  --shadow:      0 1px 3px rgba(0,0,0,.07),0 4px 12px rgba(0,0,0,.04);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:var(--off-white);color:var(--black);font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased}

/* NAV */
.topnav{background:var(--white);border-bottom:1px solid var(--gray-200);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.nav-logo{display:flex;align-items:center;gap:14px}
.nav-div{width:1px;height:28px;background:var(--gray-200)}
.nav-lbl{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-400)}
.nav-pill{background:var(--gray-100);border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;color:var(--gray-600)}

/* PROGRESS */
.prog-wrap{background:var(--white);border-bottom:1px solid var(--gray-200);padding:12px 24px}
.prog-steps{max-width:660px;margin:0 auto;display:flex;align-items:center}
.ps{display:flex;align-items:center;gap:6px;flex:1;position:relative}
.ps:not(:last-child)::after{content:'';position:absolute;left:34px;right:0;top:14px;height:2px;background:var(--gray-200);z-index:0}
.ps.done:not(:last-child)::after{background:var(--orange)}
.ps-dot{width:28px;height:28px;border-radius:50%;border:2px solid var(--gray-200);background:var(--white);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gray-400);flex-shrink:0;position:relative;z-index:1;transition:all .3s}
.ps.active .ps-dot{border-color:var(--orange);background:var(--orange);color:var(--white)}
.ps.done .ps-dot{border-color:var(--orange);background:var(--orange);color:var(--white)}
.ps-lbl{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--gray-400);white-space:nowrap;display:none}
.ps.active .ps-lbl{color:var(--orange);display:block}
.ps.done .ps-lbl{color:var(--black);display:block}
@media(max-width:560px){.ps-lbl{display:none!important}}

/* SHELL */
.shell{max-width:660px;margin:0 auto;padding:32px 20px 80px}

/* STEPS */
.step{display:none}
.step.active{display:block;animation:fadeUp .3s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* HERO */
.hero{background:var(--charcoal);border-radius:var(--r);padding:36px 32px;margin-bottom:24px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-80px;right:-80px;width:260px;height:260px;background:var(--orange);opacity:.07;border-radius:50%;pointer-events:none}
.hero::after{content:'';position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;background:var(--orange-mid);opacity:.05;border-radius:50%;pointer-events:none}
.hero-eye{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--orange-mid);margin-bottom:10px}
.hero-title{font-family:'Playfair Display',serif;font-size:30px;line-height:1.2;color:var(--white);margin-bottom:12px}
.hero-name{color:var(--orange-mid);font-style:italic}
.hero-body{font-size:13px;color:rgba(255,255,255,.55);line-height:1.7;max-width:460px;margin-bottom:24px}
.hero-meta{display:flex;gap:20px;flex-wrap:wrap;padding-top:20px;border-top:1px solid rgba(255,255,255,.08)}
.hm-item{display:flex;flex-direction:column;gap:3px}
.hm-lbl{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3)}
.hm-val{font-size:12px;font-weight:500;color:rgba(255,255,255,.75)}

/* STEP HEADER */
.step-eye{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);margin-bottom:4px}
.step-title{font-family:'Playfair Display',serif;font-size:24px;color:var(--black);margin-bottom:4px;line-height:1.25}
.step-sub{font-size:13px;color:var(--gray-600);margin-bottom:24px;line-height:1.6}

/* CARD */
.card{background:var(--white);border:1px solid var(--gray-200);border-radius:var(--r);padding:22px 24px;margin-bottom:14px;box-shadow:var(--shadow)}
.card-head{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gray-400);margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid var(--gray-100)}

/* FORM */
.field{margin-bottom:16px}
.field:last-child{margin-bottom:0}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:500px){.frow{grid-template-columns:1fr}}
label{display:block;font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--gray-600);margin-bottom:6px}
label .req{color:var(--orange);margin-left:2px}
label .opt{font-size:9px;font-weight:500;color:var(--gray-400);letter-spacing:.04em;text-transform:none;margin-left:4px}
input[type=text],input[type=email],input[type=tel],input[type=date],input[type=url],select,textarea{width:100%;padding:10px 13px;border:1.5px solid var(--gray-200);border-radius:var(--r-sm);font-family:'Outfit',sans-serif;font-size:14px;font-weight:400;color:var(--black);background:var(--white);outline:none;transition:border-color .18s;-webkit-appearance:none}
input:focus,select:focus,textarea:focus{border-color:var(--black)}
input::placeholder,textarea::placeholder{color:var(--gray-400);font-weight:300}
input.invalid,select.invalid,textarea.invalid{border-color:#D94B2B}
textarea{resize:vertical;min-height:88px;line-height:1.6}
select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A09D95' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:34px;cursor:pointer}
.field-error{font-size:11px;color:#C0391B;margin-top:5px;font-weight:500;display:none}
.field-hint{font-size:11px;color:var(--gray-400);margin-top:4px;line-height:1.5}
.char-count{font-size:10px;color:var(--gray-400);text-align:right;margin-top:4px}
.char-count.warn{color:var(--orange)}

/* ALERTS */
.alert{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:var(--r-sm);font-size:13px;line-height:1.6;margin-bottom:16px}
.alert-icon{flex-shrink:0;font-size:14px;margin-top:1px}
.alert-warn{background:var(--warn-bg);border:1px solid var(--warn-border);color:var(--warn-text)}
.alert-info{background:var(--info-bg);border:1px solid #C5DEFA;color:var(--info)}
.alert-success{background:var(--success-bg);border:1px solid #B3E4CF;color:var(--success)}

/* UPLOAD */
.uzone{border:1.5px dashed var(--gray-200);border-radius:var(--r-sm);padding:18px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;position:relative;background:var(--off-white)}
.uzone:hover{border-color:var(--orange);background:var(--orange-l)}
.uzone.done{border-color:var(--success);background:var(--success-bg);border-style:solid}
.uzone-icon{width:36px;height:36px;background:var(--gray-100);border-radius:8px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;font-size:16px}
.uzone.done .uzone-icon{background:var(--success-bg)}
.uzone-main{font-size:13px;font-weight:500;color:var(--black)}
.uzone-hint{font-size:11px;color:var(--gray-400);margin-top:2px}
.uzone-fname{font-size:12px;font-weight:600;color:var(--success);margin-top:6px;}
.uzone.done .uzone-main,.uzone.done .uzone-hint{display:none}

/* DOCUMENT VIEWER */
.doc-scroll{background:var(--gray-100);border:1px solid var(--gray-200);border-radius:var(--r-sm);padding:20px;max-height:260px;overflow-y:auto;font-size:13px;color:var(--gray-600);line-height:1.75;margin-bottom:14px}
.doc-scroll::-webkit-scrollbar{width:4px}
.doc-scroll::-webkit-scrollbar-track{background:transparent}
.doc-scroll::-webkit-scrollbar-thumb{background:var(--gray-200);border-radius:2px}
.doc-scroll h4{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--black);margin-bottom:8px;margin-top:14px}
.doc-scroll h4:first-child{margin-top:0}
.doc-scroll p{margin-bottom:8px}
.doc-scroll ul{padding-left:18px;margin-bottom:8px}
.doc-scroll li{margin-bottom:4px}
.doc-read-note{font-size:11px;color:var(--gray-400);display:flex;align-items:center;gap:6px;margin-bottom:12px}
.doc-read-note.done{color:var(--success);font-weight:500}

/* HANDBOOK */
.hb-item{border:1px solid var(--gray-200);border-radius:var(--r-sm);margin-bottom:8px;overflow:hidden;background:var(--white)}
.hb-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;cursor:pointer;user-select:none;transition:background .15s;gap:12px}
.hb-hdr:hover{background:var(--off-white)}
.hb-left{display:flex;align-items:center;gap:12px;flex:1;min-width:0}
.hb-num{width:28px;height:28px;border-radius:50%;background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gray-600);flex-shrink:0;transition:all .2s}
.hb-num.read{background:var(--black);color:var(--white)}
.hb-title{font-size:13px;font-weight:500;color:var(--black);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hb-right{display:flex;align-items:center;gap:8px;flex-shrink:0}
.hb-badge{font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:4px;white-space:nowrap}
.hb-badge.req{background:var(--orange-l);color:var(--orange)}
.hb-badge.done{background:var(--success-bg);color:var(--success)}
.hb-badge.opt{background:var(--gray-100);color:var(--gray-600)}
.hb-chev{color:var(--gray-400);font-size:11px;transition:transform .2s}
.hb-body{display:none;padding:16px 18px 18px;border-top:1px solid var(--gray-100);background:var(--white)}
.hb-body.open{display:block}
.hb-body p{font-size:13px;color:var(--gray-600);line-height:1.75;margin-bottom:10px}
.hb-body ul{padding-left:18px;margin-bottom:10px}
.hb-body li{font-size:13px;color:var(--gray-600);line-height:1.75;margin-bottom:3px}
.hb-body strong{color:var(--black);font-weight:600}
.btn-mark{margin-top:14px;padding:8px 18px;background:var(--black);color:var(--white);border:none;border-radius:var(--r-sm);font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;cursor:pointer;letter-spacing:.04em;transition:background .15s}
.btn-mark:hover{background:#333}
.btn-mark.done{background:var(--success);cursor:default}
.hb-progress{font-size:12px;color:var(--gray-600);margin-bottom:14px;display:flex;align-items:center;gap:6px}
.hb-count{font-weight:700;color:var(--orange)}

/* DECLARATION */
.decl{background:var(--gray-100);border:1px solid var(--gray-200);border-radius:var(--r-sm);padding:16px 18px;font-size:13px;color:var(--gray-600);line-height:1.75;margin-bottom:18px}
.decl strong{color:var(--black)}
.sig-wrap{border:1.5px solid var(--gray-200);border-radius:var(--r-sm);background:var(--white);display:flex;align-items:center;justify-content:center;padding:8px 16px;transition:border-color .2s}
.sig-wrap:focus-within{border-color:var(--black)}
.sig-input{font-family:'Playfair Display',serif;font-style:italic;font-size:28px;color:var(--black);border:none;outline:none;background:transparent;width:100%;text-align:center;padding:10px 4px}

/* SUMMARY */
.sum-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:4px}
.sum-chip{background:var(--off-white);border:1px solid var(--gray-200);border-radius:var(--r-sm);padding:10px 12px}
.sum-lbl{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gray-400);margin-bottom:3px}
.sum-val{font-size:13px;font-weight:500;color:var(--black)}

/* BUTTONS */
.btn-row{display:flex;gap:10px;margin-top:28px;flex-wrap:wrap}
.btn-primary{flex:1;min-width:160px;padding:13px 24px;background:var(--black);color:var(--white);border:none;border-radius:var(--r-sm);font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;cursor:pointer;letter-spacing:.02em;transition:background .15s,transform .1s}
.btn-primary:hover{background:#2a2a2a}
.btn-primary:active{transform:scale(.98)}
.btn-secondary{padding:13px 20px;background:var(--white);color:var(--black);border:1.5px solid var(--gray-200);border-radius:var(--r-sm);font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:border-color .15s}
.btn-secondary:hover{border-color:var(--black)}
.btn-submit{flex:1;min-width:160px;padding:13px 24px;background:var(--orange);color:var(--white);border:none;border-radius:var(--r-sm);font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:.02em;transition:background .15s,opacity .15s}
.btn-submit:hover{background:var(--orange-d)}
.btn-submit:disabled{opacity:.6;cursor:not-allowed}

/* SENDING OVERLAY */
.sending-overlay{position:fixed;inset:0;background:rgba(15,15,15,.75);z-index:999;display:none;flex-direction:column;align-items:center;justify-content:center;gap:16px}
.sending-overlay.show{display:flex}
.sending-spinner{width:48px;height:48px;border:3px solid rgba(255,255,255,.2);border-top-color:var(--orange);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.sending-text{font-size:15px;font-weight:500;color:var(--white)}
.sending-sub{font-size:12px;color:rgba(255,255,255,.5)}

/* SUCCESS */
.success-wrap{text-align:center;padding:40px 12px 60px}
.s-check{width:72px;height:72px;background:var(--black);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px}
.s-check svg{width:32px;height:32px}
.s-title{font-family:'Playfair Display',serif;font-size:28px;line-height:1.2;color:var(--black);margin-bottom:10px}
.s-body{font-size:14px;color:var(--gray-600);max-width:420px;margin:0 auto 28px;line-height:1.7}
.s-checks{display:flex;flex-direction:column;gap:8px;text-align:left;max-width:400px;margin:0 auto 28px}
.sck{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--black)}
.sck-dot{width:22px;height:22px;background:var(--success-bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--success);flex-shrink:0}
.ns-box{background:var(--gray-100);border-radius:var(--r);padding:20px 24px;max-width:460px;margin:0 auto 24px;text-align:left}
.ns-title{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gray-400);margin-bottom:14px}
.ns-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;font-size:13px;color:var(--gray-600);line-height:1.6}
.ns-num{width:22px;height:22px;background:var(--black);color:var(--white);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0;margin-top:1px}
.btn-pdf{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:var(--orange);color:var(--white);border:none;border-radius:var(--r-sm);font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;cursor:pointer;margin-top:8px;transition:background .15s}
.btn-pdf:hover{background:var(--orange-d)}

/* CHECKBOX ROW */
.cb-row{display:flex;align-items:flex-start;gap:12px;padding:14px;border:1.5px solid var(--gray-200);border-radius:var(--r-sm);cursor:pointer;transition:border-color .15s}
.cb-row:hover{border-color:var(--black)}
.cb-row input{width:16px;height:16px;margin-top:2px;flex-shrink:0;accent-color:var(--black);cursor:pointer}
.cb-row-text{font-size:13px;font-weight:500;color:var(--black);line-height:1.5}
.cb-row-sub{font-size:11px;color:var(--gray-400);margin-top:3px}

/* ADAPTIVE LABELS */
.adapt-lbl{display:flex;align-items:center;gap:8px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:8px 12px;border-radius:var(--r-sm);margin-bottom:14px}
.adapt-lbl.intern{background:var(--info-bg);color:var(--info)}
.adapt-lbl.ft{background:var(--success-bg);color:var(--success)}
`;






