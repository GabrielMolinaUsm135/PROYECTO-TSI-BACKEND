-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2025 at 11:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tsi-2-bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumno`
--

CREATE TABLE `alumno` (
  `rut_alumno` varchar(12) NOT NULL,
  `rut_apoderado` varchar(12) DEFAULT NULL,
  `nombre_alumno` varchar(10) DEFAULT NULL,
  `apellido_paterno` varchar(10) DEFAULT NULL,
  `apellido_materno` varchar(10) DEFAULT NULL,
  `telefono_alumno` varchar(15) DEFAULT NULL,
  `correo_alumno` varchar(40) DEFAULT NULL,
  `direccion_alumno` varchar(50) DEFAULT NULL,
  `diagnostico_ne` varchar(100) DEFAULT NULL,
  `anio_ingreso_orquesta` year(4) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumno`
--

INSERT INTO `alumno` (`rut_alumno`, `rut_apoderado`, `nombre_alumno`, `apellido_paterno`, `apellido_materno`, `telefono_alumno`, `correo_alumno`, `direccion_alumno`, `diagnostico_ne`, `anio_ingreso_orquesta`, `id_usuario`) VALUES
('11.223.344-5', '22.111.333-6', 'Catalina', 'Reyes', 'Moreno', '966778899', 'catalina.reyes@example.com', 'Calle Aurora 15', 'Ninguno', '2022', NULL),
('12.345.678-5', '88.999.000-1', 'Benjamín', 'Vargas', 'Muñoz', '944556677', 'benjamin.vargas@example.com', 'Av. Central 450', 'Trastorno del lenguaje', '2024', NULL),
('12.345.678-9', '98.765.432-1', 'Juan', 'Perez', 'Lopez', '987654321', 'juan.perez@example.com', 'Calle Falsa 123', 'Ninguno', '2023', 2),
('12.908.765-4', '77.666.888-1', 'Agustin', 'Ortega', 'Valdes', '922334477', 'agustin.ortega@example.com', 'Calle Sur 307', 'Ninguno', '2021', NULL),
('13.456.789-2', '55.666.777-8', 'Sofia', 'Martinez', 'Herrera', '911223344', 'sofia.martinez@example.com', 'Av. Los Pinos 112', 'Ninguno', '2023', NULL),
('13.543.219-7', '12.888.222-5', 'Maximilian', 'Riquelme', 'Salazar', '966778811', 'maximiliano.riquelme@example.com', 'Camino Real 421', 'Ninguno', '2021', NULL),
('13.987.654-3', '33.222.444-7', 'Joaquin', 'Fernandez', 'Silva', '977889900', 'joaquin.fernandez@example.com', 'Av. Las Palmas 88', 'Asma moderado', '2021', NULL),
('14.876.210-8', '11.999.111-4', 'Constanza', 'Guerra', 'Peña', '955667700', 'constanza.guerra@example.com', 'Calle del Sol 59', 'Diabetes tipo 1', '2020', NULL),
('15.321.654-7', '55.444.666-9', 'Vicente', 'Pizarro', 'Cortes', '999100122', 'vicente.pizarro@example.com', 'Camino Viejo 101', 'Ninguno', '2020', NULL),
('16.210.987-6', '99.888.000-3', 'Tomas', 'Escobar', 'Lagos', '944556699', 'tomas.escobar@example.com', 'Av. Los Laureles 345', 'Ninguno', '2023', NULL),
('16.543.210-9', '99.000.111-2', 'Antonia', 'Flores', 'Paredes', '955667788', 'antonia.flores@example.com', 'Camino Verde 789', 'Ninguno', '2020', NULL),
('16.789.234-5', '22.333.444-5', 'Camila', 'Rojas', 'Soto', '956123789', 'camila.rojas@example.com', 'Pasaje Azul 789', 'Ninguno', '2022', NULL),
('17.654.321-0', '88.777.999-2', 'Florencia', 'Contreras', 'Saavedra', '933445588', 'florencia.contreras@example.com', 'Pasaje Norte 42', 'Trastorno del lenguaje', '2022', NULL),
('17.890.123-4', '66.777.888-9', 'Matias', 'Torres', 'Ramirez', '922334455', 'matias.torres@example.com', 'Calle del Lago 98', 'Hipoacusia leve', '2022', NULL),
('18.765.432-1', '44.333.555-8', 'Fernanda', 'Gallardo', 'Tapia', '988990011', 'fernanda.gallardo@example.com', 'Pasaje Los Olivos 56', 'Déficit atencional', '2023', NULL),
('19.234.567-1', '77.888.999-0', 'Isabella', 'Navarro', 'Gutierrez', '933445566', 'isabella.navarro@example.com', 'Pasaje Los Álamos 23', 'Ninguno', '2021', NULL),
('19.876.543-2', '66.555.777-0', 'Josefa', 'Mendoza', 'Alarcon', '911223366', 'josefa.mendoza@example.com', 'Av. Primavera 202', 'Dislexia', '2024', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tipo_usuario` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `username`, `password`, `tipo_usuario`) VALUES
(1, 'dev_admin', '123', '0'),
(2, 'juanperez', '123', '1'),
(3, 'mariagonzalez', 'mariaPass123', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`rut_alumno`),
  ADD KEY `fk_usuario` (`id_usuario`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
