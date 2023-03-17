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


-- cn_viewerlock 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `cn_viewerlock` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cn_viewerlock`;

-- 테이블 cn_viewerlock.shape_ref 구조 내보내기
CREATE TABLE IF NOT EXISTS `shape_ref` (
  `model` int(11) DEFAULT NULL,
  `beeline1` int(11) DEFAULT NULL,
  `beeline2` int(11) DEFAULT NULL,
  `shape1` int(11) DEFAULT NULL,
  `shape2` int(11) DEFAULT NULL,
  `cut1` int(11) DEFAULT NULL,
  `cut2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 cn_viewerlock.shape_ref:~5 rows (대략적) 내보내기
REPLACE INTO `shape_ref` (`model`, `beeline1`, `beeline2`, `shape1`, `shape2`, `cut1`, `cut2`) VALUES
	(700, 900, 1800, 3600, 3601, 10200, 10200),
	(1000, 900, 1800, 6890, 6881, 1470, 1470),
	(1200, 900, 1950, 8700, 8701, 10040, 10040),
	(1500, 900, 1920, 11690, 11691, 10050, 10050),
	(1800, 900, 1950, 14650, 14651, 10090, 10090);

-- 테이블 cn_viewerlock.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `mail` varchar(100) NOT NULL,
  `note` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 cn_viewerlock.users:~2 rows (대략적) 내보내기
REPLACE INTO `users` (`mail`, `note`) VALUES
	('soarchma.cn@gmail.com', 'user'),
	('soarchma@gmail.com', 'admin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
