import classnames from 'classnames/bind';

import styles from './CategoryHeader.module.scss';

const cx = classnames.bind(styles);
function CategoryHeader() {
    return (
        <div className={cx('category-header')}>
            <div className={cx('category-header__title')}>danh mục</div>
        </div>
    );
}

export default CategoryHeader;
