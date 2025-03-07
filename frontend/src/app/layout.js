import { Inter } from 'next/font/google';
import "./globals.css";
import { Providers } from './provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "WasteWise",
  description: "E-Waste Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
