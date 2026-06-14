"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Users, Clock, CheckCircle, XCircle, FileText, Search, Bell, Settings, LogOut } from "lucide-react"

interface Stats {
  total: number
  pending: number
  underReview: number
  approved: number
  rejected: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      window.location.href = "/admin"
      return
    }
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      setStats({
        total: Number(data.total) || 0,
        pending: Number(data.pending) || 0,
        underReview: Number(data.underReview) || 0,
        approved: Number(data.approved) || 0,
        rejected: Number(data.rejected) || 0
      })
    } catch (err) {
      setError("Failed to load statistics")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    window.location.href = "/admin"
  }

  const statCards = [
    { label: "Total Applications", value: stats.total, icon: FileText, color: "#0066cc" },
    { label: "Pending Review", value: stats.pending, icon: Clock, color: "#f59e0b" },
    { label: "Under Review", value: stats.underReview, icon: Search, color: "#3b82f6" },
    { label: "Approved", value: stats.approved, icon: CheckCircle, color: "#10b981" },
    { label: "Rejected", value: stats.rejected, icon: XCircle, color: "#ef4444" }
  ]

  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <div className="spinner"></div>
          <p style={{ marginTop: "16px", color: "#6b7280" }}>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            <Heart size={28} style={{ color: "#10b981" }} />
            <span>Ebola Emergency Support</span>
          </Link>
          <div className="nav-links">
            <button onClick={handleLogout} className="btn btn-outline" style={{ marginLeft: "auto" }}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container" style={{ padding: "40px 20px" }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 700, marginBottom: "8px" }}>Admin Dashboard</h1>
          <p style={{ color: "#6b7280" }}>Manage and review emergency support applications</p>
        </div>

        {error && (
          <div style={{ 
            padding: "16px", 
            background: "#fee2e2", 
            border: "1px solid #fecaca", 
            borderRadius: "8px",
            color: "#dc2626",
            marginBottom: "24px"
          }}>
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="stats-grid">
          {statCards.map((stat, index) => (
            <div key={index} className="stat-card">
              <div style={{ 
                width: "48px", 
                height: "48px", 
                borderRadius: "12px",
                background: `${stat.color}15`,
                color: stat.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <stat.icon size={24} />
              </div>
              <div style={{ marginTop: "16px" }}>
                <div style={{ fontSize: "14px", color: "#6b7280" }}>{stat.label}</div>
                <div style={{ fontSize: "32px", fontWeight: 700, color: "#111827" }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "20px" }}>Quick Actions</h2>
          <div className="grid grid-2">
            <Link href="/admin/applications" className="card" style={{ 
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "12px",
                  background: "#0066cc15",
                  color: "#0066cc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 600 }}>View Applications</div>
                  <div style={{ color: "#6b7280", fontSize: "14px" }}>Review pending applications</div>
                </div>
              </div>
            </Link>

            <Link href="/admin/applications?status=pending" className="card" style={{ 
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "12px",
                  background: "#f59e0b15",
                  color: "#f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Clock size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 600 }}>Pending Review</div>
                  <div style={{ color: "#6b7280", fontSize: "14px" }}>{stats.pending} applications awaiting review</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
