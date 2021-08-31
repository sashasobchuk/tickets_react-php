<?php


function get_ticketsAll():array{
    $sql = 'SELECT * FROM `tickets` ORDER BY dt_add DESC';
    $query=getDbQuery($sql);
    $response =  $query->fetchAll();
    return $response;
}
function get_commetsAll($id_ticket){
    $sql = 'SELECT * FROM `relocia_coments` WHERE id_ticket = :id_ticket  ORDER BY dt_add DESC';
    $query=getDbQuery($sql,['id_ticket'=>$id_ticket]);
    $response =  $query->fetchAll();
    return $response;
}
function get_oneTicket(int $id){
    $sql = 'SELECT * FROM `tickets` WHERE id_ticket = :id ';
    $query=getDbQuery($sql,['id'=>$id]);
    return $query->fetchAll();
}
function updade_comentStatsu($id_ticket,$id_comment,$status){
    $sql = 'UPDATE `relocia_coments` SET status=:status WHERE id_comment=:id_comment';
    $query=getDbQuery($sql,['status'=>$status,'id_comment'=>$id_comment]);
    return $query->fetchAll();
}
function get_oneComment(int $id_comment){
    $sql = 'SELECT * FROM `relocia_coments` WHERE id_comment = :id_comment ';
    $query=getDbQuery($sql,['id_comment'=>$id_comment]);
    return $query->fetchAll();
}
function setTicket($text, $id_user){
    $sql = 'INSERT INTO `tickets` (`text`,`id_user`) VALUES(:text,:id_user) ';
    $resFromDb =  setDbQuery($sql,['text'=>$text,'id_user'=>$id_user]);
    return $resFromDb;
}
function addComment(int $id_ticket, string $text,string $status){
    $sql = 'INSERT INTO `relocia_coments` (`comment`,`id_ticket`, `status`) VALUES(:comment,:id_ticket,:status) ';
    return  setDbQuery($sql,['comment'=>$text,'id_ticket'=>$id_ticket,'status'=>$status]);;
}
function deleteComment(int $id_comment){
    $sql = 'DELETE FROM `relocia_coments` WHERE id_comment = :id_comment';
    return  deleteDbQuery($sql,['id_comment'=>$id_comment]);
}
function deleteTicket(int $id_ticket):bool{
    $sql = 'DELETE  FROM `tickets` WHERE id_ticket = :id_ticket';
    deleteDbQuery($sql,['id_ticket'=>$id_ticket]);
    return true;
}














