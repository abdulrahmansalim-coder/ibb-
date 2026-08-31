-- Database Schema for Lab Management System (ABEL FTUI)

CREATE DATABASE IF NOT EXISTS lab_management_system;
USE lab_management_system;

-- Drop old tables if needed to recreate clean structure
DROP TABLE IF EXISTS admin_logbook_alat_laboran;
DROP TABLE IF EXISTS admin_logbook_alat_kepala_lab;
DROP TABLE IF EXISTS admin_logbook_lab_laboran;
DROP TABLE IF EXISTS admin_logbook_lab_kepala_lab;
DROP TABLE IF EXISTS data_logbook_alat_user;
DROP TABLE IF EXISTS data_logbook_lab_user;
DROP TABLE IF EXISTS sub_lab_alat;
DROP TABLE IF EXISTS sub_lab_lab;
DROP TABLE IF EXISTS account_research;
DROP TABLE IF EXISTS account_laboran;
DROP TABLE IF EXISTS account_kepala_lab;

-- 1. Table account_research (Researcher / Peneliti / Mahasiswa)
CREATE TABLE account_research (
    id_account_researcher INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    category VARCHAR(50) DEFAULT 'researcher',
    institusi_departemen VARCHAR(150) NULL,
    nim_atau_nik VARCHAR(50) NULL,
    prodi VARCHAR(100) NULL,
    phone VARCHAR(30) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Table account_laboran (Admin Laboran)
CREATE TABLE account_laboran (
    id_account_laboran INT AUTO_INCREMENT PRIMARY KEY,
    nama_lengkap VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'laboran',
    institusi_departemen VARCHAR(150) DEFAULT 'Laboratorium ABEL FTUI',
    nip_atau_nik VARCHAR(50) NULL,
    phone VARCHAR(30) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Table account_kepala_lab (Admin Kepala Lab)
CREATE TABLE account_kepala_lab (
    id_account_kepala_lab INT AUTO_INCREMENT PRIMARY KEY,
    nama_lengkap VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'kepala_lab',
    institusi_departemen VARCHAR(150) DEFAULT 'Laboratorium ABEL FTUI',
    nip_atau_nik VARCHAR(50) NULL,
    phone VARCHAR(30) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Table sub_lab_alat
CREATE TABLE sub_lab_alat (
    sub_lab_alat_id VARCHAR(50) PRIMARY KEY,
    nama_sub_lab VARCHAR(150) NOT NULL,
    id_kategori_sub_lab_alat VARCHAR(50) NULL,
    sub_lab_image VARCHAR(255) NULL,
    status VARCHAR(50) DEFAULT 'available',
    is_active TINYINT(1) DEFAULT 1,
    list_alt TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Table sub_lab_lab
CREATE TABLE sub_lab_lab (
    sub_lab_lab_id VARCHAR(50) PRIMARY KEY,
    nama_sub_lab VARCHAR(150) NOT NULL,
    id_kategori_sub_lab_alat VARCHAR(50) NULL,
    sub_lab_image VARCHAR(255) NULL,
    status VARCHAR(50) DEFAULT 'available',
    is_active TINYINT(1) DEFAULT 1,
    list_alt TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Table data_logbook_alat_user
CREATE TABLE data_logbook_alat_user (
    logbook_id INT AUTO_INCREMENT PRIMARY KEY,
    id_account_researcher INT NULL,
    sub_lab_alat_id VARCHAR(50) NULL,
    id_account_laboran INT NULL,
    id_account_kepala_lab INT NULL,
    nama_lengkap VARCHAR(150) NOT NULL,
    nim_atau_nik VARCHAR(50) NULL,
    institusi_departemen VARCHAR(150) NULL,
    prodi VARCHAR(100) NULL,
    periode_penggunaan_alat VARCHAR(100) NULL,
    waktu_mulai DATETIME NULL,
    waktu_selesai DATETIME NULL,
    nama_researcher VARCHAR(150) NULL,
    jenis_sample VARCHAR(150) NULL,
    jenis_pengujian VARCHAR(150) NULL,
    tujuan_pengujian TEXT NULL,
    kondisi_teknis TEXT NULL,
    paraf_student LONGTEXT NULL,
    paraf_laboran LONGTEXT NULL,
    paraf_kepala_lab LONGTEXT NULL,
    status_paraf_student VARCHAR(50) DEFAULT 'signed',
    status_paraf_laboran VARCHAR(50) DEFAULT 'pending',
    status_paraf_kepala_lab VARCHAR(50) DEFAULT 'pending',
    catatan_tambahan TEXT NULL,
    catatan_laboran TEXT NULL,
    catatan_kepala_lab TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Table data_logbook_lab_user
CREATE TABLE data_logbook_lab_user (
    logbook_lab_id INT AUTO_INCREMENT PRIMARY KEY,
    id_account_researcher INT NULL,
    sub_lab_lab_id VARCHAR(50) NULL,
    id_account_laboran INT NULL,
    id_account_kepala_lab INT NULL,
    researcher_name VARCHAR(150) NOT NULL,
    nim_atau_nik VARCHAR(50) NULL,
    institusi_atau_departemen VARCHAR(150) NULL,
    prodi VARCHAR(100) NULL,
    proyek_penelitian VARCHAR(200) NULL,
    periode_penelitian VARCHAR(100) NULL,
    waktu_mulai DATETIME NULL,
    waktu_selesai DATETIME NULL,
    detail_aktivitas VARCHAR(255) NULL,
    aktivitas_dilakukan TEXT NULL,
    identitas_researcher VARCHAR(150) NULL,
    paraf_researcher LONGTEXT NULL,
    paraf_pi LONGTEXT NULL,
    paraf_student LONGTEXT NULL,
    paraf_laboran LONGTEXT NULL,
    paraf_kepala_lab LONGTEXT NULL,
    status_paraf_researcher VARCHAR(50) DEFAULT 'signed',
    status_paraf_laboran VARCHAR(50) DEFAULT 'pending',
    status_paraf_kepala_lab VARCHAR(50) DEFAULT 'pending',
    catatan_tambahan TEXT NULL,
    catatan_laboran TEXT NULL,
    catatan_kepala_lab TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 8. Admin logbook notes & paraf tables
CREATE TABLE admin_logbook_alat_laboran (
    Id_Admin_LogBook_Alat_Laboran INT AUTO_INCREMENT PRIMARY KEY,
    logbook_id INT NULL,
    id_account_laboran INT NULL,
    Paraf LONGTEXT NULL,
    Catatan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_logbook_alat_kepala_lab (
    Id_Admin_LogBook_Alat_Kepala_Lab INT AUTO_INCREMENT PRIMARY KEY,
    logbook_id INT NULL,
    id_account_kepala_lab INT NULL,
    Paraf LONGTEXT NULL,
    Catatan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_logbook_lab_laboran (
    Id_Admin_LogBook_Lab_Laboran INT AUTO_INCREMENT PRIMARY KEY,
    logbook_lab_id INT NULL,
    id_account_laboran INT NULL,
    Paraf LONGTEXT NULL,
    Catatan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_logbook_lab_kepala_lab (
    Id_Admin_LogBook_Lab_Kepala_Lab INT AUTO_INCREMENT PRIMARY KEY,
    logbook_lab_id INT NULL,
    id_account_kepala_lab INT NULL,
    Paraf LONGTEXT NULL,
    Catatan TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);