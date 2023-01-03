import * as httpRequest from '~/utils/httpRequest';
const token = JSON.parse(localStorage.getItem('token')) || null;

export const patch = async (userId, userUpdate) => {
    const configHeader = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const res = await httpRequest.patch('users/' + userId, { ...userUpdate }, configHeader);
    return res;
};

