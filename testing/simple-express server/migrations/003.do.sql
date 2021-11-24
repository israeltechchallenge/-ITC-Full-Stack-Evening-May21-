CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(36),
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_date  DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id)
);