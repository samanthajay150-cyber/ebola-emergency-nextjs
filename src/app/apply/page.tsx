"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ApplyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    readyToProceed: "",
    firstTimeApplicant: "",
    heardAboutFunds: "",
    otherSource: "",
    occupation: "",
    otherOccupation: "",
    fullName: "",
    age: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    town: "",
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const steps = ["Eligibility", "Background", "Personal", "Review"]

  const next = () => {
    setError("")
    if (step === 1) {
      if (!form.readyToProceed || !form.firstTimeApplicant || !form.heardAboutFunds) {
        setError("Please answer all eligibility questions.")
        return
      }
      if (form.heardAboutFunds === "other" && !form.otherSource) {
        setError("Please specify how you heard about us.")
        return
      }
    }
    if (step === 2 && (!form.occupation || (form.occupation === "other" && !form.otherOccupation))) {
      setError("Please select your occupation.")
      return
    }
    if (step === 3) {
      if (!form.fullName || !form.age || !form.country || !form.state || !form.town) {
        setError("Please fill in all required personal details.")
        return
      }
    }
    setStep((s) => Math.min(4, s + 1))
  }
  const back = () => { setError(""); setStep((s) => Math.max(1, s - 1)) }

  const submit = async () => {
    setSubmitting(true); setError("")
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          readyToProceed: form.readyToProceed === "yes",
          firstTimeApplicant: form.firstTimeApplicant === "yes",
          age: parseInt(form.age),
        }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(`/success?id=${data.applicationId}`)
      } else {
        setError(data.error || "Failed to submit application.")
      }
    } catch {
      setError("Network error. Please try again.")
    }
    setSubmitting(false)
  }

  return (
    <>
      <nav className="es-nav">
        <div className="container d-flex align-items-center justify-content-between">
          <Link href="/" className="es-nav-brand">
            <span className="es-logo"><i className="bi bi-heart-pulse"></i></span>
            Ebola Emergency Support
          </Link>
          <Link href="/" className="es-nav-link"><i className="bi bi-arrow-left me-1"></i>Back to Home</Link>
        </div>
      </nav>

      <div className="container py-5">
        <div className="text-center mb-4">
          <h1 className="mb-2">Application for Ebola Emergency Support</h1>
          <p className="text-muted">Complete the form below to apply for financial assistance.</p>
        </div>

        {/* Progress */}
        <div className="es-progress-track mb-5">
          {steps.map((label, i) => {
            const n = i + 1
            return (
              <div key={label} className={`es-progress-step ${step === n ? "active" : step > n ? "done" : ""}`}>
                <div className="es-progress-dot">
                  {step > n ? <i className="bi bi-check-lg"></i> : n}
                </div>
                <div className="es-progress-label">{label}</div>
              </div>
            )
          })}
        </div>

        <div className="es-form-card mx-auto" style={{ maxWidth: "760px" }}>
          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>{error}
            </div>
          )}

          {/* Step 1: Eligibility */}
          {step === 1 && (
            <div>
              <h4 className="mb-4"><i className="bi bi-clipboard2-check me-2 es-text-primary"></i>Eligibility Questions</h4>

              <div className="mb-4">
                <label className="form-label">Are you ready to proceed with this application?</label>
                <div className="d-flex gap-3">
                  <div className="form-check"><input className="form-check-input" type="radio" name="readyToProceed" value="yes" checked={form.readyToProceed === "yes"} onChange={(e) => set("readyToProceed", e.target.value)} /><label className="form-check-label">Yes</label></div>
                  <div className="form-check"><input className="form-check-input" type="radio" name="readyToProceed" value="no" checked={form.readyToProceed === "no"} onChange={(e) => set("readyToProceed", e.target.value)} /><label className="form-check-label">No</label></div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Is this your first time applying?</label>
                <div className="d-flex gap-3">
                  <div className="form-check"><input className="form-check-input" type="radio" name="firstTimeApplicant" value="yes" checked={form.firstTimeApplicant === "yes"} onChange={(e) => set("firstTimeApplicant", e.target.value)} /><label className="form-check-label">Yes</label></div>
                  <div className="form-check"><input className="form-check-input" type="radio" name="firstTimeApplicant" value="no" checked={form.firstTimeApplicant === "no"} onChange={(e) => set("firstTimeApplicant", e.target.value)} /><label className="form-check-label">No</label></div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">How did you hear about this fund?</label>
                <select className="form-select" value={form.heardAboutFunds} onChange={(e) => set("heardAboutFunds", e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="health_worker">Health Worker</option>
                  <option value="hospital">Hospital / Clinic</option>
                  <option value="radio">Radio</option>
                  <option value="social_media">Social Media</option>
                  <option value="community">Community Leader</option>
                  <option value="friend">Friend / Family</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {form.heardAboutFunds === "other" && (
                <div className="mb-4">
                  <label className="form-label">Please specify</label>
                  <input className="form-control" value={form.otherSource} onChange={(e) => set("otherSource", e.target.value)} placeholder="How did you hear about us?" />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Background */}
          {step === 2 && (
            <div>
              <h4 className="mb-4"><i className="bi bi-person-badge me-2 es-text-primary"></i>Your Background</h4>
              <div className="mb-4">
                <label className="form-label">Occupation</label>
                <select className="form-select" value={form.occupation} onChange={(e) => set("occupation", e.target.value)}>
                  <option value="">Select your occupation</option>
                  <option value="healthcare_worker">Healthcare Worker</option>
                  <option value="student">Student</option>
                  <option value="farmer">Farmer</option>
                  <option value="trader">Trader / Business</option>
                  <option value="teacher">Teacher</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {form.occupation === "other" && (
                <div className="mb-4">
                  <label className="form-label">Please specify your occupation</label>
                  <input className="form-control" value={form.otherOccupation} onChange={(e) => set("otherOccupation", e.target.value)} placeholder="Your occupation" />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Personal */}
          {step === 3 && (
            <div>
              <h4 className="mb-4"><i className="bi bi-person-vcard me-2 es-text-primary"></i>Personal Information</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name <span className="text-danger">*</span></label>
                  <input className="form-control" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="John Doe" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Age <span className="text-danger">*</span></label>
                  <input type="number" className="form-control" value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="25" min="0" max="120" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input className="form-control" value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} placeholder="+1234567890" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Country <span className="text-danger">*</span></label>
                  <select className="form-select" value={form.country} onChange={(e) => set("country", e.target.value)}>
                    <option value="">Select country</option>
                    <option>Liberia</option><option>Sierra Leone</option><option>Guinea</option>
                    <option>Democratic Republic of Congo</option><option>Uganda</option><option>Nigeria</option>
                    <option>Senegal</option><option>Mali</option><option>Côte d'Ivoire</option>
                    <option>Ghana</option><option>Cameroon</option><option>Other</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">State / Region <span className="text-danger">*</span></label>
                  <input className="form-control" value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="State or region" />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Town <span className="text-danger">*</span></label>
                  <input className="form-control" value={form.town} onChange={(e) => set("town", e.target.value)} placeholder="Town or city" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h4 className="mb-4"><i className="bi bi-check2-square me-2 es-text-primary"></i>Review Your Application</h4>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <tbody>
                    <tr><th className="text-muted" style={{ width: "40%" }}>Ready to proceed</th><td>{form.readyToProceed === "yes" ? "Yes" : "No"}</td></tr>
                    <tr><th className="text-muted">First time applicant</th><td>{form.firstTimeApplicant === "yes" ? "Yes" : "No"}</td></tr>
                    <tr><th className="text-muted">Heard about fund</th><td>{form.heardAboutFunds}{form.otherSource ? ` — ${form.otherSource}` : ""}</td></tr>
                    <tr><th className="text-muted">Occupation</th><td>{form.occupation}{form.otherOccupation ? ` — ${form.otherOccupation}` : ""}</td></tr>
                    <tr><th className="text-muted">Full Name</th><td>{form.fullName}</td></tr>
                    <tr><th className="text-muted">Age</th><td>{form.age}</td></tr>
                    <tr><th className="text-muted">Email</th><td>{form.email || "—"}</td></tr>
                    <tr><th className="text-muted">Phone</th><td>{form.phoneNumber || "—"}</td></tr>
                    <tr><th className="text-muted">Location</th><td>{[form.town, form.state, form.country].filter(Boolean).join(", ")}</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                Please confirm all details are correct before submitting. You will receive
                an application reference number after submission.
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="d-flex justify-content-between mt-4 pt-3 border-top">
            <button className="btn btn-outline-secondary" onClick={back} disabled={step === 1}>
              <i className="bi bi-arrow-left me-1"></i>Back
            </button>
            {step < 4 ? (
              <button className="btn btn-es" onClick={next}>
                Continue<i className="bi bi-arrow-right ms-1"></i>
              </button>
            ) : (
              <button className="btn btn-es" onClick={submit} disabled={submitting}>
                {submitting ? <><span className="spinner-border spinner-border-sm me-1"></span>Submitting...</> : <><i className="bi bi-check-lg me-1"></i>Submit Application</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
