import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function ButtonToTop({ height = 30, top = 0, left = 0, behavior = 'smooth', className }) {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > height) {
            setVisible(true);
        } else if (scrolled <= height) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top,
            left,
            behavior,
        });
    };
    window.addEventListener('scroll', toggleVisible);
    return (
        <button className={className} onClick={scrollToTop} style={{ display: visible ? 'block' : 'none' }}>
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
    );
}

export default ButtonToTop;
