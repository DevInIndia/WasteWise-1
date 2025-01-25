import { Inter } from 'next/font/google';
import ClientProviders from './clientProviders';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "WasteWise",
  description: "E-Waste Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
        {children}
        </ClientProviders>
      </body>
    </html>
  );
}
