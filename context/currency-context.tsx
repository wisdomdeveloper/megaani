"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define currency types
export interface Currency {
  code: string
  symbol: string
  name: string
  rate: number // Exchange rate relative to USD
}

// List of supported currencies
export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 150.14 },
  { code: "CAD", symbol: "$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", symbol: "$", name: "Australian Dollar", rate: 1.52 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 1550 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 5.05 },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 18.31 },
]

// Country to currency mapping (simplified)
export const countryToCurrency: Record<string, string> = {
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  JP: "JPY",
  AU: "AUD",
  IN: "INR",
  NG: "NGN",
  BR: "BRL",
  ZA: "ZAR",
}

interface CurrencyContextType {
  currency: Currency
  setCurrencyByCode: (code: string) => void
  convertPrice: (priceInUSD: number) => number
  formatPrice: (price: number) => string
  userCountry: string | null
  isLoading: boolean
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]) // Default to USD
  const [userCountry, setUserCountry] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Set currency by code
  const setCurrencyByCode = (code: string) => {
    const newCurrency = currencies.find((c) => c.code === code)
    if (newCurrency) {
      setCurrency(newCurrency)
      localStorage.setItem("preferredCurrency", code)
    }
  }

  // Convert price from USD to selected currency
  const convertPrice = (priceInUSD: number): number => {
    return priceInUSD * currency.rate
  }

  // Format price with currency symbol
  const formatPrice = (price: number): string => {
    const formattedPrice = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)

    // Handle special cases for currency symbol placement
    if (currency.code === "USD" || currency.code === "CAD" || currency.code === "AUD") {
      return `${currency.symbol}${formattedPrice}`
    } else if (currency.code === "EUR") {
      return `${formattedPrice}${currency.symbol}`
    } else {
      return `${currency.symbol} ${formattedPrice}`
    }
  }

  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        // Check for saved preference first
        const savedCurrency = localStorage.getItem("preferredCurrency")
        if (savedCurrency) {
          setCurrencyByCode(savedCurrency)
          setIsLoading(false)
          return
        }

        // Mock geolocation API call - in production, use a real geolocation service
        // For example: const response = await fetch('https://ipapi.co/json/')
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

        // Mock response - in production, this would come from the API
        const mockCountry = "US" // Default to US for the mock

        setUserCountry(mockCountry)

        // Set currency based on country
        const currencyCode = countryToCurrency[mockCountry] || "USD"
        setCurrencyByCode(currencyCode)
      } catch (error) {
        console.error("Failed to detect location:", error)
        // Fallback to USD
        setCurrencyByCode("USD")
      } finally {
        setIsLoading(false)
      }
    }

    detectUserLocation()
  }, [])

  const value = {
    currency,
    setCurrencyByCode,
    convertPrice,
    formatPrice,
    userCountry,
    isLoading,
  }

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
