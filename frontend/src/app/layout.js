import "./globals.css";

export const metadata = {
  title: "WasteWise",
  description: "E-Waste Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
