<?php

namespace kernel;
class AbstractController implements ControllerInterface {
  protected $headers = null;
  protected $session;

  public function __construct()
  {
    $this->headers = getallheaders();
    if (isset($this->headers['Auth-User'])) {
      $sessM = new SessionManager();
      $this->session = $sessM->getSession($this->headers['Auth-User']);
    } else {
      $this->session = null;
    }
  }

  protected function isAdmin() {
    if (!$this->session) {
      return false;
    }
    if (!$this->session['isAdmin']) {
      return false;
    }
    return true;
  }
  protected function forbiddenError() {
    http_response_code(403);
    return "403 Authorization";
  }
  public function get() {}
  public function post() {}
  public function put() {}
  public function delete() {}
}
