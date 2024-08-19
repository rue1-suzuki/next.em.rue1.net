import { Metadata } from "next"
import { Noto_Sans_JP } from 'next/font/google'
import { ReactNode } from "react"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: '--font-noto-sans-jp',
})

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
      <body className={notoSansJP.className}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
