# Ghost VR G26
## Funcionalidad
Herramienta de JavaScript diseñada para realizar análisis de 
regresión visual sobre un conjunto de evidencias organizadas.
Específicamente:
- Lee un número arbitrario de imágenes
- Compara utilizando ResembleJS o PixelMatch
- Produce un reporte en formato HTML
- Entrega carpetas con evidencias ordenadas y comparativas para cada navegador, funcionalidad y paso

## Herramientas y versiones
Para ejecutar esta herramienta, se utilizan (y recomiendan) las siguientes herramientas

| Herramienta | Versión |
|-------------|---------|
| Node.js     | 18.20.4 |
| NPM         | 10.7.0  |

Adicionalmente, se desarrollo en **Ubuntu 22.04.5 LTS**, por lo que es el sistema operativo recomendado para utilizar.

## Formato evidencias
Para cargar las evidencias y que la herramienta las pueda leer correctamente, estas deben tener el siguiente formato:
```
evidences
|   - <version>
|   |   - <browser name>
|   |   |   - <test identifier>
|   |   |   |   - <evidence 1>.png
|   |   |   |   - <evidence 2>.png
|   |   |   |   ...
```

Por ejemplo:
```
evidences
|   - 5.96
|   |   - firefox
|   |   |   - E007-delete-member
|   |   |   |   - before.png
|   |   |   |   - after.png
```
Estas evidencias se deben situar en el directorio raíz de los tests VR (`./VR/<aquí>`)

## Formato análisis VR
Luego de realizar el análisis, los resultados son presentados de la siguiente forma:
```
<base directory>
|   - <browser name>
|   |   - <test identifier>
|   |   |   - <timestamp>
|   |   |   |   - <result 1>.png
|   |   |   |   - <result 2>.png
|   |   |   |   ...
|   |   |   |   - index.css
|   |   |   |   - report.html
```
El ``report.html`` se puede abrir en el navegador para visualizar los resultados para un caso de ejecución en un navegador específico

## Ejecución
1. Instalar dependencias con `npm install` en el directorio raíz del proyecto
2. Copiar las evidencias como se indica en [las instrucciones del formato de evidencias](#formato-evidencias).
3. Modificar el archivo ``./config.json`` con los datos correctos:
   1. ``sut.baseVersion``: versión base de la ABP.
   2. ``sut.rcVersion``: versión "release-candidate" de la ABP.
   3. ``sut.testName``: identificador del test (``<test identifier>``).
   4. ``sut.evidence.baseDirectory``: si se desea cambiar el directorio base de las evidencias. Revisar forma en [instrucciones del formato de evidencias](#formato-evidencias).
   5. ``sut.evidence.targetDirectory``: si se desea cambiar el directorio de destino de los resultados. Revisar forma en [instrucciones del formato de resultados](#formato-análisis-vr).
   6. ``browsers``: navegadores utilizados en las evidencias.
   7. ``url``: no es realmente necesario, pero sirve para dar referencias en el reporte.
   8. ``resembleOptions``: configuración de ResembleJS.
   9. ``pixelmatchOptions``: configuración de PixelMatch.
4. Ejecutar con la herramienta de VR preferida
   1. Si se desea ResembleJS, utilizar `node resembleVR.js`
   2. Si se desea PixelMatch, utilizar `node pixelmatchVR.js`
5. Copiar y guardar los resultados generados.