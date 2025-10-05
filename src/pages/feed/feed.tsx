import { FC, useMemo, ReactNode, useEffect } from "react";
import feedStyles from './feed.module.css';
import StyledText from "components/app-main/styled-text/styled-text";
import { FeedSocketResponse } from "types/feed";
import Notice from "components/notice/notice";
import FeedSection from "components/app-main/feed-section/feed-section";
import feedSlice from "services/actions/feed-slice";
import { useAppDispatch, useAppSelector } from "services/hooks";
import { getFeed } from "utils/feed";

const feedUrl = 'wss://norma.nomoreparties.space/orders/all'

const Feed: FC = () => {
  const { error, orders, total, totalToday } = useAppSelector(store => store.feed);
  const { setError, resetState, parseFeedMessage } = feedSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = getFeed(dispatch, feedUrl);

    return () => {
      socket.close();
      dispatch(resetState());
    }
  }, [dispatch, setError, resetState, parseFeedMessage]);

  const feedSection = useMemo<ReactNode | undefined>(() => {
    if(orders) {
      return <FeedSection orders={orders}/>
    }
  }, [orders]);



  const summarySection = useMemo<ReactNode | undefined>(() => {
    if(orders) {
      const ready = orders.filter(order => order.status !== 'pending').map(order => order.number);
      const pending = orders.filter(order => order.status === 'pending').map(order => order.number);
  
      return (
        <section className={feedStyles['summary-wrapper']}>
          <span className={feedStyles['summary-orders']}>
            <section className={feedStyles['summary-orders-section']}>
              <StyledText type='main' size='medium'>Готовы:</StyledText>
              <span className={feedStyles['summary-ids']}>
                {
                  ready.map(idx => 
                    <StyledText type='digits' size='small' extraClass={[feedStyles['ready']]} key={idx}>{idx}</StyledText>
                  )
                }
              </span>
            </section>
            <section className={feedStyles['summary-orders-section']}>
              <StyledText type='main' size='medium' extraClass={[feedStyles['no-wrap']]}>В работе:</StyledText>
              <span className={feedStyles['summary-ids']}>
                {
                  pending.map(idx => 
                    <StyledText type='digits' size='small' key={idx}>{idx}</StyledText>
                  )
                }
              </span>
            </section>
          </span>
          <span className={feedStyles['summary-flex']}>
            <StyledText type="main" size='medium'>Выполнено за всё время:</StyledText>
            <StyledText type="digits" size="large">{total}</StyledText>
          </span>
          <span className={feedStyles['summary-flex']}>
          <StyledText type="main" size='medium'>Выполнено за сегодня:</StyledText>
          <StyledText type="digits" size="large">{totalToday}</StyledText>
          </span>
        </section>
      )
    }
  }, [orders, total, totalToday]);
  
  if(!orders) {
    return <Notice type='loading' />
  }

  if(error) {
    return <Notice type='error' />
  }

  return (
    <div className={feedStyles.wrapper} >
      {feedSection}
      {summarySection}
    </div>
  )
};

export default Feed;