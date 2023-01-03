import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Slider.module.scss';
import { useEffect } from 'react';

const cx = classnames.bind(styles);
function Slider({
    CarouselHeaderComponent = null,
    listItem = [],
    step = 1,
    defaultInfiniteItems = 5,
    CarouselItemComponent,
    infiniteLoop = false,
    cssCarouselItem = require,
}) {
    const $ = document.querySelector.bind(document);
    useEffect(() => {
        if ($(`.${cssCarouselItem}`)) {
            function parseToCss(className) {
                return `.${cx(`${className}`)}`;
            }
            function getParentElement(element, selector) {
                while (element.parentElement) {
                    if (element.parentElement.matches(selector)) {
                        return element.parentElement;
                    }
                    element = element.parentElement;
                }
            }
            const el = getParentElement($(`.${cssCarouselItem}`), `.${cx('category-swapper')}`);
            const btnNext = el.querySelector(parseToCss('carousel-arrow--next'));
            const btnPrev = el.querySelector(parseToCss('carousel-arrow--previous'));
            const carouselListEl = el.querySelector(`.${cssCarouselItem}`).parentNode;

            const carouselItemWidth = +(100 / defaultInfiniteItems).toFixed(4);
            // set percent width for item
            const itemEls = el.querySelectorAll(`.${cssCarouselItem}`);
            itemEls.forEach((element) => {
                element.style.width = `${carouselItemWidth}%`;
            });
            const total = itemEls.length;
            // set percent width for list
            carouselListEl.style.width = `${carouselItemWidth * total}%`;
            // ==========================

            const div = Math.floor((total - defaultInfiniteItems) / step);
            const mod = (total - defaultInfiniteItems) % step;

            const positionDefault = defaultInfiniteItems - 1;
            let position = positionDefault;

            function handleHiddenBtnControl() {
                if (listItem.length <= defaultInfiniteItems) {
                    btnPrev.style.display = 'none';
                    btnNext.style.display = 'none';
                } else {
                    switch (position) {
                        case defaultInfiniteItems - 1:
                            if (infiniteLoop) {
                                btnPrev.style.display = 'flex';
                                btnNext.style.display = 'flex';
                            } else {
                                btnPrev.style.display = 'none';
                                btnNext.style.display = 'flex';
                            }
                            break;
                        case total - 1:
                            if (infiniteLoop) {
                                btnPrev.style.display = 'flex';
                                btnNext.style.display = 'flex';
                            } else {
                                btnPrev.style.display = 'flex';
                                btnNext.style.display = 'none';
                            }
                            break;
                        default:
                            btnPrev.style.display = 'flex';
                            btnNext.style.display = 'flex';
                            break;
                    }
                }
            }
            handleHiddenBtnControl();

            btnNext.addEventListener('click', function (e) {
                if (total > defaultInfiniteItems) {
                    handleCarouselNext();
                    handleCarouselChange();
                }
            });

            btnPrev.addEventListener('click', function (e) {
                if (total > defaultInfiniteItems) {
                    handleCarouselPrev();
                    handleCarouselChange();
                }
            });

            let itemRight = total - defaultInfiniteItems;
            let itemLeft = 0;

            function setPosition() {
                position = total - itemRight - 1;
            }

            function handleCarouselNext() {
                if (itemRight === 0) {
                    itemRight = total - defaultInfiniteItems;
                } else if (div === 0) {
                    itemRight -= mod;
                } else if (itemRight !== mod) {
                    itemRight -= step;
                } else if (itemRight === mod) {
                    itemRight = 0;
                }
                itemLeft = total - defaultInfiniteItems - itemRight;
                setPosition();
            }

            function handleCarouselPrev() {
                itemLeft = total - defaultInfiniteItems - itemRight;
                if (itemLeft === 0) {
                    itemLeft = total - defaultInfiniteItems;
                } else if (div === 0) {
                    itemLeft -= mod;
                } else if (itemLeft !== mod) {
                    itemLeft -= step;
                } else if (itemLeft === mod) {
                    itemLeft = 0;
                }
                itemRight = total - defaultInfiniteItems - itemLeft;
                setPosition();
            }

            function handleCarouselChange() {
                handleHiddenBtnControl();
                const width = (position - (defaultInfiniteItems - 1)) * itemEls[0].offsetWidth;
                carouselListEl.style.transform = `translateX(${-width}px)`;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listItem]);
    return (
        <div className={cx('category-swapper')}>
            {CarouselHeaderComponent && <CarouselHeaderComponent />}
            {/* content */}
            {listItem.length && (
                <div className={cx('category-content')}>
                    <div className={cx('carousel')}>
                        {/* list category swapper*/}
                        <div className={cx('carousel-swapper')}>
                            <ul className={cx('carousel-list')}>
                                {/* component carousel item here */}
                                {listItem.map((item, index) => (
                                    <CarouselItemComponent key={index} item={item} data-index={index} />
                                ))}
                            </ul>
                        </div>

                        {/* button prev */}
                        <div className={cx('carousel-arrow', 'carousel-arrow--previous')}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>

                        {/* button next */}
                        <div className={cx('carousel-arrow', 'carousel-arrow--next')}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Slider;
