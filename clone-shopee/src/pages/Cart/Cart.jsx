//react component
import { faCheck, faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//custom component
import images from '~/assets/images';
import Button from '~/components/Button';

//service
import * as cartService from '~/services/cartService';

//slice
import { getAllCart, remove } from '~/slices/cartSlice';

//style
import style from './Cart.module.scss';
import { toastError, toastSuccess, toastWarning } from '~/assets/js/toast-message';
import { useEffect } from 'react';
import { formatMoney } from '~/utils';

const cx = classnames.bind(style);

function Cart() {
    const dispatch = useDispatch();
    const { carts } = useSelector((state) => state.cart);
    // const [items, setItems] = useState(carts);
    const [cartSelected, setCartSelected] = useState([]);
    const [toggleIndex, setToggleIndex] = useState(-1);
    const [checkAll, setCheckAll] = useState(false);
    const navigate = useNavigate();
    const widths = ['5%', '45%', '10%', '20%', '10%', '10%'];

    const handleDeleteCart = async (type = 'all', item = {}) => {
        let body = {};
        const products = [];

        if (type === 'all') {
            carts.forEach((item) => {
                if (cartSelected.findIndex((a) => a === item.id) > -1) {
                    const { id, tierModel } = item.product;
                    const product = { productId: id, tierModels: [] };
                    tierModel.forEach((element) => {
                        product.tierModels.push({ id: element.id, modelId: element.currentModel.id });
                    });
                    products.push(product);
                }
            });
            if (products.length) {
                body = { products };
            }
        } else {
            if (Object.keys(item).length) {
                const { id, tierModel } = item.product;
                const product = { productId: id, tierModels: [] };
                tierModel.forEach((element) => {
                    product.tierModels.push({ id: element.id, modelId: element.currentModel.id });
                });
                products.push(product);
                if (products.length) {
                    body = { products };
                }
            }
        }

        if (products.length) {
            const req = await cartService.remove(body);
            if (req.status === 201) {
                if (type === 'all') {
                    setCartSelected([]);
                } else {
                    setCartSelected([...cartSelected.filter((a) => a !== item.id)]);
                }

                dispatchActionGetAll();
            } else {
                toastError('Delete Item From Cart Fail!');
            }
        } else {
            toastWarning('Select Item!');
        }
    };

    const goToCheckout = () => {
        if (cartSelected.length) {
            const carForPayments = [];
            carts.forEach((item) => {
                if (cartSelected.findIndex((a) => a === item.id) > -1) {
                    carForPayments.push(item);
                }
            });
            navigate({
                pathname: '/checkout',
                search: `?state=${window.btoa(JSON.stringify(carForPayments))}`,
            });
        } else {
            toastWarning('Select Item!');
        }
    };

    const productClassification = (cart) => {
        const arr = [];
        const { tierModel, discount } = cart.product;
        if (discount) {
            arr.push(`${discount}%`);
        }
        tierModel.forEach((item) => arr.push(item.currentModel.name));
        return arr.join(', ');
    };

    const handleOnchangeQuantity = async (newQuantity, item) => {
        if (newQuantity) {
            const { id, tierModel } = item.product;
            const body = { productId: id, quantity: newQuantity, tierModels: [] };
            tierModel.forEach((item) => {
                body.tierModels.push({ id: item.id, modelId: item.currentModel.id });
            });
            const req = await cartService.updateQuantity(body);
            if (req.status === 201) {
                dispatchActionGetAll();
            } else {
                toastError('Update Quantity Fail!');
            }
        }
    };

    const dispatchActionGetAll = async () => {
        const req = await cartService.getAll();
        if (req.status === 201) {
            dispatch(getAllCart(req.data));
        }
    };

    const handleSelectItem = (e, key) => {
        if (e.target.checked) {
            setCartSelected([...cartSelected, key]);
        } else {
            setCartSelected([...cartSelected.filter((a) => a !== key)]);
        }
    };

    const handleSelectAll = (e) => {
        setCheckAll(!checkAll);
        if (e.target.checked) {
            const newArr = [];
            carts.forEach((item) => newArr.push(item.id));
            setCartSelected(newArr);
        } else {
            setCartSelected([]);
        }
    };

    const sum = () => {
        const result = carts.reduce(function (acc, cur) {
            if (cartSelected.findIndex((a) => a === cur.id) > -1) {
                return acc + cur.product.price * cur.product.quantity;
            }
            return acc;
        }, 0);
        return formatMoney(result);
    };

    const verifyActive = (modelId, currentModelId) => {
        return modelId === currentModelId;
    };

    useEffect(() => {
        dispatchActionGetAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('cart-container')}>
            {carts.length ? (
                <div className={cx('cart-swap')}>
                    <div className={cx('card-swap', 'cart-swap-header')}>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[0] }}>
                            <input
                                id="check-item"
                                type="checkbox"
                                className={cx('cart-swap-header_item-checkbox')}
                                checked={cartSelected.length === carts.length}
                                onClick={handleSelectAll}
                                onChange={() => {}}
                            />
                            <label htmlFor="check-item"></label>
                        </div>
                        <div
                            className={cx('cart-swap-header_item')}
                            style={{
                                color: 'var(--text-color)',
                                width: widths[1],
                                textAlign: 'left',
                                fontSize: '16px',
                            }}
                        >
                            Sản Phẩm
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[2] }}>
                            Đơn Giá
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[3] }}>
                            Số Lượng
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[4] }}>
                            Số Tiền
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[5] }}>
                            Thao Tác
                        </div>
                    </div>

                    <div className={cx('cart-swap-main')}>
                        <div className={cx('card-swap')}>
                            {carts.map((item, index) => (
                                <Fragment key={index}>
                                    <div className={cx('cart-main-item')}>
                                        <div className={cx('item-checkbox')} style={{ width: widths[0] }}>
                                            <input
                                                type="checkbox"
                                                className={cx('item-checkbox-input')}
                                                checked={cartSelected.findIndex((a) => a === item.id) > -1}
                                                onClick={(e) => handleSelectItem(e, item.id)}
                                                onChange={() => {}}
                                            />
                                        </div>

                                        <div
                                            className={cx('item-info-group')}
                                            style={{ color: 'var(--text-color)', width: widths[1], textAlign: 'left' }}
                                        >
                                            <img
                                                src={item.product.imagePath}
                                                alt="images"
                                                className={cx('item-info-group_img')}
                                            />

                                            <div className={cx('item-info-group_name')}>{item.product.name}</div>

                                            <div
                                                className={cx('item-info-group_type')}
                                                onClick={() => {
                                                    toggleIndex === index ? setToggleIndex(-1) : setToggleIndex(index);
                                                }}
                                            >
                                                <HeadlessTippy
                                                    interactive
                                                    placement="bottom"
                                                    visible={index === toggleIndex}
                                                    onClickOutside={() => {
                                                        toggleIndex === index
                                                            ? setToggleIndex(-1)
                                                            : setToggleIndex(index);
                                                    }}
                                                    render={(attrs) => (
                                                        <div className={cx('headless-tippy')}>
                                                            <div className={cx('headless-tippy-arrow-outer')}>
                                                                <div className={cx('headless-tippy-arrow-inner')}></div>
                                                            </div>
                                                            <div
                                                                className={cx('headless-tippy-main')}
                                                                tabIndex="-1"
                                                                {...attrs}
                                                            >
                                                                <div className={cx('headless-tippy-container')}>
                                                                    <div className={cx('headless-tippy_content')}>
                                                                        {item.product.tierModel.map(
                                                                            (tierModel, index) => (
                                                                                <div
                                                                                    key={index}
                                                                                    className={cx(
                                                                                        'group-color-swapper',
                                                                                    )}
                                                                                >
                                                                                    <label
                                                                                        className={cx(
                                                                                            'group-color-label',
                                                                                        )}
                                                                                    >
                                                                                        {tierModel.name}
                                                                                    </label>
                                                                                    <div
                                                                                        className={cx(
                                                                                            'group-color-list',
                                                                                        )}
                                                                                    >
                                                                                        {tierModel.models.map(
                                                                                            (model, index) =>
                                                                                                verifyActive(
                                                                                                    model.id,
                                                                                                    tierModel
                                                                                                        .currentModel
                                                                                                        .id,
                                                                                                ) ? (
                                                                                                    <Button
                                                                                                        key={index}
                                                                                                        normal
                                                                                                        border
                                                                                                        className={cx(
                                                                                                            'group-color-list__item',
                                                                                                            'active',
                                                                                                        )}
                                                                                                    >
                                                                                                        {model.name}

                                                                                                        <div
                                                                                                            className={cx(
                                                                                                                'group-color-list__item--tick',
                                                                                                            )}
                                                                                                        >
                                                                                                            <FontAwesomeIcon
                                                                                                                icon={
                                                                                                                    faCheck
                                                                                                                }
                                                                                                                className={cx(
                                                                                                                    'group-color-list__item-icon',
                                                                                                                )}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </Button>
                                                                                                ) : (
                                                                                                    <Button
                                                                                                        key={index}
                                                                                                        normal
                                                                                                        border
                                                                                                        className={cx(
                                                                                                            'group-color-list__item',
                                                                                                        )}
                                                                                                    >
                                                                                                        {model.name}
                                                                                                    </Button>
                                                                                                ),
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                    {/* <div className={cx('headless-tippy_footer')}>
                                                                        <Button
                                                                            normal
                                                                            style={{ width: '46%' }}
                                                                            onClick={() => {
                                                                                toggleIndex === index
                                                                                    ? setToggleIndex(-1)
                                                                                    : setToggleIndex(index);
                                                                            }}
                                                                        >
                                                                            TRỞ LẠI
                                                                        </Button>
                                                                        <Button primary style={{ width: '46%' }}>
                                                                            XÁC NHẬN
                                                                        </Button>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                >
                                                    <div style={{ marginRight: '10px' }}>
                                                        <div className={cx('item-info-group_type-title')}>
                                                            <span>Phân loại hàng:</span>
                                                            <button className={cx('item-info-group_type-btn')}></button>
                                                        </div>
                                                        <div className={cx('item-info-group_type-content')}>
                                                            {productClassification(item)}
                                                        </div>
                                                    </div>
                                                </HeadlessTippy>
                                            </div>
                                        </div>

                                        <div className={cx('item-price')} style={{ width: widths[2] }}>
                                            <span className={cx('item-price_old')}>
                                                {formatMoney(item.product.priceBeforeDiscount)}
                                            </span>
                                            <span className={cx('item-price_new')}>
                                                {formatMoney(item.product.price)}
                                            </span>
                                        </div>

                                        <div className={cx('group-quantity-swapper')} style={{ width: widths[3] }}>
                                            <div className={cx('group-quantity-select')}>
                                                <button
                                                    className={cx(
                                                        'group-quantity-select__btn',
                                                        'group-quantity-select__btn-left',
                                                    )}
                                                    onClick={() => {
                                                        const newQuantity = item.product.quantity - 1;
                                                        if (newQuantity) {
                                                            handleOnchangeQuantity(newQuantity, item);
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faSubtract} />
                                                </button>
                                                <input
                                                    type="number"
                                                    pattern="[0-9]"
                                                    className={cx('group-quantity-select__input')}
                                                    value={item.product.quantity}
                                                    onChange={(e) => handleOnchangeQuantity(+e.target.value, item)}
                                                />
                                                <button
                                                    className={cx(
                                                        'group-quantity-select__btn',
                                                        'group-quantity-select__btn-right',
                                                    )}
                                                    onClick={() => {
                                                        const newQuantity = item.product.quantity + 1;
                                                        handleOnchangeQuantity(newQuantity, item);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className={cx('item-total')} style={{ width: widths[4] }}>
                                            {formatMoney(item.product.price * item.product.quantity)}
                                        </div>
                                        <div className={cx('item-action-group')} style={{ width: widths[5] }}>
                                            <div
                                                className={cx('item-action-group_action')}
                                                onClick={() => handleDeleteCart('one', item)}
                                            >
                                                Xóa
                                            </div>
                                        </div>
                                    </div>

                                    {index < widths.length - 1 ? <div className={cx('separate')}></div> : null}
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <div className={cx('card-swap', 'cart-swap-footer')}>
                        <div className={cx('cart-swap-footer_item')} style={{ width: '5%' }}>
                            <input
                                id="check-item"
                                type="checkbox"
                                className={cx('cart-swap-footer_item-checkbox')}
                                checked={cartSelected.length === carts.length}
                                onClick={handleSelectAll}
                                onChange={() => {}}
                            />
                            <label htmlFor="check-item"></label>
                        </div>
                        <div
                            className={cx('cart-swap-footer_item')}
                            style={{ color: 'var(--text-color)', width: '15%', textAlign: 'left' }}
                        >
                            Chọn Tất Cả ({carts.length})
                        </div>
                        <div
                            className={cx('cart-swap-footer_item', 'cart-swap-footer_item--active')}
                            onClick={() => handleDeleteCart('all')}
                        >
                            Xóa
                        </div>
                        <div className={cx('cart-swap-footer_item')} style={{ width: '25%' }}></div>
                        <div className={cx('cart-swap-footer_item')} style={{ width: '35%', textAlign: 'right' }}>
                            Tổng thanh toán ({cartSelected.length} Sản phẩm):
                            <span className={cx('cart-swap-footer_item-price')}>{sum()}</span>
                        </div>
                        <div className={cx('cart-swap-footer_item')} style={{ width: '20%', textAlign: 'right' }}>
                            <Button primary large style={{ height: '40px', width: '200px' }} onClick={goToCheckout}>
                                Thanh Toán
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('cart-empty-swap')}>
                    <img src={images.noCart} alt="images" className={cx('cart-empty_img')} />
                    <strong className={cx('cart-empty_text')}>Giỏ hàng của bạn còn trống</strong>
                    <Button primary to="/" className={cx('cart-empty_btn')}>
                        MUA NGAY
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Cart;
