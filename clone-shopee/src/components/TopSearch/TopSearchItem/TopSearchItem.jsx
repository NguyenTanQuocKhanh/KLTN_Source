//react component
import classnames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

//service
import * as productService from '~/services/productService';

//slice
import { searching } from '~/slices/productSlice';

//style
import styles from './TopSearchItem.module.scss';
const cx = classnames.bind(styles);

function TopSearchItem({ item }) {
    let params = { page: 1, limit: 1000 };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goPageSearch = (searchKey) => {
        navigate({
            pathname: '/search',
            search: `?keyword=${searchKey}`,
        });
    };

    const search = async (searchKey) => {
        if (searchKey) {
            // set localStorage
            let searchHistory = JSON.parse(localStorage.getItem('search-history')) || [];
            if (searchHistory.findIndex((a) => a === searchKey.trim()) < 0) {
                if (searchHistory.length >= 10) {
                    searchHistory = searchHistory.slice(1);
                }
                searchHistory.push(searchKey.trim());
            }
            localStorage.setItem('search-history', JSON.stringify(searchHistory));

            const resultSearch = await productService.searching({ keyword: searchKey }, params);
            if (resultSearch.status === 200) {
                dispatch(searching({ keyword: searchKey, resultSearchProduct: resultSearch.data.data }));
                goPageSearch(searchKey);
            }
        }
    };

    return (
        <li className={cx('carousel__item')}>
            <div className={cx('carousel__item-group')}>
                <Link to="" className={cx('carousel__item-grid')} onClick={() => search(item.name)}>
                    <div className={cx('carousel__item-grid__content')}>
                        <div className={cx('carousel__item-grid__top')}>
                            <span>Top</span>
                        </div>
                        <div className={cx('carousel__item-grid__img')}>
                            <img src={item.image.path} alt="images" />
                        </div>
                        {/* <div className={cx('carousel__item-grid__sale')}>Bán 7k+ /tháng</div> */}
                    </div>
                    <div className={cx('carousel__item-grid__title')}>{item.name}</div>
                </Link>
            </div>
        </li>
    );
}

export default TopSearchItem;
