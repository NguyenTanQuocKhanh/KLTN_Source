import * as httpRequest from '~/utils/httpRequest';
const token = JSON.parse(localStorage.getItem('token')) || null;

export const upload = async (data) => {
    const configHeader = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.post('files/upload', data, configHeader);
    return res;
};