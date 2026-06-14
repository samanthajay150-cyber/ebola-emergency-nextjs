import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const countryCode = searchParams.get("country")

  if (!countryCode) {
    return NextResponse.json({ error: "Country code required" }, { status: 400 })
  }

  try {
    // Fetch states/regions for the selected country
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/states`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: countryCode }),
      }
    )

    if (!response.ok) {
      // Return default states for common countries if API fails
      const defaultStates = getDefaultStates(countryCode)
      return NextResponse.json({ states: defaultStates })
    }

    const data = await response.json()
    
    if (data.error === false && data.data && data.data.states) {
      return NextResponse.json({ 
        states: data.data.states.map((state: any) => ({
          name: state.name,
          code: state.state_code || state.name
        }))
      })
    }

    // Fallback to default states
    const defaultStates = getDefaultStates(countryCode)
    return NextResponse.json({ states: defaultStates })

  } catch (error) {
    console.error("Error fetching states:", error)
    const defaultStates = getDefaultStates(countryCode)
    return NextResponse.json({ states: defaultStates })
  }
}

// Default states for common Ebola-affected countries
function getDefaultStates(countryCode: string) {
  const statesMap: Record<string, Array<{ name: string; code: string }>> = {
    CD: [ // Democratic Republic of Congo
      { name: "Kinshasa", code: "KN" },
      { name: "Bas-Congo", code: "BC" },
      { name: "Bandundu", code: "BN" },
      { name: "Équateur", code: "EQ" },
      { name: "Orientale", code: "OR" },
      { name: "North Kivu", code: "NK" },
      { name: "South Kivu", code: "SK" },
      { name: "Maniema", code: "MA" },
      { name: "Katanga", code: "KA" },
      { name: "Kasai-Occidental", code: "KE" },
      { name: "Kasai-Oriental", code: "KO" },
    ],
    GN: [ // Guinea
      { name: "Conakry", code: "CO" },
      { name: "Nzérékoré", code: "NZ" },
      { name: "Kankan", code: "KA" },
      { name: "Kindia", code: "KD" },
      { name: "Boké", code: "BK" },
      { name: "Labé", code: "LB" },
      { name: "Faranah", code: "FR" },
      { name: "Mamou", code: "MM" },
    ],
    SL: [ // Sierra Leone
      { name: "Western Area", code: "WA" },
      { name: "Eastern Province", code: "EP" },
      { name: "Northern Province", code: "NP" },
      { name: "Southern Province", code: "SP" },
    ],
    LR: [ // Liberia
      { name: "Montserrado", code: "MO" },
      { name: "Nimba", code: "NI" },
      { name: "Bong", code: "BG" },
      { name: "Lofa", code: "LO" },
      { name: "Grand Bassa", code: "GB" },
      { name: "Grand Cape Mount", code: "CM" },
      { name: "Maryland", code: "MY" },
      { name: "River Gee", code: "RG" },
      { name: "Sinoe", code: "SI" },
      { name: "Grand Kru", code: "GK" },
      { name: "River Cess", code: "RC" },
      { name: "Margibi", code: "MG" },
    ],
    NG: [ // Nigeria
      { name: "Lagos", code: "LA" },
      { name: "Abuja FCT", code: "FC" },
      { name: "Rivers", code: "RI" },
      { name: "Kano", code: "KN" },
      { name: "Delta", code: "DE" },
      { name: "Anambra", code: "AN" },
      { name: "Imo", code: "IM" },
      { name: "Enugu", code: "EN" },
      { name: "Oyo", code: "OY" },
      { name: "Kaduna", code: "KD" },
    ],
    US: [
      { name: "Alabama", code: "AL" },
      { name: "Alaska", code: "AK" },
      { name: "Arizona", code: "AZ" },
      { name: "California", code: "CA" },
      { name: "Florida", code: "FL" },
      { name: "New York", code: "NY" },
      { name: "Texas", code: "TX" },
      { name: "Washington", code: "WA" },
    ],
    GB: [
      { name: "England", code: "ENG" },
      { name: "Scotland", code: "SCT" },
      { name: "Wales", code: "WLS" },
      { name: "Northern Ireland", code: "NIR" },
    ],
  }

  return statesMap[countryCode] || [
    { name: "Region 1", code: "R1" },
    { name: "Region 2", code: "R2" },
    { name: "Region 3", code: "R3" },
    { name: "Region 4", code: "R4" },
    { name: "Region 5", code: "R5" },
  ]
}
