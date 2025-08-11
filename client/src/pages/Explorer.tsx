import { motion } from "framer-motion";
import { useState } from "react";
import { Search, ExternalLink, Clock, CheckCircle, AlertCircle, FileText, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  amount: string;
  time: string;
  status: 'confirmed' | 'pending' | 'failed';
}

// Mock transaction data - in real app this would come from API
const mockTransactions: Transaction[] = [
  {
    hash: "89e965880d7db839288f6a33d76110b0b4fcb207e0f59e4525003657f6ccb555",
    from: "bqs1HpmbeSd8nhRpq5zX5df91D3Xy8pSUovmV",
    to: "bqs17CjWKyHUHZKpNLrBaGK6stPFKAPdXdJBn",
    amount: "100.00000000",
    time: "8/9/2025, 12:38:07 PM",
    status: "confirmed"
  },
  {
    hash: "7a2f4e8c9b1d3a5e7f9c2e4a6b8d0f2e4a6c8e0b2d4f6a8c0e2f4a6b8d0e2f4",
    from: "bqs1A8fG3jK9mN2pQ5rT8uX1yZ4vB7nM0lK3fH6dS9wE2",
    to: "bqs1C5dF7hJ0kL3nP6qS9tV2wY5zA8cE1gI4jL7oR0uX3",
    amount: "25.50000000",
    time: "8/9/2025, 11:22:15 AM",
    status: "confirmed"
  },
  {
    hash: "3f7a9e2c5b8d1a4e6f0c3e5a7b9d2f4e6a8c0e3f5a7c9e1f4a6b8d0e3f5a7c9",
    from: "bqs1E9hI2kM5nQ8rU1vY4zA7cF0eH3jL6oS9tW2xZ5vB8",
    to: "bqs1G7fJ0kN3pS6uX9zA2dF5hI8lO1qT4wZ7cE0gK3nP6",
    amount: "0.75000000",
    time: "8/9/2025, 10:45:33 AM",
    status: "confirmed"
  },
  {
    hash: "2e8b4f7a0c6d9e2f5a8c1e4f7a0d3f6a9c2e5f8b1d4f7a0c3e6f9b2e5f8a1d4",
    from: "bqs1I5kN8qT1wZ4cF7hL0oS3vY6zA9dG2fJ5mP8rU1xE4",
    to: "bqs1K3jM6pS9vY2eH5kN8qU1xZ4cG7fJ0mP3rU6wZ9dF2",
    amount: "250.00000000",
    time: "8/9/2025, 9:15:42 AM",
    status: "pending"
  },
  {
    hash: "4d7f0a3e6c9f2e5b8a1d4f7a0c3e6f9c2e5a8b1d4f7a0c3e6f9c2e5b8a1d4f7",
    from: "bqs1M1oR4uX7zA0dG3gJ6lO9qT2wZ5cF8hL1nP4sV7yE0",
    to: "bqs1O9pT2wZ5cG8hL1oS4vY7zA0dF3gJ6mP9rU2xE5kN8",
    amount: "12.34567890",
    time: "8/9/2025, 8:30:18 AM",
    status: "confirmed"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'failed':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="h-4 w-4" />;
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'failed':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const truncateHash = (hash: string) => {
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
};

const truncateAddress = (address: string) => {
  return `${address.slice(0, 12)}...${address.slice(-8)}`;
};

export default function Explorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = mockTransactions.filter(tx =>
    tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              qBTC <span className="text-primary">Explorer</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Explore quantum-safe Bitcoin transactions on the qBTC sidechain
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by transaction hash, address, or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234,567</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">24h Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345 qBTC</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,678</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Block Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5s</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transactions Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hash</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TableRow 
                            key={transaction.hash} 
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <TableCell className="font-mono">
                              {truncateHash(transaction.hash)}
                            </TableCell>
                            <TableCell className="font-mono">
                              {truncateAddress(transaction.from)}
                            </TableCell>
                            <TableCell className="font-mono">
                              {truncateAddress(transaction.to)}
                            </TableCell>
                            <TableCell className="font-mono">
                              {transaction.amount} qBTC
                            </TableCell>
                            <TableCell>
                              {transaction.time}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={`${getStatusColor(transaction.status)} flex items-center gap-1`}
                              >
                                {getStatusIcon(transaction.status)}
                                {transaction.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-96">
                            <div className="flex flex-col items-center justify-center text-center space-y-4">
                              {searchTerm ? (
                                <>
                                  <Search className="w-16 h-16 text-muted-foreground/50" />
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">No transactions found</h3>
                                    <p className="text-muted-foreground max-w-md">
                                      No transactions match your search criteria for "{searchTerm}". Try searching with a different transaction hash, address, or amount.
                                    </p>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setSearchTerm("")}
                                    className="mt-4"
                                  >
                                    Clear Search
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Database className="w-16 h-16 text-muted-foreground/50" />
                                  <div>
                                    <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
                                    <p className="text-muted-foreground max-w-md">
                                      The qBTC network is ready, but no transactions have been recorded yet. Be the first to make a transaction!
                                    </p>
                                  </div>
                                  <Button className="mt-4 orange-gradient text-white">
                                    Create Transaction
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Transaction Detail Modal */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              View complete information about this qBTC transaction
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Transaction Hash</label>
                <div className="mt-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                  {selectedTransaction.hash}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">From</label>
                <div className="mt-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                  {selectedTransaction.from}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">To</label>
                <div className="mt-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                  {selectedTransaction.to}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Amount</label>
                <div className="mt-1 p-3 bg-muted rounded-lg font-mono text-sm">
                  {selectedTransaction.amount} qBTC
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Time</label>
                <div className="mt-1 p-3 bg-muted rounded-lg text-sm">
                  {selectedTransaction.time}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(selectedTransaction.status)} flex items-center gap-1 w-fit`}
                  >
                    {getStatusIcon(selectedTransaction.status)}
                    {selectedTransaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}