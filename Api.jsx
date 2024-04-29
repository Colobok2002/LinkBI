import axios from "axios";
import MuTosat from "./src/components/Ui/MuToast";
import { useSelector } from "react-redux";
import JSEncrypt from 'jsencrypt';


const getApi = () => {

    const { showNotification } = MuTosat()
    const publicKey = useSelector(state => state.session.publicKey)

    const api = axios.create({});


    api.interceptors.request.use(
        (config) => {
            const modifiedRequestData = modifyRequestData(config.data);
            config.data = modifiedRequestData;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    function modifyRequestData(data) {

        if (data) {
            const encryptor = new JSEncrypt();
            encryptor.setPublicKey(publicKey);
            const modifiedData = { ...data };
            for (let key in modifiedData) {
                if (key.toLowerCase() !== "Uuid".toLowerCase() && key.toLowerCase() !== "pKey".toLowerCase()) {
                    modifiedData[key] = encryptor.encrypt(modifiedData[key]);
                }
            }
            return modifiedData;
        }
        return data
    }



    api.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            if (err.response && err.response.data && err.response.data.error) {
                showNotification({ "message": err.response.data.error, type: "error" });
            } else if (err.request) {
                showNotification({ "message": "Внутреняя ошибка сервера, проверте соединение", type: "error" });
            } else {
                showNotification({ "message": "Что то пошло не так", type: "error" });
            }
            return Promise.reject(err);
        }
    );

    return { api }
};

export default getApi