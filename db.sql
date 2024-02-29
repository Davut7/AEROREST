
-- CREATE TABLE IF NOT EXISTS users (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   email VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS tokens (
--    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   refresh_token VARCHAR(500) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
-- );

-- -- CREATE TABLE files (
-- --      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- --     file_name: VARCHAR(255) NOT NULL,
-- --     file_path:VARCHAR(255) NOT NULL,
-- --     size:VARCHAR(255) NOT NULL,
-- --     extension:VARCHAR(255) NOT NULL,
-- --     mimetype:VARCHAR(255) NOT NULL,
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- -- )