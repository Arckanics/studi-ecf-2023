insert into hours (id, day, begin, end)
values (null, 0, '08:30', '12:00'),
       (null, 0, '14:00', '19:00'),
       (null, 1, '08:30', '12:00'),
       (null, 1, '14:00', '19:00'),
       (null, 2, '08:30', '12:00'),
       (null, 2, '14:00', '19:00'),
       (null, 3, '08:30', '12:00'),
       (null, 3, '14:00', '19:00'),
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
values (null, 'Toyota Corolla', 15000, 2019, 'Essence', 45000, 'toyota-corolla.png', '[
  "image1.jpg",
  "image2.jpg",
  "image3.jpg"
]', '[
  "GPS",
  "ABS",
  "Sièges chauffants"
]'),
       (null, 'Honda Civic', 14000, 2018, 'Essence', 38000, 'honda-civic.webp', '[
         "image4.jpg",
         "image5.jpg",
         "image6.jpg"
       ]', '[
         "GPS",
         "ABS",
         "Caméra de recul"
       ]'),
       (null, 'Ford Focus', 16000, 2020, 'Essence', 32000, 'ford-focus.jpg', '[
         "image7.jpg",
         "image8.jpg",
         "image9.jpg"
       ]', '[
         "GPS",
         "ABS",
         "Bluetooth"
       ]'),
       (null, 'Volkswagen Golf', 15500, 2019, 'Essence', 40000, 'volkswagen-golf.png', '[
         "image10.jpg",
         "image11.jpg",
         "image12.jpg"
       ]', '[
         "GPS",
         "ABS",
         "Climatisation"
       ]'),
       (null, 'Nissan Altima', 14500, 2018, 'Essence', 42000, 'nissan-altima.jpg', '[
         "image13.jpg",
         "image14.jpg",
         "image15.jpg"
       ]', '[
         "GPS",
         "ABS",
         "Régulateur de vitesse"
       ]');

insert into messages (id, name, firstname, address, mail, phone)
values (null, 'Fréderic', 'Pichon', '36 rue de l\'impasses, 68000 Colmar', 'frederic.pichon@gmail.com', '0356974623'),
       (null, 'Sophie', 'Lefebvre', '22 rue de la Paix, 75001 Paris', 'sophie.lefebvre@gmail.com', '0145698237'),
       (null, 'Thomas', 'Durand', '10 avenue du Général de Gaulle, 69000 Lyon', 'thomas.durand@gmail.com', '0478563214'),
       (null, 'Marie', 'Dubois', '45 Rue de la Liberté, 13001 Marseille', 'marie.dubois@gmail.com', '0498127536'),
       (null, 'Jean', 'Martin', '8 Place de la Bourse, 33000 Bordeaux', 'jean.martin@gmail.com', '0556789123');
