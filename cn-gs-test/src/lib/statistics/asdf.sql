BEGIN
	IF NEW.TagName NOT LIKE '%_TEMP' THEN		
		/*직전 레코드를 가져온다.*/
		SELECT TagValue, CumValue
		INTO @LastTagValue, @LastCumValue
		FROM exsaver.trendtable
		WHERE TagName = NEW.TagName
		and TagValue is not NULL
		ORDER BY RECORD_DT DESC limit 1;
		
		SET @LastTagValue = ifnull(@LastTagValue, 0);
		SET @LastCumValue = ifnull(@LastCumValue, 0);
		IF NEW.TagValue is NULL THEN
			/* NULL 입력시 이전 데이터 유지 */
			SET NEW.CumValue = @LastCumValue;
		ELSEIF NEW.TagValue < @LastTagValue THEN
			/* 이전값 보다 작을시(비정상) 교체나 오버플로우로 인식하고 이전값과 합산 */
			SET NEW.CumValue = NEW.TagValue + @LastTagValue;
		ELSE
			/* 이전값 보다 크거나 같을시(정상) 입력값과 이전입력값의 차를 누적값에 더한다. */
			SET NEW.CumValue = NEW.TagValue - @LastTagValue + @LastCumValue;
		END IF;
		
		IF NEW.CumValue < NEW.TagValue THEN
			SET NEW.CumValue = NEW.TagValue;
		END IF;

		/*
		정각이 아니라면 다음 정각으로 시간을 조정한다. => 정각이 될때까지 UPDATE한다. => rd_tn의 시간과 tm(현재시간)의 시간이 같아질때까지 UPDATE 된다.
		*/
		SET @targetdate = NEW.RECORD_DT;
		IF RIGHT(NEW.RECORD_DT, 4) != '0000' THEN
			SET @targetdate = DATE_ADD(@targetdate, INTERVAL 1 HOUR) + 0;
		END IF;
		
		SET @rd_tn = CONCAT(LEFT(@targetdate, 10), NEW.TagName);
		
		/*직전 레코드를 가져온다.*/
		SET @l_cv := (SELECT cv FROM record WHERE LEFT(rd_tn, 10) < LEFT(@rd_tn, 10) AND SUBSTR(rd_tn, 11) = SUBSTR(@rd_tn, 11) ORDER BY rd_tn DESC limit 1);
		IF @l_cv is NULL THEN
			SET @l_cv = 0;
		END IF;

		IF NEW.CumValue < @l_cv THEN
			/* 비정상 */
			IF NEW.TagValue >= @LastTagValue THEN
				SET NEW.CumValue = @l_cv + NEW.TagValue - @LastTagValue;
			ELSE
				SET NEW.CumValue = @l_cv + NEW.TagValue;
			END IF;
		END IF;

		INSERT INTO exsaver.record (rd_tn, tm, tv, cv, dv)
		VALUES (@rd_tn, RIGHT(NEW.RECORD_DT, 6), NEW.TagValue, NEW.CumValue, NEW.CumValue - @l_cv)
		ON DUPLICATE KEY UPDATE rd_tn = @rd_tn, tm = RIGHT(NEW.RECORD_DT, 6), tv = NEW.TagValue, cv = NEW.CumValue, dv = NEW.CumValue - @l_cv;
	ELSE
		SET NEW.CumValue = NULL;
	END IF;
END