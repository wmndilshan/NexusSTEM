'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Cpu, 
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { CATEGORIES } from '@/lib/data';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Storefront', href: '/products' },
    { label: 'Starter Kits', href: '/products?category=starter-kits' },
    { label: 'B2B Wholesale', href: '/b2b/apply' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm shadow-slate-200/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center transition-transform duration-300">
               <div className="w-4 h-4 border-2 border-accent rotate-45" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
              Nexus<span className="text-accent italic">STEM</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all hover:text-primary relative py-1",
                  pathname === link.href ? "text-primary border-b-2 border-primary" : "text-slate-500"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-slate-300 rounded-full" />
            <Input 
              placeholder="Search components..." 
              className="pl-10 h-10 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner shadow-slate-200/10"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search size={22} />
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={22} />
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                  0
                </span>
              </Button>
            </Link>

            <Link href="/auth/login" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <User size={22} />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger render={
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu size={22} />
                </Button>
              } />
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="font-heading text-2xl font-bold">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Navigation</span>
                    {navLinks.map((link) => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Categories</span>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.slice(0, 6).map((cat) => (
                        <Link 
                          key={cat.id} 
                          href={`/products?category=${cat.slug}`}
                          className="text-sm font-medium p-2 bg-zinc-50 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Link href="/b2b/dashboard">
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <LayoutDashboard size={18} />
                        B2B Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
