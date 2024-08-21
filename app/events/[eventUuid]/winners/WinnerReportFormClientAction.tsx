"use client"
import winnerReportFormAction from "./winnerReportFormServerAction"

const clientAction = async (formData: FormData) => {
  await winnerReportFormAction(formData)
  window.location.reload()
}

export default clientAction
