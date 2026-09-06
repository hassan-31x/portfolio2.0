import React from 'react'

// import { ThemeProvider } from './Theme'

import { ThemeProvider } from "@/components/theme-provider"

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    // <ThemeProvider>
    //   <HeaderThemeProvider>{children}</HeaderThemeProvider>
    // </ThemeProvider>
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="portfolio-theme"
    >
      {children}
    </ThemeProvider>
  )
}
