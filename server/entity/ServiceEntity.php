<?php

namespace entity;

use kernel\AbstractEntity;

class ServiceEntity extends AbstractEntity
{
  public function __construct()
  {
    parent::__construct();
    $this->table = "services";
  }
  public function getAll()
  {
    return $this->pdo->getAll($this->table);
  }

  public function create()
  {
    return $this->pdo->insertOne($this->table, $this->getBody());
  }
}
