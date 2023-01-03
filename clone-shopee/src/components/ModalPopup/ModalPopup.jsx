import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import FacebookLogin from 'react-facebook-login';

import { FormLogin } from '../Form';
import { CHECKBOX_FORM_LOGIN_ID, CHECKBOX_FORM_REGISTER_ID } from '~/commons';
import Button from '../Button';
import { handleShowPopupOverplay } from '~/utils';

import styles from './ModalPopup.module.scss';

const cx = classnames.bind(styles);
function ModalPopup({ FormComponent = FormLogin, formType = 'login', isCustom = false, defaultChecked = false }) {
    var classNameModal = FormComponent === FormLogin ? 'modalLogin' : 'modalRegister';
    var classNameCheckBox = FormComponent === FormLogin ? 'checkbox_input_formLogin' : 'checkbox_input_formRegister';
    var idCheckBox = FormComponent === FormLogin ? CHECKBOX_FORM_LOGIN_ID : CHECKBOX_FORM_REGISTER_ID;
    var classModalBody = FormComponent === FormLogin ? 'modal__body-formLogin' : 'modal__body-formRegister';
    const switchText = formType === 'login' ? 'register' : 'login';

    const responseFacebook = (response) => {
        console.table(response);
    };

    return (
        //  Modal layout
        <>
            <input
                type="checkbox"
                className={cx(classNameCheckBox)}
                id={idCheckBox}
                hidden
                defaultChecked={defaultChecked}
            />
            <div className={cx(classNameModal)} hidden>
                <label htmlFor={idCheckBox} className={cx('modal_overlay')}></label>
                <div id="modal-body" className={cx(classModalBody)}>
                    {!isCustom ? (
                        <>
                            {/* Login from */}
                            <div className={cx('auth-form')}>
                                <div className={cx('auth-form__container')}>
                                    {/* Authen from header  */}
                                    <div className={cx('auth-form__header')}>
                                        <h3 className={cx('auth-form__heading')}>
                                            {formType === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                                        </h3>
                                        <span
                                            onClick={() => handleShowPopupOverplay(switchText)}
                                            className={cx('auth-form_switch-btn')}
                                        >
                                            {formType === 'login' ? 'Đăng ký' : 'Đăng nhập'}
                                        </span>
                                    </div>
                                    {/* content */}
                                    <FormComponent />
                                </div>

                                <div className={cx('auth-form__socials')}>
                                    <FacebookLogin
                                        appId="5799011013464462"
                                        fields="name,email,picture"
                                        autoLoad={false}
                                        cookie={true}
                                        callback={responseFacebook}
                                        cssClass={cx('auth-form__socials--facebook')}
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faFacebookSquare}
                                                className={cx('auth-form__socials-icon')}
                                            />
                                        }
                                        textButton={
                                            <span className={cx('auth-form__socials-title')}>kết nối với Facebook</span>
                                        }
                                    />
                                    <Button
                                        small
                                        href="/"
                                        className={cx('auth-form__socials--google')}
                                        leftIcon={
                                            <FontAwesomeIcon
                                                icon={faGoogle}
                                                className={cx('auth-form__socials-icon')}
                                            />
                                        }
                                    >
                                        <span className={cx('auth-form__socials-title')}>kết nối với Google</span>
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        FormComponent
                    )}
                </div>
            </div>
        </>
    );
}

export default ModalPopup;
