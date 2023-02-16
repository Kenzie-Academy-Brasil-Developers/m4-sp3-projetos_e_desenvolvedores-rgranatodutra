/* Códigos de criação de tabelas */
CREATE TABLE developer_infos (
  "id" BIGSERIAL PRIMARY KEY,
  "developerSince" DATE NOT NULL,
  "preferedOS" os NOT NULL
);

CREATE TABLE developers (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE projects (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "description" TEXT NOT NULL,
  "estimatedTime" VARCHAR(20) NOT NULL,
  "repository" VARCHAR(120) NOT NULL,
  "startDate" DATE NOT NULL,
  "endDate" DATE
);

CREATE TABLE technologies (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL
);

CREATE TABLE projects_technologies (
  "id" BIGSERIAL,
  "addedIn" DATE NOT NULL
);

/* Inserção de dados chumbados */
INSERT INTO
	technologies ("name")
VALUES
	('JavaScript'),
	('Python'),
	('React'),
	('Express.js'),
	('HTML'),
	('CSS'),
	('Django'),
	('PostgreSQL'),
	('MongoDB')
;