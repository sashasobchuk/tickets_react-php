<?php

include_once('./controllers/tickets.php');

switch ($query_routes[1]) {
    /** $query_routes[1] назва функції контролера*/
    case 'getAllTickets':
        $response = Tickets::getAllTickets();
        break;
    case "getOneTicket":
        $id_ticket = $_GET['id_ticket'];
        $response = Tickets::getOneTicket($id_ticket);
        break;
    case "changeCommentStatus":
        $id_ticket = trim(htmlspecialchars($_GET['id_ticket']));
        $id_comment = trim(htmlspecialchars($_GET['id_comment']));
        $status= $_GET['status'];
//        die($status);

        $response = Tickets::changeCommentStatus($id_ticket,$id_comment,$status);
        break;
    case "getAllComments":
        $id_ticket = trim(htmlspecialchars($_GET['id_ticket']));

        $response = Tickets::getAllComments($id_ticket);
        break;
    case "postTicket":
        $text_ticket = trim(htmlspecialchars($_POST['text']));
        $id_user = trim(htmlspecialchars($_POST['id_user']));
//        die($text_ticket);
        $response = Tickets::setTicket($text_ticket, $id_user);
        break;
    case "addComment":
        $id_ticket = trim(htmlspecialchars($_POST['id_ticket']));
        $id_user = trim(htmlspecialchars($_POST['id_user']));
        $text = trim(htmlspecialchars($_POST['text']));
        $token = trim(htmlspecialchars($_POST['token']));
        $role = trim(htmlspecialchars($_POST['role']));
        $status =trim(htmlspecialchars( $_POST['status']));

        $response = Tickets::addComment($id_user, $id_ticket, $text, $token, $role, $status);
        break;
    case "deleteComment":
        $query_params;

        $response = Tickets::deleteComment($query_params);
        break;
    case "deleteTicket":


        if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            $id_ticket = trim(htmlspecialchars($_GET['id_ticket']));
            $response = Tickets::deleteTicket($id_ticket);

        } else {
            break;
        }


    default:
        $response = 'error';
}






