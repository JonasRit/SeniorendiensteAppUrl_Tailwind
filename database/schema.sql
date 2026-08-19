CREATE DATABASE IF NOT EXISTS seniorendienst;
USE seniorendienst;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rolle ENUM('admin', 'mitarbeiter', 'angehoeriger') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pflegebeduerftige (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vorname VARCHAR(50) NOT NULL,
    nachname VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE angehoerige_pflegebeduerftige (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pflegebeduerftiger_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pflegebeduerftiger_id) REFERENCES pflegebeduerftige(id) ON DELETE CASCADE,
    UNIQUE KEY unique_zuordnung (user_id, pflegebeduerftiger_id)
);

CREATE TABLE rechnungen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pflegebeduerftiger_id INT NOT NULL,
    dateiname VARCHAR(255) NOT NULL,
    dateipfad VARCHAR(500) NOT NULL,
    zeitraum VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pflegebeduerftiger_id) REFERENCES pflegebeduerftige(id) ON DELETE CASCADE
);

CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    erstellt_von INT NOT NULL,
    titel VARCHAR(255) NOT NULL,
    inhalt TEXT NOT NULL,
    bild_pfad VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (erstellt_von) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE speiseplaene (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hochgeladen_von INT NOT NULL,
    dateiname VARCHAR(255) NOT NULL,
    dateipfad VARCHAR(500) NOT NULL,
    gueltig_ab DATE,
    gueltig_bis DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hochgeladen_von) REFERENCES users(id) ON DELETE CASCADE
);