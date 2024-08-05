CREATE DATABASE IF NOT EXISTS capstone;
USE capstone;

/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : capstone

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 02/08/2024 15:28:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bookmark
-- ----------------------------
DROP TABLE IF EXISTS `bookmark`;
CREATE TABLE `bookmark`  (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `date` date NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `image_id`) USING BTREE,
  INDEX `image_id`(`image_id` ASC) USING BTREE,
  CONSTRAINT `usergallery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `usergallery_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bookmark
-- ----------------------------
INSERT INTO `bookmark` VALUES (1, 14, '2024-07-15');
INSERT INTO `bookmark` VALUES (1, 16, '2024-06-05');
INSERT INTO `bookmark` VALUES (2, 13, '2024-07-10');
INSERT INTO `bookmark` VALUES (2, 16, '2024-05-30');
INSERT INTO `bookmark` VALUES (3, 17, '2024-07-05');
INSERT INTO `bookmark` VALUES (3, 18, '2024-05-25');
INSERT INTO `bookmark` VALUES (4, 20, '2024-07-01');
INSERT INTO `bookmark` VALUES (4, 22, '2024-05-20');
INSERT INTO `bookmark` VALUES (5, 24, '2024-06-28');
INSERT INTO `bookmark` VALUES (6, 21, '2024-06-25');
INSERT INTO `bookmark` VALUES (6, 23, '2024-06-10');
INSERT INTO `bookmark` VALUES (7, 16, '2024-06-20');
INSERT INTO `bookmark` VALUES (7, 17, '2024-06-15');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `image_id` int NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `image_id`(`image_id` ASC) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 1, 14, '2024-07-20', 'What a gorgeous sunset!');
INSERT INTO `comment` VALUES (2, 2, 13, '2024-07-18', 'I love mountain views');
INSERT INTO `comment` VALUES (3, 3, 13, '2024-07-16', 'The city never sleeps');
INSERT INTO `comment` VALUES (4, 4, 14, '2024-07-14', 'This forest looks so peaceful');
INSERT INTO `comment` VALUES (5, 5, 15, '2024-07-12', 'The ocean is so vast and beautiful');
INSERT INTO `comment` VALUES (6, 6, 16, '2024-07-10', 'The desert has its own unique beauty');
INSERT INTO `comment` VALUES (7, 7, 17, '2024-07-08', 'I\'ve always wanted to see the Northern Lights!');
INSERT INTO `comment` VALUES (8, 1, 18, '2024-07-06', 'The power of nature is amazing');
INSERT INTO `comment` VALUES (9, 2, 19, '2024-07-04', 'This city view is breathtaking');
INSERT INTO `comment` VALUES (10, 3, 20, '2024-07-02', 'Incredible wildlife shot!');
INSERT INTO `comment` VALUES (11, 4, 21, '2024-06-30', 'Climate change is affecting our glaciers');
INSERT INTO `comment` VALUES (12, 5, 22, '2024-06-28', 'Nature\'s fury captured perfectly');
INSERT INTO `comment` VALUES (13, 6, 23, '2024-06-26', 'I wish I was there right now');
INSERT INTO `comment` VALUES (14, 7, 24, '2024-06-24', 'Majestic mountain indeed');
INSERT INTO `comment` VALUES (15, 2, 13, '2024-06-22', 'Cities are always full of life');
INSERT INTO `comment` VALUES (16, 1, 13, '2024-08-02', 'Test Comment');

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  FULLTEXT INDEX `idx_fulltext_name`(`name`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (13, 'Vibrant Beach Sunset', '/images/sunset.jpg', 'Beautiful sunset at the beach', 1);
INSERT INTO `image` VALUES (14, 'Snowy Mountain Peak', '/images/mountain.jpg', 'Snowy mountain peak', 2);
INSERT INTO `image` VALUES (15, 'Bustling City Skyline', '/images/city.jpg', 'Bustling city skyline', 3);
INSERT INTO `image` VALUES (16, 'Lush Green Forest', '/images/forest.jpg', 'Dense green forest', 4);
INSERT INTO `image` VALUES (17, 'Tranquil Ocean View', '/images/ocean.jpg', 'Vast blue ocean', 5);
INSERT INTO `image` VALUES (18, 'Arid Desert Landscape', '/images/desert.jpg', 'Arid desert landscape', 6);
INSERT INTO `image` VALUES (19, 'Colorful Northern Lights', '/images/aurora.jpg', 'Northern lights in the night sky', 7);
INSERT INTO `image` VALUES (20, 'Majestic Jungle Waterfall', '/images/waterfall.jpg', 'Majestic waterfall in the jungle', 7);
INSERT INTO `image` VALUES (21, 'Modern City Panorama', '/images/cityscape.jpg', 'Panoramic view of a modern city', 3);
INSERT INTO `image` VALUES (22, 'African Savanna Wildlife', '/images/wildlife.jpg', 'Lions in the savanna', 1);
INSERT INTO `image` VALUES (23, 'Melting Alaskan Glacier', '/images/glacier.jpg', 'Melting glacier in Alaska', 2);
INSERT INTO `image` VALUES (24, 'Erupting Volcano Scene', '/images/volcano.jpg', 'Active volcano eruption', 3);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `age` int NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Alice Williams', 'alice@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 14, 'abc.jpg');
INSERT INTO `user` VALUES (2, 'Charlie Brown', 'charlie@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 40, 'avatar5.jpg');
INSERT INTO `user` VALUES (3, 'Diana Ross', 'diana@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 33, 'avatar6.jpg');
INSERT INTO `user` VALUES (4, 'Ethan Hunt', 'ethan@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 45, 'avatar7.jpg');
INSERT INTO `user` VALUES (5, 'Fiona Apple', 'fiona@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 22, 'avatar8.jpg');
INSERT INTO `user` VALUES (6, 'George Lucas', 'george@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 50, 'avatar9.jpg');
INSERT INTO `user` VALUES (7, 'Hannah Montana', 'hannah@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 19, 'avatar10.jpg');
INSERT INTO `user` VALUES (8, 'John Doe', 'john@example.com', '$2b$10$0xObiiBk4Z3cSfTBn6AvNuSdvlWAFeLHVDy41litVhVhhRF8NefaC', 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
