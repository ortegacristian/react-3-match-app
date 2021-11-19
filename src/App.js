import { useEffect, useState } from "react";

import './index.css';

//Definimos los diferentes colores que va a tener los sprites del juego
const colores = [
  'red',
  'blue',
  'yellow',
  'orange',
  'green',
  'purple'
]

//Definiremos una parrilla de 8 * 8 (64 items) 
const tamañoParrilla = 64;
const anchoParrilla = 8;
const posicionComprobarColumnasTres = 47;
const posicionComprobarColumnasCuatro = 33;

const App = () => {

  //Guardamos y recuperamos en el estado del componente, el estado del tablero
  const [tableroActual, setTableroActual] = useState([])

  

  

  return (
    <div className="App">
      <div className="tablero">
        {tableroActual.map((color, posicion) => (
          <object
            key={posicion}
            alt={color}
            aria-label={color}
            style={{backgroundColor: color}}/>
        ))}
      </div>
    </div>
  );
}

export default App;
