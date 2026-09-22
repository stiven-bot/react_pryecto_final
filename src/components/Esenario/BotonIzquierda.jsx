import "/src/pages/escenario/esenario.css"
function BotonIzquierda({mover}){
    return(
        <button onClick={mover} className="boton">
            ⬅️
        </button>
    )
}
export default BotonIzquierda