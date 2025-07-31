/**
 * Dummy translation function. Replace with real API integration.
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (e.g., 'es', 'fr')
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang) => {
  // TODO: Integrate with translation API like Google Translate or DeepL
  return Promise.resolve(`[${targetLang}] ${text}`);
};
