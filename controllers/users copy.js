const express = require('express');
const router = express.Router();
const Users = require('../models/users');


router.get('/', (req, res) => {
    //const{logon}=req.body;
    //console.log("request controllers1:",logon)
    //const email=req.body.email
    //const pass=req.body.pass
   // console.log("email",email);
   // console.log("pass",pass);
    return Users.getUser((error, elems)=> {
        console.log("dentro user",error,"este es elems",elems);
   
        if (error) {
            return res.status(500).json({ code: 'UE', message: 'Unknown error'})
        }
        /*if(elems) {
        const password=elems.password;
        if(password==pass) {
          console.log("password correcto",pass);
          res.json(elems);
        }else{
         console.log("password Incorrecto",pass);    
         return res.status(500).json({ code: 'UE', message: 'PASSWORD INCORRRECTO'})
        }
       

       }*/
       res.json(elems);
    });
});
module.exports = router;
