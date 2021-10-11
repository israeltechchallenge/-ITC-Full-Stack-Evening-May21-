CREATE TABLE IF NOT EXISTS users (
    id            int  AUTO_INCREMENT,
    email          VARCHAR(200) NOT NULL,
    pass  VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
 );