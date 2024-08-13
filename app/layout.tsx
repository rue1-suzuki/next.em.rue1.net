import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "EM -EventManager-",
  twitter: {
    title: "EM -EventManager-",
  },
  openGraph: {
    title: "EM -EventManager-",
  },
  robots: {
    index: false,
    follow: false,
  },
}

const RootLayout = async (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
