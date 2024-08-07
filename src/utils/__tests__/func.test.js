import { GenerarAlias, generateRandomPrice, lastFourNumbers } from "../funcionalidades"
import { validarEmail } from "../funcionalidades"

// TEST : lastFourNumbers
describe('Mostrar numero de la tarjeta' , () => {
   it("Debe devolver Nan cuando la entrada no es un numero valido" ,  () => {
    const serialCard = lastFourNumbers("Hola mundo")
    expect(serialCard).toBeNaN()
   })
 
   it("Debe retornar un numero cuando la entrada es un numero valido" , () => {
    const serialCard = lastFourNumbers(2548745896547842)
    expect(typeof serialCard).toBe("number")
   })
   it("Debe devolver solo los ultimos 4 digitos" , () => {
    const serialCard = lastFourNumbers(2547412589874521)
    expect(serialCard.toString().length).toBe(4)
   })
   
})

//TEST: Validacion de Email
describe("Verificar si es un email valido", ()=> {
   it("Debe devolver false en caso de que no sea un email valido" , ()=> {
      const emailUser = "testuser@gmail.com"
      expect(validarEmail(emailUser)).toBe(true)
   })
}) 

//TEST: Generacion aleatoria de Precio 
describe('Verifica que el precio sea correcto', () => {
   it('Debe devolver un número', () => {
     const price = generateRandomPrice();
     expect(typeof price).toBe('number');
   });
 
   it('Debe devolver un número entre 1000 y 3000', () => {
     const price = generateRandomPrice();
     expect(price).toBeGreaterThanOrEqual(1000);
     expect(price).toBeLessThanOrEqual(3000);
   });
 
   it('Debe devolver un número con dos decimales', () => {
     const price = generateRandomPrice();
     const decimalPlaces = (price.toString().split('.')[1] || '').length;
     expect(decimalPlaces).toBe(2);
   });
 });

 // TEST: GenerarAlias
describe('Generacion de alias aleatorio', () => {
   it('Debe lanzar un error si el array contiene menos de 3 palabras', () => {
     expect(() => GenerarAlias(['uno', 'dos'])).toThrow('El array debe contener al menos 3 palabras');
   });
 
   it('Debe devolver una cadena de texto', () => {
     const palabras = ['uno', 'dos', 'tres', 'cuatro'];
     const alias = GenerarAlias(palabras);
     expect(typeof alias).toBe('string');
   });
 
   it('Debe devolver una cadena con exactamente dos puntos', () => {
     const palabras = ['uno', 'dos', 'tres', 'cuatro'];
     const alias = GenerarAlias(palabras);
     const puntos = alias.split('.').length - 1;
     expect(puntos).toBe(2);
   });
 
   it('Debe devolver un alias con tres palabras únicas del array original', () => {
     const palabras = ['uno', 'dos', 'tres', 'cuatro'];
     const alias = GenerarAlias(palabras);
     const aliasWords = alias.split('.');
     expect(aliasWords.length).toBe(3);
     aliasWords.forEach(word => {
       expect(palabras).toContain(word);
     });
     const uniqueWords = new Set(aliasWords);
     expect(uniqueWords.size).toBe(3);
   });
 
 });