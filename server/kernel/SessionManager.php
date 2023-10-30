<?php

namespace kernel;

use entity\UsersEntity;
use kernel\PdoConnect;

class SessionManager extends globalMethod
{
  private string $token = "";
  private ?UsersEntity $entity = null;
  private int $lifetime = 2 * 60 * 60;
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
    }
    openSessionDock($this->sessionDir);
    $this->entity = new UsersEntity();
  }

  private function resetLifeTime()
  {
    return time() + $this->lifetime;
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
    $sess = fopen($filePath, 'wb');
    fwrite($sess, json_encode($session));
    fclose($sess);
  }

  private function prepareToken($user)
  {
    $response = [
      'token' => $this->token,
      'isAdmin' => $this->convertToBool($user['isAdmin'])
    ];
    return $response;
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
    function awaitFile($path) {
      $file = fopen($path, "rb");
      $size = filesize($path);
      while ($file === false) {
        if (file_exists($path)) {
          $file = fopen($path, "rb");
          $size = filesize($path);
        }
      }
      stream_set_blocking($file, FALSE);
      $data = fread($file, $size);
      fclose($file);
      try {
        return json_decode($data, true, 512, JSON_THROW_ON_ERROR);
      } catch (\Exception $e) {
        usleep(100);
        return awaitFile($path);
      }
    }

    $this->token = $token;
    $filePath = $this->sessionDir . "/$token.json";
    if (file_exists( "$this->sessionDir/$token.json")) {
      $session = awaitFile($filePath);

      if (is_null($session["expireAt"])) {
        var_dump($session);
      }

      if ($session["expireAt"] < time()) {
        http_response_code(440);
        // $this->disconnect($token);
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
