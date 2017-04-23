-- industry
INSERT INTO public.managers_industry (name) VALUES ('Тяжелая промышленность');
INSERT INTO public.managers_industry (name) VALUES ('Оптовые продажи');

-- position
INSERT INTO public.managers_position ( name) VALUES ('Главный секретарь');

-- company
INSERT INTO public.managers_company (name, description, size, industry_id) VALUES ( 'Новая Компания', 'компания занимается всем новым', 3, 1);
INSERT INTO public.managers_company (name, description, size, industry_id) VALUES ('Залежалые индюки', 'Оптовая торговля мясом', 2, 2);


-- node
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'player', 'Добрый день!', null, null, true, '');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'npc', 'Здраствуйте!', null, null, null, '');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'player', 'А можно %LPRNAME% можно услышать?', null, null, null, '');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'player', 'А как вас зовут?', null, null, null, '');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'npc', 'Меня зовут %NPCNAME%', null, null, null, '');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'player', 'Очень приятно...а кто в вашей компании отвечает за продажи?', null, null, null, '');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'npc', 'За Это отвечает %LPRNAME%', null, null, null, '');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'npc', 'Да, конечно, давайте соединю', null, true, null, 'success');
INSERT INTO public.managers_node ( category, text, is_fail, is_success, is_start, type) VALUES ( 'npc', 'Вы знаете, оставьте вашу контактную информацию', true, null, null, 'failure');



-- node_choice
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 1, 2, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 2, 3, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 2, 4, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 4, 5, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 5, 3, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 5, 6, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 6, 7, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 7, 3, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 3, 8, null);
INSERT INTO public.managers_node_choice ( from_node_id, to_node_id, text) VALUES ( 3, 9, null);

-- npc
INSERT INTO public.managers_npc ( name, image_path, stats, company_id, position_id) VALUES ( 'Мария', 'secretar12.png', '{"money": 0}', 1, 1);
INSERT INTO public.managers_npc ( name, image_path, stats, company_id, position_id) VALUES ( 'Лена', 'secretar2.png', '{"money": 0}', 2, 1);

-- person
INSERT INTO public.managers_person ( name, company, stats, position_id, image_path, is_deleted, owner_id) VALUES ( 'ИванИванов', 'Абырвалг инкорпорейтедe', '{"money": 15, "perks": [], "maxCalls": 14, "minCalls": 7, "knowProduct": 1, "personality": {"network": 5, "intellect": 5, "activeness": 5, "psychology": 4, "introversion": 5}, "specialties": [{"id": 2, "caption": "Любимец государства", "tooltip": "Хорошо получается работать с гос. сектором"}]}', null, 'manager1.png', false, 1);