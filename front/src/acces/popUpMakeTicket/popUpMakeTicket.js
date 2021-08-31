import React, {useState} from 'react';
import clas from './popUpMakeTicket.module.css'
import {addOneTicet} from "../../redux/ticets_reducer";
import {useDispatch, useSelector} from "react-redux";


const PopUpMakeTicket = ({props}) => {

    const dispatch = useDispatch()
    const [text, changeText] = useState('text')
    const id_user = useSelector(state => state.header.id_user)


    const addFolder = () => {
        const random =Math.floor(Math.random() * 100)
        dispatch(addOneTicet(text,id_user,random))
        // props.changePoUpStatus('none')

    }

    return (
        <div className={clas.FullPaceTicket} style={{display: props.poUpStatus}}>

            <div className={clas.makeTicket}>
                <div className={clas.tittle}> додати новий ticket</div>

                <input className={clas.makeTicketInput}
                       placeholder='текст тікету'
                       type="text" value={text}
                       onChange={(e) => {
                           changeText(e.target.value)
                       }}
                />
                <div className={clas.add}>
                    <button onClick={addFolder}>додати</button>

                    {/*                        <label>
                            Статус:
                            <select value={"активний"} >
                                <option value="grapefruit">активний</option>
                                <option value="lime">неактивний</option>
                            </select>
                                                    <input type="submit" value="Submit" />

                        </label>*/}


                </div>

                <div onClick={() => {
                    props.changePoUpStatus('none')
                }} className={clas.closePage}>X
                </div>

            </div>
        </div>
    );
};

export default PopUpMakeTicket;





































