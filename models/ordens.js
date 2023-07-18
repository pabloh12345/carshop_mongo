const Ordens = require('../schemas/ordens');

function getOrdensUser(email, cb) {
   
    console.log("llega a modelo",email,"modelo cb",cb);
    Ordens.find({ email: email})
    
    .then((elems) => {
        console.log("promesa existosa")
        return cb(null, elems);
    })
    .catch((error) => {
        
        console.log('Error busqueda:', error);
        return cb(error);
    })
}

function getOrdens(cb) {
    console.log("aqui en ordenes")
    Ordens.find({})
    .then((elems) => {
        
    console.log("aqui error en orden2")
        return cb(null, elems);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    })
}

function createOrdens(b, cb) {
    new Ordens(b)
    .save()
    .then((elem) => {
        return cb(null, elem);
    })
    .catch((error) => {
        console.log('Error:', error);
        return cb(error);
    });
}

function actualizaOrdens(b, cb) {
  
    return Ordens.findByIdAndUpdate(
      b._id,
      { $set: b },
      { new: true }
    )
      .then((elem) => {
        return cb(null, elem);
      })
      .catch((error) => {
        console.log('Error updating ordens:', error);
        return cb(error);
      });
  }

exports.createOrdens = createOrdens;
exports.getOrdensUser = getOrdensUser;
exports.getOrdens = getOrdens;
exports.actualizaOrdens = actualizaOrdens;
