import React, {useEffect} from 'react';
import clas from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../redux/header.reducer";

const Header = () => {
    const isAuth = useSelector(state => state.header.isAuth)
    const role = useSelector(state => state.header.role)
    const name = useSelector(state => state.header.name)
    const id = useSelector(state => state.header.id_user)
    const dispatch = useDispatch()
    useEffect(() => {

    }, [isAuth])
    const logOutHandler = () => {
        dispatch(logOut())
    }
    return (
        <div className={clas.header}>
            <div className={clas.left}>
                <NavLink to="/tickets"> <b> SASHA</b> </NavLink>
                <div className={clas.info}>{isAuth ? <div>авторизований <br/> role:{role} <br/>імя :{name} || id:{id} </div> : <div> неавторизований</div>}</div>
            </div>

            <div className={clas.center}>
                <div><NavLink activeClassName='active' to="/tickets"> Tickets </NavLink></div>
                <div><NavLink activeClassName='active' to="/login"> login </NavLink></div>
                <div><NavLink activeClassName='active' to="/registration"> registration </NavLink></div>


            </div>
            <div className={clas.right}>
                <button onClick={() => {
                    logOutHandler()}}>loguot
                </button>

            </div>
        </div>
    );
};


export default Header;












