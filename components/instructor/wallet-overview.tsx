import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, CreditCard, Download } from "lucide-react"

export function WalletOverview() {
  // Mock data - replace with real API calls
  const walletData = {
    totalBalance: 12450.5,
    pendingEarnings: 2340.75,
    thisMonthEarnings: 3420.25,
    lastWithdrawal: "2024-01-15",
    nextPayoutDate: "2024-02-01",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${walletData.totalBalance.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Ready for withdrawal</p>
          <Button className="w-full mt-4" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Withdraw Funds
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${walletData.pendingEarnings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Available on {walletData.nextPayoutDate}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${walletData.thisMonthEarnings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+15.2% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
