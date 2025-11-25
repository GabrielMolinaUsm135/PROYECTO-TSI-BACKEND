-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 25, 2025 at 08:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd-tsi`
--

-- --------------------------------------------------------

--
-- Table structure for table `alergia`
--

CREATE TABLE `alergia` (
  `cod_alergia` int(11) NOT NULL,
  `nombre_alergia` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alergia`
--

INSERT INTO `alergia` (`cod_alergia`, `nombre_alergia`) VALUES
(1, 'Alergia al maní'),
(2, 'Alergia a las nueces'),
(3, 'Alergia a la leche'),
(4, 'Alergia al huevo'),
(5, 'Alergia al trigo / gluten'),
(6, 'Alergia a los mariscos'),
(7, 'Alergia al pescado'),
(8, 'Alergia a la soya'),
(9, 'Alergia al chocolate'),
(10, 'Alergia a las frutillas'),
(11, 'Alergia al polen'),
(12, 'Alergia a los ácaros del polvo'),
(13, 'Alergia a los mohos'),
(14, 'Alergia a la caspa de perro'),
(15, 'Alergia a la caspa de gato'),
(16, 'Alergia a los pastos'),
(17, 'Alergia a los ácaros de la humedad'),
(18, 'Alergia a la penicilina'),
(19, 'Alergia a la amoxicilina'),
(20, 'Alergia al ibuprofeno'),
(21, 'Alergia a la aspirina'),
(22, 'Alergia a los antiinflamatorios (AINEs)'),
(23, 'Alergia a las sulfas'),
(24, 'Alergia al látex'),
(25, 'Alergia al níquel'),
(26, 'Alergia a fragancias'),
(27, 'Alergia a jabones'),
(28, 'Alergia a detergentes'),
(29, 'Alergia al cloro'),
(30, 'Alergia a cosméticos'),
(31, 'Alergia a picadura de abeja'),
(32, 'Alergia a picadura de avispa'),
(33, 'Alergia a picadura de hormiga'),
(34, 'Alergia al frío'),
(35, 'Alergia al sol'),
(36, 'Alergia al polvo de tiza'),
(37, 'Alergia al maquillaje');

-- --------------------------------------------------------

--
-- Table structure for table `alumno`
--

CREATE TABLE `alumno` (
  `id_alumno` int(11) NOT NULL,
  `id_apoderado` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido_paterno` varchar(50) DEFAULT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `diagnostico_ne` varchar(255) DEFAULT NULL,
  `id_grupo_teoria` int(11) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `rut` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumno`
--

INSERT INTO `alumno` (`id_alumno`, `id_apoderado`, `id_usuario`, `nombre`, `apellido_paterno`, `apellido_materno`, `telefono`, `direccion`, `diagnostico_ne`, `id_grupo_teoria`, `fecha_ingreso`, `rut`) VALUES
(6, NULL, 13, 'Mickaella', 'Santamaria', 'Silva', '56987452007', 'exfundo santamaria parcela 5b', 'Autismo severo', 1, '2025-11-24', '23590657-0');

-- --------------------------------------------------------

--
-- Table structure for table `alumno_alergia`
--

CREATE TABLE `alumno_alergia` (
  `cod_alergia` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `apoderado`
--

CREATE TABLE `apoderado` (
  `id_apoderado` int(11) NOT NULL,
  `rut` varchar(12) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `apoderado`
--

INSERT INTO `apoderado` (`id_apoderado`, `rut`, `nombre`, `correo`, `telefono`) VALUES
(1, '12.345.678-9', 'María Torres', 'maria.torres@example.com', '+56987654321'),
(2, '15.987.654-3', 'Carlos Muñoz', 'carlos.munoz@example.com', '+56978541236'),
(3, '18.456.123-5', 'Ana González', 'ana.gonzalez@example.com', '+56991234567'),
(4, '16.234.987-2', 'Rodrigo López', 'rodrigo.lopez@example.com', '+56999887766'),
(5, '19.876.543-1', 'Patricia Sánchez', 'patricia.sanchez@example.com', '+56977665544'),
(6, '17.111.222-3', 'Luis Hernández', 'luis.hernandez@example.com', '+56966554433'),
(7, '13.222.444-6', 'Claudia Fuentes', 'claudia.fuentes@example.com', '+56965432178'),
(8, '14.789.321-8', 'Diego Rojas', 'diego.rojas@example.com', '+56978965412'),
(9, '11.543.987-0', 'Verónica Díaz', 'veronica.diaz@example.com', '+56974455667'),
(10, '20.123.456-7', 'Francisco Paredes', 'francisco.paredes@example.com', '+56970011223');

-- --------------------------------------------------------

--
-- Table structure for table `grupo_teoria`
--

CREATE TABLE `grupo_teoria` (
  `id_grupo_teoria` int(11) NOT NULL,
  `nombre_grupo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grupo_teoria`
--

INSERT INTO `grupo_teoria` (`id_grupo_teoria`, `nombre_grupo`) VALUES
(1, 'Morado'),
(2, 'Rojo'),
(3, 'Azul'),
(4, 'Verde');

-- --------------------------------------------------------

--
-- Table structure for table `instrumento`
--

CREATE TABLE `instrumento` (
  `cod_instrumento` varchar(8) NOT NULL,
  `nombre_instrumento` varchar(100) DEFAULT NULL,
  `modelo_instrumento` varchar(50) DEFAULT NULL,
  `tamaño` varchar(20) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instrumento`
--

INSERT INTO `instrumento` (`cod_instrumento`, `nombre_instrumento`, `modelo_instrumento`, `tamaño`, `observacion`) VALUES
('CELL001', 'Cello', 'Yamaha C2', '1/2', 'Rayón superficial'),
('CELL002', 'Cello', 'Stentor Student II', '3/4', 'Sin observaciones'),
('CELL003', 'Cello', 'Cremona SC-130', '4/4', 'Golpe leve en el costado'),
('CLAR001', 'Clarinete', 'Yamaha YCL-255', 'Estándar', 'Llaves lubricadas recientemente'),
('CLAR002', 'Clarinete', 'Buffet B12', 'Estándar', 'Estuche rígido'),
('CLAR003', 'Clarinete', 'Jupiter JCL-700', 'Estándar', 'Boquilla nueva'),
('CLAR004', 'Clarinete', 'Selmer CL211', 'Estándar', 'Leve desgaste exterior'),
('FLAU001', 'Flauta Traversa', 'Yamaha YFL-222', 'Estándar', 'Estuche deteriorado'),
('FLAU002', 'Flauta Traversa', 'Gemeinhardt 2SP', 'Estándar', 'Perfecto estado'),
('FLAU003', 'Flauta Traversa', 'Trevor James 10X', 'Estándar', 'Zapatillas nuevas'),
('FLAU004', 'Flauta Traversa', 'Azumi AZ-Z1', 'Estándar', 'Llaves alineadas'),
('OBOE001', 'Oboe', 'Yamaha YOB-241', 'Estándar', 'Revisar zapatillas'),
('OBOE002', 'Oboe', 'Buffet Crampon 4121', 'Estándar', 'Buen estado'),
('TROM001', 'Trompeta', 'Bach TR300', 'Estándar', 'Boquilla reemplazada'),
('TROM002', 'Trompeta', 'Yamaha YTR-2330', 'Estándar', 'Sin observaciones'),
('TROM003', 'Trompeta', 'Jean Paul TR-330', 'Estándar', 'Limpieza reciente'),
('TROM004', 'Trompeta', 'King 601', 'Estándar', 'Boquilla adicional incluida'),
('TUBA001', 'Tuba', 'Jupiter JTU700', 'Estándar', 'Rayas menores'),
('TUBA002', 'Tuba', 'Yamaha YBB-105', 'Estándar', 'Sonido brillante'),
('VIOL001', 'Violín', 'Yamaha V3', '1/2', 'Leve desgaste en la tapa'),
('VIOL002', 'Violín', 'Stentor Student I', '3/4', 'Buen estado'),
('VIOL003', 'Violín', 'Cremona SV-130', '4/4', 'Cuerdas nuevas'),
('VIOL004', 'Violín', 'Hofner AS-160', '1/4', 'Puente renovado'),
('VIOL005', 'Violín', 'Fenix FV44', '4/4', 'Incluye arco nuevo'),
('VIOL006', 'Violín', 'Yamaha V5SA', '3/4', 'Incluye funda'),
('VIOL007', 'Violín', 'Stentor Conservatoire', '4/4', 'Montado recientemente');

-- --------------------------------------------------------

--
-- Table structure for table `instrumento_insumo`
--

CREATE TABLE `instrumento_insumo` (
  `cod_instrumento` varchar(8) NOT NULL,
  `cod_insumo` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `insumo`
--

CREATE TABLE `insumo` (
  `cod_insumo` varchar(8) NOT NULL,
  `nombre_insumo` varchar(100) DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `insumo`
--

INSERT INTO `insumo` (`cod_insumo`, `nombre_insumo`, `observacion`) VALUES
('ACCE001', 'Atril musical', 'Altura regulable'),
('ACCE002', 'Atril musical', 'Tornillo flojo'),
('ACCE003', 'Afinador digital', 'Incluye batería'),
('ARCO001', 'Arco para violín', 'Fibra de carbono'),
('ARCO002', 'Arco para cello', 'Madera de brasil'),
('BOQU001', 'Boquilla para trompeta', 'Modelo 7C'),
('BOQU002', 'Boquilla para trompeta', 'Modelo 3C'),
('CORR001', 'Correa para saxofón', 'Acolchada'),
('CORR002', 'Correa para oboe', 'Ajustable'),
('CUER001', 'Juego de cuerdas para violín', 'Tensión media'),
('CUER002', 'Juego de cuerdas para cello', 'Incluye repuesto de Re'),
('CUER003', 'Cuerda Mi para violín', 'Individual'),
('ESTU001', 'Estuche de Violín', 'Cierres reforzados'),
('ESTU002', 'Estuche de Cello', 'Ruedas desgastadas'),
('ESTU003', 'Estuche de Flauta', 'Buen estado'),
('ESTU004', 'Estuche de Trompeta', 'Manilla reparada'),
('LIMB001', 'Kit de limpieza para clarinete', 'Incluye gamuza'),
('LIMB002', 'Kit de limpieza para flauta', 'Incluye varilla'),
('LUBR001', 'Lubricante para llaves', 'Uso general'),
('LUBR002', 'Grasa para corcho', 'Tubo pequeño'),
('PART001', 'Partitura: Método Suzuki 1', 'Buen estado'),
('PART002', 'Partitura: Método Suzuki 2', 'Usado, marcadas algunas notas'),
('PART003', 'Partitura: Estudios de Clarinete', 'Nuevo'),
('SORD001', 'Sordina para trompeta', 'Aluminio'),
('SORD002', 'Sordina para trompeta', 'Copa ajustable');

-- --------------------------------------------------------

--
-- Table structure for table `notas`
--

CREATE TABLE `notas` (
  `id_nota` int(11) NOT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `fecha_evaluacion` date DEFAULT NULL,
  `nombre_evaluacion` varchar(150) DEFAULT NULL,
  `nota` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prestamo_instrumento`
--

CREATE TABLE `prestamo_instrumento` (
  `cod_prestamo` varchar(20) NOT NULL,
  `cod_instrumento` varchar(8) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_prestamo` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prestamo_insumo`
--

CREATE TABLE `prestamo_insumo` (
  `cod_prestamo` varchar(20) NOT NULL,
  `cod_insumo` varchar(8) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_prestamo` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profesor`
--

CREATE TABLE `profesor` (
  `id_profesor` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido_paterno` varchar(50) DEFAULT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `asignatura` varchar(50) DEFAULT NULL,
  `rut` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profesor`
--

INSERT INTO `profesor` (`id_profesor`, `id_usuario`, `nombre`, `apellido_paterno`, `apellido_materno`, `telefono`, `direccion`, `asignatura`, `rut`) VALUES
(1, 8, 'Laura', 'Soto', 'Reyes', '987654321', 'Av Siempre Viva 1', 'Profesora de Viola', NULL),
(2, 9, 'Mickaella', 'Santamaria', 'Silva', '56987452007', 'exfundo santamaria parcela 5b', 'Profesora de cello', '111111111'),
(3, 17, 'Profesor', 'a', 'a', '56987452007', 'exfundo santamaria parcela 5b', 'asdasd', '13123');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`) VALUES
(1, 'Alumno'),
(2, 'Profesor'),
(3, 'Administrador');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `correo`, `password`, `id_rol`) VALUES
(1, 'usuario@example.com', '$2b$10$PlORfnoy2BcIaU/y3LdcMOoCM7nQtCgyaJIq3aVPiPRfNQOaLD5oK', 2),
(2, 'root@gmail.com', '$2b$10$c9q7eaYOzIUft2.i6BqVnOxfDhgoAWUXnZRPg9fpjVlX7uQNgB192', 1),
(5, 'admin1@musart.com', '$2b$10$lj0ImKtBDMC7wdaJN5ie/.j8xMdW1DDGFE6fMHBjWzEw50HcnNbRK', 3),
(8, 'laura@example.com', '$2b$10$yyo9ov3m2gLmoMgMMZYNqePsTRB2Z4sM6b1BIr4QMaonoWBNNDgjC', 2),
(9, 'ejemplo@usm.cl', '$2b$10$PQfbZERdQNqXN0uQMfDPhOEHFiPdQOSsCEPSKIFaGMAMdUeLQxSEi', 2),
(13, 'mickaella@musart.com', '$2b$10$pF.cx4BDacYumPE.e4271O70Qj7hC7xpBtcUAiWk4a4u3qlcNtfkG', 3),
(17, 'profesor1@gmail.com', '$2b$10$JGXcyfjZzqY9fXvmMWukG.KfsYPjyu656p5tMiLaEePK67HEoEVFa', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alergia`
--
ALTER TABLE `alergia`
  ADD PRIMARY KEY (`cod_alergia`);

--
-- Indexes for table `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`id_alumno`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_apoderado` (`id_apoderado`),
  ADD KEY `id_grupo_teoria` (`id_grupo_teoria`);

--
-- Indexes for table `alumno_alergia`
--
ALTER TABLE `alumno_alergia`
  ADD PRIMARY KEY (`cod_alergia`,`id_alumno`),
  ADD KEY `id_alumno` (`id_alumno`);

--
-- Indexes for table `apoderado`
--
ALTER TABLE `apoderado`
  ADD PRIMARY KEY (`id_apoderado`),
  ADD UNIQUE KEY `rut` (`rut`);

--
-- Indexes for table `grupo_teoria`
--
ALTER TABLE `grupo_teoria`
  ADD PRIMARY KEY (`id_grupo_teoria`);

--
-- Indexes for table `instrumento`
--
ALTER TABLE `instrumento`
  ADD PRIMARY KEY (`cod_instrumento`);

--
-- Indexes for table `instrumento_insumo`
--
ALTER TABLE `instrumento_insumo`
  ADD PRIMARY KEY (`cod_instrumento`,`cod_insumo`),
  ADD KEY `cod_insumo` (`cod_insumo`);

--
-- Indexes for table `insumo`
--
ALTER TABLE `insumo`
  ADD PRIMARY KEY (`cod_insumo`);

--
-- Indexes for table `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`id_nota`),
  ADD KEY `id_alumno` (`id_alumno`);

--
-- Indexes for table `prestamo_instrumento`
--
ALTER TABLE `prestamo_instrumento`
  ADD PRIMARY KEY (`cod_prestamo`),
  ADD KEY `cod_instrumento` (`cod_instrumento`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `prestamo_insumo`
--
ALTER TABLE `prestamo_insumo`
  ADD PRIMARY KEY (`cod_prestamo`),
  ADD KEY `cod_insumo` (`cod_insumo`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`id_profesor`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alergia`
--
ALTER TABLE `alergia`
  MODIFY `cod_alergia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `alumno`
--
ALTER TABLE `alumno`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `apoderado`
--
ALTER TABLE `apoderado`
  MODIFY `id_apoderado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `grupo_teoria`
--
ALTER TABLE `grupo_teoria`
  MODIFY `id_grupo_teoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notas`
--
ALTER TABLE `notas`
  MODIFY `id_nota` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profesor`
--
ALTER TABLE `profesor`
  MODIFY `id_profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`id_apoderado`) REFERENCES `apoderado` (`id_apoderado`),
  ADD CONSTRAINT `alumno_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `alumno_ibfk_3` FOREIGN KEY (`id_grupo_teoria`) REFERENCES `grupo_teoria` (`id_grupo_teoria`);

--
-- Constraints for table `alumno_alergia`
--
ALTER TABLE `alumno_alergia`
  ADD CONSTRAINT `alumno_alergia_ibfk_1` FOREIGN KEY (`cod_alergia`) REFERENCES `alergia` (`cod_alergia`),
  ADD CONSTRAINT `alumno_alergia_ibfk_2` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`);

--
-- Constraints for table `instrumento_insumo`
--
ALTER TABLE `instrumento_insumo`
  ADD CONSTRAINT `instrumento_insumo_ibfk_1` FOREIGN KEY (`cod_instrumento`) REFERENCES `instrumento` (`cod_instrumento`),
  ADD CONSTRAINT `instrumento_insumo_ibfk_2` FOREIGN KEY (`cod_insumo`) REFERENCES `insumo` (`cod_insumo`);

--
-- Constraints for table `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `notas_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`);

--
-- Constraints for table `prestamo_instrumento`
--
ALTER TABLE `prestamo_instrumento`
  ADD CONSTRAINT `prestamo_instrumento_ibfk_1` FOREIGN KEY (`cod_instrumento`) REFERENCES `instrumento` (`cod_instrumento`),
  ADD CONSTRAINT `prestamo_instrumento_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `prestamo_insumo`
--
ALTER TABLE `prestamo_insumo`
  ADD CONSTRAINT `prestamo_insumo_ibfk_1` FOREIGN KEY (`cod_insumo`) REFERENCES `insumo` (`cod_insumo`),
  ADD CONSTRAINT `prestamo_insumo_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
