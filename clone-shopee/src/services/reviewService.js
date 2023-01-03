import * as httpRequest from '~/utils/httpRequest';

export const create = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('reviews', body, configHeader);
    return res;
};

