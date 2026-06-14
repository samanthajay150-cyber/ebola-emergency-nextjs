"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, ChevronRight, ChevronLeft, HelpCircle, User, MapPin, 
         Stethoscope, AlertCircle, Activity, Shield } from "lucide-react"

const STEPS = [
  { id: 1, title: "Eligibility", icon: HelpCircle },
  { id: 2, title: "Personal Info", icon: User },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Medical Info", icon: Stethoscope },
  { id: 5, title: "Review", icon: CheckCircle2 },
]

export default function ApplicationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedId, setSubmittedId] = useState("")
  const [formData, setFormData] = useState({
    readyToProceed: false,
    firstTimeApplicant: true,
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
    medicalCondition: "",
    hospitalName: "",
    doctorName: "",
    treatmentType: "",
    estimatedCost: "",
    additionalNotes: "",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        setSubmittedId(data.applicationId)
        setCurrentStep(6)
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Step 1: Eligibility Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-900">Before we begin:</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• You must be affected by Ebola or be a family member of someone affected</li>
                  <li>• Applications are processed within 48-72 hours</li>
                  <li>• All information is kept confidential</li>
                  <li>• Support is available in multiple languages</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="readyToProceed"
                    checked={formData.readyToProceed}
                    onChange={(e) => updateFormData("readyToProceed", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <label htmlFor="readyToProceed" className="font-medium">
                    I am ready to proceed with this application
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Is this your first time applying?</label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="firstTimeApplicant"
                        checked={formData.firstTimeApplicant === true}
                        onChange={() => updateFormData("firstTimeApplicant", true)}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="firstTimeApplicant"
                        checked={formData.firstTimeApplicant === false}
                        onChange={() => updateFormData("firstTimeApplicant", false)}
                        className="w-4 h-4"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-medium">How did you hear about us?</label>
                  <select
                    value={formData.heardAboutFunds}
                    onChange={(e) => updateFormData("heardAboutFunds", e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select option...</option>
                    <option value="hospital">Hospital/Healthcare Provider</option>
                    <option value="ngo">NGO/Charity Organization</option>
                    <option value="government">Government Agency</option>
                    <option value="community">Community Leader</option>
                    <option value="social_media">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="other">Other</option>
                  </select>
                  {formData.heardAboutFunds === "other" && (
                    <Input
                      placeholder="Please specify..."
                      value={formData.otherSource}
                      onChange={(e) => updateFormData("otherSource", e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Your Occupation</label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => updateFormData("occupation", e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select occupation...</option>
                    <option value="healthcare">Healthcare Worker</option>
                    <option value="teacher">Teacher/Educator</option>
                    <option value="farmer">Farmer</option>
                    <option value="merchant">Merchant/Trader</option>
                    <option value="student">Student</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="other">Other</option>
                  </select>
                  {formData.occupation === "other" && (
                    <Input
                      placeholder="Please specify..."
                      value={formData.otherOccupation}
                      onChange={(e) => updateFormData("otherOccupation", e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Step 2: Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Age *</label>
                  <Input
                    type="number"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Phone Number *</label>
                  <Input
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Step 3: Location Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Country *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateFormData("country", e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select country...</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Democratic Republic of Congo">Democratic Republic of Congo</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-medium">State/Province *</label>
                  <Input
                    placeholder="Enter state or province"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Town/City *</label>
                <Input
                  placeholder="Enter your town or city"
                  value={formData.town}
                  onChange={(e) => updateFormData("town", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Step 4: Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    This information helps us process your application faster. All medical information is kept strictly confidential.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Medical Condition</label>
                <Input
                  placeholder="Describe your medical condition"
                  value={formData.medicalCondition}
                  onChange={(e) => updateFormData("medicalCondition", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Hospital/Clinic Name</label>
                  <Input
                    placeholder="Hospital name"
                    value={formData.hospitalName}
                    onChange={(e) => updateFormData("hospitalName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Doctor's Name</label>
                  <Input
                    placeholder="Attending doctor"
                    value={formData.doctorName}
                    onChange={(e) => updateFormData("doctorName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-medium">Type of Treatment</label>
                  <select
                    value={formData.treatmentType}
                    onChange={(e) => updateFormData("treatmentType", e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Select...</option>
                    <option value="medication">Medication</option>
                    <option value="hospitalization">Hospitalization</option>
                    <option value="surgery">Surgery</option>
                    <option value="ongoing">Ongoing Treatment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Estimated Cost (USD)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.estimatedCost}
                    onChange={(e) => updateFormData("estimatedCost", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Additional Notes</label>
                <textarea
                  placeholder="Any additional information you'd like to share..."
                  value={formData.additionalNotes}
                  onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Step 5: Review Your Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800">
                  Please review your information below before submitting. You can go back to make changes if needed.
                </p>
              </div>

              {[
                { title: "Eligibility", data: { ...formData } },
                { title: "Personal Info", data: { fullName: formData.fullName, age: formData.age, email: formData.email, phone: formData.phoneNumber } },
                { title: "Location", data: { country: formData.country, state: formData.state, town: formData.town } },
                { title: "Medical Info", data: { medicalCondition: formData.medicalCondition, hospital: formData.hospitalName, treatment: formData.treatmentType } },
              ].map((section, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{section.title}</h3>
                    <Button variant="outline" size="sm" onClick={() => setCurrentStep(idx + 1)}>
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {Object.entries(section.data).map(([key, value]) => (
                      value && <div key={key}><span className="font-medium">{key}:</span> {String(value)}</div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-5 h-5 rounded border-gray-300 mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I confirm that the information provided is accurate and complete. I understand that providing false information may result in disqualification.
                </label>
              </div>
            </CardContent>
          </Card>
        )

      case 6:
        return (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your application has been successfully submitted.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-sm text-blue-800 mb-2">Your Application ID:</p>
                <p className="text-2xl font-mono font-bold text-blue-900">{submittedId}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Please save this ID. You can use it to check your application status at any time.
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => router.push("/check-status")}>
                  Check Status
                </Button>
                <Button variant="outline" onClick={() => router.push("/")}>
                  Return Home
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Application for Ebola Emergency Support</h1>
          <p className="text-gray-600">Complete the form below to apply for financial assistance</p>
        </div>

        {/* Progress Steps */}
        {currentStep < 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {STEPS.map((step, idx) => (
                <div key={step.id} className="flex-1 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentStep >= step.id 
                      ? "bg-primary text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs mt-2 font-medium">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {renderStep()}

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            {currentStep < 5 ? (
              <Button onClick={() => setCurrentStep(prev => prev + 1)}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
