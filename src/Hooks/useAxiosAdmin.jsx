import axios from "axios";

const axiosAdmin = axios.create({
    baseURL: 'https://edu-connect-server-five.vercel.app',
    withCredentials: true

})

const useAxiosAdmin = () => {
    return axiosAdmin
};

export default useAxiosAdmin;