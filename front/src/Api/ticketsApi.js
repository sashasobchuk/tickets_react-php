import * as axios from "axios";
import {hostUrl} from "../acces/config"



let token = localStorage.getItem('token')
const instanse = axios.create({
    baseURL: hostUrl,
    headers: {'token': token ?? ''}
})


export const getAllTicketsApi = async () => {
// debugger
    try {
        return await instanse.get(`tickets/getAllTickets`)
    } catch (e) {
        alert('proplemin getAllTicketsApi', e)
    }
}
export const getOneTicketAPI = async (id_ticket) => {
    try {
        return await axios.get(`${hostUrl}tickets/getOneTicket?id_ticket=${id_ticket}` ,{})
    } catch (e) {
        console.log('problem in addCommentAPI', e)
    }
}

export const getAllComments = async (id_ticket) => {
    try {
        return await instanse.get(`${hostUrl}tickets/getAllComments?id_ticket=${id_ticket}` ,{})
    } catch (e) {
        console.log('problem in addCommentAPI', e)
    }
}
export const changeCommentStatusAPI = async (id_ticket, id_comment, newStatus) => {
    try {
        // debugger
        return await instanse.get(`${hostUrl}tickets/changeCommentStatus?id_ticket=${id_ticket}&id_comment=${id_comment}&status=${newStatus}` ,{})
    } catch (e) {
        console.log('problem in addCommentAPI', e)
    }
}
export const addOneTicketApi = async (id_user,text,role='1') => {

    let data = new FormData();
    data.append('id_user', id_user);
    data.append('text', text);
    data.append('role', role);
    // debugger
    try {
        return await axios.post(`${hostUrl}tickets/postTicket`,data,)
    } catch (e) {
        alert('problem in LoginApi ', e)
    }
}




export const deleteOneTicketApi = async (id_ticket) => {
    try {
        return await axios.delete(`${hostUrl}tickets/deleteTicket?id_ticket=${id_ticket}` ,{})
    } catch (e) {
        console.log('problem in addCommentAPI', e)
    }
}

export const addCommentAPI = async (id_user,id_ticket,text,role,token=0,status='active') => {
    let data = new FormData()
    data.append('id_user', id_user);
    data.append('id_ticket', id_ticket);
    data.append('text', text);
    data.append('role', role);
    data.append('token', token);
    data.append('status', status);

    try {
        return await instanse.post(`tickets/addComment`, data)
    } catch (e) {
        console.log('problem in addCommentAPI', e)
    }
}
export const deleteOneCommentApi = async (id_comment) => {
    try {
        return await instanse.delete(`tickets/deleteComment?id_comment=${id_comment}` ,{})
    } catch (e) {
        console.log('problem in addCommentAPI', e)
    }
}



