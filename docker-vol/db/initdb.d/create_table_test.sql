-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.10.3-MariaDB-1:10.10.3+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- viewerlock 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `viewerlock` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `viewerlock`;

-- 테이블 viewerlock.il_assem 구조 내보내기
CREATE TABLE IF NOT EXISTS `il_assem` (
  `time` timestamp NOT NULL,
  `model` int(11) DEFAULT NULL,
  `exp1` int(11) DEFAULT NULL,
  `redu` int(11) DEFAULT NULL,
  `oring1` int(11) DEFAULT NULL,
  `exp2` int(11) DEFAULT NULL,
  `nipple` int(11) DEFAULT NULL,
  `oring2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 viewerlock.il_assem_day 구조 내보내기
CREATE TABLE IF NOT EXISTS `il_assem_day` (
  `date` date NOT NULL,
  `time` timestamp NOT NULL,
  `exp1` int(11) DEFAULT NULL,
  `redu` int(11) DEFAULT NULL,
  `oring1` int(11) DEFAULT NULL,
  `exp2` int(11) DEFAULT NULL,
  `nipple` int(11) DEFAULT NULL,
  `oring2` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='에러 유형별 하루 인터락 횟수 - 자동 조립기';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 뷰 viewerlock.il_assem_day_cnt 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `il_assem_day_cnt` (
	`time` DATE NOT NULL,
	`il_cnt` BIGINT(16) NOT NULL
) ENGINE=MyISAM;

-- 뷰 viewerlock.il_leak_day_cnt 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `il_leak_day_cnt` (
	`time` DATE NOT NULL,
	`il_cnt` BIGINT(16) NOT NULL
) ENGINE=MyISAM;

-- 테이블 viewerlock.il_shape 구조 내보내기
CREATE TABLE IF NOT EXISTS `il_shape` (
  `time` timestamp NOT NULL,
  `model` int(11) DEFAULT NULL,
  `cnt` int(11) DEFAULT NULL,
  `beeline1` int(11) DEFAULT NULL,
  `beeline2` int(11) DEFAULT NULL,
  `shape1` int(11) DEFAULT NULL,
  `shape2` int(11) DEFAULT NULL,
  `cut1` int(11) DEFAULT NULL,
  `cut2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 viewerlock.il_shape_day 구조 내보내기
CREATE TABLE IF NOT EXISTS `il_shape_day` (
  `date` date NOT NULL,
  `time` timestamp NOT NULL,
  `m_1` int(11) DEFAULT NULL,
  `m_2` int(11) DEFAULT NULL,
  `m_3` int(11) DEFAULT NULL,
  `m_4` int(11) DEFAULT NULL,
  `m_5` int(11) DEFAULT NULL,
  `m_6` int(11) DEFAULT NULL,
  `m_7` int(11) DEFAULT NULL,
  `m_8` int(11) DEFAULT NULL,
  `m_9` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='모델별 하루 인터락 횟수 - 자동 성형기';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 뷰 viewerlock.il_shape_day_cnt 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `il_shape_day_cnt` (
	`time` DATE NOT NULL,
	`il_cnt` BIGINT(19) NOT NULL
) ENGINE=MyISAM;

-- 뷰 viewerlock.il_shape_day_mod 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `il_shape_day_mod` (
	`time` DATE NOT NULL,
	`700` INT(11) NOT NULL,
	`1000` INT(11) NOT NULL,
	`1200` INT(11) NOT NULL,
	`1500` INT(11) NOT NULL,
	`1800` INT(11) NOT NULL,
	`2100` INT(11) NOT NULL,
	`2500` INT(11) NOT NULL,
	`2800` INT(11) NOT NULL,
	`3100` INT(11) NOT NULL
) ENGINE=MyISAM;

-- 테이블 viewerlock.prod_assem 구조 내보내기
CREATE TABLE IF NOT EXISTS `prod_assem` (
  `time` timestamp NOT NULL,
  `model` int(11) DEFAULT NULL,
  `cnt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='cnt는 카메라로 인식된 데이터이다. 인식 오류가 있을 수도 있고 liner한 증가를 보장하지도 않는다.';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 viewerlock.prod_assem_day 구조 내보내기
CREATE TABLE IF NOT EXISTS `prod_assem_day` (
  `date` date NOT NULL,
  `time` timestamp NOT NULL,
  `m_1` int(11) unsigned DEFAULT NULL,
  `m_2` int(11) unsigned DEFAULT NULL,
  `m_3` int(11) unsigned DEFAULT NULL,
  `m_4` int(11) unsigned DEFAULT NULL,
  `m_5` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='모델별 하루 생산 수량 - 자동 조립기';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 뷰 viewerlock.prod_assem_day_cap 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `prod_assem_day_cap` (
	`time` DATE NOT NULL,
	`prod_cap` DECIMAL(19,4) NULL
) ENGINE=MyISAM;

-- 뷰 viewerlock.prod_assem_day_cnt 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `prod_assem_day_cnt` (
	`time` DATE NOT NULL,
	`prod_cnt` DECIMAL(12,0) NOT NULL
) ENGINE=MyISAM;

-- 테이블 viewerlock.prod_shape 구조 내보내기
CREATE TABLE IF NOT EXISTS `prod_shape` (
  `time` timestamp NOT NULL,
  `model` int(11) DEFAULT NULL,
  `cnt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 viewerlock.prod_shape_day 구조 내보내기
CREATE TABLE IF NOT EXISTS `prod_shape_day` (
  `date` date NOT NULL,
  `time` timestamp NOT NULL,
  `m_1` int(11) unsigned DEFAULT NULL,
  `m_2` int(11) unsigned DEFAULT NULL,
  `m_3` int(11) unsigned DEFAULT NULL,
  `m_4` int(11) unsigned DEFAULT NULL,
  `m_5` int(11) unsigned DEFAULT NULL,
  `m_6` int(11) unsigned DEFAULT NULL,
  `m_7` int(11) unsigned DEFAULT NULL,
  `m_8` int(11) unsigned DEFAULT NULL,
  `m_9` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='모델별 하루 생산 수량 - 자동 성형기';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 뷰 viewerlock.prod_shape_day_cap 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `prod_shape_day_cap` (
	`time` DATE NOT NULL,
	`prod_cap` DECIMAL(28,4) NULL
) ENGINE=MyISAM;

-- 뷰 viewerlock.prod_shape_day_cnt 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `prod_shape_day_cnt` (
	`time` DATE NOT NULL,
	`prod_cnt` DECIMAL(19,0) NOT NULL
) ENGINE=MyISAM;

-- 뷰 viewerlock.prod_shape_day_mod 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `prod_shape_day_mod` (
	`time` DATE NOT NULL,
	`700` DECIMAL(11,0) NOT NULL,
	`1000` DECIMAL(11,0) NOT NULL,
	`1200` DECIMAL(11,0) NOT NULL,
	`1500` DECIMAL(11,0) NOT NULL,
	`1800` DECIMAL(11,0) NOT NULL,
	`2100` DECIMAL(11,0) NOT NULL,
	`2500` DECIMAL(11,0) NOT NULL,
	`2800` DECIMAL(11,0) NOT NULL,
	`3100` DECIMAL(11,0) NOT NULL
) ENGINE=MyISAM;

-- 테이블 viewerlock.shape_ref 구조 내보내기
CREATE TABLE IF NOT EXISTS `shape_ref` (
  `model` int(11) DEFAULT NULL,
  `beeline1` int(11) DEFAULT NULL,
  `beeline2` int(11) DEFAULT NULL,
  `shape1` int(11) DEFAULT NULL,
  `shape2` int(11) DEFAULT NULL,
  `cut1` int(11) DEFAULT NULL,
  `cut2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 viewerlock.shape_ref:~5 rows (대략적) 내보내기
REPLACE INTO `shape_ref` (`model`, `beeline1`, `beeline2`, `shape1`, `shape2`, `cut1`, `cut2`) VALUES
  (700, 500, 1000, 5000, 5001, 8000, 8000),
  (1000, 500, 1800, 6960, 6961, 2900, 2900),
  (1200, 700, 1500, 9300, 9301, 11500, 11500),
  (1500, 700, 1800, 12010, 12011, 11530, 11530),
  (1800, 700, 1700, 15230, 15231, 11530, 11530),
  (2500, 700, 1750, 22120, 22121, 11530, 11530),
  (700, 10, 730, 5030, 5031, 90, 90),
  (1000, 500, 670, 8110, 8111, 2370, 2370),
  (1200, 500, 700, 10080, 10081, 350, 350),
  (1500, 500, 650, 13160, 13161, 11160, 11160),
  (1800, 500, 670, 16190, 16191, 11120, 11120),
  (2100, 500, 670, 19220, 19221, 11150, 11150),
  (2500, 700, 1700, 22180, 22181, 11500, 11500),
  (3100, 500, 700, 29260, 29261, 11140, 11140),
  (2500, 500, 700, 23200, 23201, 11160, 11160),
  (2800, 500, 700, 26230, 26231, 11160, 11160),
  (2800, 700, 1700, 25230, 25231, 11530, 11530),
  (3100, 500, 700, 29280, 29281, 11130, 11130);
	-- (700, 900, 1800, 3600, 3601, 10200, 10200),
	-- (1000, 900, 1800, 6890, 6881, 1470, 1470),
	-- (1200, 900, 1950, 8700, 8701, 10040, 10040),
	-- (1500, 900, 1920, 11690, 11691, 10050, 10050),
	-- (1800, 900, 1950, 14650, 14651, 10090, 10090),
	-- (2500, 500, 700, 23200, 23201, 11140, 11140);

-- 테이블 viewerlock.test_leak 구조 내보내기
CREATE TABLE IF NOT EXISTS `test_leak` (
  `time` timestamp NOT NULL,
  `err1` int(11) DEFAULT NULL,
  `err2` int(11) DEFAULT NULL,
  `err3` int(11) DEFAULT NULL,
  `err4` int(11) DEFAULT NULL,
  `err5` int(11) DEFAULT NULL,
  `err6` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 viewerlock.test_leak_day 구조 내보내기
CREATE TABLE IF NOT EXISTS `test_leak_day` (
  `date` date NOT NULL,
  `time` timestamp NOT NULL,
  `cnt` int(11) DEFAULT NULL,
  `err1` int(11) DEFAULT NULL,
  `err2` int(11) DEFAULT NULL,
  `err3` int(11) DEFAULT NULL,
  `err4` int(11) DEFAULT NULL,
  `err5` int(11) DEFAULT NULL,
  `err6` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='하루 테스트 횟수 및 포트별 에러 횟수 - 리크측정기';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 뷰 viewerlock.test_leak_day_cap 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `test_leak_day_cap` (
	`time` DATE NOT NULL,
	`test_cap` DECIMAL(17,4) NULL
) ENGINE=MyISAM;

-- 뷰 viewerlock.test_leak_day_cnt 구조 내보내기
-- VIEW 종속성 오류를 극복하기 위해 임시 테이블을 생성합니다.
CREATE TABLE `test_leak_day_cnt` (
	`time` DATE NOT NULL,
	`test_cnt` INT(11) NOT NULL
) ENGINE=MyISAM;

-- 테이블 viewerlock.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `mail` varchar(100) NOT NULL,
  `note` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 viewerlock.users:~2 rows (대략적) 내보내기
REPLACE INTO `users` (`mail`, `note`) VALUES
	('cn.gs.test@gmail.com', 'user'),
	('soarchma.cn@gmail.com', 'user'),
	('soarchma@gmail.com', 'admin');

-- 테이블 viewerlock.user_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_log` (
  `time` timestamp NULL DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `sucess` bit(1) DEFAULT NULL,
  `note` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 트리거 viewerlock.il_assem_after_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `il_assem_after_insert` AFTER INSERT ON `il_assem` FOR EACH ROW BEGIN
	SET @today = DATE_FORMAT(NOW(), '%Y-%m-%d');

	SELECT
		COUNT(exp1) AS exp1,
		COUNT(redu) AS redu,
		COUNT(oring1) AS oring1,
		COUNT(exp2) AS exp2,
		COUNT(nipple) AS nipple,
		COUNT(oring2) AS oring2
		INTO @exp1, @redu, @oring1, @exp2, @nipple, @oring2
		FROM viewerlock.il_assem
		WHERE TIME LIKE CONCAT(@today, '%');
	
	INSERT INTO viewerlock.il_assem_day (DATE, TIME, exp1, redu, oring1, exp2, nipple, oring2)
	VALUES (@today, CURRENT_TIMESTAMP, @exp1, @redu, @oring1, @exp2, @nipple, @oring2)
	ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, exp1=@exp1, redu=@redu, oring1=@oring1, exp2=@exp2, nipple=@nipple, oring2=@oring2;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 viewerlock.il_shape_after_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `il_shape_after_insert` AFTER INSERT ON `il_shape` FOR EACH ROW BEGIN

	SET @today = DATE_FORMAT(NOW(), '%Y-%m-%d');

	SELECT COUNT(TIME) AS cnt INTO @new_cnt
		FROM viewerlock.il_shape
		WHERE TIME LIKE CONCAT(@today, '%')
		AND model = NEW.model;
	
	IF NEW.model = 700 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_1) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_1=@new_cnt;
	ELSEIF NEW.model = 1000 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_2) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_2=@new_cnt;
	ELSEIF NEW.model = 1200 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_3) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_3=@new_cnt;
	ELSEIF NEW.model = 1500 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_4) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_4=@new_cnt;
	ELSEIF NEW.model = 1800 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_5) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_5=@new_cnt;
	ELSEIF NEW.model = 2500 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_6) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_6=@new_cnt;
	ELSEIF NEW.model = 2800 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_7) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_7=@new_cnt;
	ELSEIF NEW.model = 3100 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_8) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_8=@new_cnt;
	ELSEIF NEW.model = 2100 THEN
		INSERT INTO viewerlock.il_shape_day (DATE, TIME, m_9) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_9=@new_cnt;
	END IF;

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 viewerlock.prod_assem_after_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `prod_assem_after_insert` AFTER INSERT ON `prod_assem` FOR EACH ROW BEGIN
	SET @today = DATE_FORMAT(NOW(), '%Y-%m-%d');
	SELECT COUNT(TIME) AS cnt INTO @new_cnt
		FROM viewerlock.prod_assem
		WHERE TIME LIKE CONCAT(@today, '%')
		AND model = NEW.model;
	
	IF NEW.model = 700 THEN
		INSERT INTO viewerlock.prod_assem_day (DATE, TIME, m_1) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_1=@new_cnt;
	ELSEIF NEW.model = 1000 THEN
		INSERT INTO viewerlock.prod_assem_day (DATE, TIME, m_2) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_2=@new_cnt;
	ELSEIF NEW.model = 1200 THEN
		INSERT INTO viewerlock.prod_assem_day (DATE, TIME, m_3) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_3=@new_cnt;
	ELSEIF NEW.model = 1500 THEN
		INSERT INTO viewerlock.prod_assem_day (DATE, TIME, m_4) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_4=@new_cnt;
	ELSEIF NEW.model = 1800 THEN
		INSERT INTO viewerlock.prod_assem_day (DATE, TIME, m_5) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_5=@new_cnt;
	END IF;
	
#	INSERT INTO viewerlock.prod_assem_day (DATE, @model) VALUES (@today, @new_cnt) ON DUPLICATE KEY UPDATE DATE=@today, @model=@new_cnt;
#	SET @str = CONCAT('INSERT INTO viewerlock.prod_assem_day (DATE, ',@model,') VALUES (',@today,', ',@new_cnt,') ON DUPLICATE KEY UPDATE DATE=',@today,', ',@model,'=',@new_cnt);
#	PREPARE stmt3 FROM @str;
#	EXECUTE stmt3;
#	DEALLOCATE PREPARE stmt3;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 viewerlock.prod_shape_after_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `prod_shape_after_insert` AFTER INSERT ON `prod_shape` FOR EACH ROW BEGIN
	SET @today = DATE_FORMAT(NOW(), '%Y-%m-%d');
	SELECT COUNT(TIME) AS cnt INTO @new_cnt
		FROM viewerlock.prod_shape
		WHERE TIME LIKE CONCAT(@today, '%')
		AND model = NEW.model;
	
	IF NEW.model = 700 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_1) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_1=@new_cnt;
	ELSEIF NEW.model = 1000 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_2) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_2=@new_cnt;
	ELSEIF NEW.model = 1200 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_3) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_3=@new_cnt;
	ELSEIF NEW.model = 1500 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_4) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_4=@new_cnt;
	ELSEIF NEW.model = 1800 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_5) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_5=@new_cnt;
	ELSEIF NEW.model = 2500 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_6) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_6=@new_cnt;
	ELSEIF NEW.model = 2800 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_7) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_7=@new_cnt;
	ELSEIF NEW.model = 3100 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_8) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_8=@new_cnt;
	ELSEIF NEW.model = 2100 THEN
		INSERT INTO viewerlock.prod_shape_day (DATE, TIME, m_9) VALUES (@today, CURRENT_TIMESTAMP, @new_cnt) ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, m_9=@new_cnt;
	END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 트리거 viewerlock.test_leak_after_insert 구조 내보내기
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `test_leak_after_insert` AFTER INSERT ON `test_leak` FOR EACH ROW BEGIN
	SET @today = DATE_FORMAT(NOW(), '%Y-%m-%d');
	SELECT
		COUNT(TIME) AS cnt,
		MAX(err1) - MIN(err1) AS err1,
		MAX(err2) - MIN(err2) AS err2,
		MAX(err3) - MIN(err3) AS err3,
		MAX(err4) - MIN(err4) AS err4,
		MAX(err5) - MIN(err5) AS err5,
		MAX(err6) - MIN(err6) AS err6
		INTO @cnt, @err1, @err2, @err3, @err4, @err5, @err6
		FROM viewerlock.test_leak
		WHERE TIME LIKE CONCAT(@today, '%');
		
		INSERT INTO viewerlock.test_leak_day (DATE, TIME, cnt, err1, err2, err3, err4, err5, err6)
		VALUES (@today, CURRENT_TIMESTAMP, @cnt, @err1, @err2, @err3, @err4, @err5, @err6)
		ON DUPLICATE KEY UPDATE time=CURRENT_TIMESTAMP, cnt=@cnt, err1=@err1, err2=@err2, err3=@err3, err4=@err4, err5=@err5, err6=@err6;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 뷰 viewerlock.il_assem_day_cnt 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `il_assem_day_cnt`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `il_assem_day_cnt` AS select `il_assem_day`.`date` AS `time`,ifnull(`il_assem_day`.`exp1`,0) + ifnull(`il_assem_day`.`redu`,0) + ifnull(`il_assem_day`.`oring1`,0) + ifnull(`il_assem_day`.`exp2`,0) + ifnull(`il_assem_day`.`nipple`,0) + ifnull(`il_assem_day`.`oring2`,0) AS `il_cnt` from `il_assem_day`;

-- 뷰 viewerlock.il_leak_day_cnt 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `il_leak_day_cnt`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `il_leak_day_cnt` AS select `test_leak_day`.`date` AS `time`,ifnull(`test_leak_day`.`err1`,0) + ifnull(`test_leak_day`.`err2`,0) + ifnull(`test_leak_day`.`err3`,0) + ifnull(`test_leak_day`.`err4`,0) + ifnull(`test_leak_day`.`err5`,0) + ifnull(`test_leak_day`.`err6`,0) AS `il_cnt` from `test_leak_day`;

-- 뷰 viewerlock.il_shape_day_cnt 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `il_shape_day_cnt`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `il_shape_day_cnt` AS select `il_shape_day`.`date` AS `time`,ifnull(`il_shape_day`.`m_1`,0) + ifnull(`il_shape_day`.`m_2`,0) + ifnull(`il_shape_day`.`m_3`,0) + ifnull(`il_shape_day`.`m_4`,0) + ifnull(`il_shape_day`.`m_5`,0) + ifnull(`il_shape_day`.`m_6`,0) + ifnull(`il_shape_day`.`m_7`,0) + ifnull(`il_shape_day`.`m_8`,0) + ifnull(`il_shape_day`.`m_9`,0) AS `il_cnt` from `il_shape_day`;

-- 뷰 viewerlock.il_shape_day_mod 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `il_shape_day_mod`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `il_shape_day_mod` AS select `il_shape_day`.`date` AS `time`,ifnull(`il_shape_day`.`m_1`,0) AS `700`,ifnull(`il_shape_day`.`m_2`,0) AS `1000`,ifnull(`il_shape_day`.`m_3`,0) AS `1200`,ifnull(`il_shape_day`.`m_4`,0) AS `1500`,ifnull(`il_shape_day`.`m_5`,0) AS `1800`,ifnull(`il_shape_day`.`m_9`,0) AS `2100`,ifnull(`il_shape_day`.`m_6`,0) AS `2500`,ifnull(`il_shape_day`.`m_7`,0) AS `2800`,ifnull(`il_shape_day`.`m_8`,0) AS `3100` from `il_shape_day`;

-- 뷰 viewerlock.prod_assem_day_cap 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `prod_assem_day_cap`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `prod_assem_day_cap` AS select `prod_assem_day`.`date` AS `time`,(ifnull(`prod_assem_day`.`m_3`,0) + ifnull(`prod_assem_day`.`m_4`,0)) / 900 * 100 AS `prod_cap` from `prod_assem_day`;

-- 뷰 viewerlock.prod_assem_day_cnt 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `prod_assem_day_cnt`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `prod_assem_day_cnt` AS select `prod_assem_day`.`date` AS `time`,ifnull(`prod_assem_day`.`m_3`,0) + ifnull(`prod_assem_day`.`m_4`,0) AS `prod_cnt` from `prod_assem_day`;

-- 뷰 viewerlock.prod_shape_day_cap 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `prod_shape_day_cap`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `prod_shape_day_cap` AS select `prod_shape_day`.`date` AS `time`,(ifnull(`prod_shape_day`.`m_1`,0) * 7 + ifnull(`prod_shape_day`.`m_2`,0) * 10 + ifnull(`prod_shape_day`.`m_3`,0) * 12 + ifnull(`prod_shape_day`.`m_4`,0) * 15 + ifnull(`prod_shape_day`.`m_5`,0) * 18 + ifnull(`prod_shape_day`.`m_6`,0) * 25 + ifnull(`prod_shape_day`.`m_7`,0) * 28 + ifnull(`prod_shape_day`.`m_8`,0) * 31 + ifnull(`prod_shape_day`.`m_9`,0) * 21) / 11000 * 100 AS `prod_cap` from `prod_shape_day`;

-- 뷰 viewerlock.prod_shape_day_cnt 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `prod_shape_day_cnt`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `prod_shape_day_cnt` AS select `prod_shape_day`.`date` AS `time`,ifnull(`prod_shape_day`.`m_1`,0) + ifnull(`prod_shape_day`.`m_2`,0) + ifnull(`prod_shape_day`.`m_3`,0) + ifnull(`prod_shape_day`.`m_4`,0) + ifnull(`prod_shape_day`.`m_5`,0) + ifnull(`prod_shape_day`.`m_6`,0) + ifnull(`prod_shape_day`.`m_7`,0) + ifnull(`prod_shape_day`.`m_8`,0) + ifnull(`prod_shape_day`.`m_9`,0) AS `prod_cnt` from `prod_shape_day` order by `prod_shape_day`.`date`;

-- 뷰 viewerlock.prod_shape_day_mod 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `prod_shape_day_mod`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `prod_shape_day_mod` AS select `prod_shape_day`.`date` AS `time`,ifnull(`prod_shape_day`.`m_1`,0) AS `700`,ifnull(`prod_shape_day`.`m_2`,0) AS `1000`,ifnull(`prod_shape_day`.`m_3`,0) AS `1200`,ifnull(`prod_shape_day`.`m_4`,0) AS `1500`,ifnull(`prod_shape_day`.`m_5`,0) AS `1800`,ifnull(`prod_shape_day`.`m_9`,0) AS `2100`,ifnull(`prod_shape_day`.`m_6`,0) AS `2500`,ifnull(`prod_shape_day`.`m_7`,0) AS `2800`,ifnull(`prod_shape_day`.`m_8`,0) AS `3100` from `prod_shape_day`;

-- 뷰 viewerlock.test_leak_day_cap 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `test_leak_day_cap`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `test_leak_day_cap` AS select `test_leak_day`.`date` AS `time`,ifnull(`test_leak_day`.`cnt`,0) / 1300 * 100 AS `test_cap` from `test_leak_day`;

-- 뷰 viewerlock.test_leak_day_cnt 구조 내보내기
-- 임시 테이블을 제거하고 최종 VIEW 구조를 생성
DROP TABLE IF EXISTS `test_leak_day_cnt`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `test_leak_day_cnt` AS select `test_leak_day`.`date` AS `time`,ifnull(`test_leak_day`.`cnt`,0) AS `test_cnt` from `test_leak_day`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
