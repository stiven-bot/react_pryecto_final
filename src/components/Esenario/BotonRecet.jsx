import "/src/pages/escenario/esenario.css"
function BotonRecet({mover}){
    return (
        <button className="boton" onClick={mover}>
            🔄️
        </button>
    )
}
export default BotonRecet;