import axios from "axios";

const ip = "192.168.0.108";

const api = axios.create({
  baseURL: `http://${ip}:5000/api`,
});

export default api;
