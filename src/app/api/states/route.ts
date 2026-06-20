import { NextRequest, NextResponse } from "next/server"
import { getCachedCountries } from "@/lib/countries"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const countryCode = searchParams.get("country") // expects iso2 code, e.g. "GH"

  if (!countryCode) {
    return NextResponse.json({ error: "Country code (iso2) required" }, { status: 400 })
  }

  try {
    const countries = await getCachedCountries()
    const country = countries.find((c) => c.iso2 === countryCode.toUpperCase())

    if (country && country.states.length > 0) {
      return NextResponse.json({
        states: country.states.map((s) => ({ name: s.name, code: s.stateCode })),
      })
    }

    // Fallback: single-country GET endpoint
    const res = await fetch(
      `https://countriesnow.space/api/v0.1/countries/states/q?countryIso2=${countryCode}`,
      { cache: "force-cache", next: { revalidate: 86400 } }
    )

    if (res.ok) {
      const json = await res.json()
      if (json?.data?.states && Array.isArray(json.data.states)) {
        return NextResponse.json({
          states: json.data.states.map((s: any) => ({
            name: s.name,
            code: s.state_code || s.name,
          })),
        })
      }
    }

    return NextResponse.json({ states: [] })
  } catch (error) {
    console.error("Error fetching states:", error)
    return NextResponse.json({ states: [] })
  }
}
