CREATE DATABASE Health;

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password) VALUES ('Andy', 'aaaa@email.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Andy', 'aaaa22@email.com', 'password');
