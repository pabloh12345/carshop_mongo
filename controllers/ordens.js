const express = require('express');
const router = express.Router();
const Ordens = require('../models/ordens');


router.post('/', function (req, res){
    const {params} = req.body;
   // console.log('Data Ordens:', params);
    
    return Ordens.createOrdens(params, (error, b) => {
        if(error){
           // console.log('error Data Ordens:');
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        res.json({ code: 'OK', message: 'Ordens Saved successfully!', data: b.toJSON()})
    });
});

router.get('/', (req, res) => {
   
  const  {params} = req.query;   
  
   console.log('Data Ordens1112:', params);
   //return Ordens.getOrdens((error, elems)=> {
   return Ordens.getOrdens((error, elems)=> {
        console.log("dentro getordens",error,"este es elems",elems);
   
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        
       res.json(elems);
    });
});

module.exports = router;
