import { API_URL } from "../config.js";
import axios from "axios";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
