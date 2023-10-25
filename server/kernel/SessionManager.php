<?php

namespace kernel;

use entity\UsersEntity;
use kernel\PdoConnect;

class SessionManager extends globalMethod
{
  private string $token = "";
  private ?UsersEntity $entity = null;
  private $sessDock = null;
  private int $lifetime = 2 * 60 * 60 * 1000;
  private string $sessionDir = __DIR__ . '/SessDock';

  public function __construct()
  {
    function openSessionDock($dir)
    {
      if (!file_exists($dir)) {
        if (!mkdir($dir, "0777") && !is_dir($dir)) {
          throw new \RuntimeException(sprintf('Directory "%s" was not created', $dir));
        }
      }
      return opendir($dir);
    }

    $this->sessDock = openSessionDock($this->sessionDir);
    $this->entity = new UsersEntity();
  }

  public function __destruct()
  {
    closedir($this->sessDock);
  }

  private function resetLifeTime()
  {
    return round(microtime(true) * 1000) + $this->lifetime;
  }

  private function storeSession($user): void
  {
    $session = [
      'id' => $user['id'],
      'account' => $user['account'],
      'isAdmin' => !($user['isAdmin'] === 0),
      'expireAt' => $this->resetLifeTime()
    ];
    $sess = fopen($this->sessionDir . "/$this->token.json", "w+");
    fwrite($sess, json_encode($session));
    fclose($sess);
  }

  private function prepareToken($user) {
    $response = [
      'token' => $this->token,
      'isAdmin' => !($user['isAdmin'] === 0)
    ];

    return json_encode($response, JSON_THROW_ON_ERROR);
  }

  public function connect(): false|array|string
  {
    $data = [...$_POST];
    $this->token = bin2hex(random_bytes(16));
    $user = $this->entity->findUser($data);
    if (is_array($user)) {
      $this->storeSession($user);
      return $this->prepareToken($user);
    }
    return $user;
  }

  public function disconnect($token = ""): void
  {
    $this->token = $token;
    unlink($this->sessionDir . "/$this->token.json");
  }
  public function getSession($token = "")
  {
    $this->token = $token;
    $sessionManager = glob($this->sessionDir."/$token.json");
    if (!empty($sessionManager)) {
      $session = [...json_decode(file_get_contents($sessionManager[0]), true)];
      if ($this->resetLifeTime() - $session["expireAt"] < 0) {
        http_response_code(440);
        $this->disconnect($token);
        return "session expired";
      }
      http_response_code(200);
      $session["expireAt"] = $this->resetLifeTime();
      $this->storeSession($session);
      return $this->prepareToken($session);
    }
    http_response_code(404);
    return "Session Not Found";
  }
}
