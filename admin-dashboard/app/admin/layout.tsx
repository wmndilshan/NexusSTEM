import { AdminSidebar } from "@/components/admin-sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b flex items-center px-8 bg-card shrink-0 sticky top-0 z-10 shadow-sm/50">
           <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <div className="flex items-center gap-3 border-l pl-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold leading-none">Admin User</p>
                  <p className="text-xs text-muted-foreground mt-1">Super Admin</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                  A
                </div>
              </div>
           </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
