import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Peder Brennum',
  description: "Peder Brennum's personal webpage and portfolio",
  icons: {
    icon: '/favicon.ico',
  },
}

interface RootLayoutProps {
  children: ReactNode
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <head />
        <body className="bg-background text-foreground">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
