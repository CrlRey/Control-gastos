import { useState, useEffect } from 'react';

const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
      <form>
        <div className='campo'>
            <label>Filtrar Gastos</label>
            <select name="" id="" value={filtro}
            
            onChange={e => setFiltro(e.target.value) }
            >
                <option value="">-- TODAS LAS CATEGORIAS --</option>
                <option value="Ahorro">Ahorro</option>
                <option value="Comida">Comida</option>
                <option value="Casa">Casa</option>
                <option value="Gastos">Gastos Varios</option>
                <option value="Ocio">Ocio</option>
                <option value="Salud">Salud</option>
                <option value="Suscripciones">Suscripciones</option>
            </select>
        </div>
      </form>
    </div>
  )
}

export default Filtros
