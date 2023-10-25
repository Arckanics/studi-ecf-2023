<?php

namespace entity;

use kernel\AbstractEntity;

class UsersEntity extends AbstractEntity {
  private $table = "users";

  public function getUsers(): array
  {
    return $this->pdo->getAll($this->table);
  }
  public function findUser($data)
  {
    $user = $this->pdo->findOne($this->table, [
      "account" => $data["account"],
      "isAdmin" => $data["isAdmin"]
    ]);
    if (count($user) === 0) {
      http_response_code(404);
      return "User Not Found";
    }
    if (password_verify($data['password'], $user['password'])) {
      http_response_code(200);
      return [...$user, "password" => null];
    }
    http_response_code(404);
    return "Bad credentials";
  }
}
