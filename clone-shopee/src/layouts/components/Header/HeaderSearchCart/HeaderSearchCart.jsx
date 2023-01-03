//react component
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

//custom component
import SearchBox from '../../SearchBox/SearchBox';
import { LogoIcon } from '~/components/Icons';
import CartLayout from '~/layouts/components/Header/CartLayout';

//style
import styles from './HeaderSearchCart.module.scss';

const cx = classNames.bind(styles);

function HeaderSearchCart() {
    return (
        <>
            {/*  Header with search */}
            <div className={cx('header-with-search')}>
                {/*  Logo */}
                <div className={cx('header__logo')}>
                    <Link to="/" className={cx('header__logo-link')}>
                        <LogoIcon className="header__logo-img" />
                    </Link>
                </div>

                {/* //  Group input search */}
                <SearchBox />

                {/*  Cart layout */}
                <CartLayout />
            </div>
        </>
    );
}

export default HeaderSearchCart;
