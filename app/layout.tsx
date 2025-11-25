import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/layout/ThemeToggle';
import ThemeProvider from '@/components/layout/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Advanced Tic Tac Toe - AI Powered Game',
  description: 'A modern, beautiful Tic Tac Toe game with AI opponents, animations, and engaging UI',
  keywords: ['tic tac toe', 'game', 'AI', 'Next.js', 'React'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeToggle />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
