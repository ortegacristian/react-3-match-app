import { useEffect, useState } from "react";

import blueCandy from './imagenes/blue-candy.png';
import greenCandy from './imagenes/green-candy.png';
import orangeCandy from './imagenes/orange-candy.png';
import purpleCandy from './imagenes/purple-candy.png';
import redCandy from './imagenes/red-candy.png';
import yellowCandy from './imagenes/yellow-candy.png';
import blank from './imagenes/blank.png';

import './index.css';

//Definimos los diferentes colores que va a tener los sprites del juego
const colores = [
  redCandy,
  blueCandy,
  yellowCandy,
  orangeCandy,
  greenCandy,
  purpleCandy
]

//Definiremos una parrilla de 8 * 8 (64 items) 
const tamañoParrilla = 64;
const anchoParrilla = 8;
const posicionComprobarColumnasTres = 47;
const posicionComprobarColumnasCuatro = 33;
const posicionComprobarFilasTres = 64;

const App = () => {

  //Guardamos y recuperamos en el estado del componente, el estado del tablero
  const [tableroActual, setTableroActual] = useState([])

  const [posicionQueEstaSiendoArrastrada, setPosicionQueEstaSiendoArrastrada] = useState(null);
  const [posicionQueEstaSiendoReemplazada, setPosicionQueEstaSiendoReemplazada] = useState(null);

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
        columnaDeTres.forEach(posicion => tableroActual[posicion] = blank);
        return true;
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
        columnaDeCuatro.forEach(posicion => tableroActual[posicion] = blank);
        return true;
      }
    }
  }

  const revisarFilasDeTres = () => {
    for(let i = 0; i < posicionComprobarFilasTres; i++){
      let primeraPosicion = i;
      let segundaPosicion = i + 1;
      let terceraPosicion = i + 2;
      
      const filaDeTres = [primeraPosicion, segundaPosicion, terceraPosicion];
      const primerColorDeLaFila = tableroActual[i];
      
      //Hay posiciones que no hacen falta comprobar como son las que estan en las 2 ultimas columnas
      const posicionesNoComprobar = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];

      if(posicionesNoComprobar.includes(i)){
        continue;
      } 

      if(filaDeTres.every(posicion => tableroActual[posicion] === primerColorDeLaFila)){
        filaDeTres.forEach(posicion => tableroActual[posicion] = blank);
        return true;
      }
    }
  }

  const revisarFilasDeCuatro = () => {
    for(let i = 0; i < posicionComprobarFilasTres; i++){
      let primeraPosicion = i;
      let segundaPosicion = i + 1;
      let terceraPosicion = i + 2;
      let cuartaPosicion = i + 3;
      
      const filaDeCuatro = [primeraPosicion, segundaPosicion, terceraPosicion, cuartaPosicion];
      const primerColorDeLaFila = tableroActual[i];
      
      //Hay posiciones que no hacen falta comprobar como son las que estan en las 3 ultimas columnas
      const posicionesNoComprobar = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63];

      if(posicionesNoComprobar.includes(i)){
        continue;
      } 

      if(filaDeCuatro.every(posicion => tableroActual[posicion] === primerColorDeLaFila)){
        filaDeCuatro.forEach(posicion => tableroActual[posicion] = blank);
        return true;
      }
    }
  }

  useEffect(() => {
    const moverAFilaDeAbajo = () => {
      //Comprobaremos todo el tablero a excepcion de la ultima fila, ya que esta no bajará nunca
      for(let i = 0; i < tamañoParrilla - anchoParrilla; i++){
        const primeraFila = [0, 1, 2, 3, 4, 5, 6, 7];
        const esLaPrimeraFila = primeraFila.includes(i);

        //Si es la primera fila y la posicion esta vacia, 
        if(esLaPrimeraFila && tableroActual[i] === blank){
          //Tenemos que generar un color aleatorio
          let colorAleatorio = getRandomColor();
          tableroActual[i] = colorAleatorio;
        }

        //Si en la posicion del tablero en la que estamos iterando, nos situamos justo en la fila de abajo, si esta no contiene nada, situaremos el color en esa posicion
        if((tableroActual[i + anchoParrilla]) === blank){
          tableroActual[i + anchoParrilla] = tableroActual[i];
          tableroActual[i] = blank;
        }
      }
    }

    //Ponemos un timer para que lo vaya calculando cada X milisegundos, a demás de que lo necesitaremos despues de la primera renderizacion del componente
    const timer = setInterval(() => {
      //Revisamos que coinciden colores en columnas y filas
      revisarColumnasDeCuatro();
      revisarFilasDeCuatro();
      revisarColumnasdeTres();
      revisarFilasDeTres();
      moverAFilaDeAbajo()

      //Una vez revisadas las columnas, tendremos que actualizar el tablero
      setTableroActual([...tableroActual]);
    }, 100);

    //Para evitar tener todo el rato el timer, tenemos que limpiar la funcion al desmontar el componente
    return () => {
      clearInterval(timer);
    }
  }, [revisarColumnasDeCuatro, revisarFilasDeCuatro, revisarColumnasdeTres, revisarFilasDeTres, tableroActual]);

  const dragStart = (e) => {
    setPosicionQueEstaSiendoArrastrada(e.target)
  }

  const dragDrop = (e) => {
    setPosicionQueEstaSiendoReemplazada(e.target);
  }

  const dragEnd = (e) => {
    const idPosicionQueEstaSiendoArrastrada = parseInt(posicionQueEstaSiendoArrastrada.getAttribute('data-id'));
    const idPosicionQueEstaSiendoReemplazada = parseInt(posicionQueEstaSiendoReemplazada.getAttribute('data-id'));
  
    tableroActual[idPosicionQueEstaSiendoReemplazada] = posicionQueEstaSiendoArrastrada.getAttribute('src');
    tableroActual[idPosicionQueEstaSiendoArrastrada] = posicionQueEstaSiendoReemplazada.getAttribute('src');

    //Solo debemos permitir mover hirizontal y verticalmente, no podemos subsituir cualquier posicion del tablero

    const movimientosValidos = [
      idPosicionQueEstaSiendoArrastrada - 1, //izquierda
      idPosicionQueEstaSiendoArrastrada - anchoParrilla, //arriba
      idPosicionQueEstaSiendoArrastrada + 1, //derecha
      idPosicionQueEstaSiendoArrastrada + anchoParrilla, //abajo
    ]

    const movimientoValido =  movimientosValidos.includes(idPosicionQueEstaSiendoReemplazada);
    console.log(movimientoValido);

    const esColumnaDeCuatro = revisarColumnasDeCuatro();
    const esFilaDeCuatro = revisarFilasDeCuatro();
    const esColumnaDeTres = revisarColumnasdeTres();
    const esFilaDeTres = revisarFilasDeTres();

    //Si es un movimiento valido
    if(
      idPosicionQueEstaSiendoReemplazada && 
      movimientoValido && 
      (esFilaDeTres || esFilaDeCuatro || esColumnaDeCuatro || esColumnaDeTres)
    ){
      //Setearemos las posiciones que estan siendo arrastradas y remplazadas por valor null, ya que hemos acabado de hacer el movimiento
      setPosicionQueEstaSiendoArrastrada(null);
      setPosicionQueEstaSiendoReemplazada(null);
    }else{
      //Si no es un movimiento valido
      tableroActual[idPosicionQueEstaSiendoReemplazada] = posicionQueEstaSiendoReemplazada.getAttribute('src');
      tableroActual[idPosicionQueEstaSiendoArrastrada] = posicionQueEstaSiendoArrastrada.getAttribute('src');
      setTableroActual([...tableroActual]);
    }
  }

  return (
    <div className="App">
      <div className="tablero">
        {tableroActual.map((color, posicion) => (
          <img
            key={posicion}
            alt={color}
            src={color}
            data-id={posicion}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e)=> e.preventDefault()}
            onDragEnter={(e)=> e.preventDefault()}
            onDragLeave={(e)=> e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}/>
        ))}
      </div>
    </div>
  );
}

export default App;
