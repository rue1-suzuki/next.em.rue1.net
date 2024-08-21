import { ReactNode } from "react"

interface MyHeadersProps {
  children: ReactNode
}

export const H1 = (props: MyHeadersProps) => {
  const { children } = props

  return (
    <h1 className="text-xl font-bold">
      {children}
    </h1>
  )
}

export const H2 = (props: MyHeadersProps) => {
  const { children } = props

  return (
    <h2 className="text-xl font-bold">
      {children}
    </h2>
  )
}

export const H3 = (props: MyHeadersProps) => {
  const { children } = props

  return (
    <h3 className="text-lg font-bold">
      {children}
    </h3>
  )
}
