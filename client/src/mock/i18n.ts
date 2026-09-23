// Minimal i18n for the prototype — only the wordmark-adjacent + key strings are localised;
// a user loads one language, not all of them.
export const LANGUAGES = [
  { key: 'हिंदी', label: 'हिंदी', en: 'Hindi' },
  { key: 'English', label: 'English', en: 'English' },
  { key: 'मराठी', label: 'मराठी', en: 'Marathi' },
  { key: 'বাংলা', label: 'বাংলা', en: 'Bengali' },
  { key: 'தமிழ்', label: 'தமிழ்', en: 'Tamil' },
  { key: 'తెలుగు', label: 'తెలుగు', en: 'Telugu' },
  { key: 'ગુજરાતી', label: 'ગુજરાતી', en: 'Gujarati' },
  { key: 'ਪੰਜਾਬੀ', label: 'ਪੰਜਾਬੀ', en: 'Punjabi' },
]

export const MORE_LANGUAGES = [
  'ಕನ್ನಡ',
  'മലയാളം',
  'ଓଡ଼ିଆ',
  'اردو',
  'অসমীয়া',
  'संस्कृतम्',
  'कोंकणी',
  'मैथिली',
  'डोगरी',
  'बड़ो',
  'सिन्धी',
  'मणिपुरी',
  'नेपाली',
  'संताली',
]

// Tagline localisation (illustrative)
export const TAGLINE: Record<string, string> = {
  English: 'Know before you borrow.',
  हिंदी: 'उधार लेने से पहले जानें।',
  मराठी: 'कर्ज घेण्यापूर्वी जाणून घ्या.',
  বাংলা: 'ঋণ নেওয়ার আগে জানুন।',
  தமிழ்: 'கடன் வாங்கும் முன் அறிந்து கொள்ளுங்கள்.',
  తెలుగు: 'అప్పు తీసుకునే ముందు తెలుసుకోండి.',
  ગુજરાતી: 'ઉધાર લેતાં પહેલાં જાણો.',
  ਪੰਜਾਬੀ: 'ਉਧਾਰ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਜਾਣੋ।',
}
