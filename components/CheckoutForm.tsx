import CheckoutFormClientAction from "./CheckoutFormClientAction"

const CheckoutForm = () => {
  return (
    <form className="flex flex-col gap-1" action={CheckoutFormClientAction}>
      <div className="flex-auto">
        <button className="bg-gray-500 rounded px-4 py-2 text-lg font-bold text-white" type="submit">
          チェックアウト
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
