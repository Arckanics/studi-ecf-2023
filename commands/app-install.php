<?php


require_once 'scripts/colors.php';
require_once 'scripts/create-users.php';

$rootPath = __DIR__ . "/../";

$setup = [
  "APP_SERVER" => "",
  "APP_PORT" => "",
  "APP_BDD" => "",
  "APP_USER" => "",
  "APP_PASS" => "",
];
$colors = new Colors();

$pdo = null;
$cfg = $rootPath . "server/_config.php";
$connectTry = 0;
$pdoSuccess = false;

// PDO Connection Manager
function pdoConnect($bdd = null)
{
  global $colors, $connectTry, $pdoSuccess;
  $server = $_ENV['APP_SERVER'];
  $port = $_ENV['APP_PORT'];
  $bddSet = "";
  if ($bdd !== null) {
    $bddSet = ";dbname=$bdd";
  }
  $pdo = null;
  if (!$pdoSuccess) {
    echo $colors->getColoredString("Connection..." . PHP_EOL, "yellow");
  }
  try {
    $pdo = new PDO("mysql:host=$server;port=$port" . $bddSet, $_ENV['APP_USER'], $_ENV['APP_PASS']);
    if (!$pdoSuccess) {
      echo $colors->getColoredString("PDO : Connexion établie !" . PHP_EOL, "green");
    }
    $pdoSuccess = true;
  } catch (Exception $e) {
    $pdoSuccess = false;
    $msg = "";
    echo $e->getMessage().PHP_EOL;
    $noRetry = false;
    switch ($e->getCode()) {
      case 2002:
        $msg = "Erreur (2002) (SQL): le serveur semble hors ligne";
        break;
      case 1045:
        $msg = "Erreur (1045) (SQL): Utilisateur ou mot de passe incorrect (".$_ENV['APP_USER'].")";
        $noRetry = true;
        break;
    }

    echo $colors->getColoredString($msg, "light_red");
    echo $colors->getColoredString(" essais (" . ($connectTry + 1) . "/5) " . PHP_EOL, "white");

    $connectTry++;
    if ($connectTry == 5 || $noRetry == true) {
      echo $colors->getColoredString("Arrêt du script...", "white");
      exit(0);
    }

    echo $colors->getColoredString("Appuyer sur entrée pour une nouvelle tentative", "yellow");
    $blank = readline();
    pdoConnect($bdd);
  }
  return $pdo;
}

// setup config files
echo $colors->getColoredString("Voulez vous installer les configurations ? (o/N) : ", "cyan");
$setupCfg = readline();
if (strtolower($setupCfg) === "o") {
  function promptSetup($setup): array
  {
    $colors = new Colors();
    $res = [];
    foreach ($setup as $key => $val) {
      echo $colors->getColoredString("$key SQL :" . PHP_EOL, "cyan");
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
    $content = "<?php" . PHP_EOL;
    foreach ($setup as $key => $val) {
      $content .= '$_ENV["' . $key . '"] ' . "= \"$val\";" . PHP_EOL;
    }
    fwrite($cfgFile, $content);
    fclose($cfgFile);
  }
  require_once $cfg;
  echo PHP_EOL;
} else {
  require_once $cfg;
}

// install Bdd
echo $colors->getColoredString("Voulez vous installer la base de données ? (o/N) : ", "cyan");
$setupBdd = readline();
if (strtolower($setupBdd) === "o") {
  require_once "scripts/install-bdd.php";
  installBdd(pdoConnect());
  echo PHP_EOL;
}

// install Fixtures
echo $colors->getColoredString("Voulez vous installer les fixtures ? (o/N) : ", "cyan");
$setupFixt = readline();
if (strtolower($setupFixt) === "o") {
  require_once "scripts/install-fixtures.php";
  installFixtures(pdoConnect($_ENV['APP_BDD']));
  echo PHP_EOL;
}

// create Users
echo $colors->getColoredString("Voulez créer des compte utilisateurs ? (o/N) : ", "cyan");
$setupAccount = readline();

if (strtolower($setupAccount) === "o") {
  createUser(pdoConnect($_ENV['APP_BDD']));
}



// installation ended
echo $colors->getColoredString("Installation terminée !".PHP_EOL, "green");
