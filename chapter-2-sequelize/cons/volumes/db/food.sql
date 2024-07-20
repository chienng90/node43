CREATE DATABASE IF NOT EXISTS food;
USE food;

/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : food

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 20/07/2024 17:59:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food`  (
  `food_id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` float NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`food_id`) USING BTREE,
  INDEX `type_id`(`type_id` ASC) USING BTREE,
  CONSTRAINT `food_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `food_type` (`type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES (1, 'Margherita Pizza', 'images/margherita_pizza.jpg', 12.99, 'Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.', 1);
INSERT INTO `food` VALUES (2, 'Chicken Fajitas', 'images/chicken_fajitas.jpg', 15.5, 'Sizzling grilled chicken strips with peppers and onions, served with tortillas, salsa, and guacamole.', 2);
INSERT INTO `food` VALUES (3, 'Pad Thai', 'images/pad_thai.jpg', 11.75, 'Stir-fried rice noodles with chicken, vegetables, and a flavorful peanut sauce.', 3);
INSERT INTO `food` VALUES (4, 'Cheeseburger', 'images/cheeseburger.jpg', 9.99, 'All-American cheeseburger with a juicy beef patty, melted cheddar cheese, lettuce, tomato, and onion on a toasted bun.', 4);
INSERT INTO `food` VALUES (5, 'Ratatouille', 'images/ratatouille.jpg', 14.25, 'Provençal vegetable stew with eggplant, zucchini, tomatoes, and herbs.', 6);
INSERT INTO `food` VALUES (6, 'Butter Chicken', 'images/butter_chicken.jpg', 13.95, 'Creamy Indian curry with tender chicken in a spiced tomato gravy.', 7);
INSERT INTO `food` VALUES (7, 'Black Bean Burger', 'images/black_bean_burger.jpg', 10.5, 'Vegetarian burger made with black beans, corn, and spices, served on a whole wheat bun.', 8);
INSERT INTO `food` VALUES (8, 'Salmon with Roasted Vegetables', 'images/salmon_roasted_vegetables.jpg', 18.75, 'Grilled salmon fillet with roasted seasonal vegetables', 5);
INSERT INTO `food` VALUES (9, 'Quinoa Salad', 'images/quinoa_salad.jpg', 11.25, 'Healthy and flavorful salad with quinoa, vegetables, and a light vinaigrette dressing.', 9);
INSERT INTO `food` VALUES (10, 'Chicken Tenders', 'images/chicken_tenders.jpg', 8.99, 'Crispy breaded chicken tenders with dipping sauces.', 10);
INSERT INTO `food` VALUES (11, 'Sushi Set', 'images/sushi_set.jpg', 17.5, 'Assortment of sushi pieces and nigiri.', 3);
INSERT INTO `food` VALUES (12, 'Beef Lasagna', 'images/beef_lasagna.jpg', 14.95, 'Classic Italian layered pasta dish with ground beef, tomato sauce, and béchamel sauce.', 1);
INSERT INTO `food` VALUES (13, 'Tacos Al Pastor', 'images/tacos_al_pastor.jpg', 12.25, 'Marinated pork tacos with pineapple, onions, and cilantro.', 2);
INSERT INTO `food` VALUES (14, 'Chicken Tikka Masala', 'images/chicken_tikka_masala.jpg', 13.75, 'Creamy Indian curry with marinated chicken in a tomato-based sauce.', 7);
INSERT INTO `food` VALUES (15, 'French Fries', 'images/french_fries.jpg', 3.5, 'Classic side dish of crispy French fries.', 10);

-- ----------------------------
-- Table structure for food_type
-- ----------------------------
DROP TABLE IF EXISTS `food_type`;
CREATE TABLE `food_type`  (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of food_type
-- ----------------------------
INSERT INTO `food_type` VALUES (1, 'Italian');
INSERT INTO `food_type` VALUES (2, 'Mexican');
INSERT INTO `food_type` VALUES (3, 'Asian');
INSERT INTO `food_type` VALUES (4, 'American');
INSERT INTO `food_type` VALUES (5, 'French');
INSERT INTO `food_type` VALUES (6, 'Mediterranean');
INSERT INTO `food_type` VALUES (7, 'Indian');
INSERT INTO `food_type` VALUES (8, 'Vegetarian');
INSERT INTO `food_type` VALUES (9, 'Healthy');
INSERT INTO `food_type` VALUES (10, 'Fast Food');

-- ----------------------------
-- Table structure for like_res
-- ----------------------------
DROP TABLE IF EXISTS `like_res`;
CREATE TABLE `like_res`  (
  `user_id` int NOT NULL,
  `res_id` int NOT NULL,
  `date_like` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `res_id`) USING BTREE,
  INDEX `res_id`(`res_id` ASC) USING BTREE,
  CONSTRAINT `like_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `like_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of like_res
-- ----------------------------
INSERT INTO `like_res` VALUES (1, 1, '2024-02-01 10:00:00');
INSERT INTO `like_res` VALUES (1, 2, '2024-02-11 10:30:00');
INSERT INTO `like_res` VALUES (1, 10, '2024-07-20 10:58:40');
INSERT INTO `like_res` VALUES (2, 2, '2024-02-02 11:00:00');
INSERT INTO `like_res` VALUES (2, 3, '2024-02-12 11:30:00');
INSERT INTO `like_res` VALUES (3, 3, '2024-02-03 12:00:00');
INSERT INTO `like_res` VALUES (3, 4, '2024-02-13 12:30:00');
INSERT INTO `like_res` VALUES (4, 4, '2024-02-04 13:00:00');
INSERT INTO `like_res` VALUES (4, 5, '2024-02-14 13:30:00');
INSERT INTO `like_res` VALUES (5, 5, '2024-02-05 14:00:00');
INSERT INTO `like_res` VALUES (5, 6, '2024-02-15 14:30:00');
INSERT INTO `like_res` VALUES (6, 6, '2024-02-06 15:00:00');
INSERT INTO `like_res` VALUES (7, 7, '2024-02-07 16:00:00');
INSERT INTO `like_res` VALUES (8, 8, '2024-02-08 17:00:00');
INSERT INTO `like_res` VALUES (9, 9, '2024-02-09 18:00:00');
INSERT INTO `like_res` VALUES (10, 10, '2024-02-10 19:00:00');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `food_id` int NULL DEFAULT NULL,
  `amount` int NULL DEFAULT NULL,
  `code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `arr_sub_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code`(`code` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `food_id`(`food_id` ASC) USING BTREE,
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, 1, 3, 2, 'ORDER123', '[1,2,3]');
INSERT INTO `order` VALUES (2, 2, 5, 1, 'ORDER456', '[4,2,3]');
INSERT INTO `order` VALUES (3, 3, 1, 1, 'ORDER789', '[1,2,3]');
INSERT INTO `order` VALUES (4, 4, 7, 3, 'ORDER012', '[]');
INSERT INTO `order` VALUES (5, 1, 12, 1, 'ORDER345', '[]');
INSERT INTO `order` VALUES (6, 5, 2, 2, 'ORDER678', '[]');
INSERT INTO `order` VALUES (7, 3, 8, 1, 'ORDER901', '[]');
INSERT INTO `order` VALUES (8, 2, 10, 2, 'ORDER234', '[]');
INSERT INTO `order` VALUES (9, 4, 14, 1, 'ORDER567', '[]');
INSERT INTO `order` VALUES (10, 1, 4, 1, 'ORDER890', '[5,6,7]');
INSERT INTO `order` VALUES (11, 6, 11, 1, 'ORDER102', '[1]');
INSERT INTO `order` VALUES (12, 7, 9, 2, 'ORDER349', '[]');
INSERT INTO `order` VALUES (13, 8, 6, 1, 'ORDER781', '[3,7,9]');
INSERT INTO `order` VALUES (14, 5, 13, 1, 'ORDER092', '[]');
INSERT INTO `order` VALUES (15, 9, 15, 3, 'ORDER510', '[]');

-- ----------------------------
-- Table structure for rate_res
-- ----------------------------
DROP TABLE IF EXISTS `rate_res`;
CREATE TABLE `rate_res`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `res_id` int NULL DEFAULT NULL,
  `amount` int NULL DEFAULT NULL,
  `date_rate` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `res_id`(`res_id` ASC) USING BTREE,
  CONSTRAINT `rate_res_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `rate_res_ibfk_2` FOREIGN KEY (`res_id`) REFERENCES `restaurant` (`res_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rate_res
-- ----------------------------
INSERT INTO `rate_res` VALUES (1, 1, 1, 5, '2024-01-15 12:30:00');
INSERT INTO `rate_res` VALUES (2, 2, 2, 4, '2024-01-16 13:00:00');
INSERT INTO `rate_res` VALUES (3, 3, 3, 3, '2024-01-17 14:15:00');
INSERT INTO `rate_res` VALUES (4, 4, 4, 5, '2024-01-18 18:45:00');
INSERT INTO `rate_res` VALUES (5, 5, 5, 2, '2024-01-19 19:00:00');
INSERT INTO `rate_res` VALUES (6, 6, 6, 4, '2024-01-20 20:30:00');
INSERT INTO `rate_res` VALUES (7, 7, 7, 5, '2024-01-21 21:45:00');
INSERT INTO `rate_res` VALUES (8, 8, 8, 3, '2024-01-22 22:00:00');
INSERT INTO `rate_res` VALUES (9, 9, 9, 4, '2024-01-23 23:30:00');
INSERT INTO `rate_res` VALUES (10, 10, 10, 5, '2024-01-24 11:00:00');
INSERT INTO `rate_res` VALUES (11, 1, 2, 4, '2024-01-25 12:00:00');
INSERT INTO `rate_res` VALUES (12, 2, 3, 3, '2024-01-26 13:00:00');
INSERT INTO `rate_res` VALUES (13, 3, 4, 5, '2024-01-27 14:00:00');
INSERT INTO `rate_res` VALUES (14, 4, 5, 2, '2024-01-28 15:00:00');
INSERT INTO `rate_res` VALUES (15, 5, 6, 4, '2024-01-29 16:00:00');

-- ----------------------------
-- Table structure for restaurant
-- ----------------------------
DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE `restaurant`  (
  `res_id` int NOT NULL AUTO_INCREMENT,
  `res_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`res_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of restaurant
-- ----------------------------
INSERT INTO `restaurant` VALUES (1, 'The Gourmet Kitchen', 'gourmet_kitchen.jpg', 'A fine dining experience with international cuisine.');
INSERT INTO `restaurant` VALUES (2, 'Sunny Side Cafe', 'sunny_side_cafe.jpg', 'Cozy cafe with delicious breakfast options.');
INSERT INTO `restaurant` VALUES (3, 'Pasta Paradise', 'pasta_paradise.jpg', 'Authentic Italian pasta dishes in a warm atmosphere.');
INSERT INTO `restaurant` VALUES (4, 'Sushi World', 'sushi_world.jpg', 'Fresh and creative sushi rolls with a modern twist.');
INSERT INTO `restaurant` VALUES (5, 'BBQ Haven', 'bbq_haven.jpg', 'The best barbecue in town with a wide selection of meats.');
INSERT INTO `restaurant` VALUES (6, 'Vegan Delight', 'vegan_delight.jpg', 'Delicious plant-based meals that everyone will love.');
INSERT INTO `restaurant` VALUES (7, 'Pizza Palace', 'pizza_palace.jpg', 'Family-friendly pizzeria with a variety of toppings.');
INSERT INTO `restaurant` VALUES (8, 'Seafood Shack', 'seafood_shack.jpg', 'Fresh seafood dishes right from the ocean.');
INSERT INTO `restaurant` VALUES (9, 'Burger Barn', 'burger_barn.jpg', 'Juicy burgers with all your favorite fixings.');
INSERT INTO `restaurant` VALUES (10, 'Dessert Dreams', 'dessert_dreams.jpg', 'A sweet paradise with cakes, cookies, and more.');

-- ----------------------------
-- Table structure for sub_food
-- ----------------------------
DROP TABLE IF EXISTS `sub_food`;
CREATE TABLE `sub_food`  (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sub_price` float NULL DEFAULT NULL,
  `food_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`sub_id`) USING BTREE,
  INDEX `food_id`(`food_id` ASC) USING BTREE,
  CONSTRAINT `sub_food_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sub_food
-- ----------------------------
INSERT INTO `sub_food` VALUES (1, 'Cheese', 1.5, 1);
INSERT INTO `sub_food` VALUES (2, 'Bacon', 2, 1);
INSERT INTO `sub_food` VALUES (3, 'Avocado', 2.5, 2);
INSERT INTO `sub_food` VALUES (4, 'Mushrooms', 1.75, 2);
INSERT INTO `sub_food` VALUES (5, 'Extra Sauce', 0.75, 3);
INSERT INTO `sub_food` VALUES (6, 'Grilled Onions', 1, 3);
INSERT INTO `sub_food` VALUES (7, 'Jalapenos', 1.25, 4);
INSERT INTO `sub_food` VALUES (8, 'Olives', 1.5, 4);
INSERT INTO `sub_food` VALUES (9, 'Pepperoni', 2, 5);
INSERT INTO `sub_food` VALUES (10, 'Pineapple', 1.5, 5);
INSERT INTO `sub_food` VALUES (11, 'Feta Cheese', 2.25, 6);
INSERT INTO `sub_food` VALUES (12, 'Spinach', 1.75, 6);
INSERT INTO `sub_food` VALUES (13, 'Roasted Red Peppers', 2, 7);
INSERT INTO `sub_food` VALUES (14, 'Artichoke Hearts', 2.5, 7);
INSERT INTO `sub_food` VALUES (15, 'Sun-dried Tomatoes', 2.25, 8);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'John Doe', 'john.doe@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (2, 'Jane Smith', 'jane.smith@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (3, 'Alice Johnson', 'alice.johnson@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (4, 'Bob Brown', 'bob.brown@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (5, 'Charlie Davis', 'charlie.davis@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (6, 'Diana Clark', 'diana.clark@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (7, 'Ethan Moore', 'ethan.moore@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (8, 'Fiona Hall', 'fiona.hall@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (9, 'George King', 'george.king@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (10, 'Hannah Lee', 'hannah.lee@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (11, 'Michael Johnson', 'michael.johnson@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (12, 'Sarah Williams', 'sarah.williams@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (13, 'David Miller', 'david.miller@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');
INSERT INTO `user` VALUES (14, 'Emily Brown', 'emily.brown@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');

SET FOREIGN_KEY_CHECKS = 1;
