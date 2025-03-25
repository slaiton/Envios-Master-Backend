ALTER TABLE orders 
ADD CONSTRAINT fk_orders_origin FOREIGN KEY (id_origin) REFERENCES cities(id),
ADD CONSTRAINT fk_orders_destination FOREIGN KEY (id_destination) REFERENCES cities(id),
ADD CONSTRAINT fk_orders_vehicle FOREIGN KEY (id_vehicle) REFERENCES vehicles(id),
ADD CONSTRAINT fk_orders_driver FOREIGN KEY (id_driver) REFERENCES drivers(id),
ADD CONSTRAINT fk_orders_status FOREIGN KEY (id_status) REFERENCES status_delivery(id),
ADD CONSTRAINT fk_orders_cliente FOREIGN KEY (id_client) REFERENCES clients(id),
ADD CONSTRAINT fk_orders_sender FOREIGN KEY (id_sender) REFERENCES senders(id),
ADD CONSTRAINT fk_orders_receiver FOREIGN KEY (id_receiver) REFERENCES receivers(id) ;