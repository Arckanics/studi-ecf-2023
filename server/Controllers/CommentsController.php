<?php

namespace Controllers;
use entity\CommentEntity;
use kernel\AbstractController;
use kernel\SessionManager;

class CommentsController extends AbstractController {

  private $entity = null;
  public function __construct()
  {
    parent::__construct();
    $this->entity = new CommentEntity();
  }

  public function get()
  {
    if ($this->session !== null) {

      return $this->entity->getAll(true);
    }
    return $this->entity->getAll();
  }

  public function put()
  {

    if (!$this->session) {
      return $this->forbiddenError();
    }
    return $this->entity->update();
  }

  public function post()
  {
    if (!$this->session) {
      return $this->entity->create(true);
    }
    return $this->entity->create();
  }

  public function delete()
  {
    // TODO: Implement delete() method.
  }
}
