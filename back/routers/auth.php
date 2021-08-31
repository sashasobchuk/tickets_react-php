<?php


include_once('./controllers/authorization.php');


switch ($query_routes[1]) {
    /** $query_routes[1] назва функції контролера*/
    case 'registration':
        $response = Auth::registration();
        break;
    case 'login':
        $response = Auth::login();
        break;
    case 'auth':
        $response = Auth::authorization();
        break;
    default:
        $response = 'error';
}


















