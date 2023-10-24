CREATE DATABASE IF NOT EXISTS alexis_ecf_bdd_hiver_2023;

use alexis_ecf_bdd_hiver_2023;

CREATE table `hours`
  (
    id    INT UNIQUE AUTO_INCREMENT NOT NULL,
    day   INT                       NOT NULL,
    begin VARCHAR(20)               NOT NULL,
    end   VARCHAR(20)               NOT NULL,
    primary key (id)
  );

CREATE table `cars`
  (
    id          INT UNIQUE AUTO_INCREMENT NOT NULL,
    name        VARCHAR(100)              NOT NULL,
    price       INT                       NOT NULL,
    year        INT(4)                    NOT NULL,
    fuel        VARCHAR(10)               NOT NULL,
    km          INT                       NOT NULL,
    mainPicture VARCHAR(100)              NOT NULL,
    gallery     JSON                      NOT NULL,
    options     JSON                      NOT NULL,
    primary key (id)
  );

CREATE table `comments`
  (
    id      INT UNIQUE AUTO_INCREMENT NOT NULL,
    message TEXT                      NOT NULL,
    note    INT                       NOT NULL,
    enable  TINYINT(1)                NOT NULL,
    primary key (id)
  );

CREATE table `services`
  (
    id    INT UNIQUE AUTO_INCREMENT NOT NULL,
    title VARCHAR(50)               NOT NULL,
    text  TEXT                      NOT NULL,
    primary key (id)
  );

CREATE table `users`
  (
    id       INT UNIQUE AUTO_INCREMENT NOT NULL,
    isAdmin  TINYINT(1)                NOT NULL,
    account  VARCHAR(50) UNIQUE        NOT NULL,
    password VARCHAR(128)               NOT NULL,
    primary key (id)
  )
