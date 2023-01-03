//react component
import classnames from 'classnames/bind';
import { useRef } from 'react';
import { toastError } from '~/assets/js/toast-message';

//custom component
import Button from '~/components/Button';

//service
import * as addressService from '~/services/addressService';

//style
import style from './Form.module.scss';
const cx = classnames.bind(style);

function EditAddress({ handleClose, item, fetchData }) {
    const inputName = useRef();
    const inputPhone = useRef();
    const inputLocation = useRef();
    const inputCheckbox = useRef();

    const handleSubmit = async () => {
        const body = {
            id: item.id,
            fullName: inputName.current.value,
            phoneNumber: inputPhone.current.value,
            address: inputLocation.current.value,
            isDefault: inputCheckbox.current.checked,
        };
        const req = await addressService.update(body);
        if (req.status === 200) {
            handleClose();
            fetchData();
        } else {
            toastError(req.errors.message);
        }
    };

    return (
        <div className={cx('card-layout', 'form-container')}>
            <div className={cx('form-header')}>Thêm địa chỉ</div>

            <div className={cx('form-main')}>
                <div className={cx('form-group')}>
                    <div className={cx('form-label', 'form-label-custom')}>Họ và tên</div>
                    <div className={cx('form-content')}>
                        <div className={cx('form-input')}>
                            <input
                                ref={inputName}
                                type="text"
                                className={cx('form-control')}
                                defaultValue={item.fullName}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('form-group')}>
                    <div className={cx('form-label', 'form-label-custom')}>Số điện thoại</div>
                    <div className={cx('form-content')}>
                        <div className={cx('form-input')}>
                            <input
                                ref={inputPhone}
                                type="text"
                                pattern="[0-9]+"
                                className={cx('form-control')}
                                defaultValue={item.phoneNumber}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <div className={cx('form-label', 'form-label-custom')}>Địa chỉ cụ thể</div>
                    <div className={cx('form-content')}>
                        <div className={cx('form-input')}>
                            <textarea
                                ref={inputLocation}
                                className={cx('form-control')}
                                style={{ resize: 'vertical', padding: 12, height: 100 }}
                                defaultValue={item.address}
                            />
                        </div>
                    </div>
                </div>

                <div className={cx('form-group')}>
                    <div className={cx('form-label', 'form-label-custom')}>Đặt mặc định</div>
                    <div className={cx('form-content')}>
                        <div className={cx('form-input', 'item-checkbox')}>
                            <input
                                ref={inputCheckbox}
                                type="checkbox"
                                className={cx('item-checkbox-input')}
                                defaultChecked={item.isDefault}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('form-footer')}>
                <Button normal onClick={handleClose} className={cx('form-footer_btn')}>
                    Trở lại
                </Button>
                <Button primary onClick={handleSubmit} className={cx('form-footer_btn')}>
                    Lưu thay đổi
                </Button>
            </div>
        </div>
    );
}

export default EditAddress;
