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
    if (count($_POST) === 0) {
      $input = json_decode(file_get_contents("php://input"), true);
      if ($input) {
        return $input;
      }
      if (count($_REQUEST) > 1) {
        return $_REQUEST;
      }
    }
    return $_POST;
  }

  protected function hashPassword(string $password) {
    return password_hash($password, PASSWORD_BCRYPT);
  }
  protected function validateMail(string $mail) {
    if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
      return true;
    }
    return false;
  }

  public function update() {
    $request_body = $this->getBody();
    return $this->pdo->updateOne($this->table, $request_body);
  }

  public function delete()
  {
    return $this->pdo->deleteOne($this->table, $this->getBody());
  }
}
