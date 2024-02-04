import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastosEditar}) => {
  return (
    <div className='lisatdo-gastos contenedor'>
      <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>

      {/* Para mostrar el contenido de un arreglo en HTML, se usa un map */}

      {gastos.map( gasto => (
      <Gasto 
        key={gasto.id}
        gasto={gasto}
        setGastosEditar = {setGastosEditar}
      />
      ))}

    </div>
  )
}

export default ListadoGastos
