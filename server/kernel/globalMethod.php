<?php

namespace kernel;

class globalMethod
{

  public function convertToBool($val) {
    return match ($val) {
      false, "false", 0, "0" => false,
      true, "true", 1, "1" => true,
      default => false,
    };
  }

  public function boolToTinyInt($val) {
    return match ($val) {
      false => 0,
      true => 1,
      default => 0,
    };
  }
  public function isStrBool($val) {
    return match ($val) {
      "false", "FALSE", "true", "TRUE" => true,
      default => false
    };
  }
  public function boolStrToInt($val): int {
    return $this->convertToBool($val) ? 1 : 0;
  }
}
