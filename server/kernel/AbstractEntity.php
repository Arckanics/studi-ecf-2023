<?php

namespace kernel;

class AbstractEntity extends globalMethod
{
  protected $pdo = null;

  public function __construct() {
    $this->pdo = PdoConnect::getInstance();
  }
}
