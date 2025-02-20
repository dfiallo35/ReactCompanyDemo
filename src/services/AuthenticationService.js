import BaseService from "./BaseService";


class AuthService extends BaseService {
    constructor() {
        super("/Authenticate");
    }

    async login(username, password){
        try {
            const response = await this.apiClient.post("/login", { username, password });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", username);
                localStorage.setItem("userid", response.data.userid);
            }
            return response.data;
        } catch (error) {
            console.log(error);
            throw error.response?.data?.message || "Authentication Error";
        }
    }

    async register(username, email, password){
        try {
            await this.apiClient.post("/register", { username, email, password });
        } catch (error) {
            throw error.response?.data?.message || "Registration Error";
        }
    }

    async logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
    }

    async isAuthenticated(){
        return !!localStorage.getItem("token");
    }

    async getToken(){
        return localStorage.getItem("token");
    }

    async getUserData(){
        return {
            username: localStorage.getItem("username"),
            userid: localStorage.getItem("userid"),
            token: localStorage.getItem("token"),
        }
    }
}

export default new AuthService();