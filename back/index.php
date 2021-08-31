<?php

include_once 'init.php';


$fullUri = $_SERVER['REQUEST_URI'];
$url = $_GET['querysystemurl'] ;


$query_routes =parseUrl($url);
$query_params = parseParams($fullUri);
if($query_routes[1]=='login' || $query_routes[1] =='registration'){
    $response = include_once ("routers/$query_routes[0].php");

    die('reg_log');
}else{
    $auth = include_once ("routers/auth.php");


    $response = include_once ("routers/$query_routes[0].php");

}
    die('next');



die('something gone wrong , check security!');















