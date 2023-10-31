<?php

namespace Controllers;

use entity\CountsEntity;
use kernel\AbstractController;

class CountsController extends AbstractController
{

  private CountsEntity $entity;
  public function __construct()
  {
    parent::__construct();
    $this->entity = new CountsEntity();
  }

  public function get()
  {
    return $this->entity->get();
  }

}
