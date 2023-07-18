const Users = require('../schemas/users');

function getUserPass(email, cb) {
   
    //console.log("llega a modelo",email,"modelo cb",cb);
    Users.findOne({ imail: email})
    
    .then((elems) => {
        //console.log("promesa existosa")
        return cb(null, elems);
    })
    .catch((error) => {
        
        console.log('Error busqueda: getUserPass ', error);
        return cb(error);
    })
}

function getUser(cb) {
    Users.find({})
    .then((elems) => {
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}


function createUser(b, cb) {
    new Users(b)
    .save()
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    });
}

exports.getUserPass = getUserPass;
exports.getUser = getUser;
exports.createUser = createUser;
