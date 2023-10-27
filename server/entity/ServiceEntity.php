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
}
