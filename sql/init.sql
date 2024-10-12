CREATE TABLE IF NOT EXISTS pokemon_type(
    id SERIAl PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAl PRIMARY KEY,
    name VARCHAR(50),
    type INT REFERENCES pokemon_type(id) ON DELETE SET NULL,
    image VARCHAR(255),
    power INT,
    life INT 
);
CREATE TABLE IF NOT EXISTS weakness(
     id SERIAl PRIMARY KEY,
     type1 INT REFERENCES pokemon_type(id) ON DELETE SET NULL,
     type2 INT REFERENCES pokemon_type(id) ON DELETE SET NULL,
     factor REAL
);

CREATE TABLE IF NOT EXISTS favorite_pokemon (
    pokemon_id INT REFERENCES pokemon(id) ON DELETE CASCADE,
    PRIMARY KEY (pokemon_id)
);

-- INSERT INTO pokemon_type(name) VALUES('fire');
-- INSERT INTO pokemon_type(name) VALUES('water');
-- INSERT INTO pokemon_type(name) VALUES('grass');

-- INSERT INTO weakness (type1, type2, factor) VALUES(1,1,1);
-- INSERT INTO weakness (type1, type2, factor) VALUES(2, 1, 0.5);
-- INSERT INTO weakness (type1, type2, factor) VALUES(3, 1, 2);
-- INSERT INTO weakness (type1, type2, factor) VALUES(1, 2, 2);
-- INSERT INTO weakness (type1, type2, factor) VALUES(2, 2, 1);
-- INSERT INTO weakness (type1, type2, factor) VALUES(3, 2, 0.5);
-- INSERT INTO weakness (type1, type2, factor) VALUES(1, 3, 0.5);
-- INSERT INTO weakness (type1, type2, factor) VALUES(2, 3, 2);
-- INSERT INTO weakness (type1, type2, factor) VALUES(3, 3, 1);
