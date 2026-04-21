import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
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
            <h2 className="text-3xl font-bold tracking-tight">Add Product</h2>
            <p className="text-muted-foreground mt-1 text-sm">Create a new item in your catalog.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button>
            <Save className="w-4 h-4 mr-2" /> Publish Product
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
                <Input id="name" placeholder="e.g., Arduino Mega 2560" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug URL</Label>
                  <Input id="slug" placeholder="arduino-mega-2560" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="BRD-MEGA-2560" className="font-mono text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" placeholder="A brief summary of the product..." className="resize-none h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specs">Technical Specifications</Label>
                <Textarea id="specs" placeholder="- Microcontroller: ATmega2560&#10;- Operating Voltage: 5V" className="resize-none h-32 font-mono text-sm" />
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
                    <Input id="price" type="number" placeholder="4500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="b2bPrice">B2B Price (LKR)</Label>
                    <Input id="b2bPrice" type="number" placeholder="3800" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input id="stock" type="number" placeholder="100" />
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
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/20 pb-4">
              <CardTitle>Status & Categorization</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Product Status</Label>
                <Select defaultValue="draft">
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
                <Select>
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
              <CardDescription>Upload product images</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 flex flex-col items-center justify-center text-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UploadCloud className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">Click to upload</h3>
                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG (max. 800x800px)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
