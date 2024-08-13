import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';


export function validarEmail(email) {
    // Verificamos si el email contiene el símbolo '@' 
    // y la @ no está al inicio ni al final
    const atIndex = email.indexOf('@');
    if (atIndex <= 0 || atIndex === email.length - 1) {
      return false;
    }
  
    // Dividimos el email usando la '@' como separador
    const [local, domain] = email.split('@');
    // Ese código genera dos constantes 
    // - local, con la parte de antes de la @
    // -- domain, con la parte de después de la arroba
  
    // Comprobamos si alguna de las partes está vacía
    if (!local || !domain) {
      return false;
    }
  
    // Verificamos que el dominio contenga un punto y no esté al inicio ni al final
    const dotIndex = domain.indexOf('.');
    if (dotIndex <= 0 || dotIndex === domain.length - 1) {
      return false;
    }
  
    // Comprobamos que el dominio no tenga más de un punto consecutivo
    if (domain.includes('..')) {
      return false;
    }
  
    // Comprobamos que el email no contenga caracteres inválidos 
    // Estos caracteres inválidos podrían extenderse si lo ves necesario
    const invalidChars = [' ', '!', '#', '$', '%', '&', '*', '(', ')', '+', ',', '/', ':', ';', '<', '=', '>', '?', '[', '\\', ']', '^', '`', '{', '|', '}', '~'];
    for (let char of invalidChars) {
      if (email.includes(char)) {
        return false;
      }
    }
  
    // Si estamos aquí es que todas las comprobaciones anteriores fueron correctas
    return true;

}

export function GenerarAlias(palabras) {
  if (palabras.length < 3) {
    throw new Error("El array debe contener al menos 3 palabras");
  }

  // Función para obtener un índice aleatorio del array
  function obtenerIndiceAleatorio(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  // Crear un set para almacenar los índices únicos
  const indicesSeleccionados = new Set();

  // Seleccionar 3 índices únicos aleatorios
  while (indicesSeleccionados.size < 3) {
    indicesSeleccionados.add(obtenerIndiceAleatorio(palabras));
  }

  // Convertir el set a array y mapear las palabras seleccionadas
  const aliasArray = Array.from(indicesSeleccionados).map(indice => palabras[indice]);

  // Unir las palabras con un punto
  return aliasArray.join('.');
}

export function GenerarCBU() {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}


export function maskInput(input) {
  // Convertir el input a string para manejar números y cadenas de manera uniforme
  const inputString = input.toString();
  // Crear una cadena de asteriscos de la misma longitud que el input
  const maskedString = '*'.repeat(inputString.length);
  return maskedString;
}


export function splitAlias(alias) {
// Dividir el string en un array usando el punto como delimitador
const wordsArray = alias.split('.');
return wordsArray;
}

export function formatCurrency(amount) {
  // Convierte el número en un string con formato de moneda
  return amount?.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}



export function lastFourNumbers(number) {
  if (typeof number !== 'number' || isNaN(number)) {
    return NaN; // O cualquier otro valor que indique un error
  }
  
  const numberStr = number.toString();
  const lastFourDigits = numberStr.slice(-4);
  return parseInt(lastFourDigits, 10);
}


export function formatDate(fecha) {
  const date = new Date(fecha);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function generateRandomPrice() {
  // Genera un número aleatorio entre 1000 y 65000
  const min = 1000;
  const max = 3000;
  const randomNum = Math.random() * (max - min) + min;
  
  // Redondea el número a dos decimales
  const roundedNum = randomNum.toFixed(2);
  
  // Convierte el número a un flotante
  return parseFloat(roundedNum);
}

export function isCardExpired(expirationDate) {
  // Dividir la fecha en mes y año
  const expMonth = parseInt(expirationDate.slice(0, 2), 10);
  const expYear = parseInt(expirationDate.slice(2, 4), 10);

  // Obtener el año y mes actuales
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript son de 0-11, por eso se suma 1
  const currentYear = currentDate.getFullYear() % 100; // Obtener los últimos dos dígitos del año

  // Comparar el año y mes de la tarjeta con el actual
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return true; // La tarjeta está vencida
  }
  return false; // La tarjeta no está vencida
}
