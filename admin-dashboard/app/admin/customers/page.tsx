import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";

export default function CustomersPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage registered users and B2B accounts.</p>
        </div>
      </div>

      <Card className="shadow-sm">
        <div className="p-4 border-b flex items-center bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, email, or phone..."
              className="w-full pl-8 bg-background"
            />
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "C01", name: "Amila Perera", email: "amila.p@example.lk", phone: "0771234567", type: "Standard", orders: 4, spent: "LKR 45,200" },
                { id: "C02", name: "CyberEdu Ltd.", email: "purchasing@cyberedu.lk", phone: "0112345678", type: "B2B Tier 1", orders: 12, spent: "LKR 480,000", b2b: true },
                { id: "C03", name: "Nuwan Silva", email: "nuwan.s@mail.com", phone: "0718899000", type: "Standard", orders: 1, spent: "LKR 4,200" },
                { id: "C04", name: "TechRobo Workshops", email: "hello@techrobo.lk", phone: "0775556666", type: "B2B Tier 2", orders: 5, spent: "LKR 125,500", b2b: true },
                { id: "C05", name: "Tharindu Fernando", email: "tharindu99@gmail.com", phone: "0784443322", type: "Standard", orders: 2, spent: "LKR 3,600" },
              ].map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="pl-6 font-medium">
                    {customer.name}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{customer.email}</div>
                    <div className="text-xs text-muted-foreground">{customer.phone}</div>
                  </TableCell>
                  <TableCell>
                    {customer.b2b ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
                        {customer.type}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">Standard</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground">{customer.orders}</TableCell>
                  <TableCell className="font-mono">{customer.spent}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
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
