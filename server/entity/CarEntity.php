<?php

namespace entity;

use kernel\AbstractEntity;

class CarEntity extends AbstractEntity
{
  private $table = "cars";

  public function getAll()
  {
    return $this->pdo->getAll($this->table);
  }
}
