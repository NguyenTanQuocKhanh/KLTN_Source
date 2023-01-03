import classNames from 'classnames/bind';

import HeaderTop from '~/layouts/components/Header/HeaderTop';
import HeaderSearch from '~/layouts/components/Header/HeaderSearch';
import Footer from '~/layouts/components/Footer';

import styles from './CartLayout.module.scss';

const cx = classNames.bind(styles);

function CartLayout({ children }) {
    return (
        <>
            <header className={cx('header')}>
                <div className={cx('grid')}>
                    <HeaderTop />
                </div>
                <div className={cx('header-search-container')}>
                    <div className={cx('grid')}>
                        <HeaderSearch />
                    </div>
                </div>
            </header>
            <div className={cx('app__container')}>
                <div className={cx('grid')}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default CartLayout;
