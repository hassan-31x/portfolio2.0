import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
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
      // attribute="class"
      defaultTheme="light"
      // enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
