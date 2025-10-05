import FeedSection from "components/app-main/feed-section/feed-section";
import Notice from "components/notice/notice";
import { FC, ReactNode, useEffect, useMemo } from "react";
import feedSlice from "services/actions/feed-slice";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { getCookie } from "services/utils";
import { getFeed } from "utils/feed";

const feedUrl = 'wss://norma.nomoreparties.space/orders'

const Orders: FC = () => {
  const dispatch = useAppDispatch();
  const resetState = feedSlice.actions.resetState;
  const orders = useAppSelector(store => store.feed.orders);

  useEffect(() => {
    const socket = getFeed(dispatch, feedUrl, getCookie('token')!.replace('Bearer ', ''));
    console.log('soecket', socket.readyState, socket);
    return () => {
      socket.close();
      dispatch(resetState());
    }
  }, [dispatch, resetState]);

  const feedSection = useMemo<ReactNode | undefined>(() => {
    if(orders) {
      return <FeedSection orders={orders} omitTitle/>
    }
  }, [orders]);

  if(!orders) {
    return <Notice type='loading' />
  }

  return (
    <>{feedSection}</>
  );
};

export default Orders;

