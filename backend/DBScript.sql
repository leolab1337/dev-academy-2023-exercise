CREATE DATABASE helsinki_city_bike;

USE helsinki_city_bike;

CREATE TABLE Journeys (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    Departure_time TIMESTAMP DEFAULT '0000-00-00T00:00:00',
    Return_time TIMESTAMP DEFAULT '0000-00-00T00:00:00',
    Departure_station_id INT NOT NULL,
    Departure_station_name VARCHAR(50),
    Return_station_id INT NOT NULL,
    Return_station_name VARCHAR(50),
    Covered_distance_in_meters INT,
    Duration_in_sec INT
);

CREATE TABLE Stations (
    FID INT PRIMARY KEY NOT NULL,
    ID INT NOT NULL UNIQUE,
    Nimi VARCHAR(50),
    Namn VARCHAR(50),
    Name VARCHAR(50),
    Osoite VARCHAR(50),
    Address VARCHAR(50),
    Kaupunki VARCHAR(50),
    Stad VARCHAR(50),
    Operaattor VARCHAR(50),
    Kapasiteet INT,
    x FLOAT,
    y FLOAT
);
