
function Tortug( {posicion} ){
    return(
        <div style={{
            fontSize:"55px",
            position:"relative",
            left: `${posicion}px`,
            transition: "left 0.2s"
        }
        }>🐢
        
        </div>
        
    )
}

export default Tortug