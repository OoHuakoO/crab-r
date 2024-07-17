import axios, {
    AxiosError,
    AxiosRequestConfig,
    InternalAxiosRequestConfig
} from 'axios';

export const apiInstances = axios.create();

const getBaseURL = async () => {
    return `https://crab-r-service.onrender.com`;
};

apiInstances.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        if (config.data instanceof FormData) {
            config.headers.set('Content-Type', 'multipart/form-data');
        } else {
            config.baseURL = await getBaseURL();
            config.responseType = 'json';
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
    const convertData = {
        jsonrpc: '2.0',
        params: {
            ...data
        }
    };
    const res = await apiInstances.post<Response<T>>(url, convertData, config);
    return res.data;
}

export async function put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
): Promise<Response<T>> {
    const convertData = {
        jsonrpc: '2.0',
        params: {
            ...data
        }
    };
    const res = await apiInstances.put<Response<T>>(url, convertData, config);
    return res.data;
}

export async function postDelete<T = any>(
    url: string,
    data?: any
): Promise<Response<T>> {
    const convertData = {
        jsonrpc: '2.0',
        params: {
            ...data
        }
    };
    const res = await apiInstances.delete<Response<T>>(url, {
        data: convertData
    });
    return res.data;
}
