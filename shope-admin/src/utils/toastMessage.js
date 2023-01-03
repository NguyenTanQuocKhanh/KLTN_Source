import { toast } from 'react-toastify';

const notify = (type, message = 'Info', autoClose = 1000) => {
    const config = {
        position: "top-right",
        autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    switch (type) {
        case 'success':
            toast.success(message, config);
            break;
        case 'warning':
            toast.warning(message, config);
            break;
        case 'error':
            toast.error(message, config);
            break;
        default:
            toast.info(message, config);
            break;
    }
};
export default notify;