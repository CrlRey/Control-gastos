import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGasto';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import {generarId} from './helpers/index'




/* Siempre que se va a reutilizar un componente se debe de crear desde el App.jsx*/

function App() {
  
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);

  // Mostrar la siguiente pantalla
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [animarModal, setAnimarModal] = useState(false);

  // Mostrar el modal
  const [modal, setModal] = useState(false);

  // Editar lo que se tiene al modal
  const [gastosEditar, setGastosEditar] = useState({});

  useEffect(() => {
    if(Object.keys(gastosEditar).length > 0){
      setModal(true)  
      setAnimarModal(true)
  
      setTimeout( () => {
      }, 300) 
    }
  }, [gastosEditar]);



  const handleNuevoGasto = () => {
    setModal(true)  
    setAnimarModal(true)
    setGastosEditar({})

    setTimeout( () => {
    }, 300) 
  }

  const guardarGastos = gasto => {
    if (gasto.id) {
      // Actualizar
      const gastosActualziados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualziados)
    } else {
      // Nuevo Gasto
    gasto.id = generarId(); 
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])
    }

    

    setAnimarModal(false)
    
    setTimeout(() => {
        setModal(false)
    }, 500);  
  }

  return (
    <div className={modal ? 'fijar' : null}>
      <Header
      gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
      
      {isValidPresupuesto && (
      <>
      <main>
        <ListadoGastos
        setGastosEditar={setGastosEditar} 
          gastos={gastos}
        
        />
      </main>
        <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto}/>
        </div>
      </>
      )}

      {modal && <Modal
      
      gastosEditar={gastosEditar}
      setModal={setModal}
      animarModal={animarModal}
      setAnimarModal={setAnimarModal}
      guardarGastos={guardarGastos}
      />}
      
    </div>
  )
}

export default App
