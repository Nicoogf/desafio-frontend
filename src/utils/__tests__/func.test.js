import { lastFourNumbers } from "../funcionalidades"


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


