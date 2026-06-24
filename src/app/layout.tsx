import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ebola Emergency Support",
  description: "Emergency financial assistance for Ebola treatment and care.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Ebola Emergency Support",
    description: "Emergency financial assistance for Ebola treatment and care.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Tawk.to Script - Server Component friendly */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          src="https://embed.tawk.to/6a365ecfaf26101d489dc3ac/default"
        />
      </body>
    </html>
  )
}
