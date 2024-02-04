const Mensaje = ({children, tipo}) => {
  return (
    // Se puede injectar clases dinamicas con clases fijas con el prop de children
    <div className={`alerta ${tipo}`}>
      {children}
    </div>
  )
}

export default Mensaje
