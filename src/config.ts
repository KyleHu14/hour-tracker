// Check Supabase Environment Variables
if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    alert("VITE_SUPABASE_ANON_KEY is required")
    throw new Error("VITE_SUPABASE_ANON_KEY is required")
}
if (!import.meta.env.VITE_SUPABASE_URL) {
    alert("VITE_SUPABASE_URL is required")
    throw new Error("VITE_SUPABASE_URL is required")
}

// Check for base URL (used for reroutting user on signin)
// Dev Mode
if (import.meta.env.DEV && !import.meta.env.VITE_BASE_URL_DEV) {
    alert("Base URL for dev mode required")
    throw new Error("VITE_BASE_URL_DEV is required")
} else if (import.meta.env.PROD && !import.meta.env.VITE_BASE_URL_PROD) {
    alert("Base URL for production required")
    throw new Error("VITE_BASE_URL_PROD is required")
}

// Export supabase URLS
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

// Export website's base url for dev mode
let baseUrl
if (import.meta.env.DEV) {
    baseUrl = import.meta.env.VITE_BASE_URL_DEV
} else {
    baseUrl = import.meta.env.VITE_BASE_URL_PROD
}

export const BASE_URL = baseUrl
