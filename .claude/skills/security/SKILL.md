# Security

The **beyondMargin prototype** (SIH26091) is a client-side demo with no server, auth, or
database. Security here means keeping the demo safe and honest.

Ensure:
- **No secrets** — no API keys, tokens, or credentials anywhere in the repo or bundle.
- **No real PII** — Aadhaar, PAN, GST, and bank/account numbers are simulated sample
  values only. Identity and bank flows are visibly labelled **"Sandbox Demo — no real
  bank or government system is contacted."**
- **Privacy-preserving defaults** on the consent screen; nothing is actually transmitted
  anywhere (there is no network).
- **Honesty** — the UI must never present illustrative numbers as verified/official.
  Provenance badges and "these numbers are illustrative" framing stay accurate.
- Redact sample identifiers in the UI (mask all but the last 4 digits) exactly as a real
  product would, so the demo models good behaviour.

Do not add real KYC, Account Aggregator, bank, payment, or backend integrations to the
prototype. Never commit secrets.
