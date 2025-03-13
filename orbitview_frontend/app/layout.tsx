import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import logo from ".././public/logo.png"
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OrbitView - Connect with Elite Student Creators',
  description: 'Access insights from top students at world-renowned institutions through their digital twins',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="fixed top-0 left-0 right-0 z-50 bg-orbit-dark/80 backdrop-blur-md border-b border-orbit-primary/20">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="OrbitView Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-semibold text-orbit-white">OrbitView</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="text-orbit-white/70 hover:text-orbit-white transition">About</a>
                <a href="#" className="text-orbit-white/70 hover:text-orbit-white transition">Creators</a>
                <a href="#" className="text-orbit-white/70 hover:text-orbit-white transition">Pricing</a>
                <a href="#" className="text-orbit-white/70 hover:text-orbit-white transition">Contact</a>
              </div>
            </div>
          </nav>
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}