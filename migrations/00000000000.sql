CREATE TABLE managers_industry
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE managers_company
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(350),
    size INTEGER,
    industry_id INTEGER NOT NULL,
    CONSTRAINT managers_company_industry_id_543bc473_fk_managers_industry_id FOREIGN KEY (industry_id) REFERENCES managers_industry (id)
);
CREATE INDEX managers_company_e7de220b ON managers_company (industry_id);

CREATE TABLE managers_node
(
    id SERIAL PRIMARY KEY NOT NULL,
    category VARCHAR(10) NOT NULL,
    text VARCHAR(250) NOT NULL,
    is_fail BOOLEAN,
    is_success BOOLEAN,
    is_start BOOLEAN,
    type VARCHAR(15)
);
CREATE TABLE managers_node_choice
(
    id SERIAL PRIMARY KEY NOT NULL,
    from_node_id INTEGER NOT NULL,
    to_node_id INTEGER NOT NULL,
    text TEXT,
    CONSTRAINT managers_node_choice_from_node_id_178b415a_fk_managers_node_id FOREIGN KEY (from_node_id) REFERENCES managers_node (id),
    CONSTRAINT managers_node_choice_to_node_id_5865f372_fk_managers_node_id FOREIGN KEY (to_node_id) REFERENCES managers_node (id)
);

CREATE UNIQUE INDEX managers_node_choice_from_node_id_3e3f4b2f_uniq ON managers_node_choice (from_node_id, to_node_id);
CREATE INDEX managers_node_choice_22d0d145 ON managers_node_choice (from_node_id);
CREATE INDEX managers_node_choice_33b4eced ON managers_node_choice (to_node_id);
CREATE TABLE managers_npc
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    image_path VARCHAR(150),
    stats JSONB NOT NULL,
    company_id INTEGER,
    position_id INTEGER,
    CONSTRAINT managers_npc_company_id_a5c2f26d_fk_managers_company_id FOREIGN KEY (company_id) REFERENCES managers_company (id),
    CONSTRAINT managers_npc_position_id_b7374040_fk_managers_position_id FOREIGN KEY (position_id) REFERENCES managers_position (id)
);
CREATE INDEX managers_npc_447d3092 ON managers_npc (company_id);
CREATE INDEX managers_npc_bce5bd07 ON managers_npc (position_id);
CREATE TABLE managers_person
(
    id  SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL,
    company VARCHAR(250) NOT NULL,
    stats JSONB NOT NULL,
    position_id INTEGER,
    image_path VARCHAR(150),
    is_deleted BOOLEAN NOT NULL,
    owner_id INTEGER NOT NULL,
    CONSTRAINT managers_person_position_id_282d4a01_fk_managers_position_id FOREIGN KEY (position_id) REFERENCES managers_position (id)
);
CREATE INDEX managers_person_bce5bd07 ON managers_person (position_id);
CREATE INDEX managers_person_5e7b1936 ON managers_person (owner_id);
CREATE TABLE managers_person_related_companies
(
    id SERIAL PRIMARY KEY NOT NULL,
    person_id INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    CONSTRAINT managers_person_relate_person_id_a307ca1a_fk_managers_person_id FOREIGN KEY (person_id) REFERENCES managers_person (id),
    CONSTRAINT managers_person_rela_company_id_ff8d1e6a_fk_managers_company_id FOREIGN KEY (company_id) REFERENCES managers_company (id)
);
CREATE UNIQUE INDEX managers_person_related_companies_person_id_2e1f21d4_uniq ON managers_person_related_companies (person_id, company_id);
CREATE INDEX managers_person_related_companies_a8452ca7 ON managers_person_related_companies (person_id);
CREATE INDEX managers_person_related_companies_447d3092 ON managers_person_related_companies (company_id);
CREATE TABLE managers_position
(
    id serial PRIMARY KEY NOT NULL,
    name VARCHAR(150)
);
CREATE TABLE managers_users
(
    id SERIAL PRIMARY KEY NOT NULL,
    login VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
);
