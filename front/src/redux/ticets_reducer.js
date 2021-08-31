import {
    getAllTicketsApi,
    addCommentAPI,
    addOneTicketApi, deleteOneCommentApi,
    deleteOneTicketApi,
    getAllComments,
    getOneTicketAPI, changeCommentStatusAPI,
} from "../Api/ticketsApi";


const SET_TICKETS = "SET_TICKETS"
const CLOSE_TICKET = "CLOSE_TICKET"
const ADD_ONE_TICKETS = "ADD_ONE_TICKETS"
const DELETE_ONE_COMMENT = "DELETE_ONE_COMMENT"
const CREATE_COMMENT_TICKET = "CREATE_COMMENT_TICKET"
const ADD_ONE_COMMENT = "ADD_ONE_COMMENT"
const SET_ONE_TICKET = "SET_ONE_TICKET"
const SET_COMMENTS = "SET_COMMENTS"
const CHANGE_COMMENT_STATUS = "CHANGE_COMMENT_STATUS"

const defaultState = {

    oneTicket: {
        id_ticket: '001',
        text: "text заглушка",
        id_user: 0,
        dt_add: "2021-08-23 19:56:18",
        comments: [{id_comment: '1543', text: 'text comment 3 2323 ', status: 'public', dt_add: '2021-08-22 10:37:48'}]
    },
    tickets: [
        {
            id_ticket: '001',
            text: '111111111111',
            id_user: '1',
            dt_add: '1021-08-22 10:37:41',
            comments: [{id: '123', text: 'text comment ', status: 'public', dt_add: '2021-08-22 10:37:48'},
                {id_comment: '1543', text: 'text comment 2 ', status: 'public', dt_add: '2021-08-22 10:37:48'},]
        }, ]
}
const tickets_Reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TICKETS :
            return {...state, tickets: action.tickets}
        case SET_COMMENTS :
            return {
                ...state,
                oneTicket: {
                    ...state.oneTicket,
                    comments: action.comments
                },

            }
        case ADD_ONE_TICKETS :
            let new_ticket = {
                id_ticket: action.id_ticket,
                text: action.text,
                id_user: action.id,
                dt_add: action.date,
                comments: [{id: '', text: ' ', status: ''}]
            }
            return {
                ...state,
                tickets: [new_ticket, ...state.tickets,]
            }
        case CLOSE_TICKET :
            return {...state, tickets: [...state.tickets.filter((ticket) => ticket.id_ticket !== action.id_ticket)]}
        case DELETE_ONE_COMMENT :
            return {
                ...state,
                oneTicket: {
                    ...state.oneTicket,
                    comments: [...state.oneTicket.comments.filter((comment)=>comment.id_comment !==action.id_comment)]
                },
            }
        case CREATE_COMMENT_TICKET :
            return {
                ...state, tickets: [...state.tickets.map((ticket) => ticket.id_ticket !== action.id_ticket
                    ? ticket
                    :
                    {
                        id_ticket: ticket.id_ticket,
                        text: ticket.text,
                        id_user: ticket.id_user,
                        dt_add: ticket.dt_add,
                        comments: [...ticket.comments, {id: '0', text: action.text, status: 'public'}],
                    }
                )]
            }
        case SET_ONE_TICKET :
            // return {...state,oneTicket: action.ticket,comments:[{id:'',text:'',dt_add:'',status:''}]}
            return {
                ...state,
                oneTicket: {
                    ...action.ticket,
                    comments: [{id: '', text: '', dt_add: '', status: ''}]
                },
            }
        case ADD_ONE_COMMENT :
            return {
                ...state,
                oneTicket: {
                    ...state.oneTicket,
                    comments: [...state.oneTicket.comments,
                        {id: action.id, comment: action.comment, dt_add: action.dt_add, status: action.status}]
                },
            }
        case CHANGE_COMMENT_STATUS :
            return {
                ...state,
                oneTicket:{...state.oneTicket ,
                    comments:[
                        ...state.oneTicket.comments.map((oneComments)=>oneComments.id_comment !==action.id_comment
                            ? oneComments
                            :{...oneComments,
                                status:action.newStatus})
                ]}}


        default:
            return state
    }
}
export const closeTicket = (id_ticket) => ({type: CLOSE_TICKET, id_ticket})
export const closeOneComment = (id_comment,id_ticket) => ({type: DELETE_ONE_COMMENT, id_comment,id_ticket})
export const changeCommentStatusAC = (id_ticket, id_comment, newStatus) => ({type: CHANGE_COMMENT_STATUS,id_ticket, id_comment, newStatus})
export const setTickets = (tickets) => ({type: SET_TICKETS, tickets})
export const setOneTicket = (ticket) => ({type: SET_ONE_TICKET, ticket})
export const setComments = (comments) => ({type: SET_COMMENTS, comments})
export const addComment_AC = (id, comment, status, dt_add) => ({type: ADD_ONE_COMMENT, id, comment, status, dt_add})

export const addOneTickets = (text = 'заглушка', id_user, id_ticket, date = new Date().toString()) => {
    return {
        type: ADD_ONE_TICKETS, text, id_user: new Date().getDate(), id_ticket, date
    }
}
export const changeCommentStatus = (id_comment,status,id_ticket) => async (dispatch) => {
    try {
        let newStatus
        if(status ==='public'){
             newStatus = 'private'
        }else {
             newStatus  = 'public'
        }
        const response = await changeCommentStatusAPI(id_ticket, id_comment, newStatus)
        // console.log(response)
        if (response.status === 200) {
            dispatch(changeCommentStatusAC(id_ticket, id_comment, newStatus))
        }

    } catch (e) {
        console.log('trouble in registration 23498', e)
    }
}
export const addOneTicet = (text, id_user, role) => async (dispatch) => {
    try {
        const response = await addOneTicketApi(id_user, text, role)
        console.log(response)
        if (response.status === 200) {
            dispatch(addOneTickets(text, id_user, response.data.id_ticket, response.data.dt_add,))
        }
    } catch (e) {
        console.log('trouble in registration 23498', e)
    }
}
export const deleteOneComment= (id_comment,id_ticket) => async (dispatch) => {
    try {
        const response = await deleteOneCommentApi(id_comment)
        console.log(response)
        if (response.status === 200) {
            dispatch(closeOneComment(id_comment,id_ticket))
        }
    } catch (e) {
        // debugger
        console.log('trouble in registration 23498', e)
    }
}
export const deleteOneTicet = (id_ticket) => async (dispatch) => {
    try {
        const response = await deleteOneTicketApi(id_ticket)
        if (response.status === 200) {
            dispatch(closeTicket(id_ticket))
        }
    } catch (e) {
        console.log('trouble in registration 23498', e)
    }
}
export const addComment = (id_user, id_ticket, text, role = 0, token = '0', status = 'public') => async (dispatch) => {
    try {
        const response = await addCommentAPI(id_user, id_ticket, text, role, token, status)
        console.log(response)
        if (response.status === 200) {
            dispatch(addComment_AC(response.data.id_comment, text, status, response.data.dt_add))
        }
    } catch (e) {
        console.log('trouble in registration 23498', e)
    }
}
export const getOneTicket = (id_ticket) => async (dispatch) => {
    try {
        const response = await getOneTicketAPI(id_ticket)
        if (response.status === 200) {
            // debugger
            dispatch(setOneTicket(response.data[0]))
        }
        // debugger

        const CommentsResponse = await getAllComments(id_ticket)
        if (response.status === 200) {
            // debugger
            dispatch(setComments(CommentsResponse.data))
        }
    } catch (e) {
        // debugger
        console.log('trouble in registration 23498', e)
    }
}
export const getTickets = () => async (dispatch) => {
    try {
        // debugger
        const response = await getAllTicketsApi()
        // debugger
        dispatch(setTickets(response.data))
    } catch (e) {
        console.log('trouble in get back getConcertPage ', e)
    }
}


export default tickets_Reducer

