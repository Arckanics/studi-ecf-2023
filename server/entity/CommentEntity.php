<?php

namespace entity;

use kernel\AbstractEntity;

class CommentEntity extends AbstractEntity
{
  private $table = "comments";

  public function getAll($withStatus = false)
  {
    $sql = $withStatus ?
      "select * from $this->table" :
      "select name, message, note from $this->table";

    $data = $this->pdo->query($sql);
    if (!$withStatus) {
      return $data;
    }

    $formatData = [];
    foreach ($data as $row) {
      $row['enabled'] = $this->convertToBool($row['enabled']);
      $formatData[] = $row;
    }
    return $formatData;
  }

}
