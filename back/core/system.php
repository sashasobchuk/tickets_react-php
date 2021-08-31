<?php
function checkControllerName(string $name): bool
{
    /** для безпеки сайту*/
    return !!preg_match('/^[aA-zZ0-9_-]+$/', $name);
}


function parseUrl(string $url): array
{
    if (strpos($url, '/')) {
//        var_dump($url);
        $params = explode('/', $url);
//        var_dump($params);
//        die();
        return $params;
    } else {
        return [0 => $url];
    }
}

function parseParams(string $url)
{
    /** data from queryString put into array and return*/
    if (strpos($url, '?')) {
        $params = explode('?', $url);
        if (strpos($url, '&')) {
            $params = explode('&', $params[1]);
            $queryParams = [];
            foreach ($params as $key => $value) {
                $query = explode('=', $value);
                $queryParams[$query[0]] = $query[1];
            }
        } else return [];

    } else return [];
    /*    echo "<pre>";
        print_r($queryParams);
        echo "<pre>";*/
    return $queryParams;
}












