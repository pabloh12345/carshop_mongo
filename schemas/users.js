const mongoose = require('mongoose');

const users = mongoose.Schema({

    imail: String,
    apellidos: String,
    nombres: String,
    password: String,
    tipo_usuario: String
});

const Users = new mongoose.model('user', users);

module.exports = Users;