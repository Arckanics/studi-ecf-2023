<?php

namespace entity;

use kernel\AbstractEntity;

class CountsEntity extends AbstractEntity
{

  public function get()
  {
    $list = [
      'services',
      'messages',
      'cars',
      'hours',
      'comments'
    ];
    $res = [];
    foreach ($list as $table) {
      $res[$table] = $this->pdo->query("
        SELECT COUNT(*) FROM $table
      ")[0]['COUNT(*)'];
    }

    return $res;
  }
}
