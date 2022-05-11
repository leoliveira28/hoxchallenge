import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333'
})
// Make a request for a user with a given ID
