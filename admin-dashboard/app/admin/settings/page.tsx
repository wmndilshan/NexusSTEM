import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch"; // I didn't install switch, let me just use checkbox or plain HTML for now, wait I'll use checkboxes
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Configure your store preferences, payments, and delivery.</p>
        </div>
      </div>

      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Store Details</CardTitle>
              <CardDescription>Basic configuration for your store.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="NexusSTEM" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" defaultValue="hello@nexusstem.lk" />
              </div>
              <Button>Save General Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20 pb-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>PayHere</CardTitle>
                  <CardDescription>Primary payment gateway for Sri Lanka</CardDescription>
                </div>
                <Checkbox id="enable-payhere" defaultChecked />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payhereId">Merchant ID</Label>
                  <Input id="payhereId" type="password" defaultValue="123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payhereSecret">Merchant Secret</Label>
                  <Input id="payhereSecret" type="password" defaultValue="****************" />
                </div>
                <Button variant="outline" size="sm">Update PayHere Keys</Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="border-b bg-muted/20 pb-4 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>PayKoko</CardTitle>
                  <CardDescription>Buy Now Pay Later support</CardDescription>
                </div>
                <Checkbox id="enable-koko" defaultChecked />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="kokoKey">API Key</Label>
                  <Input id="kokoKey" type="password" defaultValue="sk_test_..." />
                </div>
                <Button variant="outline" size="sm">Update Koko Keys</Button>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Manual Bank Transfer</CardTitle>
                <CardDescription>Details shown to customers at checkout for direct deposits.</CardDescription>
              </div>
              <Checkbox id="enable-bank" defaultChecked />
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" defaultValue="Commercial Bank of Ceylon" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accName">Account Name</Label>
                    <Input id="accName" defaultValue="NexusSTEM Pvt Ltd" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accNum">Account Number</Label>
                    <Input id="accNum" defaultValue="8001234567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input id="branch" defaultValue="Colombo 03" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Payment Instructions (shown at checkout)</Label>
                    <Textarea 
                      id="instructions" 
                      className="h-[120px] resize-none"
                      defaultValue="Please transfer the total amount to the bank account above. Use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account. Please upload the proof of payment on the order status page after completing the transfer."
                    />
                  </div>
                  <Button className="w-full">Save Bank Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Delivery Zones & Rates</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-semibold text-sm">Western Province (Standard)</h4>
                  <p className="text-sm text-muted-foreground">Colombo, Gampaha, Kalutara</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">LKR 400</div>
                  <Button variant="link" size="sm" className="px-0">Edit</Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-semibold text-sm">Outstation (Standard)</h4>
                  <p className="text-sm text-muted-foreground">All other provinces</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">LKR 450</div>
                  <Button variant="link" size="sm" className="px-0">Edit</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full border-dashed">
                Add New Delivery Zone
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
