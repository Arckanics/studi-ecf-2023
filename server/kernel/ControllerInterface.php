<?php

namespace kernel;

interface ControllerInterface {
  public function get();
  public function put();
  public function post();
  public function delete();
}
