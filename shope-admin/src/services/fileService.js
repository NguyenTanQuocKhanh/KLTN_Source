import * as httpRequest from '~/utils/httpRequest';

export const upload = async (data) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await httpRequest.post('files/upload', data, configHeader);
    return res;
};

export const uploadMultiFile = async (data) => {
    const token = JSON.parse(localStorage.getItem('token')) || null;
    const configHeader = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await httpRequest.post('files/uploads', data, configHeader);
    return res;
};
