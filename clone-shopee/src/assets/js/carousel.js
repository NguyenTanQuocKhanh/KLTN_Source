
import styles from '~/components/Category/Category.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const carouselItems = document.querySelectorAll(`.${cx('carousel__item')}`);
// const carouselList = document.querySelector(`.${cx('carousel-list')}`);
console.log(carouselItems);
// carouselList.style.width = `${carouselItems.length * 10}%`
