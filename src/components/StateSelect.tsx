"use client"

import { useState, useEffect, useRef } from "react"
import { getCachedCountries } from "@/lib/countries"

interface StateSelectProps {
  countryCode?: string // iso2 code, e.g. "GH"
  value?: string
  onChange: (stateName: string) => void
  error?: string
}

export function StateSelect({ countryCode, value, onChange, error }: StateSelectProps) {
  const [states, setStates] = useState<{ name: string; stateCode: string }[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Pull states from the same cached countries payload (no extra request).
  useEffect(() => {
    let cancelled = false
    async function loadStates() {
      if (!countryCode) {
        setStates([])
        return
      }
      setLoading(true)
      const countries = await getCachedCountries()
      const found = countries.find((c) => c.iso2 === countryCode)
      if (!cancelled) {
        setStates(found?.states ?? [])
        setLoading(false)
      }
    }
    loadStates()
    return () => {
      cancelled = true
    }
  }, [countryCode])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch("")
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectedState = states.find((s) => s.name === value)

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <label className="form-label fw-semibold">State/Region *</label>

      <button
        type="button"
        onClick={() => countryCode && setIsOpen(!isOpen)}
        disabled={!countryCode}
        className="form-select d-flex align-items-center justify-content-between text-start"
        style={{
          border: error ? "2px solid #ef4444" : undefined,
          cursor: countryCode ? "pointer" : "not-allowed",
          backgroundColor: countryCode ? undefined : "#f3f4f6",
          opacity: countryCode ? 1 : 0.6,
        }}
        aria-expanded={isOpen}
      >
        <span>{selectedState ? selectedState.name : "Select state/region"}</span>
        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>&#9662;</span>
      </button>

      {error && <div className="text-danger small mt-1">{error}</div>}

      {isOpen && (
        <div
          className="bg-white border rounded shadow"
          style={{
            position: "absolute",
            zIndex: 1050,
            width: "100%",
            marginTop: "4px",
            maxHeight: "280px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="text"
            placeholder="Search states..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control rounded-0 border-0"
            style={{ borderBottom: "1px solid #e5e7eb" }}
            autoFocus
          />

          <div style={{ overflowY: "auto", flex: 1 }}>
            {loading ? (
              <div className="px-3 py-2 text-muted small">Loading states...</div>
            ) : filteredStates.length === 0 ? (
              <div className="px-3 py-2 text-muted small">
                {countryCode ? "No states found for this country" : "Please select a country first"}
              </div>
            ) : (
              filteredStates.map((state) => (
                <button
                  key={state.stateCode || state.name}
                  type="button"
                  onClick={() => {
                    onChange(state.name)
                    setIsOpen(false)
                    setSearch("")
                  }}
                  className="w-100 text-start border-0 bg-transparent px-3 py-2 small"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {state.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
