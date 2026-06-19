"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteLayout } from "@/components/SiteLayout"
import { CountrySelect } from "@/components/CountrySelect"
import { StateSelect } from "@/components/StateSelect"

const STORAGE_KEY = "ebola_application_draft"

interface FormData {
  readyToProceed?: boolean
  firstTimeApplicant?: boolean
  heardAboutFunds?: string
  otherSource?: string
  occupation?: string
  otherOccupation?: string
  fullName?: string
  age?: string
  email?: string
  countryCode?: string
  country?: string
  state?: string
  town?: string
  phoneNumber?: string
}

const emptyForm: FormData = {}

const steps = ["Eligibility", "Background", "Personal Info", "Contact & Location", "Review & Submit"]

export default function ApplyPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")

  // Load from session on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setForm(parsed.form || emptyForm)
        setStep(parsed.step || 0)
      }
    } catch {}
  }, [])

  // Save to session on change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ form, step }))
    } catch {}
  }, [form, step])

  const update = (field: keyof FormData, value: any) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: "" }))
  }

  const validateStep = (): boolean => {
    const e: Record<string, string> = {}

    if (step === 0) {
      if (form.readyToProceed === undefined) e.readyToProceed = "Please confirm you are ready to proceed"
      if (form.firstTimeApplicant === undefined) e.firstTimeApplicant = "Please select yes or no"
    }
    if (step === 1) {
      if (!form.heardAboutFunds) e.heardAboutFunds = "Please select how you heard about us"
      if (form.heardAboutFunds === "Other" && !form.otherSource) e.otherSource = "Please specify"
      if (!form.occupation) e.occupation = "Please select your occupation"
      if (form.occupation === "Other" && !form.otherOccupation) e.otherOccupation = "Please specify"
    }
    if (step === 2) {
      if (!form.fullName) e.fullName = "Full name is required"
      if (!form.age) e.age = "Age is required"
      else if (isNaN(Number(form.age)) || Number(form.age) < 1 || Number(form.age) > 120) e.age = "Enter a valid age"
    }
    if (step === 3) {
      if (!form.countryCode) e.country = "Country is required"
      if (!form.state) e.state = "State/Region is required"
      if (!form.town) e.town = "Town is required"
      if (!form.phoneNumber) e.phoneNumber = "Phone number is required"
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email"
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

  const goTo = (i: number) => {
    if (i < step) setStep(i)
    else if (i > step) {
      // allow jumping forward only if prior steps valid
      let ok = true
      for (let j = 0; j < i; j++) {
        const orig = step
        setStep(j)
        if (!validateStepFor(j)) { ok = false; break }
        setStep(orig)
      }
      if (ok) setStep(i)
    }
  }

  const validateStepFor = (s: number): boolean => {
    const e: Record<string, string> = {}
    if (s === 0) {
      if (form.readyToProceed === undefined) e.readyToProceed = "required"
      if (form.firstTimeApplicant === undefined) e.firstTimeApplicant = "required"
    }
    if (s === 1) {
      if (!form.heardAboutFunds) e.heardAboutFunds = "required"
      if (form.heardAboutFunds === "Other" && !form.otherSource) e.otherSource = "required"
      if (!form.occupation) e.occupation = "required"
      if (form.occupation === "Other" && !form.otherOccupation) e.otherOccupation = "required"
    }
    if (s === 2) {
      if (!form.fullName) e.fullName = "required"
      if (!form.age) e.age = "required"
    }
    if (s === 3) {
      if (!form.countryCode) e.country = "required"
      if (!form.state) e.state = "required"
      if (!form.town) e.town = "required"
      if (!form.phoneNumber) e.phoneNumber = "required"
    }
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validateStep()) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          readyToProceed: form.readyToProceed,
          firstTimeApplicant: form.firstTimeApplicant,
          heardAboutFunds: form.heardAboutFunds,
          otherSource: form.otherSource || null,
          occupation: form.occupation,
          otherOccupation: form.otherOccupation || null,
          fullName: form.fullName,
          age: Number(form.age),
          email: form.email || null,
          phoneNumber: form.phoneNumber,
          country: form.country,
          state: form.state,
          town: form.town,
        }),
      })
      const data = await res.json()
      if (data.success || data.applicationId) {
        setApplicationId(data.applicationId)
        setSubmitted(true)
        sessionStorage.removeItem(STORAGE_KEY)
      } else {
        alert(data.error || "Submission failed. Please try again.")
      }
    } catch (err) {
      alert("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const YesNo = ({ field, label }: { field: keyof FormData; label: string }) => (
    <div className="mb-4">
      <label className="form-label fw-semibold">{label} *</label>
      <div className="btn-group w-100" role="group">
        <button
          type="button"
          className={`btn ${form[field] === true ? "btn-es" : "btn-outline-secondary"}`}
          onClick={() => update(field, true)}
        >
          Yes
        </button>
        <button
          type="button"
          className={`btn ${form[field] === false ? "btn-es" : "btn-outline-secondary"}`}
          onClick={() => update(field, false)}
        >
          No
        </button>
      </div>
      {errors[field] && <div className="text-danger small mt-1">{errors[field]}</div>}
    </div>
  )

  return (
    <SiteLayout activeKey="apply">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="h2 fw-bold mb-2">Application for Ebola Emergency Support</h1>
            <p className="text-secondary mb-4">Complete each step. Your progress is saved automatically in this browser session.</p>

            {/* Progress */}
            <div className="es-card mb-4">
              <div className="d-flex flex-wrap gap-1 mb-3">
                {steps.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`btn btn-sm ${i === step ? "btn-es" : i < step ? "btn-success" : "btn-outline-secondary"}`}
                    style={{ flex: "1 1 0", minWidth: "120px" }}
                  >
                    <span className="d-block small opacity-75">Step {i + 1}</span>
                    <span className="fw-semibold">{s}</span>
                  </button>
                ))}
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {submitted ? (
              <div className="es-card text-center py-5">
                <div className="es-icon-box bg-success-subtle text-success mx-auto mb-3" style={{ width: "64px", height: "64px" }}>
                  <i className="bi bi-check-circle-fill" style={{ fontSize: "2rem" }}></i>
                </div>
                <h2 className="h3 fw-bold mb-2">Application Submitted!</h2>
                <p className="text-secondary mb-3">Your application has been received and is now pending review.</p>
                <div className="alert alert-success d-inline-block">
                  <strong>Reference Number:</strong> {applicationId}
                </div>
                <p className="small text-muted mt-3">Save this reference number to track your application status. Initial review takes up to 24 hours.</p>
                <div className="mt-4">
                  <Link href="/" className="btn btn-es me-2">Back to Home</Link>
                  <Link href="/apply" className="btn btn-outline-secondary">New Application</Link>
                </div>
              </div>
            ) : (
              <div className="es-card">
                {/* Step 0: Eligibility */}
                {step === 0 && (
                  <div>
                    <h2 className="h4 fw-bold mb-4"><i className="bi bi-clipboard-check me-2 text-danger"></i>Eligibility Check</h2>
                    <YesNo field="readyToProceed" label="I confirm I am ready to proceed with this application" />
                    <YesNo field="firstTimeApplicant" label="Is this your first time applying for emergency support?" />
                  </div>
                )}

                {/* Step 1: Background */}
                {step === 1 && (
                  <div>
                    <h2 className="h4 fw-bold mb-4"><i className="bi bi-info-circle me-2 text-danger"></i>Background Information</h2>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">How did you hear about the funds? *</label>
                      <select
                        className="form-select"
                        value={form.heardAboutFunds || ""}
                        onChange={(e) => update("heardAboutFunds", e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="Hospital/Clinic">Hospital or Clinic</option>
                        <option value="Government">Government Agency</option>
                        <option value="NGO">NGO / Aid Organization</option>
                        <option value="Radio/TV">Radio or TV</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend/Family">Friend or Family</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.heardAboutFunds && <div className="text-danger small mt-1">{errors.heardAboutFunds}</div>}
                    </div>

                    {form.heardAboutFunds === "Other" && (
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Please specify *</label>
                        <input
                          className="form-control"
                          value={form.otherSource || ""}
                          onChange={(e) => update("otherSource", e.target.value)}
                        />
                        {errors.otherSource && <div className="text-danger small mt-1">{errors.otherSource}</div>}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Occupation *</label>
                      <select
                        className="form-select"
                        value={form.occupation || ""}
                        onChange={(e) => update("occupation", e.target.value)}
                      >
                        <option value="">Select an option</option>
                        <option value="Healthcare Worker">Healthcare Worker</option>
                        <option value="Farmer">Farmer</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Trader/Business">Trader / Business</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.occupation && <div className="text-danger small mt-1">{errors.occupation}</div>}
                    </div>

                    {form.occupation === "Other" && (
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Please specify your occupation *</label>
                        <input
                          className="form-control"
                          value={form.otherOccupation || ""}
                          onChange={(e) => update("otherOccupation", e.target.value)}
                        />
                        {errors.otherOccupation && <div className="text-danger small mt-1">{errors.otherOccupation}</div>}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Personal Info */}
                {step === 2 && (
                  <div>
                    <h2 className="h4 fw-bold mb-4"><i className="bi bi-person me-2 text-danger"></i>Personal Information</h2>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Full Name *</label>
                      <input
                        className="form-control"
                        value={form.fullName || ""}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <div className="text-danger small mt-1">{errors.fullName}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Age *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.age || ""}
                        onChange={(e) => update("age", e.target.value)}
                        placeholder="Enter your age"
                        min="1"
                        max="120"
                      />
                      {errors.age && <div className="text-danger small mt-1">{errors.age}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email (optional)</label>
                      <input
                        type="email"
                        className="form-control"
                        value={form.email || ""}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                      />
                      {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                    </div>
                  </div>
                )}

                {/* Step 3: Country first, then phone, state filtered by country */}
                {step === 3 && (
                  <div>
                    <h2 className="h4 fw-bold mb-4"><i className="bi bi-geo-alt me-2 text-danger"></i>Contact & Location</h2>

                    {/* Country FIRST */}
                    <div className="mb-3">
                      <CountrySelect
                        value={form.countryCode}
                        onChange={(code, name) => {
                          update("countryCode", code)
                          update("country", name)
                          // reset state when country changes
                          update("state", "")
                        }}
                        error={errors.country}
                      />
                    </div>

                    {/* State/Region filtered by country */}
                    <div className="mb-3">
                      <StateSelect
                        countryCode={form.countryCode}
                        value={form.state}
                        onChange={(name) => update("state", name)}
                        error={errors.state}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Town/City *</label>
                      <input
                        className="form-control"
                        value={form.town || ""}
                        onChange={(e) => update("town", e.target.value)}
                        placeholder="Enter your town or city"
                      />
                      {errors.town && <div className="text-danger small mt-1">{errors.town}</div>}
                    </div>

                    {/* Phone number AFTER country */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Phone Number *</label>
                      <input
                        className="form-control"
                        value={form.phoneNumber || ""}
                        onChange={(e) => update("phoneNumber", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                      {errors.phoneNumber && <div className="text-danger small mt-1">{errors.phoneNumber}</div>}
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div>
                    <h2 className="h4 fw-bold mb-4"><i className="bi bi-eye me-2 text-danger"></i>Review Your Application</h2>

                    {[
                      { title: "Eligibility", edit: 0, rows: [
                        ["Ready to proceed", form.readyToProceed === true ? "Yes" : form.readyToProceed === false ? "No" : "—"],
                        ["First time applicant", form.firstTimeApplicant === true ? "Yes" : form.firstTimeApplicant === false ? "No" : "—"],
                      ]},
                      { title: "Background", edit: 1, rows: [
                        ["Heard about funds from", form.heardAboutFunds || "—"],
                        ["Other source", form.otherSource || "—"],
                        ["Occupation", form.occupation || "—"],
                        ["Other occupation", form.otherOccupation || "—"],
                      ]},
                      { title: "Personal Info", edit: 2, rows: [
                        ["Full name", form.fullName || "—"],
                        ["Age", form.age || "—"],
                        ["Email", form.email || "—"],
                      ]},
                      { title: "Contact & Location", edit: 3, rows: [
                        ["Country", form.country || "—"],
                        ["State/Region", form.state || "—"],
                        ["Town/City", form.town || "—"],
                        ["Phone number", form.phoneNumber || "—"],
                      ]},
                    ].map((section) => (
                      <div className="es-card mb-3" key={section.title} style={{ background: "#fafaf9" }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h3 className="h6 fw-bold mb-0">{section.title}</h3>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setStep(section.edit)}
                          >
                            <i className="bi bi-pencil me-1"></i>Edit
                          </button>
                        </div>
                        <dl className="row mb-0">
                          {section.rows.map(([k, v]) => (
                            <div className="d-flex justify-content-between py-1 border-bottom" key={k as string}>
                              <dt className="text-muted small">{k}</dt>
                              <dd className="mb-0 small fw-semibold text-end">{v}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}

                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      Please review all information above. Click "Edit" on any section to make changes before submitting.
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={back}
                    disabled={step === 0}
                  >
                    <i className="bi bi-arrow-left me-1"></i>Back
                  </button>

                  {step < steps.length - 1 ? (
                    <button type="button" className="btn btn-es" onClick={next}>
                      Next<i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={submit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <><span className="spinner-border spinner-border-sm me-1"></span>Submitting...</>
                      ) : (
                        <><i className="bi bi-check-circle me-1"></i>Submit Application</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
