import classNames from 'classnames/bind';

import HeaderTop from '~/layouts/components/Header/HeaderTop';
import HeaderSearchCart from '~/layouts/components/Header/HeaderSearchCart';
import Footer from '~/layouts/components/Footer';
import { useDispatch } from 'react-redux';
import { toastError } from '~/assets/js/toast-message';

import * as categoryService from '~/services/categoryService'
import * as brandService from '~/services/brandService'

import { getAllCate } from '~/slices/categorySlice';
import { getAllBrand } from '~/slices/brandSlice';

import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const dispatch = useDispatch()

    Promise.resolve(categoryService.getAll()).then((e) => {
        if (e.status === 200) {
            dispatch(getAllCate(e.data.data));
        } else {
            toastError(e.errors.message);
        }
    });

    Promise.resolve(brandService.getAll()).then((e) => {
        if (e.status === 200) {
            dispatch(getAllBrand(e.data.data));
        } else {
            toastError(e.errors.message);
        }
    });


    return (
        <>
            <header className={cx('header')}>
                <div className="grid">
                    <HeaderTop />
                    <HeaderSearchCart />
                </div>
            </header>
            <div className={cx('body')}>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
