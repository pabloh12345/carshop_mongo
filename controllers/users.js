const express = require('express');
const router = express.Router();
const Users = require('../models/users');


router.get('/', (req, res) => {
   // const{logon}=req.query;
    //console.log("request controllers1:",logon)
    const email=req.query.imail;
    const pass=req.query.password;
    
    console.log("imail del controlles",req.query);
    
    
    return Users.getUserPass(email,(error, elems)=> {
        console.log("dentro user",error,"este es elems",elems);
   
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        if(elems) {
        const password=elems.password;
        if(password==pass) {
          console.log("password correcto",pass);

          req.session.usuario = elems.toJSON();

          res.json(elems);
        }else{
         console.log("password Incorrecto",pass);    
         return res.status(500).json({ code: 'UE', message: 'PASSWORD INCORRRECTO'})
        }

       }
    });
});


router.post('/', function (req, res){
    const {params} = req.body;
    console.log('Data:', params);
   // console.log('Data2:', params.imail);
    if( params.imail===""  || params.password==="" || params.apellidos==="" || params.nombres==="" ){
        return  res.status(500).json({ code: 'UE', message: 'Campo Email es requerido'})
    }
    return Users.createUser(params, (error, b) => {
        if(error){
            return  res.status(500).json({ code: 'UE', message: 'Unkwown error'})
        }
        res.json({ code: 'OK', message: 'Saved successfully!', data: b.toJSON()})
    });
});


module.exports = router;
