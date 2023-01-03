import classnames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import styles from './Email.module.scss';
import * as authService from '~/services/authService';
import { update } from '~/slices/authSlice';
import { toastError, toastSuccess } from '~/assets/js/toast-message';

const cx = classnames.bind(styles);
function Email() {
    const { userLogin } = useSelector((state) => state.auth);
    const [email, setEmail] = useState(userLogin.email);
    const [errorMessage, setErrorMessage] = useState('');
    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const dispatch = useDispatch();

    const handleChangeEmail = (e) => {
        var newEmail = e.target.value;
        if (regex.test(newEmail)) {
            setEmail(newEmail);
            setErrorMessage('');
        } else {
            setErrorMessage('Email sai!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await authService.update({ email });
        if (res.status === 200) {
            const action = update(res.data);
            dispatch(action);
            toastSuccess('Update email successfully!');
        } else {
            toastError('Update fail!');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('header-title')}>Thay đổi địa chỉ email</h1>
            </div>
            <div className={cx('body')}>
                <form>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Địa chỉ email mới</div>
                        <div className={cx('form-content')}>
                            <div className={cx('form-input')}>
                                <input
                                    type="text"
                                    className={cx(
                                        'form-control',
                                        errorMessage.trim().length !== 0 ? 'form-control--error' : '',
                                    )}
                                    defaultValue={email}
                                    onChange={(e) => handleChangeEmail(e)}
                                />
                            </div>
                            <span className={cx('form-message')}>{errorMessage}</span>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-content')}>
                            <Button
                                disabled={errorMessage.trim().length !== 0 || !email}
                                primary
                                className={cx(
                                    'btn-save',
                                    errorMessage.trim().length !== 0 || !email ? 'btn-save--disable' : '',
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

export default Email;
