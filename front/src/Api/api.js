import * as axios from "axios";
import {hostUrl} from "../acces/config"


let token = localStorage.getItem('token')
const instanse = axios.create({
    baseURL: hostUrl,
    headers: {'token': token ?? ''}
})


export const Log_RegApi = async (name,email,password,role,func) => {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('name', name);
    data.append('role', role);
    // debugger
     try {
         return await axios.post(`${hostUrl}auth/${func}`,data,)
    } catch (e) {
         alert('problem in LoginApi ', e)
    }
}
export const checkTokenApi = async (token) => {
// debugger
    let data = new FormData();
    data.append('token', token);
     try {
         return await instanse.post(`auth/auth`,data,)
    } catch (e) {
    }
}



