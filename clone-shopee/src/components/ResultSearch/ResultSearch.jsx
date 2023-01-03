import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '../Button';


import ProductItem from '../Product/ProductItem';
import { useSelector } from 'react-redux';
import styles from './ResultSearch.module.scss';
const cx = classnames.bind(styles);
function ResultSearch({ data = [] }) {
    const { resultSearchProduct } = useSelector((state) => state.product);
    return (
        <>
            {/* <!-- Home filter --> */}
            <div className={cx('home-filter')}>
                <span className={cx('home-filter__label')}>Sắp xếp theo</span>
                {/* <button className={cx('btn btn--primary', 'home-filter__btn')}>Phổ biến</button> */}
                {/* <button className={cx('btn', 'home-filter__btn')}>Mới nhất</button> */}
                {/* <button className={cx('btn','home-filter__btn')}>Bán chạy</button> */}
                <Button normal className={cx('home-filter__btn', 'home-filter__btn--white')}>
                    Phổ biến
                </Button>
                <Button normal primary className={cx('home-filter__btn')}>
                    Mới nhất
                </Button>
                <Button normal className={cx('home-filter__btn', 'home-filter__btn--white')}>
                    Bán chạy
                </Button>

                {/* <!-- select price for sort --> */}
                <div className={cx('select-input')}>
                    <span className={cx('select-input__label')}> Giá</span>
                    <i className={cx('fa-solid fa-angle-down select-input__icon')}></i>

                    {/* <!-- List option --> */}
                    <ul className={cx('select-input__list')}>
                        <li className={cx('select-input__item')}>Giá: Thấp đến cao </li>
                        <li className={cx('select-input__item')}>Giá: Cao đến thấp</li>
                    </ul>
                </div>

                {/* <!-- paginate --> */}
                <div className={cx('home-filter__page')}>
                    <div className={cx('home-filter__page-num')}>
                        <span className={cx('home-filter__page-current')}>1</span>/14
                    </div>

                    {/* <!-- button change page --> */}
                    <div className={cx('home-filter__page-control')}>
                        <button className={cx('home-filter__page-btn', 'home-filter__page-btn--disable')}>
                            {/* <i className={cx('fa-solid fa-angle-left')}></i> */}
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button className={cx('home-filter__page-btn')}>
                            {/* <i className={cx('fa-solid fa-angle-right')}></i> */}
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Home Products --> */}
            <div className={cx('product-container-wrapper')}>
                {/* <!-- Grid -> row-> column--> */}
                <div className="grid__row">
                    {/* <!-- Product item --> */}
                    {resultSearchProduct.map((item) => (
                        <div key={item.id} className="grid__column-2-4">
                            <ProductItem item={item} />
                        </div>
                    ))}
                </div>
            </div>

            {/* <!-- Pagination --> */}
            {/* <ul className={cx('pagination', 'pagination-wrapper')}>
                <li className="pagination-item ">
                    <Link to="/" className="pagination-item__link">
                        <FontAwesomeIcon icon={faAngleLeft} className="pagination-item__icon" />
                    </Link>
                </li>
                <li className="pagination-item pagination-item--active">
                    <Link to="/" className="pagination-item__link">
                        1
                    </Link>
                </li>
                <li className="pagination-item">
                    <Link to="/" className="pagination-item__link">
                        2
                    </Link>
                </li>
                <li className="pagination-item">
                    <Link to="/" className="pagination-item__link">
                        3
                    </Link>
                </li>
                <li className="pagination-item">
                    <Link to="/" className="pagination-item__link">
                        4
                    </Link>
                </li>
                <li className="pagination-item">
                    <Link to="/" className="pagination-item__link">
                        5
                    </Link>
                </li>
                <li className="pagination-item">
                    <Link to="/" className="pagination-item__link">
                        <FontAwesomeIcon icon={faAngleRight} className="pagination-item__icon" />
                    </Link>
                </li>
            </ul> */}
        </>
    );
}

export default ResultSearch;
