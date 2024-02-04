import { useState, useEffect } from 'react';
import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGastos, gastosEditar}) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if(Object.keys(gastosEditar).length > 0){
      setNombre(gastosEditar.nombre)
      setCantidad(gastosEditar.cantidad)
      setCategoria(gastosEditar.categoria)
      setId(gastosEditar.id)
      setFecha(gastosEditar.fecha)
    }
  }, []);

  // Mensaje para mostrar si hay error

  const [mensaje, setMensaje] = useState('');

  const cerrarModal = () => {
    
    setAnimarModal(false)
    
    setTimeout(() => {
        setModal(false)
    }, 500);  
  }

  const handleSubmit = e => {
    e.preventDefault();

      if ([categoria, nombre, cantidad].includes('')) {
        setMensaje('Todos los campos son obligatorios')

        setTimeout(() => {
          setMensaje('')
        }, 2000);
        return;
      }

      guardarGastos({nombre, cantidad, categoria, id, fecha})
    }

  

  return (
    <div className='modal'>
      <p>Desde modal</p>
      <div className='cerrar-modal'>
        <img src={cerrarBtn} alt="Cerrar modal" onClick={cerrarModal}/>
      </div>

      {/* Formulario */}
      <form 
      onSubmit={handleSubmit}
      className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      
      
      > 
        <legend>{gastosEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        

        <div className='campo'>
          <label htmlFor="nombre">Nombre Gasto</label>
          <input id='nombre' type="text" placeholder='Añade el nombre del gasto' value={nombre}
          onChange={e => setNombre(e.target.value)}
          
          />

        </div>

        <div className='campo'>
          <label htmlFor="cantidad">Cantidad</label>
          <input id='cantidad' type="number" placeholder='Añade la cantidad del gasto ej. 300'
          value={cantidad}
          onChange={e => setCantidad( Number(e.target.value))}
          />
          {/* En los campos de numero siempre se debe de convertir a Numero */}
          
        </div>

        {/* Hacemos el select o spinner */}
        <div className='campo'>
          <label htmlFor="categoria">Categoria</label>
          
          <select id="categoria"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          
          >
            <option value="">-- SELECCIONE --</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Comida">Comida</option>
            <option value="Casa">Casa</option>
            <option value="Gastos">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={gastosEditar.nombre ? 'Gauardar Cambios' : 'Añadir Gasto'} />

      </form>
    </div>
  )
}

export default Modal
