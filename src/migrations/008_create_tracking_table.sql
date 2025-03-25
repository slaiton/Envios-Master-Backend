CREATE TABLE tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    id_status INT NOT NULL,
    observation VARCHAR(500) NULL,
    id_user_create INT NOT NULL,
    id_user_update INT DEFAULT NULL,
    id_user_delete INT DEFAULT NULL,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_tracking_user_create FOREIGN KEY (id_user_create) REFERENCES users(id),
    CONSTRAINT fk_tracking_user_update FOREIGN KEY (id_user_update) REFERENCES users(id),
    CONSTRAINT fk_tracking_user_delete FOREIGN KEY (id_user_delete) REFERENCES users(id)
);