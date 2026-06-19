"use client"

import { useState } from "react"
import { SiteLayout } from "@/components/SiteLayout"

const faqs = [
  {
    q: "What is Ebola?",
    a: "Ebola Virus Disease is a severe illness caused by the Ebola virus. It spreads through contact with bodily fluids of infected people or animals.",
  },
  {
    q: "How do I apply for support?",
    a: "Click 'Apply for Support' and complete the application. After submission, you'll receive a reference number for status tracking.",
  },
  {
    q: "Who can apply?",
    a: "Individuals and families affected by Ebola, including patients, caregivers, and bereaved households, may apply for assistance.",
  },
  {
    q: "Is this website official?",
    a: "No. This is a support and information platform designed to help users understand Ebola and submit assistance applications.",
  },
  {
    q: "How long does the review take?",
    a: "Initial review is completed within 24 hours. The full decision process takes up to 5 business days.",
  },
  {
    q: "How do I track my application?",
    a: "After submitting, you'll receive a reference number (e.g. EBM-2026-XXXXXX). Use it to check your application status.",
  },
  {
    q: "What if I need to edit my application?",
    a: "Your progress is saved automatically as you fill out the form. You can edit any section before final submission.",
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <SiteLayout activeKey="faq">
      <section className="es-hero-sm text-white">
        <div className="container py-5">
          <span className="badge bg-light text-dark mb-3">FAQ</span>
          <h1 className="display-5 fw-bold">Frequently Asked Questions</h1>
          <p className="lead">Find answers to common questions about Ebola and our support platform.</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, i) => (
                <div className="es-card mb-3" key={i}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${open === i ? "" : "collapsed"} bg-transparent shadow-none`}
                      type="button"
                      onClick={() => setOpen(open === i ? null : i)}
                      style={{ fontWeight: 600, color: "var(--es-dark)" }}
                    >
                      {faq.q}
                    </button>
                  </h2>
                  {open === i && (
                    <div className="accordion-body pt-0 text-secondary">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
