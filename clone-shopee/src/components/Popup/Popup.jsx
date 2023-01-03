import classnames from 'classnames/bind';

import styles from './Popup.module.scss';
const cx = classnames.bind(styles);

function Popup({ FormComponent, isShow = false }) {
    if (isShow) {
        return (
            <div className={cx('modal')}>
                <label className={cx('modal_overlay')}></label>
                <div id="modal-body" className={cx('modal__body')}>
                    {FormComponent}
                </div>
            </div>
        );
    }
    return null;
}

export default Popup;
