import * as httpRequest from '~/utils/httpRequest';
const token = JSON.parse(localStorage.getItem('token')) || null;

export const getAll = async () => {
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.get('categories', configHeader);
    return res;
};

export const getCategoryById = async (id) => {
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const res = await httpRequest.get('categories/' + id, configHeader);
    return res;
};