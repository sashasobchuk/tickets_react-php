import React, {useEffect, useState} from 'react';
import clas from './oneTicket.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    addComment,
    changeCommentStatus,
    deleteOneComment, deleteOneTicet, getOneTicket,
} from "../../../redux/ticets_reducer";
import { useHistory, useParams} from "react-router-dom";

const OneTicket = () => {
    const {id_ticket} = useParams();
    const url = useHistory()
    const id_user = useSelector(state => state.header.id_user)
    const role = useSelector(state => state.header.role)
    const ticket = useSelector(state => state.ticketsPage.oneTicket)

    const [text, changeText] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOneTicket(id_ticket))
    })

    const deleteCommentHandler = (id_comment) => {
        dispatch(deleteOneComment(id_comment, id_ticket))
    }
    const createCommentHandler = () => {
        dispatch(addComment(id_user, id_ticket, text))
        changeText('')
    }
    const deleteTicketHandler = () => {
        dispatch(deleteOneTicet(id_ticket))
        url.push('/tickets')
    }
    const closeHandler = () => {
        url.push('/tickets')
    }
    const changeStatusHandler = (id_comment, status, id_ticket) => {
        dispatch(changeCommentStatus(id_comment, status, id_ticket))
    }

    return (
        <div>

            <div className={clas.oneTicket}>
                <div className={clas.content}>
                    {ticket.text}
                    {
                        <div className={clas.comments}>
                            {ticket.comments.map(comment =>
                                <div>
                                    {(comment.status === 'public' || role === 'Agent' )&&
                                    <div className={clas.comment}>{comment.comment}{role === 'Agent'
                                            &&<div className={clas.deleteComment} onClick={() => { deleteCommentHandler(comment.id_comment,)}}>X</div>}
                                        <div className={clas.changeStatus} onClick={() => {changeStatusHandler(comment.id_comment, comment.status, ticket.id_ticket)}}>
                                            <div className={clas.status}>{comment.status}</div>
                                        </div>
                                    </div>}
                                </div>
                            )}
                        </div>
                    }


                </div>
                <div className={clas.navigation}>
                    <div className={clas.makeComment}>
                        <input type="text" value={text} onChange={e => changeText(e.target.value)} placeholder='comment'
                               className={clas.inputComment}
                               style={{textAlign: "center"}}/>
                        <button className={clas.create} onClick={() => {createCommentHandler()}}>створити коментарій
                        </button>
                    </div>
                    {role === 'Agent' &&
                    <button className={clas.delete} onClick={() => deleteTicketHandler()}>видалити ticket</button>}
                    <button className={clas.delete} onClick={() => {closeHandler()}}>закрити</button>
                </div>
            </div>
            )


        </div>
    );
};

export default OneTicket;



