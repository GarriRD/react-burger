import errorNoticeStyles from './error-notice.module.css';

const ErrorNotice = () => {
  return (
    <span className={`text text_type_main-default ${errorNoticeStyles.wrapper}`} >
      Ошибка при попытке загрузки заказа. Попытайтесь обновить страницу или обратитесь в нашу поддержу.
      Приносим свои извинения.
    </span>
  );
}

export default ErrorNotice;

