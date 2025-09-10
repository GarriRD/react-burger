import noticeStyles from './notice.module.css';
import PropTypes from 'prop-types';

const Notice = ({type}) => {
  const notice = (type === 'loading'
  ? <span className={`text text_type_main-large ${noticeStyles.wrapper}`} >Загрузка...</span>
  : <span className={`text text_type_main-default ${noticeStyles.wrapper}`} >
      Ошибка при попытке загрузки. Попытайтесь обновить страницу или обратитесь в нашу поддержу.
      Приносим свои извинения.
  </span>)

  return (
    notice
  );
}

Notice.propTypes = {
  type: PropTypes.string.isRequired,
}


export default Notice;

