'use client';

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { StockBadge } from "./StockBadge";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <StockBadge stock={product.stock} isPreorder={product.isPreorder} />
            {product.b2bPricing && (
              <div className="bg-white/95 backdrop-blur-sm text-[10px] uppercase tracking-[0.05em] font-bold text-primary px-2 py-1 rounded shadow-sm border border-border">
                B2B Tier Pricing
              </div>
            )}
          </div>
        </div>
        
        <div className="p-5">
          <div className="text-[10px] text-muted-foreground mb-1 font-bold tracking-widest uppercase">
            {product.category}
          </div>
          <h3 className="font-heading font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem] text-lg leading-tight">
            {product.name}
          </h3>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-heading font-black text-primary tracking-tight">
                LKR {product.price.toLocaleString()}
              </span>
            </div>
            
            <Button
              size="icon"
              variant="outline"
              className="rounded-full w-10 h-10 border-border hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0 && !product.isPreorder}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
