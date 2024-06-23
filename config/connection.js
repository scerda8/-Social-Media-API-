const { connect, connection } = require('mongoose');

const connectionString = 'mongodb+srv://cerdashandy:bJhcLNfBKOaLE3rw@cluster0.smk5zid.mongodb.net/socialMediaAPI';

connect(connectionString);

module.exports = connection;

