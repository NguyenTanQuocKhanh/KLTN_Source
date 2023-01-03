import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 20000,
});

// có async sẽ trả về promise
export const get = async (path, body = {}) => {
    try {
        const response = await httpRequest.get(path, body);
        const { data, status } = response;
        return { data, status };
    } catch (error) {
        const { errors, statusCode } = error.response.data;
        return { errors, status: statusCode };
    }
};

export const post = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.post(path, body, config);
        const { data, status } = response;
        return { data, status };
    } catch (error) {
        const { errors, statusCode } = error.response.data;
        return { errors, status: statusCode };
    }
};

export const patch = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.patch(path, body, config);
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
