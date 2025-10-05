import feedSlice from "services/actions/feed-slice";
import { useAppDispatch } from "services/hooks";
import { FeedSocketResponse } from "types/feed";

export const getFeed = (dispatch: ReturnType<typeof useAppDispatch>, url: string ,token?: string): WebSocket => {
  const socket = new WebSocket(url + (token ? `?token=${token}` : ''));
  const {parseFeedMessage, setError, resetState} = feedSlice.actions;

  socket.onmessage = (msg: MessageEvent) => {
    if(typeof msg.data === 'string') {
      if(msg.data === 'ping') {
        socket.send('pong');
      } else {
        const { orders, total, totalToday, sucess } = JSON.parse(msg.data) as FeedSocketResponse;
        
        if(!sucess) {
          dispatch(parseFeedMessage({ orders, total, totalToday }));
        } else {
          throw new Error('Failed to retireve data from server');
        }
      }
    }
  }
  socket.onerror = () => dispatch(setError(true));
  socket.onclose = () => dispatch(resetState());

  return socket;
}