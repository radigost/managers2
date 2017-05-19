-- dialogues
CREATE TABLE dialogues
(
    id SERIAL  PRIMARY KEY NOT NULL,
    name VARCHAR(150)
);

INSERT INTO dialogues ( name) VALUES ('Первый диалог');

-- connections with dialogues

ALTER TABLE managers_node 
    ADD COLUMN dialogue_id  INTEGER REFERENCES dialogues;

UPDATE managers_node SET dialogue_id=1;


ALTER TABLE managers_node_choice
    ADD COLUMN dialogue_id  INTEGER REFERENCES dialogues;

UPDATE managers_node_choice SET dialogue_id=1;