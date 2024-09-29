import axios from 'axios';

export const Axios = axios.create({
    baseURL: 'https://mern-assignment-theta.vercel.app/api', // Set your API base URL here
    withCredentials: true
});

Axios.interceptors.response.use(
    (response) => response,
    async (err) => {
        console.log(err)
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.get('https://mern-assignment-theta.vercel.app/api/access-token', {
                    withCredentials: true
                });
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                return Axios(originalRequest)
            } catch (error) {
                console.error('Failed to refresh token:', refreshError);
                window.location.href = '/login'; // Redirect to login if refresh fails
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(err)
    }
)