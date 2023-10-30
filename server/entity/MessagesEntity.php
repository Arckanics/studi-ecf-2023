<?php

namespace entity;

use kernel\AbstractEntity;

class MessagesEntity extends AbstractEntity
{

  public function __construct()
  {
    parent::__construct();
    $this->table = "messages";
  }

  public function get()
  {
    return $this->pdo->query("
      select * from $this->table ORDER BY id DESC
    ");
  }

  public function put() {
    $data = $this->pdo->updateOne($this->table, $this->getBody());
    if ($data) {
      $data['isRead'] = $this->convertToBool($data['isRead']);
      return $data;
    }
    http_response_code(404);
    return "not Found";
  }

  public function post()
  {
    $body = $this->getBody();
    $body['isRead'] = 0;

    if (!$this->validateName($body['name']) || !$this->validateName($body['firstname'])) {
      http_response_code(403);
      return "champs de noms invalide !";
    }
    if (!$this->validateMail($body['mail'])) {
      http_response_code(403);
      return "mail invalide !";
    }

    $query = $this->pdo->insertOne($this->table, $body);
    if ($query) {
      return "success";
    }
    http_response_code(500);
    return "error";
  }
}
