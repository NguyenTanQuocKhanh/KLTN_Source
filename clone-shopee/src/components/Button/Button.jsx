import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    labelFor,
    primary = false,
    normal = false,
    outline = false,
    disabled = false,
    border = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    } else if (labelFor) {
        props.htmlFor = labelFor;
        Comp = 'label';
    }
    const classes = cx('btn', {
        [className]: className,
        primary,
        normal,
        outline,
        disabled,
        border,
        small,
        large,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon}
            {children}
            {rightIcon}
        </Comp>
    );
}
Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    labelFor: PropTypes.string,
    primary: PropTypes.bool,
    normal: PropTypes.bool,
    outline: PropTypes.bool,
    disabled: PropTypes.bool,
    border: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};
export default Button;
