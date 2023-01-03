import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CategoryItem.module.scss';

const cx = classnames.bind(styles);

function CategoryItem({ item }) {
    return (
        <li className={cx('carousel__item')}>
            <div className={cx('carousel__item-group')}>
                <Link to="/category_detail" className={cx('carousel__item-grid')}>
                    <img src={item.imageURL} alt="images" className={cx('carousel__item-grid__img')}></img>
                    <div className={cx('carousel__item-grid__title')}>{item.name}</div>
                </Link>
                <Link to="/" className={cx('carousel__item-grid')}>
                    <img src={item.imageURL} alt="images" className={cx('carousel__item-grid__img')}></img>
                    <div className={cx('carousel__item-grid__title')}>{item.name}</div>
                </Link>
            </div>
        </li>
    );
}

export default CategoryItem;
