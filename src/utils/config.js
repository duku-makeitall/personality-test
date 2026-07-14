/* src/utils/config.js */

let cachedConfig = null;

/**
 * Dynamically fetches configuration from Vercel Serverless API.
 * Utilizes caching to prevent duplicate fetch requests.
 * @returns {Promise<Object>} Object containing configuration key-value pairs.
 */
export async function loadConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/api/config');
    if (!response.ok) {
      throw new Error(`Failed to fetch config from API: status ${response.status}`);
    }
    const config = await response.json();
    cachedConfig = config;
    return config;
  } catch (error) {
    console.error("ConfigLoader Error:", error);
    return {};
  }
}
