import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, DollarSign, Clock, AlertTriangle, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back. Here is what is happening with your store today.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">LKR 1,245,600</div>
            <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight text-primary">Pending Orders</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">14</div>
            <p className="text-xs text-primary/80 mt-1">Requires immediate processing</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-destructive/20 bg-destructive/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight text-destructive">Low Stock Alerts</CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">8</div>
            <p className="text-xs text-destructive/80 mt-1">Items below threshold</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight">Total Orders</CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,432</div>
            <p className="text-xs text-muted-foreground mt-1">+123 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center border-b pb-4">
            <div className="flex-1">
              <CardTitle>Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Latest transactions requiring fulfillment.</p>
            </div>
            <Button variant="outline" size="sm" render={<Link href="/admin/orders" />}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px] py-3 pl-6">Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "ORD-9231", customer: "Amila Perera", status: "Pending", amount: "LKR 12,500", variant: "warning" },
                  { id: "ORD-9230", customer: "Nuwan Silva", status: "Processing", amount: "LKR 4,200", variant: "default" },
                  { id: "ORD-9229", customer: "CyberEdu Ltd.", status: "Shipped", amount: "LKR 84,000", variant: "success", b2b: true },
                  { id: "ORD-9228", customer: "Tharindu Fernando", status: "Pending", amount: "LKR 1,800", variant: "warning" },
                  { id: "ORD-9227", customer: "Kasun Jayasinghe", status: "Delivered", amount: "LKR 6,450", variant: "outline" },
                ].map((order) => (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-xs font-semibold pl-6">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {order.customer}
                        {order.b2b && <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">B2B</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.variant as any} className={
                        order.variant === 'warning' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 
                        order.variant === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' : 
                        order.status === 'Processing' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 font-mono font-medium">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 shadow-sm flex flex-col">
          <CardHeader className="border-b pb-4">
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Frequent administrative tasks.</p>
          </CardHeader>
          <CardContent className="p-6 flex flex-col gap-3">
            <Button className="w-full justify-start font-semibold text-sm h-12" render={<Link href="/admin/products/new" />}>
              <>
                <Package className="w-5 h-5 mr-3 opacity-70" />
                Add New Product
              </>
            </Button>
            <Button variant="outline" className="w-full justify-start font-medium text-sm h-12" render={<Link href="/admin/inventory" />}>
              <>
                <AlertTriangle className="w-5 h-5 mr-3 text-amber-500 opacity-70" />
                Review Low Stock Items
              </>
            </Button>
            <Button variant="outline" className="w-full justify-start font-medium text-sm h-12" render={<Link href="/admin/b2b" />}>
              <>
                <Briefcase className="w-5 h-5 mr-3 text-blue-500 opacity-70" />
                Pending B2B Applications (2)
              </>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
