import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle, ArrowRightLeft } from "lucide-react";

export default function InventoryPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground mt-1 text-sm">Monitor stock levels and perform manual adjustments.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="bg-destructive/10 border-destructive/20 border shadow-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <div className="text-sm font-medium text-destructive">Out of Stock</div>
          </div>
          <div className="text-2xl font-bold text-destructive">3 <span className="text-xs font-normal opacity-80">items</span></div>
        </div>
        <div className="bg-amber-500/10 border-amber-500/20 border shadow-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <div className="text-sm font-medium text-amber-600">Low Stock Warning</div>
          </div>
          <div className="text-2xl font-bold text-amber-600">12 <span className="text-xs font-normal opacity-80">items</span></div>
        </div>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 border-b flex items-center bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search SKU or Product Name..."
              className="w-full pl-8 bg-background"
            />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="pl-6 w-[300px]">Product / SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-right pr-6 w-[250px]">Adjust Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "P004", name: "NEMA 17 Stepper Motor", sku: "MOT-N17", category: "Robotics", stock: 0, status: "Out of Stock", variant: "destructive" },
                { id: "P008", name: "ESP32 Dev Board", sku: "BRD-ESP32", category: "Microcontrollers", stock: 4, status: "Low Stock", variant: "warning" },
                { id: "P002", name: "Raspberry Pi 4 8GB", sku: "RPI-4-8G", category: "Microcontrollers", stock: 12, status: "Low Stock", variant: "warning" },
                { id: "P005", name: "L298N Motor Driver", sku: "MOD-L298N", category: "Robotics", stock: 85, status: "In Stock", variant: "default" },
                { id: "P001", name: "Arduino Uno R3", sku: "UNO-R3-ORG", category: "Microcontrollers", stock: 145, status: "In Stock", variant: "default" },
              ].map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="pl-6">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{item.sku}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      item.variant === 'warning' ? 'border-amber-500 text-amber-600 bg-amber-50' : 
                      item.variant === 'destructive' ? 'border-destructive text-destructive bg-destructive/10' : 
                      'border-green-500 text-green-600 bg-green-50'
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-mono text-base ${item.stock === 0 ? "text-destructive font-bold" : item.stock < 15 ? "text-amber-500 font-bold" : ""}`}>
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Input type="number" defaultValue={item.stock} className="w-20 text-right h-8" />
                      <Button variant="secondary" size="sm" className="h-8">
                        <ArrowRightLeft className="w-3 h-3 mr-1" /> Set
                      </Button>
                    </div>
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
