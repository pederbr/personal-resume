import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react";
 
const azonix = {
  scr: [
    {
      path: './fonts/Azonix.otf',
      format: 'opentype'    
    }
  ]
};

export const metadata: Metadata = {
  title: "Peder Brennum - Portfolio",
  description: "Peder Brennum's personal webpage and portfolio",
};

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
    <html lang="en" className={`${azonix}'`} >
    <head />
        <body>
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