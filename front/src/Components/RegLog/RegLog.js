import React, {useState} from 'react';
import clas from './RegLog.module.css'
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Log_Reg } from "../../redux/header.reducer";


const RegLog = ({props}) => {

    const [name, changeName] = useState('1')
    const [email, changeEmail] = useState('1')
    const [password, changePassword] = useState('1')

    const [nameDirty, changenameDirty] = useState(false)
    const [emailDirty, changeemailDirty] = useState(false)
    const [passwordDirty, changepasswordDirty] = useState(false)

    const [nameError] = useState('не можу бути пустим')
    const [emailError] = useState('не можу бути пустим')
    const [passwordError] = useState('не можу бути пустим')

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                email ===''&& changeemailDirty(true)
                break
            case 'name':
                name ===''&& changenameDirty(true)
                break
            case 'password':
                password ===''&&  changepasswordDirty(true)
                break
            default:
                break
        }
    }

    const url = useHistory()
    const dispatch = useDispatch()
    let role = 'User'
    const log_regHandler = () => {
        debugger
        if (!emailDirty && !nameDirty && !passwordDirty) {
            dispatch(Log_Reg(name, email, password, role, props.func))
            url.push('/tickets')
        }

    }
    let nameHandler = (e) => {
        changenameDirty(false)
        changeName(e.target.value)
    }
    let emailHandler = (e) => {
        changeemailDirty(false)
        changeEmail(e.target.value)

    }
    let passwordHandler = (e) => {
        changepasswordDirty(false)
        changePassword(e.target.value)

    }
    return (
        <div className={clas.FullPaceTicket} style={{display: "flex"}}>

            <form className={clas.Login}>
                <div className={clas.tittle}> {props.title}</div>

                <div className={clas.inputFolder}>
                    <label> <b>name</b> <br/>
                        {(nameDirty && nameError) && <div style={{color: 'red'}}> {nameError}</div>}
                        <input placeholder='саша'
                               name='name'
                               onBlur={e => blurHandler(e)}
                               onChange={event => {nameHandler(event)}}
                               value={name} className={clas.input} type="text"/>

                    </label>
                </div>

                <div className={clas.inputFolder}>
                    <label> <b>email</b> <br/>
                        {(emailError && emailDirty) && <div style={{color: 'red'}}> {emailError}</div>}
                        <input placeholder='sasha.sobchuk18@gmail.com'
                               name='email'
                               onBlur={e => blurHandler(e)}
                               onChange={event => {emailHandler(event)}}
                               value={email} className={clas.input} type="text"/>
                    </label>
                </div>
                <div className={clas.inputFolder}>
                    <label> <b>password</b> <br/>
                        {(passwordError && passwordDirty) && <div style={{color: 'red'}}> {passwordError}</div>}
                        <input placeholder='1'
                               onChange={event => {passwordHandler(event)}}
                               name='password'
                               onBlur={e => blurHandler(e)}
                               value={password} className={clas.input} type="password"/>
                    </label>
                </div>

                <div className={clas.add} onClick={() => {
                    log_regHandler()
                }}>
                    <button>{props.button}</button>

                </div>
                <div className={clas.closePage}><NavLink to="/tickets">X</NavLink></div>

            </form>
        </div>
    );
};

export default RegLog;
























































