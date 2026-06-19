import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ebola Emergency Support — Treatment & Financial Assistance",
  description: "Apply for emergency financial assistance and treatment support for Ebola. Fast, secure, transparent application processing for affected individuals and families.",
  keywords: "Ebola, emergency, treatment, financial assistance, support, application, healthcare",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Ebola Emergency Support",
    description: "Emergency financial assistance and treatment support for Ebola",
    type: "website",
  },
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
