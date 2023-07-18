const mongoose = require('mongoose');

const ordens = mongoose.Schema({
    nombres: String,
    placa: String,
    numero_contacto: String,
    email: String,
    tipo_id: String,
    identificacion: String,
    estado: String,
    marca: String,
    modelo: String,
    nivel_tanque: String,
    observacion: String,
    cambio_aceite: String,
    cambio_frenos: String,
    alineacion:String,
    diagnostico_general:String,
    revision_sistema: String,
    revision_suspension: String,
    fecha_agenda:String
});

const Ordens = new mongoose.model('orden', ordens);

module.exports = Ordens;