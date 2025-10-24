export const parseDate = (dt: string): string => {
  const datetime = new Date(dt);
  const date = new Date(dt);
  
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  
  const currentDatetime = new Date();
  const currentDate = new Date(currentDatetime.getFullYear(), currentDatetime.getMonth(), currentDatetime.getDate());

  const daysDiff = Math.floor((currentDate.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));

  
  const dyasDiffStr = daysDiff < 1 ? 'Сегодня' : daysDiff < 2 ? 'Вчера' : `${daysDiff}`;
  let suffix = daysDiff < 2 ? '' : daysDiff < 5 ? ' дня' : ' дней';

  const timeZone = -1 * datetime.getTimezoneOffset() / 60;
  return (
    dyasDiffStr 
    + suffix
    + ', ' 
    + ` ${datetime.getHours()}:${datetime.getMinutes()} i-GMT${timeZone < 0 ? timeZone : '+' 
    + timeZone}`
  );
};


export const parseStatus = (status: string): string => {
  return status === 'done' ? 'Выполнен' : status === 'canceled' ? 'Отменён' : 'Готовится';
};