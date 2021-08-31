import { checkTokenApi, Log_RegApi,  } from "../Api/api";

const IS_AUTH_TO_TRUE = 'IS_AUTH_TO_TRUE'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const INIT = 'INIT'

const defaultState = {
    isAuth: true,
    name:'',
    email:'',
    role:'',
    token: '',
    LoginDisplay: 'none',
    id_user: 'none',
    init:false

}

const HeaderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case IS_AUTH_TO_TRUE:
            return {...state, isAuth: true}
        case INIT:
            return {...state, init: true}

        case LOGIN:
            return {...state,
                name: action.name,
                isAuth: true,
                email: action.email,
                role: action.role,
                token:action.token,
                id_user:action.id_user
            }
        case LOGOUT:
            return {...state,
                isAuth: false,
                name:'',
                email:'',
                role:'',
                token: '',
                LoginDisplay: 'none',
                id_user: 'none'
            }
        default:
            return state
    }
}
export const isAuthToTrue = () => ({type: IS_AUTH_TO_TRUE})
export const initApp = () => ({type: INIT})
export const setUser = (name,email,role,id_user) => ({type: LOGIN,name,email,role,id_user })
export const logOut = () => {
    localStorage.clear();
    return {type: 'LOGOUT'}
}

export const Log_Reg = (name,email, password,role,func) => async (dispatch) => {
    try {
        const registrationResponse = await Log_RegApi(name,email, password,role,func)
        console.log(registrationResponse)
        if (registrationResponse.status === 200) {
            const LoginResponse = await Log_RegApi(name,email, password,role,'login')
            let data= LoginResponse.data
            dispatch(isAuthToTrue())
            localStorage.setItem('token',LoginResponse.data.token)
            dispatch(setUser(name,email,data.role,data.id_user))
        }
    } catch (e) {
        console.log('trouble in registration 23asdf49811', e)
    }
}
export const auth = () => async (dispatch) => {
    try {
        let token =  localStorage.getItem('token')
        if(!token){
            dispatch(logOut())
            dispatch(initApp())
            return undefined
        }
        const response = await checkTokenApi(token)
        if (response.status === 200) {
            let data = response.data
            dispatch(isAuthToTrue())
            // debugger
            dispatch(setUser(data.name,data.email,data.role,data.id_user))
        }
        Promise.all([response]).then(
            dispatch(initApp())
        )
    } catch (e) {
        console.log('trouble in auth 2cx323222', e)
    }
}


export default HeaderReducer
