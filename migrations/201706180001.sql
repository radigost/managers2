CREATE TABLE role
(
    id SERIAL  PRIMARY KEY NOT NULL,
    name VARCHAR(150),
    created TIMESTAMP WITH TIME ZONE,
    description VARCHAR(250),
    modified TIMESTAMP WITH TIME ZONE
);


CREATE TABLE rolemapping
(
    id SERIAL  PRIMARY KEY NOT NULL,
    principaltype VARCHAR(250),
    roleid INTEGER,
    principalid INTEGER
);



