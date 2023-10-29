<?php

namespace Controllers;
use entity\AccountEntity;
use kernel\AbstractController;

class AccountsController extends AbstractController {

  private $entity = null;

  public function __construct()
  {
    parent::__construct();
    $this->entity = new AccountEntity();
  }

  private function isAdmin() {
    if (!$this->session) {
      return false;
    }
    if (!$this->session->isAdmin) {
      return false;
    }
    return true;
  }
  public function get()
  {
    if (!$this->isAdmin()) {
      return $this->forbiddenError();
    }
    return $this->entity->get();
  }
  public function post()
  {
    if (!$this->isAdmin()) {
      return $this->forbiddenError();
    }
    return $this->entity->post();
  }

  public function put()
  {
    if (!$this->isAdmin()) {
      return $this->forbiddenError();
    }
    return $this->entity->put();
  }
  public function delete()
  {
    if (!$this->isAdmin()) {
      return $this->forbiddenError();
    }
    return $this->entity->delete();
  }
}
