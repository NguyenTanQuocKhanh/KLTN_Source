import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

export function toast({ iconToast = 'fa-solid fa-circle-check', title = 'Success', message = 'Success!', type = 'success', duration = 3000 }) {
    const main = document.getElementById('toast')
    if (main) {
        const toast = document.createElement('div')

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast)
        }, duration + 1000)

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast)
                clearTimeout(autoRemoveId)
            }
        }

        // const icons = {
        //     success: 'fa-solid fa-circle-check',
        //     info: 'fa-solid fa-circle-info',
        //     warning: 'fa-solid fa-circle-exclamation',
        //     error: 'fa-solid fa-circle-exclamation'
        // }
        // const icon = icons[type];
        const delay = (duration / 1000).toFixed(2)


        toast.classList.add('toast', `toast--${type}`)
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`
        toast.innerHTML = `
        <div class='toast__icon'>
           <i class='${iconToast}'></i>
          
        </div>

        <div class='toast__body'>
            <h3 class='toast__title'>${title}</h3>
            <p class='toast__msg'>${message}</p>
        </div>

        <div class='toast__close'>
         <i class="fa-solid fa-xmark"></i>
        </div>
        `
        main.appendChild(toast)
    }
}

export function toastSuccess(message = '') {
    toast({
        iconToast: 'fa-solid fa-circle-check',
        title: 'Success',
        message,
        type: 'success',
        duration: 1000,
    })
}

export function toastInfo(message = '') {
    toast({
        iconToast: 'fa-solid fa-circle-info',
        title: 'Info',
        message,
        type: 'info',
        duration: 1000,
    })
}

export function toastWarning(message = '') {
    toast({
        iconToast: 'fa-solid fa-circle-exclamation',
        title: 'Warning',
        message,
        type: 'warning',
        duration: 1000,
    })
}

export function toastError(message = '') {
    toast({
        iconToast: 'fa-solid fa-circle-exclamation',
        title: 'error',
        message,
        type: 'error',
        duration: 1000,
    })
}

export default toast;