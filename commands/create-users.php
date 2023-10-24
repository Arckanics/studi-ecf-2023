<?php

require_once "colors.php";

$color = new Colors();

function isAdmin($bool)
{
  if ($bool === "o") {
    return 1;
  }
  return 0;
}

function hashing($pdo)
{
  global $color;

  echo $color->getColoredString("saisissez votre email : ", "cyan");
  $email = readline();
  echo $color->getColoredString("saisissez votre mot de passe : ", "cyan");
  $password = readline();
  echo $color->getColoredString("administrateur (o/N) : ", "cyan");
  $isAdmin = readline();
  $crypted = password_hash($password, PASSWORD_BCRYPT);

  echo $color->getColoredString("Commande SQL : " . PHP_EOL, "cyan");
  echo $color->getColoredString("Requête pour le Compte : ($email)" . PHP_EOL, "Yellow");
  try {
    $pdo->exec("insert into users (id, isAdmin, account, password) VALUE (NULL, " . isAdmin($isAdmin) . " ,'$email','$crypted')");
    echo $color->getColoredString("Compte Ajouté !".PHP_EOL, "green");
  } catch (Exception $e) {
    $msg = $e->getMessage();
    echo $color->getColoredString(PHP_EOL . $msg . PHP_EOL, "red");
  }
  echo $color->getColoredString("voulez-vous ajouter un autre compte ? (O/n) : ", "yellow");
  $reset = readline();
  echo PHP_EOL . PHP_EOL;
  if ($reset === "n") {
    return false;
  }
  echo PHP_EOL . PHP_EOL;
  return hashing($pdo);
}

