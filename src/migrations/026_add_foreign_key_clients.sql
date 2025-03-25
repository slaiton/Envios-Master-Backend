ALTER TABLE users 
ADD CONSTRAINT fk_clients_user FOREIGN KEY (id_client) REFERENCES clients(id);