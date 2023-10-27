<?php

namespace entity;

use kernel\AbstractEntity;

class HourEntity extends AbstractEntity
{

  public function __construct()
  {
    parent::__construct();
    $this->table = "hours";
  }
  public function getAll()
  {
    return $this->pdo->getAll($this->table);
  }
}
