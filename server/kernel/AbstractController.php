<?php

namespace kernel;
class AbstractController implements ControllerInterface {
  protected $headers = null;
  protected string|false $session;

  public function __construct()
  {
    $this->headers = getallheaders();
    $session = new SessionManager();
    $this->session = $session->getSession($this->headers['Auth-User']);
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
