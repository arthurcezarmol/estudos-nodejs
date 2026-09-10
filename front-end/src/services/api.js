import axios from 'axios';

// Criando a conexão
const api = axios.create({
    baseURL: 'http://localhost:3000' // URL do back-end, endereço onde o back end está
});

export default api;     // Tenho que exportar para poder usar em outros arquivos   