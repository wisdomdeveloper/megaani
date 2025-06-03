import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function TransactionHistory() {
  // Mock data - replace with real API calls
  const transactions = [
    {
      id: "1",
      type: "earning",
      description: "Course purchase - Complete React Developer Course",
      amount: 89.99,
      date: "2024-01-28",
      status: "completed",
    },
    {
      id: "2",
      type: "withdrawal",
      description: "Bank transfer to ****1234",
      amount: -5000.0,
      date: "2024-01-25",
      status: "completed",
    },
    {
      id: "3",
      type: "earning",
      description: "Course purchase - Node.js Backend Development",
      amount: 79.99,
      date: "2024-01-24",
      status: "completed",
    },
    {
      id: "4",
      type: "earning",
      description: "Course enrollment - Complete React Developer Course",
      amount: 89.99,
      date: "2024-01-23",
      status: "pending",
    },
    {
      id: "5",
      type: "withdrawal",
      description: "PayPal transfer",
      amount: -2500.0,
      date: "2024-01-20",
      status: "completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent earnings and withdrawals</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center">
                    {transaction.type === "earning" ? (
                      <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownLeft className="mr-2 h-4 w-4 text-red-500" />
                    )}
                    <span className="capitalize">{transaction.type}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>
                  <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
