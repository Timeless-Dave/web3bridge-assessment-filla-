import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Filla - Educational Game',
  description: 'Improve your quantitative reasoning, verbal reasoning, and vocabulary through fun puzzles and challenges.',
  keywords: ['education', 'game', 'math', 'vocabulary', 'reasoning', 'learning'],
  authors: [{ name: 'Filla Team' }],
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
          {/* Floating background elements */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-coral-200 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-1/3 right-16 w-16 h-16 bg-sunshine-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-turquoise-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-secondary-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="relative z-10">
            <ClientLayout>
              {children}
            </ClientLayout>
          </div>
        </div>
      </body>
    </html>
  );
}




