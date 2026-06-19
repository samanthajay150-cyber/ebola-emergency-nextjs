import Link from "next/link"

export default function ResourcesPage() {
  const resources = [
    { t: "WHO Ebola Guidance", d: "Official World Health Organization guidance documents on Ebola outbreak response and clinical management.", u: "https://www.who.int/health-topics/ebola", i: "bi-globe" },
    { t: "CDC Ebola Resources", d: "Comprehensive CDC resources including fact sheets, posters, and clinical guidance for healthcare workers.", u: "https://www.cdc.gov/ebola", i: "bi-file-medical" },
    { t: "MSF Ebola Response", d: "Doctors Without Borders field reports and protocols from the frontlines of Ebola treatment.", u: "https://www.msf.org/ebola", i: "bi-heart-pulse" },
    { t: "Africa CDC", d: "Africa Centres for Disease Control and Prevention outbreak updates and regional coordination.", u: "https://africacdc.org", i: "bi-map" },
  ]

  return (
    <div className="es-page">
      <section className="es-hero-sm text-white">
        <div className="container py-5">
          <span className="badge bg-light text-dark mb-3">Resources</span>
          <h1 className="display-5 fw-bold">Helpful Resources &amp; References</h1>
          <p className="lead">Trusted sources for Ebola information, guidance, and support.</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          {resources.map((r) => (
            <div className="col-md-6" key={r.t}>
              <a href={r.u} target="_blank" rel="noopener noreferrer" className="es-card d-block text-decoration-none text-reset h-100">
                <div className="d-flex align-items-start">
                  <div className="es-icon-box bg-primary-subtle text-primary me-3"><i className={`bi ${r.i}`}></i></div>
                  <div>
                    <h2 className="h5 mb-1">{r.t}</h2>
                    <p className="text-muted small mb-2">{r.d}</p>
                    <span className="text-primary small fw-medium">Visit resource <i className="bi bi-arrow-right"></i></span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="es-card mt-5 bg-light">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="h5 mb-1">Need financial assistance?</h2>
              <p className="text-muted mb-md-0">Our platform helps you apply for emergency funds for Ebola treatment and care.</p>
            </div>
            <div className="col-md-4 text-md-end">
              <Link href="/apply" className="btn btn-es"><i className="bi bi-arrow-right me-1"></i>Apply Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
