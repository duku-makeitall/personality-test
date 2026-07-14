/* src/utils/config.js */

let cachedConfig = null;

/**
 * Dynamically fetches and parses the .env file from the server root.
 * Utilizes caching to prevent duplicate fetch requests.
 * @returns {Promise<Object>} Object containing env key-value pairs.
 */
export async function loadConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/.env');
    if (!response.ok) {
      throw new Error(`Failed to fetch .env file: status ${response.status}`);
    }
    const text = await response.text();
    const config = {};

    // Parse lines in .env format (ignoring comments and empty lines)
    text.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const equalIdx = trimmed.indexOf('=');
      if (equalIdx > 0) {
        const key = trimmed.substring(0, equalIdx).trim();
        const value = trimmed.substring(equalIdx + 1).trim()
          .replace(/^['"]|['"]$/g, ''); // strip wrapping quotes
        
        config[key] = value;
      }
    });

    cachedConfig = config;
    return config;
  } catch (error) {
    console.error("ConfigLoader Error: Fallback active.", error);
    return {};
  }
}
