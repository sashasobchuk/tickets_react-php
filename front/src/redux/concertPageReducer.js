// import {AddCItemAPI, ChangeCItemAPI, deleteCItemAPI, getConcertPageApi} from "../api/concertPageApi";



import {AddCItemAPI, ChangeCItemAPI, deleteCItemAPI, getConcertPageApi} from "../Api/concertPageApi";

const SET_PAGE = "SET_PAGE"
const defaultState = {
    items: []

}
const concertPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_PAGE :
            return {...state, items: action.CPage}
        default:
            return state
    }
}

export const setConcertPage = (CPage) => ({type: SET_PAGE, CPage})


export const getConcertPage = () => async (dispatch) => {
    try {
        const response = await getConcertPageApi()
        dispatch(setConcertPage(response.data.Page))
    } catch (e) {
        console.log('trouble in get back getConcertPage ', e)
    }
}

export const AddCItem = (date, citi, status, isDone) => async (dispatch) => {
    try {
        if (citi === '') {
            alert("Citi Name hasnt be ampty")
        }
        else {
            await AddCItemAPI(date, citi, status, isDone)
            dispatch(getConcertPage())
        }
    } catch (e) {
        console.log('trouble in get back AddCItem ', e)
    }
}
export const deleteCItem = (_id) => async (dispatch) => {
    try {
        await deleteCItemAPI(_id)
        dispatch(getConcertPage())
    } catch (e) {
        console.log('trouble in get back deleteCItem ', e)
    }
}
export const changeCItem = (_id) => async (dispatch) => {
    try {
        await ChangeCItemAPI()
        dispatch(getConcertPage())
    } catch (e) {
        console.log('trouble in get back changeCItem ', e)
    }
}


export default concertPageReducer
