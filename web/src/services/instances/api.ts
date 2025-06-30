import axios from "axios";
import { envConfig } from "../../env";

axios.defaults.baseURL = envConfig.VITE_BACKEND_URL;

export default axios;
