import { NextResponse } from "next/server";
import { getCachedCountries } from "@/lib/countries";

// Server-side proxy for countries list.
// Returns countries with flags + states. Cached for 24h.
export async function GET() {
  try {
    const countries = await getCachedCountries();
    // Return a lighter payload: states are included so the client can
    // filter locally without a second round-trip.
    return NextResponse.json(
      {
        countries: countries.map((c) => ({
          name: c.name,
          iso2: c.iso2,
          iso3: c.iso3,
          flag: c.flag,
          states: c.states,
        })),
        count: countries.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (error) {
    console.error("[/api/countries] error:", error);
    return NextResponse.json({ error: "Failed to load countries" }, { status: 500 });
  }
}
