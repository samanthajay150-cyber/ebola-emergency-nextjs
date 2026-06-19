"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Phone, Mail, Clock, MapPin, AlertCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

interface SiteLayoutProps {
  children: React.ReactNode
  activeKey?: string
  hideApply?: boolean
}

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Ebola" },
    { href: "/resources", label: "Resources" },
    { href: "/faq", label: "FAQ" },
    { href: "/apply", label: "Apply", highlight: true },
  ]

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: "#fff", borderBottom: "3px solid #dc2626" }}>
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold" style={{ color: "#dc2626", fontSize: "1.25rem" }}>
          <span className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ backgroundColor: "#dc2626", width: "40px", height: "40px" }}>
            <Heart size={20} color="#fff" />
          </span>
          <span>Ebola Emergency Support</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {navItems.map((item) => (
              <li className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? "active" : ""} ${item.highlight ? "btn btn-danger text-white px-3 fw-semibold" : ""}`}
                  style={item.highlight ? {} : { color: pathname === item.href ? "#dc2626" : "#374151", fontWeight: pathname === item.href ? 600 : 500 }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1f2937", color: "#e5e7eb" }} className="mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ backgroundColor: "#dc2626", width: "40px", height: "40px" }}>
                <Heart size={20} color="#fff" />
              </span>
              <h5 className="mb-0 text-white fw-bold">Ebola Emergency Support</h5>
            </div>
            <p className="small" style={{ color: "#9ca3af" }}>
              Providing emergency financial assistance to individuals and families affected by Ebola.
              Quick processing, transparent review, and dedicated support throughout your journey.
            </p>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link href="/" style={{ color: "#9ca3af", textDecoration: "none" }}>Home</Link></li>
              <li className="mb-2"><Link href="/about" style={{ color: "#9ca3af", textDecoration: "none" }}>About Ebola</Link></li>
              <li className="mb-2"><Link href="/resources" style={{ color: "#9ca3af", textDecoration: "none" }}>Resources</Link></li>
              <li className="mb-2"><Link href="/faq" style={{ color: "#9ca3af", textDecoration: "none" }}>FAQ</Link></li>
              <li className="mb-2"><Link href="/apply" style={{ color: "#9ca3af", textDecoration: "none" }}>Apply for Support</Link></li>
            </ul>
          </div>

          <div className="col-lg-5 col-md-6">
            <h6 className="text-white fw-semibold mb-3">Emergency Contact</h6>
            <ul className="list-unstyled small">
              <li className="d-flex align-items-center gap-2 mb-2" style={{ color: "#9ca3af" }}>
                <Phone size={16} color="#dc2626" />
                <span>Emergency Hotline: +1 (800) 555-EBOLA</span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-2" style={{ color: "#9ca3af" }}>
                <Mail size={16} color="#dc2626" />
                <span>support@ebolaemergency.org</span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-2" style={{ color: "#9ca3af" }}>
                <Clock size={16} color="#dc2626" />
                <span>24/7 Support Available</span>
              </li>
              <li className="d-flex align-items-start gap-2 mb-2" style={{ color: "#9ca3af" }}>
                <AlertCircle size={16} color="#dc2626" className="mt-1 flex-shrink-0" />
                <span>If you or someone you know is experiencing Ebola symptoms, seek medical attention immediately.</span>
              </li>
            </ul>
            <Link href="/apply" className="btn btn-danger btn-sm mt-2 d-inline-flex align-items-center gap-2">
              Start Application <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <hr style={{ borderColor: "#374151" }} className="my-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <p className="small mb-0" style={{ color: "#9ca3af" }}>
            &copy; {new Date().getFullYear()} Ebola Emergency Support. All rights reserved.
          </p>
          <p className="small mb-0" style={{ color: "#9ca3af" }}>
            For educational and demonstration purposes. Not affiliated with WHO or CDC.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function SiteLayout({ children, activeKey, hideApply }: SiteLayoutProps) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  )
}
