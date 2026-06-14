"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Search, Filter, Eye, Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react"

interface Application {
  id: number
  application_id: string
  full_name: string
  status: string
  created_at: string
  email?: string
  country?: string
}

export default function AdminApplicationsPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }
    fetchApplications()
  }, [statusFilter])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.append("status", statusFilter)
      if (search) params.append("search", search)
      
      const response = await fetch(`/api/admin/applications?${params}`)
      const data = await response.json()
      setApplications(data.applications || [])
      setTotal(Number(data.total) || 0)
    } catch (err) {
      console.error("Failed to fetch applications")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchApplications()
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      pending: { bg: "#fef3c7", text: "#92400e" },
      under_review: { bg: "#dbeafe", text: "#1e40af" },
      approved: { bg: "#d1fae5", text: "#065f46" },
      rejected: { bg: "#fee2e2", text: "#991b1b" }
    };
    return colors[status] || { bg: "#f3f4f6", text: "#374151" };
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      <nav className="nav">
        <div className="nav-content">
          <Link href="/admin/dashboard" className="nav-logo">
            <Heart size={28} style={{ color: "#10b981" }} />
            <span>Ebola Emergency Support</span>
          </Link>
        </div>
      </nav>

      <div className="container" style={{ padding: "40px 20px" }}>
        <div style={{ marginBottom: "32px" }}>
          <Link href="/admin/dashboard" className="btn btn-outline" style={{ marginBottom: "16px", display: "inline-flex" }}>
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 style={{ fontSize: "36px", fontWeight: 700, marginBottom: "8px" }}>Applications</h1>
          <p style={{ color: "#6b7280" }}>Total: {total} applications</p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: "24px" }}>
          <div className="grid grid-2" style={{ gap: "16px" }}>
            <form onSubmit={handleSearch}>
              <div style={{ position: "relative" }}>
                <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} size={20} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="form-input"
                  style={{ paddingLeft: "44px" }}
                />
              </div>
            </form>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
              style={{ cursor: "pointer" }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="card" style={{ padding: "40px", textAlign: "center" }}>
            <div className="spinner"></div>
            <p style={{ marginTop: "16px", color: "#6b7280" }}>Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="card" style={{ padding: "40px", textAlign: "center" }}>
            <p style={{ color: "#6b7280" }}>No applications found</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Applicant Name</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const statusColor = getStatusColor(app.status)
                  return (
                    <tr key={app.id}>
                      <td style={{ fontFamily: "monospace", color: "#0066cc" }}>{app.application_id}</td>
                      <td style={{ fontWeight: 500 }}>{app.full_name}</td>
                      <td>
                        <span style={{
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background: statusColor.bg,
                          color: statusColor.text
                        }}>
                          {app.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td style={{ color: "#6b7280" }}>{formatDate(app.created_at)}</td>
                      <td>
                        <Link href={`/admin/applications/${app.id}`} className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "14px" }}>
                          <Eye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
