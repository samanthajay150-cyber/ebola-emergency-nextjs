"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Stats {
  total: number; pending: number; underReview: number; approved: number; rejected: number
  recent: Array<{ application_id: string; full_name: string; status: string; created_at: string }>
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken")
    if (!token) { router.push("/admin"); return }
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .finally(() => setLoading(false))
  }, [router])

  const cards = [
    { key: "total", label: "Total Applications", icon: "bi-folder", color: "#1e293b" },
    { key: "pending", label: "Pending", icon: "bi-hourglass-split", color: "#d97706" },
    { key: "underReview", label: "Under Review", icon: "bi-eye", color: "#2563eb" },
    { key: "approved", label: "Approved", icon: "bi-check-circle", color: "#16a34a" },
    { key: "rejected", label: "Rejected", icon: "bi-x-circle", color: "#dc2626" },
  ]

  const statusBadge = (s: string) => {
    const m: Record<string, string> = {
      pending: "bg-warning text-dark",
      under_review: "bg-primary",
      approved: "bg-success",
      rejected: "bg-danger",
    }
    return m[s] || "bg-secondary"
  }
  const statusLabel = (s: string) => s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="es-admin">
      <nav className="es-admin-nav">
        <div className="container d-flex align-items-center justify-content-between">
          <Link href="/admin/dashboard" className="es-nav-brand text-white">
            <i className="bi bi-heart-pulse me-1"></i>Admin Dashboard
          </Link>
          <div className="d-flex align-items-center gap-2">
            <Link href="/admin/applications" className="btn btn-sm btn-light">Applications</Link>
            <Link href="/" className="btn btn-sm btn-outline-light">View Site</Link>
            <button className="btn btn-sm btn-outline-light" onClick={() => { sessionStorage.clear(); router.push("/admin") }}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <h1 className="h3 mb-4">Overview</h1>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
        ) : (
          <>
            <div className="row g-3 mb-4">
              {cards.map((c) => (
                <div className="col-md" key={c.key}>
                  <div className="es-stat-card" style={{ borderTopColor: c.color }}>
                    <div className="es-stat-icon" style={{ background: c.color }}>
                      <i className={`bi ${c.icon}`}></i>
                    </div>
                    <div>
                      <div className="es-stat-num">{(stats as any)[c.key] ?? 0}</div>
                      <div className="es-stat-lbl">{c.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="es-admin-card">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h5 mb-0">Recent Applications</h2>
                <Link href="/admin/applications" className="btn btn-sm btn-outline-primary">View All</Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr><th>Application ID</th><th>Applicant</th><th>Status</th><th>Date</th><th></th></tr>
                  </thead>
                  <tbody>
                    {stats?.recent?.length ? (
                      stats.recent.map((a) => (
                        <tr key={a.application_id}>
                          <td><code>{a.application_id}</code></td>
                          <td>{a.full_name}</td>
                          <td><span className={`badge ${statusBadge(a.status)}`}>{statusLabel(a.status)}</span></td>
                          <td className="text-muted small">{new Date(a.created_at).toLocaleDateString()}</td>
                          <td className="text-end"><Link href={`/admin/applications?id=${a.application_id}`} className="btn btn-sm btn-outline-secondary"><i className="bi bi-arrow-right"></i></Link></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={5} className="text-center text-muted py-4">No applications yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
