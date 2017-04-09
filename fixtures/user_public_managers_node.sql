INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (1, 'player', 'Добрый день!', null, null, true, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (4, 'player', 'А как вас зовут?', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (5, 'npc', 'Меня зовут %NPCNAME%', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (6, 'player', 'Очень приятно...а кто в вашей компании отвечает за продажи?', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (7, 'npc', 'За Это отвечает %LPRNAME%', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (9, 'npc', 'Вы знаете, оставьте вашу контактную информацию', true, null, null, 'failure');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (3, 'player', 'А можно %LPRNAME% можно услышать?', null, null, null, '');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (8, 'npc', 'Да, конечно, давайте соединю', null, true, null, 'success');
INSERT INTO public.managers_node (id, category, text, is_fail, is_success, is_start, type) VALUES (2, 'npc', 'Здраствуйте!', null, null, null, '');