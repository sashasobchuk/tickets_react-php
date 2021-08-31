<?php

use Firebase\JWT\JWT;

class Tickets
{
    public static function getAllTickets()
    {
        die(json_encode(get_ticketsAll()));
    }

    public static function getAllComments($id_ticket)
    {
        die(json_encode(get_commetsAll($id_ticket)));
    }

    public static function getOneTicket(int $id)
    {
        die(json_encode(get_oneTicket($id)));
    }

    public static function changeCommentStatus($id_ticket, $id_comment, $status)
    {
        updade_comentStatsu($id_ticket, $id_comment, $status);
        die('updated successful');
    }

    public static function setTicket($text, $id_user)

    {
        $response = setTicket($text, $id_user);
        if ($response) {
            http_response_code(200);
        } else {
            http_response_code(400);
            die(json_encode(['success' => 'dont added',]));
        }
        die(json_encode(['id_ticket' => $response, 'dt_add' => date("Y-m-d H:i:s")]));
    }

    public static function addComment(int $id_user, int $id_ticket, string $text, string $role, string $token, string $status)
    {
        $response = addComment($id_ticket, $text, $status);
        if ($response) {
            http_response_code(200);
        } else {
            http_response_code(400);
            die(json_encode(['success' => 'dont added',]));
        }
        die(json_encode(['id_comment' => $response, 'dt_add' => date("Y-m-d H:i:s")]));
    }

    public static function deleteComment(array $query_params)
    {
        $id_comment = trim(htmlspecialchars($_GET['id_comment']));
        $existing = get_oneComment($id_comment);
        if ($existing === false) {
            /** перевірка чи вже існує*/
            http_response_code(400);
            exit('не існує такого 2ed233');
        }
        $response = deleteComment($id_comment);
        if ($response) {
            /** перевірка на помилку*/
            http_response_code(200);
        } else {
            http_response_code(400);
            die(json_encode(['success' => false,]));
        }
        die(json_encode(['success' => true]));
    }

    public static function deleteTicket($id_ticket)
    {
        if (get_oneTicket($id_ticket) === false) {
            /** перевірка чи вже існує*/
            http_response_code(400);
            die('не існує такого');
        }
        $response = deleteTicket($id_ticket);
        if ($response) {
            /** перевірка на помилку*/
            http_response_code(200);
        } else {
            http_response_code(400);
            die(json_encode(['success' => false,]));
        }
        die(json_encode(['success' => true]));
    }

}







