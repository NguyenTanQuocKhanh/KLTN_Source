//react component
import classnames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//custom component
import { toastError, toastWarning } from '~/assets/js/toast-message';
import Button from '~/components/Button';
import Popup from '~/components/Popup';
import { CreateAddress, EditAddress } from '.';

//service
import * as addressService from '~/services/addressService';

//slice
import { getAllAddress } from '~/slices/addressSlice';

//style
import style from './Form.module.scss';
const cx = classnames.bind(style);

function ListAddress({ handleClose }) {
    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.address);
    // const [address, setAddress] = useState([]);
    const [isDefaultId, setIsDefaultId] = useState(0);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [addressSelect, setAddressSelect] = useState({});

    // const getAddressDefault = async () => {
    //     const req = await addressService.getAll();
    //     if (req.status === 200) {
    //         const index = req.data.data.findIndex((a) => a.isDefault === true);
    //         setAddress(req.data.data);
    //         if (index > -1) {
    //             setIsDefaultId(req.data.data[index].id);
    //         }
    //     } else {
    //         toastError(req.errors.message);
    //     }
    // };

    const handleUpdateAddressDefault = async () => {
        if (isDefaultId) {
            const body = {
                id: isDefaultId,
                isDefault: true,
            };
            const req = await addressService.update(body);
            if (req.status === 200) {
                dispatchActionGetAll();
                handleClose();
            } else {
                toastError(req.errors.message);
            }
        } else {
            toastWarning('Hãy chọn địa chỉ cho đơn hàng của bạn!');
        }
    };

    const dispatchActionGetAll = async () => {
        const req = await addressService.getAll();
        if (req.status === 200) {
            dispatch(getAllAddress(req.data.data));
        }
    };

    const setAddressDefault = () => {
        setIsDefaultId((prev) => {
            const index = addresses.findIndex((a) => a.isDefault === true);
            if (index > -1) {
                return addresses[index].id;
            }
        });
    };

    const handleClickChange = (item) => {
        setAddressSelect(item);
        setShowFormEdit(true);
    };

    const handleCloseCreate = () => {
        setShowFormCreate(false);
    };
    const handleCloseEdit = () => {
        setShowFormEdit(false);
    };

    const handleOpenCreate = () => {
        setShowFormCreate(true);
    };

    useEffect(() => {
        setAddressDefault();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addresses]);

    return (
        <div className={cx('card-layout', 'list-address-container')}>
            <div className={cx('list-address_header')}>Địa Chỉ Của Tôi</div>
            <div className={cx('list-address_main')}>
                {addresses.length > 0 &&
                    addresses.map((item, index) => (
                        <div key={index} className={cx('main-item')}>
                            <div
                                className={cx('radio-button', item.id === isDefaultId && 'radio-button--checked')}
                                onClick={() => setIsDefaultId(item.id)}
                            >
                                <div className={cx('radio-button__outer-circle')}>
                                    <div className={cx('radio-button__inner-circle')}></div>
                                </div>
                            </div>
                            <div className={cx('item-info')}>
                                <div className={cx('item-info_group')}>
                                    <div className={cx('item-info_group-name')}>{item.fullName}</div>
                                    <div className={cx('separate')}></div>
                                    <div className={cx('item-info_group-phone')}>(+84) {item.phoneNumber}</div>
                                </div>
                                <div className={cx('item-info_location')}>{item.address}</div>
                                {item.isDefault && (
                                    <div className={cx('item-info_default')}>
                                        <span>Mặc Định</span>
                                    </div>
                                )}
                            </div>
                            <div className={cx('item-control')}>
                                <span onClick={() => handleClickChange(item)}>Thay đổi</span>
                            </div>
                        </div>
                    ))}

                <div className={cx('main-item')}>
                    <Button normal onClick={handleOpenCreate}>
                        Thêm Địa Chỉ Mới
                    </Button>
                </div>
            </div>
            <div className={cx('list-address_footer')}>
                <Button normal onClick={handleClose}>
                    Hủy
                </Button>
                <Button primary onClick={handleUpdateAddressDefault}>
                    Xác nhận
                </Button>
            </div>

            <Popup
                FormComponent={<CreateAddress handleClose={handleCloseCreate} fetchData={dispatchActionGetAll} />}
                isShow={showFormCreate}
            />
            <Popup
                FormComponent={
                    <EditAddress handleClose={handleCloseEdit} item={addressSelect} fetchData={dispatchActionGetAll} />
                }
                isShow={showFormEdit}
            />
        </div>
    );
}

export default ListAddress;
