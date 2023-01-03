import classnames from 'classnames/bind';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { toastError } from '~/assets/js/toast-message';
import Button from '~/components/Button';
import ImageUploader from '~/components/ImageUploader';
import RatingStar from '~/components/RatingStar';

//service
import * as reviewService from '~/services/reviewService';

//style
import style from './FormComment.module.scss';
const cx = classnames.bind(style);

function FormComment({ handleClose, products = [] }) {
    const [images, setImages] = useState([]);
    const [productCmt, setProductCmt] = useState([]);

    const handleOnClick = (productId, score) => {
        const currentCmt = productCmt.find((a) => a.productId === productId);
        currentCmt.rating = score;
        setProductCmt((prev) => {
            return [...productCmt.filter((a) => a.productId !== productId), currentCmt];
        });
    };

    const showSatisfaction = (score) => {
        switch (score) {
            case 1:
                return 'Tệ';
            case 2:
                return 'Không hài lòng';
            case 3:
                return 'Bình thường';
            case 4:
                return 'Hài lòng';
            default:
                return 'Tuyệt vời';
        }
    };

    const getColorSatisfaction = (score) => {
        switch (score) {
            case 1:
                return 'red';
            case 2:
                return 'red';
            case 3:
                return '';
            case 4:
                return 'rgb(237, 165, 0)';
            default:
                return 'Green';
        }
    };

    const handleOnChange = (imageList) => {
        setImages(imageList);
    };
    const handleOnError = () => {
        setImages([]);
    };

    const handleSubmit = async () => {
        const req = await reviewService.create(productCmt);
        if (req.status === 200 || req.status === 201) {
            handleClose();
        } else {
            toastError(req.errors.message);
        }
    };

    const handleOnChangeContent = (productId, e) => {
        const currentCmt = productCmt.find((a) => a.productId === productId);
        currentCmt.review = e.target.value;
    };

    useEffect(() => {
        const arr = [];
        products.forEach((item) => {
            arr.push({
                productId: item.id,
                name: item.params.productName,
                imagePath: item.params.imagePath,
                rating: 5,
                review: '',
                files: [],
            });
        });
        setProductCmt(arr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('card-layout', 'form-comment-swap')}>
            {/* header */}
            <div className={cx('form-comment_header')}>Đánh Giá Sản Phẩm</div>

            {/* list product */}
            <div className={cx('form-comment_main')}>
                {productCmt.length > 0 &&
                    productCmt.map((item, index) => (
                        <div className={cx('comment-item')} key={index}>
                            <div className={cx('comment-item_main')}>
                                <div className={cx('item-main-info')}>
                                    <div
                                        className={cx('info_img')}
                                        style={{
                                            backgroundImage: `url(${item.imagePath})`,
                                        }}
                                    ></div>
                                    <div className={cx('info_name')}>{item.name}</div>
                                </div>

                                <div className={cx('item-main-rating')}>
                                    <div className={cx('rating_label')}>
                                        <strong>Chất lượng sản phẩm</strong>
                                    </div>
                                    <div className={cx('rating_star')}>
                                        <RatingStar
                                            size={20}
                                            score={item.rating}
                                            onClick={handleOnClick}
                                            productId={item.productId}
                                        />
                                    </div>
                                    <div
                                        className={cx('rating_satisfaction')}
                                        style={{ color: getColorSatisfaction(item.rating) }}
                                    >
                                        {showSatisfaction(item.rating)}
                                    </div>
                                </div>

                                <div className={cx('item-main-content')}>
                                    <textarea
                                        className={cx('form-control')}
                                        style={{ resize: 'vertical', height: 100, width: '100%' }}
                                        onChange={(e) => handleOnChangeContent(item.productId, e)}
                                    />
                                </div>

                                {/* <ImageUploader images={images} OnChange={handleOnChange} OnError={handleOnError} /> */}
                            </div>
                        </div>
                    ))}
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
