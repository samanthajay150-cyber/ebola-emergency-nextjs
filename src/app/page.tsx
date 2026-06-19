import Link from "next/link"
import { 
  Heart, Activity, Users, Shield, Globe, Clock, 
  ArrowRight, AlertTriangle, Phone, FileText, 
  CheckCircle2, Stethoscope, MapPin, HelpCircle
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="page">
      {/* ==================== TOP ALERT BAR ==================== */}
      <div className="alert-bar">
        <div className="container alert-bar-content">
          <AlertTriangle size={16} />
          <span>Active Ebola Response — 24/7 Support Available</span>
          <a href="tel:+18005550199" className="alert-bar-phone">
            <Phone size={14} /> +1 (800) 555-0199
          </a>
        </div>
      </div>

      {/* ==================== NAVIGATION ==================== */}
      <nav className="nav">
        <div className="container nav-content">
          <Link href="/" className="nav-logo">
            <span className="nav-logo-icon">
              <Heart size={22} fill="currentColor" />
            </span>
            <span className="nav-logo-text">Ebola Emergency<span>Support</span></span>
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link active">Home</Link>
            <Link href="/about" className="nav-link">About Ebola</Link>
            <Link href="/resources" className="nav-link">Resources</Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
            <Link href="/apply" className="nav-link">Apply</Link>
            <Link href="/admin" className="nav-cta">Admin Login</Link>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-bg" style={{ backgroundImage: "url('/images/hero-ebola-treatment.jpg')" }} />
        <div className="container hero-content">
          <div className="hero-badge">
            <Activity size={14} /> Global Emergency Response Platform
          </div>
          <h1>Emergency Financial Support<br />for Ebola Treatment</h1>
          <p>
            We provide fast, transparent financial assistance to individuals and families 
            affected by Ebola. Apply online, track your application, and receive support 
            within 5-10 business days.
          </p>
          <div className="hero-actions">
            <Link href="/apply" className="btn btn-primary btn-lg">
              Start Your Application <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg">
              Learn About Ebola
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="stats-bar">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">2,847</div>
            <div className="stat-label">Applications Processed</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">1,923</div>
            <div className="stat-label">Families Supported</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">48h</div>
            <div className="stat-label">Average Response</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-number">32</div>
            <div className="stat-label">Countries Served</div>
          </div>
        </div>
      </section>

      {/* ==================== QUICK ACTIONS ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>What You Can Do Here</h2>
            <p>Get the support you need quickly and securely</p>
          </div>
          <div className="grid grid-cols-4">
            <Link href="/apply" className="action-card">
              <div className="action-card-icon action-card-icon-red">
                <FileText size={28} />
              </div>
              <h3>Apply for Support</h3>
              <p>Submit your application for emergency financial assistance</p>
              <span className="action-card-link">Start now <ArrowRight size={14} /></span>
            </Link>
            <Link href="/track" className="action-card">
              <div className="action-card-icon action-card-icon-blue">
                <Clock size={28} />
              </div>
              <h3>Track Application</h3>
              <p>Check the status of your submitted application</p>
              <span className="action-card-link">Check status <ArrowRight size={14} /></span>
            </Link>
            <Link href="/resources" className="action-card">
              <div className="action-card-icon action-card-icon-green">
                <Shield size={28} />
              </div>
              <h3>Resources</h3>
              <p>Access Ebola treatment guides and educational materials</p>
              <span className="action-card-link">View resources <ArrowRight size={14} /></span>
            </Link>
            <Link href="/faq" className="action-card">
              <div className="action-card-icon action-card-icon-amber">
                <HelpCircle size={28} />
              </div>
              <h3>Get Answers</h3>
              <p>Frequently asked questions about the support program</p>
              <span className="action-card-link">Read FAQ <ArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT EBOLA ==================== */}
      <section className="section section-tint">
        <div className="container">
          <div className="two-col">
            <div className="two-col-text">
              <div className="section-tag">About Ebola</div>
              <h2>Understanding Ebola Virus Disease</h2>
              <p>
                Ebola Virus Disease (EVD) is a severe illness affecting humans and other 
                primates. Early supportive care with rehydration and symptomatic treatment 
                improves survival rates significantly.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={18} /> Caused by the Ebolavirus species</li>
                <li><CheckCircle2 size={18} /> Transmitted through direct contact</li>
                <li><CheckCircle2 size={18} /> Symptoms appear 2-21 days after exposure</li>
                <li><CheckCircle2 size={18} /> Treatable with early medical intervention</li>
              </ul>
              <Link href="/about" className="btn btn-primary">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
            <div className="two-col-image">
              <img 
                src="/images/ebola-patient-care.jpg" 
                alt="Ebola patient receiving care"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SYMPTOMS ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Signs & Symptoms</h2>
            <p>Recognize the warning signs early</p>
          </div>
          <div className="grid grid-cols-3">
            <div className="symptom-card">
              <div className="symptom-card-icon"><Activity size={24} /></div>
              <h3>Early Stage (2-21 days)</h3>
              <ul>
                <li>High fever</li>
                <li>Severe headache</li>
                <li>Muscle and joint pain</li>
                <li>Fatigue and weakness</li>
              </ul>
            </div>
            <div className="symptom-card">
              <div className="symptom-card-icon"><AlertTriangle size={24} /></div>
              <h3>Advanced Stage</h3>
              <ul>
                <li>Vomiting and diarrhea</li>
                <li>Rash</li>
                <li>Impaired kidney function</li>
                <li>Internal and external bleeding</li>
              </ul>
            </div>
            <div className="symptom-card">
              <div className="symptom-card-icon"><Phone size={24} /></div>
              <h3>Seek Immediate Care</h3>
              <ul>
                <li>Contact emergency services</li>
                <li>Isolate from others</li>
                <li>Inform healthcare providers</li>
                <li>Apply for financial support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT SPREADS ==================== */}
      <section className="section section-tint">
        <div className="container">
          <div className="two-col two-col-reverse">
            <div className="two-col-image">
              <img 
                src="/images/ebola-workers-team.jpg" 
                alt="Ebola healthcare response team"
              />
            </div>
            <div className="two-col-text">
              <div className="section-tag">Transmission</div>
              <h2>How Ebola Spreads</h2>
              <p>
                Ebola spreads through direct contact with bodily fluids of a person who is 
                sick with or has died from Ebola, or objects contaminated with the virus.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={18} /> Direct contact with blood or body fluids</li>
                <li><CheckCircle2 size={18} /> Contact with contaminated objects (needles)</li>
                <li><CheckCircle2 size={18} /> Contact with infected animals (bats, primates)</li>
                <li><CheckCircle2 size={18} /> Not spread through air or water</li>
              </ul>
              <Link href="/about" className="btn btn-primary">
                Prevention Tips <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PREVENTION ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Prevention & Protection</h2>
            <p>Keep yourself and your community safe</p>
          </div>
          <div className="grid grid-cols-4">
            <div className="prevention-card">
              <div className="prevention-card-icon"><Shield size={24} /></div>
              <h3>Practice Hygiene</h3>
              <p>Wash hands frequently with soap and water or use alcohol-based sanitizer</p>
            </div>
            <div className="prevention-card">
              <div className="prevention-card-icon"><Users size={24} /></div>
              <h3>Avoid Contact</h3>
              <p>Avoid direct contact with infected individuals and bodily fluids</p>
            </div>
            <div className="prevention-card">
              <div className="prevention-card-icon"><Stethoscope size={24} /></div>
              <h3>Seek Care Early</h3>
              <p>Early treatment significantly improves survival chances</p>
            </div>
            <div className="prevention-card">
              <div className="prevention-card-icon"><MapPin size={24} /></div>
              <h3>Safe Burials</h3>
              <p>Follow safe and dignified burial practices for Ebola victims</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOR HEALTHCARE WORKERS ==================== */}
      <section className="section section-dark">
        <div className="container">
          <div className="two-col">
            <div className="two-col-image">
              <img 
                src="/images/ebola-supplies.jpg" 
                alt="Ebola medical supplies and PPE"
              />
            </div>
            <div className="two-col-text two-col-text-light">
              <div className="section-tag section-tag-light">For Healthcare Workers</div>
              <h2>Resources for Medical Professionals</h2>
              <p>
                Access clinical guidelines, PPE protocols, training materials, and 
                patient management resources designed for frontline healthcare workers 
                responding to Ebola outbreaks.
              </p>
              <ul className="feature-list feature-list-light">
                <li><CheckCircle2 size={18} /> Clinical treatment guidelines</li>
                <li><CheckCircle2 size={18} /> PPE and infection control protocols</li>
                <li><CheckCircle2 size={18} /> Patient isolation procedures</li>
                <li><CheckCircle2 size={18} /> Staff training and certification</li>
              </ul>
              <Link href="/resources" className="btn btn-primary">
                Access Resources <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="section section-cta">
        <div className="container cta-content">
          <h2>Need Emergency Support?</h2>
          <p>Apply now for financial assistance. Applications are processed within 5-10 business days.</p>
          <Link href="/apply" className="btn btn-primary btn-lg">
            Start Your Application <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="nav-logo-icon">
                <Heart size={22} fill="currentColor" />
              </span>
              <span>Ebola Emergency Support</span>
            </div>
            <p>Providing emergency financial assistance and treatment support for individuals and families affected by Ebola worldwide.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/apply">Apply for Support</Link>
            <Link href="/track">Track Application</Link>
            <Link href="/about">About Ebola</Link>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <Link href="/resources">Resource Library</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">Symptoms</Link>
            <Link href="/about">Prevention</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p><Phone size={14} /> +1 (800) 555-0199</p>
            <p><Globe size={14} /> support@ebola-emergency.org</p>
            <p><Clock size={14} /> 24/7 Emergency Support</p>
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
