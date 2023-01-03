//react component
import { useNavigate, useSearchParams } from 'react-router-dom';
import classsname from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

//custom component
import Button from '~/components/Button';
import { toastError, toastWarning } from '~/assets/js/toast-message';
import Popup from '~/components/Popup';
import { ListAddress } from '~/components/Form/FormAddress';
import { PAYMENT_BY_MOMO, PAYMENT_BY_CASH } from '~/commons';

//service
import * as paymentService from '~/services/paymentService';

//style
import style from './Checkout.model.scss';
import { formatMoney } from '~/utils';
const cx = classsname.bind(style);

function Checkout() {
    const widths = ['45%', '35%', '10%', '20%', '10%'];

    const { addresses } = useSelector((state) => state.address);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [addressDefault, setAddressDefault] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [paymentType, setPaymentType] = useState(PAYMENT_BY_MOMO);

    const cartForPayments = JSON.parse(window.atob(searchParams.get('state')));

    const getAddressDefault = async () => {
        const result = addresses.filter((address) => address.isDefault === true);
        if (result.length) {
            setAddressDefault(result[0]);
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

    const sum = () => {
        const result = cartForPayments.reduce(function (acc, cur) {
            return acc + cur.product.price * cur.product.quantity;
        }, 0);
        return result;
    };

    const payment = () => {
        if (addressDefault) {
            const body = {
                totalAmount: sum(),
                products: [],
                address: addressDefault.id,
            };
            cartForPayments.forEach((item) => {
                const { id, name, imagePath, discount, priceBeforeDiscount, quantity, tierModel } = item.product;
                const product = {
                    productId: id,
                    name,
                    imagePath,
                    discount,
                    priceBeforeDiscount,
                    quantity,
                    tierModels: [],
                };

                tierModel.forEach((item) => {
                    const tierModel = {
                        tierModelId: item.id,
                        tierModelName: item.name,
                        modelId: item.currentModel.id,
                        modelName: item.currentModel.name,
                    };
                    product.tierModels.push(tierModel);
                });

                body.products.push(product);
            });

            if (paymentType === PAYMENT_BY_MOMO) {
                Promise.resolve(paymentService.paymentByMomo(body)).then((res) => {
                    console.log(res);
                    if (res.status === 201 || res.status === 200) {
                        window.open(res.data);
                    } else {
                        toastError(res.errors.message);
                    }
                });
            } else {
                Promise.resolve(paymentService.paymentByCash(body)).then((res) => {
                    console.log(body);
                    console.log(res);
                    if (res.status === 201) {
                        navigate({
                            pathname: '/user/purchase',
                        });
                    } else {
                        toastError(res.errors.message);
                    }
                });
            }
        } else {
            toastWarning('Vui lòng chọn địa chỉ nhận hàng!');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        getAddressDefault();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses]);

    return (
        <div className={cx('container')}>
            <div className={cx('card-swap', 'card-address-swap')}>
                <div className={cx('card-address-swap_header')}>
                    <div className={cx('header-logo')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className={cx('header-title')}>Địa Chỉ Nhận Hàng</div>
                </div>

                {addressDefault ? (
                    <div className={cx('card-address-swap_content')}>
                        <div className={cx('content-info')}>
                            {addressDefault.fullName} <br />
                            (+84) {addressDefault.phoneNumber}
                        </div>

                        <div className={cx('content-location')}>
                            <div className={cx('content-location_detail')}>{addressDefault.address}</div>
                            {addressDefault.isDefault && (
                                <div className={cx('content-location_default')}>
                                    <span>Mặc Định</span>
                                </div>
                            )}
                        </div>

                        <div className={cx('content-action')}>
                            <span onClick={() => setShowPopup(true)}>Thay đổi</span>
                        </div>
                    </div>
                ) : (
                    <div className={cx('card-address-swap_content')}>
                        <div className={cx('content-info')}></div>

                        <div className={cx('content-location')}>
                            <div className={cx('content-location_detail')}></div>
                        </div>

                        <div className={cx('content-action')}>
                            <span onClick={() => setShowPopup(true)}>Thêm địa chỉ</span>
                        </div>
                    </div>
                )}
            </div>

            <div className={cx('card-swap', 'card-main-swap')}>
                <div className={cx('card-main-swap_header')}>
                    <div className={cx('header-name')} style={{ width: widths[0] }}>
                        Sản phẩm
                    </div>
                    <div className={cx('header-item')} style={{ width: widths[1] }}></div>
                    <div className={cx('header-item')} style={{ width: widths[2], textAlign: 'right' }}>
                        Đơn giá
                    </div>
                    <div className={cx('header-item')} style={{ width: widths[3], textAlign: 'center' }}>
                        Số lương
                    </div>
                    <div className={cx('header-item')} style={{ width: widths[4], textAlign: 'right' }}>
                        Thành tiền
                    </div>
                </div>

                <div className={cx('card-main-container')}>
                    {cartForPayments.map((item, index) => (
                        <div key={index} className={cx('card-main-swap_content')}>
                            <div className={cx('content-info')} style={{ width: widths[0] }}>
                                <div className={cx('content-info_img')}>
                                    <img
                                        src="https://cf.shopee.vn/file/sg-11134201-22110-e3njur9xh9jv80_tn"
                                        alt="images"
                                        width={50}
                                    />
                                </div>
                                <div className={cx('content-info_name')}>{item.product.name}</div>
                            </div>
                            <div className={cx('content-model')} style={{ width: widths[1] }}>
                                Phân loại hàng: {productClassification(item)}
                            </div>
                            <div className={cx('content-price')} style={{ width: widths[2], textAlign: 'right' }}>
                                {formatMoney(item.product.price)}
                            </div>
                            <div className={cx('content-quantity')} style={{ width: widths[3], textAlign: 'center' }}>
                                {item.product.quantity}
                            </div>
                            <div className={cx('content-total')} style={{ width: widths[4], textAlign: 'right' }}>
                                {formatMoney(item.product.price * item.product.quantity)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('card-swap', 'card-payment-swap')}>
                <div className={cx('card-payment-swap_header')}>
                    <div className={cx('header-title')}>Phương thức thanh toán</div>
                    <div className={cx('group-color-list')}>
                        <Button
                            normal
                            border
                            className={cx('group-color-list__item', paymentType === PAYMENT_BY_MOMO && 'active')}
                            onClick={() => setPaymentType(PAYMENT_BY_MOMO)}
                        >
                            Ví MoMo
                            {paymentType === PAYMENT_BY_MOMO && (
                                <div className={cx('group-color-list__item--tick')}>
                                    <FontAwesomeIcon icon={faCheck} className={cx('group-color-list__item-icon')} />
                                </div>
                            )}
                        </Button>
                        <Button
                            normal
                            border
                            className={cx('group-color-list__item', paymentType === PAYMENT_BY_CASH && 'active')}
                            onClick={() => setPaymentType(PAYMENT_BY_CASH)}
                        >
                            Thanh toán khi nhận Hàng
                            {paymentType === PAYMENT_BY_CASH && (
                                <div className={cx('group-color-list__item--tick')}>
                                    <FontAwesomeIcon icon={faCheck} className={cx('group-color-list__item-icon')} />
                                </div>
                            )}
                        </Button>
                    </div>
                </div>

                <div className={cx('card-payment-swap_main')}>
                    <div className={cx('main-detail')}>
                        <div style={{ flex: 1 }}></div>
                        <div className={cx('main-detail_label')} style={{ width: '15%' }}>
                            Tổng tiền hàng
                        </div>
                        <div className={cx('main-detail_total')} style={{ width: '20%', textAlign: 'right' }}>
                            {formatMoney(sum())}
                        </div>
                    </div>
                    <div className={cx('main-detail')}>
                        <div style={{ flex: 1 }}></div>
                        <div className={cx('main-detail_label')} style={{ width: '15%' }}>
                            Tổng thanh toán:
                        </div>
                        <div className={cx('main-detail_total', 'final')} style={{ width: '20%', textAlign: 'right' }}>
                            {formatMoney(sum())}
                        </div>
                    </div>
                </div>
                <div className={cx('card-payment-swap_footer')}>
                    <div className={cx('footer_policy')}>
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo mọi điều khoản
                    </div>

                    <Button primary large className={cx('footer_btn')} onClick={payment}>
                        Đặt hàng
                    </Button>
                </div>
            </div>
            <Popup
                FormComponent={<ListAddress handleClose={handleClosePopup} fetchData={getAddressDefault} />}
                isShow={showPopup}
            />
        </div>
    );
}

export default Checkout;
