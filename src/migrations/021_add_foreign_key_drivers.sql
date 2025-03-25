ALTER TABLE drivers 
ADD CONSTRAINT fk_drivers_status FOREIGN KEY (id_status) REFERENCES status(id);