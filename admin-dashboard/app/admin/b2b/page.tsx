import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Briefcase, FileText } from "lucide-react";

export default function B2bPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">B2B Accounts</h2>
          <p className="text-muted-foreground mt-1 text-sm">Review applications, assign pricing tiers, and manage business accounts.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending Approvals</p>
                <div className="text-3xl font-bold text-amber-600">2</div>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Active Accounts</p>
                <div className="text-3xl font-bold text-primary">18</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-amber-200">
        <CardHeader className="border-b bg-amber-50/50 pb-4">
          <CardTitle className="text-amber-800">Pending Applications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Business Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Registration No (BR)</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="text-right pr-6">Decision</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/50 transition-colors">
                <TableCell className="pl-6 font-medium">AutoTech Solutions</TableCell>
                <TableCell>
                  <div className="text-sm">Kasun Perera</div>
                  <div className="text-xs text-muted-foreground">kasun@autotech.lk</div>
                </TableCell>
                <TableCell className="font-mono text-xs">PV 123456</TableCell>
                <TableCell className="text-sm">Oct 24, 2023</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-white">
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/50 transition-colors">
                <TableCell className="pl-6 font-medium">Lanka Robotics Academy</TableCell>
                <TableCell>
                  <div className="text-sm">Nimal Sirisena</div>
                  <div className="text-xs text-muted-foreground">nimal@lra.edu.lk</div>
                </TableCell>
                <TableCell className="font-mono text-xs">PV 987654</TableCell>
                <TableCell className="text-sm">Oct 22, 2023</TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-white">
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Active B2B Accounts</h3>
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="pl-6">Business Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Assigned Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "CyberEdu Ltd.", contact: "purchasing@cyberedu.lk", tier: "Tier 1 (High Volume)", status: "Active" },
                  { name: "TechRobo Workshops", contact: "hello@techrobo.lk", tier: "Tier 2 (Standard B2B)", status: "Active" },
                ].map((acc, i) => (
                  <TableRow key={i} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="pl-6 font-medium">{acc.name}</TableCell>
                    <TableCell className="text-sm">{acc.contact}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200">
                        {acc.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">{acc.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
