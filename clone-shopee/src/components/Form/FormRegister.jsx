import classnames from 'classnames/bind';
import { useEffect } from 'react';

import styles from './Form.module.scss';
import Button from '../Button';
import { CHECKBOX_FORM_REGISTER_ID } from '~/commons';
import Validator from '~/assets/js/form-validation';
import * as authService from '~/services/authService';
import { handleShowPopupOverplay } from '~/utils';

const cx = classnames.bind(styles);
function FormRegister() {
    useEffect(() => {
        function clearForm() {
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password_confirmation').value = '';
        }
        Validator({
            form: '#form-register',
            formGroupSelector: `.${cx('auth-form__group')}`,
            errorSelector: `.${cx('error-message')}`,
            errorClass: `${cx('invalid')}`,
            rules: [
                Validator.isRequired('#email'),
                Validator.isEmail('#email'),
                Validator.isRequired('#password'),
                Validator.minLength('#password', 8),
                Validator.isRequired('#password_confirmation'),
                Validator.isConfirmed(
                    '#password_confirmation',
                    function () {
                        return document.querySelector('#form-register #password').value;
                    },
                    'Mật khẩu nhập lại không chính xác',
                ),
            ],
            onSubmit: function (data) {
                //Call api
                //helend2905@gmail.com
                const register = async () => {
                    const res = await authService.register(data);
                    if (res.status === 201) {
                        clearForm();
                        handleShowPopupOverplay(null, true);
                    }
                };
                register();
            },
        });
    }, []);

    return (
        //  Register from
        <>
            {/* Authen from form  */}
            <form id="form-register">
                <div className={cx('auth-form__form')}>
                    <div className={cx('auth-form__group')}>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className={cx('auth-form__input')}
                            placeholder="Nhập email"
                        />
                        <span className={cx('error-message')}></span>
                    </div>

                    <div className={cx('auth-form__group')}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={cx('auth-form__input')}
                            placeholder="Nhập mật khẩu"
                            autoComplete="on"
                        />
                        <span className={cx('error-message')}></span>
                    </div>

                    <div className={cx('auth-form__group')}>
                        <input
                            id="password_confirmation"
                            type="password"
                            className={cx('auth-form__input')}
                            placeholder="Nhập lại mật khẩu"
                            autoComplete="on"
                        />
                        <span className={cx('error-message')}></span>
                    </div>
                </div>

                <div className={cx('auth-form__aside')}>
                    <p className={cx('auth-form__policy-text')}>
                        Bằng việc đăng ký, bạn đã đồng ý với Shop CLone về
                        <a href="/" className={cx('auth-form__text-link')}>
                            Điều khoản dịch vụ
                        </a>
                        <a href="/" className={cx('auth-form__text-link')}>
                            Chính sách bảo mật
                        </a>
                    </p>
                </div>
                <div className={cx('auth-form__controls')}>
                    <Button normal labelFor={CHECKBOX_FORM_REGISTER_ID} className={cx('auth-form__controls-back')}>
                        TRỞ LẠI
                    </Button>
                    <Button primary>ĐĂNG KÝ</Button>
                </div>
            </form>
        </>
    );
}

export default FormRegister;
