CREATE TABLE IF NOT EXISTS todos (
    id            int  AUTO_INCREMENT,
    text          VARCHAR(200) NOT NULL,
    created_date  DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (id)
 );
 
 