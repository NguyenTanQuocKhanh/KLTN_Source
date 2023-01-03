import classnames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button';
import { getParentElement } from '~/utils';
import styles from './Password.module.scss';
import * as authService from '~/services/authService';
import { toastSuccess } from '~/assets/js/toast-message';

const cx = classnames.bind(styles);
function Password() {
    const [pass, setPass] = useState({ password: '', oldPassword: '' });
    const [error, setError] = useState(true);
    // const elMessage = useRef(null);

    const handleInputPassword = (e) => {
        setPass({ ...pass, oldPassword: e.target.value });
    };

    const handleInputNewPassword = (e) => {
        setPass({ ...pass, password: e.target.value });
    };

    const handleInputConfirmPassword = (e) => {
        const parentElement = getParentElement(e.target, `.${cx('form-content')}`);
        const messageElement = parentElement.querySelector(`.${cx('form-message')}`);
        if (pass.password.trim() && e.target.value !== pass.password) {
            e.target.classList.add(cx('form-control--error'));
            setError(true);
            // setMessageError('Password not matching!!!');
            messageElement.innerText = 'Password not matching!!!';
        } else {
            e.target.classList.remove(cx('form-control--error'));
            setError(false);
            messageElement.innerText = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await authService.update({ pass });
        if (res.status === 200) {
            toastSuccess('Change password successfully!');
            setPass({});
        } else {
            console.log(res);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('header-title')}>Đổi Mật Khẩu</h1>
                <div className={cx('header-description')}>
                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                </div>
            </div>
            <div className={cx('body')}>
                <form id="#form-changePassword" className={cx('form-main')}>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Mật Khẩu Hiện Tại</div>
                        <div className={cx('form-content')}>
                            <div className={cx('form-input')}>
                                <input
                                    type="password"
                                    className={cx(
                                        'form-control',
                                        // errorMessage.trim().length !== 0 ? 'form-control--error' : '',
                                    )}
                                    onChange={handleInputPassword}
                                    autoComplete="on"
                                />
                            </div>
                            <span className={cx('form-message')}></span>
                        </div>
                        <div className={cx('form-btn')}>Quên mật khẩu?</div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Mật Khẩu Mới</div>
                        <div className={cx('form-content')}>
                            <div className={cx('form-input')}>
                                <input
                                    type="password"
                                    className={cx(
                                        'form-control',
                                        // errorMessage.trim().length !== 0 ? 'form-control--error' : '',
                                    )}
                                    onChange={handleInputNewPassword}
                                    autoComplete="on"
                                />
                            </div>
                            <span className={cx('form-message')}></span>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}>Xác Nhận Mật Khẩu</div>
                        <div className={cx('form-content')}>
                            <div className={cx('form-input')}>
                                <input
                                    type="password"
                                    className={cx(
                                        'form-control',
                                        // errorMessage.trim().length !== 0 ? 'form-control--error' : '',
                                    )}
                                    onChange={handleInputConfirmPassword}
                                    autoComplete="on"
                                />
                            </div>
                            <span className={cx('form-message')}></span>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-label')}></div>
                        <div className={cx('form-content')}>
                            <Button
                                // disabled={errorMessage.trim().length !== 0}
                                primary
                                className={cx('btn-save', error ? 'btn-save--disable' : '')}
                                // className={cx('btn-save', 'btn-save--disable')}
                                onClick={handleSubmit}
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

export default Password;
