import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ebola Emergency Support",
  description: "Application platform for Ebola treatment and emergency financial assistance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
