<?php

$status = getallheaders();

if (!isset($status['XML-Http-Request'])) {
  echo file_get_contents(__DIR__ . '/main.html');
}
