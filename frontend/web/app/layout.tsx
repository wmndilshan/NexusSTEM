import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NexusSTEM | Advanced Electronics & Hub',
  description: 'Sri Lanka\'s hub for premium Arduino, Robotics, and IoT components. Technical support and genuine parts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans antialiased", inter.variable)}>
      <body suppressHydrationWarning className="bg-background text-foreground selection:bg-accent/20">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
