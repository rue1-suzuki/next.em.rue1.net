"use client"
import BlackOverlay from "@/components/BlackOverlay"
import { useFormStatus } from "react-dom"

const WinnerReportFormSubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending &&
        <BlackOverlay>
          <p className="text-white text-xl font-bold">
            対戦結果を登録中
          </p>
          <p className="text-white text-xl font-bold">
            しばらくお待ちください
          </p>
        </BlackOverlay>
      }
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="submit" disabled={pending}>
        対戦結果を登録する
      </button>
    </>
  )
}

export default WinnerReportFormSubmitButton
