-- create table users
CREATE TABLE `user` (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(100), 
	email VARCHAR(100),
	`password` VARCHAR(100)
);

-- create table restaurant
CREATE TABLE restaurant (
	res_id INT AUTO_INCREMENT PRIMARY KEY, 
	res_name VARCHAR(255), 
	image VARCHAR(255),
	`desc` VARCHAR(255) 
);

-- create table rate_res
CREATE TABLE rate_res(
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT, 
	res_id INT, 
	amount INT, 
	date_rate DATETIME,
	FOREIGN KEY (user_id) REFERENCES `user`(user_id),
	FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);

-- create table like_res
CREATE TABLE like_res(
	user_id INT, 
	res_id INT, 
	date_like DATETIME, 
	PRIMARY KEY (user_id, res_id),
	FOREIGN KEY (user_id) REFERENCES `user`(user_id),
	FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
);

-- create table food_type 
CREATE TABLE food_type(
	type_id INT AUTO_INCREMENT PRIMARY KEY,
	type_name VARCHAR(255)
);

-- create table food 
CREATE TABLE food(
	food_id INT AUTO_INCREMENT PRIMARY KEY, 
	food_name VARCHAR(255),
	image VARCHAR(255),
	price FLOAT, 
	`desc` VARCHAR(255), 
	type_id INT,
	FOREIGN KEY (type_id) REFERENCES food_type(type_id)
);

-- create table sub_food
CREATE TABLE sub_food(
	sub_id INT AUTO_INCREMENT PRIMARY KEY, 
	sub_name VARCHAR(255),
	sub_price FLOAT, 
	food_id INT, 
	FOREIGN KEY (food_id) REFERENCES food(food_id)
);

-- create table order 
CREATE TABLE `order`(
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT, 
	food_id INT,
	amount INT, 
	`code` VARCHAR(100) UNIQUE,
	arr_sub_id VARCHAR(255),
	FOREIGN KEY (user_id) REFERENCES `user`(user_id),
	FOREIGN KEY (food_id) REFERENCES food(food_id)
); 

-- create data for table food_type
INSERT INTO food_type (type_name) VALUES
("Italian"),
("Mexican"),
("Asian"),
("American"),
("French"),
("Mediterranean"),
("Indian"),
("Vegetarian"),
("Healthy"),
("Fast Food");

-- create data for table food
INSERT INTO food (food_name, price, image, `desc`, type_id) VALUES
("Margherita Pizza", 12.99, "images/margherita_pizza.jpg", "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.", 1),  /* Italian */
("Chicken Fajitas", 15.50, "images/chicken_fajitas.jpg", "Sizzling grilled chicken strips with peppers and onions, served with tortillas, salsa, and guacamole.", 2),  /* Mexican */
("Pad Thai", 11.75, "images/pad_thai.jpg", "Stir-fried rice noodles with chicken, vegetables, and a flavorful peanut sauce.", 3),  /* Asian */
("Cheeseburger", 9.99, "images/cheeseburger.jpg", "All-American cheeseburger with a juicy beef patty, melted cheddar cheese, lettuce, tomato, and onion on a toasted bun.", 4),  /* American */
("Ratatouille", 14.25, "images/ratatouille.jpg", "Provençal vegetable stew with eggplant, zucchini, tomatoes, and herbs.", 6),  /* Mediterranean */
("Butter Chicken", 13.95, "images/butter_chicken.jpg", "Creamy Indian curry with tender chicken in a spiced tomato gravy.", 7), /* Indian */
("Black Bean Burger", 10.50, "images/black_bean_burger.jpg", "Vegetarian burger made with black beans, corn, and spices, served on a whole wheat bun.", 8),  /* Vegetarian */
("Salmon with Roasted Vegetables", 18.75, "images/salmon_roasted_vegetables.jpg", "Grilled salmon fillet with roasted seasonal vegetables", 5),  /* French (can be considered healthy) */
("Quinoa Salad", 11.25, "images/quinoa_salad.jpg", "Healthy and flavorful salad with quinoa, vegetables, and a light vinaigrette dressing.", 9),  /* Healthy */
("Chicken Tenders", 8.99, "images/chicken_tenders.jpg", "Crispy breaded chicken tenders with dipping sauces.", 10),  /* Fast Food */
("Sushi Set", 17.50, "images/sushi_set.jpg", "Assortment of sushi pieces and nigiri.", 3),  /* Asian */
("Beef Lasagna", 14.95, "images/beef_lasagna.jpg", "Classic Italian layered pasta dish with ground beef, tomato sauce, and béchamel sauce.", 1), /* Italian */
("Tacos Al Pastor", 12.25, "images/tacos_al_pastor.jpg", "Marinated pork tacos with pineapple, onions, and cilantro.", 2), /* Mexican */
("Chicken Tikka Masala", 13.75, "images/chicken_tikka_masala.jpg", "Creamy Indian curry with marinated chicken in a tomato-based sauce.", 7), /* Indian */
("French Fries", 3.50, "images/french_fries.jpg", "Classic side dish of crispy French fries.", 10); /* Fast Food */

-- create data for table user
INSERT INTO `user` (full_name, email, `password`) VALUES
('John Doe', 'john.doe@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Jane Smith', 'jane.smith@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Alice Johnson', 'alice.johnson@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Bob Brown', 'bob.brown@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Charlie Davis', 'charlie.davis@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Diana Clark', 'diana.clark@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Ethan Moore', 'ethan.moore@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Fiona Hall', 'fiona.hall@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('George King', 'george.king@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Hannah Lee', 'hannah.lee@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Michael Johnson', 'michael.johnson@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Sarah Williams', 'sarah.williams@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('David Miller', 'david.miller@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu'),
('Emily Brown', 'emily.brown@example.com', '$2b$10$20SOSQj7ujkwGEX3QNKBGO7Z4uRpPf2RssWwhuJCLpO6vroqOm9Gu');

-- create data for table order 
INSERT INTO `order` (user_id, food_id, amount, `code`, arr_sub_id) VALUES
(1, 3, 2, "ORDER123", "[1,2,3]"),  -- User 1 orders 2 Margherita Pizzas (food_id 3)
(2, 5, 1, "ORDER456", "[4,2,3]"),  -- User 2 orders 1 Cheeseburger (food_id 5)
(3, 1, 1, "ORDER789", "[1,2,3]"),  -- User 3 orders 1 Pad Thai (food_id 1)
(4, 7, 3, "ORDER012", "[]"),  -- User 4 orders 3 Black Bean Burgers (food_id 7)
(1, 12, 1, "ORDER345", "[]"),  -- User 1 orders 1 Sushi Set (food_id 12)
(5, 2, 2, "ORDER678", "[]"),  -- User 5 orders 2 Chicken Fajitas (food_id 2)
(3, 8, 1, "ORDER901", "[]"),  -- User 3 orders 1 Salmon with Roasted Vegetables (food_id 😎
(2, 10, 2, "ORDER234", "[]"),  -- User 2 orders 2 Chicken Tenders (food_id 10)
(4, 14, 1, "ORDER567", "[]"),  -- User 4 orders 1 Chicken Tikka Masala (food_id 14)
(1, 4, 1, "ORDER890", "[5,6,7]"),  -- User 1 orders 1 Butter Chicken (food_id 4)
(6, 11, 1, "ORDER102", "[1]"),  -- User 6 orders 1 Quinoa Salad (food_id 11) with additional notes in arr_sub_id (replace with actual notes)
(7, 9, 2, "ORDER349", "[]"),  -- User 7 orders 2 Tacos Al Pastor (food_id 9)
(8, 6, 1, "ORDER781", "[3,7,9]"),  -- User 8 orders 1 Beef Lasagna (food_id 6)
(5, 13, 1, "ORDER092", "[]"),  -- User 5 orders 1 French Fries (food_id 13)
(9, 15, 3, "ORDER510", "[]");

-- create data for table restaurant
INSERT INTO restaurant (res_name, image, `desc`) VALUES
('The Gourmet Kitchen', 'gourmet_kitchen.jpg', 'A fine dining experience with international cuisine.'),
('Sunny Side Cafe', 'sunny_side_cafe.jpg', 'Cozy cafe with delicious breakfast options.'),
('Pasta Paradise', 'pasta_paradise.jpg', 'Authentic Italian pasta dishes in a warm atmosphere.'),
('Sushi World', 'sushi_world.jpg', 'Fresh and creative sushi rolls with a modern twist.'),
('BBQ Haven', 'bbq_haven.jpg', 'The best barbecue in town with a wide selection of meats.'),
('Vegan Delight', 'vegan_delight.jpg', 'Delicious plant-based meals that everyone will love.'),
('Pizza Palace', 'pizza_palace.jpg', 'Family-friendly pizzeria with a variety of toppings.'),
('Seafood Shack', 'seafood_shack.jpg', 'Fresh seafood dishes right from the ocean.'),
('Burger Barn', 'burger_barn.jpg', 'Juicy burgers with all your favorite fixings.'),
('Dessert Dreams', 'dessert_dreams.jpg', 'A sweet paradise with cakes, cookies, and more.');

-- create data for table rate_res
INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, '2024-01-15 12:30:00'),
(2, 2, 4, '2024-01-16 13:00:00'),
(3, 3, 3, '2024-01-17 14:15:00'),
(4, 4, 5, '2024-01-18 18:45:00'),
(5, 5, 2, '2024-01-19 19:00:00'),
(6, 6, 4, '2024-01-20 20:30:00'),
(7, 7, 5, '2024-01-21 21:45:00'),
(8, 8, 3, '2024-01-22 22:00:00'),
(9, 9, 4, '2024-01-23 23:30:00'),
(10, 10, 5, '2024-01-24 11:00:00'),
(1, 2, 4, '2024-01-25 12:00:00'),
(2, 3, 3, '2024-01-26 13:00:00'),
(3, 4, 5, '2024-01-27 14:00:00'),
(4, 5, 2, '2024-01-28 15:00:00'),
(5, 6, 4, '2024-01-29 16:00:00');

-- create data for table like_res
INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, '2024-02-01 10:00:00'),
(2, 2, '2024-02-02 11:00:00'),
(3, 3, '2024-02-03 12:00:00'),
(4, 4, '2024-02-04 13:00:00'),
(5, 5, '2024-02-05 14:00:00'),
(6, 6, '2024-02-06 15:00:00'),
(7, 7, '2024-02-07 16:00:00'),
(8, 8, '2024-02-08 17:00:00'),
(9, 9, '2024-02-09 18:00:00'),
(10, 10, '2024-02-10 19:00:00'),
(1, 2, '2024-02-11 10:30:00'),
(2, 3, '2024-02-12 11:30:00'),
(3, 4, '2024-02-13 12:30:00'),
(4, 5, '2024-02-14 13:30:00'),
(5, 6, '2024-02-15 14:30:00');


-- create data for table sub_food
INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Cheese', 1.50, 1),
('Bacon', 2.00, 1),
('Avocado', 2.50, 2),
('Mushrooms', 1.75, 2),
('Extra Sauce', 0.75, 3),
('Grilled Onions', 1.00, 3),
('Jalapenos', 1.25, 4),
('Olives', 1.50, 4),
('Pepperoni', 2.00, 5),
('Pineapple', 1.50, 5),
('Feta Cheese', 2.25, 6),
('Spinach', 1.75, 6),
('Roasted Red Peppers', 2.00, 7),
('Artichoke Hearts', 2.50, 7),
('Sun-dried Tomatoes', 2.25, 8);


-- Find the top 5 users who have liked the most restaurants
SELECT u.user_id, u.full_name, COUNT(lr.res_id) AS like_count
FROM `user` u
JOIN like_res lr ON u.user_id = lr.user_id
GROUP BY u.user_id, u.full_name
ORDER BY like_count DESC
LIMIT 5;

-- Find the top 2 restaurants that have received the most likes
SELECT r.res_id, r.res_name, COUNT(lr.user_id) AS like_count
FROM restaurant r
JOIN like_res lr ON r.res_id = lr.res_id
GROUP BY r.res_id, r.res_name
ORDER BY like_count DESC
LIMIT 2;

-- Find the user who has placed the most orders
SELECT u.user_id, u.full_name, COUNT(o.food_id) AS order_count
FROM `user` u
JOIN `order` o ON u.user_id = o.user_id
GROUP BY u.user_id, u.full_name
ORDER BY order_count DESC
LIMIT 1;

-- Find users who are inactive in the system
SELECT u.user_id, u.full_name
FROM `user` u
LEFT JOIN `order` o ON u.user_id = o.user_id
LEFT JOIN like_res lr ON u.user_id = lr.user_id
LEFT JOIN rate_res rr ON u.user_id = rr.user_id
WHERE o.user_id IS NULL
  AND lr.user_id IS NULL
  AND rr.user_id IS NULL;
  
-- Query to Get the Average Like and Rate that Users Give to Restaurants:
SELECT u.user_id, u.full_name, COUNT(lr.res_id) / COUNT(DISTINCT u.user_id) AS avg_likes
FROM `user` u
JOIN like_res lr ON u.user_id = lr.user_id
GROUP BY u.user_id, u.full_name;

-- 
