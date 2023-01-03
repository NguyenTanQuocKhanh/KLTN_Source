import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar } from '@fortawesome/free-regular-svg-icons';
import classnames from 'classnames/bind';

import styles from './RatingStar.module.scss';

const cx = classnames.bind(styles);
function RatingStar({ size = 14, score = 0, colorEmpty = '#3c3c3cad', colorFill = 'yellow', onClick, productId }) {
    return (
        <div className={cx('star-list')}>
            <div className={cx('star')}>
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorEmpty, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 1)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorEmpty, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 2)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorEmpty, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 3)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorEmpty, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 4)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorEmpty, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 5)}
                />
            </div>
            <div className={cx('star', 'star--fill')} style={{ width: `${score * size}px` }}>
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorFill, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 1)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorFill, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 2)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorFill, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 3)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorFill, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 4)}
                />
                <FontAwesomeIcon
                    icon={faStar}
                    style={{ color: colorFill, width: size, height: size, cursor: 'pointer' }}
                    onClick={() => onClick(productId, 5)}
                />
            </div>
        </div>
    );
}

export default RatingStar;
