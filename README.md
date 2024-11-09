# Proyecto de Pruebas Automatizadas

## Integrantes
- Mariana Díaz - m.diaza2@uniandes.edu.co
- Alvaro Bacca 
---

## Requisitos previos

- **Node.js**: Instalar Node.js en la versión 14 o superior.
- **Java**: Algunas herramientas de prueba requieren tener instalado Java JDK.
- **Navegador**: Las pruebas están diseñadas para ejecutarse en navegadores como Chromium, Firefox o Webkit.

## Clonar el repostiorio

Clone este repositorio utilizando la URL HTTPs con el comando
`git clone <repository_url>`

## Pruebas en Kraken
Para ejecutar las pruebas en kraken debe seguir los siguientes pasos:

1. Instalar Kraken globalmente `npm install kraken-node -g`
2. Abrir en un editor de código el repositorio
3. Ingresar a la carpeta de Kraken `cd Kraken`
4. Instalar Kraken localmente `npm install kraken-node`
5. Ejecutar las pruebas utilizando alguno de los siguientes comandos:
    - `./node_modules/kraken-node/bin/kraken-node run`
    - `npx kraken-node run`

**Nota**: Para ejecutar la funcionalidad de "Crear Miembro", el miembro con los datos ingresados no debe existir previamente. Debido a las limitaciones de Kraken, los datos aleatorios no pueden generarse automáticamente, por lo que si ejecuta las pruebas varias veces, deberá eliminar los miembros creados anteriormente para asegurar que las pruebas tengan éxito.

**! IMPORTANTE**: Debido a las limitaciones de Kraken, es necesario actualizar el archivo `ghost.feature` en la carpeta `features` para elegir los escenarios específicos. En la carpeta `features/tests` encontrará varios archivos `.feature` que corresponden a escenarios de prueba divididos por funcionalidad. Debe copiar el contenido del archivo que desee ejecutar en `ghost.feature`, ya que solo debe haber un archivo `.feature` a nivel de la carpeta features.

Los resultados se almacenarán en una carpeta que se genera llamada `reports`.

## Pruebas en Playwright
Para ejecutar las pruebas en Playwright debe seguir los siguientes pasos:

1. Instalar Playwright `npm install playwright`
2. Ingresar a la carpeta de Playwright `cd Playwright`
3. Ejecutar las pruebas utilizando el siguiente comando:
    - `node index.js`

Los resultados se almacenarán en la carpeta de `screenshots` divido por los diferentes escenarios que se probaron para el alcance de esta entrega.

