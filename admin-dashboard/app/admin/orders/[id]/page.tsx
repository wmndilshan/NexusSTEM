import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, Printer } from "lucide-react";
import Link from "next/link";

export default function OrderDetailsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" render={<Link href="/admin/orders" />}>
            <>
              <ArrowLeft className="h-4 w-4" />
            </>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">Order ORD-9231</h2>
              <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">Pending Payment</Badge>
              <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">Unfulfilled</Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">Placed on October 24, 2023 at 2:34 PM</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" /> Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right pr-6">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="pl-6">
                      <div className="font-medium">Arduino Uno R3</div>
                      <div className="text-xs text-muted-foreground font-mono">UNO-R3-ORG</div>
                    </TableCell>
                    <TableCell className="text-right">LKR 4,500</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right pr-6 font-medium">LKR 9,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6">
                      <div className="font-medium">L298N Motor Driver</div>
                      <div className="text-xs text-muted-foreground font-mono">MOD-L298N</div>
                    </TableCell>
                    <TableCell className="text-right">LKR 850</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right pr-6 font-medium">LKR 1,700</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="p-6 border-t bg-muted/5">
                <div className="space-y-3 w-full sm:w-1/2 ml-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>LKR 10,700</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping (Standard Delivery)</span>
                    <span>LKR 400</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>LKR 11,100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-amber-500/30">
            <CardHeader className="border-b bg-amber-50/50 pb-4">
              <CardTitle className="text-amber-700">Bank Transfer Verification</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Customer Deposited Bank</h4>
                  <p className="text-sm">Commercial Bank</p>
                  <p className="text-sm mt-1">Ref: ORD9231-AMILA</p>
                  <p className="text-xs text-muted-foreground mt-3">Please verify the deposit in your internet banking before changing payment status to Paid.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Proof of Payment</h4>
                  <div className="border border-dashed rounded flex flex-col items-center justify-center p-4 bg-muted/20 h-32">
                    <span className="text-xs text-muted-foreground mb-2">Customer uploaded slip.jpg</span>
                    <Button variant="secondary" size="sm">
                      <ExternalLink className="w-3 h-3 mr-2" /> View Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-sm">Amila Perera</h3>
                <p className="text-sm text-blue-600 hover:underline mt-1 cursor-pointer">amila.p@example.lk</p>
                <p className="text-sm text-muted-foreground mt-1">+94 77 123 4567</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-sm mb-2 text-muted-foreground uppercase text-xs tracking-wider">Shipping Address</h3>
                <p className="text-sm leading-relaxed">
                  124/B, Galle Road<br />
                  Colombo 03<br />
                  Western Province, 00300<br />
                  Sri Lanka
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Status</label>
                <Select defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery Status</label>
                <Select defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing (Packing)</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-2">Update Order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
