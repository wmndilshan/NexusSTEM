'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Archive,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/admin/inventory', icon: Archive },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'B2B Accounts', href: '/admin/b2b', icon: Briefcase },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card flex flex-col shrink-0 h-screen sticky top-0">
      <div className="p-6 border-b">
        <h1 className="font-bold text-xl tracking-tight text-primary">NexusSTEM</h1>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors font-medium",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs text-muted-foreground flex justify-between items-center bg-muted/20">
        <span>nexusstem.lk</span>
        <span className="opacity-50">v1.2</span>
      </div>
    </aside>
  );
}
