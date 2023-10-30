<?php

namespace Controllers;

use entity\MessagesEntity;
use kernel\AbstractController;

class MessagesController extends AbstractController
{

  private ?MessagesEntity $entity;
  public function __construct()
  {
    parent::__construct();
    $this->entity = new MessagesEntity();
  }

  public function get()
  {
    return $this->entity->get();
  }

  public function put()
  {
    return $this->entity->put();
  }

  public function post() {
    return $this->entity->post();
  }
}
