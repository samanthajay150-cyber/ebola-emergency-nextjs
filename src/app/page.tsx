import Image from "next/image"
import Link from "next/link"
import { Heart, Activity, Users, Shield, Globe, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            <Heart style={{ color: "#10b981" }} size={28} />
            <span>Ebola Emergency Support</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/apply" className="nav-link">Apply</Link>
            <Link href="/admin" className="nav-link">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Emergency Financial Support for Ebola Treatment</h1>
          <p>
            We provide financial assistance to individuals and families affected by Ebola.
            Our platform ensures quick processing and transparent application review.
          </p>
          <Link href="/apply" className="btn btn-primary" style={{ fontSize: "18px", padding: "16px 32px" }}>
            Start Your Application
          </Link>
          <div style={{ marginTop: "40px" }}>
            <img 
              src="/images/hero-healthcare-workers.jpg"
              alt="Healthcare workers providing Ebola treatment"
              className="hero-image"
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container" style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "40px", fontWeight: 700 }}>
          Our Services
        </h2>
        <div className="grid grid-cols-3">
          <div className="card">
            <div style={{ marginBottom: "16px" }}>
              <Activity size={48} style={{ color: "#0066cc" }} />
            </div>
            <h3 style={{ fontSize: "20px", marginBottom: "12px", fontWeight: 600 }}>
              Treatment Support
            </h3>
            <p style={{ color: "#6b7280" }}>
              Direct financial assistance for medical treatment and hospitalization costs.
            </p>
          </div>

          <div className="card">
            <div style={{ marginBottom: "16px" }}>
              <Users size={48} style={{ color: "#10b981" }} />
            </div>
            <h3 style={{ fontSize: "20px", marginBottom: "12px", fontWeight: 600 }}>
              Family Support
            </h3>
            <p style={{ color: "#6b7280" }}>
              Support for families affected by Ebola, including childcare and basic needs.
            </p>
          </div>

          <div className="card">
            <div style={{ marginBottom: "16px" }}>
              <Shield size={48} style={{ color: "#14b8a6" }} />
            </div>
            <h3 style={{ fontSize: "20px", marginBottom: "12px", fontWeight: 600 }}>
              Emergency Aid
            </h3>
            <p style={{ color: "#6b7280" }}>
              Rapid response emergency funding for urgent medical and living expenses.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: "white", padding: "60px 20px" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "40px", fontWeight: 700 }}>
            How It Works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "#0066cc", 
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                margin: "0 auto 16px"
              }}>1</div>
              <h3 style={{ marginBottom: "8px", fontWeight: 600 }}>Apply Online</h3>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>Complete our simple 4-step application form</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "#0066cc", 
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                margin: "0 auto 16px"
              }}>2</div>
              <h3 style={{ marginBottom: "8px", fontWeight: 600 }}>Review</h3>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>Our team reviews within 24-48 hours</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "#0066cc", 
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                margin: "0 auto 16px"
              }}>3</div>
              <h3 style={{ marginBottom: "8px", fontWeight: 600 }}>Approval</h3>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>Receive notification of approval status</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%", 
                background: "#10b981", 
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 700,
                margin: "0 auto 16px"
              }}>4</div>
              <h3 style={{ marginBottom: "8px", fontWeight: 600 }}>Disbursement</h3>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>Funds transferred within 7 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container" style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "40px", fontWeight: 700 }}>
          Our Impact
        </h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">5,000+</div>
            <div className="stat-label">Applications Processed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">92%</div>
            <div className="stat-label">Approval Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">$2.5M</div>
            <div className="stat-label">Distributed in Aid</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">24hrs</div>
            <div className="stat-label">Average Response Time</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#0066cc", padding: "60px 20px", textAlign: "center", color: "white" }}>
        <div className="container">
          <h2 style={{ fontSize: "36px", marginBottom: "16px", fontWeight: 700 }}>
            Need Emergency Assistance?
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "30px", opacity: 0.95 }}>
            Apply now and receive a response within 24-48 hours
          </p>
          <Link href="/apply" className="btn btn-success" style={{ fontSize: "18px", padding: "16px 32px" }}>
            Start Application
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Heart style={{ color: "#10b981" }} size={24} />
              <span style={{ fontSize: "18px", fontWeight: 700 }}>Ebola Emergency Support</span>
            </div>
            <p style={{ opacity: 0.8, fontSize: "14px" }}>
              Providing emergency financial assistance to those affected by Ebola.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: "16px", fontWeight: 600 }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}><Link href="/" style={{ opacity: 0.8 }}>Home</Link></li>
              <li style={{ marginBottom: "8px" }}><Link href="/apply" style={{ opacity: 0.8 }}>Apply</Link></li>
              <li style={{ marginBottom: "8px" }}><Link href="/admin" style={{ opacity: 0.8 }}>Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: "16px", fontWeight: 600 }}>Contact</h4>
            <p style={{ opacity: 0.8, fontSize: "14px", marginBottom: "8px" }}>Email: support@ebola-emergency.org</p>
            <p style={{ opacity: 0.8, fontSize: "14px", marginBottom: "8px" }}>Phone: +1 (800) 123-4567</p>
            <p style={{ opacity: 0.8, fontSize: "14px" }}>Available Mon-Fri, 9AM-5PM (UTC)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
