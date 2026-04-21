import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, UploadCloud, Eye } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" render={<Link href="/admin/products" />}>
            <>
              <ArrowLeft className="h-4 w-4" />
            </>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Edit Arduino Uno R3</h2>
            <p className="text-muted-foreground mt-1 text-sm font-mono">UNO-R3-ORG</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" /> Preview
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" defaultValue="Arduino Uno R3" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug URL</Label>
                  <Input id="slug" defaultValue="arduino-uno-r3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" defaultValue="UNO-R3-ORG" className="font-mono text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" defaultValue="The standard Arduino development board based on ATmega328P." className="resize-none h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specs">Technical Specifications</Label>
                <Textarea id="specs" defaultValue="- Microcontroller: ATmega328P&#10;- Operating Voltage: 5V&#10;- Digital I/O Pins: 14" className="resize-none h-32 font-mono text-sm" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Retail Price (LKR)</Label>
                    <Input id="price" type="number" defaultValue="4500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b2bPrice">B2B Price (LKR)</Label>
                    <Input id="b2bPrice" type="number" defaultValue="3800" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Current Stock</Label>
                    <Input id="stock" type="number" defaultValue="145" />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox id="preorder" />
                    <Label htmlFor="preorder" className="font-medium cursor-pointer">Allow Pre-orders</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Last Updated</h3>
                <p className="text-sm text-muted-foreground">Today at 10:42 AM</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Status & Categorization</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Product Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active (Published)</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="microcontrollers">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="microcontrollers">Microcontrollers</SelectItem>
                    <SelectItem value="sensors">Sensors</SelectItem>
                    <SelectItem value="robotics">Robotics</SelectItem>
                    <SelectItem value="power">Power & Batteries</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="aspect-square bg-muted rounded-md relative group overflow-hidden border">
                <img src="https://picsum.photos/seed/arduino/400/400" alt="Product thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="destructive" size="sm">Remove</Button>
                </div>
              </div>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer">
                <UploadCloud className="w-5 h-5 text-muted-foreground mb-2" />
                <span className="font-medium text-xs">Add Images</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
