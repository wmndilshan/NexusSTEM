'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  LayoutGrid, 
  List,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('Featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const maxPriceInData = Math.max(...PRODUCTS.map(p => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPriceInData]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStock = !inStockOnly || product.stock > 0 || product.isPreorder;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesStock && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0; // Default featured
    });
  }, [searchQuery, selectedCategory, sortBy, inStockOnly, priceRange]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/30">
        {/* Breadcrumbs & Title */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-600">Storefront</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-heading font-black text-zinc-900 tracking-tight">Storefront</h1>
              <p className="text-zinc-500 mt-2 font-medium">Browse our selection of {PRODUCTS.length} premium components.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <Input 
                  placeholder="Filter products..." 
                  className="pl-9 h-11 border-zinc-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Filter Trigger */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger render={
                    <Button variant="outline" size="icon" className="h-11 w-11">
                      <SlidersHorizontal size={18} />
                    </Button>
                  } />
                  <SheetContent side="bottom" className="h-[80vh]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-6 flex flex-col gap-8">
                       <FilterContent 
                        selectedCategory={selectedCategory} 
                        setSelectedCategory={setSelectedCategory}
                        inStockOnly={inStockOnly}
                        setInStockOnly={setInStockOnly}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        maxPrice={maxPriceInData}
                       />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 space-y-8">
              <FilterContent 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                maxPrice={maxPriceInData}
              />
            </aside>

            {/* Product Listing Area */}
            <div className="lg:col-span-9">
              {/* Controls */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Showing <span className="text-zinc-900">{filteredProducts.length}</span> Results
                </div>
                
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button variant="ghost" className="h-8 gap-2 font-bold text-xs uppercase tracking-widest">
                        Sort By: {sortBy} <ChevronDown size={14} />
                      </Button>
                    } />
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => setSortBy('Featured')}>Featured</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('Price: Low to High')}>Price: Low to High</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('Price: High to Low')}>Price: High to Low</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <div className="flex items-center border rounded-lg overflow-hidden shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none bg-primary text-white hover:bg-primary/90">
                      <LayoutGrid size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none text-zinc-400 hover:text-zinc-600">
                      <List size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-32 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-heading font-bold">No products found</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto">Try adjusting your search query or filters to find what you&apos;re looking for.</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory(null); setInStockOnly(false); setPriceRange([0, maxPriceInData]); }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FilterContent({ 
  selectedCategory, 
  setSelectedCategory,
  inStockOnly,
  setInStockOnly,
  priceRange,
  setPriceRange,
  maxPrice
}: { 
  selectedCategory: string | null; 
  setSelectedCategory: (val: string | null) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
  maxPrice: number;
}) {
  return (
    <>
      <div className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Categories</h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "flex items-center justify-between text-sm font-bold px-3 py-2 rounded transition-all text-left",
              !selectedCategory ? "bg-primary/5 text-primary border border-primary/10" : "hover:bg-slate-100 text-slate-500"
            )}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={cn(
                "flex items-center justify-between text-sm font-bold px-3 py-2 rounded transition-all text-left",
                selectedCategory === cat.name ? "bg-primary/5 text-primary border border-primary/10" : "hover:bg-slate-100 text-slate-500"
              )}
            >
              <span>{cat.name}</span>
              <span className={cn(
                "text-[9px] px-1.5 py-0.5 rounded",
                selectedCategory === cat.name ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
              )}>
                {Number(cat.id) * 12 + 5}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-10 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Price Range (LKR)</h3>
          <span className="text-[10px] font-bold text-primary">Rs. {priceRange[0]} - Rs. {priceRange[1]}</span>
        </div>
        <Slider
          defaultValue={[0, maxPrice]}
          max={maxPrice}
          step={50}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="py-4"
        />
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Min: 0</span>
          <span>Max: {maxPrice}</span>
        </div>
      </div>

      <div className="space-y-6 pt-10 border-t border-border">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Availability</h3>
        <div className="flex items-center space-x-3">
          <Checkbox 
            id="inStock" 
            checked={inStockOnly} 
            onCheckedChange={(checked) => setInStockOnly(checked === true)} 
            className="w-5 h-5 border-slate-300 rounded"
          />
          <Label htmlFor="inStock" className="text-sm font-bold text-slate-600 cursor-pointer">
            Exclude Out of Stock
          </Label>
        </div>
      </div>

      <div className="pt-10 flex flex-col gap-6">
        <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200">
          <p className="text-[10px] text-accent font-black uppercase tracking-[0.2em] mb-2">B2B Exclusive</p>
          <h4 className="text-lg font-heading font-black mb-2">Wholesale Tier</h4>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed font-medium">
            Commercial accounts receive volume localized discounts and dedicated lab sourcing.
          </p>
          <Link href="/b2b/apply" className="block">
            <Button size="sm" className="w-full h-10 bg-white text-slate-900 hover:bg-accent hover:text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all">
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
