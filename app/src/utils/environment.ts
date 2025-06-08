/**
 * Returns the base URL depending on whether we are in a dev environment or not.
 */
export const baseUrl = import.meta.env.DEV
  ? "http://localhost:5173"
  : import.meta.env.VITE_PUBLISHED_BASE_URL;
