//react component
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

//custom component
import Button from '~/components/Button';
import Popup from '~/components/Popup';
import { toastError } from '~/assets/js/toast-message';
import { CreateAddress, EditAddress } from '~/components/Form/FormAddress';

//service
import * as addressService from '~/services/addressService';

//slice
import { getAllAddress } from '~/slices/addressSlice';

//style
import styles from './Address.module.scss';
import { useDispatch, useSelector } from 'react-redux';
const cx = classnames.bind(styles);

function Address() {
    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.address);
    // const [addresses, setAddresses] = useState([]);s
    const [addressSelected, setAddressSelected] = useState();
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

    const dispatchActionGetAll = async () => {
        const req = await addressService.getAll();
        if (req.status === 200) {
            dispatch(getAllAddress(req.data.data));
        }
    };

    const handleClose = () => {
        setShowFormCreate(false);
        setShowFormEdit(false);
    };

    // const getAllAddress = async () => {
    //     const req = await addressService.getAll();
    //     if (req.status === 200) {
    //         setAddresses(req.data.data);
    //     } else {
    //         toastError(req.errors.message);
    //     }
    // };

    const handleClickEdit = (address) => {
        setAddressSelected(address);
        setShowFormEdit(true);
    };

    const handleRemove = async (id) => {
        const req = await addressService.remove(id);
        if (req.status === 200) {
            // getAllAddress();
            dispatchActionGetAll();
        } else {
            toastError(req.errors.message);
        }
    };

    const handleSetDefaultAddress = async (id) => {
        const body = {
            id,
            isDefault: true,
        };
        const req = await addressService.update(body);
        if (req.status === 200) {
            // getAllAddress();
            dispatchActionGetAll();
        } else {
            toastError(req.errors.message);
        }
    };

    // useEffect(() => {
    //     getAllAddress();
    // }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('header-title')}>Địa Chỉ Của Tôi</h1>
                <Button
                    primary
                    normal
                    leftIcon={<FontAwesomeIcon icon={faPlus} className={cx('header-button-icon')} />}
                    onClick={() => {
                        setShowFormCreate(true);
                    }}
                >
                    Thêm Địa Chỉ Mới
                </Button>
            </div>
            <div className={cx('body')}>
                {addresses.map((address, index) => {
                    return (
                        <div key={index} className={cx('item')}>
                            <div className={cx('item-left')}>
                                <div className={cx('item-left-wrap')}>
                                    <div className={cx('item-left__label')}>Họ và tên</div>
                                    <div className={cx('item-left__content')}>
                                        <div className={cx('item-left__text')}>{address.fullName}</div>
                                        {address.isDefault ? (
                                            <div className={cx('item-left__button')}>Mặc định</div>
                                        ) : undefined}
                                    </div>
                                </div>

                                <div className={cx('item-left-wrap')}>
                                    <div className={cx('item-left__label')}>Số điện thoại</div>
                                    <div className={cx('item-left__content')}>
                                        <div className={cx('item-left__text')}>{address.phoneNumber}</div>
                                    </div>
                                </div>

                                <div className={cx('item-left-wrap')}>
                                    <div className={cx('item-left__label')}>Địa chỉ</div>
                                    <div className={cx('item-left__content')}>
                                        <div className={cx('item-left__text')}>{address.address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('item-right')}>
                                <div className={cx('item-right-control')}>
                                    <div
                                        className={cx('item-right-control__edit')}
                                        onClick={() => handleClickEdit(address)}
                                    >
                                        Sửa
                                    </div>
                                    {!address.isDefault ? (
                                        <div
                                            className={cx('item-right-control__remove')}
                                            onClick={() => handleRemove(address.id)}
                                        >
                                            Xóa
                                        </div>
                                    ) : undefined}
                                </div>

                                <Button
                                    disabled={address.isDefault}
                                    normal={!address.isDefault}
                                    className={cx('item-right__button')}
                                    onClick={() => handleSetDefaultAddress(address.id)}
                                >
                                    Thiết Lập Mặc Định
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Popup
                FormComponent={<CreateAddress handleClose={handleClose} fetchData={dispatchActionGetAll} />}
                isShow={showFormCreate}
            />
            <Popup
                FormComponent={
                    <EditAddress handleClose={handleClose} item={addressSelected} fetchData={dispatchActionGetAll} />
                }
                isShow={showFormEdit}
            />
        </div>
    );
}

export default Address;
