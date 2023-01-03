import classnames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import styles from './Phone.module.scss';
import * as authService from '~/services/authService';
import { toastError, toastSuccess } from '~/assets/js/toast-message';
import { update } from '~/slices/authSlice';

const cx = classnames.bind(styles);
function Phone() {
    const { userLogin } = useSelector((state) => state.auth);
    const [phoneNumber, setPhoneNumber] = useState(userLogin.phoneNumber);
    const [errorMessage, setErrorMessage] = useState('');
    const regex = /^\d{10}$/;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        var newPhone = e.target.value;
        if (regex.test(newPhone)) {
            setPhoneNumber(newPhone);
            setErrorMessage('');
        } else {
            setErrorMessage('Số điện thoại sai!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await authService.update({ phoneNumber });
        if (res.status === 200) {
            const action = update(res.data);
            dispatch(action);
            toastSuccess('Update phone number successfully!');
        } else {
            toastError('Update fail!');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('header-title')}>Thay đổi số điện thoại</h1>
            </div>
            <div className={cx('body')}>
                <form>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Số điện thoại mới</div>
                        <div className={cx('form-content')}>
                            <div className={cx('form-input')}>
                                <input
                                    type="text"
                                    className={cx(
                                        'form-control',
                                        errorMessage.trim().length !== 0 ? 'form-control--error' : '',
                                    )}
                                    defaultValue={phoneNumber}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <span className={cx('form-message')}>{errorMessage}</span>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-content')}>
                            <Button
                                disabled={errorMessage.trim().length !== 0 || !phoneNumber}
                                primary
                                className={cx(
                                    'btn-save',
                                    errorMessage.trim().length !== 0 || !phoneNumber ? 'btn-save--disable' : '',
                                )}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Phone;
