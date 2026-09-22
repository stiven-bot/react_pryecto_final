import Tortug from "/src/components/Esenario/Tortuga";
import BotonDerecho from "/src/components/Esenario/BotonDerecho";
import BotonIzquierda from "/src/components/Esenario/BotonIzquierda"
import BotonRecet from "/src/components/Esenario/BotonRecet";
import {useState} from "react"
import "./esenario.css"
function Esenario(){
    const [posicion, setPosicion] = useState(0);
    const Limite_izquierdo = -242;
    const Limite_derecho = 242;

    function MoverIzquierda(){
        if (posicion > Limite_izquierdo){
            setPosicion(posicion-10);
        }
    }
    function MoverDerecha(){
        if (posicion < Limite_derecho){
            setPosicion(posicion+10);
        }
    }
    function Recet(){
        setPosicion(0)
    }
    return(
        <div className="esenario">
            <h2>Tortuga en camino</h2>
            <Tortug posicion={posicion} />
            <BotonIzquierda mover={MoverIzquierda}/>
            <BotonRecet mover={Recet}/>
            <BotonDerecho mover={MoverDerecha}/>
            <h3 className="h3">posición <br/> {posicion}</h3>
        </div>
    )
}
export default Esenario;