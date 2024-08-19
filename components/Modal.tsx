"use client"
import { ReactNode } from "react"

interface ModalProps {
  children: ReactNode
}

const Modal = (props: ModalProps) => {
  const { children } = props

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 z-40">
      <div className="absolute top-1/2 w-full">
        <div className="bg-white rounded m-1 p-1">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
