<?php

require_once "colors.php";

$color = new Colors();

function isAdmin($bool) {
  if ($bool === "o") {
    return 1;
  }
  return 0;
}

function hashing() {
  global $color;

  echo $color->getColoredString("saisissez votre email : ", "cyan");
  $email = readline();
  echo $color->getColoredString("saisissez votre mot de passe : ", "cyan");
  $password = readline();
  echo $color->getColoredString("administrateur (o/N) : ", "cyan");
  $isAdmin = readline();
  $crypted = password_hash($password, PASSWORD_BCRYPT);

  echo $color->getColoredString("Commande SQL : ".PHP_EOL, "cyan");
  echo $color->getColoredString("
    insert into users (id, isAdmin, account, password) VALUE (NULL, ".isAdmin($isAdmin)." ,'$email','$crypted')
  ".PHP_EOL, "white");

  echo $color->getColoredString("voulez-vous ajouter un autre compte ? (O/n) : ", "yellow");
  $reset = readline();
  if ($reset === "n") {
    return false;
  }
  echo PHP_EOL.PHP_EOL;
  return hashing();
}

hashing();
