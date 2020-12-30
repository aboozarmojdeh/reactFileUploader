CREATE DATABASE photomodel;

CREATE TABLE photos (
    photo_id SERIAL NOT NULL,
    model_name VARCHAR(255) NOT NULL,
    photo_path VARCHAR(255) NOT NULL
);

INSERT INTO photos (model_name,photo_path) VALUES ('Jeniffer Lopez','/uploads/image1.jpg');