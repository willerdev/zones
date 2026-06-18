export type CurrencyCode = "RWF" | "USD" | "EUR" | "GBP" | "KES" | "UGX" | "TZS";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  /** How many RWF equal 1 unit of this currency */
  rateFromRwf: number;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  RWF: { code: "RWF", symbol: "FRw", locale: "en-RW", rateFromRwf: 1, label: "Rwandan Franc" },
  USD: { code: "USD", symbol: "$", locale: "en-US", rateFromRwf: 1350, label: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", locale: "de-DE", rateFromRwf: 1450, label: "Euro" },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB", rateFromRwf: 1700, label: "British Pound" },
  KES: { code: "KES", symbol: "KSh", locale: "en-KE", rateFromRwf: 10.5, label: "Kenyan Shilling" },
  UGX: { code: "UGX", symbol: "USh", locale: "en-UG", rateFromRwf: 0.35, label: "Ugandan Shilling" },
  TZS: { code: "TZS", symbol: "TSh", locale: "en-TZ", rateFromRwf: 0.55, label: "Tanzanian Shilling" },
};

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  RW: "RWF",
  US: "USD",
  GB: "GBP",
  KE: "KES",
  UG: "UGX",
  TZ: "TZS",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  CA: "USD",
  AU: "USD",
};

const TIMEZONE_CURRENCY: Record<string, CurrencyCode> = {
  "Africa/Kigali": "RWF",
  "Africa/Nairobi": "KES",
  "Africa/Kampala": "UGX",
  "Africa/Dar_es_Salaam": "TZS",
};

export function currencyFromCountry(countryCode: string): CurrencyCode {
  return COUNTRY_CURRENCY[countryCode.toUpperCase()] ?? "RWF";
}

export function currencyFromTimezone(timezone: string): CurrencyCode {
  if (TIMEZONE_CURRENCY[timezone]) return TIMEZONE_CURRENCY[timezone];
  if (timezone.startsWith("Africa/")) return "RWF";
  if (timezone.startsWith("Europe/")) return "EUR";
  if (timezone.startsWith("America/")) return "USD";
  return "RWF";
}

export function convertFromRwf(amountRwf: number, currency: CurrencyCode): number {
  const config = CURRENCIES[currency];
  return amountRwf / config.rateFromRwf;
}

export function formatPriceInCurrency(amountRwf: number, currency: CurrencyCode): string {
  const config = CURRENCIES[currency];
  const converted = convertFromRwf(amountRwf, currency);
  const decimals = currency === "RWF" || currency === "UGX" || currency === "TZS" ? 0 : 2;
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(converted);
}
