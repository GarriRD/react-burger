import { createAction } from "@reduxjs/toolkit";
import { SocketConnectPayload } from "./types/socket";

export const socketConnectAction = createAction<SocketConnectPayload>('socket/connect');
export const socketSendAction = createAction<string>('socket/send');
export const socketCloseAction = createAction('socket/close');