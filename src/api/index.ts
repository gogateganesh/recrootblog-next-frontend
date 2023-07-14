'use client'
import axios from "axios";

const api = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:5500/",
    timeout: 2000, // indicates, 1000ms before the request times out
})

export default api;