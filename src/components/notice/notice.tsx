import { Oval } from 'react-loader-spinner';
import noticeStyles from './notice.module.css';
import { FC } from 'react';

const Notice: FC<{type: string}> = ({type}) => {
  const notice = (type === 'loading'
  ? <span className={`text text_type_main-large ${noticeStyles.wrapper}`} >
      <Oval color='silver' secondaryColor='grey' height={50} width={50} />
      <span>Загрузка...</span>
    </span>
  : <span className={`text text_type_main-default ${noticeStyles.wrapper}`} >
      Ошибка при попытке загрузки. Попытайтесь обновить страницу или обратитесь в нашу поддержу.
      Приносим свои извинения.
  </span>)

  return (
    notice
  );
}


export default Notice;

