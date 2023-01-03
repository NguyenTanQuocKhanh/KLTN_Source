import * as httpRequest from '~/utils/httpRequest';
const token = JSON.parse(localStorage.getItem('token')) || null;

export const searchHint = async (params = {}) => {
    const res = await httpRequest.get('products/search-hint', {
        params
    });
    return res;
};

export const searching = async (body = {}, params = {}) => {
    const configHeader = {
        params
    }
    const res = await httpRequest.post('products/searching', body, configHeader);
    return res;
};

export const topSearch = async () => {
    const res = await httpRequest.get('products/top-search');
    return res;
};

export const topSold = async (body = {}, params = {}) => {
    const configHeader = {
        params
    }
    const res = await httpRequest.post('products/top-sold', body, configHeader);
    return res;
};

export const getProductById = async (id) => {
    const res = await httpRequest.get('products/' + id);
    return res;
};

export const like = async (id) => {
    const configHeader = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post(`products/${id}/like`, {}, configHeader);
    return res;
};

export const unLike = async (id) => {
    const configHeader = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post(`products/${id}/unlike`, {}, configHeader);
    return res;
};