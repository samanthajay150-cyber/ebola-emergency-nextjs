import Link from "next/link"
import { FileText, Download, Video, BookOpen, Globe, Heart, Phone, ArrowRight, ExternalLink } from "lucide-react"

export default function ResourcesPage() {
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
            <Link href="/resources" className="nav-link active">Resources</Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
            <Link href="/apply" className="nav-link">Apply</Link>
          </div>
        </div>
      </nav>

      <div className="page-header">
        <div className="container">
          <div className="page-header-tag">Resources</div>
          <h1>Communication & Training Resources</h1>
          <p>Access official guidelines, training materials, and support resources</p>
        </div>
      </div>

      {/* Quick Resources */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-3">
            <div className="resource-card">
              <div className="resource-card-icon"><FileText size={28} /></div>
              <h3>Fact Sheets</h3>
              <p>Download official Ebola fact sheets and information pamphlets in multiple languages</p>
              <Link href="#" className="resource-card-link">
                View Fact Sheets <ArrowRight size={14} />
              </Link>
            </div>
            <div className="resource-card">
              <div className="resource-card-icon"><BookOpen size={28} /></div>
              <h3>Guidelines</h3>
              <p>Official clinical guidelines for healthcare workers and treatment protocols</p>
              <Link href="#" className="resource-card-link">
                View Guidelines <ArrowRight size={14} />
              </Link>
            </div>
            <div className="resource-card">
              <div className="resource-card-icon"><Video size={28} /></div>
              <h3>Training Materials</h3>
              <p>Training videos and courses for healthcare providers and community workers</p>
              <Link href="#" className="resource-card-link">
                View Training <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-header">
            <h2>Official Health Organization Resources</h2>
            <p>Trusted sources for Ebola information and updates</p>
          </div>
          <div className="grid grid-cols-2">
            <a href="https://www.who.int/health-topics/ebola" target="_blank" rel="noopener noreferrer" className="external-resource-card">
              <div className="external-resource-card-header">
                <Globe size={24} />
                <h3>World Health Organization</h3>
              </div>
              <p>Comprehensive information on Ebola outbreaks, research, and global response efforts</p>
              <div className="external-resource-card-link">
                Visit WHO Ebola Page <ExternalLink size={14} />
              </div>
            </a>
            <a href="https://www.cdc.gov/ebola" target="_blank" rel="noopener noreferrer" className="external-resource-card">
              <div className="external-resource-card-header">
                <Globe size={24} />
                <h3>Centers for Disease Control</h3>
              </div>
              <p>Detailed information on Ebola symptoms, treatment, and prevention for the United States</p>
              <div className="external-resource-card-link">
                Visit CDC Ebola Page <ExternalLink size={14} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="section">
        <div className="container">
          <div className="emergency-contacts">
            <h2>Emergency Contacts</h2>
            <p>If you suspect you or someone else may have Ebola, contact these emergency services immediately</p>
            <div className="grid grid-cols-3">
              <div className="contact-card">
                <div className="contact-card-icon"><Phone size={24} /></div>
                <h3>24/7 Hotline</h3>
                <p className="contact-card-value">+1 (800) 555-0199</p>
                <p>Available in English, French, and local languages</p>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><Phone size={24} /></div>
                <h3>WHO Emergency</h3>
                <p className="contact-card-value">+41 22 791 21 11</p>
                <p>World Health Organization global emergency line</p>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><Phone size={24} /></div>
                <h3>CDC Emergency</h3>
                <p className="contact-card-value">1-800-CDC-INFO</p>
                <p>Centers for Disease Control and Prevention</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="nav-logo-icon"><Heart size={22} fill="currentColor" /></span>
              <span>Ebola Emergency Support</span>
            </div>
            <p>Providing emergency financial assistance and treatment support for individuals and families affected by Ebola worldwide.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/apply">Apply for Support</Link>
            <Link href="/about">About Ebola</Link>
            <Link href="/resources">Resources</Link>
          </div>
          <div className="footer-col">
            <h4>Information</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">Symptoms</Link>
            <Link href="/about">Prevention</Link>
            <Link href="/resources">Guidelines</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>24/7 Emergency Support</p>
            <p>+1 (800) 555-0199</p>
            <p>support@ebola-emergency.org</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Ebola Emergency Support. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
