<?php

namespace kernel;

use PDO;

require_once "../_config.php";

class PdoConnect extends globalMethod
{

  private static $instance = null;
  private $pdo = null;


  private function __construct()
  {
    $server = $_ENV['APP_SERVER'];
    $bdd = $_ENV['APP_BDD'];
    $port = $_ENV['APP_PORT'];

    try {
      $this->pdo = new \PDO("mysql:host=$server;port=$port;dbname=$bdd", $_ENV['APP_USER'], $_ENV['APP_PASS']);
    } catch (\Exception $e) {
      $msg = $e->getMessage();
      echo "
        <div
            style='
                outline: 1px solid rgba(0,0,0,0.3);
                outline-offset: -1px;
                box-shadow: 1px 4px 12px 0 rgba(0,0,0,0.3);
                padding: .4rem .8rem;
                margin-bottom: 1rem;
                border-radius: .375rem;
                font-family: system-ui;
                background-color: #bf6000;
                color: white'
            ><span style='font-weight: bold'>Erreur SQL : </span>$msg</div>
      ";
    }
  }

  public static function getInstance(): ?PdoConnect
  {
    if (self::$instance === null) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  //custom query
  public function query($sql) {
    return $this->pdo->query($sql)->fetchAll(\PDO::FETCH_ASSOC);
  }
  // get Queries
  public function getAll($table)
  {
    $query = $this->pdo->prepare("
      select * from $table
    ");
    $query->execute();
    return $query->fetchAll(\PDO::FETCH_ASSOC);
  }

  public function findOne($table, $filters)
  {
    $select = "select * from $table";
    $list = [$select . " where "];
    $param = [];
    foreach ($filters as $key => $val) {
      $val = $this->isStrBool($val) ? $this->boolStrToInt($val) : $val;
      $filters[$key] = $val;
      $param[] = "$key = :$key";
    }
    $sql = implode(" ", $list) . implode(" and ", $param);
    $query = $this->pdo->prepare($sql);
    $query->execute($filters);
    $stmt = $query->fetchAll(PDO::FETCH_ASSOC);

    return count($stmt) === 0 ? $stmt : $stmt[0];
  }

  public function updateOne($table, $data){
    $fields = [];
    $preData = [];
    foreach ($data as $key => $row) {
      if ($key !== "id") {
        $fields[] = "$key = :$key";
        $preData[$key] = is_bool($row) ? $this->boolToTinyInt($row): $row;
      }
    }
    $sql = "update $table set ".implode(", ",$fields)." where id = ".$data['id'].";";

    try {
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $query = $this->pdo->prepare($sql);
      $query->execute($preData);

      return $this->findOne($table, ["id" => $data["id"]]);
    } catch (\PDOException $e) {
      http_response_code(500);
      return "Erreur : " . $e->getMessage();
    }
  }

  public function insertOne($table, $data) {
    $columns = [];
    $values = [];
    $preData = [];
    foreach ($data as $key => $row) {
      $columns[] = "$key";
      $values[] = ":$key";
      $preData[$key] = is_bool($row) ? $this->boolToTinyInt($row): $row;
    }

    $columns = implode(", ",$columns);
    $values = implode(", ",$values);
    $sql = "insert into $table ($columns) values ($values)";


    try {
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $query = $this->pdo->prepare($sql);
      $query->execute($preData);

      return $data;
    } catch (\PDOException $e) {
      http_response_code(500);
      return "Erreur : " . $e->getMessage();
    }
  }
}
