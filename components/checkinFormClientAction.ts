"use client"
import checkinFormServerAction from "./checkinFormServerAction"

const checkinFormClientAction = async (formData: FormData) => {
  await checkinFormServerAction(formData)
}

export default checkinFormClientAction
