<?php


require_once 'colors.php';
require_once __DIR__ . "/../../server/_config.php";
function installFixtures($pdo)
{
  $colors = new Colors();
  $sqlScript = file_get_contents(__DIR__ . "/../sql/fixtures.sql");
  echo $colors->getColoredString("installation des Fixtures..." . PHP_EOL, "yellow");
  try {
    $pdo->exec($sqlScript);
    $color = new Colors();
    echo $color->getColoredString("Fixtures installées !" . PHP_EOL, "green");
  } catch (Exception $e) {
    echo $e->getMessage();
  }
}
