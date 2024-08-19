"use server"
import { AvailableKeys, deleteCookieValue } from "@/utils/getCookieValue"

const CheckoutFormServerAction = async (formData: FormData) => {
  deleteCookieValue(AvailableKeys.PLAYER_UUID)
}

export default CheckoutFormServerAction
