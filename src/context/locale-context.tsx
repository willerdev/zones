"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  type CurrencyCode,
  CURRENCIES,
  currencyFromCountry,
  currencyFromTimezone,
  formatPriceInCurrency,
} from "@/lib/currencies";

interface LocaleContextType {
  currency: CurrencyCode;
  country: string;
  countryCode: string;
  detecting: boolean;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountRwf: number) => string;
  currencyLabel: string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "itzone-currency";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("RWF");
  const [country, setCountry] = useState("Rwanda");
  const [countryCode, setCountryCode] = useState("RW");
  const [detecting, setDetecting] = useState(true);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem(STORAGE_KEY, code);
  }, []);

  const formatPrice = useCallback(
    (amountRwf: number) => formatPriceInCurrency(amountRwf, currency),
    [currency]
  );

  useEffect(() => {
    async function detectLocation() {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
        setDetecting(false);
        return;
      }

      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const data = await res.json();
          const code = currencyFromCountry(data.country_code || "RW");
          setCurrencyState(code);
          setCountry(data.country_name || "Rwanda");
          setCountryCode(data.country_code || "RW");
          setDetecting(false);
          return;
        }
      } catch {
        // fall through to timezone detection
      }

      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const code = currencyFromTimezone(tz);
      setCurrencyState(code);
      setCountry(code === "RWF" ? "Rwanda" : code === "KES" ? "Kenya" : "International");
      setCountryCode(code === "RWF" ? "RW" : "");
      setDetecting(false);
    }

    detectLocation();
  }, []);

  return (
    <LocaleContext.Provider
      value={{
        currency,
        country,
        countryCode,
        detecting,
        setCurrency,
        formatPrice,
        currencyLabel: CURRENCIES[currency].label,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
