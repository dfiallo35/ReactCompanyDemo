import BaseService from "./BaseService";


const mapGenderToApi = (gender) => {
    const genderMap = {
        "Male": "M",
        "Female": "F"
    };
    return genderMap[gender] || gender;
};

const mapApiToGender = (gender) => {
    const genderMap = {
        "M": "Male",
        "F": "Female"
    };
    return genderMap[gender] || gender;
}


const mapClientToApi = (client, userId) => {
    const payload = {
        nombre: client.firstName,
        apellidos: client.lastName,
        identificacion: client.identification,
        celular: client.mobilePhone,
        OtroTelefono: client.otherPhone,
        direccion: client.address,
        fNacimiento: client.birthDate,
        fAfiliacion: client.affiliationDate,                
        sexo: mapGenderToApi(client.gender),
        resennaPersonal: client.review,
        interesFK: client.interest,
        imagen: "",
        usuarioId: String(userId)
    };
    return payload
}

const mapApiToClient = (client) => {
    const payload = {
        id: client.id,
        identification: client.identificacion,
        firstName: client.nombre,
        lastName: client.apellidos,
        gender: mapApiToGender(client.sexo),
        birthDate: new Date(client.fNacimiento),
        affiliationDate: new Date(client.fAfiliacion),
        mobilePhone: client.telefonoCelular,
        otherPhone: client.otroTelefono,
        address: client.direccion,
        review: client.resenaPersonal,
        interest: client.interesesId,
    };
    return payload
}


class ClientService extends BaseService {
    constructor() {
        super("/Cliente");
    }

    async list(userId, name = null, identification = ""){
        try {
            const response = await this.apiClient.post("/Listado", {
                usuarioId: String(userId),
                nombre: name,
                identificacion: identification,
            });
            const data = response.data.map(client => mapApiToClient(client))
            return data
        } catch (error) {
            console.error('Error fetching list:', error);
            throw error;
        }
    }

    async get(id){
        try {
            const response = await this.apiClient.get(`/Obtener/${id}`);
            console.log(response.data);
            const data = mapApiToClient(response.data);
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching client:', error);
            throw error;
        }
    }

    async create(client, userId){
        try {
            const payload = mapClientToApi(client, userId)
            const response = await this.apiClient.post("/Crear", payload);
            return response.data;
        } catch (error) {
            console.error("Error creating client:", error.response?.data || error.message);
            throw error;
        }
    }

    async update(id, client, userId){
        try {
            const payload = {...mapClientToApi(client, userId), id}
            const response = await this.apiClient.post("/Actualizar", payload);
            return response.data;
        } catch (error) {
            console.error('Error updating client:', error);
            throw error;
        }
    }

    async delete(id){
        try {
            const response = await this.apiClient.delete(`/Eliminar/${id}`);
            return response.data
        } catch (error) {
            console.error('Error deleting client:', error);
            throw error;
        }
    }
}

export default new ClientService();