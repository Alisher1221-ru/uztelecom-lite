-- migrate:up
CREATE TABLE IF NOT EXISTS product (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `title` varchar(100),
    `description` varchar(100),
    `internet` varchar(100),
    `sms` varchar(100),
    `more_details` varchar(100),
    `price` varchar(100),
    `images` varchar(255),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `email` varchar(100),
    `password` varchar(100),
    `phone` varchar(100),
    `user_name` varchar(100),
    `role` ENUM("user", "admin"),
    `refresh_token` varchar(255),
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255),
    `parant_id` integer,
    `created_at` datetime DEFAULT NOW(),
    `updated_at` datetime DEFAULT NOW()
);

ALTER TABLE `category` ADD FOREIGN KEY (`parant_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS carusel (
    `id` integer PRIMARY KEY AUTO_INCREMENT,
    `img` varchar(100),
    `link` varchar(100)
);

-- migrate:down
DROP DATABASE uztelecom;
