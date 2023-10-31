<?php

namespace public;
use Controllers\AccountsController;
use Controllers\CarsController;
use Controllers\CommentsController;
use Controllers\CountsController;
use Controllers\HoursController;
use Controllers\MessagesController;
use Controllers\ServicesController;
use kernel\SessionManager;

require_once "../kernel/autoloader.php";


$status = getallheaders();
$method = strtolower($_SERVER['REQUEST_METHOD']);
function staticReturn(): void {
  echo file_get_contents(__DIR__ . '/main.html');
}

function dataResponse ($class, $method): void
{
  echo json_encode($class->$method());
}

function provideSession($disconnect = false): void
{
  global $method, $status;
  $session = new SessionManager();
  if ($method !== "post") {
    http_response_code(403);
    echo "la méthode '$method' de requête n'est pas authorisée sur cette route !";
  } else {

    if (!isset($status['Auth-User'])) {
      echo json_encode($session->connect());
    } else {
      if (!$disconnect) {
        echo json_encode($session->getSession($status['Auth-User']));
      } else {
        echo json_encode($session->disconnect($status['Auth-User']));
      }
    }

  }

}

if (!isset($status['XML-Http-Request'])) {
  staticReturn();
} else {
  $uri = $_SERVER['REQUEST_URI'];
  if (preg_match("/[&?=]/",$uri)) {
    $path = explode('?', $uri);
    $uri = $path[0];
  }
  switch (true) {
    case $uri === "/comments":
      return dataResponse(new CommentsController(), $method);
    case $uri === "/services":
      return dataResponse(new ServicesController(), $method);
    case $uri === "/hours":
      return dataResponse(new HoursController(), $method);
    case $uri === "/cars":
      return dataResponse(new CarsController(), $method);
    case $uri === "/messages":
      return dataResponse(new MessagesController(), $method);
    case $uri === "/accounts":
      return dataResponse(new AccountsController(), $method);
    case $uri === "/counts":
      return dataResponse(new CountsController(), $method);
    case $uri === "/users":
      return provideSession();
    case $uri === "/logout":
      return provideSession(true);
    default:
      echo $uri;
      return staticReturn();
  }
}
