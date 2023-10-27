<?php

namespace entity;

use kernel\AbstractEntity;

class CarEntity extends AbstractEntity
{
  public function __construct()
  {
    parent::__construct();
    $this->table = "cars";
  }
  public function getAll()
  {
    return $this->pdo->getAll($this->table);
  }
}
