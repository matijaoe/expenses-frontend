export interface GenericResponse { message: string }
export interface GenericErrorResponse { error: string }

export type Result<T> = Promise<T | GenericErrorResponse>
