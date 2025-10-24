
import { ServiceResponseSuccess } from "types";

export type SocketConnectPayload = {
  url: string;
  token?: string;
  openAction?: () => void;
  messageAction?: (msg: ServiceResponseSuccess<Record<string, any>>) => void;
  pingAction?: () => void;
  errorAction?: () => void;
  closeAction?: () => void;
}