// Country & State data using CountriesNow API (free, no auth, CORS-enabled)
// Fallback: bundled static list of all countries (with flags from flagcdn.com)
// Flags: https://flagcdn.com/{iso2-lowercase}.svg

export interface Country {
  name: string;
  iso2: string;
  iso3: string;
  flag: string;
  states: CountryState[];
}

export interface CountryState {
  name: string;
  stateCode: string;
}

const STATES_API = "https://countriesnow.space/api/v0.1/countries/states";

// Flag URL helper (flagcdn serves SVG/PNG flags by ISO2 code)
export function flagUrl(iso2: string): string {
  return `https://flagcdn.com/${iso2.toLowerCase()}.svg`;
}

// ---- Static fallback list (subset — used only if API fails) ----
// Includes all African nations (Ebola-relevant) + major world countries.
const FALLBACK_COUNTRIES: Omit<Country, "flag" | "states">[] = [
  { name: "Afghanistan", iso2: "AF", iso3: "AFG" },
  { name: "Albania", iso2: "AL", iso3: "ALB" },
  { name: "Algeria", iso2: "DZ", iso3: "DZA" },
  { name: "Angola", iso2: "AO", iso3: "AGO" },
  { name: "Argentina", iso2: "AR", iso3: "ARG" },
  { name: "Australia", iso2: "AU", iso3: "AUS" },
  { name: "Austria", iso2: "AT", iso3: "AUT" },
  { name: "Bangladesh", iso2: "BD", iso3: "BGD" },
  { name: "Belgium", iso2: "BE", iso3: "BEL" },
  { name: "Benin", iso2: "BJ", iso3: "BEN" },
  { name: "Botswana", iso2: "BW", iso3: "BWA" },
  { name: "Brazil", iso2: "BR", iso3: "BRA" },
  { name: "Burkina Faso", iso2: "BF", iso3: "BFA" },
  { name: "Burundi", iso2: "BI", iso3: "BDI" },
  { name: "Cameroon", iso2: "CM", iso3: "CMR" },
  { name: "Canada", iso2: "CA", iso3: "CAN" },
  { name: "Central African Republic", iso2: "CF", iso3: "CAF" },
  { name: "Chad", iso2: "TD", iso3: "TCD" },
  { name: "China", iso2: "CN", iso3: "CHN" },
  { name: "Congo", iso2: "CG", iso3: "COG" },
  { name: "Côte d'Ivoire", iso2: "CI", iso3: "CIV" },
  { name: "Democratic Republic of the Congo", iso2: "CD", iso3: "COD" },
  { name: "Denmark", iso2: "DK", iso3: "DNK" },
  { name: "Egypt", iso2: "EG", iso3: "EGY" },
  { name: "Equatorial Guinea", iso2: "GQ", iso3: "GNQ" },
  { name: "Eritrea", iso2: "ER", iso3: "ERI" },
  { name: "Ethiopia", iso2: "ET", iso3: "ETH" },
  { name: "France", iso2: "FR", iso3: "FRA" },
  { name: "Gabon", iso2: "GA", iso3: "GAB" },
  { name: "Gambia", iso2: "GM", iso3: "GMB" },
  { name: "Germany", iso2: "DE", iso3: "DEU" },
  { name: "Ghana", iso2: "GH", iso3: "GHA" },
  { name: "Greece", iso2: "GR", iso3: "GRC" },
  { name: "Guinea", iso2: "GN", iso3: "GIN" },
  { name: "Guinea-Bissau", iso2: "GW", iso3: "GNB" },
  { name: "India", iso2: "IN", iso3: "IND" },
  { name: "Indonesia", iso2: "ID", iso3: "IDN" },
  { name: "Italy", iso2: "IT", iso3: "ITA" },
  { name: "Japan", iso2: "JP", iso3: "JPN" },
  { name: "Kenya", iso2: "KE", iso3: "KEN" },
  { name: "Liberia", iso2: "LR", iso3: "LBR" },
  { name: "Libya", iso2: "LY", iso3: "LBY" },
  { name: "Madagascar", iso2: "MG", iso3: "MDG" },
  { name: "Malawi", iso2: "MW", iso3: "MWI" },
  { name: "Mali", iso2: "ML", iso3: "MLI" },
  { name: "Mauritania", iso2: "MR", iso3: "MRT" },
  { name: "Morocco", iso2: "MA", iso3: "MAR" },
  { name: "Mozambique", iso2: "MZ", iso3: "MOZ" },
  { name: "Namibia", iso2: "NA", iso3: "NAM" },
  { name: "Niger", iso2: "NE", iso3: "NER" },
  { name: "Nigeria", iso2: "NG", iso3: "NGA" },
  { name: "Pakistan", iso2: "PK", iso3: "PAK" },
  { name: "Philippines", iso2: "PH", iso3: "PHL" },
  { name: "Portugal", iso2: "PT", iso3: "PRT" },
  { name: "Rwanda", iso2: "RW", iso3: "RWA" },
  { name: "Senegal", iso2: "SN", iso3: "SEN" },
  { name: "Sierra Leone", iso2: "SL", iso3: "SLE" },
  { name: "Somalia", iso2: "SO", iso3: "SOM" },
  { name: "South Africa", iso2: "ZA", iso3: "ZAF" },
  { name: "South Sudan", iso2: "SS", iso3: "SSD" },
  { name: "Spain", iso2: "ES", iso3: "ESP" },
  { name: "Sudan", iso2: "SD", iso3: "SDN" },
  { name: "Sweden", iso2: "SE", iso3: "SWE" },
  { name: "Switzerland", iso2: "CH", iso3: "CHE" },
  { name: "Tanzania", iso2: "TZ", iso3: "TZA" },
  { name: "Togo", iso2: "TG", iso3: "TGO" },
  { name: "Tunisia", iso2: "TN", iso3: "TUN" },
  { name: "Uganda", iso2: "UG", iso3: "UGA" },
  { name: "United Kingdom", iso2: "GB", iso3: "GBR" },
  { name: "United States", iso2: "US", iso3: "USA" },
  { name: "Zambia", iso2: "ZM", iso3: "ZMB" },
  { name: "Zimbabwe", iso2: "ZW", iso3: "ZWE" },
];

// Sample states for fallback (for the most common Ebola-affected countries)
const FALLBACK_STATES: Record<string, CountryState[]> = {
  GH: [
    { name: "Greater Accra Region", stateCode: "AA" },
    { name: "Ashanti Region", stateCode: "AH" },
    { name: "Central Region", stateCode: "CP" },
    { name: "Eastern Region", stateCode: "EP" },
    { name: "Western Region", stateCode: "WP" },
    { name: "Volta Region", stateCode: "TV" },
    { name: "Northern Region", stateCode: "NP" },
    { name: "Upper East Region", stateCode: "UE" },
    { name: "Upper West Region", stateCode: "UW" },
    { name: "Brong-Ahafo Region", stateCode: "BA" },
  ],
  NG: [
    { name: "Lagos", stateCode: "LA" },
    { name: "Abuja FCT", stateCode: "FC" },
    { name: "Rivers", stateCode: "RI" },
    { name: "Kano", stateCode: "KN" },
    { name: "Oyo", stateCode: "OY" },
    { name: "Kaduna", stateCode: "KD" },
    { name: "Enugu", stateCode: "EN" },
    { name: "Anambra", stateCode: "AN" },
    { name: "Delta", stateCode: "DE" },
    { name: "Edo", stateCode: "ED" },
  ],
  SL: [
    { name: "Western Area", stateCode: "W" },
    { name: "Northern Province", stateCode: "N" },
    { name: "Southern Province", stateCode: "S" },
    { name: "Eastern Province", stateCode: "E" },
  ],
  LR: [
    { name: "Montserrado", stateCode: "MO" },
    { name: "Nimba", stateCode: "NI" },
    { name: "Bong", stateCode: "BG" },
    { name: "Lofa", stateCode: "LO" },
    { name: "Grand Bassa", stateCode: "GB" },
  ],
  GN: [
    { name: "Conakry", stateCode: "C" },
    { name: "Nzérékoré", stateCode: "N" },
    { name: "Kankan", stateCode: "K" },
    { name: "Kindia", stateCode: "D" },
    { name: "Boké", stateCode: "B" },
  ],
  US: [
    { name: "California", stateCode: "CA" },
    { name: "Texas", stateCode: "TX" },
    { name: "Florida", stateCode: "FL" },
    { name: "New York", stateCode: "NY" },
    { name: "Illinois", stateCode: "IL" },
    { name: "Pennsylvania", stateCode: "PA" },
    { name: "Ohio", stateCode: "OH" },
    { name: "Georgia", stateCode: "GA" },
    { name: "Michigan", stateCode: "MI" },
    { name: "Washington", stateCode: "WA" },
  ],
  GB: [
    { name: "England", stateCode: "ENG" },
    { name: "Scotland", stateCode: "SCT" },
    { name: "Wales", stateCode: "WLS" },
    { name: "Northern Ireland", stateCode: "NIR" },
  ],
  KE: [
    { name: "Nairobi", stateCode: "30" },
    { name: "Mombasa", stateCode: "02" },
    { name: "Kisumu", stateCode: "40" },
    { name: "Nakuru", stateCode: "17" },
    { name: "Eldoret", stateCode: "28" },
  ],
};

// ---- Main fetch function ----
let countriesCache: Country[] | null = null;
let fetchPromise: Promise<Country[]> | null = null;

export async function getCachedCountries(): Promise<Country[]> {
  if (countriesCache) return countriesCache;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetchCountriesFromApi();
  countriesCache = await fetchPromise;
  fetchPromise = null;
  return countriesCache;
}

async function fetchCountriesFromApi(): Promise<Country[]> {
  try {
    const res = await fetch(STATES_API, {
      method: "GET",
      headers: { Accept: "application/json" },
      // Next.js caching: fetch once, keep for 24h
      cache: "force-cache",
      next: { revalidate: 86400 },
    });

    if (!res.ok) throw new Error(`API returned ${res.status}`);

    const json = await res.json();
    if (!json?.data || !Array.isArray(json.data)) throw new Error("Invalid API response");

    const countries: Country[] = json.data
      .map((c: any): Country | null => {
        const iso2 = c?.iso2;
        const name = c?.name;
        if (!iso2 || !name) return null;
        const states: CountryState[] = Array.isArray(c.states)
          ? c.states
              .map((s: any): CountryState | null => {
                if (!s?.name) return null;
                return { name: s.name, stateCode: s.state_code || "" };
              })
              .filter((x: CountryState | null): x is CountryState => x !== null)
          : [];
        return {
          name,
          iso2,
          iso3: c.iso3 || "",
          flag: flagUrl(iso2),
          states,
        };
      })
      .filter((x: CountryState | null): x is CountryState => x !== null)
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

    if (countries.length === 0) throw new Error("No countries parsed");
    return countries;
  } catch (err) {
    console.error("[countries] API failed, using fallback:", err);
    return getFallbackCountries();
  }
}

function getFallbackCountries(): Country[] {
  return FALLBACK_COUNTRIES.map((c) => ({
    ...c,
    flag: flagUrl(c.iso2),
    states: FALLBACK_STATES[c.iso2] || [],
  })).sort((a, b) => a.name.localeCompare(b.name));
}

// Fetch states for a single country (uses cache; falls back to API if needed)
export async function fetchStates(countryIso2: string): Promise<CountryState[]> {
  if (!countryIso2) return [];
  const countries = await getCachedCountries();
  const country = countries.find((c) => c.iso2 === countryIso2);
  if (country && country.states.length > 0) return country.states;

  // Fallback to the single-country endpoint
  try {
    const res = await fetch(
      `https://countriesnow.space/api/v0.1/countries/states/q?countryIso2=${countryIso2}`,
      { cache: "force-cache", next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const json = await res.json();
      const states = json?.data?.states;
      if (Array.isArray(states)) {
        return states
          .map((s: any) => (s?.name ? { name: s.name, stateCode: s.state_code || "" } : null))
          .filter((x: CountryState | null): x is CountryState => x !== null);
      }
    }
  } catch (err) {
    console.error("[states] single fetch failed:", err);
  }

  return FALLBACK_STATES[countryIso2] || [];
}

// Search helper
export function searchCountryList(countries: Country[], query: string): Country[] {
  const q = query.toLowerCase().trim();
  if (!q) return countries;
  return countries.filter(
    (c) => c.name.toLowerCase().includes(q) || c.iso2.toLowerCase().includes(q) || c.iso3.toLowerCase().includes(q)
  );
}
