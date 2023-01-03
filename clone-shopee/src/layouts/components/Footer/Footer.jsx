import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import images from '~/assets/images';
import styles from './Footer.module.scss';
import { QRCode } from '../QR';

const cx = classnames.bind(styles);

function Footer(props) {
    return (
        <footer className={cx('footer')}>
            <div className={cx('grid')}>
                <div className={cx('grid__row')}>
                    <div className={cx('grid__column-2-4')}>
                        <h3 className={cx('footer__heading')}>CHĂM SÓC KHÁCH HÀNG</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Trung Tâm Trợ Giúp
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Shope Blog
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    {' '}
                                    Shope Mall
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    {' '}
                                    Hướng Dẫn Mua Hàng
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    {' '}
                                    Hướng Dẫn Bán Hàng
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    {' '}
                                    Thanh Toán
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Shope Xu
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__column-2-4')}>
                        <h3 className={cx('footer__heading')}>VỀ SHOPPE</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Giới Thiệu Về Shope Việt Nam
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Điều Khoản Shope
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Chương Trình Tiếp Thị Liên Kết Shope
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__column-2-4')}>
                        <h3 className={cx('footer__heading')}>ANH TOÁN</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Giới Thiệu Về Shope Việt Nam
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Điều Khoản Shope
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    Chương Trình Tiếp Thị Liên Kết Shope
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__column-2-4')}>
                        <h3 className={cx('footer__heading')}>THEO DÕI CHÚNG TÔI TRÊN</h3>
                        <ul className={cx('footer-list')}>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    <FontAwesomeIcon icon={faFacebook} className={cx('footer-item__icon')} />
                                    Facebook
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    <FontAwesomeIcon icon={faInstagram} className={cx('footer-item__icon')} />
                                    Instagram
                                </a>
                            </li>
                            <li className={cx('footer-item')}>
                                <a href="/" className={cx('footer-item__link')}>
                                    <FontAwesomeIcon icon={faLinkedin} className={cx('footer-item__icon')} />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('grid__column-2-4')}>
                        <h3 className={cx('footer__heading')}>TẢI ỨNG DỤNG SHOPE NGAY THÔI</h3>
                        <a href="/" className={cx('footer__download')}>
                            <QRCode size={86} className={cx('footer__download-qr')} />
                            <div className={cx('footer__download-apps')}>
                                <img
                                    src={images.ggPlay}
                                    alt="Google play"
                                    className={cx('footer__download-apps-img')}
                                />
                                <img
                                    src={images.appStore}
                                    alt="App store"
                                    className={cx('footer__download-apps-img')}
                                />
                            </div>
                        </a>
                    </div>
                </div>
                <div className={cx('grid__row')}>
                    <div className={cx('footer-bottom')}>
                        <p className={cx('footer-copyright')}>© 2022 Shope. Tất cả các quyền được bảo lưu.</p>
                        <div className={cx('footer-cultures')}>
                            <p className={cx('footer-cultures__title')}>Quốc gia & Khu vực: </p>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Singapore</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Indonesia</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Japan</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Korea</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Singapore</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Indonesia</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Japan</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Korea</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Singapore</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Indonesia</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Japan</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Korea</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Japan</a>
                            </div>
                            <div className={cx('footer-cultures__name')}>
                                <a href="/">Korea</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
