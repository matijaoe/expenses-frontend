import type { FormInstance } from './element.model'
import type { ExpenseCreate } from './expenses.model'

export interface GenericResponse {
  message: string
}
export interface GenericErrorResponse {
  error: string
  message?: string
}

export interface SubmitFormArgs {
  formRef: FormInstance | null
  form: ExpenseCreate
}
