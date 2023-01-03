import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
});

// có async sẽ trả về promise
export const get = async (path, option = {}) => {
    try {
        const response = await httpRequest.get(path, option);
        const { data, status } = response;
        return { data, status };
    } catch (error) {
        const { errors, statusCode } = error.response.data;
        return { errors, status: statusCode };
    }
};

export const post = async (path, option = {}, config = {}) => {
    try {
        const response = await httpRequest.post(path, option, config);
        const { data, status } = response;
        return { data, status };
    } catch (error) {
        const { errors, statusCode } = error.response.data;
        return { errors, status: statusCode };
    }
};

export const patch = async (path, option = {}, config = {}) => {
    try {
        const response = await httpRequest.patch(path, option, config);
        const { data, status } = response;
        return { data, status };
    } catch (error) {
        const { errors, statusCode } = error.response.data;
        return { errors, status: statusCode };
    }
};

export const remove = async (path, config = {}) => {
    try {
        const response = await httpRequest.delete(path, config);
        const { data, status } = response;
        return { data, status };
    } catch (error) {
        const { errors, statusCode } = error.response.data;
        return { errors, status: statusCode };
    }
};

export default httpRequest;
