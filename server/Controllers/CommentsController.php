<?php

namespace Controllers;
use entity\CommentEntity;
use kernel\AbstractController;

class CommentsController extends AbstractController {

  private $entity = null;

  public function __construct()
  {
    $this->entity = new CommentEntity();
  }

  public function get()
  {
    return $this->entity->getAll();
  }

  public function put()
  {
    // TODO: Implement put() method.
  }

  public function post()
  {
    // TODO: Implement post() method.
  }

  public function delete()
  {
    // TODO: Implement delete() method.
  }
}
