-- Up migration
CREATE TABLE user_favorite_pokemon (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pokemon_id INTEGER REFERENCES pokemon(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, pokemon_id)
);

-- Down migration
-- DROP TABLE user_favorite_pokemon;