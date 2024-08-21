import BlackOverlay from "@/components/BlackOverlay"
import FormItem from "@/components/FormItem"
import { useFormStatus } from "react-dom"
import ReportFormClientAction from "./ReportFormClientAction"
import reportFormValues from "./reportFormValues"

interface ReportFormProps {
  players: EMPlayer[]
}

const ReportFormSubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending &&
        <BlackOverlay>
          <p className="text-white text-2xl font-bold">
            通報中...
          </p>
        </BlackOverlay>
      }
      <button className="border rounded bg-red-500 text-white px-4 py-2 text-center" type="submit" disabled={pending}>
        通報する
      </button>
    </>
  )
}

const ReportForm = async (props: ReportFormProps) => {
  const { players } = props

  return (
    <form className="flex flex-col gap-1" action={ReportFormClientAction}>
      <FormItem label={<> 通報対象 </>} isRequired={false}>
        <select className="flex-auto border rounded px-4 py-2 text-center" name="reportedPlayerUuid">
          <option value=""> 選択してください </option>
          {players.map((player) => {
            return (
              <option value={player.uuid} key={player.uuid}>
                [{player.number}] {player.name}
              </option>
            )
          })}
        </select>
      </FormItem>
      <FormItem label={<> 通報する内容 </>} isRequired={true}>
        <select className="border rounded px-4 py-2 text-center" name="reason" required>
          <option value=""> 選択してください </option>
          {reportFormValues.map((value) => {
            return (
              <option value={value} key={value}>
                {value}
              </option>
            )
          })}
        </select>
      </FormItem>
      <FormItem label={<> 通報内容の詳細 </>} isRequired={true}>
        <textarea
          className="flex-auto border rounded px-4 py-2"
          name="detail"
          placeholder="詳細を記入してください"
          rows={3}
          required
        />
      </FormItem>
      <div className="flex-auto">
        <ReportFormSubmitButton />
      </div>
    </form>
  )
}

export default ReportForm
