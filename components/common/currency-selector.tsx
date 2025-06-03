"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrency, currencies } from "@/context/currency-context"
import { ChevronsUpDown } from "lucide-react"

export function CurrencySelector() {
  const { currency, setCurrencyByCode } = useCurrency()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <span>{currency.code}</span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrencyByCode(curr.code)}
            className={currency.code === curr.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{curr.symbol}</span>
            <span>{curr.name}</span>
            <span className="ml-auto text-muted-foreground">({curr.code})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
