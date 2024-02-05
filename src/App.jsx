import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros.JSX'; 
import ListadoGastos from './components/ListadoGasto';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import {generarId} from './helpers/index'





/* Siempre que se va a reutilizar un componente se debe de crear desde el App.jsx*/

function App() {
  
  const [presupuesto, setPresupuesto] = useState(
    Number (localStorage.getItem('presupuesto')) ?? 0
  );
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  // Mostrar la siguiente pantalla
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [animarModal, setAnimarModal] = useState(false);

  // Mostrar el modal
  const [modal, setModal] = useState(false);

  // Editar lo que se tiene al modal
  const [gastosEditar, setGastosEditar] = useState({});

  const [filtro, setFiltro] = useState('');

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if(Object.keys(gastosEditar).length > 0){
      setModal(true)  
      setAnimarModal(true)
  
      setTimeout( () => {
      }, 300) 
    }
  }, [gastosEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]);

  useEffect(() => {
    // Para guardar arrays en localStorage se debe usar JSON
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, []);

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
      setGastosEditar({})
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


  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id); 
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : null}>
      <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
      
      {isValidPresupuesto && (
      <>
      <main>
        <Filtros 
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <ListadoGastos
        setGastosEditar={setGastosEditar} 
          gastos={gastos}
          eliminarGasto={eliminarGasto}
          filtro = {filtro}
          gastosFiltrados={gastosFiltrados}
        
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
      setGastosEditar={setGastosEditar}
      />}
      
    </div>
  )
}

export default App
