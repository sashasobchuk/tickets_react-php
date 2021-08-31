<?php


function makeAuthhorization($email, $name,$password,$role)
{

    $sql = 'INSERT INTO `relocia_users`
            (`email`,`password`,`name`,`role`)
        VALUES(:email,:password,:name,:role) ';

    $resFromDB= setDbQuery($sql, ['email' => $email, 'password' => $password, 'name' => $name ,'role'=>$role]);

    return $resFromDB ;
}
function auth($email, $name ,$password)
{
        $sql = 'SELECT * FROM `relocia_users` WHERE email = :email  And name =:name AND password = :password';
        $query=getDbQuery($sql,['email'=>$email,'name'=>$name,'password'=>$password]);
        $user =  $query->fetch();
        return $user;
}




//function ticketsAll():array{
//    $sql = 'SELECT * FROM `tickets` ORDER BY dt_add DESC';
//    $query=dbQuery($sql);
//    return $query->fetchAll();
//}
//function oneTicket(int $id):array{
//    $sql = 'SELECT * FROM `tickets` WHERE id_ticket = :id ';
//    $query=dbQuery($sql,['id'=>$id]);
//    return $query->fetch();
//}
//function setTicket(string $text,int $id_user):bool{
////    $sqlRequest = 'INSERT messages (name,text) VALUES(:name, :text)';
//    $sql = 'INSERT INTO `tickets` (`text`,`id_user`) VALUES(:text,:id_user) ';
//    dbQuery($sql,['text'=>$text,'id_user'=>$id_user]);
//    return true;
//}
//function deleteTicket(int $id_ticket):bool{
//
//    $sql = 'DELETE  FROM `tickets` WHERE id_ticket = :id_ticket';
//    dbQuery($sql,['id_ticket'=>$id_ticket]);
//    return true;
//}















