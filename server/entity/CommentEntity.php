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

    return $this->pdo->query($sql);
  }

}
