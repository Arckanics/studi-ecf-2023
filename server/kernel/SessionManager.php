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
      'isAdmin' => $this->convertToBool($user['isAdmin']),
      'device' => $this->makeUniq($user),
      'expireAt' => $this->resetLifeTime()
    ];
    $filePath = "$this->sessionDir/$this->token.json";
    $sess = fopen($filePath, "w+");
    flock($sess, LOCK_EX);
    fwrite($sess, json_encode($session));
    flock($sess, LOCK_UN);
    fclose($sess);
  }

  private function prepareToken($user)
  {
    $response = [
      'token' => $this->token,
      'isAdmin' => $this->convertToBool($user['isAdmin'])
    ];
    return json_encode($response, JSON_THROW_ON_ERROR);
  }

  private function makeUniq($user)
  {
    $remote = $_SERVER['REMOTE_ADDR'];
    $agent = $_SERVER['HTTP_USER_AGENT'];
    $uid = $user['id'];
    return "$remote/$agent - user $uid";
  }

  private function cleanSessions($user)
  {
    $files = scandir($this->sessionDir);
    foreach ($files as $file) {
      if (preg_match('/\.json$/', $file)) {
        $filePath = "$this->sessionDir/$file";
        $session = json_decode(file_get_contents($filePath), true);
        if ($session['device'] === $this->makeUniq($user)) {
          unlink($filePath);
        }
      }
    }
  }

  public function connect(): false|array|string
  {
    $data = [...$_POST];
    if (count($data) === 0) {
      $post_body = json_decode(file_get_contents('php://input'), true);
      $data = $post_body;
    }
    $this->token = bin2hex(random_bytes(16));
    $user = $this->entity->findUser($data);
    if (is_array($user)) {
      $this->cleanSessions($user);
      $this->storeSession($user);
      return $this->prepareToken($user);
    }
    return $user;
  }

  public function disconnect($token = "")
  {
    $this->token = $token;
    $fileToDel = $this->sessionDir . "/$this->token.json";
    if (file_exists($fileToDel)) {
      unlink($fileToDel);
    }
    return ['isConnected' => false];
  }

  public function getSession($token = "", $request = true)
  {
    $this->token = $token;
    $filePath = $this->sessionDir . "/$token.json";
    if (file_exists( "$this->sessionDir/$token.json")) {
      $session = [...json_decode(file_get_contents($filePath), true)];
      if ($this->resetLifeTime() < $session["expireAt"]) {
        http_response_code(440);
        $this->disconnect($token);
        return "session expired";
      }
      $session["expireAt"] = $this->resetLifeTime();
      $this->storeSession($session);
      return $this->prepareToken($session);
    }
    http_response_code(403);
    return false;
  }
}
