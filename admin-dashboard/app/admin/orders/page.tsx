import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground mt-1 text-sm">Review and fulfill customer purchases.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="bg-card shadow-sm border rounded-lg p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">To Fulfill</div>
          <div className="text-2xl font-bold flex items-baseline gap-2">
            14 <span className="text-xs font-normal text-muted-foreground">orders</span>
          </div>
        </div>
        <div className="bg-card shadow-sm border rounded-lg p-4">
          <div className="text-sm font-medium text-muted-foreground mb-1">Pending Payment</div>
          <div className="text-2xl font-bold flex items-baseline gap-2 text-amber-500">
            5 <span className="text-xs font-normal text-muted-foreground">bank transfers</span>
          </div>
        </div>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 items-center bg-muted/20">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by Order ID or Name..."
              className="w-full pl-8 bg-background"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px] bg-background">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px] bg-background">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="payhere">PayHere</SelectItem>
                <SelectItem value="koko">PayKoko</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px] pl-6">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Delivery Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "ORD-9231", date: "Oct 24, 2023", customer: "Amila Perera", method: "Bank Transfer", pStatus: "Pending", dStatus: "Pending", total: "LKR 12,500" },
                { id: "ORD-9230", date: "Oct 24, 2023", customer: "Nuwan Silva", method: "PayHere", pStatus: "Paid", dStatus: "Processing", total: "LKR 4,200" },
                { id: "ORD-9229", date: "Oct 23, 2023", customer: "CyberEdu Ltd.", method: "PayKoko", pStatus: "Paid", dStatus: "Shipped", total: "LKR 84,000", b2b: true },
                { id: "ORD-9228", date: "Oct 23, 2023", customer: "Tharindu Fernando", method: "Bank Transfer", pStatus: "Paid", dStatus: "Processing", total: "LKR 1,800" },
                { id: "ORD-9227", date: "Oct 22, 2023", customer: "Kasun Jayasinghe", method: "PayHere", pStatus: "Refunded", dStatus: "Cancelled", total: "LKR 6,450" },
              ].map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs font-semibold pl-6 cursor-pointer text-primary hover:underline">
                    <Link href={`/admin/orders/${order.id}`}>{order.id}</Link>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{order.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{order.customer}</span>
                      {order.b2b && <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">B2B</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{order.method}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      order.pStatus === 'Paid' ? 'border-green-500 text-green-600 bg-green-50' :
                      order.pStatus === 'Pending' ? 'border-amber-500 text-amber-600 bg-amber-50' : 
                      'border-muted-foreground text-muted-foreground bg-muted'
                    }>
                      {order.pStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      order.dStatus === 'Shipped' ? 'border-blue-500 text-blue-600 bg-blue-50' :
                      order.dStatus === 'Processing' ? 'border-indigo-500 text-indigo-600 bg-indigo-50' :
                      order.dStatus === 'Pending' ? 'border-amber-500 text-amber-600 bg-amber-50' :
                      'border-destructive text-destructive bg-destructive/10'
                    }>
                      {order.dStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">{order.total}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon" render={<Link href={`/admin/orders/${order.id}`} />}>
                      <>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
