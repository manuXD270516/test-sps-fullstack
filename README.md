# test-sps-fullstack

Este proyecto es una aplicación fullstack que incluye un backend en Node.js y un frontend en React. La aplicación permite gestionar usuarios a través de una API REST y una interfaz web.

## Requisitos

- Docker
- Docker Compose
- Node.js (para ejecución sin Docker)
- MySQL (para ejecución sin Docker)

## Instrucciones de Despliegue con Docker

1. Clona el repositorio en tu máquina local:

    ```sh
    git clone https://github.com/manuXD270516/test-sps-fullstack.git
    cd test-sps-fullstack
    ```

2. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

3. Construye y levanta los contenedores usando Docker Compose:

    ```sh
    docker-compose up --build
    ```

    Esto construirá las imágenes de Docker para el backend y el frontend, y levantará los contenedores junto con una base de datos MySQL.

4. Accede a la aplicación:

    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:3001](http://localhost:3001)

## Instrucciones de Despliegue sin Docker

1. Clona el repositorio en tu máquina local:

    ```sh
    git clone https://github.com/manuXD270516/test-sps-fullstack.git
    cd test-sps-fullstack
    ```

2. Asegúrate de tener Node.js y MySQL instalados en tu máquina.

3. Configura la base de datos MySQL:

    - Crea una base de datos llamada `users_db`.
    - Ejecuta el script de inicialización [init.sql](http://_vscodecontentref_/0) para crear la tabla de usuarios y agregar un usuario predeterminado:

        ```sh
        mysql -u root -p users_db < init.sql
        ```

4. Configura las variables de entorno para el backend:

    Crea un archivo `.env` en el directorio [test-sps-server](http://_vscodecontentref_/1) con el siguiente contenido:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=sts
    DB_PASSWORD=sts2024
    DB_NAME=users_db
    JWT_SECRET=xYNakDg8AiUItn5eDoq294i4A2UaXXep
    ```

5. Instala las dependencias y ejecuta el backend:

    ```sh
    cd test-sps-server
    npm install
    npm start
    ```

6. Configura las variables de entorno para el frontend:

    Crea un archivo `.env` en el directorio [test-sps-react](http://_vscodecontentref_/2) con el siguiente contenido:

    ```env
    REACT_APP_SERVER_URL=http://localhost:3001
    ```

7. Instala las dependencias y ejecuta el frontend:

    ```sh
    cd ../test-sps-react
    npm install
    npm start
    ```

8. Accede a la aplicación:

    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:3001](http://localhost:3001)

## Servicios

- **Backend**: El backend está implementado en Node.js y expone una API REST para gestionar usuarios.
- **Frontend**: El frontend está implementado en React y proporciona una interfaz de usuario para interactuar con la API.
- **Base de Datos**: La base de datos MySQL almacena la información de los usuarios.

## Variables de Entorno

Las variables de entorno necesarias para el backend están definidas en el archivo `.env` en el directorio [test-sps-server](http://_vscodecontentref_/3):

```env
PORT=3000
DB_HOST=db
DB_USER=sts
DB_PASSWORD=sts2024
DB_NAME=users_db
JWT_SECRET=xYNakDg8AiUItn5eDoq294i4A2UaXXep
```

## Enlace de Video demostrativo

https://drive.google.com/file/d/1eB9rzCQ73tGkuWTuH9SKmixjYvEHVt4o/view?usp=sharing