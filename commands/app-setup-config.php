<?php

require_once 'colors.php';

$rootPath = __DIR__ . "/../";

$setup = [
  "APP_SERVER" => "",
  "APP_PORT" => "",
  "APP_BDD" => "",
  "APP_USER" => "",
  "APP_PASS" => "",
];

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

$cfg = $rootPath."server/_config.php";
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
