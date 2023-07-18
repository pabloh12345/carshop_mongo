//import { useSelector, useDispatch } from 'react-redux';

import React, { useEffect,useState } from 'react';
import axios from "axios";

export default function Cliente() {

     // ingresarHandlers  
     const initialFormState = {
      id: null,
      nombres:"",
      email:"",
      tipo_id:"",
      identificacion:"",
      estado:"ENVIADA",
      marca:"",
      modelo:"",
      nivel_tanque:"",
      observacion:"",
      alineacion:false,
      cambio_aceite:false,
      cambio_frenos:false,
      diagnostico_general:false,
      numero_contacto:"",
      placa:"",
      revision_sistema:false,
      revision_suspension:false
    };
  
    const [orden, setOrden] = useState(initialFormState);
    const [creacion_orden, setCreaOrden] =useState(false);
    const [tipoIdentificacion, setTipoIdentificacion] = useState("");

    const handleTipoIdentificacionChange = (event) => {
      setTipoIdentificacion(event.target.value);
    };

    const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setOrden({ ...orden, [name]: checked });
    } else {
      setOrden({ ...orden, [name]: value });
    }
      };

      //const paso = useSelector(state => state.usuario_red.paso);
      //const dispatch = useDispatch();
      const [currentStep, setCurrentStep] = useState(1);

      const handleSiguiente = () => {
          setCurrentStep(currentStep + 1);
      };
      const handleAtras = () => {
        setCurrentStep(currentStep - 1);
      };

      const handleGeneraOrden = () => {
        //console.log("hacer logon ",logon);
         return(
             axios
               .post("http://localhost:3000/ordens", { params: orden })
               .then((response) => {
                setCreaOrden(true);
                 //dispatch(login(response.data));
                 console.log('Data:', response.data)
                // dispatch(login(response));
               }).catch((error) => {
                 console.error('Error:', error);
     
               })
         )
       }; 

       /*const handleConsultaOrdens = () => {
        const [datos, setDatos] = useState([]);
         return(
             axios
               .get("http://localhost:3000/ordens", { params: logon })
               .then((response) => {
                setDatos(response.data);   
               }).catch((error) => {
                 console.error('Error a Realizar consulta:', error);
     
               })
         )
       };*/

      // const TablaDatos = () => {
        const [datos, setDatos] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get("http://localhost:3000/ordens");
              setDatos(response.data);
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchData();
        }, []);
        //}
    return (
        
        <>
        {

         //paso=="cliente" 
         currentStep===1 &&
          ( <>
          <head></head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
          <body></body>
            <h2>Datos Clientes Pantalla Principal</h2>
            <hr></hr>

            <table>
            <thead>
            <tr>
            <th>Campo 1</th>
            <th>Campo 2</th>
            {/* Agrega más encabezados de columna según tus campos */}
            </tr>
            </thead>
            <tbody>
            {datos.map((dato) => (
            <tr key={dato._id}>
            <td>{dato.nombres}</td>
            <td>{dato.identificacion}</td>
            {/* Agrega más celdas según tus campos */}
            </tr>
            ))}
            </tbody>
            </table>
                <br></br>
            <button onClick={handleSiguiente}>Siguiente</button>
            </> 
            
    )
    
    }
    {

//paso=="cliente" 
currentStep===2 &&
 ( <>
 <head></head>
 <meta charset="UTF-8"/>
 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
 <body></body>
   <h2>Datos Clientes</h2>
   <hr></hr>
   Nombres Completo:
   <br></br>
   <input type="text" name="nombres" 
       value={orden.nombres}
       onChange={handleInputChange}/>
   <br></br>
   email  :
   <br></br>
   <input type="text" 
       name="email"
       value={orden.email}
       onChange={handleInputChange}/>
   <br></br>
   Numero Contacto:
   <br></br>
   <input type="text" 
       name="numero_contacto"
       value={orden.numero_contacto}
       onChange={handleInputChange}/>
   <br></br>
   Identificacion:
   <br></br>
   <input type="text" 
       name="identificacion"
       value={orden.identificacion}
       onChange={handleInputChange}/>
   <br></br>
   <br></br>
   Tipo Identificacion:
   <select name="tipo_id" value={tipoIdentificacion} onChange={handleTipoIdentificacionChange}>
   <option value="Cedula">Cedula</option>
   <option value="Ruc">Ruc</option>
   </select>
   <hr></hr>
   <br></br>
   <button onClick={handleSiguiente}>Siguiente</button>
   </> 
   
)

}

{
    //paso=="vehiculo" 

   currentStep === 3 &&
      ( <>
        
          <h2>Informacion Vehiculo</h2>
          <hr></hr>
          Marca :
          <br></br>
          <input type="text" name="marca"
                value={orden.marca}
                onChange={handleInputChange}/>
          <br></br>
          Modelo  :
          <br></br>
          <input type="text" 
                name="modelo"
                value={orden.modelo}
                onChange={handleInputChange}/>
          <br></br>
          Placa :
          <br></br>
          <input type="text" 
                name="placa"
                value={orden.placa}
                onChange={handleInputChange}/>
          <br></br>
          Nivel Tanque :
          <br></br>
          <input type="text" 
                name="nivel_tanque"
                value={orden.nivel_tanque}
                onChange={handleInputChange}/>
          <br></br>
          Observacion Vehiculo:
          <br></br>
          <textarea id="comentario" 
          rows="5" cols="33"
          name="observacion"
          value={orden.observacion}
          onChange={handleInputChange}>
          </textarea>
          <hr></hr>
          <button onClick={handleSiguiente}>Siguiente</button>
          <button onClick={handleAtras}>Atras</button>


        </> 
        
      )

      }

    {

    //paso=="servicio" 
    currentStep===4 &&
    ( <>
      <h2>Selección de servicios:</h2>
        <hr></hr>
      <form>
        <input type="checkbox" name="cambio_aceite"
              checked={orden.cambio_aceite}
              onChange={handleInputChange}/>
        <label> Cambio de aceite</label><br></br>
        <input type="checkbox" name="cambio_frenos"
              checked={orden.cambio_frenos}
              onChange={handleInputChange}/>
        <label> Cambio de frenos</label><br></br>
        <input type="checkbox" name="alineacion"
              checked={orden.alineacion}
              onChange={handleInputChange}/>
        <label> Alineación y balanceo</label><br></br>
        <input type="checkbox" name="diagnostico_general"
              checked={orden.diagnostico_general}
              onChange={handleInputChange}/>
        <label> diagnóstico general</label><br></br>
        <input type="checkbox" name="revision_sistema"
              checked={orden.revision_sistema}
              onChange={handleInputChange}/>
        <label> revisión sistema eléctrica</label><br></br>
        <input type="checkbox" name="revision_suspension"
              checked={orden.revision_suspension}
              onChange={handleInputChange}/>
        <label> revisión de la suspensión</label>
        <br></br>
        <br></br>
        <button onClick={handleSiguiente}>Siguiente</button>
        <button onClick={handleAtras}>Atras</button>

      </form>

      </>    
    )

    }

    {

    //paso=="orden" &&
    currentStep===5 &&
    ( <>
            <h2>Datos Clientes</h2>
            <hr></hr>
            Nombres Completo:

            <input type="text" 
              name="nombres" 
              value={orden.nombres}
              onChange={handleInputChange}/>
            <br></br>
            email  :
            
            <input type="text" 
               name="email"
               value={orden.email}
               onChange={handleInputChange}/>
            <br></br>
            Numero Contacto :
            
            <input type="text" 
                name="numero_contacto"
                value={orden.numero_contacto}
                onChange={handleInputChange}/>
            <br></br>
            Identificacion : 
            
            <input type="text" 
                name="identificacion"
                value={orden.identificacion}
                onChange={handleInputChange}/>
            <br></br>
            Tipo Identificacion : 
            <select name="tipo_id" value={tipoIdentificacion} onChange={handleTipoIdentificacionChange}>
            <option value="Cedula">Cedula</option>
            <option value="Ruc">Ruc</option>
            </select>
            <hr></hr>

<h2>Informacion Vehiculo</h2>
          <hr></hr>
          Marca :
          
          <input type="text" name="marca"
                value={orden.marca}
                onChange={handleInputChange}/>
          <br></br>
          Modelo  :
          
          <input type="text" 
                name="modelo"
                value={orden.modelo}
                onChange={handleInputChange}/>
          <br></br>
          Placa :
          
          <input type="text" 
                name="placa"
                value={orden.placa}
                onChange={handleInputChange}/>
          <br></br>
          Nivel Tanque :
          
          <input type="text" 
                name="nivel_tanque"
                value={orden.nivel_tanque}
                onChange={handleInputChange}/>
          <br></br>
          Observacion Vehiculo:
          <br></br>
          <textarea id="comentario" 
          rows="5" cols="33"
          name="observacion"
          value={orden.observacion}
          onChange={handleInputChange}>
          </textarea>
          <hr></hr>

      <h2>Selección de servicios:</h2>
        <hr></hr>
        <form>
        <input type="checkbox" name="cambio_aceite"
              checked={orden.cambio_aceite}
              onChange={handleInputChange}/>
        <label> Cambio de aceite</label><br></br>
        <input type="checkbox" name="cambio_frenos"
              checked={orden.cambio_frenos}
              onChange={handleInputChange}/>
        <label> Cambio de frenos</label><br></br>
        <input type="checkbox" name="alineacion"
              checked={orden.alineacion}
              onChange={handleInputChange}/>
        <label> Alineación y balanceo</label><br></br>
        <input type="checkbox" name="diagnostico_general"
              checked={orden.diagnostico_general}
              onChange={handleInputChange}/>
        <label> diagnóstico general</label><br></br>
        <input type="checkbox" name="revision_sistema"
              checked={orden.revision_sistema}
              onChange={handleInputChange}/>
        <label> revisión sistema eléctrica</label><br></br>
        <input type="checkbox" name="revision_suspension"
              checked={orden.revision_suspension}
              onChange={handleInputChange}/>
        <label> revisión de la suspensión</label>
        <br></br>
        <br></br>
        <button onClick={handleGeneraOrden}>Generar Orden</button>  
        {creacion_orden && (<p>REGISTRO EXITOSO, CONSULTA TU ORDEN!!</p>)}        
        <button onClick={handleAtras}>Atras</button>

      </form>


      </> 
      
    )

    }

 </>

    );
}