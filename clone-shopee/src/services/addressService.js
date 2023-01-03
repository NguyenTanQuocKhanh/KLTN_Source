import * as httpRequest from '~/utils/httpRequest';

export const create = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('address', body, configHeader);
    return res;
};

export const update = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.patch('address/' + body.id, body, configHeader);
    return res;
};

export const remove = async (id) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.remove('address/' + id, configHeader);
    return res;
};

export const getAll = async () => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.get('address', configHeader);
    return res;
};
