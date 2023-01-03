import classnames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownDate, DropdownComponent } from 'react-dropdown-date';

import Button from '~/components/Button';
import styles from './Profile.module.scss';
import config from '~/config';
import { obscureString } from '~/utils';
import * as authService from '~/services/authService';
import * as fileService from '~/services/fileService';
import { update } from '~/slices/authSlice';
import { toastError, toastSuccess, toastWarning } from '~/assets/js/toast-message';
import ModalPopup from '~/components/ModalPopup';

const cx = classnames.bind(styles);
function Profile() {
    const { userLogin } = useSelector((state) => state.auth);
    const { photo } = userLogin;
    const [user, setUser] = useState({ photo });
    const [isModify, setIsModify] = useState(false);

    const inputRef = useRef();
    const dispatch = useDispatch();

    // handleChange fullName
    const handleChangeFullName = (e) => {
        setUser({ ...user, fullName: e.target.value });
        setIsModify(true);
    };

    // handle select gender
    const handleChecked = (e) => {
        setUser({ ...user, gender: +e.currentTarget.id });
        setIsModify(true);
    };

    function getMonthDayYear(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        return { month, day, year };
    }

    // handle click dropdown date
    const handleChangeBirthday = (date) => {
        // formats a JS date to 'yyyy-mm-dd'
        let { month, day, year } = getMonthDayYear(date);
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        setUser({ ...user, birthday: [year, month, day].join('-') });
        setIsModify(true);
    };

    // button submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        var photo = null;

        if (user.file) {
            var formData = new FormData();
            formData.append('file', user.file);
            const resUploadFile = await fileService.upload(formData);
            if (resUploadFile.status === 201) {
                photo = {
                    id: resUploadFile.data.id,
                };
                setIsModify(true);
            } else {
                toastError('Update load avatar fail!');
            }
        }

        if (isModify || photo) {
            let userModify = { ...user };
            console.log(userModify);
            if (photo) {
                userModify = { ...user, photo };
            }
            const res = await authService.update({ ...userModify });
            if (res.status === 200) {
                const action = update(res.data);
                dispatch(action);
                toastSuccess('Update profile successfully!');
                setIsModify(false);
            } else {
                toastError('Update profile fail!');
            }
        } else {
            toastWarning('Change profile,Please!');
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const photo = {
                path: URL.createObjectURL(file),
            };
            setUser({ ...user, photo, file });
        }
    };

    const handleUpload = () => {
        inputRef.current.click();
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('header-title')}>Hồ Sơ Của Tôi</h1>
                <div className={cx('header-description')}>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className={cx('body')}>
                <div className={cx('body-left')}>
                    <form>
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>Tên Đăng Nhập</div>
                            <div className={cx('form-content')}>
                                <div className={cx('form-content__output')}>
                                    {userLogin.userNam}
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>Tên</div>
                            <div className={cx('form-content')}>
                                <div className={cx('form-input')}>
                                    <input
                                        type="text"
                                        className={cx('form-control')}
                                        defaultValue={userLogin.fullName}
                                        onChange={(e) => handleChangeFullName(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>Email</div>
                            <div className={cx('form-content')}>
                                <div className={cx('form-content__output')}>
                                    {obscureString(userLogin.email, 0, userLogin.email.indexOf('@') - 1, '*')}
                                </div>
                                <Button
                                    to={config.routes.user.email}
                                    normal
                                    small
                                    className={cx('form-output__control')}
                                >
                                    Thay Đổi
                                </Button>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>Số Điện Thoại</div>
                            <div className={cx('form-content')}>
                                <div className={cx('form-content__output')}>
                                    {userLogin.phoneNumber &&
                                        obscureString(userLogin.phoneNumber, 0, userLogin.phoneNumber.length - 3, '*')}
                                </div>
                                <Button
                                    to={config.routes.user.phone}
                                    normal
                                    small
                                    className={cx('form-output__control')}
                                >
                                    Thay Đổi
                                </Button>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>Giới Tính</div>
                            <div className={cx('form-content')}>
                                <div className={cx('form-gender')}>
                                    <div className={cx('gender-group')}>
                                        <div
                                            id="0"
                                            onClick={(e) => handleChecked(e)}
                                            className={cx(
                                                'radio-button',
                                                user.gender === 0 || userLogin.gender === 0
                                                    ? 'radio-button--checked'
                                                    : '',
                                            )}
                                        >
                                            <div className={cx('radio-button__outer-circle')}>
                                                <div className={cx('radio-button__inner-circle')}></div>
                                            </div>
                                        </div>
                                        <div className={cx('gender-group__name')}>Nam</div>
                                    </div>

                                    <div className={cx('gender-group')}>
                                        <div
                                            id="1"
                                            onClick={(e) => handleChecked(e)}
                                            className={cx(
                                                'radio-button',
                                                user.gender === 1 || userLogin.gender === 1
                                                    ? 'radio-button--checked'
                                                    : '',
                                            )}
                                        >
                                            <div className={cx('radio-button__outer-circle')}>
                                                <div className={cx('radio-button__inner-circle')}></div>
                                            </div>
                                        </div>

                                        <div className={cx('gender-group__name')}>Nữ</div>
                                    </div>

                                    <div className={cx('gender-group')}>
                                        <div
                                            id="2"
                                            onClick={(e) => handleChecked(e)}
                                            className={cx(
                                                'radio-button',
                                                user.gender === 2 || userLogin.gender === 2
                                                    ? 'radio-button--checked'
                                                    : '',
                                            )}
                                        >
                                            <div className={cx('radio-button__outer-circle')}>
                                                <div className={cx('radio-button__inner-circle')}></div>
                                            </div>
                                        </div>
                                        <div className={cx('gender-group__name')}>Khác</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>Ngày Sinh</div>
                            <div className={cx('form-content')}>
                                {/* Dropdown dd-mm-yyyy*/}
                                <DropdownDate
                                    selectedDate={
                                        // optional
                                        user.birthday || userLogin.birthday || new Date() // 'yyyy-mm-dd' format only
                                    }
                                    order={[
                                        // optional
                                        DropdownComponent.day,
                                        DropdownComponent.month,
                                        DropdownComponent.year, // Order of the dropdowns
                                    ]}
                                    onDateChange={(date) => {
                                        // optional
                                        // setUser({ date: date, selectedDate: formatDate(date) });
                                        handleChangeBirthday(date);
                                    }}
                                    classes={
                                        // optional
                                        {
                                            dateContainer: cx('dropdown-container'),
                                            yearContainer: cx('dropdown-item'),
                                            monthContainer: cx('dropdown-item'),
                                            dayContainer: cx('dropdown-item'),
                                            year: cx('dropdown-selected'),
                                            month: cx('dropdown-selected'),
                                            day: cx('dropdown-selected'),
                                        }
                                    }
                                // optional
                                // defaultValues={{
                                //     day: 'Select day',
                                //     month: 'Select month',
                                //     year: 'Select year',
                                // }}
                                />
                            </div>
                        </div>

                        <div className={cx('form-group')}>
                            <div className={cx('form-content')}>
                                <Button primary className={cx('btn-save')} onClick={(e) => handleSubmit(e)}>
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={cx('body-right')}>
                    <div className={cx('body-right-wrap')}>
                        <img src={user.photo && user.photo.path} alt="Avatar" className={cx('form-avatar')} />
                        <input ref={inputRef} onChange={handleFileChange} type="file" accept=".jpg,.jpeg,.png" hidden />
                        <Button normal className={cx('btn-upload')} onClick={handleUpload}>
                            Chọn ảnh
                        </Button>
                        <div className={cx('description')}>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
