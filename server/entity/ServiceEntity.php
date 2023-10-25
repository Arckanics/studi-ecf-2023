<?php

namespace entity;

use kernel\AbstractEntity;

class ServiceEntity extends AbstractEntity
{
  private $table = "services";

  public function getAll()
  {
    return $this->pdo->getAll($this->table);
  }
}
