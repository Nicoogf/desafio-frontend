# DMH - Desafio Frontend 

**Una billetera virtual sencilla y segura para gestionar tus finanzas.**

## Descripción general

Digital Money House es una aplicación web en desarrollo que busca ofrecer una solución simple e intuitiva para la gestión de finanzas personales. En esta primera fase, el proyecto se enfoca en las funcionalidades básicas de una billetera virtual, como registro, inicio de sesión, gestión de pagos y seguimiento de transacciones.

## Datos importantes
Antes de comenzar a utilizar la aplicación, es importante tener en cuenta lo siguiente:

* **Saldo inicial de usuario:** Al crear un nuevo usuario, este no tendrá dinero en su cuenta. Para cargar dinero, el usuario debe agregar una tarjeta de crédito o débito. Cada tarjeta agregada tendrá un saldo inicial de $500,000 para verificar el correcto funcionamiento del flujo de la aplicación.

* **Empresas y servicios:** Al arrancar la aplicación por primera vez, no hay empresas registradas, lo que significa que no habrá servicios disponibles para pagar. Para visualizar y realizar pagos a una compañía, es necesario registrar un nuevo usuario con la categoría "Empresa". Ejemplos de empresas que se pueden registrar incluyen: Telecom, Claro, DirecTV, Movistar, Tuenti.

## Objetivos
* **MVP:** Desarrollar un producto mínimo viable para validar el concepto y obtener feedback de los usuarios.
* **Funcionalidades:** Permitir a los usuarios registrarse, iniciar sesión, agregar medios de pago, realizar transacciones y consultar el historial de sus operaciones.
* **Experiencia de usuario:** Ofrecer una interfaz intuitiva y fácil de usar.

## Tecnologías
* **Frontend:** React, Next.js, HTML5, CSS3
* **Backend:** Node.js, Express.js
* **Base de datos:** MongoDB

## Arquitectura
La aplicación sigue una arquitectura de microservicios, con un frontend desarrollado en Next.js y un backend en Node.js con Express.js. MongoDB se utiliza como base de datos para almacenar la información de los usuarios y sus transacciones.

## Sprints
* **Sprint Uno :** Página de inicio , Registro de usuario , Inicio de sesión
* **Sprint Dos:** Perfil de usuario, Gestión de medios de pago ,Ingreso de dinero
* **Sprint Tres:** Pago de servicios , Dashboard
* **Sprint Cuatro:** Historial de transacciones

