const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
  return pool
  .query(`SELECT * FROM users WHERE users.email = $1;`, [email])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return pool
  .query(`SELECT * FROM users WHERE users.id = $1;`, [id])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  return pool
  .query(`INSERT INTO users 
          (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;`, [user.name, user.email, user.password])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;

// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool
  .query(`SELECT reservations.*, properties.*, property_reviews.rating AS average_rating
          FROM reservations 
          JOIN users ON users.id = reservations.guest_id
          JOIN properties ON properties.id = property_id
          JOIN property_reviews ON users.id = property_reviews.guest_id
          WHERE reservations.guest_id = $1
          LIMIT $2;`, [guest_id, limit])
  .then((result) => {
    console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  return pool
  .query(`SELECT properties.*, AVG(property_reviews.rating) as average_rating 
          FROM properties
          JOIN property_reviews ON properties.id = property_id
          GROUP BY properties.id
          LIMIT $1;`, [limit])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  return pool
  .query(`INSERT INTO properties(
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
            post_code
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING *;`, [
            property.owner_id, 
            property.title, 
            property.description, 
            property.thumbnail_photo_url, 
            property.cover_photo_url, 
            property.cost_per_night, 
            property.parking_spaces, 
            property.number_of_bathrooms, 
            property.number_of_bathrooms, 
            property.country, 
            property.street, 
            property.city, 
            property.province, 
            property.post_code])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addProperty = addProperty;
