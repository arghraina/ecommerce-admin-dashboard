import "./globals.css"; // Imports Tailwind styles
import Sidebar from "@/components/Sidebar"; // Your new Sidebar component
import Script from "next/script"; // Required for Cloudinary

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex"> 
        {/* Sidebar stays on the left */}
        <Sidebar /> 

        {/* This is the main area where your pages (Dashboard, Products) will change */}
        <main className="flex-1 bg-gray-100 min-h-screen">
          {children}
        </main>

        {/* Keeps your Cloudinary widget working */}
        <Script 
          src="https://upload-widget.cloudinary.com/global/all.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}