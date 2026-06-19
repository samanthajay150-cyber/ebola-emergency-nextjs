import type { Metadata } from "next"
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
      <body>{children}</body>
    </html>
  )
}
