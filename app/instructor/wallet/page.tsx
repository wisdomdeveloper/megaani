import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { DashboardSidebar } from "@/components/common/dashboard-sidebar"
import { WalletOverview } from "@/components/instructor/wallet-overview"
import { TransactionHistory } from "@/components/instructor/transaction-history"
import { DashboardShell } from "@/components/common/dashboard-shell"

export default function InstructorWalletPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <DashboardShell>
        <DashboardSidebar userType="instructor" />
        <div className="flex-1 space-y-8 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
          </div>
          <div className="space-y-6">
            <WalletOverview />
            <TransactionHistory />
          </div>
        </div>
      </DashboardShell>
      <Footer />
    </div>
  )
}
