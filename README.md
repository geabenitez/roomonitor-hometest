# Proyecto API con Autenticación y Gestión de Cuartos

Este proyecto incluye autenticación básica y CRUD de cuartos, con integración a base de datos y documentación Swagger para facilitar las pruebas. A continuación, se detallan los pasos para configurar y ejecutar el proyecto.

## Requisitos Previos

- **Docker**
- **Docker Compose**

## Instrucciones para la Configuración

1. **Clonar el archivo `.env`**:
   Para configurar las variables de entorno, hacer una copia del archivo `sample.env` en la carpeta raíz del proyecto con el siguiente comando:

   ```bash
   cp sample.env .env
   ```

2.	**Correr la Aplicación**:
  Ejecutar el siguiente comando para iniciar el proyecto con Docker Compose. Dependiendo de la versión que tengas instalada, puede ser uno de los siguientes:

  ```bash
  docker-compose up 
  ```
  o
  ```bash
  docker compose up
  ```

Esto descargará y configurará automáticamente todos los servicios necesarios, incluyendo la base de datos.

## Endpoints Disponibles

1. Autenticación: POST /auth/login

  - Descripción: Endpoint para iniciar sesión.
  - Acceso: Público. No requiere autenticación para ser utilizado.

2. Usuarios: POST /users

  - Descripción: Endpoint para crear usuarios de prueba.
  - Acceso: Público en este ejercicio, pero idealmente debería estar protegido por autenticación.

3. Cuartos (Rooms)

Los siguientes endpoints están relacionados con la gestión de cuartos y requieren autenticación:

- Crear un cuarto: POST /rooms
- Obtener todos los cuartos: GET /rooms
- Obtener un cuarto por ID: GET /rooms/:id
- Actualizar un cuarto por ID: PUT /rooms/:id

Nota: Todo lo relacionado con cuartos (rooms) debe estar autenticado.

## Documentación con Swagger

Este proyecto tiene habilitada la documentación Swagger, accesible en la URL:

http://localhost:3000/api

Swagger proporciona una interfaz funcional que permite realizar pruebas sin necesidad de utilizar herramientas como Postman.

### Base de Datos

  - La aplicación utiliza una base de datos PostgresQL configurada a través de Docker.
  - Cada vez que se detiene el contenedor, la base de datos se reinicia y es necesario recrear los datos.
  - El archivo ormconfig está configurado con synchronize: true, lo que permite que los esquemas se sincronicen automáticamente sin la necesidad de ejecutar migraciones manualmente. Sin embargo, en un entorno de producción, los cambios en el esquema de la base de datos deben manejarse mediante migraciones.

### Aclaraciones

 - Sé que se mencionó la opción de quemar el usuario y la contraseña dentro del código, pero decidí ir un paso más allá. Agregué una pequeña base de datos que se configura automáticamente con Docker para facilitar el acceso a la información.
 - Dado que la base de datos no tiene un volumen persistente configurado, cada vez que se detiene el contenedor, se debe recrear toda la información.
 - Para evitar tener que realizar migraciones manuales, el ORM está configurado con synchronize: true. Esto no es recomendable para producción, donde todos los cambios deben gestionarse a través de migraciones.
 - Aunque no se han incluido test unitarios por falta de tiempo, es una buena práctica incorporarlos para asegurar la calidad del software.