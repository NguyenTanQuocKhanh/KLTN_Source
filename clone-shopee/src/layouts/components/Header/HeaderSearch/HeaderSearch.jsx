import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { LogoIcon } from '~/components/Icons';
import styles from './HeaderSearch.module.scss';
import SearchBox from '../../SearchBox/SearchBox';

const cx = classNames.bind(styles);

function HeaderSearch(props) {
    const getTitle = window.location.pathname.includes('cart') ? 'Giỏ Hàng' : 'Thanh Toán'
    return (
        <>
            {/*  Header with search */}
            <div className={cx('header-with-search')}>
                {/*  Logo */}
                <Link to="/" className={cx('header__logo-link', 'header-search-group')}>
                    <div className={cx('header__logo')}>
                        <LogoIcon className={cx('header__logo-img')} color="#f45d2d" />
                    </div>
                    <div className={cx('header__logo-name')}>{getTitle}</div>
                </Link>
                <SearchBox />
            </div>
        </>
    );
}

export default HeaderSearch;
