-- UPDATE managers_node mn set category=
-- case when category ='npc' THEN  'player'
-- when category ='player' then 'npc'
-- end;
--

alter table managers_node add COLUMN text TEXT default '';

UPDATE managers_node mn
set text = (
  SELECT DISTINCT text from managers_node_choice mnc where mnc.to_node_id=mn.id
);

alter table managers_node_choice drop COLUMN text;


ALTER TABLE public.managers_node_choice
  DROP CONSTRAINT managers_node_choice_from_node_id_178b415a_fk_managers_node_id;
ALTER TABLE public.managers_node_choice
  ADD CONSTRAINT managers_node_choice_from_node_id_178b415a_fk_managers_node_id
FOREIGN KEY (from_node_id) REFERENCES managers_node (id) ON DELETE CASCADE ;

ALTER TABLE public.managers_node_choice
  DROP CONSTRAINT managers_node_choice_to_node_id_5865f372_fk_managers_node_id;
ALTER TABLE public.managers_node_choice
  ADD CONSTRAINT managers_node_choice_to_node_id_5865f372_fk_managers_node_id
FOREIGN KEY (to_node_id) REFERENCES managers_node(id) ON DELETE CASCADE ;