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
      $this->session = json_decode($sessM->getSession($this->headers['Auth-User'], false));
    } else {
      $this->session = null;
    }
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
