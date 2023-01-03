import * as httpRequest from '~/utils/httpRequest';

export const getAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.get('orders/me', configHeader);
    return res;
};

export const changeStatus = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('orders/change-status', body, configHeader);
    return res;
};

