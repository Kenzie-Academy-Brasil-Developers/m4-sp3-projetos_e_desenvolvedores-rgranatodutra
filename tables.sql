CREATE TYPE os AS ENUM('Windows', 'Linux', 'macOS');

CREATE TABLE developer_infos (
  "id" BIGSERIAL PRIMARY KEY,
  "developerSince" DATE NOT NULL,
  "preferredOS" os NOT NULL
);

CREATE TABLE developers(
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "developerInfoId" INTEGER UNIQUE,
  CONSTRAINT "fkDeveloperInfoId"
    FOREIGN KEY ("developerInfoId") 
    REFERENCES developer_infos("id")
    ON DELETE SET NULL
);

CREATE TABLE projects (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "description" TEXT NOT NULL,
  "estimatedTime" VARCHAR(20) NOT NULL,
  "repository" VARCHAR(120) NOT NULL,
  "startDate" DATE NOT NULL,
  "endDate" DATE,
  "developerId" INTEGER NOT NULL,
  CONSTRAINT "fkDeveloperId"
    FOREIGN KEY ("developerId") 
    REFERENCES developers(id)
    ON DELETE CASCADE
);

CREATE TABLE technologies (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL
);

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

CREATE TABLE projects_technologies (
  "id" BIGSERIAL PRIMARY KEY,
  "addedIn" DATE NOT NULL,
  "projectId" INTEGER NOT NULL,
  "technologyId" INTEGER NOT NULL,
  CONSTRAINT "fkProjectId"
    FOREIGN KEY ("projectId") 
    REFERENCES projects(id)
    ON DELETE CASCADE,
  CONSTRAINT "fkTechnologyId"
    FOREIGN KEY ("technologyId") 
    REFERENCES technologies(id)
    ON DELETE CASCADE,
  UNIQUE ("projectId", "technologyId")
);
