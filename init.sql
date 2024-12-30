-- init.sql
CREATE DATABASE IF NOT EXISTS users_db;

USE users_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(50),
    password VARCHAR(255) NOT NULL
);

-- Insertar un usuario predeterminado (opcional)
INSERT INTO users (name, email, type, password)
VALUES ('admin', 'admin@spsgroup.com.br', 'admin', '1234');
