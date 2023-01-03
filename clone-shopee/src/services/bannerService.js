import * as httpRequest from '~/utils/httpRequest';
const token = JSON.parse(localStorage.getItem('token')) || null;

export const getAll = async () => {
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.get('banners', configHeader);
    return res;
};