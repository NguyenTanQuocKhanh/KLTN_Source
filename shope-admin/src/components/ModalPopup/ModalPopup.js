import classnames from 'classnames/bind';

import styles from './ModalPopup.module.scss';

const cx = classnames.bind(styles);
function ModalPopup({ hidden = true }) {
    return (
        <div className={cx('modalLogin')} hidden={hidden}>
            <label htmlFor={'checkbox_modal_id'} className={cx('modal_overlay')}></label>
            <div id="modal-body" className={cx('modal__body')}>
                <span className={cx('loader')}></span>
            </div>
        </div>
    );
}

export default ModalPopup;
