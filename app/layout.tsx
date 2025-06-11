import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import Chatbot from "@/components/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Finnect - FINRA Hybrid Work Engagement Portal",
  description: "Connect with colleagues, join clubs, and stay informed in FINRA's hybrid work environment",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 md:ml-64">
              <main className="p-6 md:p-8 pt-16 md:pt-8 overflow-y-auto">{children}</main>
            </div>
          </div>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
