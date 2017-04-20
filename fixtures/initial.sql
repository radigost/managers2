-- industry
INSERT INTO public.managers_industry (id, name) VALUES (1, 'Тяжелая промышленность');
INSERT INTO public.managers_industry (id, name) VALUES (2, 'Оптовые продажи');

-- position
INSERT INTO public.managers_position (id, name) VALUES (1, 'Главный секретарь');

-- company
INSERT INTO public.managers_company (id, name, description, size, industry_id) VALUES (1, 'Новая Компания', 'компания занимается всем новым', 3, 1);
INSERT INTO public.managers_company (id, name, description, size, industry_id) VALUES (2, 'Залежалые индюки', 'Оптовая торговля мясом', 2, 2);


-- node
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (1, 'player', 'Добрый день!', null, null, true, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (4, 'player', 'А как вас зовут?', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (5, 'npc', 'Меня зовут %NPCNAME%', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (6, 'player', 'Очень приятно...а кто в вашей компании отвечает за продажи?', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (7, 'npc', 'За Это отвечает %LPRNAME%', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (9, 'npc', 'Вы знаете, оставьте вашу контактную информацию', true, null, null, 'failure');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (3, 'player', 'А можно %LPRNAME% можно услышать?', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (8, 'npc', 'Да, конечно, давайте соединю', null, true, null, 'success');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (2, 'npc', 'Здраствуйте!', null, null, null, '');


-- node_choice
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (1, 1, 2, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (5, 2, 3, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (6, 2, 4, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (7, 4, 5, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (8, 5, 3, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (9, 5, 6, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (10, 6, 7, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (11, 7, 3, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (12, 3, 8, null);
INSERT INTO public.managers_node_choice (id, from_node_id, to_node_id, text) VALUES (13, 3, 9, null);

-- npc
INSERT INTO public.managers_npc (id, name, image_path, stats, company_id, position_id) VALUES (1, 'Мария', 'secretar12.png', '{"money": 0}', 1, 1);
INSERT INTO public.managers_npc (id, name, image_path, stats, company_id, position_id) VALUES (2, 'Лена', 'secretar2.png', '{"money": 0}', 2, 1);

-- person
INSERT INTO public.managers_person (id, name, company, stats, position_id, image_path, is_deleted, owner_id) VALUES (2, 'ИванИванов', 'Абырвалг инкорпорейтедe', '{"money": 15, "perks": [], "maxCalls": 14, "minCalls": 7, "knowProduct": 1, "personality": {"network": 5, "intellect": 5, "activeness": 5, "psychology": 4, "introversion": 5}, "specialties": [{"id": 2, "caption": "Любимец государства", "tooltip": "Хорошо получается работать с гос. сектором"}]}', null, 'manager1.png', false, 1);