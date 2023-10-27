<?php

namespace entity;

use kernel\AbstractEntity;

class CommentEntity extends AbstractEntity
{
  public function __construct()
  {
    parent::__construct();
    $this->table = "comments";
  }

  public function getAll($withStatus = false)
  {
    $sql = $withStatus ?
      "select * from $this->table" :
      "select name, message, note from $this->table";

    $data = $this->pdo->query($sql);
    if (!$withStatus) {
      return $data;
    }

    $formatData = [];
    foreach ($data as $row) {
      $row['enabled'] = $this->convertToBool($row['enabled']);
      $formatData[] = $row;
    }
    return $formatData;
  }

  public function create($client = false)
  {
    $request_body = $this->getBody();
    if ($client) {
      $request_body['enabled'] = false;
      $this->pdo->insertOne($this->table, $request_body);
      return true;
    }
    return $this->pdo->insertOne($this->table, $request_body);
  }


}
