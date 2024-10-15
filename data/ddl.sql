DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
    `id` int auto_increment,
    `name` varchar(50),
    `price` integer,
    `unit` varchar(10),
    PRIMARY KEY (`id`)
)ENGINE=InnoDB;

INSERT INTO `product`(name,price,unit)
VALUES
    ('carrot','10','kg'),
    ('chili','2','kg'),
    ('mango','20','kg');