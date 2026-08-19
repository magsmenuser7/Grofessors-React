import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

// ── HANDOVER CHECKLIST DATA ──
const handoverItems = [
  { id: 'h1', title: 'Ongoing Projects & Client Accounts', req: true, desc: 'Document the current status of every active project or client account you own, including open items, deadlines, and key contacts.' },
  { id: 'h2', title: 'Knowledge Transfer Sessions', req: true, desc: 'Complete at least one KT session with your manager or replacement covering your day-to-day responsibilities and any tribal knowledge.' },
  { id: 'h3', title: 'Access & Login Credentials Shared', req: true, desc: 'Share passwords, shared drive locations, and tool access lists with your manager through the approved handover sheet — never over chat.' },
  { id: 'h4', title: 'Pending Tasks Status Report', req: true, desc: 'Submit a written summary of anything left incomplete, with a recommended owner and priority for each item.' },
  { id: 'h5', title: 'Team & Client Introductions', req: false, desc: 'Introduce your backup point of contact to internal teams and, where applicable, external clients before your last working day.' },
];
const reqHandover = handoverItems.filter(h => h.req).map(h => h.id);

// ── ASSET RETURN DATA ──
const assetItems = [
  { id: 'laptop', label: 'Company Laptop & Charger', icon: '💻', hint: 'Reset to factory settings before submission if instructed by IT' },
  { id: 'idcard', label: 'Employee ID Card', icon: '🪪', hint: 'Physical access card issued at joining' },
  { id: 'accesscard', label: 'Office Access / Biometric Card', icon: '🔑', hint: 'Building or floor access card, if separate from ID' },
  { id: 'sim', label: 'Company SIM / Mobile Device', icon: '📱', hint: 'If issued for official use' },
  { id: 'other', label: 'Other Company Property', icon: '📦', hint: 'Chargers, peripherals, marketing collateral, branded merchandise' },
];

// ── CLEARANCE / NO-DUES DATA ──
const clearanceItems = [
  { id: 'itClr', dept: 'IT Department', desc: 'I confirm all company devices, software licenses, and system access will be returned or have already been surrendered.' },
  { id: 'financeClr', dept: 'Finance & Admin', desc: 'I confirm there are no pending reimbursements, advances, or expense claims outstanding in my name.' },
  { id: 'hrClr', dept: 'Human Resources', desc: 'I confirm I have no pending leave discrepancies and have reviewed my final settlement terms with HR.' },
  { id: 'mgrClr', dept: 'Reporting Manager', desc: 'I confirm my reporting manager has acknowledged and signed off on my handover documentation.' },
];

// ── EXIT INTERVIEW RATING FIELDS ──
const ratingFields = [
  { id: 'rWorkCulture', label: 'Work Culture & Environment' },
  { id: 'rGrowth', label: 'Growth & Learning Opportunities' },
  { id: 'rManager', label: 'Manager Support' },
  { id: 'rCompensation', label: 'Compensation & Benefits' },
];

const reasonOptions = [
  'Higher Studies', 'Better Opportunity', 'Career Growth', 'Relocation',
  'Compensation', 'Work-Life Balance', 'Health / Personal Reasons', 'Other'
];

export default function EmployeeExitPortal() {
  // ── STATE ──
  const [currentStep, setCurrentStep] = useState<number | 'done'>(1);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [showHandoverWarn, setShowHandoverWarn] = useState(false);
  const [showAssetWarn, setShowAssetWarn] = useState(false);
  const [showClearanceWarn, setShowClearanceWarn] = useState(false);
  const [openHandover, setOpenHandover] = useState<string | null>(null);

  const [vals, setVals] = useState<Record<string, string>>({
    firstName: "", lastName: "", email: "", employeeId: "", department: "",
    designation: "", manager: "", lastWorkingDay: "", noticePeriod: "",
    reason: "", reasonDetail: "", likeMost: "", improve: "",
    signature: "", signDate: new Date().toLocaleDateString('en-IN')
  });

  const [readHandover, setReadHandover] = useState<Set<string>>(new Set());
  const [assetsReturned, setAssetsReturned] = useState<Record<string, boolean>>({});
  const [clearanceCb, setClearanceCb] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [recommend, setRecommend] = useState<string>('');
  const [rejoin, setRejoin] = useState<string>('');
  const [finalCb, setFinalCb] = useState(false);

  // ── HANDLERS ──
  const handleValChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setVals(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: false }));
  };

  const markHandoverRead = (id: string) => {
    setReadHandover(prev => new Set(prev).add(id));
  };

  const toggleAsset = (id: string) => {
    setAssetsReturned(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleClearance = (id: string) => {
    setClearanceCb(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setRating = (fieldId: string, star: number) => {
    setRatings(prev => ({ ...prev, [fieldId]: star }));
  };

  // ── VALIDATION ──
  const validate = (step: number) => {
    let newErrors: Record<string, boolean> = {};
    let ok = true;

    if (step === 1) {
      const req = ['firstName', 'lastName', 'email', 'employeeId', 'department', 'designation', 'manager', 'lastWorkingDay', 'noticePeriod', 'reason'];
      req.forEach(f => { if (!vals[f]) { newErrors[f] = true; ok = false; } });
    }
    if (step === 2) {
      const missing = reqHandover.filter(id => !readHandover.has(id));
      if (missing.length) { setShowHandoverWarn(true); ok = false; }
    }
    if (step === 3) {
      const missing = assetItems.filter(a => !assetsReturned[a.id]);
      if (missing.length) { setShowAssetWarn(true); ok = false; }
    }
    if (step === 4) {
      const missing = clearanceItems.filter(c => !clearanceCb[c.id]);
      if (missing.length) { setShowClearanceWarn(true); ok = false; }
    }
    if (step === 5) {
      const missingRating = ratingFields.some(r => !ratings[r.id]);
      if (missingRating) ok = false;
      if (vals.likeMost.length < 20) { newErrors.likeMost = true; ok = false; }
      if (vals.improve.length < 20) { newErrors.improve = true; ok = false; }
      if (!recommend) ok = false;
      if (!rejoin) ok = false;
    }
    if (step === 6) {
      if (!vals.signature) { newErrors.signature = true; ok = false; }
      if (!finalCb) { newErrors.finalCb = true; ok = false; }
    }

    setErrors(newErrors);
    if (!ok) window.scrollTo({ top: 100, behavior: 'smooth' });
    return ok;
  };

  const goTo = (target: number) => {
    if (target > (currentStep as number) && !validate(currentStep as number)) return;
    setShowHandoverWarn(false);
    setShowAssetWarn(false);
    setShowClearanceWarn(false);
    setCurrentStep(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── PDF & SUBMIT ──
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Grofesion Exit Summary", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${vals.firstName} ${vals.lastName}`, 20, 40);
    doc.text(`Employee ID: ${vals.employeeId}`, 20, 50);
    doc.text(`Department: ${vals.department}`, 20, 60);
    doc.text(`Last Working Day: ${vals.lastWorkingDay}`, 20, 70);
    doc.text(`Signed: ${vals.signature} on ${vals.signDate}`, 20, 80);
    doc.save(`Exit_Summary_${vals.firstName}.pdf`);
  };

  const submitExit = async () => {
    if (!validate(6)) return;

    setIsSubmitting(true);
    setSubmitStatus("Submitting your exit request...");

    try {
      const formData = new FormData();
      Object.keys(vals).forEach(k => formData.append(k, vals[k]));
      formData.append("handover_items", Array.from(readHandover).join(","));
      formData.append("assets_returned", JSON.stringify(assetsReturned));
      formData.append("clearance", JSON.stringify(clearanceCb));
      formData.append("ratings", JSON.stringify(ratings));
      formData.append("recommend", recommend);
      formData.append("rejoin", rejoin);

      const response = await fetch(
        "https://api.mibbs.ai/api/submit-exit/",
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Submission failed");
        setSubmitStatus("Error");
        return;
      }

      setSubmitStatus("Success!");
      setTimeout(() => setCurrentStep('done'), 1000);

    } catch (err) {
      setSubmitStatus("Connection failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{cssStyles}</style>

      {isSubmitting && (
        <div className="sending-overlay show">
          <div className="sending-spinner"></div>
          <div className="sending-text">Submitting your exit request…</div>
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
          <div className="nav-lbl">Employee Exit Portal</div>
        </div>
        <div className="nav-pill">
          {currentStep === 'done' ? 'Complete ✓' : `Step ${currentStep} of 6`}
        </div>
      </nav>

      {/* PROGRESS */}
      {currentStep !== 'done' && (
        <div className="prog-wrap">
          <div className="prog-steps">
            {[1, 2, 3, 4, 5, 6].map(s => (
              <div key={s} className={`ps ${currentStep === s ? 'active' : (currentStep as number) > s ? 'done' : ''}`}>
                <div className="ps-dot">{(currentStep as number) > s ? '✓' : s}</div>
                <div className="ps-lbl">{['Resignation', 'Handover', 'Assets', 'Clearance', 'Exit Interview', 'Sign & Submit'][s - 1]}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="shell">

        {/* STEP 1 — RESIGNATION DETAILS */}
        {currentStep === 1 && (
          <div className="step active">
            <div className="hero">
              <div className="hero-eye">Employee Exit</div>
              <div className="hero-title">Goodbye is never easy,<br /><span className="hero-name">{vals.firstName || 'friend'}</span>. Let's make it smooth.</div>
              <div className="hero-body">This portal walks you through handover, asset return, department clearance, and your exit interview. Takes about 15 minutes — please complete all steps before your last working day.</div>
              <div className="hero-meta">
                <div className="hm-item"><div className="hm-lbl">Entity</div><div className="hm-val">Grofesion Innovations Pvt Ltd</div></div>
                <div className="hm-item"><div className="hm-lbl">Department</div><div className="hm-val">{vals.department || '—'}</div></div>
                <div className="hm-item"><div className="hm-lbl">HR Contact</div><div className="hm-val">hr@magsmen.com</div></div>
              </div>
            </div>

            <div className="step-eye">Step 1 of 6 — Resignation Details</div>
            <div className="step-title">Confirm your resignation details</div>
            <div className="step-sub">These details drive your notice period, clearance timeline, and final documentation.</div>

            <div className="card">
              <div className="card-head">Employee Information</div>
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
              <div className="frow">
                <div className="field">
                  <label>Work Email <span className="req">*</span></label>
                  <input type="email" id="email" value={vals.email} onChange={handleValChange} placeholder="you@magsmen.com" className={errors.email ? 'invalid' : ''} />
                  {errors.email && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
                <div className="field">
                  <label>Employee ID <span className="req">*</span></label>
                  <input type="text" id="employeeId" value={vals.employeeId} onChange={handleValChange} placeholder="e.g. GRO-0142" className={errors.employeeId ? 'invalid' : ''} />
                  {errors.employeeId && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
              </div>
              <div className="frow">
                <div className="field">
                  <label>Department / Division <span className="req">*</span></label>
                  <select id="department" value={vals.department} onChange={handleValChange} className={errors.department ? 'invalid' : ''}>
                    <option value="">Select division</option>
                    <option>Magsmen Brand Consultants</option>
                    <option>Stature by Magsmen</option>
                    <option>Launchpad by Magsmen</option>
                    <option>Tapestry of Talents</option>
                    <option>Grofesion (Corporate)</option>
                  </select>
                  {errors.department && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
                <div className="field">
                  <label>Designation <span className="req">*</span></label>
                  <input type="text" id="designation" value={vals.designation} onChange={handleValChange} placeholder="e.g. Senior Web Developer" className={errors.designation ? 'invalid' : ''} />
                  {errors.designation && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
              </div>
              <div className="field">
                <label>Reporting Manager <span className="req">*</span></label>
                <input type="text" id="manager" value={vals.manager} onChange={handleValChange} placeholder="Manager's full name" className={errors.manager ? 'invalid' : ''} />
                {errors.manager && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
              </div>
            </div>

            <div className="card">
              <div className="card-head">Notice & Reason</div>
              <div className="frow">
                <div className="field">
                  <label>Last Working Day <span className="req">*</span></label>
                  <input type="date" id="lastWorkingDay" value={vals.lastWorkingDay} onChange={handleValChange} className={errors.lastWorkingDay ? 'invalid' : ''} />
                  {errors.lastWorkingDay && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
                <div className="field">
                  <label>Notice Period <span className="req">*</span></label>
                  <select id="noticePeriod" value={vals.noticePeriod} onChange={handleValChange} className={errors.noticePeriod ? 'invalid' : ''}>
                    <option value="">Select</option>
                    <option>Serving Full 30-Day Notice</option>
                    <option>Partial Notice + Buyout</option>
                    <option>Immediate Relieving (Approved)</option>
                  </select>
                  {errors.noticePeriod && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
                </div>
              </div>
              <div className="field">
                <label>Primary Reason for Leaving <span className="req">*</span></label>
                <select id="reason" value={vals.reason} onChange={handleValChange} className={errors.reason ? 'invalid' : ''}>
                  <option value="">Select a reason</option>
                  {reasonOptions.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.reason && <div className="field-error" style={{ display: 'block' }}>Required.</div>}
              </div>
              <div className="field">
                <label>Additional Context <span className="opt">(optional)</span></label>
                <textarea id="reasonDetail" rows={3} value={vals.reasonDetail} onChange={handleValChange} placeholder="Anything you'd like HR to know before your exit interview"></textarea>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-primary" onClick={() => goTo(2)}>Continue → Handover</button>
            </div>
          </div>
        )}

        {/* STEP 2 — HANDOVER */}
        {currentStep === 2 && (
          <div className="step active">
            <div className="step-eye">Step 2 of 6 — Handover</div>
            <div className="step-title">Knowledge Transfer & Handover</div>
            <div className="step-sub">Work you leave behind should be easy to pick up. Mark each item complete as you finish it.</div>

            <div className="alert alert-warn"><div className="alert-icon">⚠️</div><div>Clearance in Step 4 cannot be requested until every required handover item below is marked complete.</div></div>

            <div className="hb-progress">
              Required items completed: <span className="hb-count">{reqHandover.filter(id => readHandover.has(id)).length} / {reqHandover.length}</span>
            </div>

            {handoverItems.map(h => (
              <div className="hb-item" key={h.id}>
                <div className="hb-hdr" onClick={() => setOpenHandover(openHandover === h.id ? null : h.id)}>
                  <div className="hb-left">
                    <div className={`hb-num ${readHandover.has(h.id) ? 'read' : ''}`}>{readHandover.has(h.id) ? '✓' : ''}</div>
                    <div className="hb-title">{h.title}</div>
                  </div>
                  <div className="hb-right">
                    <span className={`hb-badge ${readHandover.has(h.id) ? 'done' : h.req ? 'req' : 'opt'}`}>
                      {readHandover.has(h.id) ? 'Done' : h.req ? 'Required' : 'Optional'}
                    </span>
                    <span className="hb-chev" style={{ transform: openHandover === h.id ? 'rotate(180deg)' : '' }}>▼</span>
                  </div>
                </div>
                <div className={`hb-body ${openHandover === h.id ? 'open' : ''}`}>
                  <p>{h.desc}</p>
                  <button
                    className={`btn-mark ${readHandover.has(h.id) ? 'done' : ''}`}
                    onClick={() => markHandoverRead(h.id)}
                    disabled={readHandover.has(h.id)}
                  >
                    {readHandover.has(h.id) ? '✓ Marked Complete' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            ))}

            {showHandoverWarn && (
              <div className="alert alert-warn" style={{ marginTop: '16px' }}><div className="alert-icon">⚠️</div><div>Please mark all <strong>Required</strong> handover items complete before continuing.</div></div>
            )}

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(1)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(3)}>Continue → Assets</button>
            </div>
          </div>
        )}

        {/* STEP 3 — ASSET RETURN */}
        {currentStep === 3 && (
          <div className="step active">
            <div className="step-eye">Step 3 of 6 — Asset Return</div>
            <div className="step-title">Return Company Assets</div>
            <div className="step-sub">Confirm each item as you physically return it to Admin or IT. Final settlement is held until all assets are accounted for.</div>

            <div className="card">
              <div className="card-head">Company Property Checklist</div>
              {assetItems.map(a => (
                <div className="field" key={a.id}>
                  <div className={`cb-row ${assetsReturned[a.id] ? 'checked' : ''}`} onClick={() => toggleAsset(a.id)}>
                    <input type="checkbox" checked={!!assetsReturned[a.id]} readOnly />
                    <div>
                      <div className="cb-row-text">{a.icon} {a.label}</div>
                      <div className="cb-row-sub">{a.hint}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {showAssetWarn && (
              <div className="alert alert-warn"><div className="alert-icon">⚠️</div><div>Please confirm the return of every listed asset before continuing.</div></div>
            )}

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(2)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(4)}>Continue → Clearance</button>
            </div>
          </div>
        )}

        {/* STEP 4 — CLEARANCE */}
        {currentStep === 4 && (
          <div className="step active">
            <div className="step-eye">Step 4 of 6 — Clearance</div>
            <div className="step-title">Department Clearance & No-Dues Declaration</div>
            <div className="step-sub">Each department reviews and signs off separately. Your declarations below trigger that review.</div>

            <div className="card">
              <div className="card-head">No-Dues Declaration</div>
              {clearanceItems.map(c => (
                <div className="field" key={c.id}>
                  <div className={`cb-row ${clearanceCb[c.id] ? 'checked' : ''}`} onClick={() => toggleClearance(c.id)}>
                    <input type="checkbox" checked={!!clearanceCb[c.id]} readOnly />
                    <div>
                      <div className="cb-row-text">{c.dept}</div>
                      <div className="cb-row-sub">{c.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-head">Clearance Status</div>
              {clearanceItems.map(c => (
                <div className="clr-row" key={c.id}>
                  <span className="clr-dept">{c.dept}</span>
                  <span className={`clr-badge ${clearanceCb[c.id] ? 'pending' : 'notready'}`}>
                    {clearanceCb[c.id] ? 'Pending Department Review' : 'Awaiting Your Declaration'}
                  </span>
                </div>
              ))}
              <div className="field-hint" style={{ marginTop: '10px' }}>Departments update this status once they process your clearance after submission.</div>
            </div>

            {showClearanceWarn && (
              <div className="alert alert-warn"><div className="alert-icon">⚠️</div><div>Please complete all four no-dues declarations before continuing.</div></div>
            )}

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(3)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(5)}>Continue → Exit Interview</button>
            </div>
          </div>
        )}

        {/* STEP 5 — EXIT INTERVIEW */}
        {currentStep === 5 && (
          <div className="step active">
            <div className="step-eye">Step 5 of 6 — Exit Interview</div>
            <div className="step-title">Your Feedback Matters</div>
            <div className="step-sub">Honest answers help us improve. Your responses are reviewed by HR leadership only.</div>

            <div className="card">
              <div className="card-head">Rate Your Experience</div>
              {ratingFields.map(r => (
                <div className="field" key={r.id}>
                  <label>{r.label}</label>
                  <div className="rating-row">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        className={`star-btn ${ratings[r.id] >= star ? 'active' : ''}`}
                        onClick={() => setRating(r.id, star)}
                      >★</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-head">Open Feedback</div>
              <div className="field">
                <label>What did you like most about working here? <span className="req">*</span></label>
                <textarea id="likeMost" rows={3} value={vals.likeMost} onChange={handleValChange} placeholder="Team, projects, culture, growth..." className={errors.likeMost ? 'invalid' : ''}></textarea>
                {errors.likeMost && <div className="field-error" style={{ display: 'block' }}>Minimum 20 characters.</div>}
              </div>
              <div className="field">
                <label>What could we improve? <span className="req">*</span></label>
                <textarea id="improve" rows={3} value={vals.improve} onChange={handleValChange} placeholder="Be candid — this stays with HR leadership" className={errors.improve ? 'invalid' : ''}></textarea>
                {errors.improve && <div className="field-error" style={{ display: 'block' }}>Minimum 20 characters.</div>}
              </div>
            </div>

            <div className="card">
              <div className="card-head">A Couple More Questions</div>
              <div className="field">
                <label>Would you recommend Grofesion as a place to work?</label>
                <div className="pill-row">
                  {['Yes', 'Maybe', 'No'].map(opt => (
                    <button type="button" key={opt} className={`pill-btn ${recommend === opt ? 'active' : ''}`} onClick={() => setRecommend(opt)}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Would you consider rejoining in the future?</label>
                <div className="pill-row">
                  {['Yes', 'Maybe', 'No'].map(opt => (
                    <button type="button" key={opt} className={`pill-btn ${rejoin === opt ? 'active' : ''}`} onClick={() => setRejoin(opt)}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(4)}>← Back</button>
              <button className="btn-primary" onClick={() => goTo(6)}>Continue → Sign & Submit</button>
            </div>
          </div>
        )}

        {/* STEP 6 — SIGN & SUBMIT */}
        {currentStep === 6 && (
          <div className="step active">
            <div className="step-eye">Step 6 of 6 — Declaration</div>
            <div className="step-title">Sign & Submit Your Exit Request</div>
            <div className="step-sub">Review your summary, sign the declaration, and submit to complete your exit formalities.</div>

            <div className="card">
              <div className="card-head">Exit Summary</div>
              <div className="sum-grid">
                {[
                  { label: 'Full Name', value: `${vals.firstName} ${vals.lastName}` },
                  { label: 'Employee ID', value: vals.employeeId },
                  { label: 'Department', value: vals.department },
                  { label: 'Designation', value: vals.designation },
                  { label: 'Last Working Day', value: vals.lastWorkingDay },
                  { label: 'Notice Period', value: vals.noticePeriod },
                  { label: 'Reason', value: vals.reason },
                  { label: 'Handover Items', value: `${readHandover.size} / ${handoverItems.length} complete` },
                ].map(item => (
                  <div className="sum-chip" key={item.label}>
                    <div className="sum-lbl">{item.label}</div>
                    <div className="sum-val">{item.value || '—'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-head">Final Declaration</div>
              <div className="decl">I, <strong>{vals.firstName} {vals.lastName}</strong>, confirm that I have completed my handover, returned all company assets, submitted my no-dues declarations, and provided honest exit interview feedback. I understand that my full and final settlement, relieving letter, and experience certificate will be processed as per the <strong>Grofesion Employee Handbook</strong> and remain subject to department clearance.</div>
              <div className="field">
                <label>Digital Signature — Type your full legal name <span className="req">*</span></label>
                <div className="sig-wrap"><input className="sig-input" type="text" id="signature" value={vals.signature} onChange={handleValChange} placeholder="Type your full name to sign" /></div>
                <div className="field-hint">This digital signature is valid under the Information Technology Act, 2000 (India).</div>
                {errors.signature && <div className="field-error" style={{ display: 'block' }}>Please type your full name to sign.</div>}
              </div>
              <div className="field"><label>Date of Signing</label><input type="text" value={vals.signDate} readOnly style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', cursor: 'default' }} /></div>
              <div className="field" style={{ marginTop: '16px' }}>
                <div className="cb-row" onClick={() => setFinalCb(!finalCb)}>
                  <input type="checkbox" checked={finalCb} readOnly />
                  <div>
                    <div className="cb-row-text">I confirm all information above is accurate and I authorise Grofesion to process my exit and final settlement.</div>
                    <div className="cb-row-sub">You will receive a confirmation email once your exit request is logged.</div>
                  </div>
                </div>
                {errors.finalCb && <div className="field-error" style={{ display: 'block' }}>Please check this box to submit.</div>}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => goTo(5)}>← Back</button>
              <button className="btn-submit" onClick={submitExit} disabled={isSubmitting}>Submit Exit Request →</button>
            </div>
          </div>
        )}

        {/* DONE / SUCCESS */}
        {currentStep === 'done' && (
          <div className="step active">
            <div className="success-wrap">
              <div className="s-check">
                <svg viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7 13-13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="s-title">Wishing you the best,<br /><span style={{ fontStyle: 'italic', color: 'var(--orange)' }}>{vals.firstName}</span>.</div>
              <div className="s-body">Your exit request has been logged. IT, Finance, and HR have been notified for clearance. Your relieving letter and full &amp; final settlement will follow once all clearances are complete.</div>
              <div className="s-checks">
                <div className="sck"><div className="sck-dot">✓</div><span>Resignation details recorded</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>Handover checklist submitted</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>Asset return confirmed</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>No-dues declarations submitted</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>Exit interview feedback received</span></div>
                <div className="sck"><div className="sck-dot">✓</div><span>HR notified — hr@magsmen.com</span></div>
              </div>
              <button className="btn-pdf" onClick={downloadPDF}>⬇ Download Exit Summary PDF</button>

              <div className="ns-box" style={{ marginTop: '24px' }}>
                <div className="ns-title">What happens next</div>
                <div className="ns-item"><div className="ns-num">1</div><span><strong>Within 2 days:</strong> IT, Finance, and your manager begin clearance review.</span></div>
                <div className="ns-item"><div className="ns-num">2</div><span><strong>Before last working day:</strong> Complete asset handover in person if not already done.</span></div>
                <div className="ns-item"><div className="ns-num">3</div><span><strong>Last working day:</strong> System access is revoked and final handover is confirmed.</span></div>
                <div className="ns-item"><div className="ns-num">4</div><span><strong>Within 45 days:</strong> Full &amp; final settlement is processed and paid out.</span></div>
                <div className="ns-item"><div className="ns-num">5</div><span><strong>On settlement:</strong> Relieving letter and experience certificate are emailed to you.</span></div>
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
  --amber:       #9A6B0A;
  --amber-bg:    #FDF3DC;
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
.hero-title{font-family:'Playfair Display',serif;font-size:28px;line-height:1.25;color:var(--white);margin-bottom:12px}
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
textarea{resize:vertical;min-height:80px;line-height:1.6}
select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A09D95' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:34px;cursor:pointer}
.field-error{font-size:11px;color:#C0391B;margin-top:5px;font-weight:500;display:none}
.field-hint{font-size:11px;color:var(--gray-400);margin-top:4px;line-height:1.5}

/* ALERTS */
.alert{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:var(--r-sm);font-size:13px;line-height:1.6;margin-bottom:16px}
.alert-icon{flex-shrink:0;font-size:14px;margin-top:1px}
.alert-warn{background:var(--warn-bg);border:1px solid var(--warn-border);color:var(--warn-text)}
.alert-info{background:var(--info-bg);border:1px solid #C5DEFA;color:var(--info)}
.alert-success{background:var(--success-bg);border:1px solid #B3E4CF;color:var(--success)}

/* HANDOVER / HANDBOOK-STYLE ITEMS */
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
.btn-mark{margin-top:4px;padding:8px 18px;background:var(--black);color:var(--white);border:none;border-radius:var(--r-sm);font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;cursor:pointer;letter-spacing:.04em;transition:background .15s}
.btn-mark:hover{background:#333}
.btn-mark.done{background:var(--success);cursor:default}
.hb-progress{font-size:12px;color:var(--gray-600);margin-bottom:14px;display:flex;align-items:center;gap:6px}
.hb-count{font-weight:700;color:var(--orange)}

/* CHECKBOX ROW */
.cb-row{display:flex;align-items:flex-start;gap:12px;padding:14px;border:1.5px solid var(--gray-200);border-radius:var(--r-sm);cursor:pointer;transition:border-color .15s,background .15s}
.cb-row:hover{border-color:var(--black)}
.cb-row.checked{border-color:var(--success);background:var(--success-bg)}
.cb-row input{width:16px;height:16px;margin-top:2px;flex-shrink:0;accent-color:var(--black);cursor:pointer}
.cb-row-text{font-size:13px;font-weight:500;color:var(--black);line-height:1.5}
.cb-row-sub{font-size:11px;color:var(--gray-400);margin-top:3px}

/* CLEARANCE STATUS ROWS */
.clr-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--gray-100)}
.clr-row:last-of-type{border-bottom:none}
.clr-dept{font-size:13px;font-weight:500;color:var(--black)}
.clr-badge{font-size:10px;font-weight:700;letter-spacing:.04em;padding:4px 10px;border-radius:20px;white-space:nowrap}
.clr-badge.pending{background:var(--amber-bg);color:var(--amber)}
.clr-badge.notready{background:var(--gray-100);color:var(--gray-400)}

/* RATING STARS */
.rating-row{display:flex;gap:6px}
.star-btn{width:36px;height:36px;border:1.5px solid var(--gray-200);background:var(--white);border-radius:var(--r-sm);font-size:16px;color:var(--gray-200);cursor:pointer;transition:all .15s;font-family:inherit}
.star-btn.active{border-color:var(--orange);background:var(--orange-l);color:var(--orange)}
.star-btn:hover{border-color:var(--orange-mid)}

/* PILL BUTTONS */
.pill-row{display:flex;gap:8px;flex-wrap:wrap}
.pill-btn{padding:9px 20px;border:1.5px solid var(--gray-200);background:var(--white);border-radius:20px;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;color:var(--gray-600);cursor:pointer;transition:all .15s}
.pill-btn:hover{border-color:var(--black)}
.pill-btn.active{border-color:var(--black);background:var(--black);color:var(--white)}

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
`;