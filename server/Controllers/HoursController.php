<?php

namespace Controllers;

use entity\HourEntity;
use kernel\AbstractController;

class HoursController extends AbstractController
{
  private $entity = null;

  public function __construct()
  {
    parent::__construct();
    $this->entity = new HourEntity();
  }

  public function get()
  {
    return $this->entity->getAll();
  }


  public function post()
  {
    return $this->entity->create();
  }

  public function put()
  {
    return $this->entity->update();
  }

  public function delete()
  {
    if (!$this->session) {
      return $this->forbiddenError();
    }
    return $this->entity->delete();
  }
}
