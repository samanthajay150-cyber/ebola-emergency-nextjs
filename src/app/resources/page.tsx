import { SiteLayout } from "@/components/SiteLayout"

export default function ResourcesPage() {
  const resources = [
    { t: "WHO Ebola Guidance", d: "Official World Health Organization guidance documents on Ebola outbreak response and clinical management.", u: "https://www.who.int/health-topics/ebola", i: "bi-globe" },
    { t: "CDC Ebola Resources", d: "Comprehensive CDC resources including fact sheets, posters, and clinical guidance for healthcare workers.", u: "https://www.cdc.gov/ebola", i: "bi-file-medical" },
    { t: "MSF Ebola Response", d: "Doctors Without Borders field reports and protocols from the frontlines of Ebola treatment.", u: "https://www.msf.org/ebola", i: "bi-heart-pulse" },
    { t: "Africa CDC", d: "Africa Centres for Disease Control and Prevention outbreak updates and regional coordination.", u: "https://africacdc.org", i: "bi-map" },
  ]

  return (
    <SiteLayout activeKey="resources">
      <section className="es-hero-sm text-white">
        <div className="container py-5">
          <span className="badge bg-light text-dark mb-3">Resources</span>
          <h1 className="display-5 fw-bold">Ebola Resources</h1>
          <p className="lead">Trusted information and guidance from global health authorities.</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          {resources.map((r) => (
            <div className="col-md-6" key={r.t}>
              <a href={r.u} target="_blank" rel="noreferrer" className="text-decoration-none">
                <div className="es-card h-100">
                  <div className="d-flex align-items-start">
                    <div className="es-icon-box bg-primary-subtle text-primary me-3"><i className={`bi ${r.i}`}></i></div>
                    <div>
                      <h3 className="h5 mb-1">{r.t}</h3>
                      <p className="text-secondary mb-2">{r.d}</p>
                      <span className="text-primary fw-semibold small">Visit resource <i className="bi bi-arrow-right"></i></span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
