import Link from "next/link"
import { AlertTriangle, Shield, Activity, Stethoscope, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="es-page">
      <section className="es-hero-sm text-white">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-light text-dark mb-3">About Ebola</span>
              <h1 className="display-5 fw-bold">Understanding Ebola Virus Disease</h1>
              <p className="lead">Learn about the disease, prevention, and where to get help.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="es-card mb-4">
              <div className="d-flex align-items-center mb-3">
                <div className="es-icon-box bg-danger-subtle text-danger me-3"><i className="bi bi-virus"></i></div>
                <h2 className="h4 mb-0">What is Ebola?</h2>
              </div>
              <p className="text-secondary">Ebola Virus Disease (EVD) is a severe, often fatal illness in humans caused by the Ebola virus. The virus is transmitted to people from wild animals and spreads in the human population through human-to-human transmission.</p>
              <p className="text-secondary">The average EVD case fatality rate is around 50%. However, with early supportive care and rehydration, patients have a significantly better chance of survival.</p>
            </div>

            <div className="es-card mb-4">
              <h2 className="h5 mb-3"><i className="bi bi-exclamation-triangle text-warning me-2"></i>Symptoms</h2>
              <ul className="list-group list-group-flush">
                {["High fever (above 38.6°C / 101.5°F)", "Severe headache", "Muscle and joint pain", "Weakness and fatigue", "Vomiting and diarrhea", "Unexplained bleeding or bruising"].map((s) => (
                  <li className="list-group-item border-0 d-flex align-items-center py-2" key={s}>
                    <i className="bi bi-circle-fill text-danger me-3" style={{ fontSize: "0.5rem" }}></i>{s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="es-card">
              <h2 className="h5 mb-3"><i className="bi bi-shield-check text-success me-2"></i>Prevention</h2>
              <div className="row g-3">
                {[
                  { t: "Hygiene", d: "Wash hands frequently with soap and water or use alcohol-based sanitizer.", i: "bi-droplet" },
                  { t: "Avoid Contact", d: "Avoid direct contact with bodily fluids of infected people.", i: "bi-person-x" },
                  { t: "Safe Burials", d: "Follow safe and dignified burial practices for victims.", i: "bi-shield" },
                  { t: "Vaccination", d: "The rVSV-ZEBOV vaccine is effective against the Zaire species.", i: "bi-shield-plus" },
                ].map((p) => (
                  <div className="col-md-6" key={p.t}>
                    <div className="d-flex">
                      <div className="es-icon-sm bg-success-subtle text-success me-3"><i className={`bi ${p.i}`}></i></div>
                      <div><h3 className="h6 mb-1">{p.t}</h3><p className="small text-muted mb-0">{p.d}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="es-card es-emergency-card mb-4">
              <h2 className="h5 text-danger mb-3"><i className="bi bi-exclamation-octagon me-2"></i>Emergency Contacts</h2>
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0"><div className="small text-muted">WHO Emergency</div><div className="fw-bold">+41 22 791 21 11</div></div>
                <div className="list-group-item border-0 px-0"><div className="small text-muted">CDC Emergency</div><div className="fw-bold">+1 800 232 4636</div></div>
                <div className="list-group-item border-0 px-0"><div className="small text-muted">Local Hotline</div><div className="fw-bold">117 (Free)</div></div>
              </div>
            </div>

            <div className="es-card bg-primary text-white">
              <h2 className="h5 mb-2"><i className="bi bi-cash-coin me-2"></i>Need Financial Help?</h2>
              <p className="small mb-3 opacity-75">Apply for emergency financial assistance for treatment and care.</p>
              <Link href="/apply" className="btn btn-light"><i className="bi bi-arrow-right me-1"></i>Start Application</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
