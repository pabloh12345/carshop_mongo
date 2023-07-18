import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './actions/usuario_actions';
import React, { useState } from 'react';
import Cliente from './cliente/Cliente';
import Admin from './admin/admin';
import axios from "axios";
import backgroundImage from './fondo_pantalla.jpg';

export default function Inicio() {

   // ingresarHandlers  
   const initialFormState = {
    id: null,
    imail: "",
    password: "",
    tipo_usuario:"",
    apellidos:"",
    nombres:"",
    tipo_usuario:"USUARIO"
  };

  const [logon, setLogin] = useState(initialFormState);
  const [creacion, setCrea] =useState(false);

  //Navegar en formularios
  const [currentStep, setCurrentStep] = useState(1);
  const handleSiguiente = () => {
      setCurrentStep(currentStep + 1);
  };
  const handleAtras = () => {
    setCurrentStep(currentStep - 1);
  };
  //---------------------------

  const handleInputChange = (event) => {
  const { name, value } = event.target;

    setLogin({ ...logon, [name]: value });
    };
   const usuario =  useSelector(state => state.usuario_red.usuario);
   const session =  useSelector(state => state.usuario_red.session);
   const dispatch = useDispatch();

   const ingresarhandler = () => {
   //console.log("hacer logon ",logon);
    return(
        axios
          .get("http://localhost:3000/users", { params: logon })
          .then((response) => {
            dispatch(login(response.data));
            //console.log('Data1:', response.data)

          }).catch((error) => {
            console.error('Error a Realizar login:', error);

          })
    )
  }; 

  const crearuserhandler = () => {
    //console.log("creando usuario ",logon);
    
     return(
         axios
           .post("http://localhost:3000/users", { params: logon })
           .then((response) => {
            setCrea(true);
             //dispatch(login(response.data));
             //console.log('Data:', response.data)
            // dispatch(login(response));
           }).catch((error) => {
             console.error('Error:', error);
 
           })
     )
   }; 
 
    return (

        <>
        {
            session===false && currentStep===1 && ( <>
            <body style={{ backgroundImage: `url(${backgroundImage})` }}>
            <form className="container">
            <p></p>
            <br></br>
            <h1>Bienvenido a Carshop</h1> 
            <hr></hr>
            <br></br>
            <h2>Email:</h2>
            <input
                type="text"
                name="imail"
                value={logon.imail}
                onChange={handleInputChange}
            />
            <br></br>
            <h2>Password:</h2>
            <input
                type="text"
                name="password"
                value={logon.password}
                onChange={handleInputChange}

             />
            <br></br>
            <br></br>
            <button  onClick={ingresarhandler} 
            >LOGIN</button>
            <br></br>
            <br></br>
            <hr></hr>
            ---No tienes cuenta? Registrate --- 
            <button  onClick={handleSiguiente}> Registrate </button>
            <br></br>
            <br></br>
            <hr></hr>
            </form>
            </body>
            </> )
            }
  {
            session===false && currentStep===2 && ( <>
             <body style={{ backgroundImage: `url(${backgroundImage})` }}>
            <form className="container">
            <p></p>
            <button  onClick={handleAtras}> Regresar a Login </button>
            <br></br>
            <h2>Ingresa tus datos</h2> 
            <hr></hr>
            Email:
            <br></br>
            <input
                type="text"
                name="imail"
                value={logon.imail}
                onChange={handleInputChange}
            />
            Nombres:
            <br></br>
            <input
                type="text"
                name="nombres"
                value={logon.nombres}
                onChange={handleInputChange}
            />
            Apellidos:
            <br></br>
            <input
                type="text"
                name="apellidos"
                value={logon.apellidos}
                onChange={handleInputChange}
            />
            Password:
            <br></br>
            <input
                type="text"
                name="password"
                value={logon.password}
                onChange={handleInputChange}
            />
            <br></br>
            <br></br>
            <button  onClick={crearuserhandler}> Registrar</button>
            {creacion && (<p>REGISTRO EXITOSO, HAS LOGIN AHORA!!</p>)} 
            <hr></hr>
            </form>
            </body>

            </> )
            }

           { session===true && usuario.tipo_usuario==="USUARIO" && <Cliente />}
           { session===true && usuario.tipo_usuario!=="USUARIO" && <Admin />}
        </>

    );

};