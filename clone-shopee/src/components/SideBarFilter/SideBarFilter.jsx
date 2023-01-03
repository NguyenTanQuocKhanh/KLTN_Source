import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import RatingStar from '../RatingStar';
import * as productService from '~/services/productService'

import styles from './SideBarFilter.module.scss';
import { searching } from '~/slices/productSlice';

const cx = classnames.bind(styles);
function SideBarFilter() {
    let params = { page: 1, limit: 1000 };
    const url = new URL(window.location.href);

    const { categories } = useSelector((state) => state.category);
    const { brands } = useSelector((state) => state.brand);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [objSearch, setObjSearch] = useState({
        categories: 0,
        brand: 0,
        fromPrice: 0,
        toPrice: 0,
        rating: 0,
        keyword: new URLSearchParams(url.search).getAll('keyword')[0]
    })

    const goPageSearch = (stringQuey) => {
        navigate({
            pathname: '/search',
            search: stringQuey,
        });
    };

    const handleClickCate = (categories) => {
        setObjSearch(prev => ({ ...prev, categories: categories }));
    }

    const handleClickBrand = (brand) => {
        setObjSearch(prev => ({ ...prev, brand: brand }));
    }

    const handleChangeFromPrice = (e) => {
        setObjSearch(prev => ({ ...prev, fromPrice: +e.target.value }));
    }

    const handleChangeToPrice = (e) => {
        setObjSearch(prev => ({ ...prev, toPrice: +e.target.value }));
    }

    const handleClickStar = (rating) => {
        objSearch.rating = rating
        search()
        setObjSearch(prev => ({ ...prev, rating: rating }));
    }

    const handleApplySearch = () => {
        search()
    }

    const search = async () => {
        const resultSearch = await productService.searching(objSearch, params);
        if (resultSearch.status === 200) {
            dispatch(searching({ keyword: objSearch.keyword, resultSearchProduct: resultSearch.data.data }));
            const stringQuey = '?' + new URLSearchParams(objSearch).toString();
            goPageSearch(stringQuey)
        }
    };
    console.log(objSearch);

    return (
        <>
            <nav className={cx('category')}>
                <h3 className={cx('category__heading')}>
                    <i className={cx('category__heading-icon', 'fa-solid fa-list')}></i>
                    Danh mục
                </h3>
                {/* category */}
                <ul className={cx('category-list')}>
                    {categories &&
                        categories.map((item, index) => (
                            // 'category-item--active'
                            <li key={index} className={cx('category-item', objSearch.categories && objSearch.categories === item.id && 'category-item--active')} onClick={() => handleClickCate(item.id)}>
                                <div className={cx('category-item__link')}>
                                    {item.name}
                                </div>
                            </li>
                        ))}
                </ul>

                <h3 className={cx('category__heading')}>
                    <i className={cx('category__heading-icon', 'fa-solid fa-filter')}></i>
                    BỘ LỌC TÌM KIẾM
                </h3>
                {/* brand */}
                <div className={cx('brand-group')}>
                    <span className={cx('brand-header')}>Thương Hiệu</span>
                    <ul className={cx('brand-list')}>
                        {brands &&
                            brands.map((item, index) => (
                                <Fragment key={index}>
                                    <li className={cx('brand-item', objSearch.brand && objSearch.brand === item.id && 'brand-item--active')} onClick={() => handleClickBrand(item.id)}>

                                        {
                                            objSearch.brand && objSearch.brand === item.id ?
                                                (<div className={cx('brand-item__checkbox')}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>) : <div className={cx('brand-item__checkbox')}></div>
                                        }
                                        <div className={cx('brand-item__link')}>{item.name}</div>
                                    </li>
                                </Fragment>
                            ))}
                    </ul>
                </div>

                {/* /price range */}
                <div className={cx('brand-group')}>
                    <span className={cx('brand-header')}>Khoảng Giá</span>
                    <ul className={cx('brand-list')}>
                        <li className={cx('brand-item')}>
                            <input type="text" defaultValue={0} className={cx('brand-item__input')} onChange={handleChangeFromPrice} />
                            <span className={cx('brand-item__icon')}>-</span>
                            <input type="text" defaultValue={10} className={cx('brand-item__input')} onChange={handleChangeToPrice} />
                        </li>
                    </ul>
                </div>

                <Button primary normal className={cx('custom-button')} onClick={handleApplySearch}>
                    ÁP DỤNG
                </Button>

                <div className={cx('brand-group')}>
                    <span className={cx('brand-header')}>Đánh Giá</span>
                    <ul className={cx('brand-list')}>
                        <li className={cx('brand-item')} >
                            <div className={cx('brand-item__checkbox')} style={{ color: 'red', marginRight: '5px' }}>
                                {objSearch.rating && objSearch.rating === 5 ? <FontAwesomeIcon icon={faCheck} /> : null}
                            </div>
                            <RatingStar size={20} score={5} colorFill="yellow" onClick={() => handleClickStar(5)} />
                        </li>
                        <li className={cx('brand-item')}>
                            <div className={cx('brand-item__checkbox')} style={{ color: 'red', marginRight: '5px' }}>
                                {objSearch.rating && objSearch.rating === 4 ? <FontAwesomeIcon icon={faCheck} /> : null}
                            </div>
                            <RatingStar size={20} score={4} colorFill="yellow" onClick={() => handleClickStar(4)} />
                        </li>
                        <li className={cx('brand-item')}>
                            <div className={cx('brand-item__checkbox')} style={{ color: 'red', marginRight: '5px' }}>
                                {objSearch.rating && objSearch.rating === 3 ? <FontAwesomeIcon icon={faCheck} /> : null}
                            </div>
                            <RatingStar size={20} score={3} colorFill="yellow" onClick={() => handleClickStar(3)} />
                        </li>
                        <li className={cx('brand-item')}>
                            <div className={cx('brand-item__checkbox')} style={{ color: 'red', marginRight: '5px' }}>
                                {objSearch.rating && objSearch.rating === 2 ? <FontAwesomeIcon icon={faCheck} /> : null}
                            </div>
                            <RatingStar size={20} score={2} colorFill="yellow" onClick={() => handleClickStar(2)} />
                        </li>
                        <li className={cx('brand-item')}>
                            <div className={cx('brand-item__checkbox')} style={{ color: 'red', marginRight: '5px' }}>
                                {objSearch.rating && objSearch.rating === 1 ? <FontAwesomeIcon icon={faCheck} /> : null}
                            </div>
                            <RatingStar size={20} score={1} colorFill="yellow" onClick={() => handleClickStar(1)} />
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <Button primary normal className={cx('custom-button')}>
                XÓA TẤT CẢ
            </Button> */}
        </>
    );
}

export default SideBarFilter;
