import axios from "axios";

const ip = "192.168.2.101";

const api = axios.create({
  baseURL: `http://${ip}:5000/api`,
  timeout: 15000,
});

export default api;
