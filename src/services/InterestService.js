import BaseService from "./BaseService";


class InterestService extends BaseService {
    constructor() {
        super("/Intereses");
    }

    async list(){
        try {
            const response = await this.apiClient.get("/Listado");
            return response.data
        } catch (error) {
            console.error('Error fetching list:', error);
            throw error;
        }
    }
}


export default new InterestService();