const { connect, connection } = require('mongoose');

const connectionString = 'mongodb+srv://cerdashandy:bJhcLNfBKOaLE3rw@cluster0.smk5zid.mongodb.net/socialMediaAPI'
//process.env.MONGODB_URI || 'mongodb://localhost:27017/socialMediaAPI'

connect(connectionString);

module.exports = connection;
