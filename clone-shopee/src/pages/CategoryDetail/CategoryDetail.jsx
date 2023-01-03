import classNames from 'classnames/bind';

import { CategoryItem } from '~/components/Category';
import Slider from '~/components/Slider';
import stylesCategoryItem from '~/components/Category/CategoryItem/CategoryItem.module.scss';
import SideBarFilter from '~/components/SideBarFilter';
import ResultSearch from '~/components/ResultSearch';
import Banner from '~/components/Banner/Banner';

const cxCategoryItem = classNames.bind(stylesCategoryItem);
function CategoryDetail() {
    const data = [];
    const item = {
        name: 'máy tính & laptop máy tính & laptop máy tính & laptop máy tính & laptop',
        imageURL: 'https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn',
    };
    const total = 17;
    for (let i = 1; i <= total; i++) {
        data.push({ ...item, id: i - 1 });
    }
    return (
        <div className="app__container">
            <div className="grid">
                {/* Banner */}
                <Banner data={[]} />

                {/* Slider */}
                <Slider
                    listItem={data}
                    CarouselItemComponent={CategoryItem}
                    cssCarouselItem={cxCategoryItem('carousel__item')}
                    infiniteLoop={true}
                />

                {/* app__content global */}
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <SideBarFilter />
                    </div>
                    <div className="grid__column-10">
                        <ResultSearch />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryDetail;
