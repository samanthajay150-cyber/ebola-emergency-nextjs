"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem("adminToken", data.token)
        sessionStorage.setItem("adminUser", data.user.username)
        router.push("/admin/dashboard")
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch {
      setError("Network error. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="es-auth">
      <div className="es-auth-card">
        <div className="text-center mb-4">
          <div className="es-logo-lg mx-auto mb-3"><i className="bi bi-shield-lock"></i></div>
          <h2>Admin Login</h2>
          <p className="text-muted">Ebola Emergency Support Administration</p>
        </div>
        {error && (
          <div className="alert alert-danger d-flex align-items-center">
            <i className="bi bi-exclamation-triangle me-2"></i>{error}
          </div>
        )}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" required />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
          </div>
          <button type="submit" className="btn btn-es w-100 btn-lg" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-1"></span>Signing in...</> : <><i className="bi bi-box-arrow-in-right me-1"></i>Sign In</>}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/" className="text-muted text-decoration-none small"><i className="bi bi-arrow-left me-1"></i>Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
