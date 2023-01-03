import { faAngleLeft, faAngleRight, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { useEffect } from 'react';
import { useRef, useState } from 'react';

import styles from './Carousel.module.scss';

const cx = classnames.bind(styles);
function Carousel({
    items = [],
    currentIndexThumb = 0,
    keyMap = '',
    defaultItems,
    imageTop = true,
    showArrowButton = true,
    loop = true,
    popup = false,
    height,
    thumbWidth = 82,
}) {
    const listImage = useRef(null);
    const btnLeft = useRef(null);
    const btnRight = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(currentIndexThumb);
    const [showPopup, setShowPopup] = useState(() => {
        return !popup;
    });

    const handleClickNext = (step) => {
        setCurrentIndex((prevState) => {
            let newIndex = prevState + step;
            if (!loop) {
                if (newIndex === items.length - 1) {
                    btnRight.current.style.display = 'none';
                } else if (newIndex === 0) {
                    btnLeft.current.style.display = 'none';
                }
            } else if (newIndex > items.length - 1) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = items.length - 1;
            }
            if (newIndex > 0 && newIndex < items.length - 1) {
                btnLeft.current.style.display = 'inline-flex';
                btnRight.current.style.display = 'inline-flex';
            }
            return newIndex;
        });
    };
    function checkURL(url) {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }
    const handleTransform = () => {
        if (currentIndex + 1 > defaultItems) {
            return `translate(${-(currentIndex - defaultItems + 1) * (thumbWidth + 10)}px)`;
        }
    };

    const handleShowPopup = (index) => {
        if (popup && currentIndex === index) {
            setShowPopup(!showPopup);
        } else {
            setShowPopup(true);
        }
    };

    useEffect(() => {
        if (!loop) {
            btnLeft.current.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className={cx('carousel-swapper')}
            style={{ display: 'flex', flexDirection: imageTop ? 'column' : 'column-reverse' }}
        >
            <div style={{ display: showPopup ? 'block' : 'none' }}>
                {imageTop ? (
                    checkURL(items[currentIndex][keyMap]) ? (
                        <img src={items[currentIndex][keyMap]} alt="images" className={cx('left-image')} />
                    ) : (
                        <video
                            className={cx('left-image')}
                            controls
                            autoPlay
                            playsInline
                            loop
                            muted
                            alt="All the devices"
                            src={items[currentIndex][keyMap]}
                            style={{ height }}
                        />
                    )
                ) : checkURL(items[currentIndex][keyMap]) ? (
                    <img src={items[currentIndex][keyMap]} alt="images" className={cx('left-image')} />
                ) : (
                    <video
                        className={cx('left-image')}
                        controls
                        autoPlay
                        playsInline
                        loop
                        muted
                        alt="All the devices"
                        src={items[currentIndex][keyMap]}
                        style={{ height }}
                    />
                )}
            </div>
            <div className={cx('left-image-list-swapper')}>
                <ul ref={listImage} className={cx('left-image-list')} style={{ transform: handleTransform() }}>
                    {items.map((item, index) =>
                        checkURL(item[keyMap]) ? (
                            <img
                                key={index}
                                src={item[keyMap]}
                                alt="images"
                                className={cx(
                                    'left-image-list__item', // && popup
                                    currentIndex === index && showPopup ? 'left-image-list__item--active' : null,
                                )}
                                width={thumbWidth}
                                height={thumbWidth}
                                onClick={() => {
                                    handleShowPopup(index);
                                    setCurrentIndex(index);
                                }}
                            />
                        ) : (
                            <video
                                key={index}
                                className={cx(
                                    'left-image-list__item',
                                    currentIndex === index && showPopup ? 'left-image-list__item--active' : null,
                                )}
                                alt="All the devices"
                                src={item[keyMap]}
                                width={thumbWidth}
                                height={thumbWidth}
                                onClick={() => {
                                    handleShowPopup(index);
                                    setCurrentIndex(index);
                                }}
                            />
                        ),
                    )}
                </ul>
                {showArrowButton && (
                    <>
                        <div
                            ref={btnLeft}
                            className={cx('arrow-btn', 'arrow-btn__left')}
                            onClick={() => handleClickNext(-1)}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div ref={btnRight} className={cx('arrow-btn', 'arrow-btn__right')}>
                            <FontAwesomeIcon icon={faAngleRight} onClick={() => handleClickNext(1)} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Carousel;
