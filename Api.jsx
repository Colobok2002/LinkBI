import axios from "axios";
import MuTosat from "./src/components/Ui/MuToast";


const getApi = () => {

    const { showNotification } = MuTosat()

    const api = axios.create({});


    // api.interceptors.request.use(
    //     (config) => {
    //         const token = localStorage.getItem("token");
    //         if (token) {
    //             config.headers["HeaderApiKey"] = token;
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    api.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            console.error(err);
            return Promise.reject(err);
        }
    );

    return { api }
};

export default getApi