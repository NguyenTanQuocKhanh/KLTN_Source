import classNames from 'classnames/bind';

import Slider from '../Slider';
import { TopSearchHeader, TopSearchItem } from '.';

import styles from './TopSearch.module.scss';
import styleTopSearchItem from '../TopSearch/TopSearchItem/TopSearchItem.module.scss';

const cx = classNames.bind(styles);
const cxTopSearchItem = classNames.bind(styleTopSearchItem);
function TopSearch({ data = [] }) {
    return (
        <div className={cx('section-top-search')}>
            {data.length && (
                <Slider
                    CarouselHeaderComponent={TopSearchHeader}
                    listItem={data}
                    step={5}
                    defaultInfiniteItems={6}
                    CarouselItemComponent={TopSearchItem}
                    cssCarouselItem={cxTopSearchItem('carousel__item')}
                />
            )}
        </div>
    );
}

export default TopSearch;
