CREATE PROCEDURE PickInit(_eid INTEGER)
LANGUAGE SQL
AS $BODY$
	INSERT INTO picks(eid, tid, pick_number)
	VALUES (_eid, 10, 1), 
	(_eid, 6, 2),
	(_eid, 18, 3),
	(_eid, 1, 4),
	(_eid, 9, 5),
	(_eid, 20, 6),
	(_eid, 5, 7),
	(_eid, 4, 8),
	(_eid, 30, 9),
	(_eid, 24, 10),
	(_eid, 27, 11),
	(_eid, 26, 12),
	(_eid, 19, 13),
	(_eid, 25, 14),
	(_eid, 22, 15),
	(_eid, 18, 16),
	(_eid, 2, 17),
	(_eid, 7, 18),
	(_eid, 17, 19),
	(_eid, 3, 20),
	(_eid, 8, 21),
	(_eid, 23, 22),
	(_eid, 16, 23),
	(_eid, 29, 24),
	(_eid, 21, 25),
	(_eid, 2, 26),
	(_eid, 20, 27),
	(_eid, 28, 28),
	(_eid, 14, 29),
	(_eid, 2, 30);
$BODY$;