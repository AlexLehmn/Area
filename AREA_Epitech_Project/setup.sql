CREATE TABLE IF NOT EXISTS `users` (
  `id` int (11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `services` (
  `service_id` int (11) NOT NULL AUTO_INCREMENT,
  `user_id` int (11) NOT NULL,
  `service` varchar (20) NOT NULL,
  `action` varchar(50) NOT NULL,
  `reaction` varchar(50) NOT NULL,
  `config` varchar(500) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;