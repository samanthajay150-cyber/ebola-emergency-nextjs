"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface App {
  id: number; application_id: string; full_name: string; age: number; country: string
  state: string; town: string; occupation: string; status: string; created_at: string
  notes?: string
}

export default function AdminApplicationsPage() {
  const router = useRouter()
  const [apps, setApps] = useState<App[]>([])
  const [filtered, setFiltered] = useState<App[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<App | null>(null)
  const [newStatus, setNewStatus] = useState("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken")
    if (!token) { router.push("/admin"); return }
    load()
  }, [router])

  const load = () => {
    setLoading(true)
    fetch("/api/admin/applications")
      .then((r) => r.json())
      .then((d) => { setApps(d.applications || []); setFiltered(d.applications || []) })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let f = apps
    if (filter !== "all") f = f.filter((a) => a.status === filter)
    if (search.trim()) f = f.filter((a) => a.full_name.toLowerCase().includes(search.toLowerCase()) || a.application_id.toLowerCase().includes(search.toLowerCase()))
    setFiltered(f)
  }, [filter, search, apps])

  const open = (a: App) => {
    setSelected(a)
    setNewStatus(a.status)
    setNotes(a.notes || "")
  }

  const save = async () => {
    if (!selected) return
    setSaving(true)
    await fetch(`/api/admin/applications/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, notes }),
    })
    setSaving(false)
    setSelected(null)
    load()
  }

  const statusBadge = (s: string) => {
    const m: Record<string, string> = { pending: "bg-warning text-dark", under_review: "bg-primary", approved: "bg-success", rejected: "bg-danger" }
    return m[s] || "bg-secondary"
  }
  const statusLabel = (s: string) => s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="es-admin">
      <nav className="es-admin-nav">
        <div className="container d-flex align-items-center justify-content-between">
          <Link href="/admin/dashboard" className="es-nav-brand text-white"><i className="bi bi-heart-pulse me-1"></i>Applications</Link>
          <div className="d-flex align-items-center gap-2">
            <Link href="/admin/dashboard" className="btn btn-sm btn-light">Dashboard</Link>
            <Link href="/" className="btn btn-sm btn-outline-light">View Site</Link>
            <button className="btn btn-sm btn-outline-light" onClick={() => { sessionStorage.clear(); router.push("/admin") }}><i className="bi bi-box-arrow-right"></i></button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0">Applications</h1>
          <button className="btn btn-sm btn-outline-primary" onClick={load}><i className="bi bi-arrow-clockwise me-1"></i>Refresh</button>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input className="form-control" placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col-md-3 text-md-end">
            <span className="text-muted small">{filtered.length} of {apps.length} applications</span>
          </div>
        </div>

        <div className="es-admin-card">
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : filtered.length ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr><th>App ID</th><th>Applicant</th><th>Age</th><th>Location</th><th>Occupation</th><th>Status</th><th>Date</th><th></th></tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id}>
                      <td><code>{a.application_id}</code></td>
                      <td>{a.full_name}</td>
                      <td>{a.age}</td>
                      <td className="small">{a.town}, {a.state}, {a.country}</td>
                      <td className="small">{a.occupation.replace("_", " ")}</td>
                      <td><span className={`badge ${statusBadge(a.status)}`}>{statusLabel(a.status)}</span></td>
                      <td className="text-muted small">{new Date(a.created_at).toLocaleDateString()}</td>
                      <td className="text-end"><button className="btn btn-sm btn-outline-primary" onClick={() => open(a)}><i className="bi bi-eye me-1"></i>Review</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-muted py-5"><i className="bi bi-inbox d-block mb-2" style={{ fontSize: "3rem" }}></i>No applications found.</div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review Application <code>{selected.application_id}</code></h5>
                <button type="button" className="btn-close" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3 mb-3">
                  <div className="col-md-6"><label className="form-label text-muted small">Full Name</label><div className="fw-medium">{selected.full_name}</div></div>
                  <div className="col-md-3"><label className="form-label text-muted small">Age</label><div className="fw-medium">{selected.age}</div></div>
                  <div className="col-md-3"><label className="form-label text-muted small">Occupation</label><div className="fw-medium">{selected.occupation.replace("_", " ")}</div></div>
                  <div className="col-md-12"><label className="form-label text-muted small">Location</label><div className="fw-medium">{selected.town}, {selected.state}, {selected.country}</div></div>
                </div>
                <hr />
                <div className="mb-3">
                  <label className="form-label">Update Status</label>
                  <select className="form-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Admin Notes</label>
                  <textarea className="form-control" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add internal review notes..."></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setSelected(null)}>Cancel</button>
                <button className="btn btn-es" onClick={save} disabled={saving}>
                  {saving ? <><span className="spinner-border spinner-border-sm me-1"></span>Saving...</> : <><i className="bi bi-check-lg me-1"></i>Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
