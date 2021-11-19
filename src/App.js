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

  //Revisamos si en las filas hay match de 3 colores (vertical)

  //Obtenemos un color aleatorio
  const getRandomColor = () => {
    /*Haciendo un Math.Random que devuelve un numero entre 0 y 1, 
    * lo multiplicamos por la longitud del array de colores
    */
    let index = Math.random() * colores.length;

    /*Hacemos un Math.floor que nos devolvera el numero entero mas grande 
    * menor o igual al numero que le pasamos por parametro
    * ya que index puede ser un float al multplicar 0.1, 0.2, etc * la longitud del array */
    index = Math.floor(index);

    //EJ: 0,2 * 6 = 1,2 ==> 2 
    // 0.4 * 6 = 2.4 => 3 
    // 0.7 * 6 = 4,2 => 5

    //Devolvemos el color aleatorio
    return colores[index];
  };

  /*Como queremos evitar que el componente se renderize todo el rato al verse modificado 
  * el tablero, deberemos utilizar el useEffect
  */
  useEffect(() => {
    //Definimos una constante que será una funcion para crear la parrilla/tablero del juego
    const crearTablero = () => {
      //Preparamos resultado del tablero
      const tablero = [];
      
      //Recorreremos el numero de veces de la parrilla para crear un sprite aleatorio
      for(let i = 0; i < tamañoParrilla; i++){
        
        //Obtenemos un color/sprite aleatorio
        const colorAleatorio = getRandomColor();

        //Añadimos el color al tablero
        tablero.push(colorAleatorio);
      }

      //Cada vez que se cree un tablero, deberemos actualizarlo del estado del componente
      setTableroActual(tablero);
    };

    //Creamos el tablero rellenandolo con colores aleatorios
    crearTablero();
  }, []);

  

  useEffect(() => {
    //Primero revisaremos si en las columnas hay match de 3 colores (horizontal)
    const revisarColumnasdeTres = () => {
      /* Recorreremos hasta la posicion 48, 
      * ya que si miramos las columnas, a partir de la posicion 49 ya no haría falta comprovaciones
      * porque la posicion 41 ya la cubriria*/
      for(let i = 0; i < posicionComprobarColumnasTres; i++){
        //Creamos una constante para saber la columna
        /* 
        * La primera posicion, será la iteracion
        * La seguna posicion será la iteración por el ancho del tablero
        * La tercera posicion será la seguna posicion * 2
        */
        let primeraPosicion = i;
        let segundaPosicion = i + anchoParrilla;
        let terceraPosicion = i + anchoParrilla * 2;

        const columnaDeTres = [primeraPosicion, segundaPosicion, terceraPosicion];
        const primerColorDeLaColumna = tableroActual[i];

        //Para comprobar que todos las posiciones de dentro de la columna tienen el mismo color
        //Utilizaremos every, que recorre todas las posiciones del Array
        if(columnaDeTres.every(posicion => tableroActual[posicion] === primerColorDeLaColumna)){
          //Tenemos que poner en las posiciones de la columna valor vacio, para que no se vea ningun color y el tablero siga teniendo las mismas posiciones
          columnaDeTres.forEach(posicion => tableroActual[posicion] = '')
        }
      }
    }

    const revisarColumnasDeCuatro = () => {
      /*Al igual que pasa con las columnas de 3, solo recorreremos hasta una determinada posicion*/
      for(let i= 0; i < posicionComprobarColumnasCuatro; i++){
        let primeraPosicion = i;
        let segundaPosicion = i + anchoParrilla;
        let terceraPosicion = i + anchoParrilla * 2;
        let cuartaPosicion = i + anchoParrilla * 3;

        const columnaDeCuatro = [primeraPosicion, segundaPosicion, terceraPosicion, cuartaPosicion];
        const primerColorDeLaColumna = tableroActual[i];

        if(columnaDeCuatro.every(posicion => tableroActual[posicion] === primerColorDeLaColumna)){
          columnaDeCuatro.forEach(posicion => tableroActual[posicion] = '')
        }
      }
    }

    //Ponemos un timer para que lo vaya calculando cada X milisegundos, a demás de que lo necesitaremos despues de la primera renderizacion del componente
    const timer = setInterval(() => {
      //Revisamos que coinciden colores en columnas
      revisarColumnasDeCuatro();
      revisarColumnasdeTres();

      //Una vez revisadas las columnas, tendremos que actualizar el tablero
      setTableroActual([...tableroActual]);
    }, 100);

    //Para evitar tener todo el rato el timer, tenemos que limpiar la funcion al desmontar el componente
    return () => {
      clearInterval(timer);
    }
  }, [tableroActual]);

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
