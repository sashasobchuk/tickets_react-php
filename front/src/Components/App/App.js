import clas from './App.module.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Tickets from "../ticets/ticets";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../redux/header.reducer";
import Header from "../Header/Header";
import OneTicket from "../ticets/onTicket/oneTicket";
import RegLog from "../RegLog/RegLog";

function App() {
    let isAuth = useSelector(state => state.header.isAuth)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(auth())

    })
    if(!isAuth){
        return (<div>
            <BrowserRouter>
                <Header/>
                <Switch>
                <Route path="/login" render={() => <RegLog
                    props={{title: 'ЗАЛОГІНИТИСЬ', button: 'Login', func: 'login'}}/>}/>
                <Route path="/Registration" render={() => <RegLog
                    props={{title: 'зареєструватись', button: 'registrate', func: 'registration'}}/>}/>
                    {!isAuth && <Redirect to='/login'/>}
                </Switch>
            </BrowserRouter>
        </div>)
    }else {
        return <div>
            <BrowserRouter>
                <Header/>
                <div className={clas.content}>

                <Switch>
                        <Route path="/tickets" render={() => <Tickets/>}/>
                        <Route exact path="/OneTicket/:id_ticket" render={() => <OneTicket/>}/>
                        <Route path="/login" render={() => <RegLog
                            props={{title: 'ЗАЛОГІНИТИСЬ', button: 'Login', func: 'login'}}/>}/>
                        <Route path="/Registration" render={() => <RegLog
                            props={{title: 'зареєструватись', button: 'registrate', func: 'registration'}}/>}/>
                </Switch>
                </div>



            </BrowserRouter>

        </div>

    }

}

export default App;
