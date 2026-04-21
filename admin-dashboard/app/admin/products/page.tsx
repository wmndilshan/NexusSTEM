import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Package, Plus, Search } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your catalog, pricing, and B2B rules.</p>
        </div>
        <Button render={<Link href="/admin/products/new" />}>
          <>
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </>
        </Button>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4 items-center bg-muted/20">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8 bg-background"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px] bg-background">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="microcontrollers">Microcontrollers</SelectItem>
                <SelectItem value="sensors">Sensors</SelectItem>
                <SelectItem value="robotics">Robotics</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[150px] bg-background">
                <SelectValue placeholder="Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="instock">In Stock</SelectItem>
                <SelectItem value="lowstock">Low Stock</SelectItem>
                <SelectItem value="outofstock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px] pl-6"></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>B2B Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "P001", name: "Arduino Uno R3", sku: "UNO-R3-ORG", price: "LKR 4,500", b2bPrice: "LKR 3,800", stock: 145, status: "Active" },
                { id: "P002", name: "Raspberry Pi 4 8GB", sku: "RPI-4-8G", price: "LKR 38,000", b2bPrice: "LKR 35,500", stock: 12, status: "Low Stock" },
                { id: "P003", name: "DHT11 Temp Sensor", sku: "SEN-DHT11", price: "LKR 450", b2bPrice: "LKR 350", stock: 450, status: "Active" },
                { id: "P004", name: "NEMA 17 Stepper Motor", sku: "MOT-N17", price: "LKR 2,800", b2bPrice: "LKR 2,200", stock: 0, status: "Out of Stock" },
                { id: "P005", name: "L298N Motor Driver", sku: "MOD-L298N", price: "LKR 850", b2bPrice: "LKR 650", stock: 85, status: "Active" },
              ].map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="pl-6 py-3">
                    <div className="w-10 h-10 bg-secondary rounded-md flex items-center justify-center border">
                      <Package className="h-5 w-5 text-muted-foreground opacity-50" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell className="font-medium text-muted-foreground">{product.b2bPrice}</TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? "text-destructive font-bold" : product.stock < 20 ? "text-amber-500 font-bold" : ""}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      product.status === 'Active' ? 'border-green-500 text-green-600 bg-green-50' :
                      product.status === 'Low Stock' ? 'border-amber-500 text-amber-600 bg-amber-50' :
                      product.status === 'Out of Stock' ? 'border-destructive text-destructive bg-destructive/10' : ''
                    }>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon" render={<Link href={`/admin/products/${product.id}`} />}>
                      <>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
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
