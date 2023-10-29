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

  public function get()
  {
    if (!$this->session) {
      return $this->forbiddenError();
    }
    if (!$this->session->isAdmin) {
      return $this->forbiddenError();
    }
    return $this->entity->get();
  }
}
