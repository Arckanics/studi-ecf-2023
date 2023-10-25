<?php

namespace Controllers;

use entity\ServiceEntity;
use kernel\AbstractController;

class ServicesController extends AbstractController
{
  private $entity = null;

  public function __construct()
  {
    $this->entity = new ServiceEntity();
  }
  public function get()
  {
    return $this->entity->getAll();
  }
}
