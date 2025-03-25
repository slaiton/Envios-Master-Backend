ALTER TABLE tracking 
ADD CONSTRAINT fk_tracking_orders FOREIGN KEY (id_order) REFERENCES orders(id),
ADD CONSTRAINT fk_tracking_status FOREIGN KEY (id_status) REFERENCES status_delivery(id);