interface IHTTPClient {
    get: (url: string) => Promise<any>;
    post: (url: string, data: object) => Promise<any>;
    patch: (url: string, data: object) => Promise<any>;
    delete: (url: string, data?: object) => Promise<any>;
    isNetworkError: (error: object) => boolean;
}

export default IHTTPClient;