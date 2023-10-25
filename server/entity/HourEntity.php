<?php

namespace entity;

use kernel\AbstractEntity;

class HourEntity extends AbstractEntity
{
  private $table = "hours";

  public function getAll()
  {
    return $this->pdo->getAll($this->table);
  }
}
