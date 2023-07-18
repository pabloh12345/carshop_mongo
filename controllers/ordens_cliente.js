const express = require('express');
const router = express.Router();
const Ordens = require('../models/ordens');

router.patch('/', function (req, res){
    const {params} = req.body;
   console.log('Data update:', params);
    
    return Ordens.actualizaOrdens(params, (error, b) => {
        if(error){
           // console.log('error Data Ordens:');
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        res.json({ code: 'OK', message: 'Ordens Saved successfully!', data: b.toJSON()})
    });
});

router.get('/', (req, res) => {
   
  const  {params} = req.query;   
  const { imail } = req.session.usuario;

   console.log('Data Ordens1112:', imail);
   //return Ordens.getOrdens((error, elems)=> {
   return Ordens.getOrdensUser(imail,(error, elems)=> {
        console.log("dentro getordens",error,"este es elems",elems);
   
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        
       res.json(elems);
    });
});

module.exports = router;
