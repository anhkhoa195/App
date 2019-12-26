import fetch from 'isomorphic-fetch';

const baseHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const createRequest = (method, url, requestHeaders = {}, data) => {
    const headers = Object.assign({}, baseHeaders, requestHeaders);
    const options = { headers, method };
    if (data) { options.body = JSON.stringify(data); }

    return new Request(url, options);
};

const responseHandler = async (response) => {
    if (response.ok) {
        const jsonData = await response.json();
        return jsonData.payload;
    } else {
        const error = new Error();
        error.message = response.statusText;
        error.code = response.status;
        throw error;
    }
};

class ApiClient {
    static getData = async (url, headers) => {
        const request = createRequest('GET', url, headers);
        const result = await fetch(request).then(responseHandler);
        return result;
    }
    static postData = async (url, headers, data) => {
        const request = createRequest('POST', url, headers, data);
        const result = await fetch(request).then(responseHandler);
        return result;
    }
    static putData = async (url, headers, data) => {
        const request = createRequest('PUT', url, headers, data);
        const result = await fetch(request).then(responseHandler);
        return result;
    }
    static deleteData = async (url, headers, data) => {
        const request = createRequest('DELETE', url, headers, data);
        const result = await fetch(request).then(responseHandler);
        return result;
    }
}

export default ApiClient;
