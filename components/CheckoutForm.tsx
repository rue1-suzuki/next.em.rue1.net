import CheckoutFormServerAction from "./CheckoutFormServerAction"
import CheckoutFormSubmitButton from "./CheckoutFormSubmitButton"

const CheckoutForm = () => {
  return (
    <form className="flex flex-col gap-1" action={CheckoutFormServerAction}>
      <div className="flex-auto">
        <CheckoutFormSubmitButton />
      </div>
    </form>
  )
}

export default CheckoutForm
