'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { StockBadge } from '@/components/product/StockBadge';
import { ProductCard } from '@/components/product/ProductCard';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  ChevronRight, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  MapPin,
  Minus,
  Plus,
  Share2,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = PRODUCTS.find(p => p.slug === slug);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-4xl font-heading font-black mb-4">Product Not Found</h1>
          <p className="text-zinc-500 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products">
            <Button size="lg">Return to Store</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const handleWhatsApp = () => {
    const message = `Hi NexusSTEM, I'm interested in the ${product.name} (SKU: ${product.sku}). Is it currently available?`;
    window.open(`https://wa.me/94771234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-primary transition-colors">Storefront</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-600 truncate max-w-[200px]">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="aspect-square relative rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-100 group">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Share2 size={18} />
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square relative rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 cursor-pointer hover:border-primary transition-colors">
                    <Image 
                      src={`https://picsum.photos/seed/product-${slug}-${i}/300/300`} 
                      alt={`${product.name} view ${i}`}
                      fill
                      className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <StockBadge stock={product.stock} isPreorder={product.isPreorder} />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">SKU: {product.sku}</span>
                </div>
                {product.b2bPricing && (
                  <div className="bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-primary/10">
                    B2B Eligible
                  </div>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-heading font-black text-zinc-900 tracking-tight mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 text-primary font-heading font-bold text-3xl mb-8">
                <span>LKR {product.price.toLocaleString()}</span>
                {product.b2bPricing && (
                  <span className="text-sm font-medium text-zinc-400 line-through ml-2 opacity-50">Bulk Disc. Avail</span>
                )}
              </div>

              <p className="text-zinc-600 leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50 p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-full h-8 w-8"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-full h-8 w-8"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <Button 
                    size="lg" 
                    className="flex-1 rounded-full h-12 text-base font-bold shadow-lg shadow-primary/25 gap-2"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 && !product.isPreorder}
                  >
                    <ShoppingCart size={20} />
                    {product.isPreorder ? 'Preorder Now' : 'Add to Cart'}
                  </Button>
                </div>

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full h-12 text-base font-bold gap-2 border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle size={20} />
                  Ask via WhatsApp
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t">
                <div className="flex items-start gap-3">
                  <Truck className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm">Islandwide Delivery</h4>
                    <p className="text-xs text-zinc-500 mt-1">Gampaha, Colombo: 24h. Islandwide: 2-4 days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-sm">Genuine Product</h4>
                    <p className="text-xs text-zinc-500 mt-1">Verified components with technical support.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="mt-24">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12 p-0 gap-8">
                <TabsTrigger 
                  value="specs" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 h-12 font-bold text-xs uppercase tracking-widest"
                >
                  Technical Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="shipping" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 h-12 font-bold text-xs uppercase tracking-widest"
                >
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>
              <TabsContent value="specs" className="py-12">
                <div className="max-w-3xl border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specs.map((spec, idx) => (
                        <tr key={idx} className={cn(idx % 2 === 0 ? "bg-zinc-50" : "bg-white")}>
                          <td className="px-6 py-4 font-bold text-zinc-500 w-1/3">{spec.label}</td>
                          <td className="px-6 py-4 text-zinc-900">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="py-12">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary"><Truck size={20} /></div>
                    <div>
                      <h4 className="font-bold mb-1">Standard Shipping</h4>
                      <p className="text-zinc-600 text-sm">We use prompt local couriers. COD is available for select regions. Charges depend on weight and destination.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg text-primary"><MapPin size={20} /></div>
                    <div>
                      <h4 className="font-bold mb-1">Store Pickup</h4>
                      <p className="text-zinc-600 text-sm">Order online and pick up from our Colombo 03 warehouse between 9AM - 5PM, Monday to Friday.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 pt-24 border-t">
              <div className="flex flex-col gap-2 mb-12">
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Recommendations</span>
                <h2 className="text-3xl font-heading font-bold text-zinc-900">Related Products</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
