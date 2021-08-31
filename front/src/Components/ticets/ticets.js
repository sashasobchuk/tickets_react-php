import React, {useEffect, useState} from 'react';
import clas from './ticets.module.css'
import {useDispatch, useSelector} from "react-redux";
import { closeTicket, deleteOneTicet, getTickets} from "../../redux/ticets_reducer";
import {NavLink} from "react-router-dom";
import PopUpMakeTicket from "../../acces/popUpMakeTicket/popUpMakeTicket";

const Tickets = () => {
    const allTickets = useSelector(state => state.ticketsPage.tickets)
    const role = useSelector(state => state.header.role)
    const dispatch = useDispatch()
    const [poUpStatus, changePoUpStatus] = useState('none')

   useEffect(() => {
        dispatch(getTickets())
    },[dispatch])
    const deleteTicketHandler = (id_ticket) => {
        dispatch(deleteOneTicet(id_ticket))
    }
    const closeOneTicket = (id) => {


        dispatch(closeTicket(id))
    }
    // debugger
    return (
        <div>
            {(role === 'User' || role === 'Agent') && <div>
                <PopUpMakeTicket props={{poUpStatus, changePoUpStatus}}/>
                <button className={clas.create} onClick={() => {
                    changePoUpStatus('flex')
                }}>створити новий
                </button>
            </div>
            }

            {allTickets.map((ticket, index) =>
                <div className={clas.oneTicket} key={index}>
                    <div className={clas.content}>
                        <div className={clas.time}>
                            <span>Час створення:</span>
                            <time> {ticket.dt_add}</time>
                        </div>

                        <div> Текст тікета: <span>{ticket.text}</span></div>
                    </div>
                    <div className={clas.navigation}>
                        <button onClick={() => {
                            closeOneTicket(ticket.id_ticket)
                        }} className={clas.close}>закрити тіккет
                        </button>
                        <NavLink className={clas.go} activeClassName='active' to={'/oneTicket/' + ticket.id_ticket}>
                            <button className={clas.goTo}>перейти до тікету</button>
                        </NavLink>


                        {role === 'Agent' &&
                        <button className={clas.delete}
                                onClick={() => deleteTicketHandler(ticket.id_ticket)}>видалити</button>
                        }


                    </div>

                </div>)

            }


        </div>
    );
};

export default Tickets;












