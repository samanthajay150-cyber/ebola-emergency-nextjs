import Link from "next/link"
import { Heart, ChevronDown } from "lucide-react"

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
]

export default function FAQPage() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-icon"><Heart size={22} fill="currentColor" /></span>
            <span className="nav-logo-text">Ebola Emergency<span>Support</span></span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Ebola</Link>
            <Link href="/resources" className="nav-link">Resources</Link>
            <Link href="/faq" className="nav-link active">FAQ</Link>
            <Link href="/apply" className="nav-link">Apply</Link>
          </div>
        </div>
      </nav>

      <div className="page-header">
        <div className="container">
          <div className="page-header-tag">FAQ</div>
          <h1>Frequently Asked Questions</h1>
          <p>Answers to common questions about Ebola and the support program</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <ChevronDown size={18} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
