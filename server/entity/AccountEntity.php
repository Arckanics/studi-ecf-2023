<?php

namespace entity;

use kernel\AbstractEntity;

class AccountEntity extends AbstractEntity
{

  public function __construct()
  {
    parent::__construct();
    $this->table = "users";
  }

  public function get() {
    return $this->pdo->getAllWithFilters($this->table, ['isAdmin' => 0], ['id','account']);
  }

  private function validatePassword(string $pass) {
    switch (true) {
      case strlen($pass) < 5:
        return ["error" => true, "msg" => "mot de passe trop court"];
      case !preg_match('/[A-Z]/', $pass):
        return ["error" => true, "msg" => "if faut une majuscule"];
      default:
        return ["error" => false];
    }
  }

  public function post() {
    $body = $this->getBody();
    if (isset($body['password']) && isset($body['account'])) {
      if (!$this->validateMail($body['account'])) {
        http_response_code(400);
        return "email invalide";
      }
      $validator = $this->validatePassword($body['password']);
      if ($validator['error']) {
        http_response_code(400);
        return $validator['msg'];
      }
      $body['isAdmin'] = 0;
      $body['password'] = $this->hashPassword($body['password']);
      $request = $this->pdo->insertOne($this->table, $body);
      $result = [];
      $result['id'] = $request['id'];
      $result['account'] = $request['account'];
      return $result;
    }
    http_response_code(400);
    return "requête invalide";
  }
  public function put()
  {
    $body = $this->getBody();
    if (isset($body['password'])) {
      $validate = $this->validatePassword($body['password']);
      if ($validate['error']) {
        http_response_code(400);
        return $validate['msg'];
      }
      $body['password'] = $this->hashPassword($body['password']);
    }
    if (isset($body['account'])) {
      if (!$this->validateMail($body['account'])) {
        http_response_code(400);
        return "email non valide";
      }

    }

    $request = $this->pdo->updateOne($this->table, $body);
    $result = [];
    $result['id'] = $request['id'];
    $result['account'] = $request['account'];
    return $result;
  }
}
