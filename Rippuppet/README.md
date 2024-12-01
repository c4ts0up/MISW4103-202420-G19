# RIPuppet
A node js library for GUI Ripping on web applications
Herramienta obtenida de [TheSoftwareDesignLab/RIPuppet](https://github.com/TheSoftwareDesignLab/RIPuppetCoursera)

# Executing

First check that you are using a valid Node version. We recommend you to use Node v12.22.12.

Check the content inside config.json file.

Modify the required parameters.

To execute the testing tool use the following command:

```
node index.js

```

# Modificaciones para Ghost

Para ejecutar el proyecto en el contexto de Ghost, se recomienda lo siguiente:
1. Ubicándose en la raíz de este proyecto, instalar los paquetes necesarios con ```npm install```
2. Crear y ejecutar un contenedor de Docker con la imagen de Ghost deseada, como se indica [aquí](https://hub.docker.com/_/ghost/)
3. Configurar el sitio en ``<IP>:<PORT>/ghost/`` con el nombre del sitio, un correo de administrador y una contraseña.
4. Al acceder al Dashboard de administrador, hacer clic derecho, _Inspeccionar_ y buscar en la memoria de la
_Aplicación_ la cookie con el nombre ``ghost-admin-api-session``. Copiar este valor a la variable `values.adminCookieValue` en `config.json`
Las instrucciones pueden variar ligeramente entre navegadores (estas aplican a Chrome), pero son relativamente universales.
5. Cambiar el valor de ``url`` en ``config.json`` con los valores de la IP y el puerto donde este fue desplegado localmente.
Debería quedar de la siguiente forma: ```http://<IP>:<PORT>/ghost/#```
6. Ajustar la variable ``depthLevels`` en ``config.json`` a un valor adecuado. Se recomienda utilizar valores bajitos (<=3), 
dado que la ejecución puede tomar un tiempo significativo.