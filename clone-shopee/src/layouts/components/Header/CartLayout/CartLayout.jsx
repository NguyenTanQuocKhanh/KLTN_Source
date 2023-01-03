//react component
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

//custom component
import Button from '~/components/Button';
import images from '~/assets/images';

//style
import styles from './CartLayout.module.scss';

const cx = classnames.bind(styles);

function CartLayout() {
    //{ logged, countItemOrder, type = 'cart' }
    const { isLogged } = useSelector((state) => state.auth);
    const { carts } = useSelector((state) => state.cart);
    return (
        <div>
            {/*  Cart layout */}
            <div className={cx('header__cart')}>
                <div className={cx('header__cart-wrap')}>
                    {/* Cart logo */}
                    <Link to="/cart" className={cx('')}>
                        <FontAwesomeIcon icon={faCartShopping} className={cx('header__cart-icon')} />
                        <span className={cx('header__cart-notice')}>{carts.length}</span>
                    </Link>

                    {isLogged && carts.length > 0 ? (
                        <>
                            <div className={cx('header__cart-list')}>
                                {/*  Cart body has item */}
                                <h4 className={cx('header__cart-heading')}>Sản phẩm đã thêm</h4>
                                <ul className={cx('header__cart-list-item')}>
                                    {carts.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={`/product/${item.product.id}`}
                                            className={cx('header__cart-list-item_Link')}
                                        >
                                            <li className={cx('header__cart-item')}>
                                                <img
                                                    src={item.product.imagePath.replace('\\', '/')}
                                                    alt=""
                                                    className={cx('header__cart-img')}
                                                />
                                                <div className={cx('header__cart-item-info')}>
                                                    <div className={cx('header__cart-item-head')}>
                                                        <h5 className={cx('header__cart-item-name')}>
                                                            {item.product.name}
                                                        </h5>
                                                        <div className={cx('header__cart-item-price-wrap')}>
                                                            <span className={cx('header__cart-item-price')}>
                                                                {item.product.price}
                                                            </span>
                                                            {item.product.quantity && (
                                                                <>
                                                                    <span className={cx('header__cart-item-multiply')}>
                                                                        x
                                                                    </span>
                                                                    <span className={cx('header__cart-item-qnt')}>
                                                                        {item.product.quantity}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* <div className={cx('header__cart-item-body')}>
                                                        <span className={cx('header__cart-item-description')}>
                                                            Phân loại: kem xử lý Phân loại: kem xử lý Phân loại: kem xử
                                                            lý Phân loại: kem xử lý
                                                        </span>
                                                        <span className={cx('header__cart-item-remove')}>Xóa</span>
                                                    </div> */}
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                                <Button primary to="/cart" className={cx('header__cart-view-cart')}>
                                    Xem giỏ hàng
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/*  No Cart: header__cart-list--no-cart */}
                            <div className={cx('header__cart-list', 'header__cart-list--no-cart')}>
                                <img src={images.noCart} alt="" className={cx('header__cart-no-cart-img')} />
                                <span className={cx('header__cart-list-msg')}>Chưa có sản phẩm</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartLayout;
