import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import styles from './Breadcrumb.module.scss';


const cx = classnames.bind(styles);
function Breadcrumb(props) {
    const breadcrumbs = [];
    for (let i = 0; i < 5; i++) {
        breadcrumbs.push({ id: i, content: 'Shope', url: '/' });
    }
    return (
        <div className={cx('breadcrumb-swapper')}>
            {breadcrumbs.map((item, index) => {
                if (index < breadcrumbs.length - 1) {
                    return (
                        <Fragment key={index}>
                            <Link to="/" className={cx('breadcrumb-link')}>
                                {item.content}
                            </Link>
                            <FontAwesomeIcon icon={faAngleRight} className={cx('breadcrumb-icon')} />
                        </Fragment>
                    );
                } else {
                    return <div key={index} className={cx('breadcrumb-link', 'disable')}>{item.content}</div>;
                }
            })}
        </div>
    );
}

export default Breadcrumb;
