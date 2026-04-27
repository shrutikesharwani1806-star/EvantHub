import axios from 'axios';

const axiosInstance = axios.create();

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use((config) => {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        // Do not overwrite if it is already provided (e.g. some manual authService headers)
        if (user && user.token && !config.headers['Authorization'] && !config.headers['authorization']) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If the error is 401 and we haven't retried yet, and it's not the login/register/refresh endpoints
        if (
            error.response && 
            error.response.status === 401 && 
            !originalRequest._retry && 
            originalRequest.url !== '/api/auth/login' && 
            originalRequest.url !== '/api/auth/register' &&
            originalRequest.url !== '/api/auth/refresh'
        ) {
            originalRequest._retry = true;
            try {
                const userString = localStorage.getItem('user');
                if (userString) {
                    const user = JSON.parse(userString);
                    if (user && user.refreshToken) {
                        // Attempt to refresh the token using standard axios to avoid infinite loops
                        const response = await axios.post('/api/auth/refresh', { refreshToken: user.refreshToken });
                        const { token } = response.data;
                        
                        // Update user object in localStorage with new token
                        user.token = token;
                        localStorage.setItem('user', JSON.stringify(user));
                        
                        // Update the original request's authorization header and retry
                        if (originalRequest.headers['authorization']) {
                            originalRequest.headers['authorization'] = `Bearer ${token}`;
                        } else {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        }
                        
                        return axiosInstance(originalRequest);
                    }
                }
            } catch (err) {
                // If refresh fails (e.g., refresh token expired), clear the user from storage and redirect to login
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
