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