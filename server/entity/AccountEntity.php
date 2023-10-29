<?php

namespace entity;

use kernel\AbstractEntity;

class AccountEntity extends AbstractEntity
{

  public function __construct()
  {
    parent::__construct();
    $this->table = "users";
  }

  public function get() {
    return $this->pdo->getAllWithFilters($this->table, ['isAdmin' => 0], ['id','account']);
  }
}
