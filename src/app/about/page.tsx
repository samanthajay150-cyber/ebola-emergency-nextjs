import Link from "next/link"
import { ArrowRight, AlertTriangle, Heart, Shield, Activity, Users, Stethoscope, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
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
            <Link href="/about" className="nav-link active">About Ebola</Link>
            <Link href="/resources" className="nav-link">Resources</Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
            <Link href="/apply" className="nav-link">Apply</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="page-header-tag">Information</div>
          <h1>About Ebola Virus Disease</h1>
          <p>Understanding Ebola, its symptoms, transmission, and prevention</p>
        </div>
      </div>

      {/* What is Ebola */}
      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>What is Ebola Virus Disease?</h2>
            <p>
              Ebola Virus Disease (EVD), formerly known as Ebola hemorrhagic fever, is a severe, 
              often fatal illness affecting humans and other primates. The virus is transmitted 
              to people from wild animals and spreads in the human population through human-to-human 
              transmission.
            </p>
            <p>
              The average EVD case fatality rate is around 50%. Case fatality rates have varied 
              from 25% to 90% in past outbreaks. However, with early supportive care and proper 
              treatment, survival rates improve dramatically.
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-header">
            <h2>Signs and Symptoms</h2>
            <p>Symptoms may appear anywhere from 2 to 21 days after exposure to Ebola</p>
          </div>
          <div className="grid grid-cols-3">
            <div className="symptom-card">
              <div className="symptom-card-icon"><Activity size={24} /></div>
              <h3>Early Symptoms</h3>
              <ul>
                <li>High fever (&ge;38.6&deg;C)</li>
                <li>Severe headache</li>
                <li>Joint and muscle pain</li>
                <li>Chills and fatigue</li>
                <li>Sore throat</li>
              </ul>
            </div>
            <div className="symptom-card">
              <div className="symptom-card-icon"><AlertTriangle size={24} /></div>
              <h3>Advanced Symptoms</h3>
              <ul>
                <li>Vomiting and diarrhea</li>
                <li>Red eyes and skin rash</li>
                <li>Impaired kidney and liver function</li>
                <li>Internal and external bleeding</li>
                <li>Reduced white blood cell count</li>
              </ul>
            </div>
            <div className="symptom-card">
              <div className="symptom-card-icon"><Stethoscope size={24} /></div>
              <h3>Recovery Signs</h3>
              <ul>
                <li>Stable fever</li>
                <li>Improved appetite</li>
                <li>Reduced symptoms</li>
                <li>Restored organ function</li>
                <li>Negative test results</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transmission */}
      <section className="section">
        <div className="container">
          <div className="two-col">
            <div className="two-col-image">
              <img src="/images/ebola-workers-team.jpg" alt="Ebola response team" />
            </div>
            <div className="two-col-text">
              <div className="section-tag">Transmission</div>
              <h2>How Ebola Spreads</h2>
              <p>
                Ebola is introduced into the human population through close contact with the 
                blood, secretions, organs, or other bodily fluids of infected animals.
              </p>
              <h3>Human-to-Human Transmission</h3>
              <ul className="feature-list">
                <li><Shield size={18} /> Direct contact with blood or body fluids</li>
                <li><Shield size={18} /> Contact with objects contaminated with bodily fluids</li>
                <li><Shield size={18} /> Contact with semen from a man who has recovered</li>
                <li><Shield size={18} /> Direct contact with the deceased</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-header">
            <h2>Prevention and Control</h2>
            <p>Effective measures to prevent Ebola transmission</p>
          </div>
          <div className="grid grid-cols-4">
            <div className="prevention-card">
              <div className="prevention-card-icon"><Shield size={24} /></div>
              <h3>Hand Hygiene</h3>
              <p>Wash hands frequently with soap and water or alcohol-based sanitizer</p>
            </div>
            <div className="prevention-card">
              <div className="prevention-card-icon"><Users size={24} /></div>
              <h3>Avoid Contact</h3>
              <p>Avoid direct contact with infected individuals and bodily fluids</p>
            </div>
            <div className="prevention-card">
              <div className="prevention-card-icon"><Stethoscope size={24} /></div>
              <h3>Use PPE</h3>
              <p>Healthcare workers must use proper personal protective equipment</p>
            </div>
            <div className="prevention-card">
              <div className="prevention-card-icon"><Activity size={24} /></div>
              <h3>Safe Practices</h3>
              <p>Follow safe burial practices and avoid contact with wild animals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment */}
      <section className="section">
        <div className="container">
          <div className="two-col two-col-reverse">
            <div className="two-col-image">
              <img src="/images/ebola-patient-care.jpg" alt="Patient receiving treatment" />
            </div>
            <div className="two-col-text">
              <div className="section-tag">Treatment</div>
              <h2>Treatment Options</h2>
              <p>
                Early supportive care with rehydration, symptomatic treatment improves survival. 
                There are now approved vaccines and treatments for Ebola.
              </p>
              <ul className="feature-list">
                <li><CheckCircle2 size={18} /> Rehydration with oral or intravenous fluids</li>
                <li><CheckCircle2 size={18} /> Treatment of specific symptoms</li>
                <li><CheckCircle2 size={18} /> Maintaining oxygen status and blood pressure</li>
                <li><CheckCircle2 size={18} /> Treating concurrent infections</li>
                <li><CheckCircle2 size={18} /> Approved antiviral medications</li>
              </ul>
              <Link href="/apply" className="btn btn-primary">
                Apply for Support <ArrowRight size={16} />
              </Link>
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
