import { ReactNode } from "react"

interface WinnerPageLayoutProps {
  params: {
    eventUuid: string,
  },
  children: ReactNode,
}

const WinnerPageLayout = async (props: WinnerPageLayoutProps) => {
  const { children } = props

  return (<> {children} </>)
}

export default WinnerPageLayout
