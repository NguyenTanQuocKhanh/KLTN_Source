import { faAngleLeft, faAngleRight, faStar, faThumbsUp, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';

import { Link } from 'react-router-dom';
import Button from '../Button';
import RatingStar from '../RatingStar';
import styles from './FilterComment.module.scss';
import { useRef } from 'react';
import { createRef } from 'react';
import { useEffect } from 'react';
import CarouselCustom from '../Carousel';
import Slider from '../Slider';
import styleTopSearchItem from '../TopSearch/TopSearchItem/TopSearchItem.module.scss';
import { TopSearchItem } from '../TopSearch';
import Banner from '../Banner/Banner';

const cx = classnames.bind(styles);
const cxTopSearchItem = classnames.bind(styleTopSearchItem);
function FilterComment() {
    const listStar = [];
    for (let i = 0; i < 5; i++) {
        listStar.push({ id: i, name: 'Sao' });
    }
    const object = {
        userName: 'khanhtq123',
        rating: 5,
        date: '2022-03-30 22:54',
        content: 'Giá đỡ khá chắc chắn, mua về để laptop cho đở mỏi lưng',
        medias: [
            { url: 'https://ecomerce-shoppe.herokuapp.com/api/v1/files/69f1c42e-7360-421a-ba6d-ec84b3ebde78.jpg' },
            { url: 'https://play-ws.vod.shopee.com/c3/98934353/103/A3oxOAihAOwQjfgIER0FACc.mp4' },
        ],
        likes: 4,
    };
    const data = [];
    const item = {
        url: 'data:image/jpeg;base64,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',
    };
    const total = 5;
    for (let i = 1; i <= total; i++) {
        data.push({ ...item, id: i });
    }

    const items = [];
    items.push({
        id: 0,
        name: 'Balo nam nữ giá rẻ, thời trang đi học nhiều ngăn siêu nhẹ phong cách ulzzang, đẹp đựng laptop ULZ015',
        imageURL: 'https://play-ws.vod.shopee.com/c3/98934353/103/A3oxOAihAOwQjfgIER0FACc.mp4',
        price: 200000,
        sale: 20,
        sold: '12k', //12k
    });

    for (let i = 1; i < 2; i++) {
        items.push({
            id: i,
            name: 'Balo nam nữ giá rẻ, thời trang đi học nhiều ngăn siêu nhẹ phong cách ulzzang, đẹp đựng laptop ULZ015',
            imageURL: 'https://ecomerce-shoppe.herokuapp.com/api/v1/files/69f1c42e-7360-421a-ba6d-ec84b3ebde78.jpg',
            price: 200000,
            sale: 20,
            sold: '12k', //12k
        });
    }

    return (
        <div className="card-layout">
            <div className={cx('product-detail__description')}>
                <div className={cx('description-header')}>ĐÁNH GIÁ SẢN PHẨM</div>
                <div className={cx('description-content')}>
                    <div className={cx('product-rating-overview')}>
                        <div className={cx('product-rating-overview__briefing')}>
                            <div className={cx('product-rating__score-swapper')}>
                                <span className={cx('product-rating__score')}>4.3 </span>
                                trên 5
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <RatingStar size={20} score={4} colorFill="#ee4d2d" />
                            </div>
                        </div>
                        <div className={cx('product-rating-overview__filters')}>
                            <Button
                                normal
                                border
                                className={cx('filter-star__item')} //'filter-star__item--active'
                            >
                                Tất Cả
                            </Button>
                            {listStar.map((item, index) => (
                                <Button
                                    key={index}
                                    normal
                                    border
                                    className={cx('filter-star__item')} //'filter-star__item--active'
                                >
                                    {item.id} {item.name} {item.id + 1}
                                </Button>
                            ))}
                            <Button
                                normal
                                border
                                className={cx('filter-star__item', 'filter-star__item--active')} //'filter-star__item--active'
                            >
                                Có Bình Luận (3)
                            </Button>
                            <Button
                                normal
                                border
                                className={cx('filter-star__item')} //'filter-star__item--active'
                            >
                                Có Hình Ảnh/Video (2)
                            </Button>
                        </div>
                    </div>

                    {/* comment */}
                    {listStar &&
                        listStar.map((item, index) => (
                            <div key={index} className={cx('product-rating-comment-list')}>
                                <div className={cx('product-rating-comment')}>
                                    <a href="/" className={cx('product-rating-comment__avatar')}>
                                        <img
                                            src="https://cf.shopee.vn/file/ce18a46cd7604dae55be703ba45c8e8d_tn"
                                            alt="avatar"
                                        />
                                    </a>
                                    <div className={cx('product-rating-comment__main')}>
                                        <a href="/" className={cx('product-rating-comment__author')}>
                                            {object.userName}
                                        </a>
                                        <div style={{ marginTop: 2 }}>
                                            <RatingStar score={object.rating} colorFill="#ee4d2d" />
                                        </div>

                                        <div className={cx('product-rating-comment__time')}> {object.date}</div>
                                        <div className={cx('product-rating-comment__content')}>{object.content}</div>
                                        <div className={cx('product-rating-comment__media-image-list-swapper')}>
                                            <div className={cx('rating-media-list')}>
                                                {/* <div className={cx('rating-media-list__container')}>
                                                    {object.medias.map((item, index) =>
                                                        checkURL(item.url) ? (
                                                            <div
                                                                key={index}
                                                                className={cx(
                                                                    'rating-media-list__image-wrapper',
                                                                    'rating-media-list__image-wrapper--inactive',
                                                                )}
                                                            >
                                                                <img
                                                                    src={item.url}
                                                                    alt="avatar"
                                                                    className={cx('rating-media-list-image__wrapper')}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                key={index}
                                                                className={cx(
                                                                    'rating-media-list__image-wrapper',
                                                                    'rating-media-list__image-wrapper--inactive',
                                                                )}
                                                            >
                                                                <video
                                                                    className={cx('rating-media-list-image__wrapper')}
                                                                    alt="All the devices"
                                                                    src={item.url}
                                                                />

                                                                <div className={cx('rating-media-list__video-cover')}>
                                                                    <FontAwesomeIcon icon={faVideo} />
                                                                    <span>0:07</span>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                </div> */}
                                                <div className={cx('rating-media-list__zoom-image')}>
                                                    {/* <Carousel/> */}
                                                    {/* <Banner type="carousel" data={data} height={400} autoPlay={false}/> */}
                                                    {/* <CarouselCustom
                                                        items={items}
                                                        defaultItems={5}
                                                        imageTop={false}
                                                        popup={true}
                                                        height="100%"
                                                    /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('product-rating-comment__action')}>
                                            <div
                                                className={cx(
                                                    'product-rating-comment__like-button',
                                                    'product-rating-comment__like-button--active',
                                                )}
                                            >
                                                <FontAwesomeIcon icon={faThumbsUp} />
                                            </div>
                                            <div className={cx('product-rating-comment__like-count')}>
                                                {object.likes}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    {/* <!-- Pagination --> */}
                    <ul className={cx('pagination', 'pagination-wrapper')}>
                        <li className="pagination-item ">
                            <Link to="/" className="pagination-item__link">
                                <FontAwesomeIcon icon={faAngleLeft} className="pagination-item__icon" />
                            </Link>
                        </li>
                        <li className="pagination-item pagination-item--active">
                            <Link to="/" className="pagination-item__link">
                                1
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                2
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                3
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                4
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                5
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                <FontAwesomeIcon icon={faAngleRight} className="pagination-item__icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FilterComment;
