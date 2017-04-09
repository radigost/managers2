UPDATE managers_node_choice mnc
  SET text=(
      select text from managers_node mn WHERE mn.id=mnc.to_node_id
  );

ALTER TABLE managers_node DROP COLUMN  text ;