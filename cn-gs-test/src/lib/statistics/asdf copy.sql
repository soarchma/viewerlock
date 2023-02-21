BEGIN
	/*
	오늘 날짜의 *_day 레코드를 가져온다.
	if null 그대로 insert
	else 새로운 값이 크면 업데이트
	else 작으면 ???
	*/
	select exp1, redu, oring1, exp2, nipple, oring2
	SELECT exp1, redu, oring1, exp2, nipple, oring2
	INTO @last_exp1, @last_redu, @last_oring1, @last_exp2, @last_nipple, @last_oring2
	FROM viewerlock.il_assem
	ORDER BY time DESC limit 1;
END

BEGIN
	SET @today = DATE_FORMAT(NOW(), '%Y-%m-%d');
	SELECT COUNT(TIME) AS cnt INTO @new_cnt
		FROM viewerlock.prod_assem
		WHERE TIME LIKE CONCAT(@today, '%')
		AND model = NEW.model;
	
	IF NEW.model = 700 THEN
		SET @model = m_1;
	ELSEIF NEW.model = 1000 THEN
		SET @model = m_2;
	ELSEIF NEW.model = 1200 THEN
		SET @model = m_3;
	ELSEIF NEW.model = 1500 THEN
		SET @model = m_4;
	ELSEIF NEW.model = 1800 THEN
		SET @model = m_5;
	END IF;
		
	SET @s = CONCAT('INSERT INTO viewerlock.prod_assem_day (DATE, ',@model,')
		VALUES ('@today', '@new_cnt')
		ON DUPLICATE KEY UPDATE DATE='@today', '@model'='@new_cnt);
END




SET @today = '2023-02-16';
SELECT COUNT(TIME) AS cnt, MAX(err1) AS err1, MAX(err2) AS err2, MAX(err3) AS err3, MAX(err4) AS err4, MAX(err5) AS err5, MAX(err6) AS err6
		FROM viewerlock.test_leak
		WHERE TIME LIKE CONCAT(@today, '%');

#416

INSERT INTO viewerlock.test_leak_day (DATE, TIME, cnt, err1, err2, err3, err4, err5, err6)
VALUES (@today, curdate() - INTERVAL 8 HOUR, 416, 40, 43, 30, 37, 48, 47)
ON DUPLICATE KEY UPDATE time=curdate() - INTERVAL 8 hour, cnt=416, err1=40, err2=43, err3=30, err4=37, err5=48, err6=47;
#INSERT INTO viewerlock.test_leak (DATE, TIME, m_3) VALUES (@today, CURRENT_TIMESTAMP, 428) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_3=553;
