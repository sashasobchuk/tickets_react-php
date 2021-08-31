<?php

//    $response = ticketsAll();
//    return json_encode($response);

use Firebase\JWT\JWT;

class Auth
{
    public static function registration()
    {
        $name = trim(htmlspecialchars($_POST['name']));
        $email = trim(htmlspecialchars($_POST['email']));
        $role = trim(htmlspecialchars($_POST['role']));
        $password = trim(htmlspecialchars($_POST['password']));

        $response = makeAuthhorization($email, $name, $password, $role);
        if ($response) {
            http_response_code(200);
        } else {
            http_response_code(400);
        }
        $token = array(
            "data" => array(
                "email" => $email,
                "password" => $password,
                "name" => $name,
                "role" => $role
            )
        );
        $jwt = JWT::encode($token, $secretKey = '111', 'HS256');

        die(json_encode(['success' => 'successfully added', 'token' => $jwt]));
    }

    public static function login()
    {

        $name = trim(htmlspecialchars($_POST['name']));
        $email =trim(htmlspecialchars( $_POST['email']));
        $password = trim(htmlspecialchars($_POST['password']));
        $user = auth($email, $name, $password);
        if ($user) {
            http_response_code(200);
        } else {
            http_response_code(400);
            die(json_encode(['success' => 'user is not found', 'user' => $user]));
        }
        $token = array(
            "data" => array(
                "email" => $email,
                "password" => $password,
                "name" => $name,
                "role" => $user['role']
            )
        );
        $jwtToken = JWT::encode($token, $secretKey = '111', 'HS256');
        die(json_encode([
            'success' => 'user exist',
            'token' => $jwtToken,
            'email' => $email,
            'password' => $password,
            'id_user' => $user['id_user'],
            'role' => $user['role']]));
    }

    public static function authorization()
    {

        $headers = getallheaders();
        $token = $headers['token'];
        if($token ==='' && $token === null){
            http_response_code(400);
            die('empty token');
        }
        $data = JWT::decode($token, $secretKey='111', array('HS256'))->data;
        $email = $data->email;
        $name = $data->name;
        $password = $data->password;
        $role = $data->role;
        $user = auth($email, $name,$password );
        if ($user) {
            http_response_code(200);
        } else {
            http_response_code(400);
            die(json_encode(['success' => 'user is not found', 'user' => $user]));
        }
        $token = array(
            "data" => array(
                "email" => $email,
                "password" => $password,
                "name" => $name,
                "role" => $user['role']
            )
        );
        $jwtToken = JWT::encode($token, $secretKey = '111', 'HS256');

        die(json_encode([
            'success' => 'user exist',
            'token' => $jwtToken,
            'id_user' => $user['id_user'],
            'email' => $email,
            'name' => $name,
            'role' => $role]));
    }

}






