-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.6.35 - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para prueba
CREATE DATABASE IF NOT EXISTS `prueba` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `prueba`;

-- Volcando estructura para tabla prueba.curso
CREATE TABLE IF NOT EXISTS `curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo` text COLLATE utf8_spanish_ci NOT NULL,
  `nombre` text COLLATE utf8_spanish_ci NOT NULL,
  `observaciones` text COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba.curso: ~3 rows (aproximadamente)
DELETE FROM `curso`;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` (`id`, `codigo`, `nombre`, `observaciones`) VALUES
	(6, 'CUR001', 'Matematicas', '8:00 - 10:00'),
	(13, 'CUR002', 'Castellano', '10:00 - 12:00'),
	(16, 'CUR003', '', '');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;

-- Volcando estructura para tabla prueba.docente
CREATE TABLE IF NOT EXISTS `docente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `identificacion` text COLLATE utf8_spanish_ci,
  `nombres` text COLLATE utf8_spanish_ci,
  `apellidos` text COLLATE utf8_spanish_ci,
  `genero` text COLLATE utf8_spanish_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba.docente: ~3 rows (aproximadamente)
DELETE FROM `docente`;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
INSERT INTO `docente` (`id`, `identificacion`, `nombres`, `apellidos`, `genero`) VALUES
	(7, '123234', 'Monica', 'Marin', 'Femenino'),
	(8, '43214', 'Luis Eduardo', 'Blanco', 'Masculino'),
	(9, '321654', 'Jorge', 'White', 'Masculino');
/*!40000 ALTER TABLE `docente` ENABLE KEYS */;

-- Volcando estructura para tabla prueba.docente_curso
CREATE TABLE IF NOT EXISTS `docente_curso` (
  `id_docente` bigint(20) NOT NULL,
  `id_curso` bigint(20) NOT NULL,
  UNIQUE KEY `FK_Curso_D` (`id_curso`),
  KEY `FK_Docente_C` (`id_docente`),
  CONSTRAINT `FK_Curso_D` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`),
  CONSTRAINT `FK_Docente_C` FOREIGN KEY (`id_docente`) REFERENCES `docente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba.docente_curso: ~3 rows (aproximadamente)
DELETE FROM `docente_curso`;
/*!40000 ALTER TABLE `docente_curso` DISABLE KEYS */;
INSERT INTO `docente_curso` (`id_docente`, `id_curso`) VALUES
	(7, 13),
	(7, 16),
	(8, 6);
/*!40000 ALTER TABLE `docente_curso` ENABLE KEYS */;

-- Volcando estructura para tabla prueba.estudiante
CREATE TABLE IF NOT EXISTS `estudiante` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `identificacion` text COLLATE utf8_spanish_ci,
  `nombres` text COLLATE utf8_spanish_ci,
  `apellidos` text COLLATE utf8_spanish_ci,
  `genero` text COLLATE utf8_spanish_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba.estudiante: ~2 rows (aproximadamente)
DELETE FROM `estudiante`;
/*!40000 ALTER TABLE `estudiante` DISABLE KEYS */;
INSERT INTO `estudiante` (`id`, `identificacion`, `nombres`, `apellidos`, `genero`) VALUES
	(4, '123456', 'Pedro', 'Manjarres', 'Masculino'),
	(5, '654321', 'Sergio', 'Manjarres', 'Masculino'),
	(6, '74123', 'Juan', 'Julio', 'Masculino'),
	(7, '987654', 'Dulce Patricia', 'Gomez', 'Femenino');
/*!40000 ALTER TABLE `estudiante` ENABLE KEYS */;

-- Volcando estructura para tabla prueba.estudiante_curso
CREATE TABLE IF NOT EXISTS `estudiante_curso` (
  `id_estudiante` bigint(20) NOT NULL,
  `id_curso` bigint(20) NOT NULL,
  KEY `FK_Estudiante_C` (`id_estudiante`),
  KEY `FK_Curso_E` (`id_curso`),
  CONSTRAINT `FK_Curso_E` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`),
  CONSTRAINT `FK_Estudiante_C` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiante` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba.estudiante_curso: ~6 rows (aproximadamente)
DELETE FROM `estudiante_curso`;
/*!40000 ALTER TABLE `estudiante_curso` DISABLE KEYS */;
INSERT INTO `estudiante_curso` (`id_estudiante`, `id_curso`) VALUES
	(7, 13);
/*!40000 ALTER TABLE `estudiante_curso` ENABLE KEYS */;

-- Volcando estructura para tabla prueba.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` text COLLATE utf8_spanish_ci NOT NULL,
  `password` text COLLATE utf8_spanish_ci NOT NULL,
  KEY `PK_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- Volcando datos para la tabla prueba.usuario: ~0 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `username`, `password`) VALUES
	(1, 'admin', 'admin');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
