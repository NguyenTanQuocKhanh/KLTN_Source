import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './TopSearchHeader.module.scss';

const cx = classnames.bind(styles);
function TopSearchHeader() {
    return (
        <div className={cx('top-search-header')}>
            <div className={cx('top-search-header__title')}>tìm kiếm hàng đầu</div>
            {/* <Link to="/" className={cx('top-search-header__link')}>
                Xem Tất Cả
                <FontAwesomeIcon icon={faAngleRight} className={cx('top-search-header__link-icon')} />
            </Link> */}
        </div>
    );
}

export default TopSearchHeader;
