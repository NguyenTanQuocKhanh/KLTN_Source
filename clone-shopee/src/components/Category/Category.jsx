import classnames from 'classnames/bind';

import Slider from '~/components/Slider';
import { CategoryHeader, CategoryItem } from '.';

import styles from './Category.module.scss';
import stylesCategoryItem from '../Category/CategoryItem/CategoryItem.module.scss';

const cx = classnames.bind(styles);
const cxCategoryItem = classnames.bind(stylesCategoryItem);
function Category({ data = [] }) {
    return (
        <div className={cx('section-category')}>
            <Slider
                CarouselHeaderComponent={CategoryHeader}
                listItem={data}
                step={3}
                defaultInfiniteItems={10}
                CarouselItemComponent={CategoryItem}
                cssCarouselItem={cxCategoryItem('carousel__item')}
                infiniteLoop={true}
            />
        </div>
    );
}

export default Category;
