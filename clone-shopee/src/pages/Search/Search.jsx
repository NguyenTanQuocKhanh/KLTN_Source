//react component
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

//custom component
import SideBarFilter from '~/components/SideBarFilter';
import ResultSearch from '~/components/ResultSearch';

//service
import * as productService from '~/services/productService';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

//slice
import { searching } from '~/slices/productSlice';


function Search() {
    // let params = { page: 1, limit: 1000 };
    const dispatch = useDispatch()
    const url = new URL(window.location.href);
    const keyword = new URLSearchParams(url.search).getAll('keyword');
    // const [products, setProducts] = useState([]);
    const [params, setParams] = useState({ page: 1, limit: 20 })

    const activeClass = (page) => {
        if (params.page === page) {
            return 'pagination-item--active'
        }
        return ''
    }

    useEffect(() => {
        const productSearching = async () => {
            const resultSearch = await productService.searching({ keyword: keyword[0] }, params);
            if (resultSearch.status === 200) {

                dispatch(searching({ keyword: keyword, resultSearchProduct: resultSearch.data.data }));
            } else {
                dispatch(searching({ keyword: keyword, resultSearchProduct: [] }));
            }
        };
        productSearching();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);
    console.log(params);

    return (
        <div className="app__container">
            <div className="grid">
                {/* app__content global */}
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <SideBarFilter />
                    </div>
                    <div className="grid__column-10">
                        <ResultSearch />
                        {/* <!-- Pagination --> */}
                        <ul className={'pagination'} style={{ margin: '40px 0 40px 0' }}>
                            <li className={`pagination-item`} onClick={() => setParams(prev => ({ ...prev, page: prev.page - 1 }))}>
                                <div to="/" className="pagination-item__link">
                                    <FontAwesomeIcon icon={faAngleLeft} className="pagination-item__icon" />
                                </div>
                            </li>
                            <li className={`pagination-item ${activeClass(1)}`} onClick={() => setParams(prev => ({ ...prev, page: 1 }))}>
                                <div to="/" className="pagination-item__link">
                                    1
                                </div>
                            </li>
                            <li className={`pagination-item ${activeClass(2)}`} onClick={() => setParams(prev => ({ ...prev, page: 2 }))}>
                                <div to="/" className="pagination-item__link">
                                    2
                                </div>
                            </li>
                            <li className={`pagination-item ${activeClass(3)}`} onClick={() => setParams(prev => ({ ...prev, page: 3 }))}>
                                <div to="/" className="pagination-item__link">
                                    3
                                </div>
                            </li>
                            <li className={`pagination-item ${activeClass(4)}`} onClick={() => setParams(prev => ({ ...prev, page: 4 }))}>
                                <div to="/" className="pagination-item__link">
                                    4
                                </div>
                            </li>
                            <li className={`pagination-item ${activeClass(5)}`} onClick={() => setParams(prev => ({ ...prev, page: 5 }))}>
                                <div to="/" className="pagination-item__link">
                                    5
                                </div>
                            </li>
                            <li className={`pagination-item`} onClick={() => setParams(prev => ({ ...prev, page: prev.page + 1 }))}>
                                <div to="/" className="pagination-item__link">
                                    <FontAwesomeIcon icon={faAngleRight} className="pagination-item__icon" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
