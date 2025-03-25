CREATE TABLE receivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    document VARCHAR(50) NOT NULL,
    celphone VARCHAR(20),
    address VARCHAR(255),
    id_city INT NOT NULL,
    id_status INT NOT NULL,
    id_user_create INT NOT NULL,
    id_user_update INT DEFAULT NULL,
    id_user_delete INT DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_receivers_user_create FOREIGN KEY (id_user_create) REFERENCES users(id),
    CONSTRAINT fk_receivers_user_update FOREIGN KEY (id_user_update) REFERENCES users(id),
    CONSTRAINT fk_receivers_user_delete FOREIGN KEY (id_user_delete) REFERENCES users(id),
    CONSTRAINT fk_receivers_city FOREIGN KEY (id_city) REFERENCES cities(id)
);