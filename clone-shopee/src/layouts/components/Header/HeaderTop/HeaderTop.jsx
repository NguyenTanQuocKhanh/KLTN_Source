import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faBell, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

import styles from './HeaderTop.module.scss';
import images from '~/assets/images';
import { QRCode } from '~/layouts/components/QR';
import config from '~/config';
import { CHECKBOX_FORM_LOGIN_ID, CHECKBOX_FORM_REGISTER_ID } from '~/commons';

//slice
import { logout } from '~/slices/authSlice';
import { removeAll } from '~/slices/cartSlice';

const cx = classNames.bind(styles);
function HeaderTop() {
    const { isLogged, userLogin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleClickLogout = () => {
        Promise.all([dispatch(logout()), dispatch(removeAll())]);
    };

    return (
        <nav className={cx('header__navbar')}>
            <ul className={cx('header__navbar-list')}>
                <li
                    className={cx(
                        'header__navbar-item',
                        'header__navbar-item--has-qr',
                        'header__navbar-item--separate',
                    )}
                >
                    Vào cửa hàng ứng dụng TickID
                    {/* <!-- Header QR code --> */}
                    <div className={cx('header__qr')}>
                        <QRCode size={170} className={cx('header__pr-img')} />

                        <div className={cx('header__qr-apps')}>
                            <a href="/" className={cx('header__pr-link')}>
                                <img src={images.ggPlay} alt="google_play" className={cx('header__pr-download-img')} />
                            </a>
                            <a href="/" className={cx('header__pr-link')}>
                                <img src={images.appStore} alt="app_store" className={cx('header__pr-download-img')} />
                            </a>
                        </div>
                    </div>
                </li>
                <li className={cx('header__navbar-item')}>
                    <span className={cx('header__navbar-item-title--no-pointer')}>Kết nối</span>
                    <a href="/" className={cx('header__navbar-icon-link')}>
                        <FontAwesomeIcon icon={faFacebook} className={cx('header__navbar-icon')} />
                    </a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                    <a
                        href="/"
                        className={cx(
                            'header__navbar-icon-link',
                            'header__navbar-background',
                            'header__navbar-instagram-png',
                            'header__navbar-icon',
                        )}
                    ></a>
                </li>
            </ul>

            <ul className={cx('header__navbar-list')}>
                {/* Notify */}
                <li className={cx('header__navbar-item', 'header__navbar-item--has-notify')}>
                    <a href="/" className={cx('header__navbar-icon-link')}>
                        <FontAwesomeIcon icon={faBell} className={cx('header__navbar-icon')} />
                        <span className={cx('header__navbar-notify-notice')}>{10}</span>
                        Thông báo
                    </a>

                    {/* <!-- Notify --> */}
                    <div className={cx('header__notify')}>
                        {/* <!-- Header notify --> */}
                        <header className={cx('header__notify-header')}>
                            <h3>Thông Báo Mới Nhận</h3>
                        </header>

                        {/* <!-- Body notify --> */}
                        <ul className={cx('header__notify-list')}>
                            <li className={cx('header__notify-item', 'header__notify-item--viewed')}>
                                <a href="/" className={cx('header__notify-link')}>
                                    <img
                                        src="https://cf.shopee.vn/file/d88995a07d5ebba7eccb8715c89e2a64_tn"
                                        alt=""
                                        className={cx('header__notify-img')}
                                    />
                                    <div className={cx('header__notify-info')}>
                                        <span className={cx('header__notify-name')}>MỸ PHẨM CHÍNH HÃNG</span>
                                        <span className={cx('header__notify-description')}>
                                            Mo Ta Cua My Pham Chinh Hang China
                                        </span>
                                    </div>
                                </a>
                            </li>
                            <li className={cx('header__notify-item')}>
                                <a href="/" className={cx('header__notify-link')}>
                                    <img
                                        src="https://cf.shopee.vn/file/d88995a07d5ebba7eccb8715c89e2a64_tn"
                                        alt=""
                                        className={cx('header__notify-img')}
                                    />
                                    <div className={cx('header__notify-info')}>
                                        <span className={cx('header__notify-name')}>
                                            MỸ PHẨM CHÍNH HÃNG MỸ PHẨM CHÍNH HÃNG MỸ PHẨM CHÍNH HÃNG
                                        </span>
                                        <span className={cx('header__notify-description')}>
                                            Mo Ta Cua Myo Ta Cua My Pham Chinh Hang Chinao Ta Cua My Pham Chinh Hang
                                            China Pham Chinh Hangam Chinh Hang China Pham Chinh am Chinh Hang China Pham
                                            Chinh China
                                        </span>
                                    </div>
                                </a>
                            </li>
                        </ul>

                        {/* <!-- Footer --> */}
                        <footer className={cx('header__notify-footer')}>
                            <a href="/" className={cx('header__notify-footer-btn')}>
                                Xem Tất Cả
                            </a>
                        </footer>
                    </div>
                </li>

                {/* Help */}
                <li className={cx('header__navbar-item')}>
                    <a href="/" className={cx('header__navbar-icon-link')}>
                        <FontAwesomeIcon icon={faCircleQuestion} className={cx('header__navbar-icon')} />
                        Trợ giúp
                    </a>
                </li>

                {/* not login */}
                {!isLogged && (
                    <>
                        <label
                            htmlFor={CHECKBOX_FORM_REGISTER_ID}
                            className={cx(
                                'header__navbar-item',
                                'header__navbar-item--strong',
                                'header__navbar-item--separate',
                            )}
                        >
                            Đăng ký
                        </label>
                        <label
                            htmlFor={CHECKBOX_FORM_LOGIN_ID}
                            className={cx('header__navbar-item', 'header__navbar-item--strong')}
                        >
                            Đăng nhập
                        </label>
                    </>
                )}

                {/* logged in */}
                {isLogged && (
                    <>
                        <li className={cx('header__navbar-item', 'header__navbar-user')}>
                            <Link to={config.routes.user.purchase} className={cx('header__navbar-user_link')}>
                                <img
                                    src={userLogin.photo && userLogin.photo.path}
                                    alt="Avatar"
                                    className={cx('header__navbar-user-avatar')}
                                />
                                <span className={cx('header__navbar-user-name')}>
                                    {userLogin.username}
                                </span>
                            </Link>

                            <ul className={cx('header__navbar-user-menu')}>
                                <li className={cx('header__navbar-user-item')}>
                                    <Link
                                        to={config.routes.user.profile}
                                        className={cx('header__navbar-user-item__text')}
                                    >
                                        Tài khoản của tôi
                                    </Link>
                                </li>
                                <li className={cx('header__navbar-user-item')}>
                                    <Link
                                        to={config.routes.user.purchase}
                                        className={cx('header__navbar-user-item__text')}
                                    >
                                        Đơn mua
                                    </Link>
                                </li>
                                <li className={cx('header__navbar-user-item', 'header__navbar-user-item--separate')}>
                                    <button
                                        onClick={handleClickLogout}
                                        className={cx('header__navbar-user-item__text')}
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default HeaderTop;
