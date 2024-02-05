import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setGastosEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  return (
    <div className='lisatdo-gastos contenedor'>
      

      {/* Para mostrar el contenido de un arreglo en HTML, se usa un map */}

      {
        filtro ? (
          <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>
          {gastosFiltrados.map( gasto => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastosEditar={setGastosEditar}
              eliminarGasto={eliminarGasto}
            />
            ))}
          </>
        ) : (
          <>
          <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
            {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastosEditar={setGastosEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        )
      }



    </div>
  )
}

export default ListadoGastos
