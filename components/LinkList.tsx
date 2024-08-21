import Link from "next/link"
import { ReactNode } from "react"

interface LinkListProps {
  items: {
    href: string,
    children: ReactNode,
  }[]
}

const LinkList = (props: LinkListProps) => {
  const { items } = props

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        return (
          <div className="flex-auto bg-gray-100 rounded py-1" key={index}>
            <Link className="text-lg text-blue-500 underline" href={item.href}>
              {item.children}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default LinkList
