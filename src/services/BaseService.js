import axios from "axios";

const BASE_API_URL = "https://pruebareactjs.test-class.com/Api/api";


class BaseService {
    constructor(urlPath) {
        this.apiClient = axios.create({
            baseURL: BASE_API_URL + urlPath,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    setAuthToken(token) {
        if (token) {
            this.apiClient.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
            delete this.apiClient.defaults.headers.Authorization;
        }
    }    
}

export default BaseService;