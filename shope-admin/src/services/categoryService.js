import * as httpRequest from '~/utils/httpRequest';

export const getAll = async (body = {}, params = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        params,
    };
    const res = await httpRequest.post('categories/paging', body, configHeader);
    return res;
};

export const getCategoryById = async (id) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await httpRequest.get('categories/' + id, configHeader);
    return res;
};

export const remove = async (id) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await httpRequest.remove('categories/' + id, configHeader);
    return res;
};

export const create = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await httpRequest.post('categories/', body, configHeader);
    return res;
};

export const update = async (body = {}) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const res = await httpRequest.patch('categories/' + body.id, body, configHeader);
    return res;
};
