import axios from "axios";

// Expose the with NEXT_PUBLIC_ to the browser
const TOKEN = process.env.NEXT_PUBLIC_FINN_TOKEN

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})