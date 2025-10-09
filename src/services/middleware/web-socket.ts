import { isAction, Middleware } from "redux";
import { socketCloseAction, socketConnectAction, socketSendAction } from "services/actions/socket";
import { ServiceResponse } from "types";

let socket: WebSocket | undefined;

export const webSocketMiddleware: Middleware = () => next => action => {
  if(isAction(action)) {

    if(socketConnectAction.match(action)) {

      if(socket && (socket.readyState == 1 || socket.readyState == 2)) {
        socket.close();
      } 
      const payload = action.payload;
      socket = new WebSocket(payload.url + (payload.token ? `?token=${payload.token}` : ''));
  

      if(socket) {
        if(payload.openAction){
          socket.onopen = payload.openAction;
        }

        socket.onmessage = (msg: MessageEvent) => {
          if(typeof msg.data === 'string') {
            if(msg.data === 'ping') {
              const pingAction = payload.pingAction || (() => socket!.send('pong'));
              pingAction();
            }
            const message = JSON.parse(msg.data) as Awaited<ServiceResponse>;
            console.log('message', message);
            Object.entries(message).forEach(([k, v]) => console.log('key, value', k, v));
            

            if(!message.success && payload.errorAction) {

              payload.errorAction();
            } else if(message.success && payload.messageAction) {
              console.log('there is orders, there is orders[0], order[0] has fields', message?.orders, message?.orders?.[0]);
              if(message?.orders?.[0]) {
                Object.entries(message.orders[0]).forEach(([k, v]) => console.log('order entry', k, v));
              }
              payload.messageAction(message);
            }
          }
        }

        if(payload.errorAction) {
          socket.onerror = payload.errorAction;
        }

        if(payload.closeAction) {
          socket.onclose = payload.closeAction;
        }
      }
      
    } else if(socketSendAction.match(action)) {
      if(socket) {
        socket.send(action.payload);
      }
    } else if(socketCloseAction.match(action)) {
      if(socket) {
        socket.close();
      }
    } else {
      next(action);
    }

  }
  
}