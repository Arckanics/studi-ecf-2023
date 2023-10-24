<?php

require_once 'colors.php';
require_once 'create-users.php';

$rootPath = __DIR__ . "/../";

$setup = [
  "APP_SERVER" => "",
  "APP_PORT" => "",
  "APP_BDD" => "",
  "APP_USER" => "",
  "APP_PASS" => "",
];
$colors = new Colors();
echo $colors->getColoredString("Voulez vous installer les configurations ? (o/N) : ", "cyan");
$setupCfg = readline();
$pdo = null;
$cfg = $rootPath."server/_config.php";

function pdoConnect($bdd = null) {
  $server = $_ENV['APP_SERVER'];
  $port = $_ENV['APP_PORT'];
  $bddSet = "";
  if ($bdd !== null) {
    $bddSet = ";dbname=$bdd";
  }
  return new PDO("mysql:host=$server;port=$port".$bddSet, $_ENV['APP_USER'], $_ENV['APP_PASS']);
}

// setup config files
if (strtolower($setupCfg) === "o") {
  function promptSetup($setup): array {
    $colors = new Colors();
    $res = [];
    foreach ($setup as $key => $val) {
      echo $colors->getColoredString("$key SQL :".PHP_EOL, "cyan");
      $res[$key] = readline();
    }
    return $res;
  }

  $setup = promptSetup($setup);


  if (file_exists($cfg)) {
    unlink($cfg);
  }

  $cfgFile = fopen($cfg, 'xb+');

  if ($cfgFile) {
    $content = "<?php".PHP_EOL;

    foreach ($setup as $key => $val) {
      $content .= '$_ENV["'.$key.'"] '."= \"$val\";".PHP_EOL;
    }

    fwrite($cfgFile, $content);

    fclose($cfgFile);
  }
  require_once $cfg;
  echo PHP_EOL . PHP_EOL;
} else {
  require_once $cfg;
}

echo $colors->getColoredString("Voulez vous installer la base de données ? (o/N) : ", "cyan");
$setupBdd = readline();


// install bdd
if (strtolower($setupBdd) === "o") {
  require_once "install-bdd.php";
  echo $colors->getColoredString("installation...".PHP_EOL, "yellow");
  installBdd(pdoConnect());
  echo PHP_EOL . PHP_EOL;
}

echo $colors->getColoredString("Voulez créer des compte utilisateurs ? (o/N) : ", "cyan");
$setupAccount = readline();

if (strtolower($setupAccount) === "o") {
  hashing(pdoConnect($_ENV['APP_BDD']));
}

