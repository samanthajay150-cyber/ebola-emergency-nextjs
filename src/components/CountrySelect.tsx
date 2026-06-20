"use client"

import { useState, useEffect, useRef } from "react"
import { getCachedCountries, type Country } from "@/lib/countries"

interface CountrySelectProps {
  value?: string
  onChange: (countryCode: string, countryName: string) => void
  error?: string
}

export function CountrySelect({ value, onChange, error }: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadCountries() {
      setLoading(true)
      const data = await getCachedCountries()
      setCountries(data)
      setLoading(false)
    }
    loadCountries()
  }, [])

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

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()) ||
    country.cca2.toLowerCase().includes(search.toLowerCase())
  )

  const selectedCountry = countries.find((c) => c.cca2 === value)

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <label className="form-label fw-semibold">Country *</label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="form-select d-flex align-items-center justify-content-between text-start"
        style={{
          border: error ? "2px solid #ef4444" : undefined,
        }}
      >
        <span className="d-flex align-items-center gap-2">
          {selectedCountry && (
            <img
              src={selectedCountry.flags.svg}
              alt={`${selectedCountry.name.common} flag`}
              style={{ width: "24px", height: "16px", objectFit: "cover", borderRadius: "2px" }}
            />
          )}
          {selectedCountry ? selectedCountry.name.common : "Select your country"}
        </span>
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
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control rounded-0 border-0"
            style={{ borderBottom: "1px solid #e5e7eb" }}
            autoFocus
          />

          <div style={{ overflowY: "auto", flex: 1 }}>
            {loading ? (
              <div className="px-3 py-2 text-muted small">Loading countries...</div>
            ) : filteredCountries.length === 0 ? (
              <div className="px-3 py-2 text-muted small">No countries found</div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.cca3}
                  type="button"
                  onClick={() => {
                    onChange(country.cca2, country.name.common)
                    setIsOpen(false)
                    setSearch("")
                  }}
                  className="w-100 text-start border-0 bg-transparent d-flex align-items-center gap-2 px-3 py-2"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <img
                    src={country.flags.svg}
                    alt={`${country.name.common} flag`}
                    style={{ width: "24px", height: "16px", objectFit: "cover", borderRadius: "2px" }}
                  />
                  <span className="small">{country.name.common} ({country.cca2})</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
