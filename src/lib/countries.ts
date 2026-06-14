// Country and State/Region data from REST Countries API

export interface Country {
  name: CountryName;
  cca2: string;
  cca3: string;
  flags: CountryFlags;
  population: number;
  region: string;
  subregion: string;
  capital?: string[];
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, NativeName>;
}

export interface NativeName {
  official: string;
  common: string;
}

export interface CountryFlags {
  svg: string;
  png: string;
}

export interface Currency {
  name: string;
  symbol?: string;
}

// State/Province data from REST Countries
export interface CountryState {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude?: string;
  longitude?: string;
}

// Fetch countries from REST Countries API
export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags,population,region,subregion,capital,currencies,languages');
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data: Country[] = await response.json();
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

// Fetch states/provinces for a specific country
export async function fetchStates(countryCode: string): Promise<CountryState[]> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country details');
    }
    const data = await response.json();
    
    // REST Countries API doesn't provide states directly
    // We'll use a workaround with timezone or region data
    // For now, return empty array or use alternative API
    
    // Alternative: Use Countries Now API for states
    const statesResponse = await fetch(`https://countriesnow.space/api/v0.1/countries/states`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: data[0]?.name?.common })
    });
    
    if (statesResponse.ok) {
      const statesData = await statesResponse.json();
      return statesData?.data?.states || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
}

// Search countries by name
export async function searchCountries(query: string): Promise<Country[]> {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=name,cca2,cca3,flags`);
    if (!response.ok) {
      return [];
    }
    const data: Country[] = await response.json();
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error('Error searching countries:', error);
    return [];
  }
}

// Local cache for countries
let countriesCache: Country[] | null = null;

export async function getCachedCountries(): Promise<Country[]> {
  if (countriesCache) {
    return countriesCache;
  }
  countriesCache = await fetchCountries();
  return countriesCache;
}

// Format country for display
export function formatCountryName(country: Country): string {
  return `${country.name.common} (${country.cca2})`;
}

// Country select options
export interface CountryOption {
  value: string;
  label: string;
  flag: string;
  cca2: string;
}
