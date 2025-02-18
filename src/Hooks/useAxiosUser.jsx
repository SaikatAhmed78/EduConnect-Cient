import axios from "axios";


const axiosUser = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true

})

const useAxiosUser = () => {
    return axiosUser
};

export default useAxiosUser;