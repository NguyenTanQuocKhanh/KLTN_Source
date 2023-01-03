import * as httpRequest from '~/utils/httpRequest';
const token = JSON.parse(localStorage.getItem('token')) || null;

export const login = async (userLogin) => {
    const res = await httpRequest.post('auth/email/login', { ...userLogin });
    return res;
};

export const register = async (userRegister) => {
    const res = await httpRequest.post('auth/email/register', { ...userRegister });
    return res;
};

export const confirmEmail = async (hash) => {
    const res = await httpRequest.post('auth/email/confirm', { ...hash });
    return res;
};

export const update = async (userUpdate) => {
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.patch('auth/me', { ...userUpdate }, configHeader);
    return res;
};