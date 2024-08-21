"use client"
import { useFormStatus } from "react-dom"
import BlackOverlay from "./BlackOverlay"

const CheckinFormSubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending &&
        <BlackOverlay>
          <p className="text-white text-2xl font-bold">
            チェックイン中...
          </p>
        </BlackOverlay>
      }

      <button className="bg-blue-500 rounded px-4 py-2 text-lg font-bold text-white" type="submit" disabled={pending}>
        チェックイン
      </button>
    </>
  )
}

export default CheckinFormSubmitButton
