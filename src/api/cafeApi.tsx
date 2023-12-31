import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseURL = 'https://cafe-rn-tutorial-f6874a0273f2.herokuapp.com/api'

const cafeApi = axios.create({ baseURL })


cafeApi.interceptors.request.use(

    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers['x-token'] = token
        }
        return config
    }
)

export default cafeApi