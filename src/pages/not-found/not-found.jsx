import dunno from 'images/dunno.png';
import notFoundStyles from './not-found.module.css';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <section className={notFoundStyles.wrapper}>
      <img src={dunno} alt='not found img' className={notFoundStyles.dunno}/>
      <span className='text text_type_digits-large'>404</span>
      <span className='text text_type_main-medium'>Данной страницы не существует</span>
      <Link to='/'>Вернуться на главную</Link>
    </section>
  )
};

export default NotFound;