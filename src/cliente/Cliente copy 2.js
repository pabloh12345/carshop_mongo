import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Inicio from '../Inicio';
import './styles.css';

export default function Cliente() {
  const initialFormState = {
    id: null,
    nombres: '',
    email: '',
    tipo_id: '',
    identificacion: '',
    estado: 'ENVIADA',
    marca: '',
    modelo: '',
    nivel_tanque: '',
    observacion: '',
    alineacion: false,
    cambio_aceite: false,
    cambio_frenos: false,
    diagnostico_general: false,
    numero_contacto: '',
    placa: '',
    revision_sistema: false,
    revision_suspension: false,
    fecha_agenda: ''
  };

  const [orden, setOrden] = useState(initialFormState);
  const [creacionOrden, setCreacionOrden] = useState(false);
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');

  const handleTipoIdentificacionChange = (event) => {
    setTipoIdentificacion(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setOrden({ ...orden, [name]: checked });
    } else {
      setOrden({ ...orden, [name]: value });
    }
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleSiguiente = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleAtras = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleIniOrden = () => {
    setCurrentStep(1);
  };

  const handleConsultaOrden = () => {
    setCurrentStep(6);
  };

  const handleGeneraOrden = () => {
    axios
      .post('http://localhost:3000/ordens', { params: orden })
      .then((response) => {
        setCreacionOrden(true);
        console.log('Data:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const email = useSelector((state) => state.usuario_red.usuario);

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ordens', { params: { email } });
        setDatos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {currentStep === 1 && (
        <>
          <body>
          <h2>CARSHOP TU VEHICULO EN BUENAS MANOS </h2>
          <hr />
          <table>
          <tr>
          <td>
          <button  className="boton-personalizado" onClick={handleConsultaOrden}>Consulta de Ordenes</button>
          <br />
          </td>
          <td>
          <button className="boton-personalizado" onClick={handleSiguiente}>Generar Nueva Orden</button>
          <br />
          </td>
          </tr>
          </table>
          <br />
          <br />
          </body>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h2>Datos Clientes</h2>
          <hr />
          Nombres Completo:
          <br />
          <input
            type="text"
            name="nombres"
            value={orden.nombres}
            onChange={handleInputChange}
          />
          <br />
          email:
          <br />
          <input
            type="text"
            name="email"
            value={orden.email}
            onChange={handleInputChange}
          />
          <br />
          Numero Contacto:
          <br />
          <input
            type="text"
            name="numero_contacto"
            value={orden.numero_contacto}
            onChange={handleInputChange}
          />
          <br />
          Identificacion:
          <br />
          <input
            type="text"
            name="identificacion"
            value={orden.identificacion}
            onChange={handleInputChange}
          />
          <br />
          <br />
          Tipo Identificacion:
          <select
            name="tipo_id"
            value={tipoIdentificacion}
            onChange={handleTipoIdentificacionChange}
          >
            <option value="Cedula">Cedula</option>
            <option value="Ruc">Ruc</option>
          </select>
          <hr />
          <br />
          <button onClick={handleSiguiente}>Siguiente</button>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h2>Informacion Vehiculo</h2>
          <hr />
          Marca:
          <br />
          <input
            type="text"
            name="marca"
            value={orden.marca}
            onChange={handleInputChange}
          />
          <br />
          Modelo:
          <br />
          <input
            type="text"
            name="modelo"
            value={orden.modelo}
            onChange={handleInputChange}
          />
          <br />
          Placa:
          <br />
          <input
            type="text"
            name="placa"
            value={orden.placa}
            onChange={handleInputChange}
          />
          <br />
          Nivel Tanque:
          <br />
          <input
            type="text"
            name="nivel_tanque"
            value={orden.nivel_tanque}
            onChange={handleInputChange}
          />
          <br />
          Observacion Vehiculo:
          <br />
          <textarea
            id="comentario"
            rows="5"
            cols="33"
            name="observacion"
            value={orden.observacion}
            onChange={handleInputChange}
          ></textarea>
          <hr />
          <button onClick={handleSiguiente}>Siguiente</button>
          <button onClick={handleAtras}>Atras</button>
        </>
      )}

      {currentStep === 4 && (
        <>
          <h2>Selección de servicios:</h2>
          <hr />
          <form>
            <input
              type="checkbox"
              name="cambio_aceite"
              checked={orden.cambio_aceite}
              onChange={handleInputChange}
            />
            <label> Cambio de aceite</label>
            <br />
            <input
              type="checkbox"
              name="cambio_frenos"
              checked={orden.cambio_frenos}
              onChange={handleInputChange}
            />
            <label> Cambio de frenos</label>
            <br />
            <input
              type="checkbox"
              name="alineacion"
              checked={orden.alineacion}
              onChange={handleInputChange}
            />
            <label> Alineación y balanceo</label>
            <br />
            <input
              type="checkbox"
              name="diagnostico_general"
              checked={orden.diagnostico_general}
              onChange={handleInputChange}
            />
            <label> diagnóstico general</label>
            <br />
            <input
              type="checkbox"
              name="revision_sistema"
              checked={orden.revision_sistema}
              onChange={handleInputChange}
            />
            <label> revisión sistema eléctrica</label>
            <br />
            <input
              type="checkbox"
              name="revision_suspension"
              checked={orden.revision_suspension}
              onChange={handleInputChange}
            />
            <label> revisión de la suspensión</label>
            <br />
            <br />
            <button onClick={handleSiguiente}>Siguiente</button>
            <button onClick={handleAtras}>Atras</button>
          </form>
        </>
      )}

      {currentStep === 5 && (
        <>
          <button onClick={handleIniOrden}>Pantalla Inicio</button>
          <br />
          <h2>Datos Clientes</h2>
          <hr />
          Nombres Completo:
          <input
            type="text"
            name="nombres"
            value={orden.nombres}
            onChange={handleInputChange}
          />
          <br />
          email:
          <input
            type="text"
            name="email"
            value={orden.email}
            onChange={handleInputChange}
          />
          <br />
          Numero Contacto:
          <input
            type="text"
            name="numero_contacto"
            value={orden.numero_contacto}
            onChange={handleInputChange}
          />
          <br />
          Identificacion:
          <input
            type="text"
            name="identificacion"
            value={orden.identificacion}
            onChange={handleInputChange}
          />
          <br />
          Tipo Identificacion:
          <select
            name="tipo_id"
            value={tipoIdentificacion}
            onChange={handleTipoIdentificacionChange}
          >
            <option value="Cedula">Cedula</option>
            <option value="Ruc">Ruc</option>
          </select>
          <hr />

          <h2>Informacion Vehiculo</h2>
          <hr />
          Marca:
          <input
            type="text"
            name="marca"
            value={orden.marca}
            onChange={handleInputChange}
          />
          <br />
          Modelo:
          <input
            type="text"
            name="modelo"
            value={orden.modelo}
            onChange={handleInputChange}
          />
          <br />
          Placa:
          <input
            type="text"
            name="placa"
            value={orden.placa}
            onChange={handleInputChange}
          />
          <br />
          Nivel Tanque:
          <input
            type="text"
            name="nivel_tanque"
            value={orden.nivel_tanque}
            onChange={handleInputChange}
          />
          <br />
          Observacion Vehiculo:
          <textarea
            id="comentario"
            rows="5"
            cols="33"
            name="observacion"
            value={orden.observacion}
            onChange={handleInputChange}
          ></textarea>
          <hr />

          <h2>Selección de servicios:</h2>
          <hr />
          <form>
            <input
              type="checkbox"
              name="cambio_aceite"
              checked={orden.cambio_aceite}
              onChange={handleInputChange}
            />
            <label> Cambio de aceite</label>
            <br />
            <input
              type="checkbox"
              name="cambio_frenos"
              checked={orden.cambio_frenos}
              onChange={handleInputChange}
            />
            <label> Cambio de frenos</label>
            <br />
            <input
              type="checkbox"
              name="alineacion"
              checked={orden.alineacion}
              onChange={handleInputChange}
            />
            <label> Alineación y balanceo</label>
            <br />
            <input
              type="checkbox"
              name="diagnostico_general"
              checked={orden.diagnostico_general}
              onChange={handleInputChange}
            />
            <label> diagnóstico general</label>
            <br />
            <input
              type="checkbox"
              name="revision_sistema"
              checked={orden.revision_sistema}
              onChange={handleInputChange}
            />
            <label> revisión sistema eléctrica</label>
            <br />
            <input
              type="checkbox"
              name="revision_suspension"
              checked={orden.revision_suspension}
              onChange={handleInputChange}
            />
            <label> revisión de la suspensión</label>
            <br />
            <br />
            <button onClick={handleGeneraOrden}>Generar Orden</button>
            {creacionOrden && <p>REGISTRO EXITOSO, CONSULTA TU ORDEN!!</p>}
            <button onClick={handleAtras}>Atras</button>
          </form>
        </>
      )}

      {currentStep === 6 && (
        <>
         <br />
          <h2>Ordenes Realizadas</h2>
         <button class="boton-personalizado" onClick={handleIniOrden}>Pantalla Inicio</button>
         <button class="boton-personalizado" onClick={handleIniOrden}>Modificar Orden</button>
          <hr />
          <table border="true">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Email</th>
                <th>Tipo_Id</th>
                <th>Identificacion</th>
                <th>Estado</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Nivel Tanque</th>
                <th>Observacion</th>
                <th>Alineacion</th>
                <th>Cambio Aceite</th>
                <th>Cambio Freno</th>
                <th>Diagnostico</th>
                <th>Contacto</th>
                <th>Placa</th>
                <th>Revision Sistema</th>
                <th>Revision Suspension</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato.nombres}</td>
                  <td>{dato.email}</td>
                  <td>{dato.tipo_id}</td>
                  <td>{dato.identificacion}</td>
                  <td>{dato.estado}</td>
                  <td>{dato.marca}</td>
                  <td>{dato.modelo}</td>
                  <td>{dato.nivel_tanque}</td>
                  <td>{dato.observacion}</td>
                  <td>{dato.alineacion}</td>
                  <td>{dato.cambio_aceite}</td>
                  <td>{dato.cambio_frenos}</td>
                  <td>{dato.diagnostico_general}</td>
                  <td>{dato.numero_contacto}</td>
                  <td>{dato.placa}</td>
                  <td>{dato.revision_sistema}</td>
                  <td>{dato.revision_suspension}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
         
        </>
      )}
    </>
  );
}
