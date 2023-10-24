<?php

namespace kernel;

use kernel\PdoConnect;

class SessionManager {
  private $token = "";
  private $sessDock = null;

  public function __construct()
  {
    function openSessionDock() {
      $dir = __DIR__ . '/SessDock';
      if (!file_exists($dir)) {
        if (!mkdir($dir, "0777") && !is_dir($dir)) {
          throw new \RuntimeException(sprintf('Directory "%s" was not created', $dir));
        }
      }
      return opendir($dir);
    }
    $pdo = PdoConnect::getInstance();
    $this->sessDock = openSessionDock();
    var_dump($this->sessDock);
  }

  public function __destruct()
  {
    closedir($this->sessDock);
  }

  public function create() {
    $this->token = bin2hex(random_bytes(32));
  }

  public function getSession($token = "") {
    $session = readdir($this->sessDock);
    var_dump($session);
  }
}
