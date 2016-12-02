### Schema
CREATE DATABASE mystery_game_db;

USE mystery_game_db;

-- TABLES 
CREATE TABLE PLAYERS
(
	id int NOT NULL AUTO_INCREMENT,
	player_name varchar(255) NOT NULL,
	progression int NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE CLUE_TABLE1
(
	clue_num int NOT NULL AUTO_INCREMENT,
	lat FLOAT NOT NULL,
	lng FLOAT NOT NULL,
	message varchar(255) NOT NULL
);

-- CREATE A CONSTRUCTOR LATER FOR ADDING PLAYERS
INSERT INTO PLAYERS (player_name, progression) VALUES ('Chris', 1);

INSERT INTO CLUE_TABLE1 (clue_num, lat, lng, message) VALUES (1, 40.71, -74.03, "Go to the best Rutgers Coding Bootcamp's room.")
INSERT INTO CLUE_TABLE1 (clue_num, lat, lng, message) VALUES (2, 40.71, -74.03, "This is where the 2nd clue will go")