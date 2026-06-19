import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/SiteLayout"

export default function HomePage() {
  return (
    <SiteLayout activeKey="home">
      {/* ===== Hero ===== */}
      <header className="es-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                <i className="bi bi-shield-plus me-1"></i> Emergency Response Platform
              </span>
              <h1>Emergency Financial Support for Ebola Treatment</h1>
              <p className="lead">
                We provide rapid financial assistance to individuals and families
                affected by Ebola. Apply once, track your application, and receive
                support through a transparent review process.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link href="/apply" className="btn btn-light btn-lg fw-semibold">
                  <i className="bi bi-file-earmark-medical me-2"></i>
                  Start Your Application
                </Link>
                <Link href="/about" className="btn btn-outline-light btn-lg">
                  Learn About Ebola
                </Link>
              </div>
              <div className="row g-3 text-center">
                <div className="col-4"><div className="es-hero-stat"><div className="num">24h</div><div className="lbl">Initial review</div></div></div>
                <div className="col-4"><div className="es-hero-stat"><div className="num">5</div><div className="lbl">Day decision</div></div></div>
                <div className="col-4"><div className="es-hero-stat"><div className="num">100%</div><div className="lbl">Transparent</div></div></div>
              </div>
            </div>
            <div className="col-lg-6">
              <Image
                src="/images/hero-healthcare-workers.jpg"
                alt="Healthcare workers providing Ebola treatment and support"
                width={720}
                height={480}
                className="es-hero-img"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===== Services ===== */}
      <section className="es-section">
        <div className="container">
          <h2 className="es-section-title">How We Help</h2>
          <p className="es-section-sub">
            Comprehensive support for those affected by Ebola, from emergency medical
            costs to long-term recovery.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="es-card">
                <div className="icon" style={{ background: "var(--es-primary)" }}>
                  <i className="bi bi-hospital"></i>
                </div>
                <h3>Medical Treatment</h3>
                <p>Coverage for hospitalization, medication, and essential treatment at Ebola treatment centers.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="es-card">
                <div className="icon" style={{ background: "var(--es-accent)" }}>
                  <i className="bi bi-cash-coin"></i>
                </div>
                <h3>Financial Aid</h3>
                <p>Direct financial support for families to cover living expenses during treatment and recovery.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="es-card">
                <div className="icon" style={{ background: "var(--es-success)" }}>
                  <i className="bi bi-people"></i>
                </div>
                <h3>Survivor Support</h3>
                <p>Long-term recovery assistance including counseling and reintegration support for survivors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="es-section" style={{ background: "#f5f5f4" }}>
        <div className="container">
          <h2 className="es-section-title">How It Works</h2>
          <p className="es-section-sub">A simple, transparent process from application to support.</p>
          <div className="row g-4">
            <div className="col-md-3"><div className="es-step"><div className="es-step-num">1</div><h4>Submit Application</h4><p>Complete the online form with your details and needs.</p></div></div>
            <div className="col-md-3"><div className="es-step"><div className="es-step-num">2</div><h4>Initial Review</h4><p>Our team reviews your application within 24 hours.</p></div></div>
            <div className="col-md-3"><div className="es-step"><div className="es-step-num">3</div><h4>Verification</h4><p>We verify eligibility and contact you for any details.</p></div></div>
            <div className="col-md-3"><div className="es-step"><div className="es-step-num">4</div><h4>Receive Support</h4><p>Approved applicants receive financial assistance within 5 business days.</p></div></div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="es-section">
        <div className="container">
          <div className="es-content text-center" style={{ background: "linear-gradient(135deg, #7f1d1d, #b91c1c)", color: "#fff", border: "none" }}>
            <h2 className="text-white">Need Emergency Support?</h2>
            <p style={{ color: "rgba(255,255,255,0.9)", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
              If you or a family member is affected by Ebola, don&apos;t wait. Apply now
              and our team will review your application within 24 hours.
            </p>
            <Link href="/apply" className="btn btn-light btn-lg fw-semibold">
              <i className="bi bi-arrow-right-circle me-2"></i>Apply for Support
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
