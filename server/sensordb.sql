CREATE TABLE "valores" (
  "valor_id" integer PRIMARY KEY,
  "lugar_id" integer,
  "tempValue" float,
  "humValue" float,
  "fecha" timestamp
);

CREATE TABLE "usuarios" (
  "user_id" integer PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "password" string
);

CREATE TABLE "lugares" (
  "lugar_id" integer PRIMARY KEY,
  "name" varchar,
  "tempMax" float,
  "tempMin" float,
  "humMax" float,
  "humMin" float
);

CREATE TABLE "hist_values" (
  "hist_value_id" integer PRIMARY KEY,
  "value_id" integer
);

CREATE TABLE "configs" (
  "config_id" integer PRIMARY KEY,
  "email" string,
  "password" string
);

ALTER TABLE "valores" ADD FOREIGN KEY ("lugar_id") REFERENCES "lugares" ("lugar_id");

ALTER TABLE "hist_values" ADD FOREIGN KEY ("value_id") REFERENCES "valores" ("valor_id");
