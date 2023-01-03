import classNames from 'classnames/bind';

import HeaderTop from '~/layouts/components/Header/HeaderTop';
import HeaderSearchCart from '~/layouts/components/Header/HeaderSearchCart';
import Footer from '~/layouts/components/Footer';
import SideBarUser from '~/layouts/components/SideBarUser';

import styles from './UserLayout.module.scss';

const cx = classNames.bind(styles);
function UserLayout({ children }) {
    return (
        <>
            <header className={cx('header')}>
                <div className="grid">
                    <HeaderTop />
                    <HeaderSearchCart />
                </div>
            </header>
            <div className="app__container">
                <div className="grid">
                    <div className={cx('grid__row', 'app__content')}>
                        <div className="grid__column-2">
                            <SideBarUser />
                        </div>
                        <div className="grid__column-10">{children}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserLayout;
