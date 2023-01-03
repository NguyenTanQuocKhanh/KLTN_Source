import { CANCEL, DELIVERING, SUCCESSFUL, PENDING, CHECKBOX_FORM_LOGIN_ID, CHECKBOX_FORM_REGISTER_ID } from '~/commons'

export const obscureString = (string, startIndex, endIndex, char) => {

    if (string) {
        for (let i = startIndex; i <= endIndex; i++) {
            string = string.replace(string[i], char, 1);
        }
    }
    return string;
}

export const handleShowPopupOverplay = (form = 'login', isLogged = false) => {
    const inputElementFormLogin = document.getElementById(CHECKBOX_FORM_LOGIN_ID);
    const inputElementFormRegister = document.getElementById(CHECKBOX_FORM_REGISTER_ID);

    if (isLogged) {
        inputElementFormLogin.checked = false;
        inputElementFormRegister.checked = false;
    } else {
        if (form === 'login') {
            inputElementFormLogin.checked = true;
            inputElementFormRegister.checked = false;
        }
        if (form === 'register') {
            inputElementFormRegister.checked = true;
            inputElementFormLogin.checked = false;
        }
    }
};

export const getParentElement = (element, selector) => {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element = element.parentElement
    }
}

export const formatMoney = (money) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

export const convertStatusOrderCode = (statusOrderCode) => {
    switch (statusOrderCode) {
        case CANCEL:
            return 'đã hủy'
        case PENDING:
            return 'chờ duyệt'
        case DELIVERING:
            return 'đang giao'
        default:
            return 'hoàn thành'
    }
}


