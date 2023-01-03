import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './ProductItem.module.scss';
import { formatMoney } from '~/utils';

const cx = classnames.bind(styles);
function ProductItem({ item }) {
    console.log(item);
    return (
        <Link to={`/product/${item.id}`} className={cx('product-item')}>
            {/* <!-- Product image --> */}
            <div
                className={cx('product-item__img')}
                style={{
                    backgroundImage: `url(${item.image.path.replace('\\', '/')})`,
                }}
            ></div>

            <div className={cx('product-item-info')}>
                {/* <!-- Product name --> */}
                <h4 className={cx('product-item__name')}>{item.name}</h4>

                {/* <!-- Product price --> */}
                <div className={cx('product-item__price')}>
                    <span className={cx('product-item__price-old')}>{formatMoney(item.price)}</span>
                    <span className={cx('product-item__price-current')}>
                        {formatMoney((item.price * (100 - 20)) / 100)}
                    </span>
                </div>

                {/* <!-- Product action rating --> */}
                <div className={cx('product-item__action')}>
                    <span className={cx('product-item__like', 'product-item__liked')}>
                        {item.likedCount ? (
                            <FontAwesomeIcon icon={faHeart} className={cx('product-item__like-icon', 'active')} />
                        ) : (
                            <FontAwesomeIcon icon={faHeart} className={cx('product-item__like-icon')} />
                        )}
                    </span>

                    {/* <div className={cx('product-item__rating')}>
                        <FontAwesomeIcon icon={faStar} className={cx('active')} />
                        <FontAwesomeIcon icon={faStar} className={cx('active')} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div> */}

                    <span className={cx('product-item__sold')}>Đã bán {item.sold}</span>
                </div>

                {/* Mở  rộng thêm band<!-- Product origin --> */}
                {/* <div className={cx('product-item__origin')}>
                    <span className={cx('product-item__brand')}>Who</span>
                    <span className={cx('product-item__brand-name')}>Japan</span>
                </div> */}

                {/* <!-- Product favourite --> */}
                {!item.likedCount && (
                    <div className={cx('product-item__favorite')}>
                        <i className={cx('fas fa-check')}></i>
                        <span>Yêu thích</span>
                    </div>
                )}

                {/* <!-- Product sale off --> */}
                <div className={cx('product-item__sale-off')}>
                    <span className={cx('product-item__sale-off-percent')}>{item.discount}%</span>
                    <span className={cx('product-item__sale-off-label')}>GIẢM</span>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
