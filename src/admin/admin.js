import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

import AWS from 'aws-sdk';

AWS.config.update({
  accesKeyId: procces.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccesKey: procces.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region:'us-east-1',
  sessionToken: procces.env.REACT_APP_AWS_SESSION_TOKEN
 });
 
//{"_id":{"$oid":"64a4f1fd8208232a36d0dee0"},"nombres":"Pablo Holguin","Placa":"GTP2526","Numero_contacto":"0994809384","email":"pablo_ph@hotmail.com","tipo_id":"Cedula","identificacion":"0994809385","estado":"enviada","marca":"nissan","modelo":"kids","nivel_tanque":"1.5","observacio":"rayones laterales"}
export default function Admin() {
  
  const email = useSelector(state => state.usuario_red.usuario);
 
//alert("aqui en admin",email);
//alert(email);
  //if (currentStep === 1) {
  //-----------------------------------------
  //Consulta ordenes especifica del cliente
  //-----------------------------------------
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    //console.log("ingresa en usesef");
    const fetchData = async () => {
      try {
       // const response = await axios.get('http://localhost:3000/ordens',email);
       const response = await axios.get('http://localhost:3000/ordens');
        setDatos(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


    return (
        
        <>
             { (
        <>
          <h2>Administracion Ordenes  </h2>
          <hr />
          
          <button class="boton-personalizado" >Grabar Agendas</button>
        
          <button class="boton-personalizado" >Eliminar Ordenes</button>
          
          <button class="boton-personalizado" >Cancelar Ordenes</button>

          <table border="true">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Nivel Tanque</th>
                <th>Observacion</th>
                <th>Alineacion</th>
                <th>Cambio Aceite</th>
                <th>Cambio Freno</th>
                <th>Diagnostico</th>
                <th>Placa</th>
                <th>Revision Sistema</th>
                <th>Revision Suspension</th>
                <th>Fecha Agenda</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.estado}</td>
                  <td>{dato.marca}</td>
                  <td>{dato.modelo}</td>
                  <td>{dato.nivel_tanque}</td>
                  <td>{dato.observacion}</td>
                  <td><input type="checkbox" checked={dato.alineacion}/></td>
                  <td><input type="checkbox" checked={dato.cambio_aceite}/></td>
                  <td><input type="checkbox" checked={dato.cambio_frenos}/></td>
                  <td><input type="checkbox" checked={dato.diagnostico_general}/></td>
                  <td>{dato.placa}</td>
                  <td><input type="checkbox" checked={dato.revision_sistema}/></td>
                  <td><input type="checkbox" checked={dato.revision_suspension}/></td>
                  <td>
                    {dato.estado === "ENVIADA" ? (
                      <input type="datetime-local" />
                    ) : (
                      <td>{dato.fecha_agenda}</td>                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
        </>
      )}

 </>

    );
}