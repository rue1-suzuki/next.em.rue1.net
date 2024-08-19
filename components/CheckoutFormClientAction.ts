"use client"
import CheckoutFormServerAction from "./CheckoutFormServerAction"

const CheckoutFormClientAction = async (formData: FormData) => {
  await CheckoutFormServerAction(formData)
}

export default CheckoutFormClientAction
