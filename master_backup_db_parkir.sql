-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_parkir
-- ------------------------------------------------------
-- Server version	10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `denda`
--

DROP TABLE IF EXISTS `denda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `denda` (
  `idDenda` int(10) NOT NULL AUTO_INCREMENT,
  `denda` varchar(50) NOT NULL,
  `jumlahDenda` double NOT NULL,
  PRIMARY KEY (`idDenda`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `denda`
--

LOCK TABLES `denda` WRITE;
/*!40000 ALTER TABLE `denda` DISABLE KEYS */;
INSERT INTO `denda` VALUES (1,'Lost Card',50000),(2,'Lost Ticket',25000),(3,'No Penalty',0);
/*!40000 ALTER TABLE `denda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeniskendaraan`
--

DROP TABLE IF EXISTS `jeniskendaraan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jeniskendaraan` (
  `idJenis` int(10) NOT NULL AUTO_INCREMENT,
  `jenis` varchar(50) NOT NULL,
  `value` double NOT NULL,
  `firstValue` double NOT NULL,
  PRIMARY KEY (`idJenis`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeniskendaraan`
--

LOCK TABLES `jeniskendaraan` WRITE;
/*!40000 ALTER TABLE `jeniskendaraan` DISABLE KEYS */;
INSERT INTO `jeniskendaraan` VALUES (1,'Motorcycle',1000,2000),(2,'Car',3000,5000);
/*!40000 ALTER TABLE `jeniskendaraan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `idMember` varchar(50) NOT NULL,
  `namaMember` varchar(50) NOT NULL,
  `noPol` varchar(50) NOT NULL,
  `idJenis` int(10) NOT NULL,
  `tglRegister` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `dibuatOleh` varchar(50) NOT NULL,
  `dieditOleh` varchar(50) NOT NULL,
  `tglEdit` varchar(50) NOT NULL,
  `biayaMember` double NOT NULL,
  PRIMARY KEY (`idMember`),
  UNIQUE KEY `noPol` (`noPol`),
  KEY `FK_MemberJenisKendaraan` (`idJenis`),
  CONSTRAINT `FK_MemberJenisKendaraan` FOREIGN KEY (`idJenis`) REFERENCES `jeniskendaraan` (`idJenis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('MEMBER-005','Samuel Zigwin','F 9090 MNB',1,'03-16-21',1,'Alif Yudha Syahputra','-','-',60000),('MEMBER-006','Kesnandi','AB 1234 BVC',1,'03-16-21',1,'Alif Yudha Syahputra','-','-',60000),('MEMBER-007','Abdul Momin','B 6940 VKL',1,'03-16-21',1,'Alif Yudha Syahputra','-','-',60000),('MEMBER-008','Udin Kombo','AD 7870 BNN',2,'03-16-21',1,'Alif Yudha Syahputra','-','-',120000),('MEMBER-009','Cece Rowo','D 3434 MMI',1,'03-16-21',1,'Alif Yudha Syahputra','-','-',60000),('MEMBER-010','Saori','F 1212 GHI',1,'03-16-21',1,'Alif Yudha Syahputra','-','-',60000),('MEMBER-011','Samson','B 6366 OOE',2,'03-16-21',1,'Alif Yudha Syahputra','Alif Yudha S','03-23-21',120000),('MEMBER-012','Kusnandar','T 8981 GGG',2,'03-17-21',1,'Nexsoft Admin','-','-',120000),('MEMBER-013','Baliho','T 7877 YUU',2,'03-17-21',1,'Mc. Samsu','-','-',120000),('MEMBER-014','Januar Bambang','T 2020 YUI',1,'03-17-21',1,'Mc. Samsu','-','-',60000),('MEMBER-015','Marshanda Maimunah','T 7872 TYI',2,'03-26-21',1,'Alif Yudha Syahputra','-','-',120000);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posisi`
--

DROP TABLE IF EXISTS `posisi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posisi` (
  `idPosisi` int(5) NOT NULL AUTO_INCREMENT,
  `posisi` varchar(10) NOT NULL,
  PRIMARY KEY (`idPosisi`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posisi`
--

LOCK TABLES `posisi` WRITE;
/*!40000 ALTER TABLE `posisi` DISABLE KEYS */;
INSERT INTO `posisi` VALUES (1,'Admin'),(2,'Staff');
/*!40000 ALTER TABLE `posisi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `idData` varchar(100) NOT NULL,
  `id` varchar(100) NOT NULL,
  `noPol` varchar(50) NOT NULL,
  `idJenis` int(10) NOT NULL,
  `tglJamMasuk` varchar(50) NOT NULL DEFAULT 'current_timestamp(6)',
  `tglJamKeluar` varchar(50) NOT NULL,
  `biayaParkir` double NOT NULL,
  `idDenda` int(10) NOT NULL,
  `namaStaff` varchar(50) NOT NULL,
  `nominal` double NOT NULL,
  PRIMARY KEY (`idData`),
  KEY `FK_TicketDenda` (`idDenda`),
  CONSTRAINT `FK_TicketDenda` FOREIGN KEY (`idDenda`) REFERENCES `denda` (`idDenda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES ('02aae175-058c-4d48-8823-d8b868df749e','MEMBER-008','AD 7870 BNN',2,'2021-03-25 20:44:48','2021-03-26 00:50:27',17000,3,'SID-038',17000),('03423e22-3648-469b-94d9-28bd0b46c150','MEMBER-008','AD 7870 BNN',2,'2021-03-25 20:42:04','-',0,3,'SID-038',0),('037855a0-ba4b-47bb-ab4c-1cfc13b024e3','MEMBER-015','T 7872 TYI',2,'2021-03-26 17:58:28','2021-03-26 18:00:26',0,1,'SID-040',50000),('05b0fe40-0224-47f2-ae4e-bbc31ff2507f','mFGnGFmyvI','A 1199 HHH',2,'2021-03-20 21:47:57','2021-03-20 21:58:02',0,3,'SID-038',0),('0636ce3d-9e95-43b9-b085-50167df04226','MEMBER-005','F 9090 MNB',1,'2021-03-26 13:15:12','2021-03-26 13:18:39',0,3,'SID-038',0),('0961c822-189f-4f1a-88c4-3e861c623c63','MEMBER-007','B 6940 VKL',1,'2021-03-21 14:36:12','2021-03-21 14:36:21',0,3,'SID-038',0),('0ce68e9f-4ba0-4a77-a674-448c1ee5609c','tkSW5hf21J','H 1111 HHH',1,'2021-03-18 14:55:00','2021-03-19 15:08:22',0,3,'SID-038',0),('0e00e3b7-4167-4dea-9b7b-f1cd9b5ce0c6','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:12:01','2021-03-26 11:17:53',2000,3,'SID-038',2000),('0fb34881-d062-485c-8b33-0c08848dc00c','h41rrAkz2k','U 8888 QWQ',1,'2021-03-20 00:20:12','2021-03-20 00:20:42',0,3,'SID-038',0),('10aea7b3-b144-4690-aea4-9e2d7ac3329d','MEMBER-008','AD 7870 BNN',2,'2021-03-21 21:38:45','2021-03-22 10:07:51',0,3,'SID-038',0),('10cdb006-65d4-4f2a-b84f-83424775a32e','Pslk2vkm3R','AE 4546 NIO',1,'2021-03-22 15:23:08','2021-03-22 15:23:54',0,2,'SID-038',25000),('1361ff54-e2bc-4efe-b765-36ccb9592ef9','izL5CKv5ha','L 9095 LLL',1,'2021-03-22 23:59:00','-',0,3,'SID-038',0),('1788e6ba-840c-4a81-9d7e-5077bdf6102e','eHDjFkLPlA','Z 9999 OOO',1,'2021-03-20 00:06:05','2021-03-20 00:13:28',0,3,'SID-038',0),('1dd763b1-f0a4-4bcf-97c6-815fa934a772','B864h7e7B7','A 6888 III',1,'2021-03-21 21:36:52','2021-03-22 10:06:18',0,3,'SID-038',0),('1f7adeda-ca72-4168-a01e-dacdb348307d','MEMBER-005','F 9090 MNB',1,'2021-03-26 13:19:39','2021-03-26 13:24:20',0,3,'SID-038',0),('20e85c9e-31e9-4024-ac00-6f4d1ed6d1ff','MEMBER-013','T 7877 YUU',2,'2021-03-26 10:55:17','-',0,3,'SID-038',0),('221df547-3268-4075-b0a2-db8acea76818','pIrI9Ytz6h','G 6157 OIO',1,'2021-03-24 15:31:34','2021-03-24 15:33:01',0,2,'SID-038',25000),('225294a1-65f1-4c6e-9990-7809b2badb76','yd4jYHqeoq','T 7777 IUY',1,'2021-03-19 17:38:01','2021-03-19 18:11:56',0,3,'SID-038',0),('2257f1e6-735c-4384-8845-0b4effcc6cb8','J8qjRBeKtC','AE 6666 HGG',1,'2021-03-20 10:57:48','2021-03-20 19:46:59',0,3,'SID-038',0),('234b1471-7499-4c80-9067-44ec8c29697e','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:29:41','2021-03-26 13:15:02',3000,3,'SID-038',3000),('243e9b07-e4fb-4761-a6e7-7c334e9a514e','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:02:01','2021-03-26 11:04:26',0,3,'SID-038',0),('25981252-30db-476a-a37f-8d77137153ef','kpzpkcaAA4','F 2562 FUC',1,'2021-03-23 11:54:54','2021-03-23 11:55:18',0,3,'SID-038',0),('2a373c78-4302-4ef0-8db0-c7599eb76583','XDv0ZotwFt','U 6668 UUU',1,'2021-03-19 23:52:01','2021-03-20 00:03:30',0,3,'SID-038',0),('2a5969d7-f6af-4a7f-87ed-8193156a0e79','MEMBER-005','F 9090 MNB',1,'2021-03-26 13:24:30','2021-03-26 13:25:39',0,3,'SID-038',0),('2ccbce37-b294-4c4b-aa9c-61d47364b907','MEMBER-005','F 9090 MNB',1,'2021-03-21 21:09:37','2021-03-21 22:10:19',3000,3,'SID-038',3000),('31a11b16-8058-4ce4-b0d7-ccbcbd96d26f','epIQW2ThlJ','H 6666 TTT',2,'2021-03-18 14:14:22','2021-03-19 17:34:41',0,3,'SID-038',0),('337e9e85-df66-4138-8413-3740c545503a','pxLosq0A0X','A 8187 AAA',2,'2021-03-24 15:33:39','2021-03-24 15:34:04',0,3,'SID-038',0),('38d061e7-f053-4d65-9535-6ab354f8b609','RDdk5Z4EBJ','V 3333 KKK',1,'2021-03-24 13:11:09','2021-03-24 13:17:51',2000,2,'SID-038',27000),('3b0d8f9f-b441-4cc5-a5ea-20359fbeae3a','YuP44ml15C','A 1111 VKL',1,'2021-03-20 00:17:40','2021-03-20 00:18:04',0,3,'SID-038',0),('3d113653-35b3-48d0-b65f-b63be2b515ea','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:05:53','2021-03-26 11:06:40',0,3,'SID-038',0),('3e1e96cc-123e-451c-8a7b-68c24240b611','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:09:31','2021-03-26 11:10:56',0,3,'SID-038',0),('42c49edb-db87-497b-bd0f-86090bca31dc','4XDavYQBHZ','-',0,'2021-03-21 00:50:49','-',0,3,'SID-038',0),('43d367de-79cd-42f0-9215-640537b3732f','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:11:05','2021-03-26 11:11:51',0,3,'SID-038',0),('4424b31d-48d9-4bde-a1b4-d6d560d59074','MEMBER-007','B 6940 VKL',1,'2021-03-21 14:34:07','2021-03-21 14:34:22',0,3,'SID-038',0),('489dc448-0d85-4c7c-b901-4841d3d3dc31','YwkHylFky0','G 7773 MPO',1,'2021-03-26 00:55:45','-',0,3,'SID-038',0),('49e04eca-6200-40b2-a4c2-07257a511a7b','fdLsN1guRJ','M 2070 MOM',1,'2021-03-25 16:53:45','-',0,3,'SID-038',0),('4cb30ceb-0444-4c31-8965-31711fd36ce7','GDMxoYGUQn','O 9999 JJJ',1,'2021-03-20 00:29:58','2021-03-20 00:35:57',0,3,'SID-038',0),('4cbdeb3e-9cef-409a-94af-3a2d0b951acc','edRXKcleoj','-',0,'2021-03-21 00:50:53','-',0,3,'SID-038',0),('4d3f4c68-59f8-4a29-8f89-2951c3952e59','wTLxkPhMGa','K 8585 KUY',1,'2021-03-22 13:18:11','2021-03-22 13:18:32',0,3,'SID-038',0),('4d82dda6-e090-477b-ac33-bcb76dc1c42b','MEMBER-005','F 9090 MNB',1,'2021-03-26 10:59:44','2021-03-26 11:01:50',0,3,'SID-038',0),('4de86e90-271a-4b87-b3c6-29fc2047f92e','LIhGrVdcLN','D 4544 REO',1,'2021-03-22 15:45:18','2021-03-22 15:45:36',0,2,'SID-038',25000),('4fe5a196-9a73-4fa7-83d1-101d4879fefa','u0CHXG953y','B 8237 NBN',2,'2021-03-21 00:50:46','2021-03-21 00:55:54',5000,3,'SID-038',5000),('512d51f7-0907-4c2b-a857-ae77a9e2456a','7V01mhRer3','O 1256 GGG',1,'2021-03-20 00:42:07','2021-03-20 10:31:22',0,3,'SID-038',0),('54b155eb-c41e-422f-a5e6-0e8ea6a34014','L4LwhSHBm5','H 1213 JKL',1,'2021-03-22 15:03:25','2021-03-22 15:03:43',0,2,'SID-038',25000),('57ac80f9-2c95-4c86-b189-97f0fd873bd3','1yKiJ32N1p','BE 1231 NJO',1,'2021-03-21 01:02:10','2021-03-21 14:39:16',15000,3,'SID-038',15000),('582b3cf1-5981-4125-94ff-287fdb17b63a','EtFSlL6y9v','A 8888 EER',1,'2021-03-18 14:15:47','2021-03-19 14:11:28',0,3,'SID-038',0),('58890123-9d0b-4eb5-bbcd-aa3cfb51fb89','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:18:05','2021-03-26 11:18:54',0,3,'SID-038',0),('5a7ea12a-f534-48d5-a326-efb1214a2516','yz3LthBGPP','-',0,'2021-03-21 00:50:56','-',0,3,'SID-038',0),('5ade4bc0-6c47-4383-b68d-61815bf63feb','MEMBER-010','F 1212 GHI',1,'2021-03-22 15:56:19','2021-03-22 15:56:38',0,1,'SID-038',50000),('5b601c51-584a-4db1-8fe3-93bd071114cf','MEMBER-011','B 6366 OOE',2,'2021-03-26 10:38:18','-',0,3,'SID-038',0),('5e744d74-b220-4274-ab1a-b941c25d0bd1','MEMBER-005','F 9090 MNB',1,'2021-03-26 13:18:51','2021-03-26 13:19:29',0,3,'SID-038',0),('60f8c3fc-b26f-4cfb-90a9-0e8070e249b9','MEMBER-007','B 6940 VKL',1,'2021-03-21 14:25:25','2021-03-21 14:25:37',0,3,'SID-038',0),('614283cb-d702-45c4-8383-64025488760c','hFDwJCdqJx','U 7777 JJK',2,'2021-03-20 21:58:36','2021-03-20 21:58:59',0,3,'SID-038',0),('64ef627a-fbad-486c-9791-24de38dbcee9','MEMBER-014','T 2020 YUI',1,'2021-03-26 10:57:12','-',0,3,'SID-038',0),('65b8f613-cf64-45ef-b79c-0a4a35e26fa6','ENh52n7zLT','-',0,'2021-03-21 01:02:07','-',0,3,'SID-038',0),('660120ff-0984-4080-9691-08986ffc8d1a','MEMBER-009','D 3434 MMI',1,'2021-03-18 17:18:34','2021-03-21 12:07:56',68000,3,'SID-038',68000),('691889d2-4c3a-46dc-b037-30bf4abb2bc1','d3WQTFP79T','K 1648 QQQ',1,'2021-03-23 14:03:11','-',0,3,'SID-038',0),('717ac3ca-24a1-4a7f-9371-b8da2bfc6053','LuBiXRye7j','A 1777 VVV',1,'2021-03-21 00:59:23','2021-03-21 01:02:51',0,3,'SID-038',0),('759b6a1a-9445-44ac-98d1-bdfa6f76deb7','bnYNL7pJee','AE 1100 UIO',1,'2021-03-22 13:17:11','2021-03-22 13:17:34',0,3,'SID-038',0),('75b9236e-37be-49da-9077-b3fa2a597f91','6wF4f7pWwT','O 1919 KJL',2,'2021-03-20 22:56:37','2021-03-21 00:48:18',8000,3,'SID-038',8000),('793808ca-83b2-4fba-8635-9c90fdef2564','MEMBER-014','T 2020 YUI',1,'2021-03-21 12:10:49','2021-03-21 12:11:14',0,3,'SID-038',0),('7bd40a1a-ebda-45c9-afa5-76be145f40e4','xaRI5Zh9NX','P 8889 NMM',1,'2021-03-21 00:58:16','2021-03-21 00:58:51',0,3,'SID-038',0),('7cacb8fd-4779-4e2c-a57c-fa2cf1c6e696','7RWnIjqXAq','B 5353 JJJ',2,'2021-03-20 22:09:56','2021-03-20 22:36:33',5000,3,'SID-038',5000),('7e426c84-76b5-4add-a176-710da7c952ad','izLu6usgVB','H 3333 MDO',2,'2021-03-25 09:03:40','2021-03-25 10:57:41',8000,2,'SID-038',33000),('81a93169-a3cd-48d0-ab4e-2c869dbc02e0','MEMBER-014','T 2020 YUI',1,'2021-03-24 21:55:14','2021-03-24 22:04:57',2000,1,'SID-038',52000),('824db6a6-5c90-4b9e-8616-b6f60a9eb8c3','K0dptQW4sZ','AD 9121 SDS',1,'2021-03-22 14:51:26','2021-03-22 14:52:00',0,2,'SID-038',25000),('8661c894-41a8-4d6c-9bea-95a810699a98','aLfDWXvMAT','AE 5351 DDS',1,'2021-03-18 14:37:50','2021-03-19 14:10:42',0,3,'SID-038',0),('8b982d0b-844b-415b-b88a-cc6457c510c7','uxWd2F1YXm','E 9891 KLO',1,'2021-03-22 16:55:33','2021-03-22 16:55:53',0,2,'SID-038',25000),('8dee82c0-90a5-4312-9216-5e9803d3a806','t8B9bkFOca','B 8816 JAM',1,'2021-03-22 13:05:40','2021-03-22 13:06:51',0,3,'SID-038',0),('9285efff-0e21-42aa-bb49-e30823791418','XzfUtpdPjk','C 4113 TTY',1,'2021-03-20 21:42:49','2021-03-20 21:43:12',0,3,'SID-038',0),('97307dba-c53f-4684-9a8f-ee30082fc76c','MEMBER-009','D 3434 MMI',1,'2021-03-26 10:37:35','-',0,3,'SID-038',0),('98373b58-3ba0-4112-ad3f-ac02e9614ce5','Ofp1mxp3GM','M 7777 MMM',2,'2021-03-20 22:25:22','2021-03-21 00:41:26',0,3,'SID-038',0),('998c6fc5-2c11-4864-9913-1242516a01d2','w8L3l24h1a','A 1111 UIU',1,'2021-03-21 01:02:13','2021-03-21 14:19:41',15000,3,'SID-038',15000),('9be72732-362a-4711-b940-804c27a49192','Ije5ogAmnW','B 8980 EEE',1,'2021-03-23 10:52:39','2021-03-23 10:53:02',0,2,'SID-038',25000),('a1923695-6ec8-4dba-a884-cb8ff17ce020','EU9ygVbTXV','F 2526 SSD',1,'2021-03-19 17:37:01','2021-03-19 17:37:30',0,3,'SID-038',0),('a84c642f-9429-4858-99d8-a08c174b8d45','MEMBER-005','F 9090 MNB',1,'2021-03-26 10:40:00','2021-03-26 10:59:34',2000,3,'SID-038',2000),('a8b42a30-14df-4158-a775-597fdebc3f2d','MEMBER-008','AD 7870 BNN',2,'2021-03-18 17:19:28','2021-03-18 23:31:15',0,3,'SID-038',0),('aba9ddc3-d30b-4a51-b6d8-e9bdf69b83f2','YmjqNavNWk','O 1090 FGJ',1,'2021-03-21 21:33:53','2021-03-21 22:10:39',2000,3,'SID-038',2000),('acb7497e-4320-499d-9a92-6604b0e46581','MEMBER-007','B 6940 VKL',1,'2021-03-18 14:16:02','2021-03-21 14:24:33',74000,3,'SID-038',74000),('ae08d7bf-e0d3-47b5-b2d3-922ed2f0c9e1','mLdoGsgPZl','G 5555 III',2,'2021-03-18 14:54:51','2021-03-19 13:40:23',0,3,'SID-038',0),('b162a4cd-4159-4503-8f38-bfaa3b61c883','MEMBER-007','B 6940 VKL',1,'2021-03-26 10:40:50','-',0,3,'SID-038',0),('b3c69ce4-ba64-45a9-bc00-2ee8a2639499','7IInSiP6aR','B 7777 GGG',1,'2021-03-22 12:57:30','2021-03-22 12:57:52',0,3,'SID-038',0),('b669b550-16c9-49dc-9b17-2d359d9703cc','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:19:07','2021-03-26 11:24:17',2000,3,'SID-038',2000),('b94d296d-3851-42fd-adfe-c8380dd9678e','lL4VkGpqFL','H 2021 HHH',2,'2021-03-21 21:28:45','2021-03-21 22:09:19',5000,3,'SID-038',5000),('b97c6d8a-0a4d-40ab-92a5-5738f4a21b25','fNHNYW1lJU','-',0,'2021-03-18 17:09:16','2021-03-18 23:48:06',0,3,'SID-038',0),('beae6f32-ae7d-484c-9b16-636d24ba5feb','iLsyYCnPEG','A 1234 BIB',1,'2021-03-22 15:52:08','2021-03-22 15:52:19',0,2,'SID-038',25000),('c0cf5a8d-0ef4-42cf-b050-53ec85b555a3','rbWolAlzNm','B 3333 YYY',2,'2021-03-22 10:42:09','2021-03-22 10:42:31',0,3,'SID-038',0),('d01ca43f-cb39-4ffb-95e8-243ba9083de8','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:24:46','2021-03-26 11:29:29',0,3,'SID-038',0),('d2108f24-6eb1-4857-9333-44811896e5f8','oBPyrC8CLU','A 7878 IUO',1,'2021-03-22 22:22:11','2021-03-22 22:22:26',0,2,'SID-038',25000),('d82809b1-7a39-4ef2-8ef3-25662eb7a73c','MEMBER-006','AB 1234 BVC',1,'2021-03-26 10:42:53','-',0,3,'SID-038',0),('dbd6e7e3-fd71-4499-bb94-ddadd0ba8003','758TFCvSKb','B 4166 YYY',1,'2021-03-21 21:34:51','2021-03-21 22:12:18',2000,3,'SID-038',2000),('dc045259-340b-4259-ad11-24d23f2d6f9e','JXkGmcd03m','BH 6761 NMN',1,'2021-03-22 15:54:16','2021-03-22 15:54:32',0,2,'SID-038',25000),('dfea8163-65b3-488e-8a88-c686d66692d9','xqm4xu7iIN','H 8981 JKL',1,'2021-03-22 14:58:35','2021-03-22 14:59:25',0,2,'SID-038',25000),('e17fa694-fdb2-4711-9946-8a406942b572','JoEafCl7kS','H 7870 RCT',2,'2021-03-24 09:21:31','2021-03-24 10:57:05',8000,3,'SID-038',8000),('e1e523ab-d603-41b5-98ee-16098f81daad','MEMBER-005','F 9090 MNB',1,'2021-03-26 11:04:37','2021-03-26 11:05:43',0,3,'SID-038',0),('e6406a43-869f-40db-a7dc-de789807e013','NEGbJHBXwa','H 6666 JOK',1,'2021-03-23 13:50:10','2021-03-23 13:50:38',0,2,'SID-038',25000),('e755a991-52b4-4fdc-ac5d-6ebfbeeeb15f','MEMBER-014','T 2020 YUI',1,'2021-03-18 17:08:38','2021-03-21 12:05:07',68000,3,'SID-038',68000),('eb721578-b217-46c0-976c-581b40a142d2','MEMBER-010','F 1212 GHI',1,'2021-03-26 01:04:38','-',0,3,'SID-038',0),('ee8773ce-d9a8-4230-a199-2abee5d06a9e','5JvTvjRrwx','A 2023 UUU',1,'2021-03-22 15:51:07','2021-03-22 15:51:18',0,2,'SID-038',25000),('ef39488e-48fa-4a74-a336-3aba1ec87ba5','gbVqneMjoF','A 8128 YUU',1,'2021-03-18 14:15:38','2021-03-19 13:45:32',0,3,'SID-038',0),('eff844b7-60f2-4220-8814-14fe707bf35c','jwSmTT7WxF','B 6122 WER',1,'2021-03-21 20:41:12','2021-03-21 21:57:28',0,3,'Afif',0),('f10ec13f-7b55-4a38-a0cd-d0e646c311c4','MEMBER-008','AD 7870 BNN',2,'2021-03-26 00:50:38','-',0,3,'SID-038',0),('f2dddbee-c9e8-4ca0-a0d9-dca1e28a311e','YHZhWfnBtC','D 1234 WWW',2,'2021-03-18 14:15:27','2021-03-19 14:50:19',0,3,'SID-038',0),('f30f7024-c4d2-4b90-99f2-4d5c44f55ed4','PK8USrZ8hY','A 9999 BBB',1,'2021-03-20 22:10:03','2021-03-21 00:36:14',0,3,'SID-038',0),('f42a2561-042a-472a-8514-a2777673a4fd','MEMBER-005','F 9090 MNB',1,'2021-03-26 13:25:48','-',0,3,'SID-038',0),('f88eeb7f-037f-45c1-9912-9f526346b451','9mQyoF9VuP','B 8888 BBK',1,'2021-03-20 21:59:48','2021-03-20 22:18:18',0,3,'SID-038',0),('f96ac63c-e726-4fd0-9fe8-60f255e88568','30YsvsDaag','A 9091 QWE',1,'2021-03-22 14:08:00','2021-03-22 14:11:53',0,2,'SID-038',25000),('faf7382a-0829-4bb3-add4-a040054df19d','J0fUXLqiN7','O 1567 GHG',1,'2021-03-19 15:19:16','2021-03-19 15:20:40',0,3,'SID-038',0),('fb1fe8eb-4ea9-4beb-b26d-70867fab1910','MEMBER-009','D 3434 MMI',1,'2021-03-21 20:47:10','2021-03-21 21:57:47',0,3,'Afif',0),('fc130043-5a4c-43e1-bfe6-accd3ace280d','lWvesn2pA1','BM 8980 TTR',2,'2021-03-22 15:20:48','2021-03-22 15:21:11',0,2,'SID-038',25000),('fdb00af1-a95f-4c8d-a4c9-bddc0bde0f76','MEMBER-009','D 3434 MMI',1,'2021-03-22 12:58:27','2021-03-22 12:58:39',0,3,'SID-038',0),('ff22cd7c-bdfe-4f5d-8eaa-2231513b0f5e','7FczcZaPZR','-',0,'2021-03-21 01:02:04','-',0,3,'SID-038',0);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `idUser` varchar(50) NOT NULL,
  `namaUser` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `tglRegister` varchar(50) NOT NULL,
  `idPosisi` int(5) NOT NULL,
  PRIMARY KEY (`idUser`),
  KEY `FK_UserPosisi` (`idPosisi`),
  CONSTRAINT `FK_UserPosisi` FOREIGN KEY (`idPosisi`) REFERENCES `posisi` (`idPosisi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('SID-001','Alif Yudha Syahputra','alif.yudhasyahputra@gmail.com','alsyahtt15','$2a$10$At7lIiLbN.DFarJWwhSV7uvd1EljEou/2Mc.aStFp8DVus.uMY35O','Villa Mutiara Gading, F 11/12, Tarumajaya, Bekasi Utara, Jawa Barat',1,'Thu Mar 04 10:12:27 ICT 2021',1),('SID-003','Agus Harimurti','agus@gmail.com','agushari','$2a$10$G3V3.qcgnsLVRzTIXWKKwuJ/elS/JBp9tEPeBoWA3hK4SowwX7v0O','bekasi',0,'Thu Mar 04 11:28:36 ICT 2021',2),('SID-005','Siamang','siamang@gmail.com','siamangdn','$2a$10$6I0UdCSV3Q.40Xx/t3b.QueaOiTuMXoJxa20xUALH7Mnl1ZeIaPme','bekasi',0,'Thu Mar 04 13:45:47 ICT 2021',2),('SID-006','Budi Sudarsono','budi@gmail.com','budi56','$2a$10$zBW4RF7rCAK43NUEclyOAOqmnO5x.ceT8M0y2AjBVZA2/G4YN2hCu','Bekasi raya',0,'Mon Mar 08 13:15:13 ICT 2021',2),('SID-008','Husen','husan@gmail.com','husen76','$2a$10$.Ph9iYGLK6VaL33uYeeul.u/mEXVi0E06YedcxIEez6/1x8cgLuWy','Bekasi',0,'Mon Mar 08 13:32:50 ICT 2021',2),('SID-010','Habibah','habibah@gmail.com','habibigendut15','$2a$10$9UaPAK5bfIvVKoHArpHXluyIflLvW3fNB0IC7yfx21U1yQZxqzt86','Depok bahagia',1,'Mon Mar 08 15:28:37 ICT 2021',2),('SID-011','Afif','afif@gmail.com','afif20','$2a$10$s0v3THT5EmczX2n1fDjVb.V.jlG4cL9wId2.Rk8SwspGEy//KGIsa','Bekasi Jatiasih',1,'Mon Mar 08 15:29:54 ICT 2021',2),('SID-013','Salsabila Fairuza','salsa@gmail.com','salsa88','$2a$10$J6WSFbPJPttH.5i0Wc4v9O1ev.3NlGMUpzgY2HfEM3FfEEy9XKvFa','Larangan Utara',0,'Mon Mar 08 22:13:26 ICT 2021',2),('SID-014','Kristanto','kriss@gmail.com','kriss90','$2a$10$Di/MKLm4Y0AJsj.RfU/XpuD26ZVjlItv/q9aXEyAuJHV8zYNq8gTK','bekasi',0,'Mon Mar 08 22:49:21 ICT 2021',2),('SID-017','Iqbal Daulah','iqbal@gmail.com','iqbal88','$2a$10$2SvF/juZPb7BIreIZm43QOEbki2a4pQOiZeeOZ2aYJ2t0VvTnjx0.','Bekasi timur',0,'Tue Mar 09 22:20:31 ICT 2021',2),('SID-018','Usman bin Husen','usman@gmail.com','usman12','$2a$10$LkqojSXPC1q1jH3lRLGgJe62HW9lN0jNYwvpOBBIxseEzbXBFFv5a','Jambi Utara',0,'Thu Mar 11 14:43:42 ICT 2021',2),('SID-020','Ibnu Prayudha B','ibnu@gmail.com','ibnu123','$2a$10$NSHYHp991WrAk/zZoAvIl.cbUQIOk.P5xoESjTxezV7L2P1.9Dgu.','Villa Mutiara Bekasi',0,'Thu Mar 11 14:57:57 ICT 2021',2),('SID-021','Uhamka','uham@gmail.com','uham123','$2a$10$G1cH5gXoifqAd1fnVnhR3.mDO1tdRKkCNh6/N4ozr9qIKDnuRHnD6','Vendera Utara',0,'Thu Mar 11 15:01:38 ICT 2021',2),('SID-022','Purnama','purnama@gmail.com','purnama124','$2a$10$dwj4zA7UtT1RDdcScoBYGOvd50mnMsUtzOeWNowjwKQIYOGuxlbQm','Hutan',0,'Thu Mar 11 16:27:20 ICT 2021',2),('SID-023','Imam Nachrowi','imam@gmail.com','imam99','$2a$10$qXp2SckG3jnWkJ77rzNCaeTn8jiRnb216VT/LoVQFUMbmM4Bvumny','Jawa Barat di tempat',0,'Fri Mar 12 10:48:58 ICT 2021',2),('SID-024','Leo Hapsari','leo@gmail.com','leo','$2a$10$4BD4YQx4/fv9xAP2rpQWr..1qiIhkYB4GNGiS1/Uc7mcrLIPk.hGu','Jambi',0,'Fri Mar 12 10:51:11 ICT 2021',2),('SID-025','Nandaningsih','nanda@gmail.com','nanda99','$2a$10$T6XEVuXVi9u85ewD/N1oQ.4uczW.yj9Rla88o1V0Zc82urna8ucv.','Gang Mangga',1,'Fri Mar 12 14:00:57 ICT 2021',2),('SID-026','Handian','handian@gmail.com','handian88','$2a$10$0FdPcG1pHXo4ADU7a/VIReNXVaoxUT8bY8HzKExj0pQ2ETscT/jTK','Malang',1,'Fri Mar 12 14:34:14 ICT 2021',2),('SID-027','Usamah','usamah@gmail.com','usamah88','$2a$10$d0EH0UDDcHIjHfIH5kcevecDRqxxLPndkM6EyXjDrMaBN3eJ4DZy6','Serpong',0,'Fri Mar 12 14:36:19 ICT 2021',2),('SID-028','Muhammad','muh@gmail.com','muh15','$2a$10$vJwQELXQqaDG4ADouT7NTuMqeUuzL.VAWx51.TQUQfnESPIixWxwi','Kel',1,'Fri Mar 12 15:36:49 ICT 2021',2),('SID-029','Bibahbibah','bibah@gmail.com','bibah','$2a$10$TH14xRTchbZuS8t7MptV1Oq7DjFLctohui0jBKdvg9YwkPpP.D93C','Kalimantan',1,'Fri Mar 12 16:19:47 ICT 2021',2),('SID-030','Zidan Al Karomi','zidan@gmail.com','zidan15','$2a$10$onXPXQLjtm.WTwjWBI2r0uAirEhcdyTly.7fGB/wspWBs5JmdtE/e','Villa Mutiara Gading',0,'Fri Mar 12 22:40:25 ICT 2021',2),('SID-031','Maimunah','maimunah@gmail.com','maimunah15','$2a$10$/jxWNpVJDuMsLh9YLVQ.S.YH5QVRtd7ghenIYj0M0sTSw6OTwKV5G','Jambi Selatan',1,'Fri Mar 12 23:28:39 ICT 2021',2),('SID-032','Ilham Samudera','ilham@gmail.com','ilham15','$2a$10$PzknoTk50bulH0BzXpq7OOc12XRHMkbVUWX6YtHgSJFE9WrNKV6S2','Kalimantan Timur',1,'Sat Mar 13 17:50:05 ICT 2021',2),('SID-034','Sanusi','sanusi@gmail.com','sanusi15','$2a$10$/CBv9xGSjd132kXj9Yj51.5FbA1QX1w5TGlmBMwTNOsqoLLu4Qj.e','Bunaken',1,'Sun Mar 14 02:19:02 ICT 2021',2),('SID-035','Agus Kurniadi','agus@gmail.com','agus15','$2a$10$qRctLb2Op.B3t4ByZ2iPFONTMkrB6GET8Cj7hLNqkvqst7HieYGVq','Bekasi Selatan (Tambun)',1,'Sun Mar 14 14:32:53 ICT 2021',2),('SID-036','Budi Narogong','budi@gmail.com','budi15','$2a$10$j8dUIGrra1HIwG8F2KeJ7OQo2nMVtgh5C1BLL6aORFkJhtgxrQyb6','Jakarta timur',1,'Sun Mar 14 16:36:55 ICT 2021',2),('SID-037','Nexsoft Admin','nexsoft@gmail.com','nexsoft15','$2a$10$ndh9sPc7SybAwGVgoZtxbehfywKbi9NfZi3IVcqae0AH3q/sjz07C','Tangerang, Serpong',1,'Tue Mar 16 20:00:53 ICT 2021',1),('SID-038','Mc. Samsu','samsu@gmail.com','samsu15','$2a$10$JmrzJd4j097ub/KjxK6/au3Ld7HJK82eQPDhvI.FmdzAIIOJLt41C','Bandung, Narogong',1,'Tue Mar 16 23:46:39 ICT 2021',2),('SID-039','Edi Prabowo','edi@gmail.com','edi15','$2a$10$DTm7GDm6TgS7qSWpTtDDPOHmo29i2dBgJ/igz9viIAPPxSjMz1G.2','Depok Bersahabat',0,'Wed Mar 17 01:54:00 ICT 2021',2),('SID-040','Udin Marhamni','udin@gmail.com','udin1515','$2a$10$KTzlOWkyEr39.m.K7t1OT.pxlpYK0xpmSz7fPspGL683Saxic8LF.','Kecamatan Jati Asih Tarumanegara',1,'Fri Mar 26 17:10:21 ICT 2021',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-26 21:21:56
