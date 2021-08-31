<?php
function dbInstance(): PDO
{
    static $db;
    if ($db === null) {
        $db = new PDO('mysql:dbname=' . DB_NAME . ';host=' . DB_HOST, 'root', '', [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        $db->exec('SET NAMES UTF8');
    }
    return $db;
}

function getDbQuery(string $sql, array $params = []):PDOStatement
{
    $db = dbInstance();
    $sqlQuery = $db->prepare($sql);

    $sqlQuery->execute($params);
    $error = dbCheckError($sqlQuery);

    if ($error['error'] === true) {
    //сюди не дойде
        $response = false;
        exit();
    } else {
        $response = $sqlQuery;

    }
    return $response;
}
function deleteDbQuery(string $sql, array $params = []):bool
{
    $db = dbInstance();
    $sqlQuery = $db->prepare($sql);

    $sqlQuery->execute($params);
    $error = dbCheckError($sqlQuery);
    if ($error['error'] === true) {
    //сюди не дойде
        $response = false;
        exit();
    } else {
//        $response = ['error'=>false,'errorInfo'=>'','response'=>$sqlQuery];
        $response = true;

    }
    return $response;
}

function setDbQuery(string $sql, array $params = [])
{
    $db = dbInstance();
    $sqlQuery = $db->prepare($sql);

    $sqlQuery->execute($params);
    $error = dbCheckError($sqlQuery);

    if ($error['error'] === true) {
        $response = false;
        exit();
    } else {
        $response = $db->lastInsertId();
    }
    return $response;
}

function dbCheckError(PDOStatement $sqlQuery): array
{

    $errorInfo = $sqlQuery->errorInfo();
    if ($errorInfo[0] !== PDO::ERR_NONE) {
        http_response_code(400);
        die(json_encode($errorInfo[2]));
        die();
    }
    return ['error' => false, 'errorInfo' => $errorInfo, 'response' => ''];
}


