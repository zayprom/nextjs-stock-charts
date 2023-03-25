import axios from "axios";

const TOKEN = process.env.API_TOKEN

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})