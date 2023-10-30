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

insert into comments (id, name, message, note, enabled)
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
values (null, 'Toyota Corolla', 15000, 2019, 'essence', 45000, 'toyota-corolla.png', '[
]', '[
  "GPS",
  "ABS",
  "Sièges chauffants"
]'),
       (null, 'Honda Civic', 14000, 2018, 'essence', 38000, 'honda-civic.webp', '[
         ]', '[
         "GPS",
         "ABS",
         "Caméra de recul"
       ]'),
       (null, 'Ford Focus', 16000, 2020, 'essence', 32000, 'ford-focus.jpg', '[
       ]', '[
         "GPS",
         "ABS",
         "Bluetooth"
       ]'),
       (null, 'Volkswagen Golf', 15500, 2019, 'essence', 40000, 'volkswagen-golf.png', '[
       ]', '[
         "GPS",
         "ABS",
         "Climatisation"
       ]'),
       (null, 'Nissan Altima', 14500, 2018, 'essence', 42000, 'nissan-altima.jpg', '[
       ]', '[
         "GPS",
         "ABS",
         "Régulateur de vitesse"
       ]');

insert into messages (id, name, firstname, address, mail, phone, subject, message, isRead)
values (null, 'Fréderic', 'Pichon', '36 rue de l\'impasses, 68000 Colmar', 'frederic.pichon@gmail.com', '0356974623', 'subject', 'message', 0),
       (null, 'Sophie', 'Lefebvre', '22 rue de la Paix, 75001 Paris', 'sophie.lefebvre@gmail.com', '0145698237', 'subject', 'message', 0),
       (null, 'Thomas', 'Durand', '10 avenue du Général de Gaulle, 69000 Lyon', 'thomas.durand@gmail.com', '0478563214', 'subject', 'message', 0),
       (null, 'Marie', 'Dubois', '45 Rue de la Liberté, 13001 Marseille', 'marie.dubois@gmail.com', '0498127536', 'subject', 'message', 0),
       (null, 'Jean', 'Martin', '8 Place de la Bourse, 33000 Bordeaux', 'jean.martin@gmail.com', '0556789123', 'subject', 'message', 0);
