import axios from 'axios';

const url = {
    baseUrl: "http://localhost:5000",
    user: "/user",
    hotel: '/hotel',
    room: '/room',
    typeRoom: '/typeRoom',
    booking: '/booking'
};

const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': ''
    }
});
instance.interceptors.request.use(
    (req) => {
        if (localStorage.getItem('jwt')) {
            const loginInfoStr = JSON.parse(localStorage.getItem('jwt') || '');
            const auth = loginInfoStr.token ? `Bearer ${loginInfoStr.token}` : '';
            req.headers!["Authorization"] = auth;
        }

        req.data instanceof FormData ? req.headers['Content-Type'] = 'multipart/form-data' : req.headers['Content-Type'] = 'application/json';

        return req;
    },
    (error) => Promise.reject(error)
);

const APIMain = {
    url: url,
    axios: instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
    patch: instance.patch
}

export default APIMain;
