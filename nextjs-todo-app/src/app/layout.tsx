import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TodoProvider } from '@/contexts/TodoContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TODO App',
  description: 'シンプルなTODO管理アプリケーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <TodoProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </TodoProvider>
      </body>
    </html>
  );
}