<?php

namespace kernel;

require_once "../_config.php";
class PdoConnect {

  private $instance = null;
  private $pdo = null;
  private function __construct() {
    $server = $_ENV['APP_SERVER'];
    $bdd = $_ENV['APP_BDD'];
    $this->pdo = new PDO("mysql:host=$server;dbname=$bdd", $_ENV['APP_USER'], $_ENV['APP_PASS']);
  }

  public function getInstance() {
    if ($this->instance === null) {
      $this->instance = new self();
    }
    return $this->instance;
  }
}
