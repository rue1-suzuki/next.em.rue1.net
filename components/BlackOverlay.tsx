import { ReactNode } from "react"

interface LoadingProps {
  children: ReactNode
}

const BlackOverlay = (props: LoadingProps) => {
  const { children } = props

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center">
      {children}
    </div>
  )
}

export default BlackOverlay
