CREATE TABLE detail_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_order INT NOT NULL,
    product VARCHAR(200),
    weight DECIMAL(10,2) NOT NULL,
    height DECIMAL(10,2) NOT NULL,
    length DECIMAL(10,2) NOT NULL,
    width DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_detail_order_order FOREIGN KEY (id_order) REFERENCES orders(id)
);