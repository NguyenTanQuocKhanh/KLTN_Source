import * as httpRequest from '~/utils/httpRequest';

export const create = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('carts/add', body, configHeader);
    return res;
};

export const getAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('carts/me', {}, configHeader);
    return res;
};

export const remove = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('carts/delete-product', body, configHeader);
    return res;
};

export const updateQuantity = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('carts/update-quantity', body, configHeader);
    return res;
};