<?php

require_once 'colors.php';
function installBdd($pdo) {
  $sqlScript = file_get_contents(__DIR__."/install-bdd.sql");
  try {
    $pdo->exec($sqlScript);
    $color = new Colors();
    echo $color->getColoredString("Requêtes SQL effectuées avec Succès !".PHP_EOL, "green");
  } catch (Exception $e) {
    echo PHP_EOL.$e->getMessage().PHP_EOL;
  }
}
