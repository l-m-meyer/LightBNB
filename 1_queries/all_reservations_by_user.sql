SELECT  reservations.id,
        title,
        cost_per_night,
        start_date,
        AVG(property_reviews.rating) as average_rating
  FROM property_reviews
  JOIN properties ON properties.id = property_id
  JOIN reservations ON reservations.id = reservation_id
  JOIN users ON users.id = property_reviews.guest_id
  WHERE reservations.guest_id = 1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT 10;