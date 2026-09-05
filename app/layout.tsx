import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: '碩尹有限公司｜快速儲值中心',
  description: '選擇適合你的點數儲值方案，快速完成結帳。',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="zh-Hant"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
