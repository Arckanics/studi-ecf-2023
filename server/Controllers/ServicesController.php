<?php

namespace Controllers;

use entity\ServiceEntity;
use kernel\AbstractController;

class ServicesController extends AbstractController
{
  private $entity = null;

  public function __construct()
  {
    parent::__construct();
    $this->entity = new ServiceEntity();
  }
  public function get()
  {
    return $this->entity->getAll();
  }


  public function post()
  {
    if (!$this->session) {
      return $this->forbiddenError();
    }
    return $this->entity->create();
  }
  public function put()
  {

    if (!$this->session) {
      return $this->forbiddenError();
    }
    return $this->entity->update();
  }
}
