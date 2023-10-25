<?php

namespace kernel;

require_once "../_config.php";
class PdoConnect {

  private static $instance = null;
  private $pdo = null;
  private function __construct() {
    $server = $_ENV['APP_SERVER'];
    $bdd = $_ENV['APP_BDD'];
    $port = $_ENV['APP_PORT'];

    try {
      $this->pdo = new \PDO("mysql:host=$server;port=$port;dbname=$bdd", $_ENV['APP_USER'], $_ENV['APP_PASS']);
    } catch (\Exception $e) {
      $msg = $e->getMessage();
      echo "
        <div
            style='
                outline: 1px solid rgba(0,0,0,0.3);
                outline-offset: -1px;
                box-shadow: 1px 4px 12px 0 rgba(0,0,0,0.3);
                padding: .4rem .8rem;
                margin-bottom: 1rem;
                border-radius: .375rem;
                font-family: system-ui;
                background-color: #bf6000;
                color: white'
            ><span style='font-weight: bold'>Erreur SQL : </span>$msg</div>
      ";
    }
  }

  public static function getInstance(): ?PdoConnect
  {
    if (self::$instance === null) {
      self::$instance = new self();
    }
    return self::$instance;
  }
}