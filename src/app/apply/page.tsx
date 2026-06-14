"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ApplyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
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
    town: ""
  })
  const [submitted, setSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")
  const [loading, setLoading] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = (currentStep: number): number => {
    if (currentStep === 1) return 2
    if (currentStep === 2) return 3
    if (currentStep === 3) return 4
    return 4
  }

  const prevStep = (currentStep: number): number => {
    if (currentStep === 4) return 3
    if (currentStep === 3) return 2
    if (currentStep === 2) return 1
    return 1
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          readyToProceed: formData.readyToProceed === "yes",
          firstTimeApplicant: formData.firstTimeApplicant === "yes"
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setApplicationId(data.applicationId)
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
        <nav className="nav">
          <div className="nav-content">
            <Link href="/" className="nav-logo">
              <span>Ebola Emergency Support</span>
            </Link>
          </div>
        </nav>

        <div className="container" style={{ padding: "60px 20px", textAlign: "center" }}>
          <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              background: "#10b981",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              margin: "0 auto 24px"
            }}>✓</div>
            <h1 style={{ fontSize: "32px", marginBottom: "16px", fontWeight: 700 }}>
              Application Submitted!
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Your application has been received and is being reviewed.
            </p>
            <div className="card" style={{ background: "#f9fafb", marginBottom: "24px" }}>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Application ID</p>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "#0066cc" }}>{applicationId}</p>
            </div>
            <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
              Please save your Application ID. You will need it to check your application status.
            </p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            <span>Ebola Emergency Support</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/apply" className="nav-link">Apply</Link>
            <Link href="/admin" className="nav-link">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container" style={{ padding: "40px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "36px", marginBottom: "12px", fontWeight: 700 }}>
              Application for Emergency Support
            </h1>
            <p style={{ color: "#6b7280", fontSize: "18px" }}>
              Complete the form below to apply for financial assistance
            </p>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: "40px" }}>
            <div className="progress-container">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className={`progress-step ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                  <div className="progress-circle">{step}</div>
                  <div className="progress-label">
                    {step === 1 && "Getting Started"}
                    {step === 2 && "Personal Info"}
                    {step === 3 && "Location"}
                    {step === 4 && "Review"}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ 
              height: "4px", 
              background: "#e5e7eb", 
              borderRadius: "2px",
              marginTop: "-40px",
              position: "relative",
              zIndex: 0
            }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0066cc 0%, #10b981 100%)",
                borderRadius: "2px",
                transition: "width 0.3s"
              }} />
            </div>
          </div>

          {/* Form Card */}
          <div className="card">
            {/* Step 1: Getting Started */}
            {currentStep === 1 && (
              <div className="fade-in">
                <div className="card-header">
                  <h2 className="card-title">Getting Started</h2>
                  <p style={{ color: "#6b7280", marginTop: "8px" }}>
                    Tell us a bit about yourself and how you heard about us
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Are you ready to proceed with the application? *</label>
                  <div className="radio-group">
                    <label className={`radio-label ${formData.readyToProceed === "yes" ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="readyToProceed"
                        value="yes"
                        checked={formData.readyToProceed === "yes"}
                        onChange={(e) => handleInputChange("readyToProceed", e.target.value)}
                        style={{ display: "none" }}
                      />
                      Yes
                    </label>
                    <label className={`radio-label ${formData.readyToProceed === "no" ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="readyToProceed"
                        value="no"
                        checked={formData.readyToProceed === "no"}
                        onChange={(e) => handleInputChange("readyToProceed", e.target.value)}
                        style={{ display: "none" }}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Is this your first time applying? *</label>
                  <div className="radio-group">
                    <label className={`radio-label ${formData.firstTimeApplicant === "yes" ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="firstTimeApplicant"
                        value="yes"
                        checked={formData.firstTimeApplicant === "yes"}
                        onChange={(e) => handleInputChange("firstTimeApplicant", e.target.value)}
                        style={{ display: "none" }}
                      />
                      Yes
                    </label>
                    <label className={`radio-label ${formData.firstTimeApplicant === "no" ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="firstTimeApplicant"
                        value="no"
                        checked={formData.firstTimeApplicant === "no"}
                        onChange={(e) => handleInputChange("firstTimeApplicant", e.target.value)}
                        style={{ display: "none" }}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">How did you hear about us? *</label>
                  <select
                    className="form-input"
                    value={formData.heardAboutFunds}
                    onChange={(e) => handleInputChange("heardAboutFunds", e.target.value)}
                  >
                    <option value="">Select an option</option>
                    <option value="healthcare_worker">Healthcare Worker</option>
                    <option value="community_leader">Community Leader</option>
                    <option value="social_media">Social Media</option>
                    <option value="radio">Radio</option>
                    <option value="tv">Television</option>
                    <option value="friend">Friend or Family</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {formData.heardAboutFunds === "other" && (
                  <div className="form-group">
                    <label className="form-label">Please specify *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.otherSource}
                      onChange={(e) => handleInputChange("otherSource", e.target.value)}
                      placeholder="How did you hear about us?"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="fade-in">
                <div className="card-header">
                  <h2 className="card-title">Personal Information</h2>
                  <p style={{ color: "#6b7280", marginTop: "8px" }}>
                    Please provide your personal details
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Occupation *</label>
                  <select
                    className="form-input"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                  >
                    <option value="">Select your occupation</option>
                    <option value="healthcare_worker">Healthcare Worker</option>
                    <option value="teacher">Teacher</option>
                    <option value="farmer">Farmer</option>
                    <option value="student">Student</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {formData.occupation === "other" && (
                  <div className="form-group">
                    <label className="form-label">Please specify *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.otherOccupation}
                      onChange={(e) => handleInputChange("otherOccupation", e.target.value)}
                      placeholder="Your occupation"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="+256 XXX XXX XXX"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="fade-in">
                <div className="card-header">
                  <h2 className="card-title">Location Details</h2>
                  <p style={{ color: "#6b7280", marginTop: "8px" }}>
                    Where are you located?
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Country *</label>
                  <select
                    className="form-input"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                  >
                    <option value="">Select your country</option>
                    <option value="DRC">Democratic Republic of Congo</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">State/Province *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Enter your state or province"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Town/City *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.town}
                    onChange={(e) => handleInputChange("town", e.target.value)}
                    placeholder="Enter your town or city"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="fade-in">
                <div className="card-header">
                  <h2 className="card-title">Review Your Application</h2>
                  <p style={{ color: "#6b7280", marginTop: "8px" }}>
                    Please verify all information before submitting
                  </p>
                </div>

                <div className="card" style={{ background: "#f9fafb", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "16px", fontWeight: 600 }}>Personal Information</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>Full Name:</span>
                      <p style={{ fontWeight: 600 }}>{formData.fullName || "Not provided"}</p>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>Age:</span>
                      <p style={{ fontWeight: 600 }}>{formData.age || "Not provided"}</p>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>Email:</span>
                      <p style={{ fontWeight: 600 }}>{formData.email || "Not provided"}</p>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>Phone:</span>
                      <p style={{ fontWeight: 600 }}>{formData.phoneNumber || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ background: "#f9fafb", marginBottom: "20px" }}>
                  <h3 style={{ fontSize: "18px", marginBottom: "16px", fontWeight: 600 }}>Location</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                    <div>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>Country:</span>
                      <p style={{ fontWeight: 600 }}>{formData.country || "Not provided"}</p>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>State:</span>
                      <p style={{ fontWeight: 600 }}>{formData.state || "Not provided"}</p>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280", fontSize: "14px" }}>Town:</span>
                      <p style={{ fontWeight: 600 }}>{formData.town || "Not provided"}</p>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: "#fef3c7", 
                  border: "1px solid #fbbf24", 
                  borderRadius: "6px",
                  padding: "16px",
                  marginBottom: "20px"
                }}>
                  <p style={{ marginBottom: "8px", fontWeight: 600 }}>⚠️ Important Notice</p>
                  <p style={{ fontSize: "14px", color: "#92400e" }}>
                    By submitting this application, you confirm that all information provided is accurate 
                    and complete. False information may result in disqualification.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb"
            }}>
              {currentStep > 1 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(prevStep(currentStep))}
                >
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(nextStep(currentStep))}
                  style={{ marginLeft: "auto" }}
                >
                  Next Step
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ marginLeft: "auto" }}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
