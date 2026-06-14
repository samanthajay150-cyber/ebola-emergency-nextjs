"use client"

import { useState, useEffect } from "react"
import { ChevDown } from "lucide-react"
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

  useEffect(() => {
    async function loadCountries() {
      setLoading(true)
      const data = await getCachedCountries()
      setCountries(data)
      setLoading(false)
    }
    loadCountries()
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase()) ||
    country.cca2.toLowerCase().includes(search.toLowerCase())
  )

  const selectedCountry = countries.find(c => c.cca2 === value)

  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
        Country *
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input-field flex items-center justify-between"
        style={{
          width: "100%",
          padding: "14px",
          border: error ? "2px solid #ef4444" : "1px solid #d1d5db",
          borderRadius: "8px",
          textAlign: "left",
          cursor: "pointer"
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {selectedCountry && (
            <img 
              src={selectedCountry.flags.svg} 
              alt={`${selectedCountry.name.common} flag`}
              style={{ width: "24px", height: "16px", objectFit: "cover", borderRadius: "2px" }}
            />
          )}
          {selectedCountry ? selectedCountry.name.common : "Select your country"}
        </span>
        <ChevDown size={20} />
      </button>

      {error && (
        <p className="text-sm" style={{ color: "#ef4444", marginTop: "4px" }}>{error}</p>
      )}

      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-hidden"
          style={{ border: "1px solid #e5e7eb" }}
        >
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b"
            style={{ border: "none", borderBottom: "1px solid #e5e7eb" }}
            autoFocus
          />
          
          <div className="overflow-y-auto max-h-48">
            {loading ? (
              <div className="px-4 py-2 text-gray-500">Loading countries...</div>
            ) : filteredCountries.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No countries found</div>
            ) : (
              filteredCountries.map(country => (
                <button
                  key={country.cca3}
                  type="button"
                  onClick={() => {
                    onChange(country.cca2, country.name.common)
                    setIsOpen(false)
                    setSearch("")
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  style={{ textAlign: "left" }}
                >
                  <img 
                    src={country.flags.svg} 
                    alt={`${country.name.common} flag`}
                    style={{ width: "24px", height: "16px", objectFit: "cover", borderRadius: "2px" }}
                  />
                  <span>{country.name.common} ({country.cca2})</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
