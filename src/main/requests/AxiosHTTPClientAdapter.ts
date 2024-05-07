import IHTTPClient from "./IHTTPClient";
import axios, {AxiosInstance} from "axios";

class AxiosHTTPClientAdapter implements IHTTPClient {
    private client: AxiosInstance;
    private static instance: AxiosHTTPClientAdapter;

    private constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_API_URL
        })
    }

    public static instantiate: () => IHTTPClient = () => {
        AxiosHTTPClientAdapter.instance ??= new AxiosHTTPClientAdapter();
        return AxiosHTTPClientAdapter.instance;
    }
    get = (url: string) =>
        this.client.get(url);

    post = (url: string, data: object) =>
        this.client.post(url, data, {headers: {'Content-Type': 'application/json'}});

    patch = (url: string, data: object) =>
        this.client.patch(url, data, {headers: {'Content-Type': 'application/json'}});

    delete = (url: string, data?: object | undefined) =>
        data ? this.client.delete(url, data)
            : this.client.delete(url);
}

export default AxiosHTTPClientAdapter;