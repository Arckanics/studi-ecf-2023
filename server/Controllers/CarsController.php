<?php

namespace Controllers;

use entity\CarEntity;
use kernel\AbstractController;

class CarsController extends AbstractController
{
  private $entity = null;
  public function __construct()
  {
    parent::__construct();
    $this->entity = new CarEntity();
  }
  function get()
  {
    return $this->entity->getAll();
  }
}
