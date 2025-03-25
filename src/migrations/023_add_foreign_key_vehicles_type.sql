ALTER TABLE vehicles 
ADD CONSTRAINT fk_vehicule_type FOREIGN KEY (id_type) REFERENCES types_vehicle(id);