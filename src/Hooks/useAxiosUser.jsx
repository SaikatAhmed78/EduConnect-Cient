import axios from "axios";

const axiosUser = axios.create({
    baseURL: 'https://edu-connect-server-five.vercel.app',
    withCredentials: true

})

const useAxiosUser = () => {
    return axiosUser
};

export default useAxiosUser;