"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { fetchStates, type CountryState } from "@/lib/countries"

interface StateSelectProps {
  countryCode?: string
  value?: string
  onChange: (stateName: string) => void
  error?: string
}

export function StateSelect({ countryCode, value, onChange, error }: StateSelectProps) {
  const [states, setStates] = useState<CountryState[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadStates() {
      if (!countryCode) {
        setStates([])
        return
      }
      setLoading(true)
      const data = await fetchStates(countryCode)
      setStates(data)
      setLoading(false)
    }
    loadStates()
  }, [countryCode])

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(search.toLowerCase())
  )

  const selectedState = states.find(s => s.name === value)

  return (
    <div className="relative">
      <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
        State/Region *
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={!countryCode}
        className="input-field flex items-center justify-between"
        style={{
          width: "100%",
          padding: "14px",
          border: error ? "2px solid #ef4444" : "1px solid #d1d5db",
          borderRadius: "8px",
          textAlign: "left",
          cursor: countryCode ? "pointer" : "not-allowed",
          backgroundColor: countryCode ? "white" : "#f3f4f6",
          opacity: countryCode ? 1 : 0.6
        }}
      >
        <span>
          {selectedState ? selectedState.name : "Select state/region"}
        </span>
        <ChevronDown size={20} />
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
            placeholder="Search states..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b"
            style={{ border: "none", borderBottom: "1px solid #e5e7eb" }}
            autoFocus
          />
          
          <div className="overflow-y-auto max-h-48">
            {loading ? (
              <div className="px-4 py-2 text-gray-500">Loading states...</div>
            ) : filteredStates.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">
                {countryCode ? "No states found" : "Please select a country first"}
              </div>
            ) : (
              filteredStates.map(state => (
                <button
                  key={state.stateCode}
                  type="button"
                  onClick={() => {
                    onChange(state.name)
                    setIsOpen(false)
                    setSearch("")
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-100"
                  style={{ textAlign: "left" }}
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
