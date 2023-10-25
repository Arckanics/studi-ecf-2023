<?php


require_once 'colors.php';
require_once __DIR__ . "/../../server/_config.php";
function installBdd($pdo)
{
  $colors = new Colors();
  $bdd = $_ENV['APP_BDD'];
  $sqlScript = "CREATE DATABASE IF NOT EXISTS $bdd; use $bdd;";
  $sqlScript .= file_get_contents(__DIR__ . "/../sql/create-table.sql");
  echo $colors->getColoredString("installation..." . PHP_EOL, "yellow");
  try {
    $pdo->exec($sqlScript);
    $color = new Colors();
    echo $color->getColoredString("Requêtes SQL effectuées avec Succès !" . PHP_EOL, "green");
  } catch (Exception $e) {
    echo $e->getMessage();
  }
}
