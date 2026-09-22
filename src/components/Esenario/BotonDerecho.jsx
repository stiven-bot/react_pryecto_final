import "/src/pages/escenario/esenario.css"
function BotonDerecho({mover}){
    return(
        <button onClick={mover} className="boton">
            ➡️
        </button>
    )
}
export default BotonDerecho