import IHTTPClient from "./IHTTPClient";
import axios, {AxiosInstance} from "axios";

class AxiosHTTPClientAdapter implements IHTTPClient {
    private client: AxiosInstance;
    private readonly headers;

    private constructor() {
        const token = localStorage.getItem('jwt');
        this.headers = (token === null
            ? {'Content-Type': 'application/json'}
            : {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
        this.client = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_API_URL,
            headers: this.headers
        });
    }

    public static instantiate: () => IHTTPClient = () => {
        return new AxiosHTTPClientAdapter();
    }

    get = (url: string) => {
        return this.client.get(url, {headers: this.headers});
    }

    post = (url: string, data: object) => {
        console.log(JSON.stringify(data));
        return this.client.post(url, data, {headers: this.headers});
    }

    patch = (url: string, data: object) => {
        return this.client.patch(url, data, {headers: this.headers});
    }

    delete = (url: string, data?: object | undefined) => {
        return (data ?
            this.client.delete(url, {headers: this.headers, data})
            : this.client.delete(url, {headers: this.headers}));
    }
}

export default AxiosHTTPClientAdapter;