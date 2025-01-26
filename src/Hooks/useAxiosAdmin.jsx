import axios from "axios";

const axiosAdmin = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosAdmin = () => {
    return axiosAdmin
};

export default useAxiosAdmin;