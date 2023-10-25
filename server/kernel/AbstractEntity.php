<?php

namespace kernel;

class AbstractEntity
{
  protected $pdo = null;

  public function __construct() {
    $this->pdo = PdoConnect::getInstance();
  }
}
