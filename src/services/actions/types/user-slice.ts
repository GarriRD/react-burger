import { UserForm } from "types"

export type ThunkUserForm = {
  userForm: UserForm;
  abortSignal: AbortSignal;
}