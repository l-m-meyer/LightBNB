INSERT INTO users (
    name, 
    email, 
    password
  ) 
  VALUES 
    ('Jane Doe', 'janedoe@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Pillow Case', 'huggable@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
    ('Mushy Rooms', 'mycelium@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (
    owner_id,
    title,
    description,

    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,

    country,
    street,
    city,
    province,
    post_code,

    active
  ) 
  VALUES 
    (1, 'Nothin Fancy Shacklet', 'description', 'cabin_in_woods.jpg', 'the_ground.jpg', 198, 1, 1, 1, 'USA', '13 Laura Palmer Way', 'Twin Peaks', 'Utah', 75213, TRUE),
    (2, 'Cuddle Hut', 'description', 'pillow_fort.jpg', 'feathers.jpg', 75, 2, 2, 2, 'Canada', '1313 Mockingbird Rd', 'Merrickville', 'Ontario', 'K0G 1R0', TRUE),
    (3, 'Mushroom Kingdom', 'description', 'toadstool_treehouse.jpg', 'mushrooms.jpg', 400, 2, 3, 3, 'Canada', '404 Nature Valley Rd', 'Gravenhurst', 'Ontario', 'K0M 2K0', TRUE);

INSERT INTO reservations (
  start_date,
  end_date,
  property_id,
  guest_id
  ) VALUES 
    ('2018-09-11', '2018-09-26', 3, 1),
    ('2019-01-04', '2019-02-01', 1, 2),
    ('2021-10-01', '2021-10-14', 2, 3);

INSERT INTO property_reviews (
  guest_id,
  property_id,
  reservation_id,
  rating,
  message
  ) VALUES 
    (1, 3, 4, 4, 'Brings back memories...'),
    (2, 1, 5, 2, 'Creepy.'),
    (3, 2, 6, 5, 'So cozy!');
