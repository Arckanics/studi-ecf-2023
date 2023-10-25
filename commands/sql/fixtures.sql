insert into hours (id, day, begin, end)
values (null, 0, '08:30', '12:00'),
       (null, 0, '14:00', '19:00'),
       (null, 1, '08:30', '12:00'),
       (null, 1, '14:00', '19:00'),
       (null, 2, '08:30', '12:00'),
       (null, 2, '14:00', '19:00'),
       (null, 3, '08:30', '12:00'),
       (null, 3, '14:00', '19:00'),
       (null, 4, '08:30', '12:00'),
       (null, 4, '14:00', '19:00'),
       (null, 4, '08:00', '12:30'),
       (null, 4, '13:00', '17:00');

insert into comments (id, name, message, note, enable)
values (null, 'John Doe', 'Service de réparation rapide.', 8, 1),
       (null, 'Alice Smith', 'Excellent travail sur la carrosserie.', 7, 1),
       (null, 'Bob Johnson', 'Le personnel est très compétent.', 9, 1),
       (null, 'Emily Brown', 'Service client médiocre.', 3, 0),
       (null, 'Michael Wilson', 'Prix raisonnables pour l\'entretien.', 6, 1);

insert into services (id, title, text)
values (null, 'Service de réparation', 'Nous offrons un service de réparation automobile rapide et fiable.'),
       (null, 'Service de carrosserie', 'Confiez-nous la réparation de la carrosserie de votre véhicule.'),
       (null, 'Entretien préventif', 'Maintenez votre véhicule en bon état avec notre service d\'entretien préventif.'),
       (null, 'Service de peinture',
        'Donnez une nouvelle vie à votre voiture avec notre service de peinture professionnelle.'),
       (null, 'Diagnostic avancé',
        'Nos techniciens utilisent des outils de diagnostic de pointe pour résoudre les problèmes de votre voiture.');

insert into cars (id, name, price, year, fuel, km, mainPicture, gallery, options)
values (1, 'Toyota Corolla', 15000, 2019, 'Essence', 45000, 'toyota-corolla.jpg', '["image1.jpg", "image2.jpg", "image3.jpg"]', '["GPS", "ABS", "Sièges chauffants"]'),
       (2, 'Honda Civic', 14000, 2018, 'Essence', 38000, 'honda-civic.jpg', '["image4.jpg", "image5.jpg", "image6.jpg"]', '["GPS", "ABS", "Caméra de recul"]'),
       (3, 'Ford Focus', 16000, 2020, 'Essence', 32000, 'ford-focus.jpg', '["image7.jpg", "image8.jpg", "image9.jpg"]', '["GPS", "ABS", "Bluetooth"]'),
       (4, 'Volkswagen Golf', 15500, 2019, 'Essence', 40000, 'volkswagen-golf.jpg', '["image10.jpg", "image11.jpg", "image12.jpg"]', '["GPS", "ABS", "Climatisation"]'),
       (5, 'Nissan Altima', 14500, 2018, 'Essence', 42000, 'nissan-altima.jpg', '["image13.jpg", "image14.jpg", "image15.jpg"]', '["GPS", "ABS", "Régulateur de vitesse"]');
