<?php

namespace public;
use Controllers\CommentsController;
use Sessions\SessionManager;

require_once "../kernel/autoloader.php";


$status = getallheaders();

function staticReturn(): void {
  echo file_get_contents(__DIR__ . '/main.html');
}

function dataResponse ($class)
{
  $method = strtolower($_SERVER['REQUEST_METHOD']);
  echo $class->$method();
}

function provideSession(){
  $session = new SessionManager();
  if (!isset($status['Auth-user'])) {
    echo $session->create();
  } else {
    echo $session->getSession($status['Auth-user']);
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
    case $uri === "/comment":
      return dataResponse(new CommentsController());
    case $uri === "/users":
      return provideSession();
    default:
      echo $uri;
      return staticReturn();

  }
}
