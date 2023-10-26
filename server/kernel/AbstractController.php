<?php

namespace kernel;
class AbstractController implements ControllerInterface {
  protected $headers = null;
  protected string|null $session;

  public function __construct()
  {
    $this->headers = getallheaders();
    $session = new SessionManager();
    $this->session = isset($this->headers['Auth-User']) ? $session->getSession($this->headers['Auth-User'], !isset($this->headers['XML-Http-Request
	'])) : null;
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
