import { ReactNode } from "react"

interface FormItemProps {
  label: ReactNode
  children: ReactNode
  isRequired: boolean
}

const FormItem = (props: FormItemProps) => {
  const { label, children, isRequired, } = props

  return (
    <div className="flex-auto flex flex-col mb-3">
      <label className="flex justify-center items-center gap-1">
        <span className="text-lg font-bold"> {label} </span>
        {isRequired
          ? <span className="text-xs font-bold text-red-500">
            必須
          </span>
          : <span className="text-xs font-bold text-gray-500">
            任意
          </span>
        }
      </label>
      {children}
    </div>
  )
}

export default FormItem
