import FeedSection from "components/app-main/feed-section/feed-section";
import Notice from "components/notice/notice";
import { FC, ReactNode, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import feedSlice from "services/actions/feed-slice";
import { socketCloseAction, socketConnectAction } from "services/actions/socket";
import { SocketConnectPayload } from "services/actions/types/socket";
import { renewToken } from "services/auth";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { getCookie, setCookie } from "services/utils";

const feedUrl = 'wss://norma.nomoreparties.space/orders'

const Orders: FC = () => {
  const dispatch = useAppDispatch();
  const {orders, error} = useAppSelector(store => store.feed);
  const { setError, resetState, parseFeedMessage } = feedSlice.actions;
  const navigate = useNavigate();

  useEffect(() => {
    const action = async () => {
      
      const connectPayload: SocketConnectPayload = {
        url: feedUrl,
        messageAction: msg => {
          const { orders, total, totalToday } = msg;
          dispatch(parseFeedMessage({ orders, total, totalToday }));
        },
        errorAction: () => dispatch(setError(true)),
      };
  
      if(!!getCookie('refreshToken')) {
        if (!getCookie('token')) {
            const newToken = await renewToken(getCookie('refreshToken')!);
            
            if(newToken.success) {
              
              setCookie('token', newToken.accessToken, { expires: 20 * 60 });
              setCookie('refreshToken', newToken.refreshToken, { expires: 24 * 60 * 60 });
              
              connectPayload['token'] = getCookie('token')?.replace('Bearer ', '')
            } else {
              navigate('/login');
            }
            
        } else {
          connectPayload['token'] = getCookie('token')?.replace('Bearer ', '')
        }

        dispatch(socketConnectAction(connectPayload));
        
      } else {
        navigate('/login')
      }
    }

    action();
    
    return () => {
      dispatch(socketCloseAction());
      dispatch(resetState());
    }
  }, [dispatch, resetState, parseFeedMessage, setError]);

  const feedSection = useMemo<ReactNode | undefined>(() => {
    if(orders) {
      return <FeedSection orders={orders} omitTitle/>
    }
  }, [orders]);
  
  if(error) {
    return <Notice type='error' />
  }

  if(!orders) {
    return <Notice type='loading' />
  }

  return (
    <>{feedSection}</>
  );
};

export default Orders;

