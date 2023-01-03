import classnames from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import styles from './Banner.module.scss';

const cx = classnames.bind(styles);
function Banner({
    type = 'main',
    data = [],
    height = 240,
    showStatus = false,
    showThumbs = false,
    infiniteLoop = false,
    autoPlay = true,
    showIndicators = false,
}) {
    const sliders = data.filter((item) => item.type === 1);
    const rightBanners = data.filter((item) => item.type === 2);

    switch (type) {
        case 'carousel':
            return (
                <div className={cx('banner-swapper')}>
                    <div className={cx('banner-carousel')}>
                        <Carousel
                            showStatus={showStatus}
                            showThumbs={showThumbs}
                            infiniteLoop={infiniteLoop}
                            autoPlay={autoPlay}
                            showIndicators={showIndicators}
                        >
                            {data &&
                                data.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cx('banner-carousel-item')}
                                        style={{
                                            backgroundImage: `url(${item.url.replace('\\', '/')})`,
                                            height,
                                        }}
                                    ></div>
                                ))}
                        </Carousel>
                    </div>
                </div>
            );
        case 'horizontal':
            return (
                <div className={cx('banner-container')}>
                    {data &&
                        data.map((item, index) => (
                            <img key={index} src={item.url.replace('\\', '/')} alt="images" className={cx('banner-section')} />
                        ))}
                </div>
            );
        default:
            return (
                <div className={cx('banner-swapper')}>
                    <div className={cx('banner-carousel')}>
                        <Carousel
                            showStatus={showStatus}
                            showThumbs={showThumbs}
                            infiniteLoop={infiniteLoop}
                            autoPlay={autoPlay}
                        >
                            {sliders &&
                                sliders.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cx('banner-carousel-item')}
                                        style={{
                                            backgroundImage: `url(${item.url.replace('\\', '/')})`,
                                            height,
                                        }}
                                    ></div>
                                ))}
                        </Carousel>
                    </div>

                    <div className={cx('side-banner')}>
                        {rightBanners &&
                            rightBanners.map((item, index) => (
                                <img key={index} className={cx('side-banner-item')} src={item.url.replace('\\', '/')} alt="images" />
                            ))}
                    </div>
                </div>
            );
    }
}

export default Banner;
