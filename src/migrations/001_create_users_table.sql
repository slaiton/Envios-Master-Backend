CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    id_rol INT DEFAULT NULL,
    id_client INT DEFAULT NULL,
    id_user_create INT DEFAULT NULL,
    id_user_update INT DEFAULT NULL,
    id_user_delete INT DEFAULT NULL,
    CONSTRAINT fk_users_user_create FOREIGN KEY (id_user_create) REFERENCES users(id),
    CONSTRAINT fk_users_user_update FOREIGN KEY (id_user_update) REFERENCES users(id),
    CONSTRAINT fk_users_user_delete FOREIGN KEY (id_user_delete) REFERENCES users(id)
);