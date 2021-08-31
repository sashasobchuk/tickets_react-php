<?php

/** for jwt*/
use Firebase\JWT\JWT;





const BASE_URL = '/mySite/relocia/';
const DB_HOST = "localhost";
const USER_NAME = 'root';
const DB_PASSWORD = '';
const DB_NAME = 'php1simple';
const HOST  = 'http://localhost';
$secretKey= '111';

include_once 'core/corse.php';

include_once 'core/db.php';
include_once 'core/system.php';

include_once 'models/tickets.php';

include_once 'models/auth.php';










/** initing JWT*/
include_once './libs/php-jwt/src/BeforeValidException.php';
include_once './libs/php-jwt/src/ExpiredException.php';
include_once './libs/php-jwt/src/SignatureInvalidException.php';
include_once './libs/php-jwt/src/JWT.php';




