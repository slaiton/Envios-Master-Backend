ALTER TABLE vehicles 
ADD CONSTRAINT fk_vehicles_brand FOREIGN KEY (id_brand) REFERENCES brands(id),
ADD CONSTRAINT fk_vehicles_class FOREIGN KEY (id_class) REFERENCES class(id),
ADD CONSTRAINT fk_vehicles_status FOREIGN KEY (id_status) REFERENCES status(id);