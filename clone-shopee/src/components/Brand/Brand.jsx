import classnames from 'classnames/bind';

import { BrandHeader } from './BrandHeader';
import styleBrandItem from '../Brand/BrandItem/BrandItem.module.scss';
import styles from './Brand.module.scss';
import Slider from '../Slider';
import Banner from '../Banner/Banner';
import BrandItem from './BrandItem/BrandItem';

const cx = classnames.bind(styles);
const cxBrandItemItem = classnames.bind(styleBrandItem);
function Brand({ listBanner = [] }) {
    const data = [];
    const item = {
        name: 'Giảm tới 10%',
        imageURL: 'https://cf.shopee.vn/file/7de40171008ed7ab10b6236928b0a161_xhdpi',
    };
    const total = 15;
    for (let i = 1; i <= total; i++) {
        data.push({ ...item, id: i });
    }
    return (
        <div className={cx('section-brand')}>
            <BrandHeader />
            <div className={cx('body')}>
                <div className={cx('body-right')}>
                    <Banner type="carousel" data={listBanner} height={551} showIndicators={true} />
                </div>
                <div className={cx('body-left')}>
                    {data.length && (
                        <Slider
                            listItem={data}
                            step={3}
                            defaultInfiniteItems={4}
                            CarouselItemComponent={BrandItem}
                            cssCarouselItem={cxBrandItemItem('carousel__item')}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Brand;
