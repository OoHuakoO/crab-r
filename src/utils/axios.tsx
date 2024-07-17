import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
    AxiosError,
    AxiosRequestConfig,
    InternalAxiosRequestConfig
} from 'axios';

export const apiInstances = axios.create();

const getToken = async () => {
    const token = await AsyncStorage.getItem('Token');
    const jsonToken = JSON.parse(token);
    return jsonToken || '';
};

apiInstances.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        config.baseURL = `https://crab-r-service.onrender.com`;
        config.responseType = 'json';
        config.headers.set('Authorization', `Bearer ${getToken()}`);
        if (config.data instanceof FormData) {
            config.headers.set('Content-Type', 'multipart/form-data');
        } else {
            config.headers.set(
                'content-type',
                'application/json;charset=UTF-8'
            );
        }
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export interface Response<T = any> {
    data?: T;
    status?: number;
}

export async function get<T = any>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
): Promise<Response<T>> {
    const res = await apiInstances.get<Response<T>>(url, config);
    return res.data;
}

export async function post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
): Promise<Response<T>> {
    const res = await apiInstances.post<Response<T>>(url, data, config);
    return res.data;
}

export async function put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
): Promise<Response<T>> {
    const res = await apiInstances.put<Response<T>>(url, data, config);
    return res.data;
}

export async function postDelete<T = any>(
    url: string,
    data?: any
): Promise<Response<T>> {
    const res = await apiInstances.delete<Response<T>>(url, {
        data: data
    });
    return res.data;
}
