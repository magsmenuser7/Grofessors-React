import React, { useEffect, useMemo, useState } from "react";
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
  Calendar,
  Layers,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Step = 1 | 2 | 3 | 4;

type ClientForm = {
  name: string;
  email: string;
  mobile: string;
  company_name: string;
  address: string;
  engagement_reference_no: string;
  engagement_stage: string;
  commencement_date: string;
  anticipated_duration: string;
  magsmen_engagement_lead_name: string;
  magsmen_engagement_lead_email: string;
  client_primary_contact_name: string;
  client_primary_contact_designation: string;
  industry_sector: string;
  areas_of_sensitivity: string;
  discovery_session_conducted: boolean;
  discovery_session_date: string;
  special_confidentiality_notes: string;
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
  "http://127.0.0.1:8000/api";

const ONBOARDING_API = `${API_BASE_URL}/client-onboarding/`;

/* =========================================================
   FALLBACK SERVICES
========================================================= */

const FALLBACK_SERVICES: Service[] = [
  { id: 1, name: "Brand Creation", slug: "brand-creation", description: "Build a strong and distinctive brand foundation for your business.", display_order: 1 },
  { id: 2, name: "Brand Audit", slug: "brand-audit", description: "Evaluate your existing brand and identify opportunities for improvement.", display_order: 2 },
  { id: 3, name: "Corporate Rebranding", slug: "corporate-rebranding", description: "Transform and reposition your corporate brand for the next stage of growth.", display_order: 3 },
  { id: 4, name: "Personal Brand", slug: "personal-brand", description: "Build a clear and credible personal brand that represents your expertise.", display_order: 4 },
  { id: 5, name: "LinkFluence", slug: "linkfluence", description: "Strengthen your professional presence and brand influence across networks.", display_order: 5 },
  { id: 6, name: "Brand Expresso", slug: "brand-expresso", description: "Get focused brand guidance and practical strategic direction.", display_order: 6 },
  { id: 7, name: "OTC — One Time Consulting", slug: "otc-one-time-consulting", description: "Get strategic consulting support for a specific business requirement.", display_order: 7 },
  { id: 8, name: "Legal & IP Consulting", slug: "legal-ip-consulting", description: "Get strategic guidance around intellectual property and brand-related legal needs.", display_order: 8 },
];

const INITIAL_FORM: ClientForm = {
  name: "",
  email: "",
  mobile: "",
  company_name: "",
  address: "",
  engagement_reference_no: "MAGSMEN/NDA/___/202_",
  engagement_stage: "Engagement Confirmed",
  commencement_date: "",
  anticipated_duration: "",
  magsmen_engagement_lead_name: "",
  magsmen_engagement_lead_email: "",
  client_primary_contact_name: "",
  client_primary_contact_designation: "",
  industry_sector: "",
  areas_of_sensitivity: "",
  discovery_session_conducted: false,
  discovery_session_date: "",
  special_confidentiality_notes: "",
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

      if (!response.ok) {
        throw new Error(`Unable to load data. Status: ${response.status}`);
      }

      const data = await response.json();
      const serviceData: Service[] = Array.isArray(data?.services)
        ? data.services
        : Array.isArray(data)
        ? data
        : [];

      if (serviceData.length > 0) {
        setServices(serviceData);
      } else {
        setServices(FALLBACK_SERVICES);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setServices(FALLBACK_SERVICES);
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
    if (!form.address.trim()) errors.address = "Business address is required.";

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

  const handleNext = () => {
    setError("");
    if (step === 1) {
      if (!validateClientDetails()) return;
      setStep(2);
    } else if (step === 2) {
      if (!validateServices()) return;
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setError("");
    setFieldErrors({});
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
    if (step === 4) setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setError("");
    if (!validateClientDetails()) {
      setStep(1);
      return;
    }
    if (!validateServices()) {
      setStep(2);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        company_name: form.company_name.trim(),
        address: form.address.trim(),
        service_ids: selectedServices,
        engagement_reference_no: form.engagement_reference_no.trim(),
        engagement_stage: form.engagement_stage,
        commencement_date: form.commencement_date || null,
        anticipated_duration: form.anticipated_duration.trim(),
        magsmen_engagement_lead_name: form.magsmen_engagement_lead_name.trim(),
        magsmen_engagement_lead_email: form.magsmen_engagement_lead_email.trim(),
        client_primary_contact_name: form.client_primary_contact_name.trim(),
        client_primary_contact_designation: form.client_primary_contact_designation.trim(),
        industry_sector: form.industry_sector.trim(),
        areas_of_sensitivity: form.areas_of_sensitivity.trim(),
        discovery_session_conducted: form.discovery_session_conducted,
        discovery_session_date: form.discovery_session_date || null,
        special_confidentiality_notes: form.special_confidentiality_notes.trim(),
      };

      const response = await fetch(ONBOARDING_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors && typeof data.errors === "object") {
          const djangoErrors = data.errors;
          const readableErrors = Object.entries(djangoErrors)
            .map(([field, messages]) => {
              const msg = Array.isArray(messages) ? messages.join(", ") : messages;
              return `${field}: ${msg}`;
            })
            .join(" | ");
          throw new Error(readableErrors || "Please check the submitted information.");
        }
        throw new Error(data.detail || data.message || "Unable to submit onboarding.");
      }

      const id = data.id ?? data.data?.id ?? null;
      setSubmissionId(id);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Onboarding submit error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting the onboarding."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetOnboarding = () => {
    setStep(1);
    setForm(INITIAL_FORM);
    setSelectedServices([]);
    setServiceSearch("");
    setError("");
    setFieldErrors({});
    setSubmissionId(null);
    setSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedServiceObjects = services.filter((service) =>
    selectedServices.includes(service.id)
  );

  if (success) {
    return (
      <div
        className="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-10"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="w-full max-w-xl">
          <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm p-7 sm:p-10 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={44} className="text-green-600" />
            </div>
            <h1 className="mt-7 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Onboarding Completed
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-7 text-gray-500">
              Thank you for providing your details. Your client onboarding and Schedule B agreement records have been successfully submitted[cite: 8].
            </p>
            {submissionId && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700">
                <Check size={14} />
                Reference ID: #{submissionId}
              </div>
            )}
            <button
              type="button"
              onClick={resetOnboarding}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Start New Onboarding
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#f7f8fa]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="min-h-screen flex flex-col lg:flex-row">
        <aside className="hidden lg:flex w-[300px] xl:w-[340px] shrink-0 bg-[#111827] text-white px-8 xl:px-10 py-10 flex-col">
          <div className="mt-20">
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
              Client Portal
            </div>
            <h2 className="mt-4 text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
              Let's build
              <br />
              something
              <br />
              meaningful.
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-400">
              Complete your enterprise client onboarding & Schedule B engagement profile[cite: 8].
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <SidebarStep number="01" title="Client Details" active={step === 1} completed={step > 1} />
            <SidebarStep number="02" title="Select Services" active={step === 2} completed={step > 2} />
            <SidebarStep number="03" title="Schedule B Agreement" active={step === 3} completed={step > 3} />
            <SidebarStep number="04" title="Review & Submit" active={step === 4} completed={false} />
          </div>

          <div className="mt-auto flex items-start gap-3 text-xs text-gray-500">
            <ShieldCheck size={18} className="shrink-0" />
            <span className="leading-5">
              Secure enterprise data collection under NDA compliance.
            </span>
          </div>
        </aside>

        <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg text-gray-900">Magsmen</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                Client Portal
              </div>
            </div>
            <div className="text-sm font-bold text-gray-500">
              {String(step).padStart(2, "0")}
              <span className="text-gray-300"> / 04</span>
            </div>
          </div>
          <div className="flex gap-2 mt-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-1 flex-1 rounded-full transition-all ${
                  item <= step ? "bg-gray-900" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-16 py-7 sm:py-9 lg:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-7 sm:mb-9">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                Step {String(step).padStart(2, "0")} of 04
              </div>
              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                {step === 1 && "Let's get to know your business"}
                {step === 2 && "Choose your services"}
                {step === 3 && "Schedule B Engagement Reference"}
                {step === 4 && "Review your information"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-gray-500">
                {step === 1 && "Tell us a few details about yourself and your business."}
                {step === 2 && "Select one or more services you would like our team to provide."}
                {step === 3 && "Provide contractual engagement and confidentiality setup details[cite: 8]."}
                {step === 4 && "Review all your details and agreement specifications before submitting."}
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <div>{error}</div>
              </div>
            )}

            {/* STEP 1: CLIENT DETAILS */}
            {step === 1 && (
              <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    <User size={21} className="text-gray-700" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Client Details</h2>
                    <p className="mt-1 text-xs text-gray-500">All fields marked with * are required.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <FormInput
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    icon={<User size={18} />}
                    required
                    error={fieldErrors.name}
                  />
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    icon={<Mail size={18} />}
                    required
                    error={fieldErrors.email}
                  />
                  <FormInput
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    icon={<Phone size={18} />}
                    required
                    error={fieldErrors.mobile}
                  />
                  <FormInput
                    label="Business / Company Name"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    icon={<Building2 size={18} />}
                    required
                    error={fieldErrors.company_name}
                  />
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-gray-800">
                      Business Address <span className="ml-1 text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Enter your complete business address"
                        className={`w-full resize-none rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
                          fieldErrors.address
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
                        }`}
                      />
                    </div>
                    {fieldErrors.address && (
                      <p className="mt-1.5 text-xs text-red-600">{fieldErrors.address}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* STEP 2: SERVICES SELECTION */}
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
                    <span className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-bold text-white">
                      {selectedServices.length} selected
                    </span>
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
                    <p className="mt-2 text-sm text-gray-500">Try a different search.</p>
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
                          className={`group relative w-full text-left rounded-[22px] border p-6 sm:p-7 transition-all duration-200 ${
                            selected
                              ? "border-gray-900 bg-gray-900 shadow-lg shadow-gray-900/10"
                              : "border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400">
                              {String(service.display_order ?? index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center border transition ${
                                selected
                                  ? "border-white bg-white text-gray-900"
                                  : "border-gray-300 text-transparent group-hover:border-gray-500"
                              }`}
                            >
                              <Check size={16} strokeWidth={2.5} />
                            </span>
                          </div>
                          <div className="mt-8">
                            <h3 className={`text-lg font-bold ${selected ? "text-white" : "text-gray-900"}`}>
                              {service.name}
                            </h3>
                            <p className={`mt-2 text-sm leading-6 ${selected ? "text-gray-300" : "text-gray-500"}`}>
                              {service.description}
                            </p>
                          </div>
                          {selected && (
                            <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300">
                              <Check size={13} />
                              Selected
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* STEP 3: SCHEDULE B ENGAGEMENT REFERENCE */}
            {step === 3 && (
              <section className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-9 space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    <FileText size={21} className="text-gray-700" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Schedule B Engagement Reference</h2>
                    <p className="mt-1 text-xs text-gray-500">
                      Confidentiality and scope context parameters[cite: 8].
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <FormInput
                    label="Engagement Reference No."
                    name="engagement_reference_no"
                    value={form.engagement_reference_no}
                    onChange={handleInputChange}
                    placeholder="MAGSMEN/NDA/___/202_"
                    icon={<FileText size={18} />}
                  />

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-800">
                      Engagement Stage
                    </label>
                    <select
                      name="engagement_stage"
                      value={form.engagement_stage}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                    >
                      <option value="Pre-Proposal Exploration">Pre-Proposal Exploration</option>
                      <option value="Proposal Stage">Proposal Stage</option>
                      <option value="Engagement Confirmed">Engagement Confirmed</option>
                      <option value="Active Delivery">Active Delivery</option>
                      <option value="Post-Engagement">Post-Engagement</option>
                    </select>
                  </div>

                  <FormInput
                    label="Commencement Date"
                    name="commencement_date"
                    type="date"
                    value={form.commencement_date}
                    onChange={handleInputChange}
                    placeholder=""
                    icon={<Calendar size={18} />}
                  />

                  <FormInput
                    label="Anticipated Duration"
                    name="anticipated_duration"
                    value={form.anticipated_duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 3 Months / 6 Weeks"
                    icon={<Layers size={18} />}
                  />

                  <FormInput
                    label="Magsmen Engagement Lead Name"
                    name="magsmen_engagement_lead_name"
                    value={form.magsmen_engagement_lead_name}
                    onChange={handleInputChange}
                    placeholder="Lead consultant name"
                    icon={<User size={18} />}
                  />

                  <FormInput
                    label="Magsmen Engagement Lead Email"
                    name="magsmen_engagement_lead_email"
                    type="email"
                    value={form.magsmen_engagement_lead_email}
                    onChange={handleInputChange}
                    placeholder="lead@magsmen.com"
                    icon={<Mail size={18} />}
                  />

                  <FormInput
                    label="Client Primary Contact Name"
                    name="client_primary_contact_name"
                    value={form.client_primary_contact_name}
                    onChange={handleInputChange}
                    placeholder="Client contact person"
                    icon={<User size={18} />}
                  />

                  <FormInput
                    label="Client Primary Contact Designation"
                    name="client_primary_contact_designation"
                    value={form.client_primary_contact_designation}
                    onChange={handleInputChange}
                    placeholder="e.g. Director / CEO"
                    icon={<Briefcase size={18} />}
                  />

                  <FormInput
                    label="Industry / Sector"
                    name="industry_sector"
                    value={form.industry_sector}
                    onChange={handleInputChange}
                    placeholder="e.g. Retail, Healthcare, Tech"
                    icon={<Building2 size={18} />}
                  />

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-gray-800">
                      Areas of Particular Sensitivity
                    </label>
                    <textarea
                      name="areas_of_sensitivity"
                      value={form.areas_of_sensitivity}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Specify financial data, trade secrets, or specific sensitive domains"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="discovery_session_conducted"
                      name="discovery_session_conducted"
                      checked={form.discovery_session_conducted}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <label htmlFor="discovery_session_conducted" className="text-sm font-semibold text-gray-800 cursor-pointer">
                      Discovery Session Conducted?
                    </label>
                  </div>

                  {form.discovery_session_conducted && (
                    <FormInput
                      label="Discovery Session Date"
                      name="discovery_session_date"
                      type="date"
                      value={form.discovery_session_date}
                      onChange={handleInputChange}
                      placeholder=""
                      icon={<Calendar size={18} />}
                    />
                  )}

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-semibold text-gray-800">
                      Special Confidentiality Notes
                    </label>
                    <textarea
                      name="special_confidentiality_notes"
                      value={form.special_confidentiality_notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Enter any custom NDA riders or specific confidentiality guidelines"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-gray-900/5"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* STEP 4: REVIEW & SUBMIT */}
            {step === 4 && (
              <section className="space-y-5">
                <ReviewCard title="Client Details" icon={<User size={19} />} onEdit={() => setStep(1)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <ReviewItem label="Full Name" value={form.name} />
                    <ReviewItem label="Email Address" value={form.email} />
                    <ReviewItem label="Mobile Number" value={form.mobile} />
                    <ReviewItem label="Business / Company" value={form.company_name} />
                    <div className="sm:col-span-2">
                      <ReviewItem label="Business Address" value={form.address} />
                    </div>
                  </div>
                </ReviewCard>

                <ReviewCard title="Selected Services" icon={<Briefcase size={19} />} onEdit={() => setStep(2)}>
                  <div className="flex flex-wrap gap-3">
                    {selectedServiceObjects.map((service) => (
                      <div
                        key={service.id}
                        className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-800"
                      >
                        <span className="w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
                          <Check size={12} />
                        </span>
                        {service.name}
                      </div>
                    ))}
                  </div>
                </ReviewCard>

                <ReviewCard title="Schedule B Engagement Reference" icon={<FileText size={19} />} onEdit={() => setStep(3)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <ReviewItem label="Engagement Reference No." value={form.engagement_reference_no} />
                    <ReviewItem label="Engagement Stage" value={form.engagement_stage} />
                    <ReviewItem label="Commencement Date" value={form.commencement_date} />
                    <ReviewItem label="Anticipated Duration" value={form.anticipated_duration} />
                    <ReviewItem label="Magsmen Engagement Lead" value={`${form.magsmen_engagement_lead_name || '—'} (${form.magsmen_engagement_lead_email || '—'})`} />
                    <ReviewItem label="Client Primary Contact" value={`${form.client_primary_contact_name || '—'} [${form.client_primary_contact_designation || '—'}]`} />
                    <ReviewItem label="Industry / Sector" value={form.industry_sector} />
                    <ReviewItem label="Discovery Session" value={form.discovery_session_conducted ? `Yes (${form.discovery_session_date || 'N/A'})` : "No"} />
                    <div className="sm:col-span-2">
                      <ReviewItem label="Areas of Particular Sensitivity" value={form.areas_of_sensitivity} />
                    </div>
                    <div className="sm:col-span-2">
                      <ReviewItem label="Special Confidentiality Notes" value={form.special_confidentiality_notes} />
                    </div>
                  </div>
                </ReviewCard>
              </section>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-gray-400 disabled:opacity-50"
                >
                  <ArrowLeft size={17} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Onboarding
                      <Check size={17} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* Helper Components */
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
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
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
        className={`w-full rounded-xl border bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
          error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : "border-gray-200 focus:border-gray-900 focus:ring-gray-900/5"
        }`}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
  </div>
);

type SidebarStepProps = { number: string; title: string; active: boolean; completed: boolean };
const SidebarStep: React.FC<SidebarStepProps> = ({ number, title, active, completed }) => (
  <div className="flex items-center gap-4">
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${active || completed ? "bg-white text-gray-900" : "border border-gray-700 text-gray-500"}`}>
      {completed ? <Check size={17} /> : number}
    </div>
    <div className={`text-sm font-semibold ${active ? "text-white" : "text-gray-500"}`}>{title}</div>
  </div>
);

type ReviewCardProps = { title: string; icon: React.ReactNode; children: React.ReactNode; onEdit: () => void };
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

type ReviewItemProps = { label: string; value: string };
const ReviewItem: React.FC<ReviewItemProps> = ({ label, value }) => (
  <div className="border-b border-gray-100 py-4 last:border-0">
    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-gray-400">{label}</div>
    <div className="mt-1.5 text-sm font-medium leading-6 text-gray-900 whitespace-pre-line break-words">{value || "—"}</div>
  </div>
);

export default ClientOnboarding;
















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