import axios from "axios";
import MuTosat from "./src/components/Ui/MuToast";
import JSEncrypt from 'jsencrypt';
import store from "./src/redux/store";

const getApi = () => {

    const { showNotification } = MuTosat()

    const api = axios.create({});

    let publicKey = store.getState().session.publicKey;

    store.subscribe(() => {
        publicKey = store.getState().session.publicKey;
    });


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
                if (!["Uuid".toLowerCase(), "pKey".toLowerCase()].includes(key.toLowerCase())) {
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
            console.log(err)
            return Promise.reject(err);
        }
    );

    return { api }
};

export default getApi