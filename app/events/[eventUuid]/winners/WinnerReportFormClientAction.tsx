"use client"
import winnerReportFormAction from "./winnerReportFormAction"

const clientAction = async (formData: FormData) => {
  await winnerReportFormAction(formData)
}

export default clientAction
