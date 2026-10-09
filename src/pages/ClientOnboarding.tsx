import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Briefcase,
  Search,
  Pencil,
  ShieldCheck,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* =========================================================
    TYPES
========================================================= */

type Step = 1 | 2 | 3 | 4 | 5;

type ClientForm = {
  name: string;
  email: string;
  mobile: string;
  company_name: string;
  entity_type: string;
  cin_no: string;
  gst_no: string;
  pan_no: string;
  address: string;
  signatory_name: string;
  signatory_designation: string;
};

type Service = {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active?: boolean;
  display_order?: number;
};

type ApiError = {
  detail?: string;
  message?: string;
  errors?: Record<string, string[] | string>;
};

/* =========================================================
    API CONFIG
========================================================= */

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ||
    // "https://api.grofesion.com/api";
     "http://127.0.0.1:8000/api";

const ONBOARDING_API =
  `${API_BASE_URL}/client-onboarding/`;

const NDA_PDF_URL =
  `${import.meta.env.BASE_URL}Grofesion_Innovations_NDA.pdf`;

const NDA_SECTIONS = [
  {
    id: 1,
    title: "Recitals & Background",
    points: [
      "WHEREAS, Grofesion Innovations Private Limited, operating as Magsmen Strategy Consultants ('Magsmen'), is engaged in the business of providing strategy consulting, strategy creation, business diagnostics, personal strategy development (Stature), digital strategy advisory (Linkfluence), and related strategic advisory services.",
      "WHEREAS, the Client is desirous of exploring, evaluating, or entering into a consulting engagement with Magsmen for the provision of one or more of the services mentioned above (the 'Engagement').",
      "WHEREAS, in the course of discussions, negotiations, and execution of the Engagement, each Party may disclose certain confidential, proprietary, sensitive, and non-public information.",
      "WHEREAS, both Parties are desirous of protecting such confidential information from unauthorised disclosure, misuse, or exploitation."
    ]
  },
  {
    id: 2,
    title: "1. Definitions and Interpretation",
    points: [
      "Agreement means this Non-Disclosure Agreement, together with all schedules, annexures, and amendments.",
      "Applicable Law includes Indian Contract Act 1872, Companies Act 2013, Information Technology Act 2000, Digital Personal Data Protection Act 2023, Copyright Act 1957, Trade Marks Act 1999, and Arbitration and Conciliation Act 1996.",
      "Confidential Information covers information and materials disclosed in any form when marked confidential or reasonably understood to be confidential.",
      "Consulting Party is Grofesion Innovations Private Limited operating as Magsmen Strategy Consultants.",
      "Intellectual Property includes patents, copyrights, trademarks, trade secrets, know-how, design, database, and moral rights.",
      "Permitted Purpose is evaluating, structuring, negotiating, and carrying out the Engagement and implementing outputs within the Client's organisation."
    ]
  },
  {
    id: 3,
    title: "2. Scope and Categories of Confidential Information",
    points: [
      "Client Confidential Information: Business strategies, growth plans, market expansion intentions, financial data, pricing models, customer lists, and vendor agreements.",
      "Stature Engagements: Personal, financial, health, relationship, and political information shared receives heightened confidentiality equivalent to legally privileged communications.",
      "Magsmen Confidential Information: Proprietary methodology, frameworks, diagnostic tools, analytical models, pricing logic, commercial terms, and internal operating processes."
    ]
  },
  {
    id: 4,
    title: "3. Exclusions from Confidentiality Obligations",
    points: [
      "Information in the public domain through no breach by the Receiving Party.",
      "Lawfully known prior to disclosure or independently developed without reference to Disclosing Party's information.",
      "Required disclosure pursuant to Applicable Law or court order under strict notice and cooperation requirements."
    ]
  },
  {
    id: 5,
    title: "4. Obligations of the Receiving Party",
    points: [
      "Hold all confidential information in strict confidence and safeguard it with reasonable professional care.",
      "Use information solely and exclusively for the Permitted Purpose.",
      "Client shall not reverse-engineer, decompile, adapt, or replicate Magsmen's Proprietary Methodology, nor share proposals or frameworks with competitors."
    ]
  },
  {
    id: 6,
    title: "5. Intellectual Property Rights",
    points: [
      "Nothing in the agreement grants the Receiving Party any ownership right, title, or license in the other Party's IP.",
      "Magsmen's pre-existing IP and Proprietary Methodology remain the exclusive property of Grofesion Innovations Private Limited.",
      "Work Product vests in the Client only upon receipt of full and final payment of all fees due."
    ]
  },
  {
    id: 7,
    title: "6. Non-Solicitation and Non-Circumvention",
    points: [
      "Client shall not solicit, recruit, or employ any employee, contractor, or advisor of Magsmen involved in the Engagement for 24 months post-termination.",
      "Client shall not use confidential information to bypass Magsmen and directly engage sub-contractors or specialist partners."
    ]
  },
  {
    id: 8,
    title: "7. Personal Data and Data Protection",
    points: [
      "Compliance with all applicable data protection laws, including the Digital Personal Data Protection Act 2023.",
      "Special category personal data during Stature engagements receives heightened confidentiality equivalent to legal privilege.",
      "Parties must implement adequate security safeguards and notify breaches within 48 hours."
    ]
  },
  {
    id: 9,
    title: "8. Term and Duration of Obligations",
    points: [
      "Agreement takes effect on the Effective Date and remains in force for the duration of the Engagement.",
      "Confidentiality obligations continue for 5 years post-engagement for standard information and indefinitely for Trade Secrets."
    ]
  },
  {
    id: 10,
    title: "9. Return and Destruction of Information",
    points: [
      "Upon written demand or termination, return or permanently destroy all tangible and electronic confidential materials.",
      "Magsmen may retain encrypted archive copies of work products for 7 years for quality assurance and liability management."
    ]
  },
  {
    id: 11,
    title: "10 & 11. Representations, Warranties, and Remedies",
    points: [
      "Each party warrants full legal authority to enter into and perform the agreement.",
      "Breach of confidentiality causes irreparable harm, entitling non-breaching party to seek immediate injunctive relief and specific performance."
    ]
  },
  {
    id: 12,
    title: "12, 13 & 14. Governing Law and General Provisions",
    points: [
      "Agreement is governed by the laws of the Republic of India.",
      "Disputes shall be resolved through good-faith negotiations or binding arbitration in Guntur, Andhra Pradesh, India.",
      "Includes standard general clauses covering amendments, severability, assignment restrictions, notices, and force majeure."
    ]
  }
];

/* =========================================================
    SERVICE OUTCOMES
========================================================= */

const SERVICE_OUTCOMES: Record<string, string[]> = {
  linkfluence: [
    "Builds a strong personal and professional brand.",
    "Improves visibility and credibility.",
    "Establishes authority and thought leadership.",
    "Creates stronger business, networking, and professional opportunities.",
  ],
  "brand-creation": [
    "Builds a complete brand from the ground up.",
    "Establishes clear brand positioning and identity.",
    "Creates a distinctive and recognizable market presence.",
    "Provides a strong strategic foundation for growth.",
  ],
  "brand-expresso": [
    "Strengthens and transforms an existing brand through a focused 90-day engagement.",
    "Sharpens brand positioning and direction.",
    "Improves brand communication and consistency.",
    "Makes the brand more relevant, distinctive, and competitive.",
  ],
  "rise-by-magsmen": [
    "Builds a stronger foundation for startups.",
    "Creates clarity around business direction and positioning.",
    "Strengthens the startup's brand and market approach.",
    "Defines key growth priorities for the venture.",
    "Helps founders move toward a more structured and scalable business.",
  ],
  "brand-strategy-positioning": [
    "Defines where the brand should stand in the market and who it is for.",
    "Establishes what the brand stands for and how it is different.",
    "Creates a clear reason for customers to choose the brand.",
    "Provides strategic direction for long-term growth.",
  ],
  "brand-audit": [
    "Provides a clear assessment of the current brand.",
    "Identifies what is working and what is not.",
    "Finds gaps, inconsistencies, and weaknesses.",
    "Highlights the key areas that need improvement.",
    "Creates a clear direction for strengthening the brand.",
  ],
  "corporate-rebranding": [
    "Transforms and repositions an existing corporate brand.",
    "Creates a stronger, more relevant corporate identity.",
    "Supports the business through its next stage of growth.",
  ],
  "personal-brand": [
    "Builds a clear personal and professional brand.",
    "Improves visibility and credibility around the client's expertise.",
    "Creates stronger professional and networking opportunities.",
  ],
  "legal-ip-consulting": [
    "Addresses intellectual property and brand-related legal needs.",
    "Provides strategic guidance for protecting brand assets.",
  ],
};

const getServiceOutcomes = (service: Service) => {
  return (
    SERVICE_OUTCOMES[service.slug] ?? [
      service.description || "Professional strategic consulting support.",
    ]
  );
};

const INITIAL_FORM: ClientForm = {
  name: "",
  email: "",
  mobile: "",
  company_name: "",
  entity_type: "",
  cin_no: "",
  gst_no: "",
  pan_no: "",
  address: "",
  signatory_name: "",
  signatory_designation: "",
};

/* =========================================================
    MAIN COMPONENT
========================================================= */

const ClientOnboarding: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<ClientForm>(INITIAL_FORM);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [serviceSearch, setServiceSearch] = useState("");

  // NDA Accordion / Read State
  const [readSections, setReadSections] = useState<number[]>([]);
  const [expandedSection, setExpandedSection] = useState<number | null>(1);

  // Client Agreement Step State
  const [agreementRead, setAgreementRead] = useState(false);
  const agreementContentRef = useRef<HTMLDivElement>(null);

  const [clientSignature, setClientSignature] = useState("");
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState<number | string | null>(null);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadingServices(true);
    setError("");

    try {
      const response = await fetch(ONBOARDING_API, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const data: ApiError & { success?: boolean; services?: Service[] } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.detail || data?.message || `Unable to load services. Server returned ${response.status}.`
        );
      }

      const serviceData: Service[] = Array.isArray(data?.services) ? data.services : [];
      const activeServices = serviceData.filter((service) => service.is_active !== false);
      setServices(activeServices);

      if (activeServices.length === 0) {
        setError("No active services are available. Please contact the administrator.");
      }
    } catch (err) {
      console.error("Fetch services error:", err);
      setServices([]);
      setSelectedServices([]);
      setError(err instanceof Error ? err.message : "Unable to connect to the onboarding server.");
    } finally {
      setLoadingServices(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const checked = type === "checkbox" ? (event.target as HTMLInputElement).checked : undefined;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFieldErrors((previous) => ({ ...previous, [name]: "" }));
    setError("");
  };

  const filteredServices = useMemo(() => {
    const search = serviceSearch.trim().toLowerCase();
    if (!search) return services;
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(search) ||
        service.description.toLowerCase().includes(search)
    );
  }, [services, serviceSearch]);

  const toggleService = (serviceId: number) => {
    setSelectedServices((previous) => {
      if (previous.includes(serviceId)) {
        return previous.filter((id) => id !== serviceId);
      }
      return [...previous, serviceId];
    });
    setError("");
  };

  const validateClientDetails = (): boolean => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Full name is required.";
    if (!form.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.mobile.trim()) {
      errors.mobile = "Mobile number is required.";
    } else if (!/^[+0-9\s()-]{7,20}$/.test(form.mobile.trim())) {
      errors.mobile = "Please enter a valid mobile number.";
    }
    if (!form.company_name.trim()) errors.company_name = "Business/company name is required.";
    if (!form.entity_type.trim()) errors.entity_type = "Type of Entity is required.";
    if (!form.cin_no.trim()) errors.cin_no = "CIN / Registration No. is required.";
    if (!form.gst_no.trim()) errors.gst_no = "GST Registration No. is required.";
    if (!form.pan_no.trim()) errors.pan_no = "PAN is required.";
    if (!form.address.trim()) errors.address = "Business address is required.";
    if (!form.signatory_name.trim()) errors.signatory_name = "Authorised signatory name is required.";
    if (!form.signatory_designation.trim()) errors.signatory_designation = "Designation is required.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateServices = (): boolean => {
    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return false;
    }
    setError("");
    return true;
  };

  const markSectionAsRead = (id: number) => {
    if (!readSections.includes(id)) {
      setReadSections([...readSections, id]);
    }
    if (id < NDA_SECTIONS.length) {
      setExpandedSection(id + 1);
    }
  };

  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (!validateClientDetails()) return;
      setStep(2);
    } else if (step === 2) {
      if (!validateServices()) return;
      setStep(3);
    } else if (step === 3) {
      if (readSections.length < NDA_SECTIONS.length) {
        setError("Please mark all Required sections as read before continuing.");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!agreementRead) {
        setError("Please read and accept the Client Agreement to continue.");
        return;
      }
      if (!clientSignature.trim()) {
        setError("Please enter the client's full name as a signature to continue.");
        return;
      }
      setStep(5);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setError("");
    setFieldErrors({});
    if (step > 1) setStep((prev) => (prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateClientDetails()) { setStep(1); return; }
    if (!validateServices()) { setStep(2); return; }
    if (readSections.length < NDA_SECTIONS.length) { setStep(3); setError("Please mark all NDA sections as read."); return; }
    if (!agreementRead || !clientSignature.trim()) { setStep(4); setError("Please accept the agreement and provide signature."); return; }

    setSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        company_name: form.company_name.trim(),
        entity_type: form.entity_type,
        cin_no: form.cin_no.trim(),
        gst_no: form.gst_no.trim(),
        pan_no: form.pan_no.trim(),
        address: form.address.trim(),
        signatory_name: form.signatory_name.trim(),
        signatory_designation: form.signatory_designation.trim(),
        service_ids: selectedServices,
        client_primary_contact_name: clientSignature.trim(),
        special_confidentiality_notes: "Client accepted NDA & Consulting Agreement terms electronically.",
      };

      const response = await fetch(ONBOARDING_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Unable to submit onboarding.");
      }

      setSubmissionId(data.id ?? data.data?.id ?? "SUCCESS");
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Onboarding submit error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetOnboarding = () => {
    setStep(1);
    setForm(INITIAL_FORM);
    setSelectedServices([]);
    setServiceSearch("");
    setReadSections([]);
    setExpandedSection(1);
    setAgreementRead(false);
    setClientSignature("");
    setError("");
    setFieldErrors({});
    setSubmissionId(null);
    setSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedServiceObjects = services.filter((service) => selectedServices.includes(service.id));

  if (success) {
    return (
      <div className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-10" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="w-full max-w-xl">
          <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm p-7 sm:p-10 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={44} className="text-green-600" />
            </div>
            <h1 className="mt-7 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Onboarding Completed</h1>
            <p className="mt-4 text-sm sm:text-base leading-7 text-gray-500">
              Thank you for providing your details. Your client onboarding and agreement acceptances have been successfully submitted.
            </p>
            {submissionId && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                <Check size={14} /> Reference ID: #{submissionId}
              </div>
            )}
            <button type="button" onClick={resetOnboarding} className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800">
              Start New Onboarding <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="min-h-screen flex flex-col lg:flex-row">
        
        {/* SIDEBAR */}
        <aside className="hidden lg:flex w-[300px] xl:w-[340px] shrink-0 bg-[#111827] text-white px-8 xl:px-10 py-10 flex-col">
          <div className="mt-20">
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Client Portal</div>
            <h2 className="mt-4 text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
              Let's build<br />something<br />meaningful.
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-400">Complete your client onboarding and agreement acceptances.</p>
          </div>

          <div className="mt-12 space-y-6">
            <SidebarStep number="01" title="Client Details" active={step === 1} completed={step > 1} />
            <SidebarStep number="02" title="Engagement Outcomes" active={step === 2} completed={step > 2} />
            <SidebarStep number="03" title="NDA Terms" active={step === 3} completed={step > 3} />
            <SidebarStep number="04" title="Client Agreement" active={step === 4} completed={step > 4} />
            <SidebarStep number="05" title="Review & Submit" active={step === 5} completed={false} />
          </div>

          <div className="mt-auto flex items-start gap-3 text-xs text-gray-500">
            <ShieldCheck size={18} className="shrink-0" />
            <span className="leading-5">Secure enterprise data collection under NDA compliance.</span>
          </div>
        </aside>

        {/* MOBILE HEADER */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg text-gray-900">Magsmen</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-gray-400">Client Portal</div>
            </div>
            <div className="text-sm font-bold text-gray-500">
              {String(step).padStart(2, "0")} <span className="text-gray-300">/ 05</span>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className={`h-1 flex-1 rounded-full transition-all ${item <= step ? "bg-gray-900" : "bg-gray-200"}`} />
            ))}
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 py-7 sm:py-9 lg:py-12">
          <div className="max-w-5xl mx-auto">
            
            <div className="mb-7 sm:mb-9">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Step {String(step).padStart(2, "0")} of 05
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                {step === 1 && "Let's get to know your business"}
                {step === 2 && "Engagement Outcomes"}
                {step === 3 && "Non-Disclosure Agreement (NDA)"}
                {step === 4 && "Client Consulting Agreement"}
                {step === 5 && "Review your information"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-gray-500">
                {step === 1 && "Tell us a few details about yourself and your business entity."}
                {step === 2 && "Select one or more services to review the outcomes relevant to your engagement."}
                {step === 3 && "Review all NDA sections and mark them as read to proceed."}
                {step === 4 && "Review the consulting agreement terms and provide your signature."}
                {step === 5 && "Review all details and agreement specifications before final submission."}
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <div className="break-words">{error}</div>
              </div>
            )}

            {/* STEP 1: CLIENT DETAILS (Manual Input for Type of Entity) */}
            {step === 1 && (
              <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    <User size={21} className="text-gray-700" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Client Details & Legal Entity</h2>
                    <p className="mt-1 text-xs text-gray-500">All fields marked with * are required as per Schedule A.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <FormInput label="Full Name" name="name" value={form.name} onChange={handleInputChange} placeholder="Enter your full name" icon={<User size={18} />} required error={fieldErrors.name} />
                  <FormInput label="Email Address" name="email" type="email" value={form.email} onChange={handleInputChange} placeholder="name@company.com" icon={<Mail size={18} />} required error={fieldErrors.email} />
                  <FormInput label="Mobile Number" name="mobile" type="tel" value={form.mobile} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" icon={<Phone size={18} />} required error={fieldErrors.mobile} />
                  <FormInput label="Business / Company Name" name="company_name" value={form.company_name} onChange={handleInputChange} placeholder="Enter company name" icon={<Building2 size={18} />} required error={fieldErrors.company_name} />
                  
                  <FormInput label="Type of Entity" name="entity_type" value={form.entity_type} onChange={handleInputChange} placeholder="e.g. Private Limited Company / LLP / Proprietorship" icon={<Building2 size={18} />} required error={fieldErrors.entity_type} />
                  <FormInput label="CIN / Registration No." name="cin_no" value={form.cin_no} onChange={handleInputChange} placeholder="Enter CIN or Reg No." icon={<FileText size={18} />} required error={fieldErrors.cin_no} />
                  <FormInput label="GST Registration No." name="gst_no" value={form.gst_no} onChange={handleInputChange} placeholder="Enter GSTIN" icon={<FileText size={18} />} required error={fieldErrors.gst_no} />
                  <FormInput label="PAN" name="pan_no" value={form.pan_no} onChange={handleInputChange} placeholder="Enter PAN" icon={<FileText size={18} />} required error={fieldErrors.pan_no} />

                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <FormInput label="Authorised Signatory Name" name="signatory_name" value={form.signatory_name} onChange={handleInputChange} placeholder="Signatory full name" icon={<User size={18} />} required error={fieldErrors.signatory_name} />
                    <FormInput label="Authorised Signatory Designation" name="signatory_designation" value={form.signatory_designation} onChange={handleInputChange} placeholder="e.g. Managing Director / CEO" icon={<Briefcase size={18} />} required error={fieldErrors.signatory_designation} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-gray-800">
                      Registered / Principal Address <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Enter your complete business registered address, City, State, India PIN"
                        className={`w-full resize-none rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 ${fieldErrors.address ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"}`}
                      />
                    </div>
                    {fieldErrors.address && <p className="mt-1.5 text-xs text-red-600">{fieldErrors.address}</p>}
                  </div>
                </div>
              </section>
            )}

            {/* STEP 2: SERVICES */}
            {step === 2 && (
              <section>
                <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-sm">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      placeholder="Search services..."
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
                    />
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-xs text-gray-400">{services.length} services</span>
                    <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">{selectedServices.length} selected</span>
                  </div>
                </div>

                {loadingServices ? (
                  <div className="min-h-[300px] bg-white rounded-[24px] border border-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 size={30} className="mx-auto animate-spin text-gray-700" />
                      <p className="mt-4 text-sm text-gray-500">Loading services...</p>
                    </div>
                  </div>
                ) : filteredServices.length === 0 ? (
                  <div className="bg-white rounded-[24px] border border-gray-200 p-12 text-center">
                    <Briefcase size={38} className="mx-auto text-gray-300" />
                    <h3 className="mt-4 font-bold text-gray-900">No services found</h3>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredServices.map((service, index) => {
                      const selected = selectedServices.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`group relative w-full text-left rounded-[22px] border p-6 sm:p-7 transition-all duration-200 ${selected ? "border-gray-900 bg-gray-900 shadow-lg shadow-gray-900/10" : "border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md"}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400">
                              {String(service.display_order ?? index + 1).padStart(2, "0")}
                            </span>
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${selected ? "border-white bg-white text-gray-900" : "border-gray-300 text-transparent group-hover:border-gray-500"}`}>
                              <Check size={16} strokeWidth={2.5} />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className={`text-lg font-bold ${selected ? "text-white" : "text-gray-900"}`}>{service.name}</h3>
                            <ul className={`mt-3 space-y-2 text-sm leading-6 ${selected ? "text-gray-300" : "text-gray-500"}`}>
                              {getServiceOutcomes(service).map((outcome) => (
                                <li key={outcome} className="flex items-start gap-2">
                                  <Check size={15} className="mt-1 shrink-0" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {selected && (
                            <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300">
                              <Check size={13} /> Selected
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* STEP 3: NDA ACCORDION (Button left-aligned, citations removed) */}
            {step === 3 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Required sections read: <span className="text-gray-900 font-extrabold">{readSections.length} / {NDA_SECTIONS.length}</span>
                  </div>
                  <a href={NDA_PDF_URL} download className="text-xs font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-900">
                    Download Full NDA PDF
                  </a>
                </div>

                {NDA_SECTIONS.map((sec) => {
                  const isRead = readSections.includes(sec.id);
                  const isExpanded = expandedSection === sec.id;

                  return (
                    <div key={sec.id} className="bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden transition">
                      <div
                        onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                        className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isRead ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}>
                            {isRead ? <Check size={14} /> : sec.id}
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base">{sec.title}</h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wider uppercase ${isRead ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-600"}`}>
                            {isRead ? "DONE" : "REQUIRED"}
                          </span>
                          {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/30 space-y-4">
                          <ul className="space-y-3 text-sm leading-6 text-gray-700">
                            {sec.points.map((pt, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Left aligned button */}
                          <div className="pt-4 flex justify-start">
                            <button
                              type="button"
                              onClick={() => markSectionAsRead(sec.id)}
                              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm ${isRead ? "bg-green-700 text-white hover:bg-green-800" : "bg-black text-white hover:bg-gray-800"}`}
                            >
                              <Check size={15} /> {isRead ? "Marked as Read" : "Mark as Read"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {readSections.length < NDA_SECTIONS.length && (
                  <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3.5 text-xs font-semibold text-orange-800">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>Please mark all Required sections as read before continuing.</span>
                  </div>
                )}
              </section>
            )}

            {/* STEP 4: CLIENT AGREEMENT */}
            {step === 4 && (
              <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FileText size={21} className="text-gray-700" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Client Consulting Agreement</h2>
                    <p className="mt-1 text-xs text-gray-500">Read the agreement carefully before accepting. This is a binding document.</p>
                  </div>
                </div>

                <div
                  ref={agreementContentRef}
                  onScroll={(event) => {
                    const panel = event.currentTarget;
                    if (panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 8) {
                      setAgreementRead(true);
                    }
                  }}
                  className="max-h-[50vh] min-h-[35vh] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6 space-y-4 text-sm leading-6 text-gray-700"
                >
                  <div className="font-bold text-gray-900">MAGSMEN STRATEGY CONSULTANTS — ENGAGEMENT TERMS</div>
                  <p>1. Scope of Services: Magsmen agrees to provide strategic consulting, brand architecture, and business advisory services as outlined in the selected engagement package.</p>
                  <p>2. Professional Fees & Payment Terms: All professional fees must be settled according to the milestone schedule. Delays in payment may result in suspension of deliverables.</p>
                  <p>3. Client Responsibilities: The Client shall provide timely access to necessary data, internal stakeholders, and decision-makers required for successful execution.</p>
                  <p>4. Limitation of Liability: Magsmen’s strategic recommendations are formulated based on industry research and diagnostic audits. Final implementation outcomes depend on client execution.</p>
                  <p>5. Governing Jurisdiction: Any disputes arising out of this consulting agreement shall be subject exclusively to the courts of Guntur, Andhra Pradesh, India.</p>
                  <div className="pt-4 text-xs italic text-gray-500">Warm regards,<br />Sandeep N<br />Founder & CEO, Grofesion Innovations Private Limited</div>
                </div>

                <label className={`flex items-start gap-3 rounded-xl border border-gray-200 p-4 ${agreementRead ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}>
                  <input
                    type="checkbox"
                    checked={clientSignature.trim().length > 0 && agreementRead}
                    disabled={!agreementRead}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setClientSignature(form.signatory_name || form.name || "Authorized Client");
                      } else {
                        setClientSignature("");
                      }
                      setError("");
                    }}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-sm leading-6 text-gray-800">
                    I have read and understood the Consulting Agreement in its entirety and I accept all terms and conditions stated above.
                    {!agreementRead && <span className="mt-1 block text-xs text-gray-500">Scroll to the bottom of the document to enable acceptance.</span>}
                  </span>
                </label>

                {agreementRead && (
                  <div>
                    <label htmlFor="client_signature" className="block mb-2 text-sm font-semibold text-gray-800">
                      Signature of the client by acceptance <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="client_signature"
                      type="text"
                      value={clientSignature}
                      onChange={(e) => { setClientSignature(e.target.value); setError(""); }}
                      placeholder="Type the client's full legal name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                    />
                  </div>
                )}
              </section>
            )}

            {/* STEP 5: REVIEW & SUBMIT */}
            {step === 5 && (
              <section className="space-y-5">
                <ReviewCard title="Client Details & Entity Info" icon={<User size={19} />} onEdit={() => setStep(1)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <ReviewItem label="Full Name" value={form.name} />
                    <ReviewItem label="Email Address" value={form.email} />
                    <ReviewItem label="Mobile Number" value={form.mobile} />
                    <ReviewItem label="Business / Company" value={form.company_name} />
                    <ReviewItem label="Type of Entity" value={form.entity_type} />
                    <ReviewItem label="CIN / Registration No." value={form.cin_no} />
                    <ReviewItem label="GST Registration No." value={form.gst_no} />
                    <ReviewItem label="PAN" value={form.pan_no} />
                    <ReviewItem label="Authorised Signatory" value={`${form.signatory_name} (${form.signatory_designation})`} />
                    <div className="sm:col-span-2"><ReviewItem label="Registered Address" value={form.address} /></div>
                  </div>
                </ReviewCard>

                <ReviewCard title="Selected Services" icon={<Briefcase size={19} />} onEdit={() => setStep(2)}>
                  <div className="space-y-4">
                    {selectedServiceObjects.map((service) => (
                      <div key={service.id} className="rounded-xl bg-gray-50 p-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center"><Check size={12} /></span>
                          {service.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </ReviewCard>

                <ReviewCard title="Agreement & Acceptance" icon={<FileText size={19} />} onEdit={() => setStep(4)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <ReviewItem label="NDA Status" value="All Sections Completed" />
                    <ReviewItem label="Client Signature" value={clientSignature || "—"} />
                  </div>
                </ReviewCard>
              </section>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
              {step > 1 ? (
                <button type="button" onClick={handleBack} disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400 disabled:opacity-50">
                  <ArrowLeft size={17} /> Back
                </button>
              ) : <div />}

              {step < 5 ? (
                <button type="button" onClick={handleNext} disabled={loadingServices && step === 2} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
                  Continue <ArrowRight size={17} />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? (<><Loader2 size={17} className="animate-spin" /> Submitting...</>) : (<>Submit Onboarding <Check size={17} /></>)}
                </button>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

/* =========================================================
    HELPER COMPONENTS
========================================================= */

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  required?: boolean;
  error?: string;
};

const FormInput: React.FC<FormInputProps> = ({ label, name, type = "text", value, placeholder, onChange, icon, required, error }) => (
  <div>
    <label className="block mb-2 text-sm font-semibold text-gray-800">
      {label} {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"}`}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
  </div>
);

type SidebarStepProps = { number: string; title: string; active: boolean; completed: boolean; };
const SidebarStep: React.FC<SidebarStepProps> = ({ number, title, active, completed }) => (
  <div className="flex items-center gap-4">
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${active || completed ? "bg-white text-gray-900" : "border border-gray-700 text-gray-500"}`}>
      {completed ? <Check size={17} /> : number}
    </div>
    <div className={`text-sm font-semibold ${active ? "text-white" : "text-gray-500"}`}>{title}</div>
  </div>
);

type ReviewCardProps = { title: string; icon: React.ReactNode; children: React.ReactNode; onEdit: () => void; };
const ReviewCard: React.FC<ReviewCardProps> = ({ title, icon, children, onEdit }) => (
  <div className="rounded-[22px] border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">{icon}</div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
      </div>
      <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
        <Pencil size={14} /> Edit
      </button>
    </div>
    {children}
  </div>
);

type ReviewItemProps = { label: string; value: string; };
const ReviewItem: React.FC<ReviewItemProps> = ({ label, value }) => (
  <div className="border-b border-gray-100 py-4 last:border-0">
    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gray-400">{label}</div>
    <div className="mt-1.5 text-sm font-medium leading-6 text-gray-900 whitespace-pre-line break-words">{value || "—"}</div>
  </div>
);

export default ClientOnboarding;





// import React, {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   ArrowLeft,
//   ArrowRight,
//   Check,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   User,
//   Mail,
//   Phone,
//   Building2,
//   MapPin,
//   Briefcase,
//   Search,
//   Pencil,
//   ShieldCheck,
//   FileText,
// } from "lucide-react";

// /* =========================================================
//     TYPES
// ========================================================= */

// type Step = 1 | 2 | 3 | 4;

// type ClientForm = {
//   name: string;
//   email: string;
//   mobile: string;
//   company_name: string;
//   address: string;
// };

// type Service = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   is_active?: boolean;
//   display_order?: number;
// };

// type ApiError = {
//   detail?: string;
//   message?: string;
//   errors?: Record<string, string[] | string>;
// };

// /* =========================================================
//     API CONFIG
// ========================================================= */

// const API_BASE_URL =
//   (import.meta.env.VITE_API_BASE_URL as string) ||
//         "https://api.grofesion.com/api";
//     // "http://127.0.0.1:8000/api";

// const ONBOARDING_API =
//   `${API_BASE_URL}/client-onboarding/`;

// const NDA_PDF_URL =
//   `${import.meta.env.BASE_URL}Grofesion_Innovations_NDA.pdf`;

// // const NDA_SOURCE_PAGES = "Pages 1–11";
// const NDA_SOURCE_PAGES = "";

// const NDA_TERMS_POINTS = [
//   {
//     title: "RECITALS",
//     points: [
//       "WHEREAS, Grofesion Innovations Private Limited, operating as Magsmen Strategy Consultants ('Magsmen'), is engaged in the business of providing Strategy strategy consulting, Strategy creation, business diagnostics, personal Strategy development (Stature), digital Strategy advisory (Linkfluence), Strategy Expresso consulting, Strategy naming, and related strategic advisory and consulting services to businesses, organisations, founders, and individuals[cite: 1];",
//       "WHEREAS, the Client is desirous of exploring, evaluating, or entering into a consulting engagement with Magsmen for the provision of one or more of the services mentioned above (the 'Engagement')[cite: 1];",
//       "WHEREAS, in the course of discussions, negotiations, and the execution of the Engagement, each Party may disclose to the other Party certain confidential, proprietary, sensitive, and non-public information, including business data, trade secrets, strategies, methodologies, and intellectual property[cite: 1];",
//       "WHEREAS, both Parties are desirous of protecting such confidential information from unauthorised disclosure, misuse, or exploitation, and of defining the terms governing the receipt, use, and protection of such information[cite: 1]."
//     ],
//   },
//   {
//     title: "1. DEFINITIONS AND INTERPRETATION",
//     points: [
//       "1.1 In this Agreement, unless the context otherwise requires, the following expressions shall have the meanings ascribed to them[cite: 2]:",
//       "1.1.1 'Agreement' means this Non-Disclosure Agreement, together with all schedules, annexures, and amendments hereto, as amended from time to time in accordance with the provisions hereof[cite: 2].",
//       "1.1.2 'Applicable Law' means all statutes, enactments, acts of legislature, laws, ordinances, rules, bye-laws, regulations, notifications, guidelines, policies, directions, directives, and orders of any governmental authority or regulatory body having jurisdiction over the Parties or the subject matter of this Agreement, including but not limited to: the Indian Contract Act, 1872; the Companies Act, 2013; the Information Technology Act, 2000 and the rules made thereunder; the Digital Personal Data Protection Act, 2023; the Indian Copyright Act, 1957; the Trade Marks Act, 1999; the Arbitration and Conciliation Act, 1996; and any other applicable law as amended from time to time[cite: 2].",
//       "1.1.3 'Confidential Information' means any and all information, data, knowledge, materials, documents, trade secrets, know-how, formulae, processes, ideas, concepts, or other proprietary information, in any form or medium, whether written, oral, electronic, visual, graphic, or otherwise, disclosed by the Disclosing Party to the Receiving Party, or to which the Receiving Party obtains access, in connection with this Agreement or the Engagement, that: (i) is designated or marked as 'confidential' or 'proprietary' or equivalent; (ii) is disclosed orally and identified as confidential at the time of disclosure; or (iii) a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure. Confidential Information includes, without limitation, the categories described in Clause 2 hereof[cite: 2].",
//       "1.1.4 'Consulting Party' means Grofesion Innovations Private Limited, operating as Magsmen Strategy Consultants, including its directors, employees, authorised consultants, and representatives[cite: 2].",
//       "1.1.5 'Disclosing Party' means the Party disclosing confidential Information to the other Party[cite: 2].",
//       "1.1.6 'Effective Date' means the date of execution of this Agreement as stated on the cover page hereof[cite: 2].",
//       "1.1.7 'Engagement' means any consulting, advisory, strategy, diagnostic, or Strategy development service provided or to be provided by Magsmen to the Client under a separate engagement agreement, statement of work, or letter of engagement, or in the course of pre-engagement discussions[cite: 2].",
//       "1.1.8 'Intellectual Property' means all patents, copyrights, trademarks, trade secrets, know-how, design rights, database rights, moral rights, and all other intellectual and industrial property rights, whether registered or unregistered, and applications for any of the foregoing[cite: 2].",
//       "1.1.9 'Permitted Purpose' means the sole and exclusive purpose of evaluating, structuring, negotiating, and executing the Engagement between the Parties, and implementing the outputs of such Engagement within the Client's own organisation[cite: 2].",
//       "1.1.10 'Proprietary Methodology' means all Strategy strategy frameworks, consulting systems, diagnostic tools, scoring models, analytical frameworks, templates, playbooks, process maps, engagement formats, and associated materials developed and owned by Magsmen, including but not limited to: the Five-Pillar OTC Diagnostic, the 13-Stage Strategy Creation Framework, the Strategy Health Index, the Strategy Volatility Matrix, the Competitive Gravity Map, the MACES Qualification System, the Stature by Magsmen methodology, the Strategy Expresso structure, the Linkfluence system, the Perception Audit format, and the 5D Consulting Framework[cite: 2].",
//       "1.1.11 'Receiving Party' means the Party receiving confidential Information from the Disclosing Party[cite: 2].",
//       "1.1.12 'Trade Secret' means any information that derives economic value from not being generally known or readily ascertainable by persons who can obtain economic value from its disclosure or use, and that is the subject of reasonable efforts to maintain its secrecy[cite: 2].",
//       "1.1.13 'Work Product' means all deliverables, reports, strategies, Strategy frameworks, audit documents, recommendations, presentations, and other outputs produced by Magsmen for the Client specifically in connection with the Engagement[cite: 3].",
//       "1.2 In this Agreement, unless the context otherwise requires[cite: 3]:",
//       "1.2.1 References to any statute or statutory provision include references to any modification, re-enactment, or extension thereof[cite: 3].",
//       "1.2.2 Words importing the singular include the plural and vice versa; words importing any gender include all genders[cite: 3].",
//       "1.2.3 References to 'Clauses' and 'Schedules' are to clauses and schedules of this Agreement[cite: 3].",
//       "1.2.4 The headings of clauses are for convenience only and shall not affect the construction or interpretation of this Agreement[cite: 3].",
//       "1.2.5 References to 'writing' or 'written' include email communications with delivery and read receipt confirmation[cite: 3].",
//       "1.2.6 The expression 'including' or 'includes' shall be construed as 'including without limitation' or 'includes without limitation'[cite: 3]."
//     ],
//   },
//   {
//     title: "2. SCOPE AND CATEGORIES OF CONFIDENTIAL INFORMATION",
//     points: [
//       "2.1 Without limiting the generality of Clause 1.1.3, and by way of illustration, Confidential Information includes the following specific categories of information[cite: 3]:",
//       "2.2 Confidential Information Disclosed by the Client to Magsmen[cite: 3]: Business strategies, growth plans, market expansion intentions, competitive intelligence, and strategic direction; financial data, revenue figures, cost structures, pricing models, profit margins, investment plans, funding details, and debt obligations; customer lists, customer data, customer contracts, supplier relationships, distribution networks, and vendor agreements; product or service development plans, including unreleased products, technology developments, formulations, innovations, and trade secrets; personnel information, organisational charts, human resources data, compensation structures, and internal communications; legal matters, disputes, regulatory correspondence, pending agreements, intellectual property registrations, and compliance issues; Strategy assets, visual identity materials, communication strategies, naming decisions, and market positioning information shared for the Permitted Purpose; personal, financial, health, relationship, reputational, or political information shared by individual clients in connection with Stature personal Strategy engagements which shall be treated with heightened confidentiality equivalent to legally privileged communications; any information disclosed verbally in discovery sessions, briefings, workshops, or meetings, whether or not reduced to writing[cite: 3].",
//       "2.3 Confidential Information Disclosed by Magsmen to the Client[cite: 3]: All Proprietary Methodology, frameworks, diagnostic tools, analytical models, and consulting systems as defined in Clause 1.1.10; proposal documents, engagement structures, scoping frameworks, and service delivery plans; fee structures, pricing logic, commercial terms, and discount rationale; internal operating processes, team composition, delivery protocols, and resource allocation; research insights, benchmark data, market analysis, competitor intelligence, and case study findings shared in the context of the Engagement; strategic recommendations, Strategy audit findings, perception analysis, positioning frameworks, and communication strategies; materials explicitly marked 'Confidential,' 'Strictly Confidential,' 'Proprietary,' or equivalent designations[cite: 3, 4].",
//       "2.4 For the avoidance of doubt, information shall not lose its character as confidential Information merely because it was disclosed orally or was not marked with a confidentiality label, if by its nature and the circumstances of disclosure it ought reasonably to be understood as confidential[cite: 4]."
//     ],
//   },
//   {
//     title: "3. EXCLUSIONS FROM CONFIDENTIALITY OBLIGATIONS",
//     points: [
//       "3.1 The obligations of confidentiality under this Agreement shall not apply to any Confidential Information that the Receiving Party can demonstrate, by documentary evidence satisfactory to a court of competent jurisdiction, that[cite: 4]:",
//       "3.1.1 Was in the public domain at the time of disclosure to the Receiving Party, through no act or omission of the Receiving Party or any person to whom the Receiving Party disclosed such information[cite: 4];",
//       "3.1.2 Enters the public domain after disclosure through no act, omission, or breach by the Receiving Party or any person to whom the Receiving Party disclosed such information[cite: 4];",
//       "3.1.3 Was lawfully and demonstrably known to the Receiving Party prior to disclosure by the Disclosing Party, as evidenced by written records pre-dating such disclosure[cite: 4];",
//       "3.1.4 Was lawfully received by the Receiving Party from a bona fide third party who had the unrestricted right to disclose it without any obligation of confidentiality[cite: 4];",
//       "3.1.5 Was independently developed by the Receiving Party without reference to, use of, or access to the Disclosing Party's Confidential Information, as demonstrated by contemporaneous written records[cite: 4];",
//       "3.1.6 Is required to be disclosed pursuant to: (i) any Applicable Law; (ii) the order or direction of a court of competent jurisdiction; or (iii) the requirement of any regulatory or governmental authority having jurisdiction over the Receiving Party provided that the Receiving Party shall: (a) give the Disclosing Party prompt written notice of such requirement prior to disclosure; (b) cooperate fully with the Disclosing Party in seeking a protective order or other appropriate relief; (c) use all reasonable endeavours to obtain confidential treatment of any information so disclosed; and (d) limit such disclosure to the minimum extent strictly required[cite: 4].",
//       "3.2 The burden of proving that any exclusion set forth in Clause 3.1 applies shall rest entirely and exclusively with the Receiving Party. The absence of a confidentiality marking or legend shall not be sufficient to establish that information falls within any exclusion[cite: 4]."
//     ],
//   },
//   {
//     title: "4. OBLIGATIONS OF THE RECEIVING PARTY",
//     points: [
//       "4.1 Each Receiving Party hereby undertakes and covenants with the Disclosing Party that it shall[cite: 4]:",
//       "4.1.1 Hold all confidential Information in strict confidence and safeguard it with a standard of care not less than the standard it applies to its own most sensitive confidential information, and in no event less than a reasonable standard of professional care[cite: 4, 5].",
//       "4.1.2 Use the confidential information solely and exclusively for the Permitted Purpose and for no other purpose whatsoever without the prior written consent of the Disclosing Party[cite: 4].",
//       "4.1.3 Not, without the prior written consent of the Disclosing Party, disclose, reveal, divulge, publish, distribute, reproduce, copy, transmit, or communicate any confidential Information to any person or entity, other than Authorised Personnel as defined in Clause 4.2 below[cite: 4, 5].",
//       "4.1.4 Not use confidential Information for any competitive advantage, commercial exploitation, or any purpose that benefits the Receiving Party or any third party at the expense of the Disclosing Party[cite: 5].",
//       "4.1.5 Promptly notify the Disclosing Party in writing upon becoming aware of: (i) any actual or suspected unauthorised access to, disclosure of, or use of Confidential Information; (ii) any loss, theft, or compromise of any material containing Confidential Information; or (iii) any demand or request from a third party for access to Confidential Information and in each case cooperate fully with the Disclosing Party in mitigating the consequences[cite: 5].",
//       "4.1.6 Not make any copies, reproductions, abstracts, or extracts of confidential Information except to the extent strictly necessary for the Permitted Purpose[cite: 5].",
//       "4.1.7 Store and handle all confidential Information in a secure manner, including implementing reasonable technical, administrative, and physical safeguards against unauthorized access, use, or disclosure[cite: 5].",
//       "4.2 Authorised Personnel: The Receiving Party may disclose Confidential Information only to those of its directors, employees, professional advisors (including legal counsel and accountants), and specifically authorised consultants or contractors who: (i) Have a legitimate and documented need to access the specific Confidential Information for the Permitted Purpose; (ii) Have been informed of the confidential nature of the information and the obligations arising from this Agreement; and (iii) Are bound by confidentiality obligations, whether by contract or by professional duty, that are at least as stringent as those contained in this Agreement[cite: 5].",
//       "4.3 The Receiving Party shall remain fully responsible and liable for any breach of the confidentiality obligations in this Agreement by any Authorised Personnel to whom it discloses confidential Information, as if such breach were a breach by the Receiving Party itself[cite: 5].",
//       "4.4 Specific Obligations of the Client as Receiving Party[cite: 5]:",
//       "4.4.1 The Client shall not use, reproduce, adapt, reverse-engineer, reconstruct, or replicate Magsmen's Proprietary Methodology, frameworks, tools, templates, or consulting systems in whole or in part for any purpose other than the internal implementation of Work Product delivered under the Engagement[cite: 5].",
//       "4.4.2 The Client shall not share, provide, or make available Magsmen's proposals, strategy documents, frameworks, or Proprietary Methodology to any competitor of Magsmen, or to any other consulting firm, agency, or advisor, for any purpose[cite: 5].",
//       "4.4.3 The Client shall not commission any person, entity, or firm to replicate or recreate Magsmen's Proprietary Methodology based on information received from Magsmen under this Agreement[cite: 5].",
//       "4.4.4 The Client shall not make any public announcement, press release, social media post, or public communication referencing the Engagement, its terms, or Magsmen's involvement without Magsmen's prior written consent[cite: 5]."
//     ],
//   },
//   {
//     title: "5. INTELLECTUAL PROPERTY RIGHTS",
//     points: [
//       "5.1 No Transfer of Rights: Nothing in this Agreement shall be construed or interpreted as granting to the Receiving Party any right, title, interest, licence whether express, implied, by estoppel, or otherwise in or to any Intellectual Property, trade secret, know-how, or other proprietary right of the Disclosing Party, except as expressly and specifically stated herein[cite: 5].",
//       "5.2 Magsmen's Pre-existing and Proprietary IP: All Intellectual Property, including the Proprietary Methodology, owned by Magsmen prior to the Effective Date of this Agreement, or developed independently of the Engagement, is and shall remain the exclusive property of Grofesion Innovations Private Limited. No use, adaptation, reproduction, or disclosure of such Intellectual Property is permitted except for the Permitted Purpose and as expressly authorised in writing by Magsmen[cite: 5].",
//       "5.3 Client's Pre-existing IP: All Intellectual Property owned by the Client prior to the Effective Date, or developed independently of the Engagement, is and shall remain the exclusive property of the Client[cite: 6].",
//       "5.4 Work Product Conditional Transfer: All Work Product produced by Magsmen for the Client shall vest in and be assigned to the Client upon receipt of full and final payment of all fees due and payable under the applicable engagement agreement. For the avoidance of doubt, partial payment, pending payment, or payment under dispute shall not trigger any assignment or transfer of Work Product[cite: 6].",
//       "5.5 Underlying Systems Retained: Notwithstanding Clause 5.4, the assignment of Work Product shall not include any of Magsmen's Proprietary Methodology, underlying frameworks, analytical models, or consulting systems used to produce such Work Product. The Client receives only the specific output of those systems applied to its context, and not the systems themselves[cite: 6].",
//       "5.6 No Reverse Engineering: The Client shall not, and shall ensure that its personnel do not, reverse-engineer, disassemble, decompile, or attempt to derive or reconstruct Magsmen's Proprietary Methodology from any Work Product or Confidential Information provided under this Agreement[cite: 6].",
//       "5.7 Strategy Asset Usage: Neither Party shall use the name, logo, trademark, or Strategy identifier of the other Party in any manner including in marketing materials, presentations, social media content, or public communications without the prior written consent of that other Party, except to the extent strictly necessary for the performance of obligations under this Agreement[cite: 6].",
//       "5.8 Attribution Obligation: Any joint output including co-authored content, research, or publications produced during the Engagement shall maintain attribution to Magsmen in all forms of publication, sharing, or presentation, unless both Parties agree otherwise in writing[cite: 6]."
//     ],
//   },
//   {
//     title: "6. NON-SOLICITATION, NON-CIRCUMVENTION, AND RESTRICTIONS ON COMPETITIVE CONDUCT",
//     points: [
//       "6.1 Non-Solicitation of Personnel: During the term of this Agreement and for a period of twenty-four (24) calendar months from the date of termination or expiry of this Agreement, the Client shall not, directly or indirectly, whether for itself or on behalf of any other person: (i) Solicit, approach, recruit, induce, or encourage any employee, contractor, consultant, or advisor of Magsmen who was involved in the Engagement to terminate or diminish their relationship with Magsmen; (ii) Employ, engage, retain, or otherwise contract with any such person without the prior written consent of Magsmen[cite: 6].",
//       "6.2 Non-Circumvention: The Client shall not use Confidential Information received from Magsmen including information about Magsmen's sub-contractors, vendors, specialist partners, or strategic network to bypass Magsmen and directly engage such parties for services that fall within, or are substantially similar to, the scope of the Engagement, without Magsmen's prior written consent[cite: 6].",
//       "6.3 Restriction on Competing Use: The Client shall not use Magsmen's Confidential Information, Proprietary Methodology, or any portion thereof directly, indirectly, or in adapted form to develop, build, offer, or support any service that competes with Magsmen's consulting practice[cite: 6].",
//       "6.4 Parallel Engagement Disclosure Obligation: If the Client is concurrently engaged with, or subsequently engages, any other Strategy consulting firm, strategy advisor, or agency on the same or substantially similar scope as the Engagement with Magsmen, the Client shall disclose this to Magsmen in writing prior to or at the commencement of such parallel engagement. Failure to make this disclosure, where the consequence is that Magsmen's Confidential Information or strategies are shared with or benefit a competing advisor, shall constitute a material breach of this Agreement[cite: 6]."
//     ],
//   },
//   {
//     title: "7. PERSONAL DATA AND DATA PROTECTION",
//     points: [
//       "7.1 Compliance with Applicable Law: Each Party shall comply with all Applicable Laws governing the collection, storage, use, processing, sharing, and protection of personal data, including but not limited to the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023, as amended or substituted from time to time[cite: 7].",
//       "7.2 Data Shared in Confidence: Any personal data shared by one Party to the other under or in connection with this Agreement shall be used solely for the Permitted Purpose and shall not be shared with any third party without the prior written consent of the Party whose data or whose principals' data is involved[cite: 7].",
//       "7.3 Special Category Data Stature Engagements: Where the engagement involves Magsmen's Stature personal Strategy service, the Client acknowledges that information of a sensitive personal nature including health conditions, financial circumstances, family relationships, legal matters, political associations, and reputation-sensitive information may be shared. Such data shall be treated by Magsmen with a heightened standard of confidentiality, equivalent to that applied to legally privileged communications, and shall under no circumstances be shared with any third party without the Client's explicit written consent[cite: 7].",
//       "7.4 Data Minimisation: Each Party shall limit the personal data it discloses to the other to the minimum necessary for the Permitted Purpose[cite: 7].",
//       "7.5 Security Safeguards: Each Party shall implement and maintain adequate technical, administrative, and physical safeguards to prevent unauthorised access to, misuse of, alteration of, or accidental loss or destruction of personal data received under this Agreement[cite: 7].",
//       "7.6 Data Breach Notification: In the event of any actual, suspected, or threatened breach affecting personal data disclosed under this Agreement, the Party affected shall notify the other Party in writing within forty-eight (48) hours of becoming aware of such breach, and shall cooperate fully in investigating, managing, and mitigating the consequences thereof[cite: 7].",
//       "7.7 Data Retention: Personal data shared under this Agreement shall not be retained beyond the period strictly necessary for the Permitted Purpose, except where retention is required under Applicable Law. Upon conclusion or termination of the Engagement, personal data shall be deleted, anonymised, or returned, as mutually agreed in writing[cite: 7]."
//     ],
//   },
//   {
//     title: "8. TERM AND DURATION OF OBLIGATIONS",
//     points: [
//       "8.1 Commencement: This Agreement shall come into force and take effect on the Effective Date and shall apply to all Confidential Information exchanged between the Parties from the Effective Date, including information exchanged in anticipation of the formal execution of this Agreement[cite: 7].",
//       "8.2 Duration: This Agreement shall remain in force for the entire duration of the Engagement and shall continue thereafter for: (i) A period of five (5) years from the date of completion, expiry, or termination of the Engagement in respect of all Confidential Information other than Trade Secrets; and (ii) Indefinitely in respect of Confidential Information that constitutes a Trade Secret, for so long as such information retains its character as a Trade Secret under Applicable Law[cite: 7].",
//       "8.3 Early Termination: Either Party may terminate this Agreement by giving thirty (30) days' prior written notice to the other Party. Termination shall not affect or diminish the confidentiality obligations arising in respect of information disclosed prior to the effective date of termination, which obligations shall continue for the periods specified in Clause 8.2[cite: 7].",
//       "8.4 Survival: The provisions of Clause 3 (Exclusions), Clause 5 (Intellectual Property), Clause 6 (Non-Solicitation), Clause 8 (Term), Clause 9 (Return and Destruction), Clause 11 (Remedies), Clause 13 (Governing Law), and Clause 14 (General Provisions) shall survive the termination or expiry of this Agreement[cite: 8]."
//     ],
//   },
//   {
//     title: "9. RETURN, RETENTION, AND DESTRUCTION OF CONFIDENTIAL INFORMATION",
//     points: [
//       "9.1 Upon Request: Upon written demand by the Disclosing Party at any time, the Receiving Party shall, within fifteen (15) business days of such demand, either: (i) return to the Disclosing Party all tangible materials including documents, copies, notes, electronic files, and storage media containing or embodying the Disclosing Party's Confidential Information; or (ii) permanently destroy or delete all such materials and provide written confirmation of such destruction or deletion, including certification of the means of destruction employed[cite: 8].",
//       "9.2 Upon Termination: Within thirty (30) days of the termination or expiry of this Agreement or the completion of the Engagement, whichever is earlier, each Party shall, unless otherwise agreed in writing, return or destroy all Confidential Information of the other Party in its possession or control, including all copies and derivatives thereof, whether in physical or electronic form, and provide written confirmation thereof[cite: 8].",
//       "9.3 Legally Required Retention: The Receiving Party may retain copies of confidential Information solely to the extent required by Applicable Law or by a bona fide document retention policy adopted in good faith and applied consistently. Any such retained materials shall remain subject to the full confidentiality obligations of this Agreement[cite: 8].",
//       "9.4 Magsmen's Engagement Archives: Magsmen shall retain encrypted, access-controlled archive copies of all Work Product and engagement records for a period of seven (7) years following the conclusion of the Engagement, for the purposes of quality assurance, professional liability management, and institutional knowledge retention. Such archived materials shall not be accessed or disclosed outside of Magsmen's authorised engagement team[cite: 8].",
//       "9.5 Client's Work Product: The obligation in Clause 9.2 shall not require the Client to destroy copies of Work Product formally delivered to and accepted by the Client as part of the Engagement, provided such Work Product is held subject to the confidentiality obligations of this Agreement[cite: 8]."
//     ],
//   },
//   {
//     title: "10. REPRESENTATIONS AND WARRANTIES",
//     points: [
//       "10.1 Each Party represents and warrants to the other Party that, as of the Effective Date and throughout the term of this Agreement[cite: 8]: (i) It has full legal authority, capacity, power, and right to enter into, execute, and perform its obligations under this Agreement, and that the execution of this Agreement has been duly authorised by all necessary corporate or other action[cite: 8]; (ii) This Agreement constitutes a legal, valid, and binding obligation of the Party, enforceable against it in accordance with its terms[cite: 8]; (iii) The execution and performance of this Agreement does not conflict with, violate, or constitute a default under: (a) any Applicable Law; (b) any judgment, order, or injunction of any court or governmental authority; or (c) any agreement, contract, or instrument to which it is a party or by which it is bound[cite: 8, 9]; (iv) The confidential Information it discloses to the other Party does not, to the best of its knowledge, infringe upon or misappropriate the Intellectual Property or any other rights of any third party[cite: 9].",
//       "10.2 Magsmen additionally represents and warrants that[cite: 9]: (i) It is a company duly incorporated and validly existing under the Companies Act, 2013, with its registered office in India, and is in good standing with all applicable regulatory authorities[cite: 9]; (ii) Its Proprietary Methodology and consulting frameworks have been independently developed by Magsmen and do not, to the best of its knowledge, infringe upon any third party's Intellectual Property rights[cite: 9].",
//       "10.3 The Client additionally represents and warrants that[cite: 9]: (i) It has lawfully obtained all information it discloses to Magsmen under this Agreement, and has the full right and authority to disclose such information for the Permitted Purpose[cite: 9]; (ii) The disclosure of such information does not violate any duty of confidentiality owed to any third party, or any Applicable Law[cite: 9]."
//     ],
//   },
//   {
//     title: "11. REMEDIES, LIABILITY, AND ENFORCEMENT",
//     points: [
//       "11.1 Acknowledgement of Irreparable Harm: Each Party acknowledges and agrees that any breach or threatened breach of the confidentiality, Intellectual Property, or non-solicitation provisions of this Agreement will cause immediate, serious, and irreparable harm and damage to the Disclosing Party, for which monetary compensation would be an inadequate and insufficient remedy[cite: 9].",
//       "11.2 Equitable Relief: In the event of any actual or threatened breach, the Disclosing Party shall, in addition to any other remedy available at law or in equity, be entitled to seek: (i) an immediate ex parte or inter partes injunction or restraining order; (ii) a decree of specific performance; and (iii) such other equitable relief as the court may deem appropriate from any court of competent jurisdiction, without the necessity of proving actual damages, without the requirement to post any bond or other security, and without prejudice to any other remedies available[cite: 9].",
//       "11.3 Monetary Damages: The right to seek equitable relief under Clause 11.2 is cumulative and without prejudice to any other right or remedy available under this Agreement, at law, or in equity, including the right to recover all direct, indirect, consequential, and special damages caused by the breach[cite: 9].",
//       "11.4 Costs: In any proceeding to enforce this Agreement, the prevailing Party shall be entitled to recover from the breaching Party all reasonable costs, legal fees, and expenses incurred in connection with such enforcement[cite: 9].",
//       "11.5 Indemnification: The breaching Party shall indemnify, defend, and hold harmless the non-breaching Party against all claims, losses, damages, liabilities, costs, and expenses (including reasonable legal fees) arising directly or indirectly from any breach of this Agreement by the breaching Party or its Authorised Personnel[cite: 9].",
//       "11.6 No Limitation on Liability: Nothing in this Agreement shall be construed as limiting or excluding the liability of either Party for: (i) fraud or fraudulent misrepresentation; (ii) wilful misconduct or gross negligence; or (iii) any other liability which cannot be limited or excluded under Applicable Law[cite: 9]."
//     ],
//   },
//   {
//     title: "12. NON-DISPARAGEMENT",
//     points: [
//       "12.1 During the term of this Agreement and for a period of two (2) years following its termination or expiry, neither Party shall, directly or indirectly, make, publish, communicate, or cause to be made, published, or communicated any statement whether oral, written, electronic, or through any medium that is false, misleading, defamatory, derogatory, or damaging to the professional reputation, goodwill, or standing of the other Party, its directors, officers, employees, or business[cite: 9].",
//       "12.2 This clause shall not prohibit either Party from making truthful statements required by Applicable Law, regulatory obligation, or in the context of bona fide legal proceedings[cite: 9].",
//       "12.3 Any testimonial, case study, or public reference to the Engagement whether by Magsmen or the Client shall require the prior written approval of the other Party before publication or communication[cite: 9]."
//     ],
//   },
//   {
//     title: "13. GOVERNING LAW AND DISPUTE RESOLUTION",
//     points: [
//       "13.1 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the Republic of India, without reference to its conflict of laws, rules or principles[cite: 10].",
//       "13.2 Amicable Resolution: In the event of any dispute, controversy, or claim arising out of or in connection with this Agreement, including any question regarding its existence, validity, interpretation, breach, or termination ('Dispute'), the Parties shall first attempt to resolve the Dispute through good-faith negotiation between their respective senior authorised representatives. Such negotiations shall commence within fifteen (15) days of one Party issuing a written notice to the other Party identifying the Dispute ('Dispute Notice'). The Parties shall negotiate in good faith for a period not exceeding thirty (30) days from the Dispute Notice, or such longer period as the Parties may agree in writing[cite: 10].",
//       "13.3 Arbitration: If the Dispute is not resolved through negotiation within the period specified in Clause 13.2, the Dispute shall be referred to and finally resolved by binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, as amended. The following terms shall apply to the arbitration: (i) Seat and Venue: The seat of arbitration shall be Guntur, Andhra Pradesh, India. The venue of the arbitral proceedings shall be Guntur unless the arbitrator directs otherwise; (ii) Arbitrator: The arbitration shall be conducted by a sole arbitrator mutually appointed by the Parties within fifteen (15) days of agreement to arbitrate. Failing such agreement, the arbitrator shall be appointed in accordance with the Arbitration and Conciliation Act, 1996; (iii) Language: The language of arbitration shall be English; (iv) Confidentiality: The existence of the arbitral proceedings, the arbitral award, and all information, documents, and evidence disclosed in the course of arbitration shall be kept strictly confidential by both Parties and the arbitrator; (v) Award: The arbitral award shall be final and binding on the Parties and may be enforced in any court of competent jurisdiction[cite: 10].",
//       "13.4 Courts: Subject to the arbitration clause above, the courts of Guntur, Andhra Pradesh, India, shall have exclusive jurisdiction over all matters relating to this Agreement, including the enforcement of any arbitral award[cite: 10].",
//       "13.5 Emergency Relief: Nothing in this Clause 13 shall prevent either Party from seeking urgent interim or emergency relief from a court of competent jurisdiction where delay pending arbitration would cause or threaten irreparable harm[cite: 10].",
//       "13.6 Continuity of Performance: Unless otherwise agreed in writing, both Parties shall continue to perform their respective obligations under this Agreement during the pendency of any Dispute resolution proceedings[cite: 10]."
//     ],
//   },
//   {
//     title: "14. GENERAL PROVISIONS",
//     points: [
//       "14.1 Entire Agreement: This Agreement, together with all Schedules hereto, constitutes the entire agreement between the Parties with respect to the confidentiality and protection of information exchanged in connection with the Engagement, and supersedes all prior negotiations, representations, warranties, understandings, and agreements whether oral or written between the Parties on the same subject[cite: 10].",
//       "14.2 Amendment: No amendment, modification, supplement, or variation to this Agreement shall be valid or binding unless made in writing, specifically referencing this Agreement and the provision being amended, and duly signed by authorised representatives of both Parties[cite: 10].",
//       "14.3 Waiver: No failure or delay by either Party in exercising any right, power, privilege, or remedy under this Agreement shall operate as a waiver of such right, power, privilege, or remedy. No single or partial exercise of any right, power, privilege, or remedy shall preclude any other or further exercise thereof or the exercise of any other right, power, privilege, or remedy. A waiver of any specific breach shall not constitute a waiver of any subsequent or different breach[cite: 11].",
//       "14.4 Severability: If any provision of this Agreement is determined by a court of competent jurisdiction or arbitral tribunal to be invalid, illegal, void, or unenforceable under Applicable Law, such provision shall be severed from this Agreement without affecting the validity or enforceability of the remaining provisions, which shall continue in full force and effect. Where legally permissible, the invalid provision shall be modified to the minimum extent necessary to render it valid and enforceable while preserving the original intent of the Parties[cite: 11].",
//       "14.5 Assignment: Neither Party may assign, transfer, sub-contract, or otherwise deal with its rights or obligations under this Agreement, in whole or in part, without the prior written consent of the other Party. Any purported assignment without such consent shall be void and of no legal effect[cite: 11].",
//       "14.6 Notices: All notices, demands, consents, approvals, requests, and other communications required or permitted under this Agreement shall be in writing and shall be duly served if delivered by: (i) hand delivery with signed acknowledgment of receipt; (ii) registered post with acknowledgment due (RPAD); or (iii) electronic mail with delivery and read-receipt confirmation to the addresses specified in Schedule A of this Agreement, or as updated by written notice. Notices shall be deemed received on the date of acknowledgment in the case of hand delivery or RPAD, and on the date the read-receipt is generated in the case of email[cite: 11].",
//       "14.7 Counterparts: This Agreement may be executed in two or more counterparts, each of which shall be deemed an original and all of which, taken together, shall constitute one and the same instrument. A counterpart transmitted by electronic means, including a scanned copy bearing original signatures or a digitally executed copy, shall be treated as equivalent to a physical original for all purposes[cite: 11].",
//       "14.8 No Partnership or Agency: Nothing in this Agreement shall be construed as creating, or shall be deemed to create, any partnership, joint venture, employment, or agency relationship between the Parties. Each Party is an independent party and has no authority to bind the other Party in any manner[cite: 11].",
//       "14.9 Force Majeure: Neither Party shall be deemed in breach of this Agreement, and shall not incur any liability to the other Party, for any failure or delay in the performance of its obligations under this Agreement to the extent such failure or delay is caused by circumstances beyond the reasonable control of the affected Party, including acts of God, fire, flood, earthquake, epidemic, pandemic, acts of war, terrorism, civil unrest, governmental action, or nationwide infrastructure failure ('Force Majeure Event'), provided that: (i) the affected Party gives prompt written notice to the other Party describing the Force Majeure Event; (ii) the affected Party uses all reasonable endeavours to resume performance as soon as possible; and (iii) the obligations of confidentiality in this Agreement shall not be suspended by reason of a Force Majeure Event[cite: 11].",
//       "14.10 Language: This Agreement is executed in the English language, which shall be the authoritative and governing language for all purposes, including interpretation, construction, and dispute resolution[cite: 11].",
//       "14.11 Headings: The clause headings and titles in this Agreement are inserted for convenience of reference only and shall not affect the interpretation or construction of any provision of this Agreement[cite: 11].",
//       "14.12 Stamp Duty: This Agreement shall be stamped in accordance with the Indian Stamp Act, 1899, and the applicable stamp duty legislation of the State of Andhra Pradesh. The cost of stamping shall be borne equally by the Parties unless otherwise agreed[cite: 11].",
//       "14.13 Registration: The Parties acknowledge that this Agreement is not required to be compulsorily registered under the Registration Act, 1908. However, either Party may choose to register this Agreement and shall bear the cost of such registration[cite: 11]."
//     ],
//   },
// ];

// /* =========================================================
//     SERVICE OUTCOMES
// ========================================================= */

// const SERVICE_OUTCOMES: Record<string, string[]> = {
//   linkfluence: [
//     "Builds a strong personal and professional brand.",
//     "Improves visibility and credibility.",
//     "Establishes authority and thought leadership.",
//     "Creates stronger business, networking, and professional opportunities.",
//   ],

//   "brand-creation": [
//     "Builds a complete brand from the ground up.",
//     "Establishes clear brand positioning and identity.",
//     "Creates a distinctive and recognizable market presence.",
//     "Provides a strong strategic foundation for growth.",
//   ],

//   "brand-expresso": [
//     "Strengthens and transforms an existing brand through a focused 90-day engagement.",
//     "Sharpens brand positioning and direction.",
//     "Improves brand communication and consistency.",
//     "Makes the brand more relevant, distinctive, and competitive.",
//   ],

//   "rise-by-magsmen": [
//     "Builds a stronger foundation for startups.",
//     "Creates clarity around business direction and positioning.",
//     "Strengthens the startup's brand and market approach.",
//     "Defines key growth priorities for the venture.",
//     "Helps founders move toward a more structured and scalable business.",
//   ],

//   "brand-strategy-positioning": [
//     "Defines where the brand should stand in the market and who it is for.",
//     "Establishes what the brand stands for and how it is different.",
//     "Creates a clear reason for customers to choose the brand.",
//     "Provides strategic direction for long-term growth.",
//   ],

//   "brand-audit": [
//     "Provides a clear assessment of the current brand.",
//     "Identifies what is working and what is not.",
//     "Finds gaps, inconsistencies, and weaknesses.",
//     "Highlights the key areas that need improvement.",
//     "Creates a clear direction for strengthening the brand.",
//   ],

//   "corporate-rebranding": [
//     "Transforms and repositions an existing corporate brand.",
//     "Creates a stronger, more relevant corporate identity.",
//     "Supports the business through its next stage of growth.",
//   ],

//   "personal-brand": [
//     "Builds a clear personal and professional brand.",
//     "Improves visibility and credibility around the client's expertise.",
//     "Creates stronger professional and networking opportunities.",
//   ],

//   "legal-ip-consulting": [
//     "Addresses intellectual property and brand-related legal needs.",
//     "Provides strategic guidance for protecting brand assets.",
//   ],
// };

// const getServiceOutcomes = (service: Service) => {
//   return (
//     SERVICE_OUTCOMES[service.slug] ?? [
//       service.description || "Professional strategic consulting support.",
//     ]
//   );
// };

// /* =========================================================
//     INITIAL FORM
// ========================================================= */

// const INITIAL_FORM: ClientForm = {
//   name: "",
//   email: "",
//   mobile: "",
//   company_name: "",
//   address: "",
// };

// /* =========================================================
//     MAIN COMPONENT
// ========================================================= */

// const ClientOnboarding: React.FC = () => {
//   const [step, setStep] = useState<Step>(1);

//   const [form, setForm] =
//     useState<ClientForm>(INITIAL_FORM);

//   const [services, setServices] =
//     useState<Service[]>([]);

//   const [selectedServices, setSelectedServices] =
//     useState<number[]>([]);

//   const [serviceSearch, setServiceSearch] =
//     useState("");

//   const [termsAccepted, setTermsAccepted] =
//     useState(false);

//   const [termsReadToEnd, setTermsReadToEnd] =
//     useState(false);

//   const [clientSignature, setClientSignature] =
//     useState("");

//   const termsContentRef =
//     useRef<HTMLDivElement>(null);

//   const [loadingServices, setLoadingServices] =
//     useState(true);

//   const [submitting, setSubmitting] =
//     useState(false);

//   const [success, setSuccess] =
//     useState(false);

//   const [submissionId, setSubmissionId] =
//     useState<number | string | null>(null);

//   const [error, setError] =
//     useState("");

//   const [fieldErrors, setFieldErrors] =
//     useState<Record<string, string>>({});

//   /* =========================================================
//       FETCH SERVICES
//   ========================================================= */

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoadingServices(true);
//     setError("");

//     try {
//       const response = await fetch(
//         ONBOARDING_API,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );

//       const data: ApiError & {
//         success?: boolean;
//         services?: Service[];
//       } = await response
//         .json()
//         .catch(() => ({}));

//       if (!response.ok) {
//         throw new Error(
//           data?.detail ||
//             data?.message ||
//             `Unable to load services. Server returned ${response.status}.`
//         );
//       }

//       const serviceData: Service[] =
//         Array.isArray(data?.services)
//           ? data.services
//           : [];

//       const activeServices =
//         serviceData.filter(
//           (service) =>
//             service.is_active !== false
//         );

//       setServices(activeServices);

//       if (activeServices.length === 0) {
//         setError(
//           "No active services are available. Please contact the administrator."
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Fetch services error:",
//         err
//       );

//       setServices([]);
//       setSelectedServices([]);

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to connect to the onboarding server."
//       );
//     } finally {
//       setLoadingServices(false);
//     }
//   };

//   /* =========================================================
//       INPUT HANDLING
//   ========================================================= */

//   const handleInputChange = (
//     event: React.ChangeEvent<
//       | HTMLInputElement
//       | HTMLTextAreaElement
//       | HTMLSelectElement
//     >
//   ) => {
//     const {
//       name,
//       value,
//       type,
//     } = event.target;

//     const checked =
//       type === "checkbox"
//         ? (
//             event.target as HTMLInputElement
//           ).checked
//         : undefined;

//     setForm((previous) => ({
//       ...previous,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));

//     setFieldErrors((previous) => ({
//       ...previous,
//       [name]: "",
//     }));

//     setError("");
//   };

//   /* =========================================================
//       FILTER SERVICES
//   ========================================================= */

//   const filteredServices = useMemo(() => {
//     const search =
//       serviceSearch.trim().toLowerCase();

//     if (!search) {
//       return services;
//     }

//     return services.filter(
//       (service) =>
//         service.name
//           .toLowerCase()
//           .includes(search) ||
//         service.description
//           .toLowerCase()
//           .includes(search)
//     );
//   }, [services, serviceSearch]);

//   /* =========================================================
//       TOGGLE SERVICE
//   ========================================================= */

//   const toggleService = (
//     serviceId: number
//   ) => {
//     setSelectedServices((previous) => {
//       if (previous.includes(serviceId)) {
//         return previous.filter(
//           (id) => id !== serviceId
//         );
//       }

//       return [
//         ...previous,
//         serviceId,
//       ];
//     });

//     setError("");
//   };

//   /* =========================================================
//       VALIDATE CLIENT DETAILS
//   ========================================================= */

//   const validateClientDetails = (): boolean => {
//     const errors: Record<
//       string,
//       string
//     > = {};

//     if (!form.name.trim()) {
//       errors.name =
//         "Full name is required.";
//     }

//     if (!form.email.trim()) {
//       errors.email =
//         "Email address is required.";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//         form.email.trim()
//       )
//     ) {
//       errors.email =
//         "Please enter a valid email address.";
//     }

//     if (!form.mobile.trim()) {
//       errors.mobile =
//         "Mobile number is required.";
//     } else if (
//       !/^[+0-9\s()-]{7,20}$/.test(
//         form.mobile.trim()
//       )
//     ) {
//       errors.mobile =
//         "Please enter a valid mobile number.";
//     }

//     if (!form.company_name.trim()) {
//       errors.company_name =
//         "Business/company name is required.";
//     }

//     if (!form.address.trim()) {
//       errors.address =
//         "Business address is required.";
//     }

//     setFieldErrors(errors);

//     return (
//       Object.keys(errors).length === 0
//     );
//   };

//   /* =========================================================
//       VALIDATE SERVICES
//   ========================================================= */

//   const validateServices = (): boolean => {
//     if (selectedServices.length === 0) {
//       setError(
//         "Please select at least one service."
//       );

//       return false;
//     }

//     const validIds = new Set(
//       services.map(
//         (service) => service.id
//       )
//     );

//     const invalidSelectedIds =
//       selectedServices.filter(
//         (id) => !validIds.has(id)
//       );

//     if (
//       invalidSelectedIds.length > 0
//     ) {
//       setError(
//         "One or more selected services are no longer available. Please refresh the page and select the services again."
//       );

//       return false;
//     }

//     setError("");

//     return true;
//   };

//   /* =========================================================
//       NEXT
//   ========================================================= */

//   const handleNext = () => {
//     setError("");

//     if (step === 1) {
//       if (!validateClientDetails()) {
//         return;
//       }

//       setStep(2);
//     } else if (step === 2) {
//       if (!validateServices()) {
//         return;
//       }

//       setStep(3);
//     } else if (step === 3) {
//       if (!termsAccepted) {
//         setError(
//           "Please accept the terms and conditions to continue."
//         );

//         return;
//       }

//       if (!clientSignature.trim()) {
//         setError(
//           "Please enter the client's full name as a signature to continue."
//         );

//         return;
//       }

//       setStep(4);
//     }

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   /* =========================================================
//       BACK
//   ========================================================= */

//   const handleBack = () => {
//     setError("");
//     setFieldErrors({});

//     if (step === 2) {
//       setStep(1);
//     }

//     if (step === 3) {
//       setStep(2);
//     }

//     if (step === 4) {
//       setStep(3);
//     }

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   /* =========================================================
//       SUBMIT
//   ========================================================= */

//   const handleSubmit = async () => {
//     setError("");

//     if (!validateClientDetails()) {
//       setStep(1);
//       return;
//     }

//     if (!validateServices()) {
//       setStep(2);
//       return;
//     }

//     if (
//       !termsAccepted ||
//       !clientSignature.trim()
//     ) {
//       setStep(3);

//       setError(
//         "Please accept the terms and provide your signature before submitting."
//       );

//       return;
//     }

//     setSubmitting(true);

//     try {
//       const payload = {
//         name: form.name.trim(),

//         email: form.email.trim(),

//         mobile: form.mobile.trim(),

//         company_name:
//           form.company_name.trim(),

//         address:
//           form.address.trim(),

//         service_ids:
//           selectedServices,

//         client_primary_contact_name:
//           clientSignature.trim(),

//         special_confidentiality_notes:
//           "Client accepted the NDA terms and conditions electronically during onboarding.",
//       };

//       const response = await fetch(
//         ONBOARDING_API,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type":
//               "application/json",

//             Accept:
//               "application/json",
//           },

//           body: JSON.stringify(
//             payload
//           ),
//         }
//       );

//       const data =
//         await response
//           .json()
//           .catch(() => ({}));

//       if (!response.ok) {
//         if (
//           data.errors &&
//           typeof data.errors ===
//             "object"
//         ) {
//           const djangoErrors =
//             data.errors;

//           const readableErrors =
//             Object.entries(
//               djangoErrors
//             )
//               .map(
//                 ([
//                   field,
//                   messages,
//                 ]) => {
//                   const msg =
//                     Array.isArray(
//                       messages
//                     )
//                       ? messages.join(
//                           ", "
//                         )
//                       : String(
//                           messages
//                         );

//                   return `${field}: ${msg}`;
//                 }
//               )
//               .join(" | ");

//           throw new Error(
//             readableErrors ||
//               "Please check the submitted information."
//           );
//         }

//         throw new Error(
//           data.detail ||
//             data.message ||
//             "Unable to submit onboarding."
//         );
//       }

//       const id =
//         data.id ??
//         data.data?.id ??
//         null;

//       setSubmissionId(id);

//       setSuccess(true);

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } catch (err) {
//       console.error(
//         "Onboarding submit error:",
//         err
//       );

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong while submitting the onboarding."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   /* =========================================================
//       RESET
//   ========================================================= */

//   const resetOnboarding = () => {
//     setStep(1);

//     setForm(INITIAL_FORM);

//     setSelectedServices([]);

//     setServiceSearch("");

//     setTermsAccepted(false);

//     setTermsReadToEnd(false);

//     setClientSignature("");

//     setError("");

//     setFieldErrors({});

//     setSubmissionId(null);

//     setSuccess(false);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const selectedServiceObjects =
//     services.filter((service) =>
//       selectedServices.includes(
//         service.id
//       )
//     );

//   /* =========================================================
//       SUCCESS SCREEN
//   ========================================================= */

//   if (success) {
//     return (
//       <div
//         className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-10"
//         style={{
//           fontFamily:
//             "Montserrat, sans-serif",
//         }}
//       >
//         <div className="w-full max-w-xl">
//           <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm p-7 sm:p-10 text-center">
//             <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
//               <CheckCircle2
//                 size={44}
//                 className="text-green-600"
//               />
//             </div>

//             <h1 className="mt-7 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
//               Onboarding Completed
//             </h1>

//             <p className="mt-4 text-sm sm:text-base leading-7 text-gray-500">
//               Thank you for providing your
//               details. Your client onboarding
//               and agreement acceptance have
//               been successfully submitted.
//             </p>

//             {submissionId && (
//               <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
//                 <Check size={14} />

//                 Reference ID: #
//                 {submissionId}
//               </div>
//             )}

//             <button
//               type="button"
//               onClick={
//                 resetOnboarding
//               }
//               className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//             >
//               Start New Onboarding

//               <ArrowRight
//                 size={17}
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* =========================================================
//       MAIN UI
//   ========================================================= */

//   return (
//     <div
//       className="min-h-screen bg-[#f7f8fa]"
//       style={{
//         fontFamily:
//           "Montserrat, sans-serif",
//       }}
//     >
//       <div className="min-h-screen flex flex-col lg:flex-row">

//         {/* SIDEBAR */}
//         <aside className="hidden lg:flex w-[300px] xl:w-[340px] shrink-0 bg-[#111827] text-white px-8 xl:px-10 py-10 flex-col">
//           <div className="mt-20">
//             <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
//               Client Portal
//             </div>

//             <h2 className="mt-4 text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
//               Let's build
//               <br />
//               something
//               <br />
//               meaningful.
//             </h2>

//             <p className="mt-5 text-sm leading-7 text-gray-400">
//               Complete your client onboarding
//               and NDA acceptance.
//             </p>
//           </div>

//           <div className="mt-12 space-y-6">
//             <SidebarStep
//               number="01"
//               title="Client Details"
//               active={step === 1}
//               completed={step > 1}
//             />

//             <SidebarStep
//               number="02"
//               title="Engagement Outcomes"
//               active={step === 2}
//               completed={step > 2}
//             />

//             <SidebarStep
//               number="03"
//               title="Terms & Acceptance"
//               active={step === 3}
//               completed={step > 3}
//             />

//             <SidebarStep
//               number="04"
//               title="Review & Submit"
//               active={step === 4}
//               completed={false}
//             />
//           </div>

//           <div className="mt-auto flex items-start gap-3 text-xs text-gray-500">
//             <ShieldCheck
//               size={18}
//               className="shrink-0"
//             />

//             <span className="leading-5">
//               Secure enterprise data collection
//               under NDA compliance.
//             </span>
//           </div>
//         </aside>

//         {/* MOBILE HEADER */}
//         <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-bold text-lg text-gray-900">
//                 Magsmen
//               </div>

//               <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-gray-400">
//                 Client Portal
//               </div>
//             </div>

//             <div className="text-sm font-bold text-gray-500">
//               {String(step).padStart(
//                 2,
//                 "0"
//               )}

//               <span className="text-gray-300">
//                 {" "}
//                 / 04
//               </span>
//             </div>
//           </div>

//           <div className="flex gap-2 mt-5">
//             {[1, 2, 3, 4].map(
//               (item) => (
//                 <div
//                   key={item}
//                   className={`h-1 flex-1 rounded-full transition-all ${
//                     item <= step
//                       ? "bg-gray-900"
//                       : "bg-gray-200"
//                   }`}
//                 />
//               )
//             )}
//           </div>
//         </div>

//         {/* MAIN CONTENT AREA */}
//         <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 py-7 sm:py-9 lg:py-12">
//           <div className="max-w-5xl mx-auto">

//             <div className="mb-7 sm:mb-9">
//               <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
//                 Step{" "}
//                 {String(step).padStart(
//                   2,
//                   "0"
//                 )}{" "}
//                 of 04
//               </div>

//               <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
//                 {step === 1 &&
//                   "Let's get to know your business"}

//                 {step === 2 &&
//                   "Engagement Outcomes"}

//                 {step === 3 &&
//                   "Terms and conditions"}

//                 {step === 4 &&
//                   "Review your information"}
//               </h1>

//               <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-gray-500">
//                 {step === 1 &&
//                   "Tell us a few details about yourself and your business."}

//                 {step === 2 &&
//                   "Select one or more services to review the outcomes relevant to your engagement."}

//                 {step === 3 &&
//                   "Review the confidentiality terms and confirm acceptance on behalf of the client."}

//                 {step === 4 &&
//                   "Review all your details and agreement specifications before submitting."}
//               </p>
//             </div>

//             {error && (
//               <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
//                 <AlertCircle
//                   size={18}
//                   className="mt-0.5 shrink-0"
//                 />

//                 <div className="break-words">
//                   {error}
//                 </div>
//               </div>
//             )}

//             {/* STEP 1 */}
//             {step === 1 && (
//               <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
//                     <User
//                       size={21}
//                       className="text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <h2 className="font-bold text-gray-900">
//                       Client Details
//                     </h2>

//                     <p className="mt-1 text-xs text-gray-500">
//                       All fields marked with *
//                       are required.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
//                   <FormInput
//                     label="Full Name"
//                     name="name"
//                     value={form.name}
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="Enter your full name"
//                     icon={
//                       <User size={18} />
//                     }
//                     required
//                     error={
//                       fieldErrors.name
//                     }
//                   />

//                   <FormInput
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="name@company.com"
//                     icon={
//                       <Mail size={18} />
//                     }
//                     required
//                     error={
//                       fieldErrors.email
//                     }
//                   />

//                   <FormInput
//                     label="Mobile Number"
//                     name="mobile"
//                     type="tel"
//                     value={form.mobile}
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="+91 XXXXX XXXXX"
//                     icon={
//                       <Phone size={18} />
//                     }
//                     required
//                     error={
//                       fieldErrors.mobile
//                     }
//                   />

//                   <FormInput
//                     label="Business / Company Name"
//                     name="company_name"
//                     value={
//                       form.company_name
//                     }
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="Enter company name"
//                     icon={
//                       <Building2
//                         size={18}
//                       />
//                     }
//                     required
//                     error={
//                       fieldErrors.company_name
//                     }
//                   />

//                   <div className="md:col-span-2">
//                     <label className="block mb-2 text-sm font-semibold text-gray-800">
//                       Business Address
//                       <span className="ml-1 text-red-500">
//                         *
//                       </span>
//                     </label>

//                     <div className="relative">
//                       <MapPin
//                         size={18}
//                         className="absolute left-4 top-4 text-gray-400"
//                       />

//                       <textarea
//                         name="address"
//                         value={
//                           form.address
//                         }
//                         onChange={
//                           handleInputChange
//                         }
//                         rows={4}
//                         placeholder="Enter your complete business address"
//                         className={`w-full resize-none rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//                           fieldErrors.address
//                             ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
//                             : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//                         }`}
//                       />
//                     </div>

//                     {fieldErrors.address && (
//                       <p className="mt-1.5 text-xs text-red-600">
//                         {
//                           fieldErrors.address
//                         }
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* STEP 2 */}
//             {step === 2 && (
//               <section>
//                 <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
//                   <div className="relative w-full sm:max-w-sm">
//                     <Search
//                       size={18}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                     />

//                     <input
//                       type="text"
//                       value={
//                         serviceSearch
//                       }
//                       onChange={(e) =>
//                         setServiceSearch(
//                           e.target.value
//                         )
//                       }
//                       placeholder="Search services..."
//                       className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
//                     />
//                   </div>

//                   <div className="flex items-center justify-between sm:justify-end gap-3">
//                     <span className="text-xs text-gray-400">
//                       {services.length}{" "}
//                       services
//                     </span>

//                     <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">
//                       {
//                         selectedServices.length
//                       }{" "}
//                       selected
//                     </span>
//                   </div>
//                 </div>

//                 {loadingServices ? (
//                   <div className="min-h-[300px] bg-white rounded-[24px] border border-gray-200 flex items-center justify-center">
//                     <div className="text-center">
//                       <Loader2
//                         size={30}
//                         className="mx-auto animate-spin text-gray-700"
//                       />

//                       <p className="mt-4 text-sm text-gray-500">
//                         Loading services...
//                       </p>
//                     </div>
//                   </div>
//                 ) : filteredServices.length === 0 ? (
//                   <div className="bg-white rounded-[24px] border border-gray-200 p-12 text-center">
//                     <Briefcase
//                       size={38}
//                       className="mx-auto text-gray-300"
//                     />

//                     <h3 className="mt-4 font-bold text-gray-900">
//                       No services found
//                     </h3>

//                     <p className="mt-2 text-sm text-gray-500">
//                       Try a different
//                       search or contact
//                       the administrator.
//                     </p>

//                     {!serviceSearch &&
//                       (
//                         <button
//                           type="button"
//                           onClick={
//                             fetchData
//                           }
//                           className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
//                         >
//                           Retry
//                           <ArrowRight
//                             size={16}
//                           />
//                         </button>
//                       )}
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     {filteredServices.map(
//                       (
//                         service,
//                         index
//                       ) => {
//                         const selected =
//                           selectedServices.includes(
//                             service.id
//                           );

//                         return (
//                           <button
//                             key={
//                               service.id
//                             }
//                             type="button"
//                             onClick={() =>
//                               toggleService(
//                                 service.id
//                               )
//                             }
//                             className={`group relative w-full text-left rounded-[22px] border p-6 sm:p-7 transition-all duration-200 ${
//                               selected
//                                 ? "border-gray-900 bg-gray-900 shadow-lg shadow-gray-900/10"
//                                 : "border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md"
//                             }`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400">
//                                 {String(
//                                   service.display_order ??
//                                     index +
//                                       1
//                                 ).padStart(
//                                   2,
//                                   "0"
//                                 )}
//                               </span>

//                               <span
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${
//                                   selected
//                                     ? "border-white bg-white text-gray-900"
//                                     : "border-gray-300 text-transparent group-hover:border-gray-500"
//                                 }`}
//                               >
//                                 <Check
//                                   size={
//                                     16
//                                   }
//                                   strokeWidth={
//                                     2.5
//                                   }
//                                 />
//                               </span>
//                             </div>

//                             <div className="mt-8">
//                               <h3
//                                 className={`text-lg font-bold ${
//                                   selected
//                                     ? "text-white"
//                                     : "text-gray-900"
//                                 }`}
//                               >
//                                 {
//                                   service.name
//                                 }
//                               </h3>

//                               <ul
//                                 className={`mt-3 space-y-2 text-sm leading-6 ${
//                                   selected
//                                     ? "text-gray-300"
//                                     : "text-gray-500"
//                                 }`}
//                               >
//                                 {getServiceOutcomes(
//                                   service
//                                 ).map(
//                                   (
//                                     outcome
//                                   ) => (
//                                     <li
//                                       key={
//                                         outcome
//                                       }
//                                       className="flex items-start gap-2"
//                                     >
//                                       <Check
//                                         size={
//                                           15
//                                         }
//                                         className="mt-1 shrink-0"
//                                       />

//                                       <span>
//                                         {
//                                           outcome
//                                         }
//                                       </span>
//                                     </li>
//                                   )
//                                 )}
//                               </ul>
//                             </div>

//                             {selected && (
//                               <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300">
//                                 <Check
//                                   size={
//                                     13
//                                   }
//                                 />

//                                 Selected
//                               </div>
//                             )}
//                           </button>
//                         );
//                       }
//                     )}
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* STEP 3 */}
//             {step === 3 && (
//               <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9 space-y-6">
//                 <div className="flex items-center gap-4 mb-2">
//                   <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
//                     <FileText
//                       size={21}
//                       className="text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <h2 className="font-bold text-gray-900">
//                       Non-Disclosure Agreement
//                     </h2>

//                     <p className="mt-1 text-xs text-gray-500">
//                       Review every page of
//                       the Grofesion
//                       Innovations Private
//                       Limited NDA.
//                     </p>

//                     <a
//                       href={
//                         NDA_PDF_URL
//                       }
//                       download
//                       className="mt-2 inline-flex text-xs font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-900"
//                     >
//                       Download the complete
//                       NDA
//                     </a>
//                   </div>
//                 </div>

//                 <div
//                   ref={
//                     termsContentRef
//                   }
//                   onScroll={(event) => {
//                     const panel =
//                       event.currentTarget;

//                     if (
//                       panel.scrollTop +
//                         panel.clientHeight >=
//                         panel.scrollHeight -
//                           8
//                     ) {
//                       setTermsReadToEnd(
//                         true
//                       );
//                     }
//                   }}
//                   className="max-h-[60vh] min-h-[45vh] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-5"
//                 >
//                   {/* <div className="sticky top-0 z-10 mb-3 flex justify-between rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm backdrop-blur">
//                     <span>Full NDA Terms (Recitals to Clause 14)</span>
//                     <span>{NDA_SOURCE_PAGES}</span>
//                   </div> */}

//                   <div className="space-y-4 text-sm leading-6 text-gray-700">
//                     {NDA_TERMS_POINTS.map((section) => (
//                       <section key={section.title} className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
//                         <h3 className="font-bold text-gray-900">{section.title}</h3>
//                         <ul className="mt-3 space-y-3">
//                           {section.points.map((point) => (
//                             <li key={point} className="flex items-start gap-2.5">
//                               <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
//                               <span>{point}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </section>
//                     ))}
//                   </div>
//                 </div>

//                 <label
//                   className={`flex items-start gap-3 rounded-xl border border-gray-200 p-4 ${
//                     termsReadToEnd
//                       ? "cursor-pointer"
//                       : "cursor-not-allowed opacity-60"
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={
//                       termsAccepted
//                     }
//                     disabled={
//                       !termsReadToEnd
//                     }
//                     onChange={(
//                       event
//                     ) => {
//                       setTermsAccepted(
//                         event.target
//                           .checked
//                       );

//                       setError("");
//                     }}
//                     className="mt-1 h-5 w-5 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
//                   />

//                   <span className="text-sm leading-6 text-gray-800">
//                     I have read and
//                     agree to the terms
//                     and conditions of
//                     the Non-Disclosure
//                     Agreement.

//                     {!termsReadToEnd && (
//                       <span className="mt-1 block text-xs text-gray-500">
//                         Scroll to the end
//                         of the terms to
//                         enable acceptance.
//                       </span>
//                     )}
//                   </span>
//                 </label>

//                 {termsAccepted && (
//                   <div>
//                     <label
//                       htmlFor="client_signature"
//                       className="block mb-2 text-sm font-semibold text-gray-800"
//                     >
//                       Signature of the
//                       client by
//                       acceptance{" "}
//                       <span className="text-red-500">
//                         *
//                       </span>
//                     </label>

//                     <input
//                       id="client_signature"
//                       type="text"
//                       value={
//                         clientSignature
//                       }
//                       onChange={(
//                         event
//                       ) => {
//                         setClientSignature(
//                           event.target
//                             .value
//                         );

//                         setError("");
//                       }}
//                       placeholder="Type the client's full legal name"
//                       autoComplete="name"
//                       className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-900/5"
//                     />

//                     <p className="mt-2 text-xs text-gray-500">
//                       Typing your name
//                       records your
//                       electronic
//                       acceptance.
//                     </p>
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* STEP 4 */}
//             {step === 4 && (
//               <section className="space-y-5">
//                 <ReviewCard
//                   title="Client Details"
//                   icon={
//                     <User size={19} />
//                   }
//                   onEdit={() =>
//                     setStep(1)
//                   }
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//                     <ReviewItem
//                       label="Full Name"
//                       value={
//                         form.name
//                       }
//                     />

//                     <ReviewItem
//                       label="Email Address"
//                       value={
//                         form.email
//                       }
//                     />

//                     <ReviewItem
//                       label="Mobile Number"
//                       value={
//                         form.mobile
//                       }
//                     />

//                     <ReviewItem
//                       label="Business / Company"
//                       value={
//                         form.company_name
//                       }
//                     />

//                     <div className="sm:col-span-2">
//                       <ReviewItem
//                         label="Business Address"
//                         value={
//                           form.address
//                         }
//                       />
//                     </div>
//                   </div>
//                 </ReviewCard>

//                 <ReviewCard
//                   title="Selected Services"
//                   icon={
//                     <Briefcase
//                       size={19}
//                     />
//                   }
//                   onEdit={() =>
//                     setStep(2)
//                   }
//                 >
//                   <div className="space-y-4">
//                     {selectedServiceObjects.map(
//                       (service) => (
//                         <div
//                           key={
//                             service.id
//                           }
//                           className="rounded-xl bg-gray-50 p-4"
//                         >
//                           <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
//                             <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
//                               <Check
//                                 size={
//                                   12
//                                 }
//                               />
//                             </span>

//                             {
//                               service.name
//                             }
//                           </div>

//                           <ul className="mt-3 space-y-1.5 text-sm leading-6 text-gray-600">
//                             {getServiceOutcomes(
//                               service
//                             ).map(
//                               (
//                                 outcome
//                               ) => (
//                                 <li
//                                   key={
//                                     outcome
//                                   }
//                                 >
//                                   •{" "}
//                                   {
//                                     outcome
//                                   }
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </ReviewCard>

//                 <ReviewCard
//                   title="Terms and Client Acceptance"
//                   icon={
//                     <FileText
//                       size={19}
//                     />
//                   }
//                   onEdit={() =>
//                     setStep(3)
//                   }
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//                     <ReviewItem
//                       label="Terms and conditions"
//                       value={
//                         termsAccepted
//                           ? "Accepted"
//                           : "Not accepted"
//                       }
//                     />

//                     <ReviewItem
//                       label="Client signature by acceptance"
//                       value={
//                         clientSignature ||
//                         "—"
//                       }
//                     />

//                     <div className="sm:col-span-2 mt-3">
//                       <a
//                         href={
//                           NDA_PDF_URL
//                         }
//                         download
//                         className="text-sm font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-900"
//                       >
//                         Download the complete
//                         NDA
//                       </a>
//                     </div>
//                   </div>
//                 </ReviewCard>
//               </section>
//             )}

//             {/* NAVIGATION BUTTONS */}
//             <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
//               {step > 1 ? (
//                 <button
//                   type="button"
//                   onClick={
//                     handleBack
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400 disabled:opacity-50"
//                 >
//                   <ArrowLeft
//                     size={17}
//                   />

//                   Back
//                 </button>
//               ) : (
//                 <div />
//               )}

//               {step < 4 ? (
//                 <button
//                   type="button"
//                   onClick={
//                     handleNext
//                   }
//                   disabled={
//                     loadingServices &&
//                     step === 2
//                   }
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Continue

//                   <ArrowRight
//                     size={17}
//                   />
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={
//                     handleSubmit
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       Submit Onboarding

//                       <Check
//                         size={17}
//                       />
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//     FORM INPUT
// ========================================================= */

// type FormInputProps = {
//   label: string;
//   name: string;
//   type?: string;
//   value: string;
//   placeholder: string;
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
//   icon: React.ReactNode;
//   required?: boolean;
//   error?: string;
// };

// const FormInput: React.FC<
//   FormInputProps
// > = ({
//   label,
//   name,
//   type = "text",
//   value,
//   placeholder,
//   onChange,
//   icon,
//   required,
//   error,
// }) => (
//   <div>
//     <label className="block mb-2 text-sm font-semibold text-gray-800">
//       {label}

//       {required && (
//         <span className="ml-1 text-red-500">
//           *
//         </span>
//       )}
//     </label>

//     <div className="relative">
//       <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//         {icon}
//       </div>

//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         autoComplete="off"
//         className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//           error
//             ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
//             : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//         }`}
//       />
//     </div>

//     {error && (
//       <p className="mt-1.5 text-xs text-red-600">
//         {error}
//       </p>
//     )}
//   </div>
// );

// /* =========================================================
//     SIDEBAR STEP
// ========================================================= */

// type SidebarStepProps = {
//   number: string;
//   title: string;
//   active: boolean;
//   completed: boolean;
// };

// const SidebarStep: React.FC<
//   SidebarStepProps
// > = ({
//   number,
//   title,
//   active,
//   completed,
// }) => (
//   <div className="flex items-center gap-4">
//     <div
//       className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
//         active || completed
//           ? "bg-white text-gray-900"
//           : "border border-gray-700 text-gray-500"
//       }`}
//     >
//       {completed ? (
//         <Check size={17} />
//       ) : (
//         number
//       )}
//     </div>

//     <div
//       className={`text-sm font-semibold ${
//         active
//           ? "text-white"
//           : "text-gray-500"
//       }`}
//     >
//       {title}
//     </div>
//   </div>
// );

// /* =========================================================
//     REVIEW CARD
// ========================================================= */

// type ReviewCardProps = {
//   title: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
//   onEdit: () => void;
// };

// const ReviewCard: React.FC<
//   ReviewCardProps
// > = ({
//   title,
//   icon,
//   children,
//   onEdit,
// }) => (
//   <div className="rounded-[22px] border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
//     <div className="flex items-center justify-between gap-4 mb-6">
//       <div className="flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
//           {icon}
//         </div>

//         <h2 className="text-base sm:text-lg font-bold text-gray-900">
//           {title}
//         </h2>
//       </div>

//       <button
//         type="button"
//         onClick={onEdit}
//         className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
//       >
//         <Pencil
//           size={14}
//         />

//         Edit
//       </button>
//     </div>

//     {children}
//   </div>
// );

// /* =========================================================
//     REVIEW ITEM
// ========================================================= */

// type ReviewItemProps = {
//   label: string;
//   value: string;
// };

// const ReviewItem: React.FC<
//   ReviewItemProps
// > = ({
//   label,
//   value,
// }) => (
//   <div className="border-b border-gray-100 py-4 last:border-0">
//     <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
//       {label}
//     </div>

//     <div className="mt-1.5 text-sm font-medium leading-6 text-gray-900 whitespace-pre-line break-words">
//       {value || "—"}
//     </div>
//   </div>
// );

// export default ClientOnboarding;




// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Check,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   User,
//   Mail,
//   Phone,
//   Building2,
//   MapPin,
//   Briefcase,
//   Search,
//   Pencil,
//   ShieldCheck,
//   FileText,
// } from "lucide-react";

// /* =========================================================
//    TYPES
// ========================================================= */

// type Step = 1 | 2 | 3 | 4;

// type ClientForm = {
//   name: string;
//   email: string;
//   mobile: string;
//   company_name: string;
//   address: string;
// };

// type Service = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   is_active?: boolean;
//   display_order?: number;
// };

// type ApiError = {
//   detail?: string;
//   message?: string;
//   errors?: Record<string, string[] | string>;
// };

// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API_BASE_URL =
//   (import.meta.env.VITE_API_BASE_URL as string) ||
//   "http://127.0.0.1:8000/api";

// const ONBOARDING_API = `${API_BASE_URL}/client-onboarding/`;
// const NDA_PDF_URL = `${import.meta.env.BASE_URL}Grofesion_Innovations_NDA.pdf`;
// const NDA_PAGE_COUNT = 15;

// /* =========================================================
//    FALLBACK SERVICES
// ========================================================= */

// const FALLBACK_SERVICES: Service[] = [
//   { id: 1, name: "Brand Creation", slug: "brand-creation", description: "Builds a complete, market-ready brand from the ground up with clear positioning, a distinctive identity, and a strategic foundation for recognition and growth.", display_order: 1 },
//   { id: 2, name: "Brand Audit", slug: "brand-audit", description: "Assesses the current brand, identifies what is working and where gaps or inconsistencies exist, and highlights priorities for strengthening it.", display_order: 2 },
//   { id: 3, name: "Corporate Rebranding", slug: "corporate-rebranding", description: "Transforms and repositions a corporate brand for its next stage of growth.", display_order: 3 },
//   { id: 4, name: "Stature by Magsmen", slug: "stature-by-magsmen", description: "Builds a clear, credible personal brand that represents an individual's expertise and professional presence.", display_order: 4 },
//   { id: 5, name: "LinkFluence", slug: "linkfluence", description: "Helps professionals and business leaders build a strong personal brand and professional presence, creating greater visibility, credibility, authority, and stronger business, networking, and professional opportunities.", display_order: 5 },
//   { id: 6, name: "Brand Expresso", slug: "brand-expresso", description: "A focused 90-day engagement to strengthen an existing brand through sharper direction, stronger positioning, improved communication, and a more consistent, competitive identity.", display_order: 6 },
//   { id: 7, name: "Legal & IP Consulting", slug: "legal-ip-consulting", description: "Provides strategic guidance on intellectual property and brand-related legal needs.", display_order: 7 },
// ];

// const SERVICE_OUTCOMES: Record<string, string[]> = {
//   linkfluence: [
//     "Builds a strong personal and professional brand.",
//     "Improves visibility and credibility.",
//     "Establishes authority and thought leadership.",
//     "Creates stronger business, networking, and professional opportunities.",
//   ],
//   "brand-creation": [
//     "Builds a complete brand from the ground up.",
//     "Establishes clear brand positioning and identity.",
//     "Creates a distinctive and recognizable market presence.",
//     "Provides a strong strategic foundation for growth.",
//   ],
//   "brand-expresso": [
//     "Strengthens and transforms an existing brand through a focused 90-day engagement.",
//     "Sharpens brand positioning and direction.",
//     "Improves brand communication and consistency.",
//     "Makes the brand more relevant, distinctive, and competitive.",
//   ],
//   "rise-by-magsmen": [
//     "Builds a stronger foundation for startups.",
//     "Creates clarity around business direction and positioning.",
//     "Strengthens the startup's brand and market approach.",
//     "Defines key growth priorities for the venture.",
//     "Helps founders move toward a more structured and scalable business.",
//   ],
//   "brand-strategy-positioning": [
//     "Defines where the brand should stand in the market and who it is for.",
//     "Establishes what the brand stands for and how it is different.",
//     "Creates a clear reason for customers to choose the brand.",
//     "Provides strategic direction for long-term growth.",
//   ],
//   "brand-audit": [
//     "Provides a clear assessment of the current brand.",
//     "Identifies what is working and what is not.",
//     "Finds gaps, inconsistencies, and weaknesses.",
//     "Highlights the key areas that need improvement.",
//     "Creates a clear direction for strengthening the brand.",
//   ],
//   "corporate-rebranding": [
//     "Transforms and repositions an existing corporate brand.",
//     "Creates a stronger, more relevant corporate identity.",
//     "Supports the business through its next stage of growth.",
//   ],
//   "personal-brand": [
//     "Builds a clear personal and professional brand.",
//     "Improves visibility and credibility around the client's expertise.",
//     "Creates stronger professional and networking opportunities.",
//   ],
//   "legal-ip-consulting": [
//     "Addresses intellectual property and brand-related legal needs.",
//     "Provides strategic guidance for protecting brand assets.",
//   ],
// };

// const getServiceOutcomes = (service: Service) =>
//   SERVICE_OUTCOMES[service.slug] ?? [service.description];

// const INITIAL_FORM: ClientForm = {
//   name: "",
//   email: "",
//   mobile: "",
//   company_name: "",
//   address: "",
// };

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const ClientOnboarding: React.FC = () => {
//   const [step, setStep] = useState<Step>(1);
//   const [form, setForm] = useState<ClientForm>(INITIAL_FORM);
//   const [services, setServices] = useState<Service[]>([]);
//   const [selectedServices, setSelectedServices] = useState<number[]>([]);
//   const [serviceSearch, setServiceSearch] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [termsReadToEnd, setTermsReadToEnd] = useState(false);
//   const [ndaLastPageLoaded, setNdaLastPageLoaded] = useState(false);
//   const [clientSignature, setClientSignature] = useState("");
//   const termsContentRef = useRef<HTMLDivElement>(null);

//   const [loadingServices, setLoadingServices] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [submissionId, setSubmissionId] = useState<number | string | null>(null);
//   const [error, setError] = useState("");
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoadingServices(true);
//     setError("");

//     try {
//       const response = await fetch(ONBOARDING_API, {
//         method: "GET",
//         headers: { Accept: "application/json" },
//       });

//       if (!response.ok) {
//         throw new Error(`Unable to load data. Status: ${response.status}`);
//       }

//       const data = await response.json();
//       const serviceData: Service[] = Array.isArray(data?.services)
//         ? data.services
//         : Array.isArray(data)
//         ? data
//         : [];

//       const normalized = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
//       const curatedServices = FALLBACK_SERVICES.map((service) => {
//         const existing = serviceData.find(
//           (item) =>
//             normalized(item.slug) === normalized(service.slug) ||
//             normalized(item.name) === normalized(service.name) ||
//             (service.slug === "stature-by-magsmen" &&
//               (normalized(item.slug) === "personalbrand" || normalized(item.name) === "personalbrand"))
//         );
//         return existing ? { ...service, id: existing.id } : service;
//       });
//       setServices(curatedServices);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setServices(FALLBACK_SERVICES);
//     } finally {
//       setLoadingServices(false);
//     }
//   };

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = event.target;
//     const checked = type === "checkbox" ? (event.target as HTMLInputElement).checked : undefined;

//     setForm((previous) => ({
//       ...previous,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     setFieldErrors((previous) => ({ ...previous, [name]: "" }));
//     setError("");
//   };

//   const filteredServices = useMemo(() => {
//     const search = serviceSearch.trim().toLowerCase();
//     if (!search) return services;
//     return services.filter(
//       (service) =>
//         service.name.toLowerCase().includes(search) ||
//         service.description.toLowerCase().includes(search)
//     );
//   }, [services, serviceSearch]);

//   const toggleService = (serviceId: number) => {
//     setSelectedServices((previous) => {
//       if (previous.includes(serviceId)) {
//         return previous.filter((id) => id !== serviceId);
//       }
//       return [...previous, serviceId];
//     });
//     setError("");
//   };

//   const validateClientDetails = (): boolean => {
//     const errors: Record<string, string> = {};
//     if (!form.name.trim()) errors.name = "Full name is required.";
//     if (!form.email.trim()) {
//       errors.email = "Email address is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
//       errors.email = "Please enter a valid email address.";
//     }
//     if (!form.mobile.trim()) {
//       errors.mobile = "Mobile number is required.";
//     } else if (!/^[+0-9\s()-]{7,20}$/.test(form.mobile.trim())) {
//       errors.mobile = "Please enter a valid mobile number.";
//     }
//     if (!form.company_name.trim()) errors.company_name = "Business/company name is required.";
//     if (!form.address.trim()) errors.address = "Business address is required.";

//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const validateServices = (): boolean => {
//     if (selectedServices.length === 0) {
//       setError("Please select at least one service.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleNext = () => {
//     setError("");
//     if (step === 1) {
//       if (!validateClientDetails()) return;
//       setStep(2);
//     } else if (step === 2) {
//       if (!validateServices()) return;
//       setStep(3);
//     } else if (step === 3) {
//       if (!termsAccepted) {
//         setError("Please accept the terms and conditions to continue.");
//         return;
//       }
//       if (!clientSignature.trim()) {
//         setError("Please enter the client's full name as a signature to continue.");
//         return;
//       }
//       setStep(4);
//     }
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleBack = () => {
//     setError("");
//     setFieldErrors({});
//     if (step === 2) setStep(1);
//     if (step === 3) setStep(2);
//     if (step === 4) setStep(3);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleSubmit = async () => {
//     setError("");
//     if (!validateClientDetails()) {
//       setStep(1);
//       return;
//     }
//     if (!validateServices()) {
//       setStep(2);
//       return;
//     }
//     if (!termsAccepted || !clientSignature.trim()) {
//       setStep(3);
//       setError("Please accept the terms and provide your signature before submitting.");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         mobile: form.mobile.trim(),
//         company_name: form.company_name.trim(),
//         address: form.address.trim(),
//         service_ids: selectedServices,
//         client_primary_contact_name: clientSignature.trim(),
//         special_confidentiality_notes: "Client accepted the NDA terms and conditions electronically during onboarding.",
//       };

//       const response = await fetch(ONBOARDING_API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         if (data.errors && typeof data.errors === "object") {
//           const djangoErrors = data.errors;
//           const readableErrors = Object.entries(djangoErrors)
//             .map(([field, messages]) => {
//               const msg = Array.isArray(messages) ? messages.join(", ") : messages;
//               return `${field}: ${msg}`;
//             })
//             .join(" | ");
//           throw new Error(readableErrors || "Please check the submitted information.");
//         }
//         throw new Error(data.detail || data.message || "Unable to submit onboarding.");
//       }

//       const id = data.id ?? data.data?.id ?? null;
//       setSubmissionId(id);
//       setSuccess(true);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       console.error("Onboarding submit error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong while submitting the onboarding."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const resetOnboarding = () => {
//     setStep(1);
//     setForm(INITIAL_FORM);
//     setSelectedServices([]);
//     setServiceSearch("");
//     setTermsAccepted(false);
//     setTermsReadToEnd(false);
//     setNdaLastPageLoaded(false);
//     setClientSignature("");
//     setError("");
//     setFieldErrors({});
//     setSubmissionId(null);
//     setSuccess(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const selectedServiceObjects = services.filter((service) =>
//     selectedServices.includes(service.id)
//   );

//   if (success) {
//     return (
//       <div
//         className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-10"
//         style={{ fontFamily: "Montserrat, sans-serif" }}
//       >
//         <div className="w-full max-w-xl">
//           <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm p-7 sm:p-10 text-center">
//             <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
//               <CheckCircle2 size={44} className="text-green-600" />
//             </div>
//             <h1 className="mt-7 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
//               Onboarding Completed
//             </h1>
//             <p className="mt-4 text-sm sm:text-base leading-7 text-gray-500">
//               Thank you for providing your details. Your client onboarding and agreement acceptance have been successfully submitted.
//             </p>
//             {submissionId && (
//               <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
//                 <Check size={14} />
//                 Reference ID: #{submissionId}
//               </div>
//             )}
//             <button
//               type="button"
//               onClick={resetOnboarding}
//               className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//             >
//               Start New Onboarding
//               <ArrowRight size={17} />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen bg-[#f7f8fa]"
//       style={{ fontFamily: "Montserrat, sans-serif" }}
//     >
//       <div className="min-h-screen flex flex-col lg:flex-row">
//         <aside className="hidden lg:flex w-[300px] xl:w-[340px] shrink-0 bg-[#111827] text-white px-8 xl:px-10 py-10 flex-col">
//           <div className="mt-20">
//             <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
//               Client Portal
//             </div>
//             <h2 className="mt-4 text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
//               Let's build
//               <br />
//               something
//               <br />
//               meaningful.
//             </h2>
//             <p className="mt-5 text-sm leading-7 text-gray-400">
//               Complete your client onboarding and NDA acceptance.
//             </p>
//           </div>

//           <div className="mt-12 space-y-6">
//             <SidebarStep number="01" title="Client Details" active={step === 1} completed={step > 1} />
//             <SidebarStep number="02" title="Engagement Outcomes" active={step === 2} completed={step > 2} />
//             <SidebarStep number="03" title="Terms & Acceptance" active={step === 3} completed={step > 3} />
//             <SidebarStep number="04" title="Review & Submit" active={step === 4} completed={false} />
//           </div>

//           <div className="mt-auto flex items-start gap-3 text-xs text-gray-500">
//             <ShieldCheck size={18} className="shrink-0" />
//             <span className="leading-5">
//               Secure enterprise data collection under NDA compliance.
//             </span>
//           </div>
//         </aside>

//         <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-bold text-lg text-gray-900">Magsmen</div>
//               <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-gray-400">
//                 Client Portal
//               </div>
//             </div>
//             <div className="text-sm font-bold text-gray-500">
//               {String(step).padStart(2, "0")}
//               <span className="text-gray-300"> / 04</span>
//             </div>
//           </div>
//           <div className="flex gap-2 mt-5">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className={`h-1 flex-1 rounded-full transition-all ${
//                   item <= step ? "bg-gray-900" : "bg-gray-200"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 py-7 sm:py-9 lg:py-12">
//           <div className="max-w-5xl mx-auto">
//             <div className="mb-7 sm:mb-9">
//               <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
//                 Step {String(step).padStart(2, "0")} of 04
//               </div>
//               <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
//                 {step === 1 && "Let's get to know your business"}
//                 {step === 2 && "Engagement Outcomes"}
//                 {step === 3 && "Terms and conditions"}
//                 {step === 4 && "Review your information"}
//               </h1>
//               <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-gray-500">
//                 {step === 1 && "Tell us a few details about yourself and your business."}
//                 {step === 2 && "Select one or more services to review the outcomes relevant to your engagement."}
//                 {step === 3 && "Review the confidentiality terms and confirm acceptance on behalf of the client."}
//                 {step === 4 && "Review all your details and agreement specifications before submitting."}
//               </p>
//             </div>

//             {error && (
//               <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
//                 <AlertCircle size={18} className="mt-0.5 shrink-0" />
//                 <div>{error}</div>
//               </div>
//             )}

//             {/* STEP 1: CLIENT DETAILS */}
//             {step === 1 && (
//               <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
//                     <User size={21} className="text-gray-700" />
//                   </div>
//                   <div>
//                     <h2 className="font-bold text-gray-900">Client Details</h2>
//                     <p className="mt-1 text-xs text-gray-500">All fields marked with * are required.</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
//                   <FormInput
//                     label="Full Name"
//                     name="name"
//                     value={form.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     icon={<User size={18} />}
//                     required
//                     error={fieldErrors.name}
//                   />
//                   <FormInput
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleInputChange}
//                     placeholder="name@company.com"
//                     icon={<Mail size={18} />}
//                     required
//                     error={fieldErrors.email}
//                   />
//                   <FormInput
//                     label="Mobile Number"
//                     name="mobile"
//                     type="tel"
//                     value={form.mobile}
//                     onChange={handleInputChange}
//                     placeholder="+91 XXXXX XXXXX"
//                     icon={<Phone size={18} />}
//                     required
//                     error={fieldErrors.mobile}
//                   />
//                   <FormInput
//                     label="Business / Company Name"
//                     name="company_name"
//                     value={form.company_name}
//                     onChange={handleInputChange}
//                     placeholder="Enter company name"
//                     icon={<Building2 size={18} />}
//                     required
//                     error={fieldErrors.company_name}
//                   />
//                   <div className="md:col-span-2">
//                     <label className="block mb-2 text-sm font-semibold text-gray-800">
//                       Business Address <span className="ml-1 text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
//                       <textarea
//                         name="address"
//                         value={form.address}
//                         onChange={handleInputChange}
//                         rows={4}
//                         placeholder="Enter your complete business address"
//                         className={`w-full resize-none rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//                           fieldErrors.address
//                             ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
//                             : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//                         }`}
//                       />
//                     </div>
//                     {fieldErrors.address && (
//                       <p className="mt-1.5 text-xs text-red-600">{fieldErrors.address}</p>
//                     )}
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* STEP 2: SERVICES SELECTION */}
//             {step === 2 && (
//               <section>
//                 <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
//                   <div className="relative w-full sm:max-w-sm">
//                     <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       value={serviceSearch}
//                       onChange={(e) => setServiceSearch(e.target.value)}
//                       placeholder="Search services..."
//                       className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
//                     />
//                   </div>
//                   <div className="flex items-center justify-between sm:justify-end gap-3">
//                     <span className="text-xs text-gray-400">{services.length} services</span>
//                     <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">
//                       {selectedServices.length} selected
//                     </span>
//                   </div>
//                 </div>

//                 {loadingServices ? (
//                   <div className="min-h-[300px] bg-white rounded-[24px] border border-gray-200 flex items-center justify-center">
//                     <div className="text-center">
//                       <Loader2 size={30} className="mx-auto animate-spin text-gray-700" />
//                       <p className="mt-4 text-sm text-gray-500">Loading services...</p>
//                     </div>
//                   </div>
//                 ) : filteredServices.length === 0 ? (
//                   <div className="bg-white rounded-[24px] border border-gray-200 p-12 text-center">
//                     <Briefcase size={38} className="mx-auto text-gray-300" />
//                     <h3 className="mt-4 font-bold text-gray-900">No services found</h3>
//                     <p className="mt-2 text-sm text-gray-500">Try a different search.</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     {filteredServices.map((service, index) => {
//                       const selected = selectedServices.includes(service.id);
//                       return (
//                         <button
//                           key={service.id}
//                           type="button"
//                           onClick={() => toggleService(service.id)}
//                           className={`group relative w-full text-left rounded-[22px] border p-6 sm:p-7 transition-all duration-200 ${
//                             selected
//                               ? "border-gray-900 bg-gray-900 shadow-lg shadow-gray-900/10"
//                               : "border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400">
//                               {String(service.display_order ?? index + 1).padStart(2, "0")}
//                             </span>
//                             <span
//                               className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${
//                                 selected
//                                   ? "border-white bg-white text-gray-900"
//                                   : "border-gray-300 text-transparent group-hover:border-gray-500"
//                               }`}
//                             >
//                               <Check size={16} strokeWidth={2.5} />
//                             </span>
//                           </div>
//                           <div className="mt-8">
//                             <h3 className={`text-lg font-bold ${selected ? "text-white" : "text-gray-900"}`}>
//                               {service.name}
//                             </h3>
//                             <ul className={`mt-3 space-y-2 text-sm leading-6 ${selected ? "text-gray-300" : "text-gray-500"}`}>
//                               {getServiceOutcomes(service).map((outcome) => (
//                                 <li key={outcome} className="flex items-start gap-2">
//                                   <Check size={15} className="mt-1 shrink-0" />
//                                   <span>{outcome}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                           {selected && (
//                             <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300">
//                               <Check size={13} />
//                               Selected
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </section>
//             )}

//             {/* STEP 3: TERMS AND ACCEPTANCE */}
//             {step === 3 && (
//               <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9 space-y-6">
//                 <div className="flex items-center gap-4 mb-2">
//                   <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
//                     <FileText size={21} className="text-gray-700" />
//                   </div>
//                   <div>
//                     <h2 className="font-bold text-gray-900">Non-Disclosure Agreement</h2>
//                     <p className="mt-1 text-xs text-gray-500">Review every page of the Grofesion Innovations Private Limited NDA.</p>
//                     <a href={NDA_PDF_URL} download className="mt-2 inline-flex text-xs font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-900">Download the complete NDA</a>
//                   </div>
//                 </div>
//                 <div
//                   ref={termsContentRef}
//                   onScroll={(event) => {
//                     const panel = event.currentTarget;
//                     if (ndaLastPageLoaded && panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 8) {
//                       setTermsReadToEnd(true);
//                     }
//                   }}
//                   className="max-h-[60vh] min-h-[45vh] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-5"
//                 >
//                   <div className="sticky top-0 z-10 mb-3 flex justify-between rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm backdrop-blur">
//                     <span>Complete Non-Disclosure Agreement</span>
//                     <span>{NDA_PAGE_COUNT} pages</span>
//                   </div>
//                   <div className="flex flex-col items-center gap-3">
//                     {Array.from({ length: NDA_PAGE_COUNT }, (_, index) => {
//                       const pageNumber = index + 1;
//                       const pageUrl = `${import.meta.env.BASE_URL}nda-pages/nda-page-${String(pageNumber).padStart(2, "0")}.jpg`;
//                       return (
//                         <img
//                           key={`nda-page-${pageNumber}`}
//                           src={pageUrl}
//                           alt={`Non-Disclosure Agreement page ${pageNumber} of ${NDA_PAGE_COUNT}`}
//                           width={1604}
//                           height={2200}
//                           loading="lazy"
//                           decoding="async"
//                           onLoad={() => {
//                             if (pageNumber === NDA_PAGE_COUNT) {
//                               setNdaLastPageLoaded(true);
//                               const panel = termsContentRef.current;
//                               if (panel && panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 8) {
//                                 setTermsReadToEnd(true);
//                               }
//                             }
//                           }}
//                           className="block h-auto w-full max-w-[820px] rounded-md bg-white shadow-sm"
//                         />
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <label className={`flex items-start gap-3 rounded-xl border border-gray-200 p-4 ${termsReadToEnd ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}>
//                   <input
//                     type="checkbox"
//                     checked={termsAccepted}
//                     disabled={!termsReadToEnd}
//                     onChange={(event) => {
//                       setTermsAccepted(event.target.checked);
//                       setError("");
//                     }}
//                     className="mt-1 h-5 w-5 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
//                   />
//                   <span className="text-sm leading-6 text-gray-800">
//                     I have read and agree to the terms and conditions of the Non-Disclosure Agreement.
//                     {!termsReadToEnd && <span className="mt-1 block text-xs text-gray-500">Scroll to the end of the terms to enable acceptance.</span>}
//                   </span>
//                 </label>

//                 {termsAccepted && <div>
//                   <label htmlFor="client_signature" className="block mb-2 text-sm font-semibold text-gray-800">Signature of the client by acceptance <span className="text-red-500">*</span></label>
//                   <input
//                     id="client_signature"
//                     type="text"
//                     value={clientSignature}
//                     onChange={(event) => {
//                       setClientSignature(event.target.value);
//                       setError("");
//                     }}
//                     placeholder="Type the client's full legal name"
//                     autoComplete="name"
//                     className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-900/5"
//                   />
//                   <p className="mt-2 text-xs text-gray-500">Typing your name records your electronic acceptance.</p>
//                 </div>}
//               </section>
//             )}

//             {/* STEP 4: REVIEW & SUBMIT */}
//             {step === 4 && (
//               <section className="space-y-5">
//                 <ReviewCard title="Client Details" icon={<User size={19} />} onEdit={() => setStep(1)}>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//                     <ReviewItem label="Full Name" value={form.name} />
//                     <ReviewItem label="Email Address" value={form.email} />
//                     <ReviewItem label="Mobile Number" value={form.mobile} />
//                     <ReviewItem label="Business / Company" value={form.company_name} />
//                     <div className="sm:col-span-2">
//                       <ReviewItem label="Business Address" value={form.address} />
//                     </div>
//                   </div>
//                 </ReviewCard>

//                 <ReviewCard title="Selected Services" icon={<Briefcase size={19} />} onEdit={() => setStep(2)}>
//                   <div className="space-y-4">
//                     {selectedServiceObjects.map((service) => (
//                       <div key={service.id} className="rounded-xl bg-gray-50 p-4">
//                         <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
//                           <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center"><Check size={12} /></span>
//                           {service.name}
//                         </div>
//                         <ul className="mt-3 space-y-1.5 text-sm leading-6 text-gray-600">
//                           {getServiceOutcomes(service).map((outcome) => <li key={outcome}>• {outcome}</li>)}
//                         </ul>
//                       </div>
//                     ))}
//                   </div>
//                 </ReviewCard>

//                 <ReviewCard title="Terms and Client Acceptance" icon={<FileText size={19} />} onEdit={() => setStep(3)}>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//                     <ReviewItem label="Terms and conditions" value={termsAccepted ? "Accepted" : "Not accepted"} />
//                     <ReviewItem label="Client signature by acceptance" value={clientSignature || "—"} />
//                     <div className="sm:col-span-2 mt-3">
//                       <a href={NDA_PDF_URL} download className="text-sm font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-900">Download the complete NDA</a>
//                     </div>
//                   </div>
//                 </ReviewCard>
//               </section>
//             )}

//             {/* NAVIGATION BUTTONS */}
//             <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
//               {step > 1 ? (
//                 <button
//                   type="button"
//                   onClick={handleBack}
//                   disabled={submitting}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400 disabled:opacity-50"
//                 >
//                   <ArrowLeft size={17} />
//                   Back
//                 </button>
//               ) : (
//                 <div />
//               )}

//               {step < 4 ? (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//                 >
//                   Continue
//                   <ArrowRight size={17} />
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={submitting}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 size={17} className="animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       Submit Onboarding
//                       <Check size={17} />
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// /* Helper Components */
// type FormInputProps = {
//   label: string;
//   name: string;
//   type?: string;
//   value: string;
//   placeholder: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   icon: React.ReactNode;
//   required?: boolean;
//   error?: string;
// };

// const FormInput: React.FC<FormInputProps> = ({ label, name, type = "text", value, placeholder, onChange, icon, required, error }) => (
//   <div>
//     <label className="block mb-2 text-sm font-semibold text-gray-800">
//       {label}
//       {required && <span className="ml-1 text-red-500">*</span>}
//     </label>
//     <div className="relative">
//       <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         autoComplete="off"
//         className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//           error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//         }`}
//       />
//     </div>
//     {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
//   </div>
// );

// type SidebarStepProps = { number: string; title: string; active: boolean; completed: boolean };
// const SidebarStep: React.FC<SidebarStepProps> = ({ number, title, active, completed }) => (
//   <div className="flex items-center gap-4">
//     <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${active || completed ? "bg-white text-gray-900" : "border border-gray-700 text-gray-500"}`}>
//       {completed ? <Check size={17} /> : number}
//     </div>
//     <div className={`text-sm font-semibold ${active ? "text-white" : "text-gray-500"}`}>{title}</div>
//   </div>
// );

// type ReviewCardProps = { title: string; icon: React.ReactNode; children: React.ReactNode; onEdit: () => void };
// const ReviewCard: React.FC<ReviewCardProps> = ({ title, icon, children, onEdit }) => (
//   <div className="rounded-[22px] border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
//     <div className="flex items-center justify-between gap-4 mb-6">
//       <div className="flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">{icon}</div>
//         <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
//       </div>
//       <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900">
//         <Pencil size={14} /> Edit
//       </button>
//     </div>
//     {children}
//   </div>
// );

// type ReviewItemProps = { label: string; value: string };
// const ReviewItem: React.FC<ReviewItemProps> = ({ label, value }) => (
//   <div className="border-b border-gray-100 py-4 last:border-0">
//     <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gray-400">{label}</div>
//     <div className="mt-1.5 text-sm font-medium leading-6 text-gray-900 whitespace-pre-line break-words">{value || "—"}</div>
//   </div>
// );

// export default ClientOnboarding;
















// import React, { useEffect, useMemo, useState } from "react";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Check,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   User,
//   Mail,
//   Phone,
//   Building2,
//   MapPin,
//   Briefcase,
//   Search,
//   Pencil,
//   ShieldCheck,
// } from "lucide-react";

// /* =========================================================
//    TYPES
// ========================================================= */

// type Step = 1 | 2 | 3;

// type ClientForm = {
//   name: string;
//   email: string;
//   mobile: string;
//   company_name: string;
//   address: string;
// };

// type Service = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   is_active?: boolean;
//   display_order?: number;
// };

// type ApiError = {
//   detail?: string;
//   message?: string;
//   errors?: Record<string, string[] | string>;
// };


// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API_BASE_URL =
//   (import.meta.env.VITE_API_BASE_URL as string) ||
//   "http://localhost:8000/api";

// const SERVICES_API =
//   `${API_BASE_URL}/client-onboarding/services/`;

// const ONBOARDING_API =
//   `${API_BASE_URL}/client-onboarding/`;


// /* =========================================================
//    FALLBACK SERVICES
//    Used only if API doesn't return services.
// ========================================================= */

// const FALLBACK_SERVICES: Service[] = [
//   {
//     id: 1,
//     name: "Brand Creation",
//     slug: "brand-creation",
//     description:
//       "Build a strong and distinctive brand foundation for your business.",
//     display_order: 1,
//   },
//   {
//     id: 2,
//     name: "Brand Audit",
//     slug: "brand-audit",
//     description:
//       "Evaluate your existing brand and identify opportunities for improvement.",
//     display_order: 2,
//   },
//   {
//     id: 3,
//     name: "Corporate Rebranding",
//     slug: "corporate-rebranding",
//     description:
//       "Transform and reposition your corporate brand for the next stage of growth.",
//     display_order: 3,
//   },
//   {
//     id: 4,
//     name: "Personal Brand",
//     slug: "personal-brand",
//     description:
//       "Build a clear and credible personal brand that represents your expertise.",
//     display_order: 4,
//   },
//   {
//     id: 5,
//     name: "LinkFluence",
//     slug: "linkfluence",
//     description:
//       "Strengthen your professional presence and brand influence across networks.",
//     display_order: 5,
//   },
//   {
//     id: 6,
//     name: "Brand Expresso",
//     slug: "brand-expresso",
//     description:
//       "Get focused brand guidance and practical strategic direction.",
//     display_order: 6,
//   },
//   {
//     id: 7,
//     name: "OTC — One Time Consulting",
//     slug: "otc-one-time-consulting",
//     description:
//       "Get strategic consulting support for a specific business requirement.",
//     display_order: 7,
//   },
//   {
//     id: 8,
//     name: "Legal & IP Consulting",
//     slug: "legal-ip-consulting",
//     description:
//       "Get strategic guidance around intellectual property and brand-related legal needs.",
//     display_order: 8,
//   },
// ];


// /* =========================================================
//    INITIAL FORM
// ========================================================= */

// const INITIAL_FORM: ClientForm = {
//   name: "",
//   email: "",
//   mobile: "",
//   company_name: "",
//   address: "",
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const ClientOnboarding: React.FC = () => {
//   const [step, setStep] = useState<Step>(1);
//   const [form, setForm] = useState<ClientForm>(INITIAL_FORM);
//   const [services, setServices] = useState<Service[]>([]);
//   const [selectedServices, setSelectedServices] = useState<number[]>([]);
//   const [serviceSearch, setServiceSearch] = useState("");

//   const [loadingServices, setLoadingServices] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [submissionId, setSubmissionId] = useState<number | string | null>(null);
//   const [error, setError] = useState("");
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     setLoadingServices(true);
//     setError("");

//     try {
//       const response = await fetch(SERVICES_API, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Unable to load services. Status: ${response.status}`
//         );
//       }

//       const data = await response.json();
//       const serviceData: Service[] =
//         Array.isArray(data)
//           ? data
//           : Array.isArray(data?.results)
//             ? data.results
//             : [];

//       if (serviceData.length > 0) {
//         setServices(serviceData);
//       } else {
//         setServices(FALLBACK_SERVICES);
//       }
//     } catch (err) {
//       console.error("Service fetch error:", err);
//       setServices(FALLBACK_SERVICES);
//     } finally {
//       setLoadingServices(false);
//     }
//   };

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setFieldErrors((previous) => ({
//       ...previous,
//       [name]: "",
//     }));

//     setError("");
//   };

//   const filteredServices = useMemo(() => {
//     const search = serviceSearch.trim().toLowerCase();
//     if (!search) {
//       return services;
//     }

//     return services.filter(
//       (service) =>
//         service.name.toLowerCase().includes(search) ||
//         service.description.toLowerCase().includes(search)
//     );
//   }, [services, serviceSearch]);

//   const toggleService = (serviceId: number) => {
//     setSelectedServices((previous) => {
//       if (previous.includes(serviceId)) {
//         return previous.filter((id) => id !== serviceId);
//       }
//       return [...previous, serviceId];
//     });

//     setError("");
//   };

//   const validateClientDetails = (): boolean => {
//     const errors: Record<string, string> = {};
//     const name = form.name.trim();
//     const email = form.email.trim();
//     const mobile = form.mobile.trim();
//     const company = form.company_name.trim();
//     const address = form.address.trim();

//     if (!name) errors.name = "Full name is required.";
//     if (!email) {
//       errors.email = "Email address is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       errors.email = "Please enter a valid email address.";
//     }

//     if (!mobile) {
//       errors.mobile = "Mobile number is required.";
//     } else if (!/^[+0-9\s()-]{7,20}$/.test(mobile)) {
//       errors.mobile = "Please enter a valid mobile number.";
//     }

//     if (!company) errors.company_name = "Business/company name is required.";
//     if (!address) errors.address = "Business address is required.";

//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const validateServices = (): boolean => {
//     if (selectedServices.length === 0) {
//       setError("Please select at least one service.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleNext = () => {
//     setError("");
//     if (step === 1) {
//       if (!validateClientDetails()) return;
//       setStep(2);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     if (step === 2) {
//       if (!validateServices()) return;
//       setStep(3);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }
//   };

//   const handleBack = () => {
//     setError("");
//     setFieldErrors({});
//     if (step === 2) setStep(1);
//     if (step === 3) setStep(2);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const editClientDetails = () => {
//     setStep(1);
//     setError("");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const editServices = () => {
//     setStep(2);
//     setError("");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleSubmit = async () => {
//     setError("");

//     if (!validateClientDetails()) {
//       setStep(1);
//       return;
//     }

//     if (!validateServices()) {
//       setStep(2);
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         mobile: form.mobile.trim(),
//         company_name: form.company_name.trim(),
//         address: form.address.trim(),
//         service_ids: selectedServices,
//       };

//       const response = await fetch(ONBOARDING_API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data: ApiError & {
//         id?: number | string;
//         data?: { id?: number | string };
//       } = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         if (data.errors && typeof data.errors === "object") {
//           const djangoErrors = data.errors;
//           const readableErrors = Object.entries(djangoErrors)
//             .map(([field, messages]) => {
//               const message = Array.isArray(messages)
//                 ? messages.join(", ")
//                 : messages;
//               return `${field}: ${message}`;
//             })
//             .join(" | ");

//           throw new Error(readableErrors || "Please check the submitted information.");
//         }

//         throw new Error(
//           data.detail || data.message || "Unable to submit onboarding."
//         );
//       }

//       const id = data.id ?? data.data?.id ?? null;
//       setSubmissionId(id);
//       setSuccess(true);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (err) {
//       console.error("Onboarding submit error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong while submitting the onboarding."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const resetOnboarding = () => {
//     setStep(1);
//     setForm(INITIAL_FORM);
//     setSelectedServices([]);
//     setServiceSearch("");
//     setError("");
//     setFieldErrors({});
//     setSubmissionId(null);
//     setSuccess(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const selectedServiceObjects = services.filter((service) =>
//     selectedServices.includes(service.id)
//   );

//   if (success) {
//     return (
//       <div
//         className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-10"
//         style={{ fontFamily: "Montserrat, sans-serif" }}
//       >
//         <div className="w-full max-w-xl">
//           <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm p-7 sm:p-10 text-center">
//             <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
//               <CheckCircle2 size={44} className="text-green-600" />
//             </div>
//             <h1 className="mt-7 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
//               Onboarding Completed
//             </h1>
//             <p className="mt-4 text-sm sm:text-base leading-7 text-gray-500">
//               Thank you for providing your details. Your client onboarding
//               information has been successfully submitted to our team.
//             </p>
//             {submissionId && (
//               <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
//                 <Check size={14} />
//                 Reference ID: #{submissionId}
//               </div>
//             )}
//             <button
//               type="button"
//               onClick={resetOnboarding}
//               className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//             >
//               Start New Onboarding
//               <ArrowRight size={17} />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen bg-[#f7f8fa]"
//       style={{ fontFamily: "Montserrat, sans-serif" }}
//     >
//       <div className="min-h-screen flex flex-col lg:flex-row">
//         <aside className="hidden lg:flex w-[300px] xl:w-[340px] shrink-0 bg-[#111827] text-white px-8 xl:px-10 py-10 flex-col">
//           <div className="mt-20">
//             <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
//               Client Onboarding
//             </div>
//             <h2 className="mt-4 text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
//               Let's build
//               <br />
//               something
//               <br />
//               meaningful.
//             </h2>
//             <p className="mt-5 text-sm leading-7 text-gray-400">
//               Share your business details, choose the services you need, and submit
//               your onboarding request.
//             </p>
//           </div>

//           <div className="mt-14 space-y-8">
//             <SidebarStep
//               number="01"
//               title="Client Details"
//               active={step === 1}
//               completed={step > 1}
//             />
//             <SidebarStep
//               number="02"
//               title="Select Services"
//               active={step === 2}
//               completed={step > 2}
//             />
//             <SidebarStep
//               number="03"
//               title="Review & Submit"
//               active={step === 3}
//               completed={false}
//             />
//           </div>

//           <div className="mt-auto flex items-start gap-3 text-xs text-gray-500">
//             <ShieldCheck size={18} className="shrink-0" />
//             <span className="leading-5">
//               Your information is securely collected and used for client
//               onboarding.
//             </span>
//           </div>
//         </aside>

//         <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-5">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="font-bold text-lg text-gray-900">Magsmen</div>
//               <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-gray-400">
//                 Client Onboarding
//               </div>
//             </div>
//             <div className="text-sm font-bold text-gray-500">
//               {String(step).padStart(2, "0")}
//               <span className="text-gray-300"> / 03</span>
//             </div>
//           </div>
//           <div className="flex gap-2 mt-5">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className={`h-1 flex-1 rounded-full transition-all ${
//                   item <= step ? "bg-gray-900" : "bg-gray-200"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 py-7 sm:py-9 lg:py-12">
//           <div className="max-w-5xl mx-auto">
//             <div className="mb-7 sm:mb-9">
//               <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
//                 Step {String(step).padStart(2, "0")} of 03
//               </div>
//               <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
//                 {step === 1 && "Let's get to know your business"}
//                 {step === 2 && "Choose your services"}
//                 {step === 3 && "Review your information"}
//               </h1>
//               <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-gray-500">
//                 {step === 1 && "Tell us a few details about yourself and your business."}
//                 {step === 2 && "Select one or more services you would like our team to provide."}
//                 {step === 3 && "Review your details and selected services before submitting."}
//               </p>
//             </div>

//             {error && (
//               <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
//                 <AlertCircle size={18} className="mt-0.5 shrink-0" />
//                 <div>{error}</div>
//               </div>
//             )}

//             {step === 1 && (
//               <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
//                     <User size={21} className="text-gray-700" />
//                   </div>
//                   <div>
//                     <h2 className="font-bold text-gray-900">Client Details</h2>
//                     <p className="mt-1 text-xs text-gray-500">
//                       All fields marked with * are required.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
//                   <FormInput
//                     label="Full Name"
//                     name="name"
//                     value={form.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your full name"
//                     icon={<User size={18} />}
//                     required
//                     error={fieldErrors.name}
//                   />

//                   <FormInput
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleInputChange}
//                     placeholder="name@company.com"
//                     icon={<Mail size={18} />}
//                     required
//                     error={fieldErrors.email}
//                   />

//                   <FormInput
//                     label="Mobile Number"
//                     name="mobile"
//                     type="tel"
//                     value={form.mobile}
//                     onChange={handleInputChange}
//                     placeholder="+91 XXXXX XXXXX"
//                     icon={<Phone size={18} />}
//                     required
//                     error={fieldErrors.mobile}
//                   />

//                   <FormInput
//                     label="Business / Company Name"
//                     name="company_name"
//                     value={form.company_name}
//                     onChange={handleInputChange}
//                     placeholder="Enter company name"
//                     icon={<Building2 size={18} />}
//                     required
//                     error={fieldErrors.company_name}
//                   />

//                   <div className="md:col-span-2">
//                     <label className="block mb-2 text-sm font-semibold text-gray-800">
//                       Business Address <span className="ml-1 text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
//                       <textarea
//                         name="address"
//                         value={form.address}
//                         onChange={handleInputChange}
//                         rows={4}
//                         placeholder="Enter your complete business address"
//                         className={`w-full resize-none rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//                           fieldErrors.address
//                             ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
//                             : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//                         }`}
//                       />
//                     </div>
//                     {fieldErrors.address && (
//                       <p className="mt-1.5 text-xs text-red-600">
//                         {fieldErrors.address}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </section>
//             )}

//             {step === 2 && (
//               <section>
//                 <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
//                   <div className="relative w-full sm:max-w-sm">
//                     <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       value={serviceSearch}
//                       onChange={(event) => setServiceSearch(event.target.value)}
//                       placeholder="Search services..."
//                       className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
//                     />
//                   </div>
//                   <div className="flex items-center justify-between sm:justify-end gap-3">
//                     <span className="text-xs text-gray-400">
//                       {services.length} services
//                     </span>
//                     <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">
//                       {selectedServices.length} selected
//                     </span>
//                   </div>
//                 </div>

//                 {loadingServices ? (
//                   <div className="min-h-[300px] bg-white rounded-[24px] border border-gray-200 flex items-center justify-center">
//                     <div className="text-center">
//                       <Loader2 size={30} className="mx-auto animate-spin text-gray-700" />
//                       <p className="mt-4 text-sm text-gray-500">Loading services...</p>
//                     </div>
//                   </div>
//                 ) : filteredServices.length === 0 ? (
//                   <div className="bg-white rounded-[24px] border border-gray-200 p-12 text-center">
//                     <Briefcase size={38} className="mx-auto text-gray-300" />
//                     <h3 className="mt-4 font-bold text-gray-900">No services found</h3>
//                     <p className="mt-2 text-sm text-gray-500">Try a different search.</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                     {filteredServices.map((service, index) => {
//                       const selected = selectedServices.includes(service.id);
//                       return (
//                         <button
//                           key={service.id}
//                           type="button"
//                           onClick={() => toggleService(service.id)}
//                           className={`group relative w-full text-left rounded-[22px] border p-6 sm:p-7 transition-all duration-200 ${
//                             selected
//                               ? "border-gray-900 bg-gray-900 shadow-lg shadow-gray-900/10"
//                               : "border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md"
//                           }`}
//                         >
//                           <div className="flex items-center justify-between">
//                             <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400">
//                               {String(service.display_order ?? index + 1).padStart(2, "0")}
//                             </span>
//                             <span
//                               className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${
//                                 selected
//                                   ? "border-white bg-white text-gray-900"
//                                   : "border-gray-300 text-transparent group-hover:border-gray-500"
//                               }`}
//                             >
//                               <Check size={16} strokeWidth={2.5} />
//                             </span>
//                           </div>
//                           <div className="mt-8">
//                             <h3 className={`text-lg font-bold ${selected ? "text-white" : "text-gray-900"}`}>
//                               {service.name}
//                             </h3>
//                             <p className={`mt-2 text-sm leading-6 ${selected ? "text-gray-300" : "text-gray-500"}`}>
//                               {service.description}
//                             </p>
//                           </div>
//                           {selected && (
//                             <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300">
//                               <Check size={13} />
//                               Selected
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}

//                 {selectedServices.length > 0 && (
//                   <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                       <div>
//                         <div className="text-sm font-bold text-gray-900">
//                           Selected Services
//                         </div>
//                         <div className="mt-1 text-xs text-gray-500">
//                           You can select multiple services.
//                         </div>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => setSelectedServices([])}
//                         className="text-xs font-semibold text-gray-500 hover:text-gray-900"
//                       >
//                         Clear all
//                       </button>
//                     </div>
//                     <div className="mt-4 flex flex-wrap gap-2">
//                       {selectedServiceObjects.map((service) => (
//                         <button
//                           key={service.id}
//                           type="button"
//                           onClick={() => toggleService(service.id)}
//                           className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3.5 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-200"
//                         >
//                           <Check size={13} />
//                           {service.name}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </section>
//             )}

//             {step === 3 && (
//               <section className="space-y-5">
//                 <ReviewCard
//                   title="Client Details"
//                   icon={<User size={19} />}
//                   onEdit={editClientDetails}
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
//                     <ReviewItem label="Full Name" value={form.name} />
//                     <ReviewItem label="Email Address" value={form.email} />
//                     <ReviewItem label="Mobile Number" value={form.mobile} />
//                     <ReviewItem label="Business / Company" value={form.company_name} />
//                     <div className="sm:col-span-2">
//                       <ReviewItem label="Business Address" value={form.address} />
//                     </div>
//                   </div>
//                 </ReviewCard>

//                 <ReviewCard
//                   title="Selected Services"
//                   icon={<Briefcase size={19} />}
//                   onEdit={editServices}
//                 >
//                   <div className="flex flex-wrap gap-3">
//                     {selectedServiceObjects.map((service) => (
//                       <div
//                         key={service.id}
//                         className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-800"
//                       >
//                         <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
//                           <Check size={12} />
//                         </span>
//                         {service.name}
//                       </div>
//                     ))}
//                   </div>
//                 </ReviewCard>

//                 <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
//                   <div className="flex items-start gap-3">
//                     <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
//                       <ShieldCheck size={18} className="text-gray-700" />
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-bold text-gray-900">
//                         Ready to submit?
//                       </h3>
//                       <p className="mt-1 text-xs sm:text-sm leading-6 text-gray-500">
//                         Please make sure the information above is correct. Once submitted,
//                         your onboarding request will be sent to our team.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             )}

//             <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
//               {step > 1 ? (
//                 <button
//                   type="button"
//                   onClick={handleBack}
//                   disabled={submitting}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400 disabled:opacity-50"
//                 >
//                   <ArrowLeft size={17} />
//                   Back
//                 </button>
//               ) : (
//                 <div />
//               )}

//               {step < 3 ? (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//                 >
//                   Continue
//                   <ArrowRight size={17} />
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   disabled={submitting}
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 size={17} className="animate-spin" />
//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       Submit Onboarding
//                       <Check size={17} />
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>

//             <div className="lg:hidden mt-8 flex items-center justify-center gap-2 text-[11px] text-gray-400">
//               <ShieldCheck size={15} />
//               Your information is securely collected.
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// type FormInputProps = {
//   label: string;
//   name: string;
//   type?: string;
//   value: string;
//   placeholder: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   icon: React.ReactNode;
//   required?: boolean;
//   error?: string;
// };

// const FormInput: React.FC<FormInputProps> = ({
//   label,
//   name,
//   type = "text",
//   value,
//   placeholder,
//   onChange,
//   icon,
//   required,
//   error,
// }) => {
//   return (
//     <div>
//       <label className="block mb-2 text-sm font-semibold text-gray-800">
//         {label}
//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>
//       <div className="relative">
//         <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//           {icon}
//         </div>
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           autoComplete="off"
//           className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//             error
//               ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
//               : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//           }`}
//         />
//       </div>
//       {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
//     </div>
//   );
// };

// type SidebarStepProps = {
//   number: string;
//   title: string;
//   active: boolean;
//   completed: boolean;
// };

// const SidebarStep: React.FC<SidebarStepProps> = ({
//   number,
//   title,
//   active,
//   completed,
// }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
//           active || completed
//             ? "bg-white text-gray-900"
//             : "border border-gray-700 text-gray-500"
//         }`}
//       >
//         {completed ? <Check size={17} /> : number}
//       </div>
//       <div>
//         <div
//           className={`text-sm font-semibold ${
//             active ? "text-white" : "text-gray-500"
//           }`}
//         >
//           {title}
//         </div>
//       </div>
//     </div>
//   );
// };

// type ReviewCardProps = {
//   title: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
//   onEdit: () => void;
// };

// const ReviewCard: React.FC<ReviewCardProps> = ({
//   title,
//   icon,
//   children,
//   onEdit,
// }) => {
//   return (
//     <div className="rounded-[22px] border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">
//       <div className="flex items-center justify-between gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
//             {icon}
//           </div>
//           <h2 className="text-base sm:text-lg font-bold text-gray-900">
//             {title}
//           </h2>
//         </div>
//         <button
//           type="button"
//           onClick={onEdit}
//           className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
//         >
//           <Pencil size={14} />
//           Edit
//         </button>
//       </div>
//       {children}
//     </div>
//   );
// };

// type ReviewItemProps = {
//   label: string;
//   value: string;
// };

// const ReviewItem: React.FC<ReviewItemProps> = ({ label, value }) => {
//   return (
//     <div className="border-b border-gray-100 py-4 last:border-0">
//       <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
//         {label}
//       </div>
//       <div className="mt-1.5 text-sm font-medium leading-6 text-gray-900 whitespace-pre-line break-words">
//         {value || "—"}
//       </div>
//     </div>
//   );
// };

// export default ClientOnboarding;



// import React, { useEffect, useMemo, useState } from "react";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Check,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   User,
//   Mail,
//   Phone,
//   Building2,
//   MapPin,
//   Briefcase,
//   Search,
//   Pencil,
//   ShieldCheck,
// } from "lucide-react";

// /* =========================================================
//    TYPES
// ========================================================= */

// type Step = 1 | 2 | 3;

// type ClientForm = {
//   name: string;
//   email: string;
//   mobile: string;
//   company_name: string;
//   address: string;
// };

// type Service = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   is_active?: boolean;
//   display_order?: number;
// };

// type ApiError = {
//   detail?: string;
//   message?: string;
//   errors?: Record<string, string[] | string>;
// };


// /* =========================================================
//    API CONFIG
// ========================================================= */

// const API_BASE_URL =
//   (import.meta.env.VITE_API_BASE_URL as string) ||
//   "http://localhost:8000/api";

// const SERVICES_API =
//   `${API_BASE_URL}/client-onboarding/services/`;

// const ONBOARDING_API =
//   `${API_BASE_URL}/client-onboarding/`;


// /* =========================================================
//    FALLBACK SERVICES
//    Used only if API doesn't return services.
//    Once Django API works, API data will be used.
// ========================================================= */

// const FALLBACK_SERVICES: Service[] = [
//   {
//     id: 1,
//     name: "Brand Creation",
//     slug: "brand-creation",
//     description:
//       "Build a strong and distinctive brand foundation for your business.",
//     display_order: 1,
//   },
//   {
//     id: 2,
//     name: "Brand Audit",
//     slug: "brand-audit",
//     description:
//       "Evaluate your existing brand and identify opportunities for improvement.",
//     display_order: 2,
//   },
//   {
//     id: 3,
//     name: "Corporate Rebranding",
//     slug: "corporate-rebranding",
//     description:
//       "Transform and reposition your corporate brand for the next stage of growth.",
//     display_order: 3,
//   },
//   {
//     id: 4,
//     name: "Personal Brand",
//     slug: "personal-brand",
//     description:
//       "Build a clear and credible personal brand that represents your expertise.",
//     display_order: 4,
//   },
//   {
//     id: 5,
//     name: "LinkFluence",
//     slug: "linkfluence",
//     description:
//       "Strengthen your professional presence and brand influence across networks.",
//     display_order: 5,
//   },
//   {
//     id: 6,
//     name: "Brand Expresso",
//     slug: "brand-expresso",
//     description:
//       "Get focused brand guidance and practical strategic direction.",
//     display_order: 6,
//   },
//   {
//     id: 7,
//     name: "OTC — One Time Consulting",
//     slug: "otc-one-time-consulting",
//     description:
//       "Get strategic consulting support for a specific business requirement.",
//     display_order: 7,
//   },
//   {
//     id: 8,
//     name: "Legal & IP Consulting",
//     slug: "legal-ip-consulting",
//     description:
//       "Get strategic guidance around intellectual property and brand-related legal needs.",
//     display_order: 8,
//   },
// ];


// /* =========================================================
//    INITIAL FORM
// ========================================================= */

// const INITIAL_FORM: ClientForm = {
//   name: "",
//   email: "",
//   mobile: "",
//   company_name: "",
//   address: "",
// };


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// const ClientOnboarding: React.FC = () => {
//   /* -------------------------------------------------------
//      STEP
//   ------------------------------------------------------- */

//   const [step, setStep] = useState<Step>(1);


//   /* -------------------------------------------------------
//      CLIENT FORM
//   ------------------------------------------------------- */

//   const [form, setForm] =
//     useState<ClientForm>(INITIAL_FORM);


//   /* -------------------------------------------------------
//      SERVICES
//   ------------------------------------------------------- */

//   const [services, setServices] =
//     useState<Service[]>([]);

//   const [selectedServices, setSelectedServices] =
//     useState<number[]>([]);

//   const [serviceSearch, setServiceSearch] =
//     useState("");


//   /* -------------------------------------------------------
//      UI STATES
//   ------------------------------------------------------- */

//   const [loadingServices, setLoadingServices] =
//     useState(true);

//   const [submitting, setSubmitting] =
//     useState(false);

//   const [success, setSuccess] =
//     useState(false);

//   const [submissionId, setSubmissionId] =
//     useState<number | string | null>(null);

//   const [error, setError] =
//     useState("");

//   const [fieldErrors, setFieldErrors] =
//     useState<Record<string, string>>({});


//   /* =======================================================
//      FETCH SERVICES
//   ======================================================= */

//   useEffect(() => {
//     fetchServices();
//   }, []);


//   const fetchServices = async () => {
//     setLoadingServices(true);
//     setError("");

//     try {
//       const response = await fetch(
//         SERVICES_API,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(
//           `Unable to load services. Status: ${response.status}`
//         );
//       }

//       const data = await response.json();

//       /*
//         Supports:

//         [
//           {...},
//           {...}
//         ]

//         OR

//         {
//           results: [...]
//         }
//       */

//       const serviceData: Service[] =
//         Array.isArray(data)
//           ? data
//           : Array.isArray(data?.results)
//             ? data.results
//             : [];

//       if (serviceData.length > 0) {
//         setServices(serviceData);
//       } else {
//         setServices(FALLBACK_SERVICES);
//       }

//     } 
    
//     catch (err) {
//       console.error(
//         "Service fetch error:",
//         err
//       );

//       /*
//         UI remains functional even if
//         Django API is temporarily unavailable.
//       */

//       setServices(FALLBACK_SERVICES);

//     //   setError(
//     //     "Services could not be loaded from the server. Default services are being shown."
//     //   );
//     } finally {
//       setLoadingServices(false);
//     }
//   };


//   /* =======================================================
//      FORM CHANGE
//   ======================================================= */

//   const handleInputChange = (
//     event:
//       React.ChangeEvent<
//         HTMLInputElement | HTMLTextAreaElement
//       >
//   ) => {
//     const {
//       name,
//       value,
//     } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     /*
//       Remove field-specific error
//       once user starts correcting it.
//     */

//     setFieldErrors((previous) => ({
//       ...previous,
//       [name]: "",
//     }));

//     setError("");
//   };


//   /* =======================================================
//      SERVICE SEARCH
//   ======================================================= */

//   const filteredServices = useMemo(() => {
//     const search =
//       serviceSearch
//         .trim()
//         .toLowerCase();

//     if (!search) {
//       return services;
//     }

//     return services.filter(
//       (service) =>
//         service.name
//           .toLowerCase()
//           .includes(search) ||
//         service.description
//           .toLowerCase()
//           .includes(search)
//     );
//   }, [
//     services,
//     serviceSearch,
//   ]);


//   /* =======================================================
//      SERVICE SELECTION
//   ======================================================= */

//   const toggleService = (
//     serviceId: number
//   ) => {
//     setSelectedServices((previous) => {
//       if (
//         previous.includes(serviceId)
//       ) {
//         return previous.filter(
//           (id) => id !== serviceId
//         );
//       }

//       return [
//         ...previous,
//         serviceId,
//       ];
//     });

//     setError("");
//   };


//   /* =======================================================
//      STEP 1 VALIDATION
//   ======================================================= */

//   const validateClientDetails =
//     (): boolean => {
//       const errors: Record<
//         string,
//         string
//       > = {};

//       const name =
//         form.name.trim();

//       const email =
//         form.email.trim();

//       const mobile =
//         form.mobile.trim();

//       const company =
//         form.company_name.trim();

//       const address =
//         form.address.trim();


//       if (!name) {
//         errors.name =
//           "Full name is required.";
//       }

//       if (!email) {
//         errors.email =
//           "Email address is required.";
//       } else if (
//         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
//           email
//         )
//       ) {
//         errors.email =
//           "Please enter a valid email address.";
//       }


//       if (!mobile) {
//         errors.mobile =
//           "Mobile number is required.";
//       } else if (
//         !/^[+0-9\s()-]{7,20}$/.test(
//           mobile
//         )
//       ) {
//         errors.mobile =
//           "Please enter a valid mobile number.";
//       }


//       if (!company) {
//         errors.company_name =
//           "Business/company name is required.";
//       }


//       if (!address) {
//         errors.address =
//           "Business address is required.";
//       }


//       setFieldErrors(errors);

//       return (
//         Object.keys(errors).length === 0
//       );
//     };


//   /* =======================================================
//      STEP 2 VALIDATION
//   ======================================================= */

//   const validateServices =
//     (): boolean => {
//       if (
//         selectedServices.length === 0
//       ) {
//         setError(
//           "Please select at least one service."
//         );

//         return false;
//       }

//       setError("");

//       return true;
//     };


//   /* =======================================================
//      NEXT STEP
//   ======================================================= */

//   const handleNext = () => {
//     setError("");

//     if (step === 1) {
//       const valid =
//         validateClientDetails();

//       if (!valid) {
//         return;
//       }

//       setStep(2);

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });

//       return;
//     }


//     if (step === 2) {
//       const valid =
//         validateServices();

//       if (!valid) {
//         return;
//       }

//       setStep(3);

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });

//       return;
//     }
//   };


//   /* =======================================================
//      PREVIOUS STEP
//   ======================================================= */

//   const handleBack = () => {
//     setError("");
//     setFieldErrors({});

//     if (step === 2) {
//       setStep(1);
//     }

//     if (step === 3) {
//       setStep(2);
//     }

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };


//   /* =======================================================
//      EDIT CLIENT DETAILS
//   ======================================================= */

//   const editClientDetails = () => {
//     setStep(1);
//     setError("");

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };


//   /* =======================================================
//      EDIT SERVICES
//   ======================================================= */

//   const editServices = () => {
//     setStep(2);
//     setError("");

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };


//   /* =======================================================
//      SUBMIT
//   ======================================================= */

//   const handleSubmit = async () => {
//     setError("");

//     /*
//       Final validation before API call.
//     */

//     if (!validateClientDetails()) {
//       setStep(1);
//       return;
//     }

//     if (!validateServices()) {
//       setStep(2);
//       return;
//     }


//     setSubmitting(true);


//     try {
//       const payload = {
//         name: form.name.trim(),

//         email:
//           form.email.trim(),

//         mobile:
//           form.mobile.trim(),

//         company_name:
//           form.company_name.trim(),

//         address:
//           form.address.trim(),

//         service_ids:
//           selectedServices,
//       };


//       const response =
//         await fetch(
//           ONBOARDING_API,
//           {
//             method: "POST",

//             headers: {
//               "Content-Type":
//                 "application/json",

//               Accept:
//                 "application/json",
//             },

//             body:
//               JSON.stringify(
//                 payload
//               ),
//           }
//         );


//       const data: ApiError & {
//         id?: number | string;
//         data?: {
//           id?: number | string;
//         };
//       } =
//         await response
//           .json()
//           .catch(
//             () => ({})
//           );


//       if (!response.ok) {
//         /*
//           Django validation error handling
//         */

//         if (
//           data.errors &&
//           typeof data.errors ===
//             "object"
//         ) {
//           const djangoErrors =
//             data.errors;

//           const readableErrors =
//             Object.entries(
//               djangoErrors
//             )
//               .map(
//                 ([
//                   field,
//                   messages,
//                 ]) => {
//                   const message =
//                     Array.isArray(
//                       messages
//                     )
//                       ? messages.join(
//                           ", "
//                         )
//                       : messages;

//                   return `${field}: ${message}`;
//                 }
//               )
//               .join(" | ");

//           throw new Error(
//             readableErrors ||
//               "Please check the submitted information."
//           );
//         }


//         throw new Error(
//           data.detail ||
//             data.message ||
//             "Unable to submit onboarding."
//         );
//       }


//       /*
//         Save returned onboarding ID
//       */

//       const id =
//         data.id ??
//         data.data?.id ??
//         null;

//       setSubmissionId(id);

//       setSuccess(true);

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });

//     } catch (err) {
//       console.error(
//         "Onboarding submit error:",
//         err
//       );

//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong while submitting the onboarding."
//       );

//     } finally {
//       setSubmitting(false);
//     }
//   };


//   /* =======================================================
//      RESET
//   ======================================================= */

//   const resetOnboarding = () => {
//     setStep(1);

//     setForm(
//       INITIAL_FORM
//     );

//     setSelectedServices([]);

//     setServiceSearch("");

//     setError("");

//     setFieldErrors({});

//     setSubmissionId(null);

//     setSuccess(false);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };


//   /* =======================================================
//      SELECTED SERVICE OBJECTS
//   ======================================================= */

//   const selectedServiceObjects =
//     services.filter(
//       (service) =>
//         selectedServices.includes(
//           service.id
//         )
//     );


//   /* =======================================================
//      SUCCESS SCREEN
//   ======================================================= */

//   if (success) {
//     return (
//       <div
//         className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-10"
//         style={{
//           fontFamily:
//             "Montserrat, sans-serif",
//         }}
//       >

//         <div className="w-full max-w-xl">

//           <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm p-7 sm:p-10 text-center">

//             {/* ICON */}

//             <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">

//               <CheckCircle2
//                 size={44}
//                 className="text-green-600"
//               />

//             </div>


//             {/* TITLE */}

//             <h1 className="mt-7 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">

//               Onboarding Completed

//             </h1>


//             <p className="mt-4 text-sm sm:text-base leading-7 text-gray-500">

//               Thank you for providing your
//               details. Your client onboarding
//               information has been successfully
//               submitted to our team.

//             </p>


//             {/* SUBMISSION ID */}

//             {submissionId && (
//               <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">

//                 <Check
//                   size={14}
//                 />

//                 Reference ID: #
//                 {submissionId}

//               </div>
//             )}


//             {/* ACTION */}

//             <button
//               type="button"
//               onClick={
//                 resetOnboarding
//               }
//               className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//             >

//               Start New Onboarding

//               <ArrowRight
//                 size={17}
//               />

//             </button>

//           </div>

//         </div>

//       </div>
//     );
//   }


//   /* =======================================================
//      MAIN PAGE
//   ======================================================= */

//   return (
//     <div
//       className="min-h-screen bg-[#f7f8fa]"
//       style={{
//         fontFamily:
//           "Montserrat, sans-serif",
//       }}
//     >

//       <div className="min-h-screen flex flex-col lg:flex-row">


//         {/* =================================================
//             DESKTOP SIDEBAR
//         ================================================= */}

//         <aside className="hidden lg:flex w-[300px] xl:w-[340px] shrink-0 bg-[#111827] text-white px-8 xl:px-10 py-10 flex-col">

//           {/* LOGO */}

//           {/* <div>

//             <div className="text-2xl font-bold tracking-tight">
//               Magsmen
//             </div>

//             <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gray-400">
//               Client Portal
//             </div>

//           </div> */}


//           {/* TITLE */}

//           <div className="mt-20">

//             <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
//               Client Onboarding
//             </div>

//             <h2 className="mt-4 text-3xl xl:text-4xl font-bold leading-tight tracking-tight">

//               Let's build
//               <br />
//               something
//               <br />
//               meaningful.

//             </h2>

//             <p className="mt-5 text-sm leading-7 text-gray-400">

//               Share your business details,
//               choose the services you need,
//               and submit your onboarding
//               request.

//             </p>

//           </div>


//           {/* STEPS */}

//           <div className="mt-14 space-y-8">

//             <SidebarStep
//               number="01"
//               title="Client Details"
//               active={step === 1}
//               completed={step > 1}
//             />

//             <SidebarStep
//               number="02"
//               title="Select Services"
//               active={step === 2}
//               completed={step > 2}
//             />

//             <SidebarStep
//               number="03"
//               title="Review & Submit"
//               active={step === 3}
//               completed={false}
//             />

//           </div>


//           {/* SECURITY */}

//           <div className="mt-auto flex items-start gap-3 text-xs text-gray-500">

//             <ShieldCheck
//               size={18}
//               className="shrink-0"
//             />

//             <span className="leading-5">
//               Your information is securely
//               collected and used for client
//               onboarding.
//             </span>

//           </div>

//         </aside>


//         {/* =================================================
//             MOBILE HEADER
//         ================================================= */}

//         <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-5">

//           <div className="flex items-center justify-between">

//             <div>

//               <div className="font-bold text-lg text-gray-900">
//                 Magsmen
//               </div>

//               <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-gray-400">
//                 Client Onboarding
//               </div>

//             </div>

//             <div className="text-sm font-bold text-gray-500">
//               {String(step).padStart(2, "0")}
//               <span className="text-gray-300">
//                 {" "}
//                 / 03
//               </span>
//             </div>

//           </div>


//           {/* MOBILE PROGRESS */}

//           <div className="flex gap-2 mt-5">

//             {[1, 2, 3].map(
//               (item) => (
//                 <div
//                   key={item}
//                   className={`h-1 flex-1 rounded-full transition-all ${
//                     item <= step
//                       ? "bg-gray-900"
//                       : "bg-gray-200"
//                   }`}
//                 />
//               )
//             )}

//           </div>

//         </div>


//         {/* =================================================
//             MAIN CONTENT
//         ================================================= */}

//         <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 py-7 sm:py-9 lg:py-12">

//           <div className="max-w-5xl mx-auto">


//             {/* =================================================
//                 PAGE HEADER
//             ================================================= */}

//             <div className="mb-7 sm:mb-9">

//               <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">

//                 Step{" "}
//                 {String(step).padStart(
//                   2,
//                   "0"
//                 )}{" "}
//                 of 03

//               </div>


//               <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">

//                 {step === 1 &&
//                   "Let's get to know your business"}

//                 {step === 2 &&
//                   "Choose your services"}

//                 {step === 3 &&
//                   "Review your information"}

//               </h1>


//               <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-gray-500">

//                 {step === 1 &&
//                   "Tell us a few details about yourself and your business."}

//                 {step === 2 &&
//                   "Select one or more services you would like our team to provide."}

//                 {step === 3 &&
//                   "Review your details and selected services before submitting."}

//               </p>

//             </div>


//             {/* =================================================
//                 GLOBAL ERROR
//             ================================================= */}

//             {error && (
//               <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">

//                 <AlertCircle
//                   size={18}
//                   className="mt-0.5 shrink-0"
//                 />

//                 <div>
//                   {error}
//                 </div>

//               </div>
//             )}


//             {/* =================================================
//                 STEP 1
//             ================================================= */}

//             {step === 1 && (
//               <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9">

//                 <div className="flex items-center gap-4 mb-8">

//                   <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">

//                     <User
//                       size={21}
//                       className="text-gray-700"
//                     />

//                   </div>

//                   <div>

//                     <h2 className="font-bold text-gray-900">
//                       Client Details
//                     </h2>

//                     <p className="mt-1 text-xs text-gray-500">
//                       All fields marked with
//                       are required.
//                     </p>

//                   </div>

//                 </div>


//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">


//                   {/* NAME */}

//                   <FormInput
//                     label="Full Name"
//                     name="name"
//                     value={form.name}
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="Enter your full name"
//                     icon={
//                       <User
//                         size={18}
//                       />
//                     }
//                     required
//                     error={
//                       fieldErrors.name
//                     }
//                   />


//                   {/* EMAIL */}

//                   <FormInput
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="name@company.com"
//                     icon={
//                       <Mail
//                         size={18}
//                       />
//                     }
//                     required
//                     error={
//                       fieldErrors.email
//                     }
//                   />


//                   {/* MOBILE */}

//                   <FormInput
//                     label="Mobile Number"
//                     name="mobile"
//                     type="tel"
//                     value={form.mobile}
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="+91 XXXXX XXXXX"
//                     icon={
//                       <Phone
//                         size={18}
//                       />
//                     }
//                     required
//                     error={
//                       fieldErrors.mobile
//                     }
//                   />


//                   {/* COMPANY */}

//                   <FormInput
//                     label="Business / Company Name"
//                     name="company_name"
//                     value={
//                       form.company_name
//                     }
//                     onChange={
//                       handleInputChange
//                     }
//                     placeholder="Enter company name"
//                     icon={
//                       <Building2
//                         size={18}
//                       />
//                     }
//                     required
//                     error={
//                       fieldErrors.company_name
//                     }
//                   />


//                   {/* ADDRESS */}

//                   <div className="md:col-span-2">

//                     <label className="block mb-2 text-sm font-semibold text-gray-800">

//                       Business Address

//                       <span className="ml-1 text-red-500">
//                         *
//                       </span>

//                     </label>


//                     <div className="relative">

//                       <MapPin
//                         size={18}
//                         className="absolute left-4 top-4 text-gray-400"
//                       />

//                       <textarea
//                         name="address"
//                         value={
//                           form.address
//                         }
//                         onChange={
//                           handleInputChange
//                         }
//                         rows={4}
//                         placeholder="Enter your complete business address"
//                         className={`w-full resize-none rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//                           fieldErrors.address
//                             ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
//                             : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//                         }`}
//                       />

//                     </div>


//                     {fieldErrors.address && (
//                       <p className="mt-1.5 text-xs text-red-600">
//                         {fieldErrors.address}
//                       </p>
//                     )}

//                   </div>

//                 </div>

//               </section>
//             )}


//             {/* =================================================
//                 STEP 2
//             ================================================= */}

//             {step === 2 && (
//               <section>


//                 {/* SEARCH + COUNT */}

//                 <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

//                   <div className="relative w-full sm:max-w-sm">

//                     <Search
//                       size={18}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                     />

//                     <input
//                       type="text"
//                       value={
//                         serviceSearch
//                       }
//                       onChange={(event) =>
//                         setServiceSearch(
//                           event.target.value
//                         )
//                       }
//                       placeholder="Search services..."
//                       className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/5"
//                     />

//                   </div>


//                   <div className="flex items-center justify-between sm:justify-end gap-3">

//                     <span className="text-xs text-gray-400">
//                       {services.length}{" "}
//                       services
//                     </span>

//                     <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">
//                       {
//                         selectedServices.length
//                       }{" "}
//                       selected
//                     </span>

//                   </div>

//                 </div>


//                 {/* LOADING */}

//                 {loadingServices ? (

//                   <div className="min-h-[300px] bg-white rounded-[24px] border border-gray-200 flex items-center justify-center">

//                     <div className="text-center">

//                       <Loader2
//                         size={30}
//                         className="mx-auto animate-spin text-gray-700"
//                       />

//                       <p className="mt-4 text-sm text-gray-500">
//                         Loading services...
//                       </p>

//                     </div>

//                   </div>

//                 ) : filteredServices.length ===
//                   0 ? (

//                   /* EMPTY */

//                   <div className="bg-white rounded-[24px] border border-gray-200 p-12 text-center">

//                     <Briefcase
//                       size={38}
//                       className="mx-auto text-gray-300"
//                     />

//                     <h3 className="mt-4 font-bold text-gray-900">
//                       No services found
//                     </h3>

//                     <p className="mt-2 text-sm text-gray-500">
//                       Try a different search.
//                     </p>

//                   </div>

//                 ) : (

//                   /* SERVICE GRID */

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                     {filteredServices.map(
//                       (
//                         service,
//                         index
//                       ) => {

//                         const selected =
//                           selectedServices.includes(
//                             service.id
//                           );


//                         return (
//                           <button
//                             key={
//                               service.id
//                             }
//                             type="button"
//                             onClick={() =>
//                               toggleService(
//                                 service.id
//                               )
//                             }
//                             className={`group relative w-full text-left rounded-[22px] border p-6 sm:p-7 transition-all duration-200 ${
//                               selected
//                                 ? "border-gray-900 bg-gray-900 shadow-lg shadow-gray-900/10"
//                                 : "border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md"
//                             }`}
//                           >

//                             {/* TOP */}

//                             <div className="flex items-center justify-between">

//                               <span
//                                 className={`text-[11px] font-bold tracking-[0.2em] ${
//                                   selected
//                                     ? "text-gray-400"
//                                     : "text-gray-400"
//                                 }`}
//                               >
//                                 {String(
//                                   service.display_order ??
//                                     index +
//                                       1
//                                 ).padStart(
//                                   2,
//                                   "0"
//                                 )}
//                               </span>


//                               <span
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${
//                                   selected
//                                     ? "border-white bg-white text-gray-900"
//                                     : "border-gray-300 text-transparent group-hover:border-gray-500"
//                                 }`}
//                               >

//                                 <Check
//                                   size={16}
//                                   strokeWidth={
//                                     2.5
//                                   }
//                                 />

//                               </span>

//                             </div>


//                             {/* CONTENT */}

//                             <div className="mt-8">

//                               <h3
//                                 className={`text-lg font-bold ${
//                                   selected
//                                     ? "text-white"
//                                     : "text-gray-900"
//                                 }`}
//                               >
//                                 {
//                                   service.name
//                                 }
//                               </h3>


//                               <p
//                                 className={`mt-2 text-sm leading-6 ${
//                                   selected
//                                     ? "text-gray-300"
//                                     : "text-gray-500"
//                                 }`}
//                               >
//                                 {
//                                   service.description
//                                 }
//                               </p>

//                             </div>


//                             {/* SELECTED LABEL */}

//                             {selected && (
//                               <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300">

//                                 <Check
//                                   size={13}
//                                 />

//                                 Selected

//                               </div>
//                             )}

//                           </button>
//                         );
//                       }
//                     )}

//                   </div>

//                 )}


//                 {/* SELECTED SERVICES SUMMARY */}

//                 {selectedServices.length >
//                   0 && (
//                   <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">

//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

//                       <div>

//                         <div className="text-sm font-bold text-gray-900">
//                           Selected Services
//                         </div>

//                         <div className="mt-1 text-xs text-gray-500">
//                           You can select
//                           multiple services.
//                         </div>

//                       </div>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setSelectedServices(
//                             []
//                           )
//                         }
//                         className="text-xs font-semibold text-gray-500 hover:text-gray-900"
//                       >
//                         Clear all
//                       </button>

//                     </div>


//                     <div className="mt-4 flex flex-wrap gap-2">

//                       {selectedServiceObjects.map(
//                         (
//                           service
//                         ) => (
//                           <button
//                             key={
//                               service.id
//                             }
//                             type="button"
//                             onClick={() =>
//                               toggleService(
//                                 service.id
//                               )
//                             }
//                             className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3.5 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-200"
//                           >

//                             <Check
//                               size={13}
//                             />

//                             {
//                               service.name
//                             }

//                           </button>
//                         )
//                       )}

//                     </div>

//                   </div>
//                 )}

//               </section>
//             )}


//             {/* =================================================
//                 STEP 3
//             ================================================= */}

//             {step === 3 && (
//               <section className="space-y-5">


//                 {/* CLIENT DETAILS CARD */}

//                 <ReviewCard
//                   title="Client Details"
//                   icon={
//                     <User
//                       size={19}
//                     />
//                   }
//                   onEdit={
//                     editClientDetails
//                   }
//                 >

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">

//                     <ReviewItem
//                       label="Full Name"
//                       value={
//                         form.name
//                       }
//                     />

//                     <ReviewItem
//                       label="Email Address"
//                       value={
//                         form.email
//                       }
//                     />

//                     <ReviewItem
//                       label="Mobile Number"
//                       value={
//                         form.mobile
//                       }
//                     />

//                     <ReviewItem
//                       label="Business / Company"
//                       value={
//                         form.company_name
//                       }
//                     />

//                     <div className="sm:col-span-2">

//                       <ReviewItem
//                         label="Business Address"
//                         value={
//                           form.address
//                         }
//                       />

//                     </div>

//                   </div>

//                 </ReviewCard>


//                 {/* SERVICES CARD */}

//                 <ReviewCard
//                   title="Selected Services"
//                   icon={
//                     <Briefcase
//                       size={19}
//                     />
//                   }
//                   onEdit={
//                     editServices
//                   }
//                 >

//                   <div className="flex flex-wrap gap-3">

//                     {selectedServiceObjects.map(
//                       (
//                         service
//                       ) => (
//                         <div
//                           key={
//                             service.id
//                           }
//                           className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-800"
//                         >

//                           <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">

//                             <Check
//                               size={12}
//                             />

//                           </span>

//                           {
//                             service.name
//                           }

//                         </div>
//                       )
//                     )}

//                   </div>

//                 </ReviewCard>


//                 {/* FINAL CONFIRMATION */}

//                 <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">

//                   <div className="flex items-start gap-3">

//                     <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">

//                       <ShieldCheck
//                         size={18}
//                         className="text-gray-700"
//                       />

//                     </div>

//                     <div>

//                       <h3 className="text-sm font-bold text-gray-900">
//                         Ready to submit?
//                       </h3>

//                       <p className="mt-1 text-xs sm:text-sm leading-6 text-gray-500">
//                         Please make sure the
//                         information above is
//                         correct. Once submitted,
//                         your onboarding request
//                         will be sent to our team.
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//               </section>
//             )}


//             {/* =================================================
//                 BOTTOM ACTIONS
//             ================================================= */}

//             <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">

//               {/* BACK */}

//               {step > 1 ? (
//                 <button
//                   type="button"
//                   onClick={
//                     handleBack
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400 disabled:opacity-50"
//                 >

//                   <ArrowLeft
//                     size={17}
//                   />

//                   Back

//                 </button>
//               ) : (
//                 <div />
//               )}


//               {/* CONTINUE / SUBMIT */}

//               {step < 3 ? (

//                 <button
//                   type="button"
//                   onClick={
//                     handleNext
//                   }
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
//                 >

//                   Continue

//                   <ArrowRight
//                     size={17}
//                   />

//                 </button>

//               ) : (

//                 <button
//                   type="button"
//                   onClick={
//                     handleSubmit
//                   }
//                   disabled={
//                     submitting
//                   }
//                   className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
//                 >

//                   {submitting ? (
//                     <>
//                       <Loader2
//                         size={17}
//                         className="animate-spin"
//                       />

//                       Submitting...
//                     </>
//                   ) : (
//                     <>
//                       Submit Onboarding

//                       <Check
//                         size={17}
//                       />
//                     </>
//                   )}

//                 </button>

//               )}

//             </div>


//             {/* MOBILE SECURITY */}

//             <div className="lg:hidden mt-8 flex items-center justify-center gap-2 text-[11px] text-gray-400">

//               <ShieldCheck
//                 size={15}
//               />

//               Your information is securely
//               collected.

//             </div>

//           </div>

//         </main>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    FORM INPUT COMPONENT
// ========================================================= */

// type FormInputProps = {
//   label: string;
//   name: string;
//   type?: string;
//   value: string;
//   placeholder: string;
//   onChange: (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => void;
//   icon: React.ReactNode;
//   required?: boolean;
//   error?: string;
// };

// const FormInput: React.FC<
//   FormInputProps
// > = ({
//   label,
//   name,
//   type = "text",
//   value,
//   placeholder,
//   onChange,
//   icon,
//   required,
//   error,
// }) => {
//   return (
//     <div>

//       <label className="block mb-2 text-sm font-semibold text-gray-800">

//         {label}

//         {required && (
//           <span className="ml-1 text-red-500">
//             *
//           </span>
//         )}

//       </label>


//       <div className="relative">

//         <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

//           {icon}

//         </div>


//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           autoComplete="off"
//           className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
//             error
//               ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
//               : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
//           }`}
//         />

//       </div>


//       {error && (
//         <p className="mt-1.5 text-xs text-red-600">
//           {error}
//         </p>
//       )}

//     </div>
//   );
// };


// /* =========================================================
//    SIDEBAR STEP
// ========================================================= */

// type SidebarStepProps = {
//   number: string;
//   title: string;
//   active: boolean;
//   completed: boolean;
// };

// const SidebarStep: React.FC<
//   SidebarStepProps
// > = ({
//   number,
//   title,
//   active,
//   completed,
// }) => {
//   return (
//     <div className="flex items-center gap-4">

//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
//           active || completed
//             ? "bg-white text-gray-900"
//             : "border border-gray-700 text-gray-500"
//         }`}
//       >

//         {completed ? (
//           <Check size={17} />
//         ) : (
//           number
//         )}

//       </div>


//       <div>

//         <div
//           className={`text-sm font-semibold ${
//             active
//               ? "text-white"
//               : "text-gray-500"
//           }`}
//         >
//           {title}
//         </div>

//       </div>

//     </div>
//   );
// };


// /* =========================================================
//    REVIEW CARD
// ========================================================= */

// type ReviewCardProps = {
//   title: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
//   onEdit: () => void;
// };

// const ReviewCard: React.FC<
//   ReviewCardProps
// > = ({
//   title,
//   icon,
//   children,
//   onEdit,
// }) => {
//   return (
//     <div className="rounded-[22px] border border-gray-200 bg-white p-5 sm:p-7 shadow-sm">

//       <div className="flex items-center justify-between gap-4 mb-6">

//         <div className="flex items-center gap-3">

//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">

//             {icon}

//           </div>

//           <h2 className="text-base sm:text-lg font-bold text-gray-900">
//             {title}
//           </h2>

//         </div>


//         <button
//           type="button"
//           onClick={onEdit}
//           className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
//         >

//           <Pencil
//             size={14}
//           />

//           Edit

//         </button>

//       </div>


//       {children}

//     </div>
//   );
// };


// /* =========================================================
//    REVIEW ITEM
// ========================================================= */

// type ReviewItemProps = {
//   label: string;
//   value: string;
// };

// const ReviewItem: React.FC<
//   ReviewItemProps
// > = ({
//   label,
//   value,
// }) => {
//   return (
//     <div className="border-b border-gray-100 py-4 last:border-0">

//       <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
//         {label}
//       </div>

//       <div className="mt-1.5 text-sm font-medium leading-6 text-gray-900 whitespace-pre-line break-words">
//         {value || "—"}
//       </div>

//     </div>
//   );
// };


// export default ClientOnboarding;
