"use client"
import { useFormStatus } from "react-dom"
import BlackOverlay from "./BlackOverlay"

const CheckoutFormSubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending &&
        <BlackOverlay>
          <p className="text-white text-2xl font-bold">
            チェックアウト中...
          </p>
        </BlackOverlay>
      }
      <button className="bg-gray-500 rounded px-4 py-2 text-lg font-bold text-white" type="submit" disabled={pending}>
        チェックアウト
      </button>
    </>
  )
}

export default CheckoutFormSubmitButton
