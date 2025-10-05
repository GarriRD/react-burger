import { FC } from "react";
import StyledText from "../styled-text/styled-text";
import feedStyles from './feed-section.module.css';
import OrderCard from "./order-card/order-card";
import { OrderData } from "types";
import { Outlet } from "react-router";

const FeedSection: FC<{ orders: OrderData[], omitTitle?: boolean }> = ({ orders, omitTitle }) => {
  return (
    <section className={feedStyles['feed-wrapper']}>
      <Outlet />
      {!omitTitle && <StyledText type='main' size='medium'>Лента заказов</StyledText>}
      <div className={feedStyles['feed-container']} >
        <section className={feedStyles.feed}>
          { orders.map((item, idx) => <OrderCard key={idx} order={item} />) }
        </section>
      </div>
    </section>
  );
};

export default FeedSection;
  
