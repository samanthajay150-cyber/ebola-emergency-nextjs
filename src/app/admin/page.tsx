"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, Lock, User } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token)
        localStorage.setItem("adminUser", JSON.stringify(data.user))
        router.push("/admin/dashboard")
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f5" }}>
      <nav className="nav">
        <div className="nav-content">
          <Link href="/" className="nav-logo">
            <Heart size={28} style={{ color: "#10b981" }} />
            <span>Ebola Emergency Support</span>
          </Link>
        </div>
      </nav>

      <div className="container" style={{ padding: "60px 20px" }}>
        <div className="card" style={{ maxWidth: "450px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ 
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#0066cc",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Lock size={32} />
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
              Admin Login
            </h1>
            <p style={{ color: "#6b7280" }}>
              Sign in to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: "12px 16px",
                background: "#fee2e2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                color: "#dc2626",
                marginBottom: "20px",
                fontSize: "14px"
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: "relative" }}>
                <div style={{ 
                  position: "absolute", 
                  left: "12px", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  color: "#9ca3af"
                }}>
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "44px" }}
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <div style={{ 
                  position: "absolute", 
                  left: "12px", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  color: "#9ca3af"
                }}>
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "44px" }}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "24px" }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: "32px", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
              <strong>Demo Credentials:</strong>
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Username: <code style={{ background: "white", padding: "2px 8px", borderRadius: "4px" }}>admin</code>
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Password: <code style={{ background: "white", padding: "2px 8px", borderRadius: "4px" }}>ebola2026admin</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
