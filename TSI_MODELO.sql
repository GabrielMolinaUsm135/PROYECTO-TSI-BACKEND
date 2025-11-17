CREATE TABLE `usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `rut` varchar(255) UNIQUE,
  `nombre` varchar(255),
  `apellido_paterno` varchar(255),
  `apellido_materno` varchar(255),
  `correo` varchar(255) UNIQUE,
  `telefono` varchar(255),
  `direccion` varchar(255),
  `password` varchar(255),
  `id_rol` int
);

CREATE TABLE `rol` (
  `id_rol` int PRIMARY KEY AUTO_INCREMENT,
  `nombre_rol` varchar(255)
);

CREATE TABLE `apoderado` (
  `id_apoderado` int PRIMARY KEY AUTO_INCREMENT,
  `rut` varchar(255) UNIQUE,
  `nombre` varchar(255),
  `correo` varchar(255),
  `telefono` varchar(255)
);

CREATE TABLE `profesor` (
  `id_profesor` int PRIMARY KEY AUTO_INCREMENT,
  `id_usuario` int UNIQUE,
  `asignatura` varchar(255)
);

CREATE TABLE `alumno` (
  `id_alumno` int PRIMARY KEY AUTO_INCREMENT,
  `id_apoderado` int,
  `id_usuario` int UNIQUE,
  `diagnostico_ne` varchar(255),
  `id_grupo_teoria` int,
  `fecha_ingreso` date
);

CREATE TABLE `notas` (
  `id_nota` int PRIMARY KEY AUTO_INCREMENT,
  `id_alumno` int,
  `fecha_evaluacion` date,
  `nombre_evaluacion` varchar(255),
  `nota` int
);

CREATE TABLE `alergia` (
  `cod_alergia` int PRIMARY KEY AUTO_INCREMENT,
  `nombre_alergia` varchar(255)
);

CREATE TABLE `grupo_teoria` (
  `id_grupo_teoria` int PRIMARY KEY AUTO_INCREMENT,
  `nombre_grupo` varchar(255),
  `nivel` varchar(255)
);

CREATE TABLE `instrumento` (
  `cod_instrumento` varchar(255) PRIMARY KEY,
  `nombre_instrumento` varchar(255),
  `modelo_instrumento` varchar(255),
  `tamaño` varchar(255),
  `observacion` varchar(255)
);

CREATE TABLE `insumo` (
  `cod_insumo` varchar(255) PRIMARY KEY,
  `nombre_insumo` varchar(255),
  `observacion` varchar(255)
);

CREATE TABLE `instrumento_insumo` (
  `cod_instrumento` varchar(255),
  `cod_insumo` varchar(255),
  PRIMARY KEY (`cod_instrumento`, `cod_insumo`)
);

CREATE TABLE `prestamo_instrumento` (
  `cod_prestamo` varchar(255) PRIMARY KEY,
  `cod_instrumento` varchar(255),
  `id_usuario` int,
  `fecha_prestamo` date,
  `fecha_devolucion` date,
  `estado` varchar(255)
);

CREATE TABLE `prestamo_insumo` (
  `cod_prestamo` varchar(255) PRIMARY KEY,
  `cod_insumo` varchar(255),
  `id_usuario` int,
  `fecha_prestamo` date,
  `fecha_devolucion` date,
  `estado` varchar(255)
);

CREATE TABLE `alumno_alergia` (
  `cod_alergia` int,
  `id_alumno` int,
  PRIMARY KEY (`cod_alergia`, `id_alumno`)
);

ALTER TABLE `usuario` ADD FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);

ALTER TABLE `profesor` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `alumno` ADD FOREIGN KEY (`id_apoderado`) REFERENCES `apoderado` (`id_apoderado`);

ALTER TABLE `alumno` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `alumno` ADD FOREIGN KEY (`id_grupo_teoria`) REFERENCES `grupo_teoria` (`id_grupo_teoria`);

ALTER TABLE `notas` ADD FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`);

ALTER TABLE `instrumento_insumo` ADD FOREIGN KEY (`cod_instrumento`) REFERENCES `instrumento` (`cod_instrumento`);

ALTER TABLE `instrumento_insumo` ADD FOREIGN KEY (`cod_insumo`) REFERENCES `insumo` (`cod_insumo`);

ALTER TABLE `prestamo_instrumento` ADD FOREIGN KEY (`cod_instrumento`) REFERENCES `instrumento` (`cod_instrumento`);

ALTER TABLE `prestamo_instrumento` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `prestamo_insumo` ADD FOREIGN KEY (`cod_insumo`) REFERENCES `insumo` (`cod_insumo`);

ALTER TABLE `prestamo_insumo` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `alumno_alergia` ADD FOREIGN KEY (`cod_alergia`) REFERENCES `alergia` (`cod_alergia`);

ALTER TABLE `alumno_alergia` ADD FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`);
