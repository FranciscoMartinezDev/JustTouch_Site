import { PublicUrls } from "@/Models/Enums/PublicUrls";
import axios, { AxiosInstance } from "axios";

interface ApiReponse<T> {
    data: T;
    success: boolean;
    status: number;
    error?: string;
}

export class JustTouchClient {
    instance: AxiosInstance;
    private static clientInstance: JustTouchClient;

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_SERVICE_BASE_URL
        })
        this.instance.defaults.headers.post["Content-Type"] = 'application/json'

        this.instance.interceptors.request.use((config) => {
            var isPublic = PublicUrls.some(x => config.url?.includes(x));
            if (!isPublic) {
                config.headers.Authorization = `Bearer ${''}`;
            }
            return config;
        })

        this.instance.interceptors.response.use((config) => {
            if (config.status == 401) {

            }
            return config;
        })
    }

    public static getInstance() {
        if (!JustTouchClient.clientInstance) {
            JustTouchClient.clientInstance = new JustTouchClient();
        }
        return JustTouchClient.clientInstance;
    }

    public async Get<T>(controller: string, endpoint: string): Promise<ApiReponse<T>> {
        const response = await this.instance.get(`${controller}/${endpoint}`);
        return {
            data: response.data,
            status: response.status,
            success: response.status >= 200 && response.status <= 299,
            error: response.statusText
        }
    }

    public async Post<TRequest, TResponse>(controller: string, endpoint: string, payload: TRequest, isForm: boolean = false): Promise<ApiReponse<TResponse>> {
        const response = await this.instance.post(`${controller}/${endpoint}`, payload,
            isForm ? { headers: { 'Content-Type': 'multipart/form-data' } } : {});
        return {
            data: response.data,
            status: response.status,
            success: response.status >= 200 && response.status <= 299,
            error: response.statusText
        }
    }
}