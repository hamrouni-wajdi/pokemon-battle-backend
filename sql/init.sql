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

CREATE TABLE IF NOT EXISTS team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    isComplete BOOLEAN
);

CREATE TABLE IF NOT EXISTS team_pokemon (
    team_id INT REFERENCES team(id) ON DELETE CASCADE,
    pokemon_id INT REFERENCES pokemon(id) ON DELETE CASCADE,
    PRIMARY KEY (team_id, pokemon_id)
);

-- ALTER TABLE team
-- ADD CONSTRAINT unique_team_name UNIQUE (name);

CREATE OR REPLACE FUNCTION insert_team_with_pokemons(team_name VARCHAR, pokemon_ids INT[])
RETURNS VOID AS $$
DECLARE
    team_id INT;
    num_pokemons INT;
BEGIN
    -- Check that the number of Pokémon is exactly 6
    num_pokemons := array_length(pokemon_ids, 1);
    IF num_pokemons != 6 THEN
        RAISE EXCEPTION 'A team must contain exactly 6 Pokémon. Found: %', num_pokemons;
    END IF;

    
    INSERT INTO team (name) 
    VALUES (team_name)
    RETURNING id INTO team_id;

    
    FOR i IN 1..num_pokemons LOOP
        INSERT INTO team_pokemon (team_id, pokemon_id)
        VALUES (team_id, pokemon_ids[i]);
    END LOOP;

    
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_teams_ordered_by_power()
RETURNS TABLE (
    team_id INT,
    team_name VARCHAR,
    total_power INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id AS team_id,
        t.name AS team_name,
        SUM(p.power)::INT AS total_power 
    FROM
        team t
    JOIN
        team_pokemon tp ON t.id = tp.team_id
    JOIN
        pokemon p ON tp.pokemon_id = p.id
    GROUP BY
        t.id, t.name
    ORDER BY
        total_power DESC;  
END;
$$ LANGUAGE plpgsql;


