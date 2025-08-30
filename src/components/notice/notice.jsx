import noticeStyles from './notice.module.css';

const Notice = ({type}) => {
  const notice = (type === 'loading'
  ? <span className={`text text_type_main-large ${noticeStyles.wrapper}`} >Загрузка...</span>
  : <span className={`text text_type_main-default ${noticeStyles.wrapper}`} >
      Ошибка при попытке загрузки заказа. Попытайтесь обновить страницу или обратитесь в нашу поддержу.
      Приносим свои извинения.
  </span>)

  return (
    notice
  );
}

export default Notice;

