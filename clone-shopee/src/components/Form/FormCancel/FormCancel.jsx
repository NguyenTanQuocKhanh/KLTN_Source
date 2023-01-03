//react component
import classnames from 'classnames/bind';
import { useRef } from 'react';

//custom component
import Button from '~/components/Button';
import { CANCEL } from '~/commons';

//service
import * as orderService from '~/services/orderService';

//style
import style from './FormCancel.module.scss';
import { toastError } from '~/assets/js/toast-message';
const cx = classnames.bind(style);

function FormComment({ order, handleClose, fetchData }) {
    const inputText = useRef();
    const handleSubmit = async () => {
        const body = {
            orderId: order.id,
            status: CANCEL,
            note: inputText.current.value,
        };
        const req = await orderService.changeStatus(body);
        console.log(req);
        if (req.status === 200 || req.status === 201) {
            fetchData();
            handleClose();
        } else {
            toastError(req.errors.message);
        }
    };
    return (
        <div className={cx('card-layout', 'form-comment-swap')}>
            {/* header */}
            <div className={cx('form-comment_header')}>
                <strong>Lý do</strong>
            </div>

            {/* content */}
            <div className={cx('form-comment_main')}>
                <div className={cx('comment-item')}>
                    <div className={cx('comment-item_main')}>
                        <div className={cx('item-main-content')}>
                            <textarea
                                ref={inputText}
                                className={cx('form-control')}
                                style={{ resize: 'vertical', height: 100, width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* footer control */}
            <div className={cx('form-comment_footer')}>
                <Button normal onClick={handleClose}>
                    TRỞ LẠI
                </Button>
                <Button primary onClick={handleSubmit}>
                    Hoàn Thành
                </Button>
            </div>
        </div>
    );
}

export default FormComment;
