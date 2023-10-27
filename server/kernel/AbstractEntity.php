<?php

namespace kernel;

class AbstractEntity extends globalMethod
{
  protected $pdo = null;
  protected $table;

  public function __construct() {
    $this->pdo = PdoConnect::getInstance();
  }

  public function getBody() {
    if (count($_POST) == 0) {
      return json_decode(file_get_contents("php://input"), true);
    }
    return $_POST;
  }

  public function update() {
    $request_body = $this->getBody();
    return $this->pdo->updateOne($this->table, $request_body);
  }
}
