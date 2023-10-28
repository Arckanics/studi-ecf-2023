<?php

namespace entity;

use kernel\AbstractEntity;

class CarEntity extends AbstractEntity
{
  public function __construct()
  {
    parent::__construct();
    $this->table = "cars";
  }

  public function getAll()
  {
    return $this->pdo->getAll($this->table);
  }
  public function post()
  {
    $body = $this->getBody();
    $formatBody = [];
    $formatBody['gallery'] = [];
    $imgs = [];
    $path = __DIR__.'/../public/img/';

    // prepare files
    if ($_FILES) {
      foreach ($_FILES as $key => $file) {
        $file_name = $this->genId(10).'-'.$file["name"];
        $imgs[$key] = $file_name;
        if (isset($body['mainPicture'])) {
          if ($file["name"] == $body["mainPicture"]) {
            $body['mainPicture'] = $file_name;
          }
        }
        move_uploaded_file($file["tmp_name"], $path.'/'.$file_name);
      }
    }

    foreach ($body as $key => $input) {
      if (preg_match('/^gallery-/', $key)) {
        $imgs[$key] = $input;
      } else {
        $formatBody[$key] = $input;
      }
    }
    ksort($imgs);
    if (isset($body['id'])) {
      $row = $this->pdo->findOne($this->table, ['id' => $body['id']]);
      if ($row) {
        $storedImgs = json_decode($row['gallery']);
        foreach ($storedImgs as $img) {
          if (!in_array($img, $imgs, true)) {
            $imgFile = "$path"."/$img";
            if (file_exists($imgFile)) {
              unlink($imgFile);
            }
          }
        }
      }

    }
    foreach ($imgs as $key => $val) {
      if (isset($formatBody['mainPicture'])) {
        if ($formatBody['mainPicture'] !== $val) {
          $formatBody['gallery'][] = $val;
        }
      } else {
        $formatBody['gallery'][] = $val;
      }
    }
    if (!isset($formatBody['mainPicture'])) {
      $formatBody['mainPicture'] = $formatBody['gallery'][0];
      unset($formatBody['gallery'][0]);
    }
    $formatBody['gallery'] = json_encode($formatBody['gallery']);
    if (isset($body['id'])) {
      return $this->pdo->updateOne($this->table, $formatBody);
    }
    return $this->pdo->insertOne($this->table, $formatBody);
  }

  public function delete()
  {
    $body = $this->getBody();
    $row = $this->pdo->findOne($this->table, ['id' => $body['id']]);
    $imgs = json_decode($row['gallery']);
    $imgs[] = $row['mainPicture'];
    $path = __DIR__ . "/../public/img/";
    foreach ($imgs as $img) {
      $file = $path.$img;
      if (file_exists($file)) {
        unlink($file);
      }
    }
    return parent::delete();
  }
}
